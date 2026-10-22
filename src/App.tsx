/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { FaqPage } from './pages/FaqPage';
import { PolicyPage } from './pages/PolicyPage';
import { MAIN_PRODUCT } from './data/assets';
import { ShoppingBag } from 'lucide-react';

const AppContent: React.FC = () => {
  const { route, addToCart, formatPrice } = useCart();

  const renderRoute = () => {
    switch (route) {
      case '/products/barrier-repair-serum':
        return <ProductDetailPage />;
      case '/pages/about-us':
        return <AboutUsPage />;
      case '/pages/faq':
        return <FaqPage />;
      case '/policies/shipping':
        return <PolicyPage initialTab="shipping" />;
      case '/policies/terms':
        return <PolicyPage initialTab="terms" />;
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] text-[#12181E] font-poppins">
      <Header />

      <main className="flex-1">
        {renderRoute()}
      </main>

      <Footer />

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Live Search Modal */}
      <SearchModal />

      {/* Checkout Simulator Modal */}
      <CheckoutModal />

      {/* Sticky Mobile Quick Buy Bar with smooth entrance and tap feedback */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-stone-200 p-3 z-30 shadow-lg flex items-center justify-between gap-3"
      >
        <div className="min-w-0 flex-1">
          <p className="text-xs font-serif font-bold text-[#12181E] truncate">
            {MAIN_PRODUCT.name}
          </p>
          <p className="text-[11px] text-[#4A6B5D] font-semibold tabular-nums">
            {formatPrice(MAIN_PRODUCT.price)} · <span className="text-stone-400 line-through">{formatPrice(MAIN_PRODUCT.originalPrice)}</span>
          </p>
        </div>
        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => addToCart('onetime', undefined, 1)}
          className="px-4 py-2.5 bg-[#4A6B5D] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm hover:bg-[#3D5A4E] flex items-center gap-1.5 shrink-0"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Quick Add</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
