'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Box, Container, Typography } from '@mui/material';

const fadeUp = {
  hidden: { opacity: 1, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* ----------------------------------------------------------------
   Testimonials data — preserved from existing component
   ---------------------------------------------------------------- */

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  restaurant: string;
  location: string;
  rating: number;
  metric?: string;
  metricLabel?: string;
  verified?: boolean;
  tag?: string;
}

// Single featured, client-approved customer story.
// NOTE: the "+42% weekend revenue" stat is intentionally left out until the
// client confirms it can be published.
const testimonialsData: Testimonial[] = [
  {
    quote: "Since we integrated SharpTable, our bar and grill operations have transformed. The direct-to-kitchen routing practically eliminated order errors, and the turnaround time keeps customers ordering more.",
    author: "Mr. Uzochukwu",
    role: "Owner",
    restaurant: "Old English Bar and Grills",
    location: "Owerri",
    rating: 5,
    verified: true,
    tag: "Verified customer"
  }
];

/* ----------------------------------------------------------------
   Testimonial Card — restyled for editorial feel
   ---------------------------------------------------------------- */

const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <Box
        sx={{
          height: '100%',
          bgcolor: 'rgba(15,15,15,0.85)',
          border: '1px solid var(--color-border)',
          borderRadius: '1rem',
          p: { xs: 3, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(20px)',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'var(--color-border-hover)',
            transform: 'translateY(-3px)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
          },
        }}
      >
        {/* Stars and Tag */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 0.75 }}>
            {[...Array(testimonial.rating)].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                style={{ width: 14, height: 14, color: '#f59e0b' }}
              />
            ))}
          </Box>
          {testimonial.tag && (
            <Box
              component="span"
              sx={{
                fontSize: '0.7rem',
                fontWeight: 700,
                px: 1.5,
                py: 0.4,
                borderRadius: '999px',
                bgcolor: testimonial.verified ? 'rgba(245, 158, 11, 0.12)' : 'rgba(255, 255, 255, 0.05)',
                color: testimonial.verified ? '#fcd34d' : 'grey.400',
                border: testimonial.verified ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                letterSpacing: '0.02em',
              }}
            >
              {testimonial.tag}
            </Box>
          )}
        </Box>

        {/* Quote */}
        <Typography
          sx={{
            color: 'white',
            fontSize: { xs: '1rem', md: '1.15rem' },
            fontWeight: 500,
            lineHeight: 1.65,
            mb: 3,
            letterSpacing: '-0.01em',
          }}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </Typography>

        {/* Metric */}
        {testimonial.metric && (
          <Box sx={{ mb: 3, mt: 'auto', pt: 2 }}>
            <Typography
              sx={{
                fontSize: { xs: '2.5rem', md: '3rem' },
                fontWeight: 800,
                color: 'white',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                fontFamily: 'var(--font-body)',
              }}
            >
              {testimonial.metric}
            </Typography>
            <Typography
              sx={{
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)',
                fontWeight: 500,
                mt: 0.75,
              }}
            >
              {testimonial.metricLabel}
            </Typography>
          </Box>
        )}

        {!testimonial.metric && <Box sx={{ mt: 'auto' }} />}

        {/* Author */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.75,
            pt: 3,
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000',
              fontWeight: 800,
              fontSize: '1.1rem',
              boxShadow: '0 0 15px rgba(245,158,11,0.3)',
            }}
          >
            {testimonial.author.charAt(0)}
          </Box>
          <Box>
            <Typography
              sx={{
                color: 'white',
                fontWeight: 700,
                fontSize: '0.95rem',
                letterSpacing: '-0.01em',
              }}
            >
              {testimonial.author}
            </Typography>
            <Typography
              sx={{
                color: 'var(--color-text-muted)',
                fontSize: '0.8rem',
                fontWeight: 500,
              }}
            >
              {testimonial.role}, {testimonial.restaurant}, {testimonial.location}
            </Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

/* ----------------------------------------------------------------
   Credibility Section
   ---------------------------------------------------------------- */

export const CredibilitySection: React.FC = () => {
  return (
    <Box
      component="section"
      id="credibility"
      className="section-padding"
      sx={{ position: 'relative' }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 4 } }}>
        {/* Section header */}
        <Box sx={{ mb: { xs: 3, md: 4 }, maxWidth: 'var(--max-width-narrow)' }}>
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Typography
              className="editorial-label"
              sx={{ mb: 2, color: 'var(--color-accent)' }}
            >
              Customer story
            </Typography>
          </motion.div>
        </Box>

        {/* Testimonials grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            maxWidth: 760,
          }}
        >
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default CredibilitySection;
