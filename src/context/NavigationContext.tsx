import React, { createContext, useContext, useState } from 'react';

export type Screen =
  | 'welcome'
  | 'home'
  | 'category'
  | 'search'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'orders'
  | 'order-detail'
  | 'account'
  | 'settings'
  | 'wishlist'
  | 'addresses'
  | 'notifications'
  | 'help'
  | 'policies'
  | 'store-info';

interface NavigationContextType {
  currentScreen: Screen;
  navigateTo: (screen: Screen, params?: Record<string, any>) => void;
  goBack: () => void;
  screenHistory: Screen[];
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  activeSubcategory: string;
  setActiveSubcategory: (sub: string) => void;
  isFilterSheetOpen: boolean;
  setIsFilterSheetOpen: (open: boolean) => void;
  isCouponSheetOpen: boolean;
  setIsCouponSheetOpen: (open: boolean) => void;
  isVariantSheetOpen: boolean;
  setIsVariantSheetOpen: (open: boolean) => void;
  isAddressSheetOpen: boolean;
  setIsAddressSheetOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(() => {
    try {
      const verified = localStorage.getItem('ajota_loc_verified');
      return verified === 'true' ? 'home' : 'welcome';
    } catch {
      return 'welcome';
    }
  });

  const [screenHistory, setScreenHistory] = useState<Screen[]>(['home']);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('groceries');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');

  // Sheets & Modals
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [isCouponSheetOpen, setIsCouponSheetOpen] = useState(false);
  const [isVariantSheetOpen, setIsVariantSheetOpen] = useState(false);
  const [isAddressSheetOpen, setIsAddressSheetOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 2800);
  };

  const navigateTo = (screen: Screen, params?: Record<string, any>) => {
    if (params?.productId) setSelectedProductId(params.productId);
    if (params?.orderId) setSelectedOrderId(params.orderId);
    if (params?.category) setActiveCategory(params.category);
    if (params?.subcategory) setActiveSubcategory(params.subcategory);

    setScreenHistory(prev => [...prev, currentScreen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (screenHistory.length > 0) {
      const prev = screenHistory[screenHistory.length - 1];
      setScreenHistory(s => s.slice(0, -1));
      setCurrentScreen(prev || 'home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentScreen('home');
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        currentScreen,
        navigateTo,
        goBack,
        screenHistory,
        selectedProductId,
        setSelectedProductId,
        selectedOrderId,
        setSelectedOrderId,
        activeCategory,
        setActiveCategory,
        activeSubcategory,
        setActiveSubcategory,
        isFilterSheetOpen,
        setIsFilterSheetOpen,
        isCouponSheetOpen,
        setIsCouponSheetOpen,
        isVariantSheetOpen,
        setIsVariantSheetOpen,
        isAddressSheetOpen,
        setIsAddressSheetOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNav = () => {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNav must be used within NavigationProvider');
  return ctx;
};
