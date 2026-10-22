import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, CurrencyCode, CurrencyConfig, PurchaseType } from '../types';
import { MAIN_PRODUCT, CROSS_SELL_PRODUCT } from '../data/assets';

interface CartContextType {
  items: CartItem[];
  addToCart: (
    purchaseType?: PurchaseType,
    subscriptionInterval?: string,
    quantity?: number,
    customItem?: Partial<CartItem>
  ) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  discountAmount: number;
  promoCode: string;
  appliedPromo: string | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  freeShippingThreshold: number;
  remainingForFreeShipping: number;
  hasFreeShipping: boolean;
  shippingCost: number;
  taxAmount: number;
  finalTotal: number;
  currency: CurrencyConfig;
  setCurrencyCode: (code: CurrencyCode) => void;
  formatPrice: (amountInUSD: number) => string;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
  route: string;
  navigate: (path: string) => void;
}

const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', rate: 0.78 },
  CAD: { code: 'CAD', symbol: 'CA$', rate: 1.36 },
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation sync with browser history
  const [route, setRoute] = useState<string>(() => {
    return window.location.pathname && window.location.pathname !== '/'
      ? window.location.pathname
      : '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== route) {
      window.history.pushState({}, '', path);
      setRoute(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Cart state persisted in localStorage
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('lumen_cart');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    // Default initial cart: start empty or with 1 item if user adds
    return [];
  });

  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('USD');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('lumen_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;

  const formatPrice = (amountInUSD: number): string => {
    const converted = amountInUSD * currency.rate;
    return `${currency.symbol}${converted.toFixed(2)}`;
  };

  const addToCart = (
    purchaseType: PurchaseType = 'onetime',
    subscriptionInterval: string = 'Every 30 Days',
    quantity: number = 1,
    customItem?: Partial<CartItem>
  ) => {
    if (customItem && customItem.id === CROSS_SELL_PRODUCT.id) {
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === CROSS_SELL_PRODUCT.id);
        if (existing) {
          return prev.map((i) =>
            i.productId === CROSS_SELL_PRODUCT.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [
          ...prev,
          {
            id: `cross-sell-${Date.now()}`,
            productId: CROSS_SELL_PRODUCT.id,
            title: CROSS_SELL_PRODUCT.name,
            variant: 'Natural Xiuyan Jade',
            price: CROSS_SELL_PRODUCT.price,
            originalPrice: CROSS_SELL_PRODUCT.originalPrice,
            purchaseType: 'onetime',
            quantity: 1,
            image: CROSS_SELL_PRODUCT.image,
          },
        ];
      });
      setIsCartOpen(true);
      return;
    }

    const price = purchaseType === 'subscription' ? MAIN_PRODUCT.subscriptionPrice : MAIN_PRODUCT.price;
    const variantKey =
      purchaseType === 'subscription'
        ? `50ml (Auto-deliver ${subscriptionInterval})`
        : '50ml (One-Time)';

    setItems((prev) => {
      const matchIndex = prev.findIndex(
        (i) => i.productId === MAIN_PRODUCT.id && i.purchaseType === purchaseType && i.subscriptionInterval === (purchaseType === 'subscription' ? subscriptionInterval : undefined)
      );

      if (matchIndex > -1) {
        const updated = [...prev];
        updated[matchIndex].quantity += quantity;
        return updated;
      }

      const newItem: CartItem = {
        id: `cart-${Date.now()}`,
        productId: MAIN_PRODUCT.id,
        title: MAIN_PRODUCT.name,
        variant: variantKey,
        price,
        originalPrice: MAIN_PRODUCT.originalPrice,
        purchaseType,
        subscriptionInterval: purchaseType === 'subscription' ? subscriptionInterval : undefined,
        quantity,
        image: MAIN_PRODUCT.images.thumbnail,
      };
      return [...prev, newItem];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Promo code discounts
  let discountRate = 0;
  if (appliedPromo === 'GLOW15' || appliedPromo === 'WELCOME15') {
    discountRate = 0.15;
  } else if (appliedPromo === 'DERM10') {
    discountRate = 0.1;
  }

  const discountAmount = subtotal * discountRate;
  const subtotalAfterDiscount = subtotal - discountAmount;

  const freeShippingThreshold = 50.0;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotalAfterDiscount);
  const hasFreeShipping = subtotalAfterDiscount >= freeShippingThreshold || items.some((i) => i.purchaseType === 'subscription');
  const shippingCost = items.length === 0 ? 0 : hasFreeShipping ? 0 : 6.0;
  const taxAmount = subtotalAfterDiscount > 0 ? subtotalAfterDiscount * 0.075 : 0;
  const finalTotal = subtotalAfterDiscount + shippingCost + taxAmount;

  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'GLOW15' || clean === 'WELCOME15' || clean === 'DERM10') {
      setAppliedPromo(clean);
      setPromoCode('');
      return true;
    }
    return false;
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        subtotal,
        discountAmount,
        promoCode,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        freeShippingThreshold,
        remainingForFreeShipping,
        hasFreeShipping,
        shippingCost,
        taxAmount,
        finalTotal,
        currency,
        setCurrencyCode,
        formatPrice,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        isSearchOpen,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        isCheckoutOpen,
        openCheckout: () => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        },
        closeCheckout: () => setIsCheckoutOpen(false),
        route,
        navigate,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
