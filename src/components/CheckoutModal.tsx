import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { X, CheckCircle2, ShieldCheck, Lock, CreditCard, Truck } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    closeCheckout,
    items,
    clearCart,
    subtotal,
    discountAmount,
    shippingCost,
    taxAmount,
    finalTotal,
    formatPrice,
    currency,
  } = useCart();

  const [step, setStep] = useState<'checkout' | 'confirmed'>('checkout');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('LMN-1042');

  // Form states
  const [email, setEmail] = useState('shaikhasim1424@gmail.com');
  const [firstName, setFirstName] = useState('Alexander');
  const [lastName, setLastName] = useState('Pierce');
  const [address, setAddress] = useState('742 Evergreen Terrace');
  const [city, setCity] = useState('Boston');
  const [state, setState] = useState('MA');
  const [zip, setZip] = useState('02134');
  const [paymentType, setPaymentType] = useState<'card' | 'paypal' | 'applepay'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('888');

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const randomOrder = `LMN-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderId(randomOrder);
      setIsSubmitting(false);
      setStep('confirmed');
      clearCart();
    }, 1200);
  };

  const handleFinish = () => {
    setStep('checkout');
    closeCheckout();
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 font-poppins">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCheckout}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-stone-200 overflow-hidden z-10"
          >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-[#F8F9FA]">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-[#12181E]">
              LUMEN <span className="text-xs tracking-widest text-stone-500 uppercase font-medium">Checkout</span>
            </span>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#4A6B5D] bg-[#E0F2FE] px-2.5 py-1 rounded">
              <Lock className="w-3.5 h-3.5" />
              <span>256-Bit Encrypted</span>
            </div>
          </div>
          <button
            onClick={closeCheckout}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'checkout' ? (
          <div className="grid grid-cols-1 md:grid-cols-12 max-h-[80vh] overflow-y-auto">
            {/* Left Checkout Form */}
            <form onSubmit={handleSubmitOrder} className="md:col-span-7 p-5 sm:p-6 space-y-6">
              {/* Express Checkout Quick Buttons */}
              <div>
                <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-2.5">
                  Express 1-Click Checkout
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentType('applepay');
                      setIsSubmitting(true);
                      setTimeout(() => {
                        setOrderId(`LMN-${Math.floor(1000 + Math.random() * 9000)}`);
                        setIsSubmitting(false);
                        setStep('confirmed');
                        clearCart();
                      }, 1000);
                    }}
                    className="py-2.5 bg-black text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Apple Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPaymentType('paypal');
                      setIsSubmitting(true);
                      setTimeout(() => {
                        setOrderId(`LMN-${Math.floor(1000 + Math.random() * 9000)}`);
                        setIsSubmitting(false);
                        setStep('confirmed');
                        clearCart();
                      }, 1000);
                    }}
                    className="py-2.5 bg-[#FFC439] text-[#003087] text-xs font-bold rounded-lg hover:bg-[#F2BA36] transition-colors flex items-center justify-center shadow-sm"
                  >
                    <span>PayPal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitting(true);
                      setTimeout(() => {
                        setOrderId(`LMN-${Math.floor(1000 + Math.random() * 9000)}`);
                        setIsSubmitting(false);
                        setStep('confirmed');
                        clearCart();
                      }, 1000);
                    }}
                    className="py-2.5 bg-[#5A31F4] text-white text-xs font-bold rounded-lg hover:bg-[#4C28D4] transition-colors flex items-center justify-center shadow-sm"
                  >
                    <span>Shop Pay</span>
                  </button>
                </div>
                <div className="relative flex py-4 items-center">
                  <div className="flex-grow border-t border-stone-200"></div>
                  <span className="flex-shrink mx-3 text-xs text-stone-400 uppercase tracking-widest">or standard shipping</span>
                  <div className="flex-grow border-t border-stone-200"></div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="text-sm font-semibold text-[#12181E] mb-3">1. Contact Information</h4>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email for order confirmation & tracking"
                  className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A6B5D]"
                />
              </div>

              {/* Shipping Address */}
              <div>
                <h4 className="text-sm font-semibold text-[#12181E] mb-3">2. Shipping Address</h4>
                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      className="px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A6B5D]"
                    />
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      className="px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A6B5D]"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street Address or P.O. Box"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A6B5D]"
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A6B5D]"
                    />
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="State"
                      className="px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A6B5D]"
                    />
                    <input
                      type="text"
                      required
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="ZIP Code"
                      className="px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A6B5D]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h4 className="text-sm font-semibold text-[#12181E] mb-3">3. Payment Method</h4>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-300 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#12181E]">
                    <CreditCard className="w-4 h-4 text-[#4A6B5D]" />
                    <span>Credit / Debit Card</span>
                  </div>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Card Number"
                    className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A6B5D]"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM / YY"
                      className="px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A6B5D]"
                    />
                    <input
                      type="password"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="CVC"
                      className="px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A6B5D]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="w-full py-3.5 bg-[#4A6B5D] text-white font-semibold text-sm uppercase tracking-wider rounded-xl hover:bg-[#3D5A4E] transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Securing Order...</span>
                ) : (
                  <span>Authorize & Pay {formatPrice(finalTotal)}</span>
                )}
              </button>
            </form>

            {/* Right Summary Panel */}
            <div className="md:col-span-5 bg-[#F8F9FA] p-5 sm:p-6 border-t md:border-t-0 md:border-l border-stone-200 flex flex-col justify-between">
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-500 mb-4">
                  Order Summary
                </h4>
                <div className="space-y-3 mb-6 max-h-56 overflow-y-auto">
                  {items.map((i) => (
                    <div key={i.id} className="flex items-center gap-3 text-xs">
                      <div className="w-12 h-12 bg-white rounded-lg border border-stone-200 p-1 shrink-0">
                        <img
                          src={i.image}
                          alt={i.title}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#12181E] truncate">{i.title}</p>
                        <p className="text-[11px] text-stone-500 truncate">{i.variant}</p>
                        <p className="text-[11px] text-stone-400">Qty: {i.quantity}</p>
                      </div>
                      <span className="font-semibold tabular-nums text-stone-800">
                        {formatPrice(i.price * i.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 border-t border-stone-200 pt-4 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="tabular-nums font-medium text-stone-900">{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount</span>
                      <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Express Shipping</span>
                    <span className="tabular-nums font-medium text-stone-900">
                      {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Sales Tax</span>
                    <span className="tabular-nums font-medium text-stone-900">{formatPrice(taxAmount)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#12181E] pt-3 border-t border-stone-200">
                    <span>Total Due</span>
                    <span className="tabular-nums">{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 space-y-2 text-[11px] text-stone-500">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#4A6B5D]" />
                  <span>Ships within 24 hours via Climate-Neutral Express</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#4A6B5D]" />
                  <span>30-Day Money-Back Clinical Satisfaction Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Order Confirmed Screen */
          <div className="p-8 sm:p-12 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 bg-[#E0F2FE] text-[#4A6B5D] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#4A6B5D] bg-[#E0F2FE] px-3 py-1 rounded">
              Order {orderId} Confirmed
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#12181E] mt-3 mb-2">
              Your Skin Barrier Journey Begins
            </h3>
            <p className="text-stone-600 text-sm leading-relaxed mb-6">
              Thank you, {firstName}. A confirmation email with clinical batch verification and tracking has been sent to <strong>{email}</strong>.
            </p>

            <div className="bg-[#F8F9FA] p-4 rounded-xl border border-stone-200 text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-stone-500">Estimated Delivery:</span>
                <span className="font-semibold text-stone-800">2–4 Business Days (Express)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Delivery Address:</span>
                <span className="font-semibold text-stone-800">{address}, {city}, {state} {zip}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Total Charged:</span>
                <span className="font-semibold text-stone-800">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3 bg-[#4A6B5D] text-white font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-[#3D5A4E] transition-colors shadow-md"
            >
              Continue Exploring LUMEN
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )}
</AnimatePresence>
  );
};
