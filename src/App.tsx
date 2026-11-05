import { WifiOff } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Context Providers
import { AddressProvider } from './context/AddressContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { NavigationProvider, useNav } from './context/NavigationContext';
import { ThemeLanguageProvider } from './context/ThemeLanguageContext';
import { WishlistProvider } from './context/WishlistContext';

// Common Components & Modals
import { AddressSheet } from './components/address/AddressSheet';
import { LoginModal } from './components/auth/LoginModal';
import { CouponSheet } from './components/cart/CouponSheet';
import { AjotaLogo } from './components/common/AjotaLogo';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';

// 17 Comprehensive Screens
import { AccountScreen } from './pages/AccountScreen';
import { AddressesScreen } from './pages/AddressesScreen';
import { CartScreen } from './pages/CartScreen';
import { CategoryScreen } from './pages/CategoryScreen';
import { CheckoutScreen } from './pages/CheckoutScreen';
import { HelpSupportScreen } from './pages/HelpSupportScreen';
import { NotificationsScreen } from './pages/NotificationsScreen';
import { OrderDetailScreen } from './pages/OrderDetailScreen';
import { OrderSuccessScreen } from './pages/OrderSuccessScreen';
import { OrdersListScreen } from './pages/OrdersListScreen';
import { PoliciesScreen } from './pages/PoliciesScreen';
import { ProductDetailScreen } from './pages/ProductDetailScreen';
import { SearchScreen } from './pages/SearchScreen';
import { SettingsScreen } from './pages/SettingsScreen';
import { StoreInfoScreen } from './pages/StoreInfoScreen';
import { WelcomeScreen } from './pages/WelcomeScreen';
import { WishlistScreen } from './pages/WishlistScreen';
import { HomeView } from './views/HomeView';

// Services & Types
import { getCategories, getProducts } from './services/store';
import { Category, Product } from './types/store';

const AppContent: React.FC = () => {
  const { currentScreen, toastMessage } = useNav();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const [cats, prodsRes] = await Promise.all([
          getCategories(),
          getProducts({ limit: 100 })
        ]);
        setCategories(cats);
        setProducts(prodsRes.products);
      } catch (err) {
        console.error('Failed to load store catalog', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const isWelcomeScreen = currentScreen === 'welcome';

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F2] dark:bg-[#120C06] text-[#1B1209] dark:text-[#F3ECE2] transition-colors duration-200">
      {/* Offline Status Banner */}
      {!isOnline && (
        <div className="bg-[#B91C1C] text-white text-xs py-1 px-4 text-center font-bold flex items-center justify-center gap-2">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Offline mode · Showing cached mart items</span>
        </div>
      )}

      {/* Main Header (hidden on Welcome/Pincode screen) */}
      {!isWelcomeScreen && <Header />}

      {/* Main Content Viewport */}
      <main className={`w-full flex-1 ${isWelcomeScreen ? 'p-0' : 'max-w-6xl mx-auto px-3 sm:px-6 py-3 pb-24 md:pb-12'}`}>
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <div className="mb-4">
              <AjotaLogo size={56} />
            </div>
            <div className="w-9 h-9 border-4 border-[#C2570C] border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs font-bold text-stone-600 dark:text-stone-300">
              Loading Ajota Mart Jodhpur...
            </p>
            <p className="text-[11px] text-[#C2570C] font-semibold mt-1">
              Badla Road Neighbourhood Store
            </p>
          </div>
        ) : (
          <>
            {currentScreen === 'welcome' && <WelcomeScreen />}
            {currentScreen === 'home' && <HomeView products={products} />}
            {currentScreen === 'category' && (
              <CategoryScreen categories={categories} products={products} />
            )}
            {currentScreen === 'search' && <SearchScreen products={products} />}
            {currentScreen === 'product-detail' && (
              <ProductDetailScreen products={products} />
            )}
            {currentScreen === 'cart' && <CartScreen products={products} />}
            {currentScreen === 'checkout' && <CheckoutScreen />}
            {currentScreen === 'order-success' && <OrderSuccessScreen />}
            {currentScreen === 'orders' && <OrdersListScreen />}
            {currentScreen === 'order-detail' && <OrderDetailScreen />}
            {currentScreen === 'account' && <AccountScreen />}
            {currentScreen === 'settings' && <SettingsScreen />}
            {currentScreen === 'wishlist' && <WishlistScreen products={products} />}
            {currentScreen === 'addresses' && <AddressesScreen />}
            {currentScreen === 'notifications' && <NotificationsScreen />}
            {currentScreen === 'help' && <HelpSupportScreen />}
            {currentScreen === 'policies' && <PoliciesScreen />}
            {currentScreen === 'store-info' && <StoreInfoScreen />}
          </>
        )}
      </main>

      {/* Desktop & Mobile Footer (hidden on Welcome) */}
      {!isWelcomeScreen && <Footer />}

      {/* Mobile 5-Button Bottom Navigation (hidden on Welcome) */}
      {!isWelcomeScreen && <BottomNav />}

      {/* Global Interactive Modals & Drawers */}
      <LoginModal />
      <CouponSheet />
      <AddressSheet />

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 bg-[#1B1209] text-[#FFF8EC] text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl border border-[#F5B718] flex items-center gap-2 animate-bounce-short pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ThemeLanguageProvider>
      <AuthProvider>
        <AddressProvider>
          <WishlistProvider>
            <CartProvider>
              <NavigationProvider>
                <AppContent />
              </NavigationProvider>
            </CartProvider>
          </WishlistProvider>
        </AddressProvider>
      </AuthProvider>
    </ThemeLanguageProvider>
  );
}
