import { ArrowRight, CheckCircle2, MapPin, ShieldCheck, XCircle } from 'lucide-react';
import React, { useState } from 'react';
import { AjotaLogo } from '../components/common/AjotaLogo';
import { STORE_CONFIG } from '../config/storeConfig';
import { useAddress } from '../context/AddressContext';
import { useNav } from '../context/NavigationContext';

export const WelcomeScreen: React.FC = () => {
  const { currentPincode, setCurrentPincode, isPincodeServiceable } = useAddress();
  const { navigateTo, showToast } = useNav();
  const [inputPin, setInputPin] = useState(currentPincode || '342008');
  const [checked, setChecked] = useState(false);
  const [isServiceable, setIsServiceable] = useState(true);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputPin.trim();
    const serviceable = isPincodeServiceable(clean);
    setChecked(true);
    setIsServiceable(serviceable);

    if (serviceable) {
      setCurrentPincode(clean);
      showToast(`Pincode ${clean} is serviceable! Welcome to Ajota Mart.`);
      setTimeout(() => {
        navigateTo('home');
      }, 700);
    }
  };

  const handleContinueGuest = () => {
    setCurrentPincode('342008');
    showToast('Browsing Ajota Mart as Guest');
    navigateTo('home');
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#1A120B] rounded-3xl p-6 sm:p-8 shadow-xl border border-[#EADBCE] dark:border-[#382619] text-center">
        {/* Brand Logo & Tagline */}
        <div className="flex justify-center mb-4">
          <AjotaLogo size={68} />
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-[#1B1209] dark:text-[#F3ECE2] tracking-tight">
          Ajota<span className="text-[#C2570C]">Mart</span>
        </h1>
        <p className="text-xs sm:text-sm font-bold text-[#E8890C] mt-0.5">
          {STORE_CONFIG.tagline}
        </p>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 max-w-xs mx-auto">
          Badla Road, Jodhpur · Groceries, Cosmetics, Stationery & Home Essentials
        </p>

        {/* Pincode Checker Card */}
        <div className="my-6 p-4 rounded-2xl bg-[#FFF8EC] dark:bg-stone-900 border border-[#F5B718]/40 text-left">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-[#C2570C]" />
            <span className="text-xs font-bold text-[#1B1209] dark:text-white uppercase">
              Check Delivery in Your Jodhpur Area
            </span>
          </div>

          <form onSubmit={handleCheck} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={inputPin}
                onChange={(e) => {
                  setInputPin(e.target.value);
                  setChecked(false);
                }}
                placeholder="Enter 6-digit Pincode"
                className="flex-1 px-3.5 py-2.5 text-sm font-mono font-bold bg-white dark:bg-stone-800 rounded-xl border border-stone-300 dark:border-stone-700 outline-none focus:border-[#C2570C] text-[#1B1209] dark:text-white"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#C2570C] hover:bg-[#A84805] text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
              >
                Check
              </button>
            </div>

            {checked && (
              <div
                className={`p-2.5 rounded-xl text-xs flex items-center gap-2 font-medium ${
                  isServiceable
                    ? 'bg-emerald-50 text-[#15803D] border border-emerald-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {isServiceable ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Delivering to Badla Road & surrounding Jodhpur areas!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 shrink-0" />
                    <span>
                      Not serviceable yet. We deliver across Jodhpur city (pincodes {STORE_CONFIG.serviceablePincodes.slice(0, 4).join(', ')}...).
                    </span>
                  </>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Enter Store Button */}
        <button
          type="button"
          onClick={() => {
            setCurrentPincode(inputPin || '342008');
            navigateTo('home');
          }}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#C2570C] to-[#E8890C] hover:from-[#A84805] hover:to-[#D97706] text-white font-extrabold text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 mb-3"
        >
          <span>Enter Ajota Mart</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Guest fallback */}
        <button
          type="button"
          onClick={handleContinueGuest}
          className="text-xs font-semibold text-stone-500 hover:text-[#C2570C] underline"
        >
          Continue as Guest
        </button>

        {/* Serviceable Pincodes footer chip */}
        <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-500">
          <div className="flex items-center justify-center gap-1.5 mb-1 font-semibold text-[#1B1209] dark:text-stone-300">
            <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
            <span>Badla Road Local Guarantee</span>
          </div>
          <span>Active pincodes: 342001, 342002, 342003, 342005, 342006, 342008, 342011, 342015</span>
        </div>
      </div>
    </div>
  );
};
