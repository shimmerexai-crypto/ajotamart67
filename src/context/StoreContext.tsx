import React, { createContext, useContext, useEffect, useState } from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { createOrder as apiCreateOrder, getOrders as apiGetOrders } from '../services/store';
import { Address, CartItem, Order, Product, ProductVariant } from '../types/store';

interface StoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  decrementQuantity: (productId: string, variantId?: string) => void;
  getItemQuantity: (productId: string, variantId?: string) => number;
  getProductTotalQuantity: (productId: string) => number;
  clearCart: () => void;
  cartItemCount: number;
  cartSubtotal: number;
  deliveryFee: number;
  isFreeDelivery: boolean;
  freeDeliveryRemaining: number;
  cartTotal: number;

  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Addresses
  addresses: Address[];
  selectedAddress: Address;
  setSelectedAddress: (address: Address) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;

  // Orders
  orders: Order[];
  refreshOrders: () => Promise<void>;
  placeOrder: (paymentMethod: 'cod' | 'upi', notes?: string) => Promise<Order>;

  // UI state
  activeTab: 'home' | 'categories' | 'search' | 'orders' | 'account';
  setActiveTab: (tab: 'home' | 'categories' | 'search' | 'orders' | 'account') => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isAddressSheetOpen: boolean;
  setIsAddressSheetOpen: (open: boolean) => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;
  productForVariantSheet: Product | null;
  setProductForVariantSheet: (product: Product | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (cat: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'ajota_cart_v1';
const WISHLIST_STORAGE_KEY = 'ajota_wishlist_v1';
const ADDRESSES_STORAGE_KEY = 'ajota_addresses_v1';

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    title: 'Home',
    name: 'Suresh Choudhary',
    phone: '+91 98290 54321',
    street: 'Plot No. 42, Samarpan Colony, Badla Road',
    landmark: 'Opposite Government School',
    area: 'Badla Road',
    city: 'Jodhpur',
    pincode: '342008',
    isDefault: true
  },
  {
    id: 'addr-2',
    title: 'Work',
    name: 'Suresh Choudhary',
    phone: '+91 98290 54321',
    street: 'Samarpan Educational Campus, Badla Road',
    landmark: 'Near Samarpan Circle',
    area: 'Badla Road',
    city: 'Jodhpur',
    pincode: '342008',
    isDefault: false
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : ['g-1', 's-1'];
    } catch {
      return [];
    }
  });

  // Addresses state
  const [addresses, setAddresses] = useState<Address[]>(() => {
    try {
      const stored = localStorage.getItem(ADDRESSES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_ADDRESSES;
    } catch {
      return DEFAULT_ADDRESSES;
    }
  });

  const [selectedAddress, setSelectedAddress] = useState<Address>(() => {
    return addresses.find(a => a.isDefault) || addresses[0] || DEFAULT_ADDRESSES[0];
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);

  // Navigation & Modals
  const [activeTab, setActiveTab] = useState<'home' | 'categories' | 'search' | 'orders' | 'account'>('home');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isAddressSheetOpen, setIsAddressSheetOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [productForVariantSheet, setProductForVariantSheet] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 2800);
  };

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist]);

  // Sync addresses to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(addresses));
    } catch (e) {
      console.error('Failed to save addresses', e);
    }
  }, [addresses]);

  // Initial orders fetch
  const refreshOrders = async () => {
    const list = await apiGetOrders();
    setOrders(list);
  };

  useEffect(() => {
    refreshOrders();
  }, []);

  // Cart operations
  const addToCart = (product: Product, variant?: ProductVariant) => {
    setCart(prev => {
      const variantId = variant?.id;
      const targetIndex = prev.findIndex(item => item.productId === product.id && item.variantId === variantId);
      const price = variant ? variant.price : product.price;
      const mrp = variant ? variant.mrp : product.mrp;
      const packSize = variant ? variant.name : product.unit;

      if (targetIndex > -1) {
        const next = [...prev];
        next[targetIndex] = {
          ...next[targetIndex],
          quantity: next[targetIndex].quantity + 1
        };
        return next;
      }

      return [
        ...prev,
        {
          productId: product.id,
          variantId,
          name: product.name,
          brand: product.brand,
          packSize,
          price,
          mrp,
          image: product.images[0] || '',
          quantity: 1,
          category: product.category
        }
      ];
    });

    showToast(`Added ${product.name.slice(0, 22)} to cart`);
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart(prev => prev.filter(item => !(item.productId === productId && item.variantId === variantId)));
  };

  const decrementQuantity = (productId: string, variantId?: string) => {
    setCart(prev => {
      const targetIndex = prev.findIndex(item => item.productId === productId && item.variantId === variantId);
      if (targetIndex === -1) return prev;

      if (prev[targetIndex].quantity <= 1) {
        return prev.filter((_, idx) => idx !== targetIndex);
      }

      const next = [...prev];
      next[targetIndex] = {
        ...next[targetIndex],
        quantity: next[targetIndex].quantity - 1
      };
      return next;
    });
  };

  const getItemQuantity = (productId: string, variantId?: string) => {
    if (variantId) {
      const match = cart.find(i => i.productId === productId && i.variantId === variantId);
      return match ? match.quantity : 0;
    }
    // If no specific variant specified, return quantity of first matched item or total
    const matches = cart.filter(i => i.productId === productId);
    return matches.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getProductTotalQuantity = (productId: string) => {
    return cart.filter(i => i.productId === productId).reduce((sum, item) => sum + item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeDelivery = cartSubtotal >= STORE_CONFIG.freeDeliveryThreshold;
  const freeDeliveryRemaining = Math.max(0, STORE_CONFIG.freeDeliveryThreshold - cartSubtotal);
  const deliveryFee = cartSubtotal === 0 || isFreeDelivery ? 0 : STORE_CONFIG.deliveryFee;
  const cartTotal = cartSubtotal + deliveryFee;

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('Removed from Wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to Wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Address operations
  const addAddress = (data: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...data,
      id: `addr-${Date.now()}`
    };
    setAddresses(prev => [newAddr, ...prev]);
    setSelectedAddress(newAddr);
    showToast('New address saved');
  };

  // Place order
  const placeOrder = async (paymentMethod: 'cod' | 'upi', notes?: string) => {
    if (cart.length === 0) {
      throw new Error('Cart is empty');
    }

    const orderItems = cart.map(item => ({
      productId: item.productId,
      name: item.name,
      brand: item.brand,
      packSize: item.packSize,
      price: item.price,
      quantity: item.quantity,
      image: item.image
    }));

    const newOrder = await apiCreateOrder({
      items: orderItems,
      subtotal: cartSubtotal,
      deliveryFee,
      total: cartTotal,
      deliveryAddress: selectedAddress,
      paymentMethod,
      notes
    });

    clearCart();
    await refreshOrders();
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decrementQuantity,
        getItemQuantity,
        getProductTotalQuantity,
        clearCart,
        cartItemCount,
        cartSubtotal,
        deliveryFee,
        isFreeDelivery,
        freeDeliveryRemaining,
        cartTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        addresses,
        selectedAddress,
        setSelectedAddress,
        addAddress,
        orders,
        refreshOrders,
        placeOrder,
        activeTab,
        setActiveTab,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isAddressSheetOpen,
        setIsAddressSheetOpen,
        selectedProductForDetail,
        setSelectedProductForDetail,
        productForVariantSheet,
        setProductForVariantSheet,
        searchQuery,
        setSearchQuery,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        toastMessage,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
