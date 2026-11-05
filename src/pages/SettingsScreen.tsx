import {
  ArrowLeft,
  Bell,
  Check,
  Globe,
  Lock,
  LogOut,
  MapPin,
  Moon,
  Shield,
  Trash2,
  User
} from 'lucide-react';
import React, { useState } from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { useAuth } from '../context/AuthContext';
import { useNav } from '../context/NavigationContext';
import { useThemeLanguage } from '../context/ThemeLanguageContext';

export const SettingsScreen: React.FC = () => {
  const { user, updateProfile, logout, deleteAccount } = useAuth();
  const { isDark, toggleDarkMode, language, setLanguage } = useThemeLanguage();
  const { goBack, navigateTo, showToast } = useNav();

  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [isEditing, setIsEditing] = useState(false);

  // Notification toggles
  const [orderSMS, setOrderSMS] = useState(true);
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(name, email);
    setIsEditing(false);
    showToast('Profile updated successfully!');
  };

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const confirmDeleteAccount = () => {
    deleteAccount();
    showToast('Account deleted');
    navigateTo('home');
  };

  return (
    <div className="w-full pb-20 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 py-2 mb-2 border-b border-[#EADBCE] dark:border-stone-800">
        <button
          type="button"
          onClick={goBack}
          className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-lg sm:text-xl font-black text-[#1B1209] dark:text-white">
            App Settings & Preferences
          </h1>
          <p className="text-xs text-stone-500">Ajota Mart Jodhpur</p>
        </div>
      </div>

      {/* 1. Profile Details Card */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#C2570C]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1B1209] dark:text-white">
              Personal Profile
            </h2>
          </div>
          {!isEditing && user.isLoggedIn && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="text-xs font-bold text-[#C2570C] hover:underline"
            >
              Edit
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 outline-none focus:border-[#C2570C]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 outline-none focus:border-[#C2570C]"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#C2570C] text-white text-xs font-bold shadow-xs"
              >
                Save Profile
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl bg-stone-100 text-stone-600 text-xs font-bold"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="text-xs space-y-1 text-stone-700 dark:text-stone-300">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Phone:</strong> {user.phone || 'Not logged in'}</p>
            {user.email && <p><strong>Email:</strong> {user.email}</p>}
          </div>
        )}
      </div>

      {/* 2. Language & Display */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#1B1209] dark:text-white">
          Display & Language
        </h2>

        {/* Language Switcher */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-[#C2570C]" />
            <div>
              <span className="text-xs font-bold text-[#1B1209] dark:text-white block">
                Language (भाषा)
              </span>
              <span className="text-[11px] text-stone-500">
                Choose app display language
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => {
                setLanguage('en');
                showToast('Switched to English');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                language === 'en'
                  ? 'bg-white dark:bg-stone-700 text-[#1B1209] dark:text-white shadow-2xs'
                  : 'text-stone-500'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => {
                setLanguage('hi');
                showToast('हिंदी में बदला गया');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                language === 'hi'
                  ? 'bg-white dark:bg-stone-700 text-[#1B1209] dark:text-white shadow-2xs'
                  : 'text-stone-500'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>

        {/* Dark Mode Switcher */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <Moon className="w-4 h-4 text-purple-600" />
            <div>
              <span className="text-xs font-bold text-[#1B1209] dark:text-white block">
                Dark Mode
              </span>
              <span className="text-[11px] text-stone-500">
                Gentle on the eyes during late night orders
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleDarkMode}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              isDark ? 'bg-[#C2570C]' : 'bg-stone-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform transform absolute top-0.5 ${
                isDark ? 'left-6' : 'left-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 3. Notifications */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#1B1209] dark:text-white">
          Notifications
        </h2>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Bell className="w-4 h-4 text-[#E8890C]" />
            <div>
              <span className="text-xs font-bold text-[#1B1209] dark:text-white block">
                Order Status SMS
              </span>
              <span className="text-[11px] text-stone-500">
                Receive instant packing & dispatch alerts
              </span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={orderSMS}
            onChange={(e) => setOrderSMS(e.target.checked)}
            className="w-4 h-4 accent-[#C2570C] rounded cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <Bell className="w-4 h-4 text-[#15803D]" />
            <div>
              <span className="text-xs font-bold text-[#1B1209] dark:text-white block">
                WhatsApp Order Updates
              </span>
              <span className="text-[11px] text-stone-500">
                Receive receipt & rider location on WhatsApp
              </span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={whatsappUpdates}
            onChange={(e) => setWhatsappUpdates(e.target.checked)}
            className="w-4 h-4 accent-[#C2570C] rounded cursor-pointer"
          />
        </div>
      </div>

      {/* 4. Policies & About */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#1A120B] border border-[#EADBCE] dark:border-[#382619] shadow-2xs divide-y divide-stone-100 dark:divide-stone-800">
        <button
          type="button"
          onClick={() => navigateTo('policies')}
          className="w-full py-2.5 flex items-center justify-between text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-[#C2570C]"
        >
          <span>Refund & Cancellation Policy</span>
          <Shield className="w-4 h-4 text-stone-400" />
        </button>
        <button
          type="button"
          onClick={() => navigateTo('policies')}
          className="w-full py-2.5 flex items-center justify-between text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-[#C2570C]"
        >
          <span>Privacy Policy & Terms</span>
          <Lock className="w-4 h-4 text-stone-400" />
        </button>
        <button
          type="button"
          onClick={() => navigateTo('store-info')}
          className="w-full py-2.5 flex items-center justify-between text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-[#C2570C]"
        >
          <span>About Ajota Mart (Badla Road Store)</span>
          <MapPin className="w-4 h-4 text-stone-400" />
        </button>
        <div className="pt-2 text-[11px] text-stone-400 flex items-center justify-between">
          <span>Application Version</span>
          <span className="font-mono font-bold">v2.4.0 (PWA-Ready)</span>
        </div>
      </div>

      {/* 5. Account Destruction & Logout */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        {!showDeleteConfirm ? (
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 text-xs font-bold inline-flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Account</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs text-red-600 font-bold">Confirm delete?</span>
            <button
              type="button"
              onClick={confirmDeleteAccount}
              className="px-3 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold"
            >
              Yes, Delete
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(false)}
              className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        )}

        {user.isLoggedIn && (
          <button
            type="button"
            onClick={logout}
            className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-[#C2570C] text-xs font-bold inline-flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        )}
      </div>
    </div>
  );
};
