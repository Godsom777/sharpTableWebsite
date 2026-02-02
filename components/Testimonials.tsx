import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faQuoteLeft, faUtensils, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useGeoLocation } from '../hooks/useGeoLocation';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  restaurant: string;
  location: string;
  rating: number;
  metric?: string;
  metricLabel?: string;
}

// Testimonials for African audience
const africanTestimonials: Testimonial[] = [
  {
    quote: "We used to lose at least 8-10 walkouts a week. After SharpTable, we haven't had a single one in 3 months. The gate system just works.",
    author: "David O.",
    role: "Owner",
    restaurant: "Grill House",
    location: "Lagos, Nigeria",
    rating: 5,
    metric: "0",
    metricLabel: "walkouts in 90 days"
  },
  {
    quote: "My staff know they're accountable now. Every payment is tracked, every order has a name attached. No more 'I don't know who collected it.'",
    author: "Amara K.",
    role: "General Manager",
    restaurant: "Big Joe's Diner",
    location: "Abuja, Nigeria",
    rating: 5,
    metric: "12%",
    metricLabel: "revenue recovered"
  },
  {
    quote: "We expanded to 3 locations and needed visibility across all of them. Command tier gives me that — one dashboard, full control.",
    author: "Michael T.",
    role: "CEO",
    restaurant: "Urban Kitchen Group",
    location: "Port Harcourt, Nigeria",
    rating: 5,
    metric: "3",
    metricLabel: "locations managed"
  }
];

// Testimonials for global (non-African) audience
const globalTestimonials: Testimonial[] = [
  {
    quote: "We were losing thousands each month to walkouts and payment disputes. SharpTable's gate system eliminated that completely. It's been a game-changer.",
    author: "Marcus L.",
    role: "Owner",
    restaurant: "The Copper Pot",
    location: "London, UK",
    rating: 5,
    metric: "0",
    metricLabel: "walkouts in 90 days"
  },
  {
    quote: "Full accountability across every shift. Every transaction is tracked, every order verified. Our shrinkage dropped overnight.",
    author: "Sarah M.",
    role: "Operations Director",
    restaurant: "Harbour Kitchen",
    location: "Sydney, Australia",
    rating: 5,
    metric: "15%",
    metricLabel: "revenue recovered"
  },
  {
    quote: "Managing 5 locations used to be chaos. Now I have real-time visibility into every outlet from one dashboard. Worth every penny.",
    author: "James R.",
    role: "CEO",
    restaurant: "Bistro Group NYC",
    location: "New York, USA",
    rating: 5,
    metric: "5",
    metricLabel: "locations managed"
  }
];

const TestimonialCard: React.FC<{ testimonial: Testimonial; delay: number }> = ({ testimonial, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="relative h-full bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/30 rounded-2xl p-6 md:p-8 transition-all duration-300">
        {/* Quote Icon */}
        <div className="absolute -top-4 left-6">
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
            <FontAwesomeIcon icon={faQuoteLeft} className="w-4 h-4 text-black" />
          </div>
        </div>

        {/* Stars */}
        <div className="flex gap-1 mb-4 pt-2">
          {[...Array(testimonial.rating)].map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} className="w-4 h-4 text-amber-400" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
          "{testimonial.quote}"
        </p>

        {/* Metric Highlight */}
        {testimonial.metric && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="text-3xl font-bold text-amber-400">{testimonial.metric}</div>
            <div className="text-xs text-gray-400">{testimonial.metricLabel}</div>
          </div>
        )}

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold">
            {testimonial.author.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="text-white font-semibold text-sm">{testimonial.author}</div>
            <div className="text-gray-500 text-xs">{testimonial.role}</div>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faUtensils} className="w-3 h-3" />
            {testimonial.restaurant}
          </span>
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3" />
            {testimonial.location}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export const Testimonials: React.FC = () => {
  const { isAfrica } = useGeoLocation();
  
  // Select testimonials based on user's geographic location
  const testimonials = isAfrica ? africanTestimonials : globalTestimonials;

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.03)_0%,transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-4">
            <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-semibold text-sm">Trusted by Restaurant Owners</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Real results from real restaurants
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Don't take our word for it. Here's what owners are saying after switching to SharpTable.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} delay={index * 0.1} />
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm mb-6">Trusted by leading restaurants and food businesses</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {/* Placeholder logos - you can replace with actual partner logos */}
            {['Restaurants', 'Food Courts', 'Kitchens', 'Grills', 'Cafes'].map((name, i) => (
              <div key={i} className="px-4 py-2 border border-zinc-800 rounded-lg text-gray-600 text-sm font-medium">
                {name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
