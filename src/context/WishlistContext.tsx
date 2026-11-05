import React, { createContext, useContext, useEffect, useState } from 'react';

interface WishlistContextType {
  wishlist: string[];
  toggleWishlist: (productId: string) => boolean;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

const WISHLIST_STORAGE_KEY = 'ajota_wishlist_v2';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : ['g-1', 's-1'];
    } catch {
      return ['g-1', 's-1'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const toggleWishlist = (productId: string): boolean => {
    let added = false;
    setWishlist(prev => {
      if (prev.includes(productId)) {
        added = false;
        return prev.filter(id => id !== productId);
      } else {
        added = true;
        return [...prev, productId];
      }
    });
    return added;
  };

  const isInWishlist = (productId: string): boolean => wishlist.includes(productId);

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
