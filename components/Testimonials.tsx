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

const africanTestimonials: Testimonial[] = [
  {
    quote: "What sold me was not just fraud control. It was knowing the system would stay reliable, my team would get support, and I could keep growing without replacing everything in a year.",
    author: "David O.",
    role: "Owner",
    restaurant: "Grill House",
    location: "Lagos, Nigeria",
    rating: 5,
    metric: "$2.1K",
    metricLabel: "saved and recovered in first 3 months"
  },
  {
    quote: "We needed something stable enough for the long run. Now we track voids, cashier activity, and daily operations without turning every shift into an investigation.",
    author: "Amara K.",
    role: "General Manager",
    restaurant: "Big Joe's Diner",
    location: "Abuja, Nigeria",
    rating: 5,
    metric: "10 min",
    metricLabel: "to get the team comfortable"
  },
  {
    quote: "I manage 3 branches. Now I can track inventory, staff behavior, customer trends, and branch performance from one screen instead of chasing updates all day.",
    author: "Michael T.",
    role: "CEO",
    restaurant: "Urban Kitchen Group",
    location: "Port Harcourt, Nigeria",
    rating: 5,
    metric: "3",
    metricLabel: "branches on one screen"
  }
];

const globalTestimonials: Testimonial[] = [
  {
    quote: "We wanted stronger control, but the deciding factor was long-term stability. SharpTable gave us fraud visibility without introducing a system the team would hate using.",
    author: "Marcus L.",
    role: "Owner",
    restaurant: "The Copper Pot",
    location: "London, UK",
    rating: 5,
    metric: "$8.4K",
    metricLabel: "protected in the first quarter"
  },
  {
    quote: "We evaluated three systems. SharpTable was the one that balanced reliable operations, real support, and clear fraud prevention without bloating the workflow.",
    author: "Sarah M.",
    role: "Operations Director",
    restaurant: "Harbour Kitchen",
    location: "Sydney, Australia",
    rating: 5,
    metric: "1 day",
    metricLabel: "to go fully live"
  },
  {
    quote: "Five locations, five different sets of problems. SharpTable gave me one stable view of inventory, cashier activity, retention, and branch performance across the whole group.",
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
        <Box sx={{ position: 'absolute', top: -16, left: 24 }}>
          <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FontAwesomeIcon icon={faQuoteLeft} style={{ width: 16, height: 16, color: 'black' }} />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 0.5, mb: 3, pt: 1 }}>
          {[...Array(testimonial.rating)].map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} style={{ width: 16, height: 16, color: '#fbbf24' }} />
          ))}
        </Box>

        <Typography sx={{ color: 'grey.300', fontSize: { xs: '0.875rem', md: '1rem' }, lineHeight: 1.625, mb: 4 }}>
          "{testimonial.quote}"
        </Typography>

        {testimonial.metric && (
          <Box sx={{ mb: 4, p: 2, borderRadius: '0.75rem', bgcolor: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
            <Typography sx={{ fontSize: '1.875rem', fontWeight: 700, color: '#fbbf24' }}>{testimonial.metric}</Typography>
            <Typography sx={{ fontSize: '0.75rem', color: 'grey.400' }}>{testimonial.metricLabel}</Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pt: 3, borderTop: '1px solid', borderColor: 'grey.800' }}>
          <Box sx={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(to bottom right, #f59e0b, #f97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>
            {testimonial.author.charAt(0)}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ color: 'white', fontWeight: 600, fontSize: '0.875rem' }}>{testimonial.author}</Typography>
            <Typography sx={{ color: 'grey.500', fontSize: '0.75rem' }}>{testimonial.role}</Typography>
          </Box>
        </Box>

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
  const testimonials = isAfrica ? africanTestimonials : globalTestimonials;

  return (
    <Box component="section" sx={{ py: { xs: 10, md: 14 }, bgcolor: 'black', position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, background: 'radial-gradient(ellipse at center, rgba(251,191,36,0.03) 0%, transparent 50%)' }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, px: 3 }}>
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
            <Box component="span" sx={{ color: '#4ade80', fontWeight: 600, fontSize: '0.875rem' }}>Operators wanted proof</Box>
          </Box>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.875rem', md: '2.25rem' }, fontWeight: 700, color: 'white', mb: 1.5 }}>
            "We needed something we could rely on"
          </Typography>
          <Typography sx={{ color: 'grey.400', maxWidth: 'md', mx: 'auto' }}>
            The pattern is the same: better visibility, tighter control, stronger support, and a system that scales across locations.
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: { xs: 3, lg: 4 } }}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} delay={index * 0.1} />
          ))}
        </Box>

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
