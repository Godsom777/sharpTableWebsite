'use client';

import React from 'react';
import { CinematicFooter } from '@/components/ui/motion-footer';
import { LegalModal, useLegalModal } from './LegalModal';

export const Footer: React.FC = () => {
  const { isOpen, type, openPrivacyPolicy, openTermsOfService, closeModal } = useLegalModal();

  return (
    <>
      <CinematicFooter
        onOpenPrivacyPolicy={openPrivacyPolicy}
        onOpenTermsOfService={openTermsOfService}
      />
      <LegalModal isOpen={isOpen} onClose={closeModal} type={type} />
    </>
  );
};

export default Footer;
