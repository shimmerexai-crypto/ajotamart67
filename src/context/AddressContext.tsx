import React, { createContext, useContext, useEffect, useState } from 'react';
import { STORE_CONFIG } from '../config/storeConfig';
import { Address } from '../types/store';

interface AddressContextType {
  addresses: Address[];
  selectedAddress: Address;
  setSelectedAddress: (addr: Address) => void;
  addAddress: (addr: Omit<Address, 'id'>) => Address;
  updateAddress: (id: string, addr: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  currentPincode: string;
  setCurrentPincode: (pin: string) => void;
  isPincodeServiceable: (pin: string) => boolean;
  isLocationVerified: boolean;
  setIsLocationVerified: (verified: boolean) => void;
}

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    title: 'Home',
    name: 'Suresh Choudhary',
    phone: '+91 98290 54321',
    street: 'Plot No. 42, Samarpan Colony, Badla Road',
    landmark: 'Opposite Government School',
    area: 'Badla Road',
    city: 'Jodhpur',
    pincode: '342008',
    isDefault: true
  },
  {
    id: 'addr-2',
    title: 'Work',
    name: 'Suresh Choudhary',
    phone: '+91 98290 54321',
    street: 'Samarpan Educational Campus, Badla Road',
    landmark: 'Near Samarpan Circle',
    area: 'Badla Road',
    city: 'Jodhpur',
    pincode: '342008',
    isDefault: false
  }
];

const ADDRESS_STORAGE_KEY = 'ajota_addresses_v2';
const PINCODE_STORAGE_KEY = 'ajota_pincode_v2';

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [addresses, setAddresses] = useState<Address[]>(() => {
    try {
      const stored = localStorage.getItem(ADDRESS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_ADDRESSES;
    } catch {
      return DEFAULT_ADDRESSES;
    }
  });

  const [selectedAddress, setSelectedAddress] = useState<Address>(() => {
    return addresses.find(a => a.isDefault) || addresses[0] || DEFAULT_ADDRESSES[0];
  });

  const [currentPincode, setCurrentPincodeState] = useState<string>(() => {
    try {
      return localStorage.getItem(PINCODE_STORAGE_KEY) || '342008';
    } catch {
      return '342008';
    }
  });

  const [isLocationVerified, setIsLocationVerified] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ajota_loc_verified') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(addresses));
    } catch (e) {
      console.error(e);
    }
  }, [addresses]);

  const setCurrentPincode = (pin: string) => {
    setCurrentPincodeState(pin);
    try {
      localStorage.setItem(PINCODE_STORAGE_KEY, pin);
      localStorage.setItem('ajota_loc_verified', 'true');
      setIsLocationVerified(true);
    } catch (e) {
      console.error(e);
    }
  };

  const isPincodeServiceable = (pin: string): boolean => {
    const clean = pin.trim();
    return STORE_CONFIG.serviceablePincodes.includes(clean);
  };

  const addAddress = (data: Omit<Address, 'id'>): Address => {
    const newAddr: Address = {
      ...data,
      id: `addr-${Date.now()}`
    };
    setAddresses(prev => [newAddr, ...prev]);
    setSelectedAddress(newAddr);
    return newAddr;
  };

  const updateAddress = (id: string, updated: Partial<Address>) => {
    setAddresses(prev =>
      prev.map(a => (a.id === id ? { ...a, ...updated } : a))
    );
    if (selectedAddress.id === id) {
      setSelectedAddress(prev => ({ ...prev, ...updated }));
    }
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => {
      const remaining = prev.filter(a => a.id !== id);
      if (selectedAddress.id === id && remaining.length > 0) {
        setSelectedAddress(remaining[0]);
      }
      return remaining;
    });
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prev =>
      prev.map(a => ({
        ...a,
        isDefault: a.id === id
      }))
    );
    const target = addresses.find(a => a.id === id);
    if (target) setSelectedAddress(target);
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        selectedAddress,
        setSelectedAddress,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        currentPincode,
        setCurrentPincode,
        isPincodeServiceable,
        isLocationVerified,
        setIsLocationVerified
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const ctx = useContext(AddressContext);
  if (!ctx) throw new Error('useAddress must be used within AddressProvider');
  return ctx;
};
