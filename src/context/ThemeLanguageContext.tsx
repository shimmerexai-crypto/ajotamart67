import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'hi';

interface ThemeLanguageContextType {
  isDark: boolean;
  toggleDarkMode: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultText?: string) => string;
}

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    home: "Home",
    categories: "Categories",
    search: "Search",
    orders: "My Orders",
    account: "Account",
    cart: "Cart",
    viewCart: "View Cart",
    addToCart: "ADD",
    inStock: "In Stock",
    outOfStock: "Out of Stock",
    bestSellers: "Best Sellers",
    dealsOfDay: "Deals of the Day",
    buyAgain: "Buy Again",
    freeDelivery: "Free Delivery",
    checkout: "Proceed to Checkout",
    placeOrder: "Place Order",
    homeDelivery: "Home Delivery",
    selfPickup: "Self Pickup (Store)",
    settings: "Settings",
    helpSupport: "Help & Support",
    wishlist: "Wishlist",
    notifications: "Notifications",
    storeInfo: "Store Details",
    jodhpurTagline: "Jodhpur's one-stop Mart!"
  },
  hi: {
    home: "मुख्य पृष्ठ",
    categories: "श्रेणियाँ",
    search: "खोजें",
    orders: "मेरे ऑर्डर",
    account: "खाता",
    cart: "कार्ट",
    viewCart: "कार्ट देखें",
    addToCart: "जोड़ें",
    inStock: "उपलब्ध है",
    outOfStock: "स्टॉक समाप्त",
    bestSellers: "सर्वाधिक बिकने वाले",
    dealsOfDay: "आज के विशेष ऑफर",
    buyAgain: "दोबारा खरीदें",
    freeDelivery: "मुफ्त डिलीवरी",
    checkout: "चेकआउट करें",
    placeOrder: "ऑर्डर सबमिट करें",
    homeDelivery: "घर पर डिलीवरी",
    selfPickup: "दुकान से पिकअप",
    settings: "सेटिंग्स",
    helpSupport: "सहायता केंद्र",
    wishlist: "पसंदीदा सामान",
    notifications: "सूचनाएं",
    storeInfo: "स्टोर जानकारी",
    jodhpurTagline: "जोधपुर का अपना वन-स्टॉप मार्ट!"
  }
};

const ThemeLanguageContext = createContext<ThemeLanguageContextType | undefined>(undefined);

export const ThemeLanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ajota_theme') === 'dark';
    } catch {
      return false;
    }
  });

  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('ajota_lang');
      return (stored === 'hi' || stored === 'en') ? stored : 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('ajota_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('ajota_theme', 'light');
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('ajota_lang', lang);
    } catch (e) {
      console.error(e);
    }
  };

  const t = (key: string, defaultText?: string) => {
    return TRANSLATIONS[language]?.[key] || defaultText || key;
  };

  return (
    <ThemeLanguageContext.Provider
      value={{
        isDark,
        toggleDarkMode,
        language,
        setLanguage,
        t
      }}
    >
      {children}
    </ThemeLanguageContext.Provider>
  );
};

export const useThemeLanguage = () => {
  const ctx = useContext(ThemeLanguageContext);
  if (!ctx) throw new Error('useThemeLanguage must be used within ThemeLanguageProvider');
  return ctx;
};
