import { ArrowLeft, CheckCircle2, Phone, ShieldCheck, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNav } from '../../context/NavigationContext';
import { AjotaLogo } from '../common/AjotaLogo';

export const LoginModal: React.FC = () => {
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    loginStep,
    setLoginStep,
    pendingPhone,
    requestOTP,
    verifyOTP,
    resendOTP,
    otpCountdown
  } = useAuth();

  const { showToast } = useNav();

  const [phoneInput, setPhoneInput] = useState('');
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  if (!isLoginModalOpen) return null;

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const clean = phoneInput.replace(/\D/g, '');
    if (clean.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    const success = requestOTP(clean);
    if (success) {
      setOtpValues(['1', '2', '3', '4', '5', '6']); // prefilled mock OTP for instant one-click login!
      showToast('OTP sent! Use demo code 123456');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otpValues];
    next[index] = value.slice(-1);
    setOtpValues(next);

    // auto advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const code = otpValues.join('');
    if (code.length < 6) {
      setErrorMsg('Please enter all 6 digits of the OTP');
      return;
    }
    const ok = verifyOTP(code);
    if (ok) {
      showToast('Logged in successfully!');
    } else {
      setErrorMsg('Invalid OTP. Please check or use 123456.');
    }
  };

  const handleClose = () => {
    setIsLoginModalOpen(false);
    setLoginStep('phone');
    setErrorMsg('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-sm bg-white dark:bg-[#1A120B] rounded-3xl p-6 shadow-2xl border border-[#EADBCE] dark:border-[#382619] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3">
          {loginStep === 'otp' ? (
            <button
              type="button"
              onClick={() => setLoginStep('phone')}
              className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <div className="w-8 h-8" />
          )}

          <AjotaLogo size={36} />

          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {loginStep === 'phone' ? (
          <div>
            <div className="text-center my-3">
              <h2 className="text-lg font-black text-[#1B1209] dark:text-[#F3ECE2]">
                Login or Sign Up
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Enter your mobile number to get express updates on your Jodhpur orders.
              </p>
            </div>

            <form onSubmit={handlePhoneSubmit} className="space-y-4 mt-5">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 dark:text-stone-300 uppercase mb-1.5">
                  Mobile Number
                </label>
                <div className="flex items-center rounded-2xl border-2 border-[#EADBCE] dark:border-stone-700 bg-stone-50 dark:bg-stone-900 px-3 py-2.5 focus-within:border-[#C2570C] transition-colors">
                  <span className="text-xs font-bold text-stone-600 dark:text-stone-400 pr-2 border-r border-stone-300 dark:border-stone-700">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="98290 XXXXX"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full pl-3 text-sm font-semibold text-[#1B1209] dark:text-white bg-transparent outline-none"
                    autoFocus
                  />
                  <Phone className="w-4 h-4 text-stone-400" />
                </div>
                {errorMsg && (
                  <p className="text-[11px] text-red-600 mt-1 font-medium">{errorMsg}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#C2570C] to-[#E8890C] hover:from-[#A84805] hover:to-[#D97706] text-white font-extrabold text-xs sm:text-sm shadow-md active:scale-95 transition-all"
              >
                Send Verification OTP
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-xs text-stone-500 hover:text-[#C2570C] font-semibold underline"
                >
                  Continue browsing as Guest
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <div className="text-center my-3">
              <h2 className="text-lg font-black text-[#1B1209] dark:text-[#F3ECE2]">
                Verify with OTP
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                We sent a 6-digit code to <strong>+91 {pendingPhone}</strong>
              </p>
              {/* Mock hint banner */}
              <div className="mt-2 py-1 px-3 bg-[#FFF8EC] dark:bg-[#2D1F13] border border-[#F5B718]/50 rounded-full inline-flex items-center gap-1.5 text-[11px] font-bold text-[#8C4600] dark:text-[#FFE885]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
                <span>Demo OTP: 123456</span>
              </div>
            </div>

            <form onSubmit={handleVerify} className="space-y-4 mt-4">
              {/* 6 OTP Boxes */}
              <div className="flex justify-between gap-1.5">
                {otpValues.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      inputRefs.current[idx] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-11 h-12 text-center text-lg font-black text-[#1B1209] dark:text-white bg-stone-50 dark:bg-stone-900 border-2 border-[#EADBCE] dark:border-stone-700 rounded-xl focus:border-[#C2570C] focus:bg-white outline-none transition-all tabular-nums"
                  />
                ))}
              </div>

              {errorMsg && (
                <p className="text-[11px] text-red-600 text-center font-medium">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#C2570C] to-[#E8890C] hover:from-[#A84805] hover:to-[#D97706] text-white font-extrabold text-xs sm:text-sm shadow-md active:scale-95 transition-all"
              >
                Verify & Continue
              </button>

              <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                {otpCountdown > 0 ? (
                  <span>Resend code in {otpCountdown}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={resendOTP}
                    className="text-[#C2570C] font-bold hover:underline"
                  >
                    Resend OTP
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setLoginStep('phone')}
                  className="text-stone-600 dark:text-stone-400 hover:underline"
                >
                  Edit number
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
