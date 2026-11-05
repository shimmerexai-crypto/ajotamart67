import {
  ChevronRight,
  Grid,
  Home,
  ReceiptText,
  Search,
  ShoppingBag,
  User
} from 'lucide-react';
import React from 'react';
import { useCart } from '../../context/CartContext';
import { Screen, useNav } from '../../context/NavigationContext';
import { useThemeLanguage } from '../../context/ThemeLanguageContext';
import { formatINR } from '../../utils/formatters';

export const BottomNav: React.FC = () => {
  const { currentScreen, navigateTo } = useNav();
  const { cartItemCount, cartTotal } = useCart();
  const { t } = useThemeLanguage();

  const isCartScreen = currentScreen === 'cart' || currentScreen === 'checkout';

  const navItems = [
    { id: 'home' as Screen, label: t('home', 'Home'), icon: Home },
    { id: 'category' as Screen, label: t('categories', 'Categories'), icon: Grid },
    { id: 'search' as Screen, label: t('search', 'Search'), icon: Search },
    { id: 'orders' as Screen, label: t('orders', 'Orders'), icon: ReceiptText },
    { id: 'account' as Screen, label: t('account', 'Account'), icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      {/* Floating View Cart Bar */}
      {cartItemCount > 0 && !isCartScreen && (
        <div className="px-3 pb-2">
          <div
            onClick={() => navigateTo('cart')}
            className="flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-[#1B1209] via-[#331C0C] to-[#C2570C] text-white shadow-xl border border-[#F5B718]/40 cursor-pointer active:scale-[0.98] transition-transform animate-bounce-short"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#C2570C] flex items-center justify-center text-white font-bold relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-[#F5B718] text-[#1B1209] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-[#1B1209]">
                  {cartItemCount}
                </span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[11px] font-bold text-[#FFE885]">
                  {cartItemCount} {cartItemCount === 1 ? 'ITEM' : 'ITEMS'} ADDED
                </span>
                <span className="text-sm font-extrabold tabular-nums">
                  {formatINR(cartTotal)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-[#C2570C] hover:bg-[#A84805] text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs">
              <span>{t('viewCart', 'View Cart')}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}

      {/* 5-Button Bottom Bar */}
      <nav className="bg-white/98 dark:bg-[#1A120B]/98 backdrop-blur-md border-t border-[#EADBCE] dark:border-stone-800 pb-safe shadow-[0_-2px_12px_rgba(27,18,9,0.06)]">
        <div className="grid grid-cols-5 h-14">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateTo(item.id)}
                className={`flex flex-col items-center justify-center py-1 transition-colors min-h-[44px] ${
                  isActive
                    ? 'text-[#C2570C]'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-800'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                </div>
                <span
                  className={`text-[10px] mt-0.5 leading-none ${
                    isActive ? 'font-bold text-[#C2570C]' : 'font-medium'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
