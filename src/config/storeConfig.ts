/**
 * Ajota Mart - Central Store Configuration
 * All store settings, delivery parameters, contact information,
 * and business rules live here.
 */

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 50 (₹50) or 15 (15%)
  minOrder: number;
  description: string;
  expiryText: string;
}

export interface StoreConfig {
  storeName: string;
  tagline: string;
  city: string;
  area: string;
  fullAddress: string;
  pincode: string;
  googleMapsDirectionsUrl: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
  instagram: string;
  instagramUrl: string;
  storeTimings: string;
  deliveryTimeText: string; // "Fast Local Delivery" (30-45 mins removed per instruction)
  deliveryFee: number;
  freeDeliveryThreshold: number;
  minimumOrder: number;
  serviceablePincodes: string[];
  bannerOffers: {
    id: string;
    badge: string;
    title: string;
    subtitle: string;
    ctaText: string;
    actionType: 'category' | 'search' | 'deals';
    actionTarget: string;
    bgGradient: string;
    accentColor: string;
  }[];
  trustBadges: {
    iconName: string;
    title: string;
    desc: string;
  }[];
  coupons: Coupon[];
  faqs: {
    question: string;
    answer: string;
  }[];
  policies: {
    cancellation: string;
    returns: string;
    privacy: string;
    terms: string;
  };
}

export const STORE_CONFIG: StoreConfig = {
  storeName: "Ajota Mart",
  tagline: "Jodhpur's one-stop Mart!",
  city: "Jodhpur",
  area: "Badla Road",
  fullAddress: "Badla Road, Near Samarpan Circle, Jodhpur, Rajasthan 342008",
  pincode: "342008",
  googleMapsDirectionsUrl: "https://maps.google.com/?q=Badla+Road+Jodhpur+Rajasthan",
  phone: "+919829012345",
  phoneDisplay: "+91 98290 XXXXX",
  whatsappNumber: "919829012345",
  whatsappMessage: "Hello Ajota Mart, I want to inquire about products from your Badla Road store.",
  email: "contact@ajotamart.in",
  instagram: "@ajotamartjodhpur",
  instagramUrl: "https://instagram.com/ajotamartjodhpur",
  storeTimings: "7:00 AM – 10:30 PM (All 7 Days)",
  deliveryTimeText: "Fast Local Delivery in Jodhpur", // 30-45 min removed
  deliveryFee: 29,
  freeDeliveryThreshold: 499,
  minimumOrder: 99,
  serviceablePincodes: [
    "342001", // Jodhpur City / Clock Tower
    "342002", // Sojati Gate / Sardarpura
    "342003", // Ratanada / Defense Lab
    "342005", // Shastri Nagar / Heavy Industrial Area
    "342006", // Pratap Nagar / Badla Road
    "342008", // Badla Road / Mandore / Samarpan Area
    "342011", // Kudi Bhagtasni / Basni
    "342015", // Paota / Mahamandir
  ],
  bannerOffers: [
    {
      id: "diwali-groceries",
      badge: "FESTIVE SAVINGS",
      title: "Jodhpur Kitchen Mahabachat",
      subtitle: "Atta, Pure Desi Ghee, Basmati & Spices up to 40% OFF",
      ctaText: "Shop Groceries",
      actionType: "category",
      actionTarget: "groceries",
      bgGradient: "from-[#C2570C] via-[#9E3F05] to-[#1B1209]",
      accentColor: "#F5B718"
    },
    {
      id: "back-to-school",
      badge: "STUDENT SPECIAL",
      title: "Back to School & College Mart",
      subtitle: "Classmate registers, notebooks & smooth ball pens from ₹9",
      ctaText: "Explore Stationery",
      actionType: "category",
      actionTarget: "stationery",
      bgGradient: "from-[#1B1209] via-[#331C0C] to-[#C2570C]",
      accentColor: "#FFE885"
    },
    {
      id: "personal-care",
      badge: "GLOW & CARE",
      title: "Skin & Hair Care Fest",
      subtitle: "Nivea, Himalaya, Biotique & Shampoos at honest prices",
      ctaText: "Shop Cosmetics",
      actionType: "category",
      actionTarget: "cosmetics",
      bgGradient: "from-[#8C3A05] via-[#C2570C] to-[#E8890C]",
      accentColor: "#FFF8EC"
    },
    {
      id: "home-care",
      badge: "HOME HYGIENE",
      title: "Sparkling Home Mega Deals",
      subtitle: "Floor cleaners, Detergents, Mops & Pooja essentials",
      ctaText: "Home Essentials",
      actionType: "category",
      actionTarget: "home-essentials",
      bgGradient: "from-[#291708] via-[#C2570C] to-[#D97706]",
      accentColor: "#F5B718"
    },
    {
      id: "free-delivery",
      badge: "LOCAL PERK",
      title: "Free Express Home Delivery",
      subtitle: "On all orders above ₹499 dispatched from Badla Road Mart",
      ctaText: "Order Now",
      actionType: "deals",
      actionTarget: "deals",
      bgGradient: "from-[#C2570C] via-[#E8890C] to-[#F5B718]",
      accentColor: "#1B1209"
    }
  ],
  trustBadges: [
    {
      iconName: "BadgePercent",
      title: "Best Local Prices",
      desc: "Guaranteed lower than MRP everyday"
    },
    {
      iconName: "ShieldCheck",
      title: "100% Genuine Items",
      desc: "Directly from authorized brand stockists"
    },
    {
      iconName: "RotateCcw",
      title: "Easy Doorstep Replacement",
      desc: "Instant returns if not completely satisfied"
    },
    {
      iconName: "MapPin",
      title: "Jodhpur's Trusted Mart",
      desc: "Local Badla Road store serving your family"
    }
  ],
  coupons: [
    {
      code: "AJOTA50",
      discountType: "fixed",
      discountValue: 50,
      minOrder: 499,
      description: "Flat ₹50 OFF on orders above ₹499",
      expiryText: "Valid this week"
    },
    {
      code: "FESTIVE100",
      discountType: "fixed",
      discountValue: 100,
      minOrder: 999,
      description: "Flat ₹100 OFF on mega grocery orders above ₹999",
      expiryText: "Festive special"
    },
    {
      code: "FIRSTORDER",
      discountType: "percentage",
      discountValue: 10,
      minOrder: 299,
      description: "10% OFF up to ₹75 on your order",
      expiryText: "Welcome discount"
    }
  ],
  faqs: [
    {
      question: "Where is Ajota Mart located in Jodhpur?",
      answer: "We are located at Badla Road, Near Samarpan Circle, Jodhpur, Rajasthan (342008). You can also opt for self-pickup from our store counter."
    },
    {
      question: "Which areas in Jodhpur do you deliver to?",
      answer: "We currently deliver to all major areas including Badla Road, Mandore, Sojati Gate, Ratanada, Shastri Nagar, Pratap Nagar, Samarpan Campus area, Kudi Bhagtasni, and Paota (pincodes 342001 to 342015)."
    },
    {
      question: "What are the delivery charges?",
      answer: "Delivery is completely FREE for all orders above ₹499! For smaller orders, a nominal local delivery fee of ₹29 applies. Minimum order value is ₹99."
    },
    {
      question: "Can I pay using Cash on Delivery (COD)?",
      answer: "Yes, we proudly accept Cash on Delivery (COD) as well as Instant UPI (GPay, PhonePe, Paytm, QR scan) at your doorstep or upon pickup."
    },
    {
      question: "How do I return or replace a product?",
      answer: "If any item is damaged or not to your satisfaction, simply hand it back to our delivery partner or WhatsApp our store team within 24 hours for instant refund or replacement."
    }
  ],
  policies: {
    cancellation: "Orders can be freely cancelled before our store team begins packing. Once an order is packed or out for delivery, please accept the delivery or contact store support via WhatsApp for assistance.",
    returns: "We offer hassle-free replacement or full refund on all packaged goods and staples within 24 hours of delivery if packaging is unsealed or damaged.",
    privacy: "Ajota Mart strictly respects your privacy. We only use your phone number and delivery address for order fulfillment, dispatch communication, and invoice generation. We never share your data with third parties.",
    terms: "All prices are inclusive of taxes in Indian Rupees (₹). Product images and pack weights represent authentic shelf inventory at our Badla Road store."
  }
};
