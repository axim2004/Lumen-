import React from 'react';
import { CDN_IMAGES } from '../data/assets';
import { useCart } from '../context/CartContext';
import { ShieldCheck, Recycle, Heart, Award, ArrowRight } from 'lucide-react';

export const AboutUsPage: React.FC = () => {
  const { navigate } = useCart();

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-poppins">
      {/* Hero Header */}
      <section className="py-10 sm:py-14 md:py-16 bg-[#EBF0EC] border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#4A6B5D] font-bold mb-3">
            Our Medical Origin
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#12181E] tracking-tight mb-4 sm:mb-6">
            Dermatology Without Compromise
          </h1>
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            LUMEN was founded by board-certified dermatologists tired of treating barrier inflammation caused by the very products claiming to heal it.
          </p>
        </div>
      </section>

      {/* Story & Banner 1 (Image #13 Clinical Proof Banner 2) */}
      <section className="py-10 sm:py-14 md:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 sm:mb-12">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#4A6B5D] font-semibold">
              The Epidermal Crisis
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#12181E] tracking-tight">
              Modern Skincare is Over-Complicated. Skin Barriers are Breaking Down.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Every day in clinic, our founding dermatologists encounter patients struggling with chronically reactive, inflamed, and flaky skin. The root cause is almost always the same: over-exfoliation, 10-step routines, and formulas loaded with synthetic fragrances and emulsifiers.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              The human stratum corneum is not a blank canvas to be scrubbed raw. It is an intricate, living lipid matrix of ceramides, cholesterol, and fatty acids. LUMEN was born from one goal: formulate the single most biocompatible, pure lipid serum in clinical skincare.
            </p>
          </div>

          <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-lg border border-stone-200 aspect-[4/3]">
            <img
              src={CDN_IMAGES.clinicalProofBanner2}
              alt="LUMEN Clinical Laboratory Research"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Sustainable Craft Packaging (Image #9) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8 border-t border-stone-200">
          <div className="lg:col-span-6 order-2 lg:order-1 rounded-2xl overflow-hidden shadow-lg border border-stone-200 aspect-[4/3]">
            <img
              src={CDN_IMAGES.pdpCraftPackaging5}
              alt="LUMEN Sustainable Recyclable Craft Packaging"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#4A6B5D] font-semibold">
              Conscious Formulation & Craft
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#12181E] tracking-tight">
              100% Recyclable Glass & FSC Certified Craft Paper
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              True luxury is respectful. We package our formulations in heavyweight UV-shielding amber flint glass bottles that protect active bio-lipids from photolytic breakdown without requiring endocrine-disrupting chemical stabilizers.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Our cartons are crafted from 100% post-consumer FSC-certified paper, printed with water-based non-toxic soy inks, and contain zero plastic shrink wraps or foil laminates.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Pillars of LUMEN */}
      <section className="py-20 bg-white border-t border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-widest text-[#4A6B5D] font-semibold mb-2">
              Our Guiding Principles
            </p>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#12181E] tracking-tight">
              The LUMEN Clinical Standard
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-stone-200">
              <ShieldCheck className="w-8 h-8 text-[#4A6B5D] mb-4" />
              <h3 className="font-serif font-bold text-lg text-[#12181E] mb-2">
                Biomimetic 3:1:1
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Ceramides NP, AP, and EOP matched to natural human stratum proportions for immediate cellular uptake.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-stone-200">
              <Heart className="w-8 h-8 text-[#4A6B5D] mb-4" />
              <h3 className="font-serif font-bold text-lg text-[#12181E] mb-2">
                Zero Fragrance Always
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Never masked, never scented. Free of synthetic perfumes, essential oils, drying alcohols, and irritating phenoxyethanol spikes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-stone-200">
              <Award className="w-8 h-8 text-[#4A6B5D] mb-4" />
              <h3 className="font-serif font-bold text-lg text-[#12181E] mb-2">
                Empirical Proof
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every formulation is tested via independent 4-week clinical cohorts, polarized photography, and corneometer instrumentation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-stone-200">
              <Recycle className="w-8 h-8 text-[#4A6B5D] mb-4" />
              <h3 className="font-serif font-bold text-lg text-[#12181E] mb-2">
                Eco-Conscious Glass
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Apothecary glass bottles and biodegradable cartons designed to be infinitely recycled or composted.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={() => navigate('/products/barrier-repair-serum')}
              className="px-8 py-4 bg-[#4A6B5D] hover:bg-[#3D5A4E] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Explore The Barrier Serum</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
