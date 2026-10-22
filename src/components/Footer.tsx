import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, applyPromoCode, openCart } = useCart();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    applyPromoCode('GLOW15');
  };

  return (
    <footer className="bg-[#12181E] text-stone-300 border-t border-stone-800 font-poppins">
      {/* 1. Minimalist Editorial Newsletter Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 border-b border-stone-800/80">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-md">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-semibold block mb-2">
              Clinical Cohort & Releases
            </span>
            <h3 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              Join The Clinical Circle
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm mt-1.5 font-light leading-relaxed">
              Receive 15% off your first order, private batch allocations, and evidence-based dermatological briefings.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {isSubscribed ? (
              <div className="py-3 px-5 bg-stone-900 border border-[#4A6B5D]/60 rounded-xl text-xs text-white flex items-center gap-3">
                <Check className="w-4 h-4 text-[#4A6B5D]" />
                <span>Code <strong className="text-[#D4AF37]">GLOW15</strong> added to your bag for 15% off.</span>
                <button
                  onClick={openCart}
                  className="ml-2 text-xs font-semibold text-[#4A6B5D] hover:underline"
                >
                  View Bag
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-[420px]">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-stone-900/90 border border-stone-700/80 rounded-xl text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-stone-400 font-light"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#4A6B5D] hover:bg-[#3D5A4E] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 2. Clean 4-Column Luxury Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-14 text-xs font-normal">
          {/* Column 1: Brand Wordmark & Philosophy */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div>
              <span className="text-xl font-bold tracking-tight text-white block">
                LUMEN
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-stone-400 font-light block">
                Dermatology
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed font-light pt-1">
              Clinical skin barrier restoration formulated in the physiological 3:1:1 lipid ratio. Fragrance-free and independently tested.
            </p>
          </div>

          {/* Column 2: Formulations */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white">
              Shop Formulations
            </h4>
            <ul className="space-y-2.5 text-stone-400 font-light">
              <li>
                <button
                  onClick={() => navigate('/products/barrier-repair-serum')}
                  className="hover:text-white transition-colors text-left"
                >
                  Barrier Repair Serum 50ml
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/#clinical-results')}
                  className="hover:text-white transition-colors text-left"
                >
                  14-Day Clinical Results
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/#routine')}
                  className="hover:text-white transition-colors text-left"
                >
                  3-Step Lipid Protocol
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/products/barrier-repair-serum')}
                  className="hover:text-white transition-colors text-[#D4AF37] font-medium text-left"
                >
                  Subscribe & Save 20%
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Clinical & Support */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white">
              Clinical & Care
            </h4>
            <ul className="space-y-2.5 text-stone-400 font-light">
              <li>
                <button
                  onClick={() => navigate('/pages/about-us')}
                  className="hover:text-white transition-colors text-left"
                >
                  About Our Medical Advisory
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/pages/faq')}
                  className="hover:text-white transition-colors text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/policies/shipping')}
                  className="hover:text-white transition-colors text-left"
                >
                  Shipping & Express Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/policies/shipping')}
                  className="hover:text-white transition-colors text-left"
                >
                  30-Day Money-Back Guarantee
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white">
              Advisory Desk
            </h4>
            <p className="text-stone-400 font-light">
              For consultation and clinical order inquiries:
            </p>
            <a
              href="mailto:support@lumendermatology.com"
              className="text-[#E0F2FE] hover:underline block font-normal"
            >
              support@lumendermatology.com
            </a>
            <div className="pt-2 flex items-center gap-4 text-stone-400 text-xs">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <span>·</span>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">TikTok</a>
              <span>·</span>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">YouTube</a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Minimalist Bottom Bar */}
      <div className="border-t border-stone-800/80 py-5 sm:py-6 px-4 sm:px-6 lg:px-8 text-xs text-stone-500 font-light">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 LUMEN Dermatology. All rights reserved.</p>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => navigate('/policies/terms')}
              className="hover:text-stone-300 transition-colors"
            >
              Terms of Service
            </button>
            <span>·</span>
            <button
              onClick={() => navigate('/policies/terms')}
              className="hover:text-stone-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => navigate('/policies/shipping')}
              className="hover:text-stone-300 transition-colors"
            >
              Shipping Policy
            </button>
          </div>

          {/* Minimalist Payment Badges */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded border border-stone-800 text-[10px] font-medium text-stone-400 bg-stone-900">Visa</span>
            <span className="px-2 py-0.5 rounded border border-stone-800 text-[10px] font-medium text-stone-400 bg-stone-900">Mastercard</span>
            <span className="px-2 py-0.5 rounded border border-stone-800 text-[10px] font-medium text-stone-400 bg-stone-900">Amex</span>
            <span className="px-2 py-0.5 rounded border border-stone-800 text-[10px] font-medium text-stone-400 bg-stone-900">Apple Pay</span>
            <span className="px-2 py-0.5 rounded border border-stone-800 text-[10px] font-medium text-stone-400 bg-stone-900">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
