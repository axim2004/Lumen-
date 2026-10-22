import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { REVIEWS_DATA } from '../data/assets';
import { Review } from '../types';
import { Star, CheckCircle, ThumbsUp, MessageSquarePlus, X } from 'lucide-react';

const sectionStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // New review form
  const [author, setAuthor] = useState('');
  const [roleTitle, setRoleTitle] = useState('Verified Customer');
  const [location, setLocation] = useState('New York, NY');
  const [skinType, setSkinType] = useState('Dry & Sensitive Skin');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const filterCategories = [
    'All',
    'Dry & Sensitive Skin',
    'Compromised Barrier & Rosacea',
    'Eczema-Prone & Reactive',
    'Combination / Acne-Prone',
  ];

  const filteredReviews =
    activeFilter === 'All'
      ? reviews
      : reviews.filter((r) => r.skinType.toLowerCase().includes(activeFilter.toLowerCase()));

  const handleHelpful = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author,
      roleTitle,
      location,
      rating,
      date: 'Just now',
      verifiedBuyer: true,
      skinType,
      title: title || 'Exceptional clinical recovery',
      comment,
      helpfulCount: 1,
    };

    setReviews([newRev, ...reviews]);
    setIsWriteModalOpen(false);
    setAuthor('');
    setTitle('');
    setComment('');
  };

  return (
    <motion.section
      id="reviews"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionStaggerContainer}
      className="py-10 sm:py-14 md:py-16 bg-[#F8F9FA] border-t border-stone-200 font-poppins"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block with Rating Score */}
        <motion.div
          variants={itemFadeUp}
          className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 sm:pb-8 border-b border-stone-200"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-xl font-bold text-[#12181E] tabular-nums">4.9 / 5.0</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#12181E] tracking-tight">
              Verified Patient & Dermatologist Reviews
            </h2>
            <p className="text-stone-600 text-sm mt-1 font-light">
              Based on 1,280+ clinical cohort & customer evaluations
            </p>
          </div>

          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 bg-[#4A6B5D] text-white text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#3D5A4E] transition-all shadow-sm shrink-0 active:scale-95"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Clinical Review</span>
          </button>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div variants={itemFadeUp} className="flex items-center gap-2 py-6 overflow-x-auto no-scrollbar">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeFilter === cat
                  ? 'bg-[#12181E] text-white shadow-sm'
                  : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Reviews Grid */}
        <motion.div layout variants={sectionStaggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredReviews.map((rev) => (
              <motion.div
                key={rev.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Rating stars & verified badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-[#D4AF37]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    {rev.verifiedBuyer && (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-[#4A6B5D] bg-[#E0F2FE]/60 px-2 py-0.5 rounded">
                        <CheckCircle className="w-3 h-3 text-[#4A6B5D]" />
                        <span>Verified Buyer</span>
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-[#12181E] mb-2 leading-snug">
                    &ldquo;{rev.title}&rdquo;
                  </h3>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                    {rev.comment}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-[#12181E]">{rev.author}</p>
                    <p className="text-[11px] text-stone-500">
                      {rev.roleTitle ? `${rev.roleTitle} · ` : ''}{rev.skinType}
                    </p>
                  </div>

                  <button
                    onClick={() => handleHelpful(rev.id)}
                    className="flex items-center gap-1.5 text-stone-400 hover:text-[#4A6B5D] transition-colors p-1"
                    title="Mark as helpful"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span className="tabular-nums text-[11px]">{rev.helpfulCount}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Write a Review Modal */}
      <AnimatePresence>
        {isWriteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWriteModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.22 }}
              className="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 z-10"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <h3 className="text-lg font-serif font-bold text-[#12181E]">
                  Write a Clinical Review
                </h3>
                <button
                  onClick={() => setIsWriteModalOpen(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="py-4 space-y-4 text-xs">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Overall Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none transition-transform hover:scale-110 active:scale-95"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating ? 'text-[#D4AF37] fill-current' : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Catherine M."
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A6B5D]"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Skin Concern / Type</label>
                    <select
                      value={skinType}
                      onChange={(e) => setSkinType(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A6B5D]"
                    >
                      <option value="Dry & Sensitive Skin">Dry & Sensitive Skin</option>
                      <option value="Compromised Barrier & Rosacea">Compromised Barrier & Rosacea</option>
                      <option value="Eczema-Prone & Reactive">Eczema-Prone & Reactive</option>
                      <option value="Combination / Acne-Prone">Combination / Acne-Prone</option>
                      <option value="Post-Procedure Recovery">Post-Procedure Recovery</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Review Headline</label>
                  <input
                    type="text"
                    placeholder="e.g. Cleared my skin barrier flaking in 4 days"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A6B5D]"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Clinical Observation / Experience</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the speed of barrier relief, texture absorption, and skin finish..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4A6B5D]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#4A6B5D] text-white font-semibold uppercase tracking-wider rounded-xl hover:bg-[#3D5A4E] transition-all shadow-sm active:scale-[0.99]"
                >
                  Submit Verified Review
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
