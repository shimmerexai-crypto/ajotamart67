import {
  ArrowLeft,
  Clock,
  ExternalLink,
  Instagram,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  ShieldCheck,
  Store,
  Truck
} from 'lucide-react';
import React from 'react';
import { AjotaLogo } from '../components/common/AjotaLogo';
import { STORE_CONFIG } from '../config/storeConfig';
import { useNav } from '../context/NavigationContext';

export const StoreInfoScreen: React.FC = () => {
  const { goBack } = useNav();

  return (
    <div className="w-full pb-20 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 py-2 border-b border-[#EADBCE] dark:border-stone-800">
        <button
          type="button"
          onClick={goBack}
          className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-lg sm:text-xl font-black text-[#1B1209] dark:text-white">
            Store Info & Badla Road Location
          </h1>
          <p className="text-xs text-stone-500">{STORE_CONFIG.tagline}</p>
        </div>
      </div>

      {/* Hero Store Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#1B1209] via-[#331C0C] to-[#C2570C] text-white shadow-md text-center">
        <div className="flex justify-center mb-3">
          <AjotaLogo size={64} />
        </div>
        <h2 className="text-xl font-black text-white">Ajota Mart</h2>
        <p className="text-xs font-bold text-[#FFE885] mt-0.5">
          {STORE_CONFIG.tagline}
        </p>
        <p className="text-xs text-[#EADBCE]/80 mt-2 max-w-md mx-auto leading-relaxed">
          Your neighborhood one-stop supermarket for Groceries, Cosmetics, Student Stationery, and Home Essentials located at Badla Road, Jodhpur.
        </p>
      </div>

      {/* Address & Timings */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs space-y-4 text-xs text-stone-700 dark:text-stone-300">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#FFF8EC] dark:bg-stone-800 text-[#C2570C] flex items-center justify-center shrink-0 mt-0.5">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-[#1B1209] dark:text-white block text-sm">
              Physical Store Address
            </span>
            <p className="mt-0.5 leading-relaxed">{STORE_CONFIG.fullAddress}</p>
            <p className="text-stone-500 text-[11px] mt-0.5">
              Near Samarpan Circle, Badla Road, Jodhpur 342008
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
          <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-stone-800 text-[#D97706] flex items-center justify-center shrink-0 mt-0.5">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-[#1B1209] dark:text-white block text-sm">
              Mart Working Timings
            </span>
            <p className="mt-0.5 font-bold text-[#15803D]">
              {STORE_CONFIG.storeTimings}
            </p>
            <p className="text-stone-500 text-[11px] mt-0.5">
              Open all 7 days for counter shopping, self pickup, and home delivery
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-stone-800 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-black text-[#1B1209] dark:text-white block text-sm">
              Express Local Delivery
            </span>
            <p className="mt-0.5">
              {STORE_CONFIG.deliveryTimeText} · Free above ₹{STORE_CONFIG.freeDeliveryThreshold}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons: Get Directions, WhatsApp, Call, Instagram */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Get Directions Link */}
        <a
          href={STORE_CONFIG.googleMapsDirectionsUrl}
          target="_blank"
          rel="noreferrer"
          className="p-4 rounded-2xl bg-[#C2570C] hover:bg-[#A84805] text-white flex items-center justify-center gap-2 font-black text-xs shadow-md active:scale-95 transition-all"
        >
          <Navigation className="w-4 h-4" />
          <span>Get Directions on Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        {/* WhatsApp Store */}
        <a
          href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(STORE_CONFIG.whatsappMessage)}`}
          target="_blank"
          rel="noreferrer"
          className="p-4 rounded-2xl bg-[#15803D] hover:bg-[#16A34A] text-white flex items-center justify-center gap-2 font-black text-xs shadow-md active:scale-95 transition-all"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp Badla Road Mart</span>
        </a>

        {/* Direct Call */}
        <a
          href={`tel:${STORE_CONFIG.phone}`}
          className="p-4 rounded-2xl bg-[#1B1209] hover:bg-[#331C0C] text-white flex items-center justify-center gap-2 font-black text-xs shadow-md active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 text-[#FFE885]" />
          <span>Call: {STORE_CONFIG.phoneDisplay}</span>
        </a>

        {/* Instagram Link */}
        <a
          href={STORE_CONFIG.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="p-4 rounded-2xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white flex items-center justify-center gap-2 font-black text-xs shadow-md active:scale-95 transition-all"
        >
          <Instagram className="w-4 h-4" />
          <span>Instagram: {STORE_CONFIG.instagram}</span>
        </a>
      </div>

      {/* Serviceable Pincodes List */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B1209] dark:text-white mb-2">
          Serviceable Areas in Jodhpur City
        </h3>
        <p className="text-xs text-stone-500 mb-3">
          We deliver to the following pincodes dispatched directly from Badla Road store:
        </p>
        <div className="flex flex-wrap gap-2">
          {STORE_CONFIG.serviceablePincodes.map(p => (
            <span
              key={p}
              className="px-3 py-1 bg-[#FFF8EC] dark:bg-stone-800 text-[#8C4600] dark:text-[#FFE885] border border-[#F5B718]/40 rounded-xl font-mono text-xs font-bold"
            >
              {p} (Jodhpur)
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
