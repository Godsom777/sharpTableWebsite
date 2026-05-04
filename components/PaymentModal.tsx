'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmark, faEnvelope, faBuilding, faSpinner, faShieldHalved, faLock,
  faCrown, faArrowRight, faCheck, faKey, faEye, faEyeSlash, faUserPlus, faGlobe
} from '@fortawesome/free-solid-svg-icons';
import { faCcVisa, faCcMastercard, faCcAmex, faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Box, Typography, IconButton, InputBase, MenuItem, Select, Checkbox, CircularProgress, Divider } from '@mui/material';
import { usePayment, PLAN_CONFIG } from '../contexts/PaymentContext';
import { LegalModal, useLegalModal } from './LegalModal';
import { useGeoLocation } from '../hooks/useGeoLocation';
import { getAppSupabaseClient } from '../lib/supabase';

const SUPPORTED_COUNTRIES = [
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' }, { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' }, { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'US', name: 'United States', flag: '🇺🇸' }, { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'OTHER', name: 'Other', flag: '🌍' },
] as const;

const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
declare global { interface Window { PaystackPop: { setup: (options: any) => { openIframe: () => void } }; } }

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
      setErrors({}); setIsSubmitting(false); setAgreedToTerms(false); setShowPassword(false); setShowConfirmPassword(false); setRegistrationStep('form');
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (isModalOpen && detectedCountry && !formData.country) {
      const match = SUPPORTED_COUNTRIES.find(c => c.code === detectedCountry);
      if (match) setFormData(prev => ({ ...prev, country: match.code }));
    }
  }, [isModalOpen, detectedCountry]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape' && isModalOpen) closePaymentModal(); };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isModalOpen, closePaymentModal]);

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email required';
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
    if (!formData.country) newErrors.country = 'Select your country';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Min 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string) => (e: any) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value as string }));
    if (errors[field]) setErrors((prev: any) => ({ ...prev, [field]: undefined }));
  };

  const initiatePaystackPayment = useCallback(() => {
    if (!planDetails || !selectedPlan) return;
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('ref') || '';
    const subscriptionData = { email: formData.email.toLowerCase().trim(), businessName: formData.businessName.trim(), country: formData.country, plan: selectedPlan, planCode: planDetails.planCode, referralCode, initiatedAt: new Date().toISOString(), status: 'pending' };
    localStorage.setItem('sharptable_pending_subscription', JSON.stringify(subscriptionData));

    const customFields = [
      { display_name: 'Business Name', variable_name: 'business_name', value: formData.businessName.trim() },
      { display_name: 'Plan', variable_name: 'plan_type', value: selectedPlan },
      { display_name: 'Country', variable_name: 'country', value: formData.country },
    ];
    if (referralCode) customFields.push({ display_name: 'Partner Referral', variable_name: 'referral_code', value: referralCode });

    const paystackConfig = {
      key: PAYSTACK_PUBLIC_KEY, email: formData.email.toLowerCase().trim(), plan: planDetails.planCode, channels: ['card'], metadata: { custom_fields: customFields },
      callback: (response: any) => {
        const completedData = { ...subscriptionData, status: 'completed', completedAt: new Date().toISOString(), paystackReference: response.reference };
        localStorage.setItem('sharptable_subscription', JSON.stringify(completedData));
        localStorage.removeItem('sharptable_pending_subscription');
        window.location.href = `/payment/callback?reference=${response.reference}`;
      },
      onClose: () => setIsSubmitting(false),
    };
    window.PaystackPop.setup(paystackConfig).openIframe();
  }, [formData, planDetails, selectedPlan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !agreedToTerms) return;
    const client = getAppSupabaseClient();
    if (!client) { setErrors({ auth: 'System configuration error. Contact support.' }); return; }

    setIsSubmitting(true); setRegistrationStep('registering'); setErrors({});
    try {
      const { data: authData, error: authError } = await client.auth.signUp({
        email: formData.email.toLowerCase().trim(), password: formData.password,
        options: { data: { business_name: formData.businessName.trim(), country: formData.country, plan_type: selectedPlan } },
      });
      if (authError) {
        setErrors({
          auth: authError.message.includes('already registered')
            ? 'Email already registered. Log in from /account to upgrade, downgrade, or cancel.'
            : authError.message,
        });
        setIsSubmitting(false); setRegistrationStep('form');
        return;
      }
      if (!authData.user) { setErrors({ auth: 'Registration failed.' }); setIsSubmitting(false); setRegistrationStep('form'); return; }
      setRegistrationStep('payment');
      await new Promise(res => setTimeout(res, 300));
      initiatePaystackPayment();
    } catch {
      setErrors({ auth: 'Unexpected error occurred.' }); setIsSubmitting(false); setRegistrationStep('form');
    }
  };

  const handleOAuth = async (provider: 'google' | 'facebook') => {
    if (!formData.businessName.trim() || !formData.country) {
      setErrors({ 
        businessName: !formData.businessName.trim() ? `Required for ${provider} Sign-In` : undefined, 
        country: !formData.country ? `Required for ${provider} Sign-In` : undefined 
      });
      return;
    }
    if (!agreedToTerms) {
      setErrors({ auth: 'You must agree to the Terms and Privacy Policy.' });
      return;
    }
    const client = getAppSupabaseClient();
    if (!client) { setErrors({ auth: 'System configuration error. Contact support.' }); return; }

    setIsSubmitting(true);
    setErrors({});
    
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('ref') || '';
    const pendingData = { 
      businessName: formData.businessName.trim(), 
      country: formData.country, 
      plan: selectedPlan, 
      planCode: planDetails?.planCode,
      referralCode 
    };
    localStorage.setItem('sharptable_google_pending', JSON.stringify(pendingData));
    
    const { error } = await client.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/google-onboarding`
      }
    });

    if (error) {
      setErrors({ auth: error.message });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isModalOpen && planDetails && (
          <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={(e) => { if (e.target === e.currentTarget) closePaymentModal() }} sx={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, bgcolor: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)' }}>
            <Box component={motion.div} initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.3 }} sx={{ position: 'relative', width: '100%', maxWidth: '28rem', bgcolor: '#111111', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
              <Box sx={{ position: 'relative', px: 4, pt: 4, pb: 3, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <IconButton onClick={closePaymentModal} sx={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, color: 'grey.500', '&:hover': { color: 'white' } }}><FontAwesomeIcon icon={faXmark} style={{ width: 16, height: 16 }} /></IconButton>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)' }}><FontAwesomeIcon icon={faCrown} style={{ width: 20, height: 20 }} /></Box>
                  <Box>
                    <Typography variant="h2" sx={{ fontSize: '1.25rem', fontWeight: 800, color: 'white' }}>{planDetails.name} Plan</Typography>
                    <Typography sx={{ fontSize: '0.875rem', color: 'grey.400', fontWeight: 500 }}>{planDetails.price} {planDetails.period}</Typography>
                  </Box>
                </Box>
              </Box>

              <Box component="form" onSubmit={handleSubmit} sx={{ p: 4, display: 'flex', flexDirection: 'column', gap: 3, maxHeight: '65vh', overflowY: 'auto' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 0.5, borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', ...(registrationStep === 'form' ? { bgcolor: 'white', color: 'black' } : { bgcolor: '#22c55e', color: 'white' }) }}><FontAwesomeIcon icon={registrationStep === 'form' ? faUserPlus : faCheck} /> Register</Box>
                  <Box sx={{ width: 24, height: 1, bgcolor: 'rgba(255,255,255,0.2)' }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 0.5, borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', ...(registrationStep === 'payment' ? { bgcolor: 'white', color: 'black' } : { border: '1px solid rgba(255,255,255,0.2)', color: 'grey.500' }) }}><FontAwesomeIcon icon={faLock} /> Pay</Box>
                </Box>



                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  <Box>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: 'grey.400', textTransform: 'uppercase', mb: 1, letterSpacing: '0.05em' }}>Email</Typography>
                    <InputBase type="email" value={formData.email} onChange={handleInputChange('email')} disabled={isSubmitting} sx={{ width: '100%', bgcolor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'white', '&.Mui-focused': { borderColor: 'white' }, 'input': { py: 1.5, px: 2 } }} />
                    {errors.email && <Typography sx={{ mt: 0.5, fontSize: '0.75rem', color: '#f87171' }}>{errors.email}</Typography>}
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: 'grey.400', textTransform: 'uppercase', mb: 1, letterSpacing: '0.05em' }}>Business Name</Typography>
                    <InputBase type="text" value={formData.businessName} onChange={handleInputChange('businessName')} disabled={isSubmitting} sx={{ width: '100%', bgcolor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'white', '&.Mui-focused': { borderColor: 'white' }, 'input': { py: 1.5, px: 2 } }} />
                    {errors.businessName && <Typography sx={{ mt: 0.5, fontSize: '0.75rem', color: '#f87171' }}>{errors.businessName}</Typography>}
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: 'grey.400', textTransform: 'uppercase', mb: 1, letterSpacing: '0.05em' }}>Country</Typography>
                    <Select value={formData.country} onChange={handleInputChange('country')} displayEmpty disabled={isSubmitting} sx={{ width: '100%', bgcolor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'white', '&.Mui-focused': { borderColor: 'white' }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, py: 0, '& .MuiSelect-icon': { color: 'white' } }}>
                      <MenuItem value="" disabled>Select your country</MenuItem>
                      {SUPPORTED_COUNTRIES.map(c => <MenuItem key={c.code} value={c.code}>{c.flag} {c.name}</MenuItem>)}
                    </Select>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: 'grey.400', textTransform: 'uppercase', mb: 1, letterSpacing: '0.05em' }}>Password</Typography>
                    <InputBase type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleInputChange('password')} disabled={isSubmitting} endAdornment={<IconButton onClick={() => setShowPassword(!showPassword)} sx={{ color: 'grey.500' }}><FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} style={{ width: 14, height: 14 }} /></IconButton>} sx={{ width: '100%', bgcolor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'white', '&.Mui-focused': { borderColor: 'white' }, 'input': { py: 1.5, px: 2 } }} />
                    {errors.password && <Typography sx={{ mt: 0.5, fontSize: '0.75rem', color: '#f87171' }}>{errors.password}</Typography>}
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: 'grey.400', textTransform: 'uppercase', mb: 1, letterSpacing: '0.05em' }}>Confirm Password</Typography>
                    <InputBase type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleInputChange('confirmPassword')} disabled={isSubmitting} endAdornment={<IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} sx={{ color: 'grey.500' }}><FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} style={{ width: 14, height: 14 }} /></IconButton>} sx={{ width: '100%', bgcolor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem', color: 'white', '&.Mui-focused': { borderColor: 'white' }, 'input': { py: 1.5, px: 2 } }} />
                    {errors.confirmPassword && <Typography sx={{ mt: 0.5, fontSize: '0.75rem', color: '#f87171' }}>{errors.confirmPassword}</Typography>}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Checkbox checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} disabled={isSubmitting} size="small" sx={{ color: 'grey.600', '&.Mui-checked': { color: 'white' }, py: 0 }} />
                  <Typography sx={{ fontSize: '0.85rem', color: 'grey.400' }}>I agree to the <Box component="span" onClick={openTermsOfService} sx={{ color: 'white', textDecoration: 'underline', cursor: 'pointer' }}>Terms</Box> & <Box component="span" onClick={openPrivacyPolicy} sx={{ color: 'white', textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</Box></Typography>
                </Box>

                <Box component="button" type="submit" disabled={isSubmitting} sx={{ width: '100%', py: 2, borderRadius: '9999px', fontWeight: 800, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, cursor: isSubmitting ? 'not-allowed' : 'pointer', border: 'none', transition: 'all 0.2s', bgcolor: isSubmitting ? 'grey.800' : 'white', color: isSubmitting ? 'grey.500' : 'black', fontFamily: 'inherit', '&:hover:not(:disabled)': { bgcolor: 'grey.200' } }}>
                  {isSubmitting && registrationStep !== 'form' ? <><CircularProgress size={16} sx={{ color: 'inherit' }} />{registrationStep === 'registering' ? 'Registering...' : 'Securing...'}</> : <><FontAwesomeIcon icon={faLock} /> Complete Subscription</>}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 1 }}>
                  <Divider sx={{ flex: 1, borderColor: 'rgba(255,255,255,0.08)' }} />
                  <Typography sx={{ color: 'grey.600', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>OR</Typography>
                  <Divider sx={{ flex: 1, borderColor: 'rgba(255,255,255,0.08)' }} />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                  <Box component="button" type="button" onClick={() => handleOAuth('google')} disabled={isSubmitting} sx={{ flex: 1, py: 2, borderRadius: '9999px', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, cursor: isSubmitting ? 'not-allowed' : 'pointer', border: '1px solid rgba(255,255,255,0.2)', transition: 'all 0.2s', bgcolor: 'transparent', color: isSubmitting ? 'grey.600' : 'white', fontFamily: 'inherit', '&:hover:not(:disabled)': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
                    {isSubmitting && registrationStep === 'form' ? <CircularProgress size={16} sx={{ color: 'inherit' }} /> : <FontAwesomeIcon icon={faGoogle} />}
                    Google
                  </Box>
                  <Box component="button" type="button" onClick={() => handleOAuth('facebook')} disabled={isSubmitting} sx={{ flex: 1, py: 2, borderRadius: '9999px', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, cursor: isSubmitting ? 'not-allowed' : 'pointer', border: '1px solid rgba(13,110,253,0.5)', transition: 'all 0.2s', bgcolor: 'rgba(13,110,253,0.05)', color: isSubmitting ? 'grey.600' : '#3b5998', fontFamily: 'inherit', '&:hover:not(:disabled)': { bgcolor: 'rgba(13,110,253,0.1)' } }}>
                    {isSubmitting && registrationStep === 'form' ? <CircularProgress size={16} sx={{ color: 'inherit' }} /> : <FontAwesomeIcon icon={faFacebook} />}
                    Facebook
                  </Box>
                </Box>

                {errors.auth && <Box sx={{ mt: 3, p: 2, borderRadius: '0.5rem', bgcolor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: '0.875rem', fontWeight: 600 }}>{errors.auth}</Box>}
              </Box>

              <Box sx={{ px: 4, pb: 4, pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, pt: 3, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                  <FontAwesomeIcon icon={faCcVisa} style={{ width: 24, height: 24, color: 'grey' }} />
                  <FontAwesomeIcon icon={faCcMastercard} style={{ width: 24, height: 24, color: 'grey' }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.75rem', color: 'grey.500', fontWeight: 600, ml: 2 }}><FontAwesomeIcon icon={faShieldHalved} /> Secured by Paystack</Box>
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
