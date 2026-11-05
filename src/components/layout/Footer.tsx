import { Instagram, MapPin, Phone, ShieldCheck, Truck } from 'lucide-react';
import React from 'react';
import { STORE_CONFIG } from '../../config/storeConfig';
import { useNav } from '../../context/NavigationContext';
import { AjotaLogo } from '../common/AjotaLogo';

export const Footer: React.FC = () => {
  const { navigateTo } = useNav();

  const handleCategoryClick = (cat: string) => {
    navigateTo('category', { category: cat });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1B1209] text-[#FFF8EC] pt-12 pb-28 md:pb-12 border-t border-[#331C0C] mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-[#3D2817]">
          {/* Col 1: Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AjotaLogo size={44} />
              <div>
                <h3 className="text-base font-extrabold text-white">
                  Ajota<span className="text-[#F5B718]">Mart</span>
                </h3>
                <p className="text-[11px] text-[#FFE885] font-semibold">
                  {STORE_CONFIG.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs text-[#EADBCE]/80 leading-relaxed mb-4">
              Your neighbourhood mart for groceries, cosmetics, student stationery, and home essentials at Badla Road, Jodhpur.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={STORE_CONFIG.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#3D2817] hover:bg-[#C2570C] flex items-center justify-center text-[#F5B718] transition-colors"
                title="Instagram @ajotamartjodhpur"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(STORE_CONFIG.whatsappMessage)}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-full bg-[#15803D] hover:bg-[#16A34A] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <span>WhatsApp Order</span>
              </a>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5B718] mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-[#EADBCE]/80">
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('groceries')}
                  className="hover:text-white transition-colors"
                >
                  Groceries & Staples
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('cosmetics')}
                  className="hover:text-white transition-colors"
                >
                  Cosmetics & Personal Care
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('stationery')}
                  className="hover:text-white transition-colors"
                >
                  Stationery & Student Mart
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('home-essentials')}
                  className="hover:text-white transition-colors"
                >
                  Home Essentials & Cleaning
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleCategoryClick('all')}
                  className="hover:text-white transition-colors"
                >
                  All Products
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links & Store Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5B718] mb-3">
              Store & Support
            </h4>
            <ul className="space-y-2 text-xs text-[#EADBCE]/80">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('store-info')}
                  className="hover:text-white transition-colors"
                >
                  Store Location & Timings
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('help')}
                  className="hover:text-white transition-colors"
                >
                  Help & Customer Support
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('policies')}
                  className="hover:text-white transition-colors"
                >
                  Refund & Return Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo('policies')}
                  className="hover:text-white transition-colors"
                >
                  Privacy & Terms
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Serviceable Pincodes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F5B718] mb-3">
              Delivery Across Jodhpur
            </h4>
            <p className="text-[11px] text-[#EADBCE]/70 mb-2">
              Serving Badla Road, Mandore, Sojati Gate, Ratanada, Shastri Nagar, Samarpan Campus area, Kudi Bhagtasni & Paota.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {STORE_CONFIG.serviceablePincodes.map(pincode => (
                <span
                  key={pincode}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#331C0C] text-[#FFE885] border border-[#52331C]"
                >
                  {pincode}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#EADBCE]/60">
          <p>© {new Date().getFullYear()} Ajota Mart, Jodhpur. All rights reserved.</p>
          <p className="text-[11px]">
            Badla Road Store, Jodhpur · Instagram: {STORE_CONFIG.instagram}
          </p>
        </div>
      </div>
    </footer>
  );
};
