import React from 'react';
import { motion, type Variants } from 'motion/react';
import { useCart } from '../context/CartContext';
import { CDN_IMAGES, MAIN_PRODUCT } from '../data/assets';
import { BeforeAfterStatic } from '../components/BeforeAfterStatic';
import { HotspotInfographic } from '../components/HotspotInfographic';
import { ReviewsSection } from '../components/ReviewsSection';
import { ArrowRight, ShieldCheck, Check } from 'lucide-react';

const sectionStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const pressContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const pressItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const HomePage: React.FC = () => {
  const { addToCart, navigate, formatPrice } = useCart();

  const handleHeroCTA = () => {
    navigate('/products/barrier-repair-serum');
  };

  const handleQuickAdd = () => {
    addToCart('onetime', undefined, 1);
  };

  return (
    <div className="min-h-screen font-poppins">
      {/* 1. Responsive Hero Banner Section */}
      <section className="relative overflow-hidden bg-[#E8EDE9] border-b border-stone-200">
        <div className="relative min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] flex items-end sm:items-center">
          {/* Background image on both mobile and desktop with high clarity */}
          <div className="absolute inset-0">
            <img
              src={CDN_IMAGES.heroBannerDesktop11}
              alt="LUMEN Dermatology Barrier Repair Serum Master Campaign"
              className="w-full h-full object-cover object-right-top sm:object-right-top"
              referrerPolicy="no-referrer"
            />
            {/* Gradient scrim: clear on top for bottle photography, protective on bottom for mobile text */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#F8F9FA] via-[#F8F9FA]/60 to-transparent sm:bg-gradient-to-r sm:from-[#F8F9FA]/90 sm:via-[#F8F9FA]/65 sm:to-transparent max-w-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-10 sm:py-24 z-10 w-full">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={sectionStaggerContainer}
              className="max-w-xl lg:max-w-2xl"
            >
              {/* Headline */}
              <motion.h1
                variants={itemFadeUp}
                className="text-2xl sm:text-4xl lg:text-6xl font-bold text-[#12181E] tracking-tight leading-[1.15] mb-3 sm:mb-6"
              >
                Your Skin. <br />
                Your Barrier. <br />
                <span className="italic font-light text-[#4A6B5D]">Restored.</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={itemFadeUp}
                className="text-stone-700 text-xs sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-lg font-normal"
              >
                Dermatologist-backed barrier repair serum formulated with 3% Ceramides & Niacinamide for instant 24-hour lipid hydration.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={itemFadeUp}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
              >
                <button
                  onClick={handleHeroCTA}
                  className="px-6 py-3 sm:px-8 sm:py-4 bg-[#4A6B5D] hover:bg-[#3D5A4E] text-white text-xs sm:text-sm font-semibold tracking-wide uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group active:scale-[0.98]"
                >
                  <span>Shop Barrier Serum – {formatPrice(MAIN_PRODUCT.price)}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleQuickAdd}
                  className="px-5 py-3 sm:px-6 sm:py-4 bg-white/90 hover:bg-white text-[#12181E] border border-stone-300 text-xs sm:text-sm font-semibold tracking-wide rounded-xl transition-colors shadow-xs text-center active:scale-[0.98]"
                >
                  Quick Add to Bag
                </button>
              </motion.div>

              {/* Micro Trust */}
              <motion.div
                variants={itemFadeUp}
                className="flex flex-wrap items-center gap-y-1.5 gap-x-3 sm:gap-x-4 text-[11px] sm:text-xs font-normal text-stone-600"
              >
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#4A6B5D]" />
                  <span>Free Express Shipping &gt;$50</span>
                </div>
                <span className="hidden sm:inline text-stone-300">•</span>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#4A6B5D]" />
                  <span>30-Day Risk-Free Trial</span>
                </div>
                <span className="hidden sm:inline text-stone-300">•</span>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-[#4A6B5D]" />
                  <span>3:1:1 Ceramide Ratio</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. As-Featured-In & Press Trust Bar with Staggered Entrance */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={pressContainerVariants}
        className="py-8 bg-white border-b border-stone-200/80"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            variants={pressItemVariants}
            className="text-center text-[10px] uppercase tracking-[0.25em] text-stone-400 font-semibold mb-6"
          >
            Recognized in Clinical Dermatology & Luxury Beauty
          </motion.p>
          <motion.div
            variants={pressContainerVariants}
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 lg:gap-20 text-stone-500 tracking-widest text-base sm:text-lg"
          >
            <motion.span variants={pressItemVariants} className="hover:text-[#12181E] transition-colors font-bold tracking-[0.2em]">VOGUE</motion.span>
            <motion.span variants={pressItemVariants} className="hover:text-[#12181E] transition-colors italic font-light tracking-widest">ELLE</motion.span>
            <motion.span variants={pressItemVariants} className="hover:text-[#12181E] transition-colors font-bold">GQ</motion.span>
            <motion.span variants={pressItemVariants} className="hover:text-[#12181E] transition-colors uppercase tracking-[0.15em] text-xs font-semibold">DERMATOLOGY TODAY</motion.span>
            <motion.span variants={pressItemVariants} className="hover:text-[#12181E] transition-colors font-semibold tracking-wider">BYRDIE</motion.span>
          </motion.div>
        </div>
      </motion.section>

      {/* 3. Before/After Section: Pure Single Demonstration Image & Clinical Written Content */}
      <div id="clinical-results">
        <BeforeAfterStatic />
      </div>

      {/* 4. Clinical Proof & Science Grid with Staggered Entrance */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionStaggerContainer}
        className="py-10 sm:py-14 md:py-16 bg-white border-b border-stone-200/80"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemFadeUp} className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <p className="text-xs uppercase tracking-widest text-[#4A6B5D] font-semibold mb-2">
              Empirical Evidence Over Marketing Claims
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12181E] tracking-tight mb-4">
              Clinically Proven Barrier Repair
            </h2>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-normal">
              In third-party clinical trials under board-certified dermatological oversight, LUMEN restored damaged lipid bilayers in 96% of subjects within 7 days.
            </p>
          </motion.div>

          {/* Clinical Banner Visual */}
          <motion.div
            variants={itemFadeUp}
            className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm mb-6 sm:mb-8"
          >
            <div className="w-full aspect-[16/9] sm:aspect-[21/9]">
              <img
                src="https://res.cloudinary.com/jhoyfcfm/image/upload/v1792689322/1792689119424.png"
                alt="LUMEN Clinically Proven Barrier Repair Research"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* 3 Key Metric Cards Staggered */}
          <motion.div
            variants={sectionStaggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6"
          >
            {[
              {
                stat: '96%',
                title: 'Reduced Redness & Irritation',
                desc: 'Demonstrated significant erythema reduction within 7 days of twice-daily application.',
                note: '4-Week Subject Evaluation (N=68)',
              },
              {
                stat: '94%',
                title: 'Continuous 24h Deep Hydration',
                desc: 'Corneometer hydration assessments confirmed moisture retention past 24 hours without tightness.',
                note: 'Corneometer Instrumental Assay',
              },
              {
                stat: '100%',
                title: 'Dermatologist Tested & Non-Comedogenic',
                desc: 'Zero pore clogging, zero allergic sensitization on sensitive, acne-prone & rosacea skin types.',
                note: 'HRIPT 50-Subject Patch Validation',
              },
            ].map((metric) => (
              <motion.div
                key={metric.title}
                variants={itemFadeUp}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-[#F8F9FA] p-6 sm:p-7 rounded-2xl border border-stone-200/90 text-center flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
              >
                <div>
                  <span className="block text-4xl sm:text-5xl font-bold text-[#4A6B5D] tabular-nums mb-2">
                    {metric.stat}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#12181E] mb-1.5">
                    {metric.title}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-normal">
                    {metric.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-200/60 text-[11px] text-stone-400 font-light">
                  {metric.note}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 5. Infographic & Feature Breakdown Section */}
      <HotspotInfographic />

      {/* 6. How It Works / Daily Routine (3 Steps) with Staggered Entrance */}
      <motion.section
        id="routine"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={sectionStaggerContainer}
        className="py-10 sm:py-14 md:py-16 bg-white border-b border-stone-200/80"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Visual Column */}
            <motion.div
              variants={itemFadeUp}
              className="lg:col-span-5 order-2 lg:order-1"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200 aspect-[4/5]">
                <img
                  src={CDN_IMAGES.lifestyleBathroom}
                  alt="LUMEN Daily 3-Step Skincare Routine in Luxury Bathroom"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md p-3.5 rounded-xl border border-stone-200 text-xs shadow-md">
                  <p className="font-semibold text-[#12181E]">Daily Practice Note:</p>
                  <p className="text-stone-600 mt-0.5 font-normal text-[11px]">
                    For optimal stratum absorption, apply to damp skin within 60 seconds of gentle cleansing.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Routine Content Column */}
            <motion.div
              variants={sectionStaggerContainer}
              className="lg:col-span-7 order-1 lg:order-2 space-y-6"
            >
              <motion.div variants={itemFadeUp}>
                <p className="text-xs uppercase tracking-widest text-[#4A6B5D] font-semibold mb-1.5">
                  Minimalist Medical Protocol
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#12181E] tracking-tight mb-3">
                  The 3-Step Barrier Routine
                </h2>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
                  Eliminate 10-step routine confusion. Clinical restoration occurs when you supply the exact bio-identical lipids your cells require.
                </p>
              </motion.div>

              <motion.div variants={sectionStaggerContainer} className="space-y-3.5">
                {MAIN_PRODUCT.usageSteps.map((stepItem) => (
                  <motion.div
                    key={stepItem.step}
                    variants={itemFadeUp}
                    className="flex gap-3.5 p-4 rounded-xl bg-[#F8F9FA] border border-stone-200 hover:border-[#4A6B5D]/50 hover:shadow-sm transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#4A6B5D] text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {stepItem.step}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-sm font-semibold text-[#12181E]">
                          {stepItem.title}
                        </h3>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#4A6B5D] bg-[#E0F2FE] px-2 py-0.5 rounded">
                          {stepItem.time}
                        </span>
                      </div>
                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-normal">
                        {stepItem.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={itemFadeUp} className="pt-1 flex flex-col sm:flex-row gap-3 items-center">
                <button
                  onClick={() => navigate('/products/barrier-repair-serum')}
                  className="w-full sm:w-auto px-6 py-3 bg-[#4A6B5D] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#3D5A4E] transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Experience The Ritual</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs text-stone-500 font-light">
                  Includes calibrated 0.3ml glass pipette
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 7. Interactive Testimonials & Customer Reviews */}
      <ReviewsSection />

      {/* 8. Conversion Pre-Footer Banner with Staggered Entrance */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionStaggerContainer}
        className="py-12 sm:py-16 bg-[#12181E] text-white text-center"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={itemFadeUp}
            className="w-10 h-10 rounded-full bg-[#4A6B5D] text-white flex items-center justify-center mx-auto mb-4"
          >
            <ShieldCheck className="w-5 h-5" />
          </motion.div>
          <motion.span variants={itemFadeUp} className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] block">
            Risk-Free Clinical Guarantee
          </motion.span>
          <motion.h2 variants={itemFadeUp} className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mt-1.5 mb-3">
            Transform Your Skin Barrier in 30 Days
          </motion.h2>
          <motion.p variants={itemFadeUp} className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto mb-6 font-normal">
            Experience the soothing hydration of 3% bio-identical ceramides. If your skin barrier is not visibly calmer and restored, we will refund every penny.
          </motion.p>

          <motion.div
            variants={itemFadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => addToCart('onetime', undefined, 1)}
              className="w-full sm:w-auto px-8 py-4 bg-[#4A6B5D] hover:bg-[#3D5A4E] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-lg active:scale-95"
            >
              Claim Your Bottle – {formatPrice(MAIN_PRODUCT.price)}
            </button>
            <button
              onClick={() => navigate('/products/barrier-repair-serum')}
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-stone-300 border border-stone-600 text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors active:scale-95"
            >
              Explore Clinical Specs
            </button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

