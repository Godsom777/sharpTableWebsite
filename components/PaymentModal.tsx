import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark, faEnvelope, faBuilding, faSpinner, faShieldHalved, faLock,
  faCrown, faArrowRight, faCheck, faKey, faEye, faEyeSlash, faUserPlus, faGlobe
} from '@fortawesome/free-solid-svg-icons';
import { faCcVisa, faCcMastercard, faCcAmex } from '@fortawesome/free-brands-svg-icons';
import { Box, Typography, IconButton, InputBase, MenuItem, Select, Checkbox, FormControlLabel, CircularProgress } from '@mui/material';
import { usePayment, PLAN_CONFIG } from '../contexts/PaymentContext';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { LegalModal, useLegalModal } from './LegalModal';
import { useGeoLocation } from '../hooks/useGeoLocation';

const SUPPORTED_COUNTRIES = [
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' }, { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' }, { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' }, { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼' }, { code: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳' }, { code: 'CI', name: "Côte d'Ivoire", flag: '🇨🇮' },
  { code: 'CM', name: 'Cameroon', flag: '🇨🇲' }, { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦' }, { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
  { code: 'BW', name: 'Botswana', flag: '🇧🇼' }, { code: 'NA', name: 'Namibia', flag: '🇳🇦' },
  { code: 'MU', name: 'Mauritius', flag: '🇲🇺' }, { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', name: 'United States', flag: '🇺🇸' }, { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' }, { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'IN', name: 'India', flag: '🇮🇳' }, { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' }, { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'OTHER', name: 'Other', flag: '🌍' },
] as const;

const appSupabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL || '';
const appSupabaseAnonKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY || '';

let supabase: SupabaseClient | null = null;
function getSupabaseClient(): SupabaseClient | null {
  if (!appSupabaseUrl || !appSupabaseAnonKey) {
    console.warn('Supabase credentials not configured for PaymentModal');
    return null;
  }
  if (!supabase) {
    supabase = createClient(appSupabaseUrl, appSupabaseAnonKey);
  }
  return supabase;
}

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

declare global {
  interface Window {
    PaystackPop: { setup: (options: any) => { openIframe: () => void } };
  }
}

export const PaymentModal: React.FC = () => {
  const { isModalOpen, selectedPlan, closePaymentModal } = usePayment();
  const { countryCode: detectedCountry } = useGeoLocation();
  const [formData, setFormData] = useState({ email: '', businessName: '', country: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationStep, setRegistrationStep] = useState<'form' | 'registering' | 'payment'>('form');

  const planDetails = selectedPlan ? PLAN_CONFIG[selectedPlan] : null;
  const { isOpen: isLegalOpen, type: legalType, openPrivacyPolicy, openTermsOfService, closeModal: closeLegalModal } = useLegalModal();

  useEffect(() => {
    if (!isModalOpen) {
      setFormData({ email: '', businessName: '', country: '', password: '', confirmPassword: '' });
      setErrors({});
      setIsSubmitting(false);
      setAgreedToTerms(false);
      setShowPassword(false);
      setShowConfirmPassword(false);
      setRegistrationStep('form');
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen && detectedCountry && !formData.country) {
      const match = SUPPORTED_COUNTRIES.find(c => c.code === detectedCountry);
      if (match) setFormData(prev => ({ ...prev, country: match.code }));
    }
  }, [isModalOpen, detectedCountry]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) closePaymentModal();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen, closePaymentModal]);

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    else if (formData.businessName.trim().length < 2) newErrors.businessName = 'Business name must be at least 2 characters';
    if (!formData.country) newErrors.country = 'Please select your country';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) newErrors.password = 'Password must include uppercase, lowercase, and a number';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | { value: unknown }>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value as string }));
    if (errors[field]) setErrors((prev: any) => ({ ...prev, [field]: undefined }));
  };

  const initiatePaystackPayment = useCallback(() => {
    if (!planDetails || !selectedPlan) return;
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('ref') || '';

    const subscriptionData = {
      email: formData.email.toLowerCase().trim(),
      businessName: formData.businessName.trim(),
      country: formData.country,
      plan: selectedPlan,
      planCode: planDetails.planCode,
      referralCode,
      initiatedAt: new Date().toISOString(),
      status: 'pending',
    };
    localStorage.setItem('sharptable_pending_subscription', JSON.stringify(subscriptionData));

    const customFields = [
      { display_name: 'Business Name', variable_name: 'business_name', value: formData.businessName.trim() },
      { display_name: 'Plan', variable_name: 'plan_type', value: selectedPlan },
      { display_name: 'Country', variable_name: 'country', value: formData.country },
    ];
    if (referralCode) customFields.push({ display_name: 'Partner Referral', variable_name: 'referral_code', value: referralCode });

    const paystackConfig = {
      key: PAYSTACK_PUBLIC_KEY,
      email: formData.email.toLowerCase().trim(),
      plan: planDetails.planCode,
      channels: ['card'],
      metadata: { custom_fields: customFields },
      callback: (response: any) => {
        const completedData = { ...subscriptionData, status: 'completed', completedAt: new Date().toISOString(), paystackReference: response.reference };
        localStorage.setItem('sharptable_subscription', JSON.stringify(completedData));
        localStorage.removeItem('sharptable_pending_subscription');
        window.location.href = `/payment/callback?reference=${response.reference}`;
      },
      onClose: () => setIsSubmitting(false),
    };

    const handler = window.PaystackPop.setup(paystackConfig);
    handler.openIframe();
  }, [formData, planDetails, selectedPlan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !agreedToTerms) return;

    const client = getSupabaseClient();
    if (!client) {
      setErrors({ auth: 'Payment system not configured. Please contact support.' });
      return;
    }

    setIsSubmitting(true);
    setRegistrationStep('registering');
    setErrors({});

    try {
      const { data: authData, error: authError } = await client.auth.signUp({
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        options: { data: { business_name: formData.businessName.trim(), country: formData.country, plan_type: selectedPlan } },
      });

      if (authError) {
        if (authError.message.includes('already registered')) setErrors({ auth: 'This email is already registered. Please use a different email or sign in to the app.' });
        else setErrors({ auth: authError.message });
        setIsSubmitting(false);
        setRegistrationStep('form');
        return;
      }
      if (!authData.user) {
        setErrors({ auth: 'Failed to create account. Please try again.' });
        setIsSubmitting(false);
        setRegistrationStep('form');
        return;
      }

      setRegistrationStep('payment');
      await new Promise((resolve) => setTimeout(resolve, 300));
      initiatePaystackPayment();
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ auth: 'An unexpected error occurred. Please try again.' });
      setIsSubmitting(false);
      setRegistrationStep('form');
    }
  };

  return (
    <>
      <AnimatePresence>
        {isModalOpen && planDetails && (
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => { if (e.target === e.currentTarget) closePaymentModal() }}
            sx={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4, bgcolor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
          >
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, type: 'spring', damping: 25 }}
              sx={{ position: 'relative', width: '100%', maxWidth: '28rem', bgcolor: 'grey.900', borderRadius: '1rem', border: '1px solid', borderColor: 'grey.800', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden' }}
            >
              {/* Header */}
              <Box sx={{ position: 'relative', px: 3, pt: 3, pb: 2, borderBottom: '1px solid', borderColor: 'grey.800' }}>
                <IconButton
                  onClick={closePaymentModal}
                  sx={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, bgcolor: 'grey.800', '&:hover': { bgcolor: 'grey.700' }, color: 'grey.400', transition: 'all 0.2s', zIndex: 10 }}
                >
                  <FontAwesomeIcon icon={faXmark} style={{ width: 16, height: 16 }} />
                </IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: selectedPlan === 'pro' ? 'linear-gradient(to bottom right, #f59e0b, #f97316)' : 'linear-gradient(to bottom right, #a855f7, #ec4899)' }}>
                    <FontAwesomeIcon icon={faCrown} style={{ color: 'white', width: 20, height: 20 }} />
                  </Box>
                  <Box>
                    <Typography variant="h2" sx={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>{planDetails.name} Plan</Typography>
                    <Typography sx={{ fontSize: '0.875rem', color: 'grey.400' }}>{planDetails.price}<Box component="span" sx={{ color: 'grey.500' }}>{planDetails.period}</Box></Typography>
                  </Box>
                </Box>
              </Box>

              {/* Form */}
              <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, maxHeight: '65vh', overflowY: 'auto' }}>
                {/* Registration Step Indicator */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 1.5, py: 0.5, borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500, ...(registrationStep === 'form' ? { bgcolor: 'rgba(245,158,11,0.2)', color: '#fbbf24' } : { bgcolor: 'rgba(34,197,94,0.2)', color: '#4ade80' }) }}>
                    <FontAwesomeIcon icon={registrationStep === 'form' ? faUserPlus : faCheck} style={{ width: 12, height: 12 }} />
                    <Box component="span">1. Register</Box>
                  </Box>
                  <Box sx={{ width: 16, height: 2, bgcolor: 'grey.700' }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, px: 1.5, py: 0.5, borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500, ...(registrationStep === 'payment' ? { bgcolor: 'rgba(245,158,11,0.2)', color: '#fbbf24' } : { bgcolor: 'grey.700', color: 'grey.500' }) }}>
                    <FontAwesomeIcon icon={faLock} style={{ width: 12, height: 12 }} />
                    <Box component="span">2. Pay</Box>
                  </Box>
                </Box>

                <Typography sx={{ fontSize: '0.875rem', color: 'grey.400' }}>Create your SharpTable account, then complete payment to activate your subscription.</Typography>

                {errors.auth && (
                  <Box sx={{ p: 1.5, borderRadius: '0.75rem', bgcolor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#f87171' }}>{errors.auth}</Typography>
                  </Box>
                )}

                {/* Input Fields block */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Email */}
                  <Box>
                    <Typography component="label" sx={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'grey.300', mb: 1 }}>Email Address</Typography>
                    <InputBase
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      placeholder="your@email.com"
                      disabled={isSubmitting}
                      startAdornment={<FontAwesomeIcon icon={faEnvelope} style={{ marginLeft: 12, marginRight: 8, color: '#6b7280' }} />}
                      sx={{ width: '100%', bgcolor: 'grey.800', border: '1px solid', borderColor: errors.email ? '#ef4444' : 'grey.700', borderRadius: '0.75rem', color: 'white', '&.Mui-focused': { borderColor: '#fbbf24' }, 'input': { py: 1.5, px: 1, '&::placeholder': { color: '#6b7280', opacity: 1 } } }}
                    />
                    {errors.email && <Typography sx={{ mt: 0.5, fontSize: '0.875rem', color: '#f87171' }}>{errors.email}</Typography>}
                  </Box>

                  {/* Business Name */}
                  <Box>
                    <Typography component="label" sx={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'grey.300', mb: 1 }}>Restaurant / Business Name</Typography>
                    <InputBase
                      type="text"
                      value={formData.businessName}
                      onChange={handleInputChange('businessName')}
                      placeholder="Your Restaurant Name"
                      disabled={isSubmitting}
                      startAdornment={<FontAwesomeIcon icon={faBuilding} style={{ marginLeft: 12, marginRight: 8, color: '#6b7280' }} />}
                      sx={{ width: '100%', bgcolor: 'grey.800', border: '1px solid', borderColor: errors.businessName ? '#ef4444' : 'grey.700', borderRadius: '0.75rem', color: 'white', '&.Mui-focused': { borderColor: '#fbbf24' }, 'input': { py: 1.5, px: 1, '&::placeholder': { color: '#6b7280', opacity: 1 } } }}
                    />
                    {errors.businessName && <Typography sx={{ mt: 0.5, fontSize: '0.875rem', color: '#f87171' }}>{errors.businessName}</Typography>}
                  </Box>

                  {/* Country */}
                  <Box>
                    <Typography component="label" sx={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'grey.300', mb: 1 }}>Country</Typography>
                    <Select
                      value={formData.country}
                      onChange={handleInputChange('country')}
                      displayEmpty
                      disabled={isSubmitting}
                      sx={{ width: '100%', bgcolor: 'grey.800', border: '1px solid', borderColor: errors.country ? '#ef4444' : 'grey.700', borderRadius: '0.75rem', color: 'white', '&.Mui-focused': { borderColor: '#fbbf24', '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, py: 0.25, '& .MuiSelect-icon': { color: 'white' } }}
                    >
                      <MenuItem value="" disabled><Box component="span" sx={{ color: 'grey.500' }}>Select your country</Box></MenuItem>
                      {SUPPORTED_COUNTRIES.map(c => (
                        <MenuItem key={c.code} value={c.code}>{c.flag} {c.name}</MenuItem>
                      ))}
                    </Select>
                    {errors.country && <Typography sx={{ mt: 0.5, fontSize: '0.875rem', color: '#f87171' }}>{errors.country}</Typography>}
                  </Box>

                  {/* Password */}
                  <Box>
                    <Typography component="label" sx={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'grey.300', mb: 1 }}>Create Password</Typography>
                    <InputBase
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange('password')}
                      placeholder="Min 8 chars, uppercase, lowercase, number"
                      disabled={isSubmitting}
                      startAdornment={<FontAwesomeIcon icon={faKey} style={{ marginLeft: 12, marginRight: 8, color: '#6b7280' }} />}
                      endAdornment={
                        <IconButton onClick={() => setShowPassword(!showPassword)} sx={{ mr: 1, p: 0.5, color: 'grey.500' }}>
                          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{ width: 16, height: 16 }} />
                        </IconButton>
                      }
                      sx={{ width: '100%', bgcolor: 'grey.800', border: '1px solid', borderColor: errors.password ? '#ef4444' : 'grey.700', borderRadius: '0.75rem', color: 'white', '&.Mui-focused': { borderColor: '#fbbf24' }, 'input': { py: 1.5, px: 1, '&::placeholder': { color: '#6b7280', opacity: 1 } } }}
                    />
                    {errors.password && <Typography sx={{ mt: 0.5, fontSize: '0.875rem', color: '#f87171' }}>{errors.password}</Typography>}
                  </Box>

                  {/* Confirm Password */}
                  <Box>
                    <Typography component="label" sx={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'grey.300', mb: 1 }}>Confirm Password</Typography>
                    <InputBase
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleInputChange('confirmPassword')}
                      placeholder="Re-enter your password"
                      disabled={isSubmitting}
                      startAdornment={<FontAwesomeIcon icon={faLock} style={{ marginLeft: 12, marginRight: 8, color: '#6b7280' }} />}
                      endAdornment={
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} sx={{ mr: 1, p: 0.5, color: 'grey.500' }}>
                          <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} style={{ width: 16, height: 16 }} />
                        </IconButton>
                      }
                      sx={{ width: '100%', bgcolor: 'grey.800', border: '1px solid', borderColor: errors.confirmPassword ? '#ef4444' : 'grey.700', borderRadius: '0.75rem', color: 'white', '&.Mui-focused': { borderColor: '#fbbf24' }, 'input': { py: 1.5, px: 1, '&::placeholder': { color: '#6b7280', opacity: 1 } } }}
                    />
                    {errors.confirmPassword && <Typography sx={{ mt: 0.5, fontSize: '0.875rem', color: '#f87171' }}>{errors.confirmPassword}</Typography>}
                  </Box>
                </Box>

                {/* Terms checkbox */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mt: 1 }}>
                  <Checkbox checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} disabled={isSubmitting} size="small" sx={{ color: 'grey.600', '&.Mui-checked': { color: '#f59e0b' }, py: 0 }} />
                  <Typography sx={{ fontSize: '0.875rem', color: 'grey.400' }}>
                    I agree to the{' '}
                    <Box component="button" type="button" onClick={(e) => { e.stopPropagation(); openTermsOfService(); }} sx={{ color: '#fbbf24', border: 'none', bgcolor: 'transparent', p: 0, textDecoration: 'underline', cursor: 'pointer', fontFamily: 'inherit' }}>Terms of Service</Box>
                    {' '}and{' '}
                    <Box component="button" type="button" onClick={(e) => { e.stopPropagation(); openPrivacyPolicy(); }} sx={{ color: '#fbbf24', border: 'none', bgcolor: 'transparent', p: 0, textDecoration: 'underline', cursor: 'pointer', fontFamily: 'inherit' }}>Privacy Policy</Box>
                  </Typography>
                </Box>

                {/* Submit */}
                <Box
                  component="button"
                  type="submit"
                  disabled={isSubmitting || !agreedToTerms}
                  sx={{
                    width: '100%', py: 2, borderRadius: '0.75rem', fontWeight: 600, fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, cursor: isSubmitting || !agreedToTerms ? 'not-allowed' : 'pointer', border: 'none', transition: 'all 0.3s', color: (isSubmitting || !agreedToTerms) ? 'grey.400' : 'white', '&:disabled': { bgcolor: 'grey.700' },
                    ...(selectedPlan === 'pro' && !isSubmitting && agreedToTerms ? { background: 'linear-gradient(to right, #f59e0b, #f97316)', '&:hover': { boxShadow: '0 10px 15px -3px rgba(245,158,11,0.25)', transform: 'scale(1.02)' } } : {}),
                    ...(selectedPlan === 'enterprise' && !isSubmitting && agreedToTerms ? { background: 'linear-gradient(to right, #a855f7, #ec4899)', '&:hover': { boxShadow: '0 10px 15px -3px rgba(168,85,247,0.25)', transform: 'scale(1.02)' } } : {}),
                    fontFamily: 'inherit'
                  }}
                >
                  {isSubmitting ? (
                    <><CircularProgress size={16} sx={{ color: 'inherit' }} />{registrationStep === 'registering' ? 'Creating Account...' : 'Opening Payment...'}</>
                  ) : (
                    <><FontAwesomeIcon icon={faUserPlus} style={{ width: 16, height: 16 }} />Register & Subscribe</>
                  )}
                </Box>
              </Box>

              {/* Footer */}
              <Box sx={{ px: 3, pb: 3, pt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}>
                  <Typography sx={{ fontSize: '0.75rem', color: 'grey.500' }}>We accept:</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FontAwesomeIcon icon={faCcVisa} style={{ width: 32, height: 32, color: '#1A1F71' }} />
                    <FontAwesomeIcon icon={faCcMastercard} style={{ width: 32, height: 32, color: '#EB001B' }} />
                    <FontAwesomeIcon icon={faCcAmex} style={{ width: 32, height: 32, color: '#006FCF' }} />
                    <Box sx={{ px: 1, py: 0.5, bgcolor: '#00425F', borderRadius: '4px', fontSize: '10px', fontWeight: 700, color: 'white' }}>VERVE</Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, fontSize: '0.75rem', color: 'grey.500' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}><FontAwesomeIcon icon={faLock} style={{ width: 12, height: 12 }} />SSL Secured</Box>
                  <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'grey.600' }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}><FontAwesomeIcon icon={faShieldHalved} style={{ width: 12, height: 12 }} />Powered by Paystack</Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </AnimatePresence>
      <LegalModal isOpen={isLegalOpen} onClose={closeLegalModal} type={legalType} />
    </>
  );
};
