import React, { createContext, useContext, useEffect, useState } from 'react';
import { Coupon, STORE_CONFIG } from '../config/storeConfig';
import { CartItem, Product, ProductVariant } from '../types/store';

export type DeliveryType = 'delivery' | 'pickup';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  decrementQuantity: (productId: string, variantId?: string) => void;
  getItemQuantity: (productId: string, variantId?: string) => number;
  getProductTotalQuantity: (productId: string) => number;
  clearCart: () => void;
  cartItemCount: number;
  cartSubtotal: number;
  cartMRP: number;
  totalSavings: number;
  deliveryType: DeliveryType;
  setDeliveryType: (type: DeliveryType) => void;
  deliveryFee: number;
  isFreeDelivery: boolean;
  freeDeliveryRemaining: number;
  appliedCoupon: Coupon | null;
  couponDiscount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartTotal: number;
  isMinOrderMet: boolean;
}

const CART_STORAGE_KEY = 'ajota_cart_v2';
const COUPON_STORAGE_KEY = 'ajota_coupon_v2';
const DELIVERY_TYPE_KEY = 'ajota_delivery_type_v2';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [deliveryType, setDeliveryTypeState] = useState<DeliveryType>(() => {
    try {
      const stored = localStorage.getItem(DELIVERY_TYPE_KEY);
      return (stored === 'pickup' || stored === 'delivery') ? stored : 'delivery';
    } catch {
      return 'delivery';
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const stored = localStorage.getItem(COUPON_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, [appliedCoupon]);

  const setDeliveryType = (type: DeliveryType) => {
    setDeliveryTypeState(type);
    try {
      localStorage.setItem(DELIVERY_TYPE_KEY, type);
    } catch (e) {
      console.error(e);
    }
  };

  const addToCart = (product: Product, variant?: ProductVariant) => {
    setCart(prev => {
      const variantId = variant?.id;
      const targetIndex = prev.findIndex(
        item => item.productId === product.id && item.variantId === variantId
      );
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
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart(prev =>
      prev.filter(item => !(item.productId === productId && item.variantId === variantId))
    );
  };

  const decrementQuantity = (productId: string, variantId?: string) => {
    setCart(prev => {
      const targetIndex = prev.findIndex(
        item => item.productId === productId && item.variantId === variantId
      );
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
    const matches = cart.filter(i => i.productId === productId);
    return matches.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getProductTotalQuantity = (productId: string) => {
    return cart.filter(i => i.productId === productId).reduce((sum, item) => sum + item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartMRP = cart.reduce((sum, item) => sum + (item.mrp || item.price) * item.quantity, 0);

  // Free delivery calculations
  const isFreeDelivery = deliveryType === 'pickup' || cartSubtotal >= STORE_CONFIG.freeDeliveryThreshold;
  const freeDeliveryRemaining = Math.max(0, STORE_CONFIG.freeDeliveryThreshold - cartSubtotal);
  const deliveryFee = deliveryType === 'pickup' || cartSubtotal === 0 || isFreeDelivery ? 0 : STORE_CONFIG.deliveryFee;

  // Coupon evaluation
  let couponDiscount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrder) {
    if (appliedCoupon.discountType === 'fixed') {
      couponDiscount = Math.min(cartSubtotal, appliedCoupon.discountValue);
    } else {
      const calc = Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
      couponDiscount = Math.min(calc, 75); // max discount cap
    }
  }

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const clean = code.trim().toUpperCase();
    const found = STORE_CONFIG.coupons.find(c => c.code.toUpperCase() === clean);
    if (!found) {
      return { success: false, message: 'Invalid coupon code. Try AJOTA50 or FESTIVE100.' };
    }
    if (cartSubtotal < found.minOrder) {
      return {
        success: false,
        message: `Add items worth ₹${found.minOrder - cartSubtotal} more to use ${found.code}`
      };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const totalSavings = Math.max(0, cartMRP - cartSubtotal) + couponDiscount + (isFreeDelivery && cartSubtotal > 0 ? STORE_CONFIG.deliveryFee : 0);
  const cartTotal = Math.max(0, cartSubtotal - couponDiscount + deliveryFee);
  const isMinOrderMet = cartSubtotal >= STORE_CONFIG.minimumOrder;

  return (
    <CartContext.Provider
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
        cartMRP,
        totalSavings,
        deliveryType,
        setDeliveryType,
        deliveryFee,
        isFreeDelivery,
        freeDeliveryRemaining,
        appliedCoupon,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        cartTotal,
        isMinOrderMet
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
