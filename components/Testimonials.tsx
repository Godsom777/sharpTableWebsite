import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faQuoteLeft, faUtensils, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useGeoLocation } from '../hooks/useGeoLocation';
import { Box, Container, Typography } from '@mui/material';

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
    quote: "I didn't think I needed this. My system 'worked.' Then I saw the first week's report and realized how much was slipping through. We recovered money I didn't even know we were losing.",
    author: "David O.",
    role: "Owner",
    restaurant: "Grill House",
    location: "Lagos, Nigeria",
    rating: 5,
    metric: "$2.1K",
    metricLabel: "recovered in first 3 months"
  },
  {
    quote: "We tried SambaPOS before. Too many features, too complicated. My staff were confused. SharpTable was the opposite — they figured it out in minutes. And the payment gate? Game changer.",
    author: "Amara K.",
    role: "General Manager",
    restaurant: "Big Joe's Diner",
    location: "Abuja, Nigeria",
    rating: 5,
    metric: "10 min",
    metricLabel: "staff training time"
  },
  {
    quote: "I manage 3 branches. Before SharpTable, I had to call each manager every day. Now I open one dashboard and see everything — inventory, revenue, top sellers. I wish I had this years ago.",
    author: "Michael T.",
    role: "CEO",
    restaurant: "Urban Kitchen Group",
    location: "Port Harcourt, Nigeria",
    rating: 5,
    metric: "3",
    metricLabel: "branches on one screen"
  }
];

// Testimonials for global (non-African) audience
const globalTestimonials: Testimonial[] = [
  {
    quote: "I thought our process was fine. Cash at the till, paper tickets to the kitchen. Then I saw SharpTable's first audit report — we'd been bleeding money for years without knowing it.",
    author: "Marcus L.",
    role: "Owner",
    restaurant: "The Copper Pot",
    location: "London, UK",
    rating: 5,
    metric: "$8.4K",
    metricLabel: "recovered in first quarter"
  },
  {
    quote: "We evaluated three POS systems. All were overkill. SharpTable did the one thing that mattered — made sure we got paid before any food left the kitchen. Setup took an afternoon.",
    author: "Sarah M.",
    role: "Operations Director",
    restaurant: "Harbour Kitchen",
    location: "Sydney, Australia",
    rating: 5,
    metric: "1 day",
    metricLabel: "to go fully live"
  },
  {
    quote: "Five locations, five different ways of doing things. SharpTable gave me one view. Now I know exactly what's selling and who's handling what at every single outlet.",
    author: "James R.",
    role: "CEO",
    restaurant: "Bistro Group NYC",
    location: "New York, USA",
    rating: 5,
    metric: "5",
    metricLabel: "locations unified"
  }
];

const TestimonialCard: React.FC<{ testimonial: Testimonial; delay: number }> = ({ testimonial, delay }) => {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      sx={{ position: 'relative', height: '100%', '.group:hover & .card-inner': { borderColor: 'rgba(245,158,11,0.3)' } }}
      className="group"
    >
      <Box className="card-inner" sx={{ position: 'relative', height: '100%', bgcolor: 'rgba(24,24,27,0.8)', border: '1px solid', borderColor: 'grey.800', borderRadius: '1rem', p: { xs: 3, md: 4 }, transition: 'all 0.3s' }}>
        {/* Quote Icon */}
        <Box sx={{ position: 'absolute', top: -16, left: 24 }}>
          <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FontAwesomeIcon icon={faQuoteLeft} style={{ width: 16, height: 16, color: 'black' }} />
          </Box>
        </Box>

        {/* Stars */}
        <Box sx={{ display: 'flex', gap: 0.5, mb: 3, pt: 1 }}>
          {[...Array(testimonial.rating)].map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} style={{ width: 16, height: 16, color: '#fbbf24' }} />
          ))}
        </Box>

        {/* Quote */}
        <Typography sx={{ color: 'grey.300', fontSize: { xs: '0.875rem', md: '1rem' }, lineHeight: 1.625, mb: 4 }}>
          "{testimonial.quote}"
        </Typography>

        {/* Metric Highlight */}
        {testimonial.metric && (
          <Box sx={{ mb: 4, p: 2, borderRadius: '0.75rem', bgcolor: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <Typography sx={{ fontSize: '1.875rem', fontWeight: 700, color: '#fbbf24' }}>{testimonial.metric}</Typography>
            <Typography sx={{ fontSize: '0.75rem', color: 'grey.400' }}>{testimonial.metricLabel}</Typography>
          </Box>
        )}

        {/* Author */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pt: 3, borderTop: '1px solid', borderColor: 'grey.800' }}>
          <Box sx={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(to bottom right, #f59e0b, #f97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>
            {testimonial.author.charAt(0)}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '0.875rem' }}>{testimonial.author}</Typography>
            <Typography sx={{ color: 'grey.500', fontSize: '0.75rem' }}>{testimonial.role}</Typography>
          </Box>
        </Box>

        {/* Restaurant Info */}
        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1.5, fontSize: '0.75rem', color: 'grey.500' }}>
          <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <FontAwesomeIcon icon={faUtensils} style={{ width: 12, height: 12 }} />
            {testimonial.restaurant}
          </Box>
          <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <FontAwesomeIcon icon={faLocationDot} style={{ width: 12, height: 12 }} />
            {testimonial.location}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const Testimonials: React.FC = () => {
  const { isAfrica } = useGeoLocation();
  
  // Select testimonials based on user's geographic location
  const testimonials = isAfrica ? africanTestimonials : globalTestimonials;

  return (
    <Box component="section" sx={{ py: { xs: 10, md: 14 }, bgcolor: 'black', position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.03) 0%, transparent 50%)' }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, px: 3 }}>
        {/* Header */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: 'center', mb: { xs: 8, md: 10 } }}
        >
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '9999px', px: 2, py: 0.75, mb: 2 }}>
            <FontAwesomeIcon icon={faStar} style={{ width: 16, height: 16, color: '#4ade80' }} />
            <Box component="span" sx={{ color: '#4ade80', fontWeight: 600, fontSize: '0.875rem' }}>They were skeptical too</Box>
          </Box>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.875rem', md: '2.25rem' }, fontWeight: 700, color: 'white', mb: 1.5 }}>
            "I didn't think I needed it"
          </Typography>
          <Typography sx={{ color: 'grey.400', maxWidth: 'md', mx: 'auto' }}>
            Every one of these owners thought their system was working fine. Here's what changed their mind.
          </Typography>
        </Box>

        {/* Testimonials Grid */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: { xs: 3, lg: 4 } }}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} delay={index * 0.1} />
          ))}
        </Box>

        {/* Trust Badges */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          sx={{ mt: { xs: 10, md: 12 }, textAlign: 'center' }}
        >
          <Typography sx={{ color: 'grey.500', fontSize: '0.875rem', mb: 3 }}>Trusted by leading restaurants and food businesses</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: { xs: 2, md: 4 }, opacity: 0.5 }}>
            {['Restaurants', 'Food Courts', 'Kitchens', 'Grills', 'Cafes'].map((name, i) => (
              <Box key={i} sx={{ px: 2, py: 1, border: '1px solid', borderColor: 'grey.800', borderRadius: '0.5rem', color: 'grey.600', fontSize: '0.875rem', fontWeight: 500 }}>
                {name}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
