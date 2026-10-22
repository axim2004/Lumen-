export interface Product {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  price: number;
  originalPrice: number;
  subscriptionPrice: number;
  rating: number;
  reviewCount: number;
  volume: string;
  inStock: boolean;
  images: {
    thumbnail: string;
    showcases: {
      id: number;
      title: string;
      caption: string;
      url: string;
    }[];
  };
  features: string[];
  keyIngredients: {
    name: string;
    percentage: string;
    description: string;
    benefit: string;
  }[];
  fullIngredients: string;
  usageSteps: {
    step: number;
    title: string;
    description: string;
    time: string;
  }[];
  clinicalMetrics: {
    percentage: string;
    claim: string;
    timeframe: string;
  }[];
}

export type PurchaseType = 'onetime' | 'subscription';

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  variant: string;
  price: number;
  originalPrice?: number;
  purchaseType: PurchaseType;
  subscriptionInterval?: string; // e.g. "Every 30 Days"
  quantity: number;
  image: string;
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // vs USD
}

export interface Review {
  id: string;
  author: string;
  roleTitle?: string;
  location: string;
  rating: number;
  date: string;
  verifiedBuyer: boolean;
  skinType: string;
  title: string;
  comment: string;
  helpfulCount: number;
}
