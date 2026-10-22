import { Product, Review } from '../types';

export const CDN_IMAGES = {
  thumbnailPreview: 'https://res.cloudinary.com/jhoyfcfm/image/upload/v1792687809/1792687563280.png',
  infographic: 'https://res.cloudinary.com/jhoyfcfm/image/upload/v1792687837/1792687539452.png',
  lifestyleBathroom: 'https://res.cloudinary.com/jhoyfcfm/image/upload/v1792687841/1792687450613.png',
  detailMacroBottle: 'https://res.cloudinary.com/jhoyfcfm/image/upload/v1792687841/1792687505330.png',
  pdpMasterAnchor1: 'https://res.cloudinary.com/jhoyfcfm/image/upload/v1792689382/1792688649455.png',
  pdpDropperTexture2: 'https://res.cloudinary.com/jhoyfcfm/image/upload/v1792689380/1792688708375.png',
  pdpModelApplication3: 'https://res.cloudinary.com/jhoyfcfm/image/upload/v1792689382/1792688766353.png',
  pdpBeforeAfterSplit4: 'https://res.cloudinary.com/jhoyfcfm/image/upload/v1792689354/1792688849779.png',
  pdpCraftPackaging5: 'https://res.cloudinary.com/jhoyfcfm/image/upload/v1792689370/1792688962685.png',
  pdpBotanicalActives6: 'https://res.cloudinary.com/jhoyfcfm/image/upload/v1792689377/1792688997168.png',
  heroBannerDesktop11: 'https://res.cloudinary.com/jhoyfcfm/image/upload/v1792689367/1792689035076.png',
  clinicalProofBanner1: 'https://res.cloudinary.com/jhoyfcfm/image/upload/v1792689303/1792689075662.png',
  clinicalProofBanner2: 'https://res.cloudinary.com/jhoyfcfm/image/upload/v1792689322/1792689119424.png',
  clinicalProofMobile14: 'https://res.cloudinary.com/jhoyfcfm/image/upload/v1792689274/1792689153952.png',
};

export const MAIN_PRODUCT: Product = {
  id: 'barrier-repair-serum',
  name: 'Barrier Repair Serum',
  subtitle: 'With 3% Ceramides, Niacinamide & Triple Hyaluronic Acid',
  tagline: 'Clinical lipid recovery for compromised, sensitive, and moisture-deprived skin.',
  price: 68.0,
  originalPrice: 85.0,
  subscriptionPrice: 54.4,
  rating: 4.9,
  reviewCount: 1280,
  volume: '50ml / 1.7 fl. oz. e',
  inStock: true,
  images: {
    thumbnail: CDN_IMAGES.thumbnailPreview,
    showcases: [
      {
        id: 1,
        title: 'Master Studio Anchor',
        caption: '50ml UV-shielded recyclable apothecary glass bottle with micro-calibrated dropper.',
        url: CDN_IMAGES.pdpMasterAnchor1,
      },
      {
        id: 2,
        title: 'Viscosity & Dropper Texture',
        caption: 'Featherlight biomimetic lipid emulsion that absorbs in 8 seconds with zero sticky film.',
        url: CDN_IMAGES.pdpDropperTexture2,
      },
      {
        id: 3,
        title: 'Morning Ritual Application',
        caption: 'Instant soothing relief applied to clean skin before moisturizers and broad-spectrum SPF.',
        url: CDN_IMAGES.pdpModelApplication3,
      },
      {
        id: 4,
        title: '14-Day Clinical Split',
        caption: 'Visible reduction in epidermal erythema and cellular desquamation after 14 days of twice-daily use.',
        url: CDN_IMAGES.pdpBeforeAfterSplit4,
      },
      {
        id: 5,
        title: 'Sustainable Craft Packaging',
        caption: 'FSC-certified post-consumer recycled craft carton with soy-based inks and zero virgin plastics.',
        url: CDN_IMAGES.pdpCraftPackaging5,
      },
      {
        id: 6,
        title: 'Botanical Active Ingredients',
        caption: 'Synergistic formulation of Centella Asiatica, Squalane, and bio-fermented Phytosphingosine.',
        url: CDN_IMAGES.pdpBotanicalActives6,
      },
    ],
  },
  features: [
    '3% Biomimetic Ceramide Complex (NP, AP, EOP) at optimal 3:1:1 physiological ratio',
    '4% High-Purity Niacinamide to soothe redness & strengthen intercellular cement',
    'Triple Molecular Weight Hyaluronic Acid for surface plumping and deep dermis hydration',
    '100% Fragrance-Free, Essential Oil-Free, Paraben-Free, Non-Comedogenic',
    'Dermatologically validated on sensitive, reactive, and post-procedure skin',
  ],
  keyIngredients: [
    {
      name: 'Biomimetic Ceramides 3%',
      percentage: '3.0%',
      description: 'Identical to human stratum corneum lipids (NP, AP, EOP) to rebuild cracked intercellular glue.',
      benefit: 'Seals moisture and shields against airborne allergens and pollution.',
    },
    {
      name: 'Pharmaceutical-Grade Niacinamide',
      percentage: '4.0%',
      description: 'Ultra-refined Vitamin B3 with minimal nicotinic acid traces to prevent flushing.',
      benefit: 'Reduces visible redness, refines texture, and boosts skin synthesis of natural ceramides.',
    },
    {
      name: 'Olive-Derived Pure Squalane',
      percentage: '2.5%',
      description: 'Biocompatible lipid fluid mimicking sebum elasticity.',
      benefit: 'Provides instant velvety slip without clogging pores or triggering fungal sensitivities.',
    },
    {
      name: 'Multi-Depth Hyaluron Matrix',
      percentage: '1.8%',
      description: 'High, medium, and low dalton polymers for 3D multi-layer hydration.',
      benefit: 'Binds up to 1000x its weight in atmospheric moisture for 24-hour dewiness.',
    },
  ],
  fullIngredients:
    'Aqua/Water/Eau, Glycerin, Niacinamide, Butylene Glycol, Squalane, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Sodium Hyaluronate, Hydrolyzed Sodium Hyaluronate, Centella Asiatica Extract, Allantoin, Panthenol (Pro-Vitamin B5), Xanthan Gum, Carbomer, Sodium Lauroyl Lactylate, Ethylhexylglycerin, Phenoxyethanol, Disodium EDTA, Citric Acid.',
  usageSteps: [
    {
      step: 1,
      title: 'Gentle Cleanse',
      description: 'Wash face with a sulfate-free, pH-balanced cleanser and pat skin gently until slightly damp.',
      time: 'AM & PM',
    },
    {
      step: 2,
      title: 'Dispense 3–4 Drops',
      description: 'Use the calibrated dropper to release 3 to 4 drops into the palms of clean hands.',
      time: 'AM & PM',
    },
    {
      step: 3,
      title: 'Press & Seal',
      description: 'Press gently across face, neck, and décolleté until completely absorbed. Follow with moisturizer or SPF.',
      time: 'AM & PM',
    },
  ],
  clinicalMetrics: [
    {
      percentage: '96%',
      claim: 'Saw significant reduction in erythema & irritation within 7 days',
      timeframe: 'Based on 4-week clinical cohort of 68 subjects',
    },
    {
      percentage: '94%',
      claim: 'Reported continuous, 24-hour hydration without mid-day tightness',
      timeframe: 'Corneometer instrumental moisture assessment',
    },
    {
      percentage: '100%',
      claim: 'Demonstrated zero comedogenicity or sensitization on sensitive skin',
      timeframe: 'Independent dermatologist HRIPT patch safety testing',
    },
  ],
};

export const CROSS_SELL_PRODUCT = {
  id: 'jade-gua-sha-roller',
  name: 'Gentle Jade Gua Sha Roller',
  subtitle: 'Hand-carved Xiuyan natural jade stone for lymphatic drainage & serum absorption.',
  price: 18.0,
  originalPrice: 28.0,
  image: CDN_IMAGES.detailMacroBottle,
};

export const REVIEWS_DATA: Review[] = [
  {
    id: 'rev-1',
    author: 'Dr. Elena Rostova',
    roleTitle: 'Board-Certified Dermatologist',
    location: 'Boston, MA',
    rating: 5,
    date: 'October 14, 2026',
    verifiedBuyer: true,
    skinType: 'Compromised Barrier & Rosacea',
    title: 'Saved my patients (and my own skin) after retinoid burns',
    comment:
      'As a dermatologist, I see compromised skin barriers daily from aggressive acids and tretinoid overuse. LUMEN’s 3:1:1 lipid formulation mimics natural intercellular matrices. The redness was visibly extinguished within 3 days. It has become my #1 clinical recommendation.',
    helpfulCount: 84,
  },
  {
    id: 'rev-2',
    author: 'Sarah M.',
    roleTitle: 'Verified Customer',
    location: 'San Francisco, CA',
    rating: 5,
    date: 'October 8, 2026',
    verifiedBuyer: true,
    skinType: 'Dry & Sensitive Skin',
    title: 'Lightweight, non-greasy, and leaves a gorgeous dewy glow',
    comment:
      'Most barrier creams feel like heavy petroleum jelly that suffocates my pores. LUMEN is completely different: an elegant, fluid milky serum that melts in instantly. My skin looks plump, calm, and glassy under makeup.',
    helpfulCount: 42,
  },
  {
    id: 'rev-3',
    author: 'Marcus Chen',
    roleTitle: 'Verified Customer',
    location: 'Chicago, IL',
    rating: 5,
    date: 'September 29, 2026',
    verifiedBuyer: true,
    skinType: 'Eczema-Prone & Reactive',
    title: 'Stops the winter burning sensation completely',
    comment:
      'Living in windy Chicago destroys my face every autumn. Everything else stung upon contact. This serum brought immediate relief within 10 seconds of application. No scent, no burn, just comfort.',
    helpfulCount: 31,
  },
  {
    id: 'rev-4',
    author: 'Camilla Dupont',
    roleTitle: 'Aesthetic Nurse Practitioner',
    location: 'Austin, TX',
    rating: 5,
    date: 'September 22, 2026',
    verifiedBuyer: true,
    skinType: 'Post-Laser Procedure',
    title: 'Essential post-treatment recovery elixir',
    comment:
      'We supply this to our clients post-microneedling and chemical peel. Recovery time is cut almost in half. The ceramide-to-cholesterol ratio is scientifically rigorous.',
    helpfulCount: 27,
  },
  {
    id: 'rev-5',
    author: 'Jessica L.',
    roleTitle: 'Verified Customer',
    location: 'Seattle, WA',
    rating: 5,
    date: 'September 15, 2026',
    verifiedBuyer: true,
    skinType: 'Combination / Acne-Prone',
    title: 'Zero breakouts, total barrier healing',
    comment:
      'I was terrified that ceramides would cause cystic breakouts on my oily T-zone. So glad I took the risk. My acne scars faded faster because my barrier was actually healthy enough to regenerate.',
    helpfulCount: 19,
  },
];

export const FAQ_DATA = [
  {
    category: 'Formulation & Science',
    items: [
      {
        question: 'What makes the 3% Ceramide Complex different from standard moisturizers?',
        answer:
          'Unlike generic lotions that include trace ceramides as marketing claims, LUMEN utilizes a concentrated 3.0% bio-identical complex of Ceramides NP, AP, and EOP combined with Phytosphingosine and free cholesterol in the golden 3:1:1 physiological ratio. This precisely mimics your natural lipid stratum, enabling direct cellular integration.',
      },
      {
        question: 'Can I use this serum with Active Retinol, Tretinoin, or Vitamin C?',
        answer:
          'Yes, absolutely. LUMEN Barrier Repair Serum is specifically engineered to mitigate the erythema, flaking, and irritation caused by strong active ingredients. You can apply it immediately before or after your retinoid or Vitamin C to cushion active penetration and protect the skin barrier.',
      },
      {
        question: 'Is LUMEN non-comedogenic and fragrance-free?',
        answer:
          'Yes. We formulate with zero synthetic perfumes, zero essential oils, and zero pore-clogging waxes. It has undergone independent clinical HRIPT patch testing and comedogenicity assays with 100% non-irritating, non-acnegenic validation.',
      },
    ],
  },
  {
    category: 'Application & Ritual',
    items: [
      {
        question: 'How many drops should I use and when?',
        answer:
          'We recommend 3 to 4 drops dispensed via the calibrated glass dropper morning and evening. Smooth over clean, slightly damp skin on face and neck before applying heavier creams or morning sunscreen.',
      },
      {
        question: 'How long does one 50ml bottle last?',
        answer:
          'With twice-daily use at 3-4 drops per ritual, one 50ml bottle lasts approximately 60 to 75 days.',
      },
      {
        question: 'Is it suitable for reactive, rosacea, or eczema-prone skin?',
        answer:
          'Yes. LUMEN was co-created by dermatologists explicitly for hypersensitive, rosacea-prone, and post-procedure skin that cannot tolerate standard skincare formulations.',
      },
    ],
  },
  {
    category: 'Orders, Shipping & Guarantee',
    items: [
      {
        question: 'What is your 30-Day Money-Back Guarantee?',
        answer:
          'We stand 100% behind our clinical formulations. If you do not experience visible barrier improvement or soothing relief within 30 days of delivery, simply email support@lumendermatology.com. We will refund your purchase immediately with no complicated return hoops.',
      },
      {
        question: 'How fast is shipping and is it free?',
        answer:
          'We provide FREE Express Shipping on all orders over $50 within the United States (standard delivery is 2–4 business days). Orders ship directly from our climate-controlled lab warehouse within 24 hours of placement.',
      },
      {
        question: 'How does the Subscribe & Save program work?',
        answer:
          'Subscribers enjoy an automatic 20% discount on every shipment ($54.40 vs $68.00) plus complimentary free express shipping on every cycle. You can adjust frequency (every 30, 45, or 60 days), pause, skip, or cancel at any time with one click from your account.',
      },
    ],
  },
];
