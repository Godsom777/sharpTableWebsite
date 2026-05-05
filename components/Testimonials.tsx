'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
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

const testimonialsData: Testimonial[] = [
  {
    quote: "With five locations running simultaneously, stopping staff theft and stabilizing our supply chain used to be exhausting. SharpTable handed us total visibility in weeks.",
    author: "David O.",
    role: "CEO",
    restaurant: "Grill House",
    location: "Lekki, Lagos",
    rating: 5,
    metric: "₦3.2M",
    metricLabel: "saved & recovered in first 3 months"
  },
  {
    quote: "Slow turnarounds and messy handoffs were destroying our dinner service. This system changed our entire kitchen rhythm overnight, making everything feel effortless.",
    author: "Amara K.",
    role: "Operations Director",
    restaurant: "Big Joe's Diner",
    location: "Victoria Island, Lagos",
    rating: 5,
    metric: "10 min",
    metricLabel: "to perfectionize table service"
  },
  {
    quote: "No guessing on inventory, no wondering about voids. It gives us the exact confidence we require to elegantly manage and scale our operations.",
    author: "Michael T.",
    role: "Owner",
    restaurant: "Urban Kitchen Group",
    location: "Ikeja, Lagos",
    rating: 5,
    metric: "3",
    metricLabel: "branches optimized on one screen"
  },
  {
    quote: "Since we integrated SharpTable, our bar and grill operations have transformed. The direct-to-kitchen routing practically eliminated order errors, and the turnaround time keeps customers ordering more.",
    author: "Mr. Uzochukwu",
    role: "Owner",
    restaurant: "Old English Bar and Grills",
    location: "Owerri, Imo State",
    rating: 5,
    metric: "+42%",
    metricLabel: "increase in weekend revenue"
  }
];

const TestimonialCard: React.FC<{ testimonial: Testimonial; delay: number }> = ({ testimonial, delay }) => {
  return (
    <Box
      component={motion.div}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      sx={{ 
        height: '100%', 
        bgcolor: '#111111', 
        border: '1px solid rgba(255,255,255,0.05)', 
        borderRadius: '2rem', 
        p: { xs: 3, md: 5 },
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s',
        '&:hover': {
          borderColor: 'rgba(255,255,255,0.1)',
          transform: 'translateY(-4px)'
        }
      }}
    >
      <Box sx={{ display: 'flex', gap: 0.5, mb: 4 }}>
        {[...Array(testimonial.rating)].map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStar} style={{ width: 14, height: 14, color: '#fbbf24' }} />
        ))}
      </Box>

      <Typography sx={{ color: 'white', fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 700, lineHeight: 1.4, mb: 4, letterSpacing: '-0.02em' }}>
        "{testimonial.quote}"
      </Typography>

      {testimonial.metric && (
        <Box sx={{ mb: 4, mt: 'auto' }}>
          <Typography sx={{ fontSize: { xs: '3rem', md: '3.5rem' }, fontWeight: 900, color: 'white', letterSpacing: '-0.04em', lineHeight: 1 }}>{testimonial.metric}</Typography>
          <Typography sx={{ fontSize: '0.85rem', color: 'grey.500', fontWeight: 600, mt: 1 }}>{testimonial.metricLabel}</Typography>
        </Box>
      )}

      {!testimonial.metric && <Box sx={{ mt: 'auto' }} />}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, pt: 4, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Box sx={{ width: 48, height: 48, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontWeight: 900, fontSize: '1.25rem' }}>
          {testimonial.author.charAt(0)}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ color: 'white', fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.01em' }}>{testimonial.author}</Typography>
          <Typography sx={{ color: 'grey.500', fontSize: '0.85rem', fontWeight: 600 }}>{testimonial.role}, {testimonial.restaurant} • {testimonial.location}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const Testimonials: React.FC = () => {
  const testimonials = testimonialsData;

  return (
    <Box component="section" sx={{ py: { xs: 12, md: 24 }, bgcolor: '#000000', position: 'relative' }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, px: { xs: 2.5, md: 4 } }}>
        <Box
          component={motion.div}
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', lg: 'flex-end' }, mb: { xs: 8, md: 16 } }}
        >
          <Box sx={{ maxWidth: '3xl' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'grey.300', fontSize: '0.875rem', mb: 2 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'white' }} />
              Feedback
            </Box>
            <Typography variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '4.5rem', lg: '5.5rem' }, fontWeight: 900, color: 'white', letterSpacing: '-0.04em', lineHeight: 1 }}>
              Real restaurants.
              <br />Real numbers.
            </Typography>
          </Box>
          <Typography sx={{ color: 'grey.400', maxWidth: 300, fontSize: '1.1rem', lineHeight: 1.6, mt: { xs: 4, lg: 0 } }}>
            The pattern is the same: eliminate mess, protect revenue, and deliver a system that scales luxury effortlessly.
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: { xs: 3, lg: 4 } }}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} delay={index * 0.1} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

