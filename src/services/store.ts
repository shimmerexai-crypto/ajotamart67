/**
 * Central Store Service
 * Abstracts all product, category, and order data access.
 * Structured like a production headless e-commerce service (Shopify Storefront API, Medusa, etc.)
 * so the backend can be swapped simply by updating this file.
 */

import { CATEGORIES, MOCK_PRODUCTS } from '../data/mock';
import { Address, Category, Order, OrderItem, Product } from '../types/store';

export interface GetProductsParams {
  category?: string;
  subcategory?: string;
  search?: string;
  sort?: 'popular' | 'price-asc' | 'price-desc' | 'discount' | 'rating';
  tag?: string;
  isDealOfDay?: boolean;
  isBestSeller?: boolean;
  isBackToSchool?: boolean;
  isDailyEssential?: boolean;
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

const ORDERS_STORAGE_KEY = 'ajota_mart_orders_v1';

// Seed sample initial completed order for "Buy Again" demonstration
const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'AJ-84291',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'delivered',
    subtotal: 610,
    deliveryFee: 0,
    total: 610,
    deliveryAddress: {
      id: 'addr-default',
      title: 'Home',
      name: 'Samarpan Classes',
      phone: '+91 98290 12345',
      street: 'Near Samarpan Circle, Badla Road',
      landmark: 'Opposite Krishna Mandir',
      area: 'Badla Road',
      city: 'Jodhpur',
      pincode: '342008',
      isDefault: true
    },
    paymentMethod: 'cod',
    estimatedDelivery: 'Delivered 2 days ago',
    items: [
      {
        productId: 'g-1',
        name: 'Aashirvaad Sharbati MP Chakki Atta',
        brand: 'Aashirvaad',
        packSize: '5 kg',
        price: 320,
        quantity: 1,
        image: MOCK_PRODUCTS.find(p => p.id === 'g-1')?.images[0] || ''
      },
      {
        productId: 'g-8',
        name: 'Tata Tea Gold Leaf & Long Leaves Tea',
        brand: 'Tata Tea',
        packSize: '500 g Pouch',
        price: 290,
        quantity: 1,
        image: MOCK_PRODUCTS.find(p => p.id === 'g-8')?.images[0] || ''
      }
    ]
  }
];

export async function getCategories(): Promise<Category[]> {
  // Simulating async network response
  return Promise.resolve([...CATEGORIES]);
}

export async function getProducts(params: GetProductsParams = {}): Promise<ProductsResponse> {
  const {
    category,
    subcategory,
    search,
    sort = 'popular',
    tag,
    isDealOfDay,
    isBestSeller,
    isBackToSchool,
    isDailyEssential,
    page = 1,
    limit = 60
  } = params;

  let filtered = [...MOCK_PRODUCTS];

  // Category filter
  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Subcategory filter
  if (subcategory && subcategory !== 'all') {
    filtered = filtered.filter(p => p.subcategory.toLowerCase() === subcategory.toLowerCase());
  }

  // Tag filter
  if (tag) {
    filtered = filtered.filter(p => p.tags?.some(t => t.toLowerCase() === tag.toLowerCase()));
  }

  // Specific collection filters
  if (isDealOfDay) {
    filtered = filtered.filter(p => p.isDealOfDay);
  }
  if (isBestSeller) {
    filtered = filtered.filter(p => p.isBestSeller);
  }
  if (isBackToSchool) {
    filtered = filtered.filter(p => p.isBackToSchool);
  }
  if (isDailyEssential) {
    filtered = filtered.filter(p => p.isDailyEssential);
  }

  // Search filter
  if (search && search.trim().length > 0) {
    const query = search.trim().toLowerCase();
    filtered = filtered.filter(p => {
      const nameMatch = p.name.toLowerCase().includes(query);
      const brandMatch = p.brand.toLowerCase().includes(query);
      const subcatMatch = p.subcategory.toLowerCase().includes(query);
      const tagMatch = p.tags?.some(t => t.toLowerCase().includes(query));
      return nameMatch || brandMatch || subcatMatch || tagMatch;
    });
  }

  // Sorting
  switch (sort) {
    case 'price-asc':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'discount':
      filtered.sort((a, b) => {
        const discA = ((a.mrp - a.price) / a.mrp);
        const discB = ((b.mrp - b.price) / b.mrp);
        return discB - discA;
      });
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'popular':
    default:
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
  }

  const total = filtered.length;
  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);
  const totalPages = Math.ceil(total / limit);

  return Promise.resolve({
    products: paginated,
    total,
    page,
    totalPages
  });
}

export async function getProduct(id: string): Promise<Product | null> {
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  return Promise.resolve(product ? { ...product } : null);
}

export async function getOrders(): Promise<Order[]> {
  try {
    const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_ORDERS));
      return [...INITIAL_DEMO_ORDERS];
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [...INITIAL_DEMO_ORDERS];
  } catch {
    return [...INITIAL_DEMO_ORDERS];
  }
}

export async function createOrder(data: {
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryAddress: Address;
  paymentMethod: 'cod' | 'upi';
  notes?: string;
}): Promise<Order> {
  const currentOrders = await getOrders();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newOrder: Order = {
    id: `ord-${Date.now()}`,
    orderNumber: `AJ-${randomSuffix}`,
    createdAt: new Date().toISOString(),
    status: 'confirmed',
    items: data.items,
    subtotal: data.subtotal,
    deliveryFee: data.deliveryFee,
    total: data.total,
    deliveryAddress: data.deliveryAddress,
    paymentMethod: data.paymentMethod,
    estimatedDelivery: 'Fast Local Delivery in Jodhpur',
    notes: data.notes
  };

  const updated = [newOrder, ...currentOrders];
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  return Promise.resolve(newOrder);
}

export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<Order | null> {
  const orders = await getOrders();
  const orderIndex = orders.findIndex(o => o.id === orderId);
  if (orderIndex === -1) return null;

  orders[orderIndex] = {
    ...orders[orderIndex],
    status
  };
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  return Promise.resolve(orders[orderIndex]);
}
