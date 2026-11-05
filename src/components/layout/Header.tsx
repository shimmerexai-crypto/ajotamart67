import {
  ChevronDown,
  Clock,
  Heart,
  MapPin,
  Moon,
  Search,
  ShoppingBag,
  Sun,
  X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { STORE_CONFIG } from '../../config/storeConfig';
import { useAddress } from '../../context/AddressContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useNav } from '../../context/NavigationContext';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatINR } from '../../utils/formatters';
import { AjotaLogo } from '../common/AjotaLogo';
import { PWAInstallButton } from '../common/PWAInstallButton';

const ROTATING_SEARCH_PLACEHOLDERS = [
  "Search 'atta'",
  "Search 'notebook'",
  "Search 'shampoo'",
  "Search 'mustard oil'",
  "Search 'classmate registers'",
  "Search 'lizol floor cleaner'",
  "Search 'desi ghee'",
  "Search 'dettol soap'"
];

export const Header: React.FC = () => {
  const { currentScreen, navigateTo, setIsAddressSheetOpen } = useNav();
  const { selectedAddress } = useAddress();
  const { cartItemCount, cartTotal } = useCart();
  const { wishlist } = useWishlist();
  const { user, setIsLoginModalOpen } = useAuth();
  const { isDark, toggleDarkMode, t } = useThemeLanguage();

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % ROTATING_SEARCH_PLACEHOLDERS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#1A120B]/95 backdrop-blur-md border-b border-[#EADBCE]/80 dark:border-stone-800 shadow-[0_2px_10px_rgba(27,18,9,0.04)]">
      {/* Top Banner Bar */}
      <div className="bg-[#1B1209] text-[#FFF8EC] text-[11px] py-1 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] inline-block" />
            <span className="font-medium text-[#FFE885]">{STORE_CONFIG.tagline}</span>
            <span className="hidden sm:inline text-stone-400">·</span>
            <span className="hidden sm:inline text-stone-300">{STORE_CONFIG.storeTimings}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-[#F5B718] font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>{STORE_CONFIG.deliveryTimeText}</span>
            </div>
            <a
              href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(STORE_CONFIG.whatsappMessage)}`}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <span>WhatsApp Mart</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-3">
          {/* Left: Brand Logo & Address Selector */}
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="text-left shrink-0 focus:outline-none"
            >
              <AjotaLogo size={42} showText={true} />
            </button>

            {/* Address Selector Dropdown */}
            <button
              type="button"
              onClick={() => setIsAddressSheetOpen(true)}
              className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-[#FFF8EC] dark:hover:bg-stone-900 border border-transparent hover:border-[#F5B718]/40 transition-colors text-left max-w-[150px] sm:max-w-[240px]"
            >
              <div className="w-7 h-7 rounded-lg bg-[#C2570C]/10 flex items-center justify-center text-[#C2570C] shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col leading-tight min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-[#1B1209] dark:text-white uppercase tracking-wide truncate">
                    {selectedAddress.title} ({selectedAddress.pincode})
                  </span>
                  <ChevronDown className="w-3 h-3 text-stone-500 shrink-0" />
                </div>
                <span className="text-[10px] text-stone-600 dark:text-stone-400 truncate">
                  {selectedAddress.street}, {selectedAddress.area}
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Search Trigger */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div
              onClick={() => navigateTo('search')}
              className="relative w-full cursor-pointer"
            >
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                readOnly
                placeholder={ROTATING_SEARCH_PLACEHOLDERS[placeholderIndex]}
                className="w-full pl-9 pr-4 py-2 bg-[#F7F2EA] dark:bg-stone-900 hover:bg-white text-xs sm:text-sm text-[#1B1209] dark:text-white rounded-xl border border-[#EADBCE] dark:border-stone-800 transition-all outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-4 text-xs font-semibold text-[#1B1209]/80 dark:text-stone-300 mr-2">
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className={`hover:text-[#C2570C] transition-colors ${currentScreen === 'home' ? 'text-[#C2570C] font-bold' : ''}`}
              >
                {t('home', 'Home')}
              </button>
              <button
                type="button"
                onClick={() => navigateTo('category', { category: 'all' })}
                className={`hover:text-[#C2570C] transition-colors ${currentScreen === 'category' ? 'text-[#C2570C] font-bold' : ''}`}
              >
                {t('categories', 'Categories')}
              </button>
              <button
                type="button"
                onClick={() => navigateTo('orders')}
                className={`hover:text-[#C2570C] transition-colors ${currentScreen === 'orders' ? 'text-[#C2570C] font-bold' : ''}`}
              >
                {t('orders', 'Orders')}
              </button>
              <button
                type="button"
                onClick={() => navigateTo('store-info')}
                className={`hover:text-[#C2570C] transition-colors ${currentScreen === 'store-info' ? 'text-[#C2570C] font-bold' : ''}`}
              >
                Store Info
              </button>
            </nav>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleDarkMode}
              className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-[#C2570C] transition-colors"
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#F5B718]" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* PWA Install Button */}
            <div className="hidden sm:block">
              <PWAInstallButton compact={true} />
            </div>

            {/* Wishlist */}
            <button
              type="button"
              aria-label="Wishlist"
              onClick={() => navigateTo('wishlist')}
              className="relative p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-[#C2570C] hover:bg-[#FFF8EC] dark:hover:bg-stone-900 transition-colors hidden sm:flex items-center justify-center"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C2570C] text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              type="button"
              aria-label="Open Shopping Cart"
              onClick={() => navigateTo('cart')}
              className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-[#C2570C] to-[#E8890C] hover:from-[#A84805] hover:to-[#D97706] text-white font-extrabold text-xs shadow-sm active:scale-95 transition-all"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#1B1209] text-[#FFE885] border border-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline tabular-nums">
                {cartItemCount === 0 ? t('cart', 'My Cart') : formatINR(cartTotal)}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Sticky Search Bar */}
        <div className="mt-2 md:hidden">
          <div
            onClick={() => navigateTo('search')}
            className="relative w-full cursor-pointer"
          >
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              readOnly
              placeholder={ROTATING_SEARCH_PLACEHOLDERS[placeholderIndex]}
              className="w-full pl-9 pr-4 py-2 bg-[#F7F2EA] dark:bg-stone-900 text-xs text-[#1B1209] dark:text-white rounded-xl border border-[#EADBCE] dark:border-stone-800 outline-none cursor-pointer"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
