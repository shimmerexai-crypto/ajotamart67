import { Category, Product } from '../types/store';
import { createProductImage } from '../utils/productArt';

export const CATEGORIES: Category[] = [
  {
    id: 'groceries',
    name: 'Groceries & Staples',
    shortLabel: 'Groceries',
    iconName: 'ShoppingBag',
    description: 'Atta, Rice, Dal, Ghee, Spices, Snacks & Daily Food items',
    subcategories: [
      'Atta, Rice & Dal',
      'Cooking Oils & Ghee',
      'Spices & Masala',
      'Snacks & Biscuits',
      'Tea, Coffee & Beverages',
      'Dairy & Breakfast'
    ],
    color: '#C2570C'
  },
  {
    id: 'cosmetics',
    name: 'Cosmetics & Personal Care',
    shortLabel: 'Cosmetics',
    iconName: 'Sparkles',
    description: 'Skincare, Haircare, Soaps, Deodorants & Grooming',
    subcategories: [
      'Face Care & Serums',
      'Hair Care & Shampoos',
      'Bath & Body Wash',
      'Creams & Lotions',
      'Deodorants & Perfumes'
    ],
    color: '#D97706'
  },
  {
    id: 'stationery',
    name: 'Stationery & Student Mart',
    shortLabel: 'Stationery',
    iconName: 'BookOpen',
    description: 'Classmate Notebooks, Registers, Pens, Art & School Supplies',
    subcategories: [
      'Notebooks & Registers',
      'Pens & Writing',
      'Exam & Geometry Kits',
      'Art & Craft',
      'Office & Files'
    ],
    color: '#9E3F05'
  },
  {
    id: 'home-essentials',
    name: 'Home Essentials & Cleaning',
    shortLabel: 'Home Essentials',
    iconName: 'Home',
    description: 'Floor cleaners, Detergents, Pooja samagri & Kitchen care',
    subcategories: [
      'Cleaners & Disinfectants',
      'Detergents & Fabric Care',
      'Pooja & Agarbatti',
      'Kitchen Utensils & Mops',
      'Air Fresheners & Repellents'
    ],
    color: '#B45309'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  // ==================== GROCERIES (24 Items) ====================
  {
    id: 'g-1',
    name: 'Aashirvaad Sharbati MP Chakki Atta',
    brand: 'Aashirvaad',
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Atta, Rice & Dal',
    images: [createProductImage('flour', 'Aashirvaad Sharbati Atta', 'Groceries', '#C2570C', '#F5B718')],
    price: 320,
    mrp: 375,
    unit: '5 kg',
    variants: [
      { id: 'g-1-1kg', name: '1 kg', price: 68, mrp: 80, inStock: true },
      { id: 'g-1-5kg', name: '5 kg', price: 320, mrp: 375, inStock: true },
      { id: 'g-1-10kg', name: '10 kg', price: 615, mrp: 720, inStock: true }
    ],
    inStock: true,
    description: '100% pure Sharbati wheat grains from Madhya Pradesh. Superior dough softness with rich dietary fiber.',
    details: {
      shelfLife: '3 Months',
      origin: 'Sehore, Madhya Pradesh',
      manufacturer: 'ITC Limited',
      benefits: ['Soft Rotis for 12+ hours', 'No Maida Added', 'Chakki ground texture']
    },
    rating: 4.8,
    reviewCount: 342,
    isBestSeller: true,
    isDailyEssential: true,
    tags: ['atta', 'wheat', 'sharbati', 'flour']
  },
  {
    id: 'g-2',
    name: 'Fortune Kachi Ghani Pure Mustard Oil',
    brand: 'Fortune',
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Cooking Oils & Ghee',
    images: [createProductImage('oil', 'Fortune Mustard Oil', 'Groceries', '#E8890C', '#F5B718')],
    price: 152,
    mrp: 185,
    unit: '1 L Pouch',
    variants: [
      { id: 'g-2-1l', name: '1 L Pouch', price: 152, mrp: 185, inStock: true },
      { id: 'g-2-2l', name: '2 L Jar', price: 310, mrp: 380, inStock: true },
      { id: 'g-2-5l', name: '5 L Jar', price: 760, mrp: 910, inStock: true }
    ],
    inStock: true,
    description: 'Cold pressed authentic pungency Kachi Ghani mustard oil, essential for traditional Rajasthani cooking.',
    details: {
      shelfLife: '9 Months',
      origin: 'Rajasthan, India',
      manufacturer: 'Adani Wilmar Limited',
      benefits: ['Natural pungency (Jhaanjh)', 'Rich in Omega-3', 'Zero cholesterol']
    },
    rating: 4.7,
    reviewCount: 198,
    isBestSeller: true,
    isDealOfDay: true,
    tags: ['oil', 'mustard oil', 'tel', 'sarson']
  },
  {
    id: 'g-3',
    name: 'Amul Pure Desi Cow Ghee Tin',
    brand: 'Amul',
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Cooking Oils & Ghee',
    images: [createProductImage('ghee', 'Amul Cow Ghee', 'Groceries', '#F5B718', '#C2570C')],
    price: 610,
    mrp: 660,
    unit: '1 L Tin',
    variants: [
      { id: 'g-3-500ml', name: '500 ml', price: 315, mrp: 340, inStock: true },
      { id: 'g-3-1l', name: '1 L Tin', price: 610, mrp: 660, inStock: true }
    ],
    inStock: true,
    description: 'Golden granular aroma cow ghee made from fresh milk fat. Perfect for Jodhpur dal bati churma.',
    details: {
      shelfLife: '12 Months',
      origin: 'Anand, Gujarat',
      manufacturer: 'GCMMF (Amul)',
      benefits: ['Danedar texture', 'Authentic aroma', 'Rich in Vitamin A & D']
    },
    rating: 4.9,
    reviewCount: 420,
    isBestSeller: true,
    isDailyEssential: true,
    tags: ['ghee', 'desi ghee', 'amul']
  },
  {
    id: 'g-4',
    name: 'India Gate Feast Rozzana Basmati Rice',
    brand: 'India Gate',
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Atta, Rice & Dal',
    images: [createProductImage('flour', 'India Gate Basmati Rice', 'Groceries', '#9E3F05', '#F5B718')],
    price: 440,
    mrp: 520,
    unit: '5 kg Bag',
    variants: [
      { id: 'g-4-1kg', name: '1 kg', price: 95, mrp: 110, inStock: true },
      { id: 'g-4-5kg', name: '5 kg', price: 440, mrp: 520, inStock: true }
    ],
    inStock: true,
    description: 'Aged long-grain aromatic basmati rice for daily pulao, jeera rice, and biryani.',
    details: {
      shelfLife: '24 Months',
      origin: 'Punjab, India',
      manufacturer: 'KRBL Limited'
    },
    rating: 4.6,
    reviewCount: 154,
    isDailyEssential: true,
    tags: ['rice', 'basmati', 'chawal']
  },
  {
    id: 'g-5',
    name: 'Tata Salt Vacuum Evaporated Iodised',
    brand: 'Tata',
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Spices & Masala',
    images: [createProductImage('spices', 'Tata Salt Iodised', 'Groceries', '#C2570C', '#FFFFFF')],
    price: 28,
    mrp: 30,
    unit: '1 kg Pouch',
    variants: [
      { id: 'g-5-1kg', name: '1 kg', price: 28, mrp: 30, inStock: true }
    ],
    inStock: true,
    description: 'Desh ka namak. Vacuum evaporated pure iodised salt for everyday cooking hygiene.',
    details: {
      shelfLife: '24 Months',
      origin: 'Mithapur, Gujarat',
      manufacturer: 'Tata Consumer Products'
    },
    rating: 4.9,
    reviewCount: 512,
    isDailyEssential: true,
    tags: ['salt', 'namak', 'tata']
  },
  {
    id: 'g-6',
    name: 'MDH Deggi Mirch Red Chilli Powder',
    brand: 'MDH',
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Spices & Masala',
    images: [createProductImage('spices', 'MDH Deggi Mirch', 'Groceries', '#991B1B', '#F5B718')],
    price: 94,
    mrp: 110,
    unit: '100 g',
    variants: [
      { id: 'g-6-100g', name: '100 g', price: 94, mrp: 110, inStock: true },
      { id: 'g-6-500g', name: '500 g', price: 410, mrp: 480, inStock: true }
    ],
    inStock: true,
    description: 'Special blend of Kashmiri and red chillies that gives natural vibrant red colour with moderate spice.',
    details: {
      shelfLife: '12 Months',
      origin: 'Delhi, India',
      manufacturer: 'Mahashian Di Hatti Pvt Ltd'
    },
    rating: 4.8,
    reviewCount: 230,
    isBestSeller: true,
    tags: ['masala', 'mirch', 'chilli', 'mdh']
  },
  {
    id: 'g-7',
    name: 'Everest Pav Bhaji Masala',
    brand: 'Everest',
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Spices & Masala',
    images: [createProductImage('spices', 'Everest Pav Bhaji Masala', 'Groceries', '#C2570C', '#F5B718')],
    price: 76,
    mrp: 88,
    unit: '100 g Box',
    variants: [
      { id: 'g-7-100g', name: '100 g', price: 76, mrp: 88, inStock: true }
    ],
    inStock: true,
    description: 'Perfect balance of aromatic ground coriander, cumin, dry mango and cinnamon.',
    details: {
      shelfLife: '12 Months',
      origin: 'Mumbai, India',
      manufacturer: 'Everest Food Products'
    },
    rating: 4.7,
    reviewCount: 165,
    tags: ['masala', 'pav bhaji', 'everest']
  },
  {
    id: 'g-8',
    name: 'Tata Tea Gold Leaf & Long Leaves Tea',
    brand: 'Tata Tea',
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Tea, Coffee & Beverages',
    images: [createProductImage('beverage', 'Tata Tea Gold', 'Groceries', '#D97706', '#1B1209')],
    price: 295,
    mrp: 345,
    unit: '500 g Pouch',
    variants: [
      { id: 'g-8-250g', name: '250 g', price: 155, mrp: 180, inStock: true },
      { id: 'g-8-500g', name: '500 g', price: 295, mrp: 345, inStock: true },
      { id: 'g-8-1kg', name: '1 kg', price: 570, mrp: 670, inStock: true }
    ],
    inStock: true,
    description: 'Assam CTC tea with gently rolled long leaves for superior kadak taste and rich aroma.',
    details: {
      shelfLife: '12 Months',
      origin: 'Assam, India',
      manufacturer: 'Tata Consumer Products'
    },
    rating: 4.8,
    reviewCount: 310,
    isBestSeller: true,
    isDailyEssential: true,
    tags: ['chai', 'tea', 'tata tea']
  },
  {
    id: 'g-9',
    name: 'Maggi 2-Minute Special Masala Noodles',
    brand: 'Nestle',
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Snacks & Biscuits',
    images: [createProductImage('snack', 'Maggi Noodles 4-Pack', 'Groceries', '#F59E0B', '#B91C1C')],
    price: 56,
    mrp: 60,
    unit: 'Pack of 4 (280 g)',
    variants: [
      { id: 'g-9-4p', name: 'Pack of 4 (280 g)', price: 56, mrp: 60, inStock: true },
      { id: 'g-9-8p', name: 'Family Pack (560 g)', price: 108, mrp: 120, inStock: true }
    ],
    inStock: true,
    description: 'India’s most loved instant noodles with signature 20 spices blend seasoning.',
    details: {
      shelfLife: '9 Months',
      origin: 'Goa, India',
      manufacturer: 'Nestle India'
    },
    rating: 4.9,
    reviewCount: 610,
    isBestSeller: true,
    tags: ['maggi', 'noodles', 'snack']
  },
  {
    id: 'g-10',
    name: 'Parle-G Gold Glucose Biscuits Big Pack',
    brand: 'Parle',
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Snacks & Biscuits',
    images: [createProductImage('snack', 'Parle-G Gold Pack', 'Groceries', '#D97706', '#FFF8EC')],
    price: 45,
    mrp: 50,
    unit: '1 kg Value Pack',
    variants: [
      { id: 'g-10-1kg', name: '1 kg Value Pack', price: 45, mrp: 50, inStock: true }
    ],
    inStock: true,
    description: 'Crispier and bigger Parle-G biscuits, great for dipping in evening chai.',
    details: {
      shelfLife: '6 Months',
      origin: 'Mumbai, India',
      manufacturer: 'Parle Products'
    },
    rating: 4.7,
    reviewCount: 188,
    tags: ['biscuit', 'parle-g', 'chai']
  },
  {
    id: 'g-11',
    name: 'Britannia Good Day Cashew Cookies',
    brand: 'Britannia',
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Snacks & Biscuits',
    images: [createProductImage('snack', 'Good Day Cashew', 'Groceries', '#C2570C', '#F5B718')],
    price: 88,
    mrp: 100,
    unit: '600 g (Family Pack)',
    variants: [
      { id: 'g-11-200g', name: '200 g', price: 32, mrp: 35, inStock: true },
      { id: 'g-11-600g', name: '600 g Family Pack', price: 88, mrp: 100, inStock: true }
    ],
    inStock: true,
    description: 'Loaded with crunchy roasted cashews with buttery melt-in-mouth richness.',
    details: {
      shelfLife: '6 Months',
      origin: 'Uttarakhand, India',
      manufacturer: 'Britannia Industries'
    },
    rating: 4.6,
    reviewCount: 140,
    tags: ['good day', 'cookies', 'biscuit', 'cashew']
  },
  {
    id: 'g-12',
    name: 'Amul Pasteurised Table Butter',
    brand: 'Amul',
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Dairy & Breakfast',
    images: [createProductImage('cream', 'Amul Table Butter', 'Groceries', '#F5B718', '#1B1209')],
    price: 275,
    mrp: 290,
    unit: '500 g Brick',
    variants: [
      { id: 'g-12-100g', name: '100 g', price: 58, mrp: 60, inStock: true },
      { id: 'g-12-500g', name: '500 g', price: 275, mrp: 290, inStock: true }
    ],
    inStock: true,
    description: 'Utterly butterly delicious original salted table butter from Amul.',
    details: {
      shelfLife: '12 Months (Keep Chilled)',
      origin: 'Anand, Gujarat',
      manufacturer: 'GCMMF'
    },
    rating: 4.9,
    reviewCount: 390,
    isDailyEssential: true,
    tags: ['butter', 'makhan', 'amul']
  },
  {
    id: 'g-13',
    name: 'Saffola Gold Pro Healthy Heart Edible Oil',
    brand: 'Saffola',
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Cooking Oils & Ghee',
    images: [createProductImage('oil', 'Saffola Gold Oil', 'Groceries', '#B45309', '#F5B718')],
    price: 185,
    mrp: 220,
    unit: '1 L Pouch',
    variants: [
      { id: 'g-13-1l', name: '1 L Pouch', price: 185, mrp: 220, inStock: true },
      { id: 'g-13-5l', name: '5 L Can', price: 890, mrp: 1040, inStock: true }
    ],
    inStock: true,
    description: 'Dual-seed blend of rice bran and refined sunflower oil with natural oryzanol.',
    details: {
      shelfLife: '9 Months',
      origin: 'Maharashtra, India',
      manufacturer: 'Marico Limited'
    },
    rating: 4.7,
    reviewCount: 167,
    isDealOfDay: true,
    tags: ['cooking oil', 'saffola', 'heart oil']
  },
  {
    id: 'g-14',
    name: 'Tata Sampann Unpolished Toor Dal',
    brand: 'Tata Sampann',
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Atta, Rice & Dal',
    images: [createProductImage('flour', 'Tata Sampann Toor Dal', 'Groceries', '#EA580C', '#FEF08A')],
    price: 178,
    mrp: 210,
    unit: '1 kg Pouch',
    variants: [
      { id: 'g-14-1kg', name: '1 kg', price: 178, mrp: 210, inStock: true },
      { id: 'g-14-2kg', name: '2 kg', price: 345, mrp: 410, inStock: true }
    ],
    inStock: true,
    description: 'Naturally protein-rich unpolished toor dal without water or oil polish for authentic home taste.',
    details: {
      shelfLife: '12 Months',
      origin: 'Karnataka, India',
      manufacturer: 'Tata Consumer Products'
    },
    rating: 4.8,
    reviewCount: 225,
    isDailyEssential: true,
    tags: ['dal', 'toor dal', 'pulses', 'arhar']
  },
  {
    id: 'g-15',
    name: 'Rajdhani Premium Chana Dal',
    brand: 'Rajdhani',
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Atta, Rice & Dal',
    images: [createProductImage('flour', 'Rajdhani Chana Dal', 'Groceries', '#D97706', '#FDE68A')],
    price: 115,
    mrp: 135,
    unit: '1 kg Pouch',
    variants: [
      { id: 'g-15-1kg', name: '1 kg', price: 115, mrp: 135, inStock: true }
    ],
    inStock: true,
    description: 'Cleaned and sorted unpolished chana dal, optimal for daily tadka and Rajasthani besan gatta.',
    details: {
      shelfLife: '12 Months',
      origin: 'Rajasthan, India',
      manufacturer: 'Rajdhani Flour Mills'
    },
    rating: 4.7,
    reviewCount: 95,
    tags: ['dal', 'chana dal', 'rajdhani']
  },
  {
    id: 'g-16',
    name: "Haldiram's Nagpur Ratlami Sev",
    brand: "Haldiram's",
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Snacks & Biscuits',
    images: [createProductImage('snack', "Haldiram's Ratlami Sev", 'Groceries', '#C2570C', '#F5B718')],
    price: 90,
    mrp: 105,
    unit: '400 g Pack',
    variants: [
      { id: 'g-16-400g', name: '400 g', price: 90, mrp: 105, inStock: true }
    ],
    inStock: true,
    description: 'Authentic spiced gram flour noodles flavored with clove and black pepper.',
    details: {
      shelfLife: '6 Months',
      origin: 'Nagpur, India',
      manufacturer: "Haldiram Foods"
    },
    rating: 4.8,
    reviewCount: 180,
    isBestSeller: true,
    tags: ['sev', 'namkeen', 'haldiram', 'bhujia']
  },
  {
    id: 'g-17',
    name: 'Bikaji Aslee Bikaneri Bhujia',
    brand: 'Bikaji',
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Snacks & Biscuits',
    images: [createProductImage('snack', 'Bikaji Bikaneri Bhujia', 'Groceries', '#9E3F05', '#FDE047')],
    price: 245,
    mrp: 280,
    unit: '1 kg Pouch',
    variants: [
      { id: 'g-17-400g', name: '400 g', price: 105, mrp: 120, inStock: true },
      { id: 'g-17-1kg', name: '1 kg', price: 245, mrp: 280, inStock: true }
    ],
    inStock: true,
    description: 'Crispy moth bean and besan bhujia crafted with traditional Bikaner recipe.',
    details: {
      shelfLife: '6 Months',
      origin: 'Bikaner, Rajasthan',
      manufacturer: 'Bikaji Foods International'
    },
    rating: 4.9,
    reviewCount: 310,
    isBestSeller: true,
    tags: ['bhujia', 'bikaneri', 'bikaji', 'rajasthan']
  },
  {
    id: 'g-18',
    name: 'Cadbury Bournvita Pro-Health Drink',
    brand: 'Cadbury',
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Tea, Coffee & Beverages',
    images: [createProductImage('beverage', 'Bournvita Health Drink', 'Groceries', '#9A3412', '#FACC15')],
    price: 365,
    mrp: 410,
    unit: '1 kg Refill Pack',
    variants: [
      { id: 'g-18-500g', name: '500 g Refill', price: 195, mrp: 215, inStock: true },
      { id: 'g-18-1kg', name: '1 kg Refill', price: 365, mrp: 410, inStock: true }
    ],
    inStock: true,
    description: 'Chocolate malt health nutrition drink packed with Vitamins D, B12 and Iron.',
    details: {
      shelfLife: '12 Months',
      origin: 'Madhya Pradesh, India',
      manufacturer: 'Mondelez India'
    },
    rating: 4.7,
    reviewCount: 145,
    tags: ['bournvita', 'milk', 'chocolate']
  },
  {
    id: 'g-19',
    name: 'Nescafe Classic Instant Coffee Powder',
    brand: 'Nescafe',
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Tea, Coffee & Beverages',
    images: [createProductImage('beverage', 'Nescafe Classic Coffee', 'Groceries', '#78350F', '#FEF3C7')],
    price: 165,
    mrp: 185,
    unit: '50 g Glass Jar',
    variants: [
      { id: 'g-19-50g', name: '50 g Jar', price: 165, mrp: 185, inStock: true },
      { id: 'g-19-100g', name: '100 g Jar', price: 310, mrp: 350, inStock: true }
    ],
    inStock: true,
    description: '100% pure natural coffee beans medium-dark roasted for bold frothy cold and hot coffee.',
    details: {
      shelfLife: '24 Months',
      origin: 'Karnataka, India',
      manufacturer: 'Nestle India'
    },
    rating: 4.8,
    reviewCount: 220,
    tags: ['coffee', 'nescafe', 'instant coffee']
  },
  {
    id: 'g-20',
    name: 'Catch Super Garam Masala Powder',
    brand: 'Catch',
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Spices & Masala',
    images: [createProductImage('spices', 'Catch Garam Masala', 'Groceries', '#C2570C', '#FCD34D')],
    price: 82,
    mrp: 95,
    unit: '100 g Box',
    variants: [
      { id: 'g-20-100g', name: '100 g Box', price: 82, mrp: 95, inStock: true }
    ],
    inStock: true,
    description: 'Low temperature grinding technology preserves natural spice essential oils.',
    details: {
      shelfLife: '12 Months',
      origin: 'Noida, India',
      manufacturer: 'DS Group'
    },
    rating: 4.6,
    reviewCount: 88,
    tags: ['garam masala', 'spices', 'catch']
  },
  {
    id: 'g-21',
    name: "Lay's Classic Salted Potato Chips (Pack of 3)",
    brand: "Lay's",
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Snacks & Biscuits',
    images: [createProductImage('snack', "Lay's Salted Chips", 'Groceries', '#F59E0B', '#1E3A8A')],
    price: 54,
    mrp: 60,
    unit: '3 x 50 g Bags',
    variants: [
      { id: 'g-21-3p', name: 'Pack of 3', price: 54, mrp: 60, inStock: true }
    ],
    inStock: true,
    description: 'Crispy wafer thin golden potato slices seasoned with sea salt.',
    details: {
      shelfLife: '4 Months',
      origin: 'Punjab, India',
      manufacturer: 'PepsiCo India'
    },
    rating: 4.5,
    reviewCount: 130,
    tags: ['chips', 'lays', 'snacks']
  },
  {
    id: 'g-22',
    name: "Kellogg's Corn Flakes Original Iron Shakti",
    brand: "Kellogg's",
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Dairy & Breakfast',
    images: [createProductImage('snack', "Kellogg's Corn Flakes", 'Groceries', '#C2570C', '#FDE047')],
    price: 195,
    mrp: 230,
    unit: '475 g Box',
    variants: [
      { id: 'g-22-475g', name: '475 g Box', price: 195, mrp: 230, inStock: true },
      { id: 'g-22-875g', name: '875 g Value Pack', price: 345, mrp: 399, inStock: true }
    ],
    inStock: true,
    description: 'Golden crunchy corn flakes fortified with 8 essential vitamins and iron for breakfast.',
    details: {
      shelfLife: '12 Months',
      origin: 'Gujarat, India',
      manufacturer: "Kellogg India"
    },
    rating: 4.6,
    reviewCount: 112,
    tags: ['breakfast', 'cereal', 'cornflakes']
  },
  {
    id: 'g-23',
    name: 'Wagh Bakri Premium CTC Tea',
    brand: 'Wagh Bakri',
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Tea, Coffee & Beverages',
    images: [createProductImage('beverage', 'Wagh Bakri Tea', 'Groceries', '#9E3F05', '#FEF08A')],
    price: 275,
    mrp: 320,
    unit: '500 g Pouch',
    variants: [
      { id: 'g-23-500g', name: '500 g', price: 275, mrp: 320, inStock: true },
      { id: 'g-23-1kg', name: '1 kg', price: 540, mrp: 630, inStock: true }
    ],
    inStock: true,
    description: 'Popular choice across western India known for strong liquor color and consistency.',
    details: {
      shelfLife: '12 Months',
      origin: 'Gujarat, India',
      manufacturer: 'Gujarat Tea Processors'
    },
    rating: 4.8,
    reviewCount: 190,
    tags: ['tea', 'chai', 'wagh bakri']
  },
  {
    id: 'g-24',
    name: 'Madhur Pure & Hygienic Refined Sugar',
    brand: 'Madhur',
    category: 'groceries',
    categoryLabel: 'Groceries',
    subcategory: 'Atta, Rice & Dal',
    images: [createProductImage('flour', 'Madhur Refined Sugar', 'Groceries', '#C2570C', '#F3F4F6')],
    price: 52,
    mrp: 58,
    unit: '1 kg Pouch',
    variants: [
      { id: 'g-24-1kg', name: '1 kg', price: 52, mrp: 58, inStock: true },
      { id: 'g-24-5kg', name: '5 kg', price: 250, mrp: 285, inStock: true }
    ],
    inStock: false, // out of stock showcase
    description: 'Sulphur-free crystal sugar produced via untouched hygienic automated packaging.',
    details: {
      shelfLife: '24 Months',
      origin: 'Maharashtra, India',
      manufacturer: 'Shree Renuka Sugars'
    },
    rating: 4.7,
    reviewCount: 96,
    tags: ['sugar', 'chini', 'madhur']
  },

  // ==================== COSMETICS & PERSONAL CARE (14 Items) ====================
  {
    id: 'c-1',
    name: 'Nivea Soft Light Non-Greasy Moisturiser',
    brand: 'Nivea',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics',
    subcategory: 'Creams & Lotions',
    images: [createProductImage('cream', 'Nivea Soft Cream', 'Cosmetics', '#1E40AF', '#FFFFFF')],
    price: 199,
    mrp: 249,
    unit: '200 ml Tub',
    variants: [
      { id: 'c-1-100ml', name: '100 ml', price: 115, mrp: 140, inStock: true },
      { id: 'c-1-200ml', name: '200 ml', price: 199, mrp: 249, inStock: true },
      { id: 'c-1-300ml', name: '300 ml', price: 289, mrp: 360, inStock: true }
    ],
    inStock: true,
    description: 'Enriched with Vitamin E and Jojoba oil. Quick absorbing fresh moisture for face, hands and body.',
    details: {
      shelfLife: '30 Months',
      origin: 'Gujarat, India',
      manufacturer: 'Nivea India Pvt Ltd',
      benefits: ['Fast absorption', 'Non-sticky formula', 'Dermatologically approved']
    },
    rating: 4.8,
    reviewCount: 280,
    isBestSeller: true,
    tags: ['nivea', 'cream', 'moisturiser', 'skin']
  },
  {
    id: 'c-2',
    name: 'Himalaya Purifying Neem Face Wash',
    brand: 'Himalaya',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics',
    subcategory: 'Face Care & Serums',
    images: [createProductImage('shampoo', 'Himalaya Neem Face Wash', 'Cosmetics', '#059669', '#A7F3D0')],
    price: 145,
    mrp: 175,
    unit: '150 ml Tube',
    variants: [
      { id: 'c-2-100ml', name: '100 ml', price: 98, mrp: 120, inStock: true },
      { id: 'c-2-150ml', name: '150 ml', price: 145, mrp: 175, inStock: true },
      { id: 'c-2-300ml', name: '300 ml Pump', price: 270, mrp: 330, inStock: true }
    ],
    inStock: true,
    description: 'Herbal formulation containing Neem and Turmeric cleans impurities and prevents pimples.',
    details: {
      shelfLife: '36 Months',
      origin: 'Bengaluru, India',
      manufacturer: 'The Himalaya Drug Company'
    },
    rating: 4.7,
    reviewCount: 310,
    isBestSeller: true,
    isDealOfDay: true,
    tags: ['face wash', 'himalaya', 'neem', 'pimple']
  },
  {
    id: 'c-3',
    name: 'Dettol Original Germ Protection Bathing Soap',
    brand: 'Dettol',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics',
    subcategory: 'Bath & Body Wash',
    images: [createProductImage('cream', 'Dettol Soap Pack', 'Cosmetics', '#15803D', '#FFFFFF')],
    price: 168,
    mrp: 195,
    unit: 'Pack of 4 + 1 Free (125 g each)',
    variants: [
      { id: 'c-3-p4', name: 'Pack of 5 (125 g each)', price: 168, mrp: 195, inStock: true }
    ],
    inStock: true,
    description: 'Trusted 99.9% protection against illness-causing germs with pine fragrance.',
    details: {
      shelfLife: '36 Months',
      origin: 'Himachal Pradesh, India',
      manufacturer: 'Reckitt Benckiser'
    },
    rating: 4.8,
    reviewCount: 450,
    isDailyEssential: true,
    tags: ['dettol', 'soap', 'bath', 'germs']
  },
  {
    id: 'c-4',
    name: 'Dove Intense Repair Shampoo with Keratin',
    brand: 'Dove',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics',
    subcategory: 'Hair Care & Shampoos',
    images: [createProductImage('shampoo', 'Dove Intense Repair', 'Cosmetics', '#1E3A8A', '#FEF3C7')],
    price: 340,
    mrp: 420,
    unit: '650 ml Bottle',
    variants: [
      { id: 'c-4-340ml', name: '340 ml', price: 195, mrp: 240, inStock: true },
      { id: 'c-4-650ml', name: '650 ml', price: 340, mrp: 420, inStock: true }
    ],
    inStock: true,
    description: 'Formulated with Keratin Actives that penetrate deep to restore damaged hair fibers.',
    details: {
      shelfLife: '24 Months',
      origin: 'Maharashtra, India',
      manufacturer: 'Hindustan Unilever'
    },
    rating: 4.7,
    reviewCount: 215,
    tags: ['dove', 'shampoo', 'hair', 'keratin']
  },
  {
    id: 'c-5',
    name: 'Parachute 100% Pure Coconut Hair Oil',
    brand: 'Parachute',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics',
    subcategory: 'Hair Care & Shampoos',
    images: [createProductImage('oil', 'Parachute Coconut Oil', 'Cosmetics', '#1D4ED8', '#60A5FA')],
    price: 135,
    mrp: 155,
    unit: '300 ml Bottle',
    variants: [
      { id: 'c-5-175ml', name: '175 ml', price: 82, mrp: 95, inStock: true },
      { id: 'c-5-300ml', name: '300 ml', price: 135, mrp: 155, inStock: true },
      { id: 'c-5-600ml', name: '600 ml', price: 250, mrp: 290, inStock: true }
    ],
    inStock: true,
    description: 'Made from naturally sun-dried Malabar copras with 5-stage purification process.',
    details: {
      shelfLife: '18 Months',
      origin: 'Kerala, India',
      manufacturer: 'Marico Limited'
    },
    rating: 4.9,
    reviewCount: 380,
    isDailyEssential: true,
    tags: ['coconut oil', 'parachute', 'tel']
  },
  {
    id: 'c-6',
    name: "Pond's Bright Beauty Serum Cream SPF 15",
    brand: "Pond's",
    category: 'cosmetics',
    categoryLabel: 'Cosmetics',
    subcategory: 'Creams & Lotions',
    images: [createProductImage('cream', "Pond's Bright Cream", 'Cosmetics', '#DB2777', '#FCE7F3')],
    price: 130,
    mrp: 160,
    unit: '50 g Tub',
    variants: [
      { id: 'c-6-35g', name: '35 g', price: 89, mrp: 110, inStock: true },
      { id: 'c-6-50g', name: '50 g', price: 130, mrp: 160, inStock: true }
    ],
    inStock: true,
    description: 'Infused with Vitamin B3+ (Niacinamide) to fade stubborn dark spots and provide even glow.',
    details: {
      shelfLife: '36 Months',
      origin: 'Assam, India',
      manufacturer: 'Hindustan Unilever'
    },
    rating: 4.6,
    reviewCount: 165,
    tags: ['ponds', 'cream', 'face cream', 'glow']
  },
  {
    id: 'c-7',
    name: 'Bajaj Almond Drops Non-Sticky Hair Oil',
    brand: 'Bajaj',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics',
    subcategory: 'Hair Care & Shampoos',
    images: [createProductImage('oil', 'Bajaj Almond Oil', 'Cosmetics', '#D97706', '#FEF3C7')],
    price: 160,
    mrp: 195,
    unit: '300 ml Glass Bottle',
    variants: [
      { id: 'c-7-190ml', name: '190 ml', price: 110, mrp: 135, inStock: true },
      { id: 'c-7-300ml', name: '300 ml', price: 160, mrp: 195, inStock: true }
    ],
    inStock: true,
    description: 'Enriched with 6x Vitamin E and sweet almond oil extracts that strengthen hair roots.',
    details: {
      shelfLife: '36 Months',
      origin: 'Uttarakhand, India',
      manufacturer: 'Bajaj Consumer Care'
    },
    rating: 4.7,
    reviewCount: 180,
    tags: ['hair oil', 'bajaj', 'almond oil']
  },
  {
    id: 'c-8',
    name: 'Vaseline Intensive Care Deep Moisture Body Lotion',
    brand: 'Vaseline',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics',
    subcategory: 'Creams & Lotions',
    images: [createProductImage('shampoo', 'Vaseline Deep Moisture', 'Cosmetics', '#EAB308', '#FEF9C3')],
    price: 260,
    mrp: 335,
    unit: '400 ml Pump Bottle',
    variants: [
      { id: 'c-8-200ml', name: '200 ml', price: 140, mrp: 180, inStock: true },
      { id: 'c-8-400ml', name: '400 ml Pump', price: 260, mrp: 335, inStock: true }
    ],
    inStock: true,
    description: 'Infused with micro-droplets of Vaseline Jelly to heal dry skin and hydrate for 48 hours.',
    details: {
      shelfLife: '24 Months',
      origin: 'Maharashtra, India',
      manufacturer: 'Hindustan Unilever'
    },
    rating: 4.8,
    reviewCount: 290,
    isBestSeller: true,
    tags: ['vaseline', 'body lotion', 'moisturiser']
  },
  {
    id: 'c-9',
    name: 'Pears Pure & Gentle Glycerine Bathing Bar',
    brand: 'Pears',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics',
    subcategory: 'Bath & Body Wash',
    images: [createProductImage('cream', 'Pears Glycerine Soap', 'Cosmetics', '#D97706', '#FFFFFF')],
    price: 175,
    mrp: 210,
    unit: 'Pack of 3 x 125 g',
    variants: [
      { id: 'c-9-p3', name: 'Pack of 3 (125 g)', price: 175, mrp: 210, inStock: true }
    ],
    inStock: true,
    description: 'Crafted with 98% pure glycerine and natural botanical oils for gentle skin hydration.',
    details: {
      shelfLife: '36 Months',
      origin: 'Maharashtra, India',
      manufacturer: 'Hindustan Unilever'
    },
    rating: 4.7,
    reviewCount: 142,
    tags: ['pears', 'soap', 'glycerine']
  },
  {
    id: 'c-10',
    name: 'Head & Shoulders Cool Menthol Anti-Dandruff Shampoo',
    brand: 'Head & Shoulders',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics',
    subcategory: 'Hair Care & Shampoos',
    images: [createProductImage('shampoo', 'H&S Cool Menthol', 'Cosmetics', '#0284C7', '#BAE6FD')],
    price: 360,
    mrp: 450,
    unit: '650 ml Bottle',
    variants: [
      { id: 'c-10-340ml', name: '340 ml', price: 205, mrp: 260, inStock: true },
      { id: 'c-10-650ml', name: '650 ml', price: 360, mrp: 450, inStock: true }
    ],
    inStock: true,
    description: 'Cool menthol tingling freshness cleanses dandruff flakes and calms itchy scalp.',
    details: {
      shelfLife: '36 Months',
      origin: 'Andhra Pradesh, India',
      manufacturer: 'Procter & Gamble'
    },
    rating: 4.7,
    reviewCount: 230,
    tags: ['shampoo', 'head and shoulders', 'dandruff']
  },
  {
    id: 'c-11',
    name: 'Biotique Bio Green Apple Fresh Daily Purifying Shampoo',
    brand: 'Biotique',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics',
    subcategory: 'Hair Care & Shampoos',
    images: [createProductImage('shampoo', 'Biotique Green Apple', 'Cosmetics', '#16A34A', '#BBF7D0')],
    price: 155,
    mrp: 199,
    unit: '190 ml Bottle',
    variants: [
      { id: 'c-11-190ml', name: '190 ml', price: 155, mrp: 199, inStock: true }
    ],
    inStock: true,
    description: '100% Ayurvedic recipe blended with pure green apple extract, sea algae and centella.',
    details: {
      shelfLife: '36 Months',
      origin: 'Himachal Pradesh, India',
      manufacturer: 'Bio Veda Action Research'
    },
    rating: 4.6,
    reviewCount: 95,
    tags: ['biotique', 'ayurvedic', 'shampoo']
  },
  {
    id: 'c-12',
    name: 'Boroline Ayurvedic Antiseptic Healing Cream',
    brand: 'Boroline',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics',
    subcategory: 'Creams & Lotions',
    images: [createProductImage('cream', 'Boroline Healing Cream', 'Cosmetics', '#15803D', '#FFFFFF')],
    price: 45,
    mrp: 50,
    unit: '40 g Tube',
    variants: [
      { id: 'c-12-20g', name: '20 g', price: 25, mrp: 28, inStock: true },
      { id: 'c-12-40g', name: '40 g', price: 45, mrp: 50, inStock: true }
    ],
    inStock: true,
    description: 'Night repair wonder cream for cracked lips, rough elbows, and dry winter heels.',
    details: {
      shelfLife: '36 Months',
      origin: 'Kolkata, India',
      manufacturer: 'G.D. Pharmaceuticals'
    },
    rating: 4.9,
    reviewCount: 360,
    isDailyEssential: true,
    tags: ['boroline', 'antiseptic', 'cream']
  },
  {
    id: 'c-13',
    name: 'Denver Hamilton Long Lasting Deodorant Spray',
    brand: 'Denver',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics',
    subcategory: 'Deodorants & Perfumes',
    images: [createProductImage('shampoo', 'Denver Hamilton Deo', 'Cosmetics', '#1E293B', '#F5B718')],
    price: 175,
    mrp: 230,
    unit: '165 ml Spray Can',
    variants: [
      { id: 'c-13-165ml', name: '165 ml', price: 175, mrp: 230, inStock: true }
    ],
    inStock: true,
    description: 'Aromatic spicy woody masculine fragrance that controls sweat odors throughout the day.',
    details: {
      shelfLife: '36 Months',
      origin: 'Uttarakhand, India',
      manufacturer: 'Vanesa Care Pvt Ltd'
    },
    rating: 4.6,
    reviewCount: 160,
    tags: ['deo', 'denver', 'perfume', 'spray']
  },
  {
    id: 'c-14',
    name: 'Wild Stone Ultra Sensual Eau De Parfum',
    brand: 'Wild Stone',
    category: 'cosmetics',
    categoryLabel: 'Cosmetics',
    subcategory: 'Deodorants & Perfumes',
    images: [createProductImage('shampoo', 'Wild Stone EDP', 'Cosmetics', '#991B1B', '#F5B718')],
    price: 349,
    mrp: 499,
    unit: '100 ml Bottle',
    variants: [
      { id: 'c-14-100ml', name: '100 ml', price: 349, mrp: 499, inStock: true }
    ],
    inStock: true,
    description: 'Zesty lemon and fresh mint blended with cedarwood notes for confident party evenings.',
    details: {
      shelfLife: '36 Months',
      origin: 'Kolkata, India',
      manufacturer: 'McNROE Consumer Products'
    },
    rating: 4.7,
    reviewCount: 175,
    isDealOfDay: true,
    tags: ['perfume', 'wild stone', 'fragrance']
  },

  // ==================== STATIONERY & STUDENT MART (14 Items) ====================
  {
    id: 's-1',
    name: 'Classmate Pulse 6-Subject Spiral Notebook A4',
    brand: 'Classmate',
    category: 'stationery',
    categoryLabel: 'Stationery',
    subcategory: 'Notebooks & Registers',
    images: [createProductImage('notebook', 'Classmate Spiral A4', 'Stationery', '#9E3F05', '#F5B718')],
    price: 170,
    mrp: 200,
    unit: '300 Pages (Single Line)',
    variants: [
      { id: 's-1-200p', name: '200 Pages', price: 125, mrp: 150, inStock: true },
      { id: 's-1-300p', name: '300 Pages', price: 170, mrp: 200, inStock: true }
    ],
    inStock: true,
    description: 'High-brightness ozone-treated white paper with durable poly cover and subject divider tags.',
    details: {
      origin: 'Chennai, India',
      manufacturer: 'ITC Limited',
      benefits: ['70 GSM ultra white paper', 'Tear-resistant spiral binding', 'Subject separator sheets']
    },
    rating: 4.9,
    reviewCount: 310,
    isBestSeller: true,
    isBackToSchool: true,
    tags: ['notebook', 'classmate', 'register', 'spiral', 'student']
  },
  {
    id: 's-2',
    name: 'Cello Butterflow Classic Blue Ball Pens Pack',
    brand: 'Cello',
    category: 'stationery',
    categoryLabel: 'Stationery',
    subcategory: 'Pens & Writing',
    images: [createProductImage('pen', 'Cello Butterflow Pens', 'Stationery', '#1D4ED8', '#60A5FA')],
    price: 45,
    mrp: 50,
    unit: 'Pack of 5 Pens',
    variants: [
      { id: 's-2-5p', name: 'Pack of 5', price: 45, mrp: 50, inStock: true },
      { id: 's-2-10p', name: 'Pack of 10 Box', price: 85, mrp: 100, inStock: true },
      { id: 's-2-20p', name: 'Value Jar (20 Pens)', price: 165, mrp: 200, inStock: true }
    ],
    inStock: true,
    description: 'Legendary lubricated ball pen technology for smooth, smudge-free and fast examination writing.',
    details: {
      origin: 'Daman, India',
      manufacturer: 'BIC Cello India'
    },
    rating: 4.8,
    reviewCount: 420,
    isBestSeller: true,
    isBackToSchool: true,
    tags: ['pen', 'cello', 'butterflow', 'ball pen']
  },
  {
    id: 's-3',
    name: 'Nataraj 621 Bold Pencils Box with Eraser & Sharpener',
    brand: 'Nataraj',
    category: 'stationery',
    categoryLabel: 'Stationery',
    subcategory: 'Pens & Writing',
    images: [createProductImage('pen', 'Nataraj 621 Pencils', 'Stationery', '#DC2626', '#1B1209')],
    price: 55,
    mrp: 65,
    unit: 'Box of 10 Pencils',
    variants: [
      { id: 's-3-10p', name: 'Box of 10', price: 55, mrp: 65, inStock: true }
    ],
    inStock: true,
    description: 'Superior bonded lead that resists breaking during sharpening. Includes free eraser and sharpener.',
    details: {
      origin: 'Mumbai, India',
      manufacturer: 'Hindustan Pencils Pvt Ltd'
    },
    rating: 4.8,
    reviewCount: 290,
    isBackToSchool: true,
    tags: ['pencil', 'nataraj', 'lead pencil', 'school']
  },
  {
    id: 's-4',
    name: 'Classmate Hardbound Long Register Notebooks',
    brand: 'Classmate',
    category: 'stationery',
    categoryLabel: 'Stationery',
    subcategory: 'Notebooks & Registers',
    images: [createProductImage('notebook', 'Classmate Long Register', 'Stationery', '#C2570C', '#FEF3C7')],
    price: 195,
    mrp: 240,
    unit: 'Pack of 3 (172 pgs each)',
    variants: [
      { id: 's-4-p3', name: 'Pack of 3 Registers', price: 195, mrp: 240, inStock: true },
      { id: 's-4-p6', name: 'Pack of 6 Value Pack', price: 380, mrp: 480, inStock: true }
    ],
    inStock: true,
    description: 'College ruled sturdy bound registers ideal for Samarpan coaching notes, accounts and revision.',
    details: {
      origin: 'Tamil Nadu, India',
      manufacturer: 'ITC Limited'
    },
    rating: 4.8,
    reviewCount: 185,
    isBestSeller: true,
    isBackToSchool: true,
    tags: ['register', 'copy', 'classmate', 'college']
  },
  {
    id: 's-5',
    name: 'Camlin Kokuyo Student Oil Pastels',
    brand: 'Camlin',
    category: 'stationery',
    categoryLabel: 'Stationery',
    subcategory: 'Art & Craft',
    images: [createProductImage('notebook', 'Camlin Oil Pastels', 'Stationery', '#EA580C', '#38BDF8')],
    price: 85,
    mrp: 100,
    unit: '25 Rich Vibrant Shades',
    variants: [
      { id: 's-5-15s', name: '15 Shades', price: 50, mrp: 60, inStock: true },
      { id: 's-5-25s', name: '25 Shades Box', price: 85, mrp: 100, inStock: true }
    ],
    inStock: true,
    description: 'Smooth inter-mixable shades with scraping tool for school drawing competitions.',
    details: {
      origin: 'Maharashtra, India',
      manufacturer: 'Kokuyo Camlin Ltd'
    },
    rating: 4.7,
    reviewCount: 130,
    tags: ['colors', 'pastels', 'camlin', 'drawing']
  },
  {
    id: 's-6',
    name: 'Reynolds 045 Fine Carbure Blue Ball Pens',
    brand: 'Reynolds',
    category: 'stationery',
    categoryLabel: 'Stationery',
    subcategory: 'Pens & Writing',
    images: [createProductImage('pen', 'Reynolds 045 Box', 'Stationery', '#2563EB', '#FFFFFF')],
    price: 90,
    mrp: 100,
    unit: 'Box of 10 Pens',
    variants: [
      { id: 's-6-10p', name: 'Box of 10 Pens', price: 90, mrp: 100, inStock: true }
    ],
    inStock: true,
    description: 'The time-tested laser-tip classic pen known for crisp non-smudge fine handwriting.',
    details: {
      origin: 'Tamil Nadu, India',
      manufacturer: 'Reynolds India'
    },
    rating: 4.8,
    reviewCount: 210,
    isBackToSchool: true,
    tags: ['reynolds', 'pen', '045', 'blue pen']
  },
  {
    id: 's-7',
    name: 'Fevicol MR Easy Squeezy Adhesive Bottle',
    brand: 'Fevicol',
    category: 'stationery',
    categoryLabel: 'Stationery',
    subcategory: 'Art & Craft',
    images: [createProductImage('shampoo', 'Fevicol MR Bottle', 'Stationery', '#1D4ED8', '#FACC15')],
    price: 45,
    mrp: 50,
    unit: '100 g Bottle',
    variants: [
      { id: 's-7-50g', name: '50 g', price: 25, mrp: 30, inStock: true },
      { id: 's-7-100g', name: '100 g Squeezy', price: 45, mrp: 50, inStock: true }
    ],
    inStock: true,
    description: 'Non-staining white craft glue that dries clear. Essential for student charts and model projects.',
    details: {
      origin: 'Gujarat, India',
      manufacturer: 'Pidilite Industries'
    },
    rating: 4.9,
    reviewCount: 340,
    isDailyEssential: true,
    tags: ['fevicol', 'glue', 'adhesive', 'craft']
  },
  {
    id: 's-8',
    name: 'Kangaro Standard Desk Stapler No. 10 with Pins Box',
    brand: 'Kangaro',
    category: 'stationery',
    categoryLabel: 'Stationery',
    subcategory: 'Office & Files',
    images: [createProductImage('pen', 'Kangaro Stapler Set', 'Stationery', '#475569', '#E2E8F0')],
    price: 85,
    mrp: 105,
    unit: 'Stapler + 1000 Pins Box',
    variants: [
      { id: 's-8-set', name: 'Stapler + Pins Set', price: 85, mrp: 105, inStock: true }
    ],
    inStock: true,
    description: 'All-metal compact stapler with quick staple indicator and integrated staple remover.',
    details: {
      origin: 'Punjab, India',
      manufacturer: 'Kangaro Industries'
    },
    rating: 4.8,
    reviewCount: 160,
    tags: ['stapler', 'kangaro', 'office', 'pins']
  },
  {
    id: 's-9',
    name: 'Doms Neon Eraser & Dust-Free Sharpener Combo',
    brand: 'Doms',
    category: 'stationery',
    categoryLabel: 'Stationery',
    subcategory: 'Exam & Geometry Kits',
    images: [createProductImage('pen', 'Doms Neon Erasers', 'Stationery', '#EC4899', '#A855F7')],
    price: 35,
    mrp: 40,
    unit: 'Pack of 5 Erasers + 2 Sharpeners',
    variants: [
      { id: 's-9-set', name: 'Pack of 5 + 2', price: 35, mrp: 40, inStock: true }
    ],
    inStock: true,
    description: 'Dust-free soft formula removes pencil graphite cleanly without tearing delicate book pages.',
    details: {
      origin: 'Gujarat, India',
      manufacturer: 'Doms Industries'
    },
    rating: 4.7,
    reviewCount: 120,
    tags: ['eraser', 'sharpener', 'doms', 'school']
  },
  {
    id: 's-10',
    name: 'Luxor Pastel & Neon Chisel Highlighter Set',
    brand: 'Luxor',
    category: 'stationery',
    categoryLabel: 'Stationery',
    subcategory: 'Pens & Writing',
    images: [createProductImage('pen', 'Luxor Highlighters', 'Stationery', '#84CC16', '#FDE047')],
    price: 110,
    mrp: 135,
    unit: 'Set of 5 Colors',
    variants: [
      { id: 's-10-5c', name: 'Set of 5 Assorted', price: 110, mrp: 135, inStock: true }
    ],
    inStock: true,
    description: 'Fluorescent fade-resistant water-based Japanese ink for marking important book concepts.',
    details: {
      origin: 'Noida, India',
      manufacturer: 'Luxor Writing Instruments'
    },
    rating: 4.8,
    reviewCount: 175,
    isDealOfDay: true,
    tags: ['highlighter', 'luxor', 'study', 'pens']
  },
  {
    id: 's-11',
    name: 'Oddy Pastel Self-Adhesive Sticky Notes Pad',
    brand: 'Oddy',
    category: 'stationery',
    categoryLabel: 'Stationery',
    subcategory: 'Office & Files',
    images: [createProductImage('notebook', 'Oddy Sticky Notes', 'Stationery', '#FDE047', '#FEF08A')],
    price: 55,
    mrp: 70,
    unit: '3 x 3 Inches (100 Sheets)',
    variants: [
      { id: 's-11-100s', name: '100 Sheets (Yellow)', price: 55, mrp: 70, inStock: true }
    ],
    inStock: true,
    description: 'Removable repositionable adhesive pads for reminders on desks, books and monitors.',
    details: {
      origin: 'Delhi, India',
      manufacturer: 'Oddy Stationery'
    },
    rating: 4.6,
    reviewCount: 88,
    tags: ['sticky notes', 'oddy', 'notes']
  },
  {
    id: 's-12',
    name: 'Camlin Scholar Mathematical Geometry Drawing Box',
    brand: 'Camlin',
    category: 'stationery',
    categoryLabel: 'Stationery',
    subcategory: 'Exam & Geometry Kits',
    images: [createProductImage('pen', 'Camlin Geometry Box', 'Stationery', '#0284C7', '#E2E8F0')],
    price: 140,
    mrp: 165,
    unit: 'Complete Instrument Set',
    variants: [
      { id: 's-12-box', name: 'Scholar Tin Box', price: 140, mrp: 165, inStock: true }
    ],
    inStock: true,
    description: 'Rust-resistant die-cast compass and divider with transparent mm-accurate ruler and set squares.',
    details: {
      origin: 'Maharashtra, India',
      manufacturer: 'Kokuyo Camlin Ltd'
    },
    rating: 4.8,
    reviewCount: 215,
    isBackToSchool: true,
    tags: ['geometry box', 'compass', 'camlin', 'maths']
  },
  {
    id: 's-13',
    name: 'Solo Executive Expanding Document Check Folder',
    brand: 'Solo',
    category: 'stationery',
    categoryLabel: 'Stationery',
    subcategory: 'Office & Files',
    images: [createProductImage('notebook', 'Solo Document Folder', 'Stationery', '#334155', '#94A3B8')],
    price: 165,
    mrp: 210,
    unit: '12 Pockets with Index Tabs',
    variants: [
      { id: 's-13-12p', name: '12 Pockets A4', price: 165, mrp: 210, inStock: true }
    ],
    inStock: true,
    description: 'Polypropylene water-resistant expanding file with buckle lock for certificates and bills.',
    details: {
      origin: 'Delhi, India',
      manufacturer: 'Filex Systems Pvt Ltd'
    },
    rating: 4.7,
    reviewCount: 92,
    tags: ['folder', 'file', 'solo', 'documents']
  },
  {
    id: 's-14',
    name: 'Navneet Youva Graph & Practical Science Notebook',
    brand: 'Navneet',
    category: 'stationery',
    categoryLabel: 'Stationery',
    subcategory: 'Notebooks & Registers',
    images: [createProductImage('notebook', 'Navneet Graph Copy', 'Stationery', '#059669', '#E0F2FE')],
    price: 50,
    mrp: 60,
    unit: '64 Pages (mm grid)',
    variants: [
      { id: 's-14-64p', name: '64 Pages', price: 50, mrp: 60, inStock: true }
    ],
    inStock: true,
    description: 'High precision millimeter graph sheets bound with interleaf ruled pages for school labs.',
    details: {
      origin: 'Gujarat, India',
      manufacturer: 'Navneet Education Ltd'
    },
    rating: 4.7,
    reviewCount: 75,
    tags: ['graph', 'navneet', 'practical', 'school']
  },

  // ==================== HOME ESSENTIALS & CLEANING (14 Items) ====================
  {
    id: 'h-1',
    name: 'Lizol Citrus Disinfectant Surface Floor Cleaner',
    brand: 'Lizol',
    category: 'home-essentials',
    categoryLabel: 'Home Essentials',
    subcategory: 'Cleaners & Disinfectants',
    images: [createProductImage('cleaner', 'Lizol Floor Cleaner', 'Home', '#EA580C', '#FEF08A')],
    price: 198,
    mrp: 235,
    unit: '1 L Bottle',
    variants: [
      { id: 'h-1-500ml', name: '500 ml', price: 105, mrp: 120, inStock: true },
      { id: 'h-1-1l', name: '1 L Citrus', price: 198, mrp: 235, inStock: true },
      { id: 'h-1-2l', name: '2 L Value Pack', price: 375, mrp: 450, inStock: true }
    ],
    inStock: true,
    description: 'Triple action kills 99.9% germs, lifts tough grease and leaves a fresh citrus aroma.',
    details: {
      shelfLife: '24 Months',
      origin: 'Himachal Pradesh, India',
      manufacturer: 'Reckitt Benckiser'
    },
    rating: 4.9,
    reviewCount: 395,
    isBestSeller: true,
    isDailyEssential: true,
    tags: ['lizol', 'floor cleaner', 'disinfectant']
  },
  {
    id: 'h-2',
    name: 'Surf Excel Easy Wash Detergent Powder',
    brand: 'Surf Excel',
    category: 'home-essentials',
    categoryLabel: 'Home Essentials',
    subcategory: 'Detergents & Fabric Care',
    images: [createProductImage('detergent', 'Surf Excel Detergent', 'Home', '#1D4ED8', '#F97316')],
    price: 142,
    mrp: 165,
    unit: '1 kg Pouch',
    variants: [
      { id: 'h-2-1kg', name: '1 kg', price: 142, mrp: 165, inStock: true },
      { id: 'h-2-3kg', name: '3 kg Pouch', price: 395, mrp: 465, inStock: true },
      { id: 'h-2-5kg', name: '5 kg Mega Bag', price: 630, mrp: 750, inStock: true }
    ],
    inStock: true,
    description: 'Micro-granule technology that dissolves instantly and cleans clay, oil and collar stains with zero scrub.',
    details: {
      shelfLife: '36 Months',
      origin: 'Gujarat, India',
      manufacturer: 'Hindustan Unilever'
    },
    rating: 4.8,
    reviewCount: 480,
    isBestSeller: true,
    isDailyEssential: true,
    tags: ['surf excel', 'detergent', 'washing powder']
  },
  {
    id: 'h-3',
    name: 'Harpic Power Plus 10X Max Clean Toilet Cleaner',
    brand: 'Harpic',
    category: 'home-essentials',
    categoryLabel: 'Home Essentials',
    subcategory: 'Cleaners & Disinfectants',
    images: [createProductImage('cleaner', 'Harpic Power Plus', 'Home', '#1E3A8A', '#EF4444')],
    price: 180,
    mrp: 215,
    unit: '1 L Bottle',
    variants: [
      { id: 'h-3-500ml', name: '500 ml', price: 95, mrp: 110, inStock: true },
      { id: 'h-3-1l', name: '1 L Original', price: 180, mrp: 215, inStock: true }
    ],
    inStock: true,
    description: 'Thick blue liquid formula adheres to curved bowl rims to remove yellow tartar and hard water stains.',
    details: {
      shelfLife: '24 Months',
      origin: 'Rajasthan, India',
      manufacturer: 'Reckitt Benckiser'
    },
    rating: 4.8,
    reviewCount: 310,
    isDailyEssential: true,
    tags: ['harpic', 'toilet cleaner', 'cleaning']
  },
  {
    id: 'h-4',
    name: 'Vim Lemon Dishwash Gel with Scrub Pad Combo',
    brand: 'Vim',
    category: 'home-essentials',
    categoryLabel: 'Home Essentials',
    subcategory: 'Kitchen Utensils & Mops',
    images: [createProductImage('cleaner', 'Vim Dishwash Gel', 'Home', '#EAB308', '#22C55E')],
    price: 135,
    mrp: 160,
    unit: '750 ml Bottle + Free Scrub',
    variants: [
      { id: 'h-4-250ml', name: '250 ml', price: 55, mrp: 65, inStock: true },
      { id: 'h-4-750ml', name: '750 ml + Scrub Pad', price: 135, mrp: 160, inStock: true }
    ],
    inStock: true,
    description: 'Concentrated power of 100 lemons. Just 1 teaspoon cleans an entire sink of oily pans without white residue.',
    details: {
      shelfLife: '24 Months',
      origin: 'Uttarakhand, India',
      manufacturer: 'Hindustan Unilever'
    },
    rating: 4.8,
    reviewCount: 290,
    isBestSeller: true,
    tags: ['vim', 'dishwash', 'bartan', 'lemon']
  },
  {
    id: 'h-5',
    name: 'Dettol Disinfectant Liquid Lime Fresh Antiseptic',
    brand: 'Dettol',
    category: 'home-essentials',
    categoryLabel: 'Home Essentials',
    subcategory: 'Cleaners & Disinfectants',
    images: [createProductImage('cleaner', 'Dettol Disinfectant', 'Home', '#15803D', '#FACC15')],
    price: 195,
    mrp: 230,
    unit: '500 ml Bottle',
    variants: [
      { id: 'h-5-500ml', name: '500 ml Lime Fresh', price: 195, mrp: 230, inStock: true },
      { id: 'h-5-1l', name: '1 L Economy', price: 345, mrp: 410, inStock: true }
    ],
    inStock: true,
    description: 'Multi-purpose sanitiser for laundry rinse, bathroom floor cleaning and surface disinfection.',
    details: {
      shelfLife: '36 Months',
      origin: 'Himachal Pradesh, India',
      manufacturer: 'Reckitt Benckiser'
    },
    rating: 4.8,
    reviewCount: 190,
    tags: ['dettol', 'disinfectant', 'hygiene']
  },
  {
    id: 'h-6',
    name: 'Ariel Matic Front & Top Load Liquid Detergent',
    brand: 'Ariel',
    category: 'home-essentials',
    categoryLabel: 'Home Essentials',
    subcategory: 'Detergents & Fabric Care',
    images: [createProductImage('cleaner', 'Ariel Matic Liquid', 'Home', '#047857', '#34D399')],
    price: 260,
    mrp: 320,
    unit: '1 L Pouch',
    variants: [
      { id: 'h-6-1l', name: '1 L Pouch', price: 260, mrp: 320, inStock: true },
      { id: 'h-6-2l', name: '2 L Bottle', price: 490, mrp: 590, inStock: true }
    ],
    inStock: true,
    description: 'Tough stain removal in 1 wash inside the washing machine. Gentle on bright fabric colors.',
    details: {
      shelfLife: '24 Months',
      origin: 'Andhra Pradesh, India',
      manufacturer: 'Procter & Gamble'
    },
    rating: 4.7,
    reviewCount: 165,
    isDealOfDay: true,
    tags: ['ariel', 'liquid detergent', 'washing machine']
  },
  {
    id: 'h-7',
    name: 'Godrej aer Pocket Bathroom Fragrance Gel',
    brand: 'Godrej aer',
    category: 'home-essentials',
    categoryLabel: 'Home Essentials',
    subcategory: 'Air Fresheners & Repellents',
    images: [createProductImage('cream', 'Godrej aer Pocket', 'Home', '#7C3AED', '#DDD6FE')],
    price: 65,
    mrp: 75,
    unit: 'Pack of 1 (Morning Misty Meadows)',
    variants: [
      { id: 'h-7-1p', name: '1 Pack (Meadows)', price: 65, mrp: 75, inStock: true },
      { id: 'h-7-3p', name: 'Pack of 3 Assorted', price: 180, mrp: 225, inStock: true }
    ],
    inStock: true,
    description: 'Unique gel technology keeps bathrooms smelling naturally fresh and clean for up to 30 days.',
    details: {
      shelfLife: '24 Months',
      origin: 'Madhya Pradesh, India',
      manufacturer: 'Godrej Consumer Products'
    },
    rating: 4.6,
    reviewCount: 220,
    tags: ['air freshener', 'bathroom', 'godrej']
  },
  {
    id: 'h-8',
    name: 'Comfort After Wash Fabric Conditioner Morning Fresh',
    brand: 'Comfort',
    category: 'home-essentials',
    categoryLabel: 'Home Essentials',
    subcategory: 'Detergents & Fabric Care',
    images: [createProductImage('cleaner', 'Comfort Conditioner', 'Home', '#2563EB', '#BFDBFE')],
    price: 195,
    mrp: 235,
    unit: '860 ml Bottle',
    variants: [
      { id: 'h-8-860ml', name: '860 ml Blue', price: 195, mrp: 235, inStock: true }
    ],
    inStock: true,
    description: 'Untangles cloth fibers damaged by detergents, adding 24-hour floral fragrance and soft touch.',
    details: {
      shelfLife: '24 Months',
      origin: 'Maharashtra, India',
      manufacturer: 'Hindustan Unilever'
    },
    rating: 4.8,
    reviewCount: 155,
    tags: ['fabric conditioner', 'comfort', 'laundry']
  },
  {
    id: 'h-9',
    name: 'Mangaldeep Temple Sandalwood Agarbatti Zipper',
    brand: 'Mangaldeep',
    category: 'home-essentials',
    categoryLabel: 'Home Essentials',
    subcategory: 'Pooja & Agarbatti',
    images: [createProductImage('pooja', 'Mangaldeep Agarbatti', 'Home', '#D97706', '#FEF3C7')],
    price: 90,
    mrp: 110,
    unit: 'Zipper Pack (150 Sticks)',
    variants: [
      { id: 'h-9-150s', name: '150 Sticks Pack', price: 90, mrp: 110, inStock: true }
    ],
    inStock: true,
    description: 'Aroma-locked devotional sandalwood sticks made with natural essential oils for daily pooja.',
    details: {
      shelfLife: '36 Months',
      origin: 'Mysore, Karnataka',
      manufacturer: 'ITC Limited'
    },
    rating: 4.9,
    reviewCount: 290,
    isDailyEssential: true,
    tags: ['agarbatti', 'pooja', 'incense', 'mangaldeep']
  },
  {
    id: 'h-10',
    name: 'Cycle Pure Bhimseni Camphor Karpoor Tablet Jar',
    brand: 'Cycle Pure',
    category: 'home-essentials',
    categoryLabel: 'Home Essentials',
    subcategory: 'Pooja & Agarbatti',
    images: [createProductImage('pooja', 'Bhimseni Camphor Jar', 'Home', '#C2570C', '#FFFFFF')],
    price: 135,
    mrp: 160,
    unit: '100 g Air-tight Jar',
    variants: [
      { id: 'h-10-100g', name: '100 g Jar', price: 135, mrp: 160, inStock: true }
    ],
    inStock: true,
    description: '100% pure pine tree derived Bhimseni kapoor leaves no toxic residue or black smoke during aarti.',
    details: {
      shelfLife: '36 Months',
      origin: 'Mysuru, India',
      manufacturer: 'NR Ranga Rao & Sons'
    },
    rating: 4.8,
    reviewCount: 170,
    tags: ['camphor', 'kapoor', 'pooja', 'aarti']
  },
  {
    id: 'h-11',
    name: 'Scotch-Brite Heavy Duty Scrub Sponge Pad Pack',
    brand: 'Scotch-Brite',
    category: 'home-essentials',
    categoryLabel: 'Home Essentials',
    subcategory: 'Kitchen Utensils & Mops',
    images: [createProductImage('snack', 'Scotch-Brite Sponge', 'Home', '#16A34A', '#FACC15')],
    price: 88,
    mrp: 105,
    unit: 'Pack of 3 Sponges',
    variants: [
      { id: 'h-11-p3', name: 'Pack of 3 Pads', price: 88, mrp: 105, inStock: true }
    ],
    inStock: true,
    description: 'Thick cellulose foam on one side with tough abrasive green scrub web on the other.',
    details: {
      origin: 'Bengaluru, India',
      manufacturer: '3M India Limited'
    },
    rating: 4.8,
    reviewCount: 240,
    isDailyEssential: true,
    tags: ['scrub', 'sponge', 'scotch brite', 'kitchen']
  },
  {
    id: 'h-12',
    name: 'Origami So Soft 2-Ply Kitchen Paper Towel Roll',
    brand: 'Origami',
    category: 'home-essentials',
    categoryLabel: 'Home Essentials',
    subcategory: 'Kitchen Utensils & Mops',
    images: [createProductImage('cleaner', 'Origami Paper Towel', 'Home', '#0284C7', '#FFFFFF')],
    price: 110,
    mrp: 135,
    unit: 'Twin Pack (2 x 60 Pulls)',
    variants: [
      { id: 'h-12-2p', name: 'Twin Pack (2 Rolls)', price: 110, mrp: 135, inStock: true }
    ],
    inStock: true,
    description: 'Food grade virgin fiber absorbs excess oil from hot kachoris and samosas quickly.',
    details: {
      shelfLife: '36 Months',
      origin: 'Mumbai, India',
      manufacturer: 'Origami Cell Private Limited'
    },
    rating: 4.7,
    reviewCount: 110,
    tags: ['kitchen roll', 'paper towel', 'origami']
  },
  {
    id: 'h-13',
    name: 'Kala Hit Flying Mosquito & Insect Killer Spray',
    brand: 'Hit',
    category: 'home-essentials',
    categoryLabel: 'Home Essentials',
    subcategory: 'Air Fresheners & Repellents',
    images: [createProductImage('cleaner', 'Kala Hit Spray', 'Home', '#1F2937', '#DC2626')],
    price: 195,
    mrp: 230,
    unit: '400 ml Aerosol Can',
    variants: [
      { id: 'h-13-200ml', name: '200 ml', price: 115, mrp: 130, inStock: true },
      { id: 'h-13-400ml', name: '400 ml Can', price: 195, mrp: 230, inStock: true }
    ],
    inStock: true,
    description: 'Instant knockdown formula targets dengue and malaria vectors hiding in dark room corners.',
    details: {
      shelfLife: '24 Months',
      origin: 'Madhya Pradesh, India',
      manufacturer: 'Godrej Consumer Products'
    },
    rating: 4.7,
    reviewCount: 280,
    tags: ['hit', 'mosquito spray', 'kala hit']
  },
  {
    id: 'h-14',
    name: 'Gala Dustpan with Rubber Lip & Soft Hand Broom',
    brand: 'Gala',
    category: 'home-essentials',
    categoryLabel: 'Home Essentials',
    subcategory: 'Kitchen Utensils & Mops',
    images: [createProductImage('cleaner', 'Gala Dustpan Set', 'Home', '#0D9488', '#CCFBF1')],
    price: 155,
    mrp: 195,
    unit: '1 Set (Broom + Pan)',
    variants: [
      { id: 'h-14-set', name: 'Dustpan + Brush Set', price: 155, mrp: 195, inStock: true }
    ],
    inStock: true,
    description: 'Flexible rubber lip ensures dust glides into the pan without leaving dirty floor trails.',
    details: {
      origin: 'Maharashtra, India',
      manufacturer: 'Freudenberg Gala Household'
    },
    rating: 4.8,
    reviewCount: 160,
    tags: ['dustpan', 'broom', 'gala', 'cleaning']
  }
];
