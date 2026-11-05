import React, { createContext, useContext, useEffect, useState } from 'react';

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  isLoggedIn: boolean;
  memberSince: string;
}

interface AuthContextType {
  user: UserProfile;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  pendingPhone: string;
  setPendingPhone: (phone: string) => void;
  loginStep: 'phone' | 'otp';
  setLoginStep: (step: 'phone' | 'otp') => void;
  requestOTP: (phone: string) => boolean;
  verifyOTP: (otp: string) => boolean;
  resendOTP: () => void;
  otpCountdown: number;
  logout: () => void;
  updateProfile: (name: string, email: string) => void;
  deleteAccount: () => void;
  loginRedirectAction: (() => void) | null;
  setLoginRedirectAction: (action: (() => void) | null) => void;
}

const GUEST_USER: UserProfile = {
  name: 'Guest Shopper',
  phone: '',
  email: '',
  isLoggedIn: false,
  memberSince: '2026'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'ajota_user_auth_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : GUEST_USER;
    } catch {
      return GUEST_USER;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingPhone, setPendingPhone] = useState('');
  const [loginStep, setLoginStep] = useState<'phone' | 'otp'>('phone');
  const [otpCountdown, setOtpCountdown] = useState(30);
  const [loginRedirectAction, setLoginRedirectAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  // Timer for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loginStep === 'otp' && otpCountdown > 0) {
      interval = setInterval(() => {
        setOtpCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [loginStep, otpCountdown]);

  const requestOTP = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) return false;
    setPendingPhone(cleanPhone.slice(-10));
    setLoginStep('otp');
    setOtpCountdown(30);
    return true;
  };

  const resendOTP = () => {
    setOtpCountdown(30);
  };

  const verifyOTP = (otp: string): boolean => {
    // Accepts 6-digit OTP (e.g. 123456 or any 6 digits in demo mode)
    if (otp.length === 6) {
      const loggedUser: UserProfile = {
        name: user.isLoggedIn && user.name !== 'Guest Shopper' ? user.name : 'Suresh Choudhary',
        phone: `+91 ${pendingPhone}`,
        email: user.email || 'suresh.choudhary@example.com',
        isLoggedIn: true,
        memberSince: user.memberSince || 'November 2026'
      };
      setUser(loggedUser);
      setIsLoginModalOpen(false);
      setLoginStep('phone');

      if (loginRedirectAction) {
        loginRedirectAction();
        setLoginRedirectAction(null);
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(GUEST_USER);
  };

  const updateProfile = (name: string, email: string) => {
    setUser(prev => ({
      ...prev,
      name,
      email
    }));
  };

  const deleteAccount = () => {
    setUser(GUEST_USER);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoginModalOpen,
        setIsLoginModalOpen,
        pendingPhone,
        setPendingPhone,
        loginStep,
        setLoginStep,
        requestOTP,
        verifyOTP,
        resendOTP,
        otpCountdown,
        logout,
        updateProfile,
        deleteAccount,
        loginRedirectAction,
        setLoginRedirectAction
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
