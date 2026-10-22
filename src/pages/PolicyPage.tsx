import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Truck, RotateCcw, ShieldCheck, Lock, FileText } from 'lucide-react';

interface PolicyPageProps {
  initialTab?: 'shipping' | 'terms';
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ initialTab = 'shipping' }) => {
  const { route, navigate } = useCart();
  const [activeTab, setActiveTab] = useState<'shipping' | 'terms'>(() => {
    return route === '/policies/terms' ? 'terms' : initialTab;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12 sm:pb-16 font-poppins">
      {/* Header */}
      <section className="py-10 sm:py-14 md:py-16 bg-[#EBF0EC] border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#4A6B5D] font-bold mb-2">
            Legal & Customer Safeguards
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12181E] tracking-tight mb-3">
            {activeTab === 'shipping' ? 'Shipping & 30-Day Guarantee' : 'Privacy Policy & Terms'}
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm max-w-lg mx-auto">
            Clear, transparent policies designed with patient trust, data privacy, and clinical assurance at their core.
          </p>

          {/* Tab Selector */}
          <div className="mt-6 inline-flex p-1 bg-white rounded-xl border border-stone-300 shadow-xs">
            <button
              onClick={() => {
                setActiveTab('shipping');
                navigate('/policies/shipping');
              }}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'shipping'
                  ? 'bg-[#4A6B5D] text-white shadow-xs'
                  : 'text-stone-600 hover:text-[#12181E]'
              }`}
            >
              Shipping & Returns
            </button>
            <button
              onClick={() => {
                setActiveTab('terms');
                navigate('/policies/terms');
              }}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'terms'
                  ? 'bg-[#4A6B5D] text-white shadow-xs'
                  : 'text-stone-600 hover:text-[#12181E]'
              }`}
            >
              Privacy Policy & Terms
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        {activeTab === 'shipping' ? (
          <div className="space-y-10">
            {/* 30-Day Guarantee Banner */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-14 h-14 rounded-full bg-[#E0F2FE] text-[#4A6B5D] flex items-center justify-center shrink-0">
                <RotateCcw className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-serif font-bold text-[#12181E] mb-1">
                  Our 30-Day Risk-Free Clinical Guarantee
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  We formulate with evidence-based lipid ratios because skin barrier health should be predictable. If you do not experience calmer, more resilient skin within 30 days of receiving your order, email <a href="mailto:support@lumendermatology.com" className="text-[#4A6B5D] underline font-medium">support@lumendermatology.com</a> for a complete refund.
                </p>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-xs space-y-6 text-xs sm:text-sm text-stone-600 leading-relaxed">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#12181E] mb-2 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#4A6B5D]" />
                  <span>1. Express Delivery & Fulfillment Timelines</span>
                </h2>
                <p>
                  All orders are packaged in climate-neutral FSC craft cartons and dispatched from our temperature-controlled facility within <strong>24 business hours</strong>.
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#F8F9FA] rounded-xl border border-stone-200">
                    <span className="font-bold text-[#12181E] block">Domestic Express (US)</span>
                    <span className="text-stone-500">2–4 Business Days · FREE on orders over $50 (otherwise $6.00 flat rate).</span>
                  </div>
                  <div className="p-3 bg-[#F8F9FA] rounded-xl border border-stone-200">
                    <span className="font-bold text-[#12181E] block">International Priority</span>
                    <span className="text-stone-500">5–8 Business Days · Calculated at checkout with prepaid customs/taxes.</span>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-serif font-bold text-[#12181E] mb-2">
                  2. Tracking & Live Shipment Notifications
                </h2>
                <p>
                  As soon as your shipment leaves our laboratory hub, you will receive an automated email containing a real-time carrier tracking link (FedEx / UPS / DHL Express).
                </p>
              </div>

              <div>
                <h2 className="text-lg font-serif font-bold text-[#12181E] mb-2">
                  3. Returns & Exchange Process
                </h2>
                <p>
                  To request a return or report damaged transit glass:
                </p>
                <ol className="list-decimal pl-5 space-y-1.5 mt-2">
                  <li>Send your order number (e.g. <code>LMN-1042</code>) to <code>support@lumendermatology.com</code>.</li>
                  <li>Our support team will generate a prepaid return postage label within 4 business hours.</li>
                  <li>Refunds are credited directly back to the original payment method (Visa, MC, PayPal, Apple Pay) within 3–5 business days of label scan.</li>
                </ol>
              </div>
            </div>
          </div>
        ) : (
          /* Terms and Privacy tab */
          <div className="space-y-10">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/90 shadow-xs space-y-6 text-xs sm:text-sm text-stone-600 leading-relaxed">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4A6B5D] mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Effective Date: October 2026</span>
                </div>
                <h2 className="text-xl font-serif font-bold text-[#12181E] mb-2">
                  Privacy Policy & Data Security (GDPR / CCPA)
                </h2>
                <p>
                  LUMEN Dermatology is committed to safeguarding patient and customer data. We never sell, rent, or lease personal medical preferences, skin concern evaluations, or transaction details to third-party data brokers.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-[#12181E] mb-1">1. Information We Collect</h3>
                  <p>
                    When ordering or signing up for The Glow Club, we collect your name, shipping address, email address, and order transaction records. Payment card data is processed directly via PCI-DSS Level 1 compliant gateways (Stripe, Apple Pay, PayPal) and is never stored on our web servers.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#12181E] mb-1">2. Medical Consultation Disclaimer</h3>
                  <p>
                    The cosmetic formulations and educational material provided by LUMEN Dermatology are intended for topical aesthetic barrier recovery and general wellness. They do not constitute medical prescription advice or diagnosis of clinical skin pathologies. If you suffer from acute dermatological conditions, consult your personal physician.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#12181E] mb-1">3. Subscription Agreement & Recurring Billing</h3>
                  <p>
                    Customers enrolled in the Subscribe & Save program receive 20% off standard retail rates. Subscriptions automatically renew at your selected frequency (30, 45, or 60 days). You may pause, adjust intervals, or cancel without penalty at any time prior to shipment billing.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#12181E] mb-1">4. Intellectual Property</h3>
                  <p>
                    All brand logos, clinical formulations, photographs, and UI widgets are the exclusive intellectual property of LUMEN Dermatology LLC. Unauthorized reproduction or resale is prohibited.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-500">
                <Lock className="w-4 h-4 text-[#4A6B5D]" />
                <span>Protected by 256-bit AES SSL Encryption with SOC-2 compliant server infrastructure.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
