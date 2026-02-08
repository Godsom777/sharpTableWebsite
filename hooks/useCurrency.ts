import { useState, useEffect, useCallback } from 'react';

interface CurrencyState {
  isLoading: boolean;
  error: string | null;
}

// Base prices in Naira (NGN) - THE SOURCE OF TRUTH
// Backend charges in Naira; frontend always displays in USD
export const BASE_PRICES_NGN = {
  'pro-monthly': 99_999, // ₦99,999/month
  'pro-yearly': 1_000_000, // ₦1,000,000/year
  'enterprise-monthly': 199_999, // ₦199,999/month
  'enterprise-yearly': 2_000_000, // ₦2,000,000/year
};

// Fallback NGN → USD rate (approx ₦1,550 = $1) — used if live rates fail
const FALLBACK_NGN_TO_USD = 1 / 1550;

export const useCurrency = () => {
  const [state, setState] = useState<CurrencyState>({
    isLoading: true,
    error: null,
  });

  const [ngnToUsd, setNgnToUsd] = useState<number>(FALLBACK_NGN_TO_USD);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const ratesResponse = await fetch(
          'https://api.exchangerate-api.com/v4/latest/NGN',
          { signal: AbortSignal.timeout(5000) }
        );

        if (ratesResponse.ok) {
          const ratesData = await ratesResponse.json();
          const usdRate = ratesData.rates?.USD;
          if (usdRate && typeof usdRate === 'number') {
            setNgnToUsd(usdRate);
            sessionStorage.setItem('ngn_to_usd', String(usdRate));
            sessionStorage.setItem('rate_timestamp', Date.now().toString());
          }
        }
      } catch (error) {
        console.warn('Using fallback NGN→USD rate:', error);
      }

      setState({ isLoading: false, error: null });
    };

    // Check for recent cached rate (< 1 hour old)
    const cachedRate = sessionStorage.getItem('ngn_to_usd');
    const cachedTimestamp = sessionStorage.getItem('rate_timestamp');

    if (
      cachedRate &&
      cachedTimestamp &&
      Date.now() - parseInt(cachedTimestamp) < 3600000
    ) {
      setNgnToUsd(parseFloat(cachedRate));
      setState({ isLoading: false, error: null });
    } else {
      fetchRate();
    }
  }, []);

  /**
   * Convert an amount from NGN to USD using the live (or fallback) rate.
   * Always displays in USD so the price stays in sync with the naira backend.
   */
  const convertFromNaira = useCallback((amountInNaira: number): string => {
    const converted = amountInNaira * ngnToUsd;
    return `$${Math.round(converted).toLocaleString('en-US')}`;
  }, [ngnToUsd]);

  return {
    ...state,
    convertFromNaira,
  };
};
