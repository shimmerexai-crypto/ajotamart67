/**
 * E-commerce Type Definitions for Ajota Mart
 */

export interface ProductVariant {
  id: string;
  name: string; // e.g. "1 kg", "5 kg", "Pack of 2"
  price: number;
  mrp: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'groceries' | 'cosmetics' | 'stationery' | 'home-essentials';
  categoryLabel: string;
  subcategory: string;
  images: string[];
  price: number;
  mrp: number;
  unit: string; // e.g. "5 kg", "1 L", "100 g", "Pack of 6"
  variants: ProductVariant[];
  inStock: boolean;
  description: string;
  details?: {
    shelfLife?: string;
    origin?: string;
    manufacturer?: string;
    benefits?: string[];
  };
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isDealOfDay?: boolean;
  dealEndTime?: string; // ISO string for countdown
  isBackToSchool?: boolean;
  isDailyEssential?: boolean;
  tags?: string[];
}

export interface Category {
  id: 'groceries' | 'cosmetics' | 'stationery' | 'home-essentials';
  name: string;
  shortLabel: string;
  iconName: string;
  description: string;
  subcategories: string[];
  color: string;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  name: string;
  brand: string;
  packSize: string;
  price: number;
  mrp: number;
  image: string;
  quantity: number;
  category: string;
}

export interface Address {
  id: string;
  title: 'Home' | 'Work' | 'Other';
  name: string;
  phone: string;
  street: string;
  landmark: string;
  area: string;
  city: string;
  pincode: string;
  isDefault: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  packSize: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: 'confirmed' | 'packing' | 'out_for_delivery' | 'delivered';
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryAddress: Address;
  paymentMethod: 'cod' | 'upi';
  estimatedDelivery: string;
  notes?: string;
}
