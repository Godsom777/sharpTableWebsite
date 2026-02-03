import { useState, useEffect, useCallback } from 'react';

interface CurrencyState {
  currencyCode: string;
  symbol: string;
  isLoading: boolean;
  error: string | null;
}

interface ExchangeRates {
  [key: string]: number;
}

// Base prices in Naira (NGN) - THE SOURCE OF TRUTH
// All other currencies convert FROM these Naira amounts
export const BASE_PRICES_NGN = {
  'pro-monthly': 99_999, // ₦99,999/month
  'pro-yearly': 1_000_000, // ₦1,000,000/year
  'enterprise-monthly': 199_999, // ₦199,999/month
  'enterprise-yearly': 2_000_000, // ₦2,000,000/year
};

// Currency symbols map
const CURRENCY_SYMBOLS: Record<string, string> = {
  NGN: '₦',
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'C$',
  AUD: 'A$',
  ZAR: 'R',
  GHS: '₵',
  KES: 'KSh',
  EGP: 'E£',
  MAD: 'DH',
  XOF: 'CFA',
  XAF: 'FCFA',
};

// Country to currency mapping for common countries
const COUNTRY_TO_CURRENCY: Record<string, string> = {
  // Africa - NGN
  NG: 'NGN',
  // Africa - Other currencies
  ZA: 'ZAR',
  GH: 'GHS',
  KE: 'KES',
  EG: 'EGP',
  MA: 'MAD',
  // West Africa CFA
  BJ: 'XOF', BF: 'XOF', CI: 'XOF', GW: 'XOF', ML: 'XOF', NE: 'XOF', SN: 'XOF', TG: 'XOF',
  // Central Africa CFA
  CM: 'XAF', CF: 'XAF', TD: 'XAF', CG: 'XAF', GQ: 'XAF', GA: 'XAF',
  // Americas
  US: 'USD',
  CA: 'CAD',
  // Europe
  GB: 'GBP',
  DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR', BE: 'EUR', AT: 'EUR', PT: 'EUR', IE: 'EUR', FI: 'EUR',
  // Oceania
  AU: 'AUD',
  NZ: 'NZD',
};

// Fallback exchange rates (NGN to other currencies) - Updated Feb 2026
// These are used if the API fails
const FALLBACK_RATES: ExchangeRates = {
  NGN: 1,
  USD: 1 / 1550, // 1 NGN = 0.000645 USD (approx ₦1,550 = $1)
  EUR: 1 / 1680,
  GBP: 1 / 1950,
  CAD: 1 / 1100,
  AUD: 1 / 980,
  ZAR: 1 / 82,
  GHS: 1 / 95,
  KES: 1 / 9.5,
  EGP: 1 / 31,
  MAD: 1 / 150,
  XOF: 1 / 2.55,
  XAF: 1 / 2.55,
};

export const useCurrency = () => {
  const [state, setState] = useState<CurrencyState>({
    currencyCode: 'NGN',
    symbol: '₦',
    isLoading: true,
    error: null,
  });

  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>(FALLBACK_RATES);

  useEffect(() => {
    const initializeCurrency = async () => {
      try {
        // Step 1: Detect user's country and currency
        const geoResponse = await fetch('https://ipapi.co/json/', {
          signal: AbortSignal.timeout(5000),
        });

        let countryCode = 'NG'; // Default to Nigeria
        let detectedCurrency = 'NGN';

        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          countryCode = geoData.country_code?.toUpperCase() || 'NG';
          // Use country's currency or default to USD for unknown countries
          detectedCurrency = COUNTRY_TO_CURRENCY[countryCode] || 'USD';
        }

        // Step 2: Fetch live exchange rates from NGN
        let rates = FALLBACK_RATES;
        try {
          // Using exchangerate-api.com (free tier: 1500 requests/month)
          const ratesResponse = await fetch(
            'https://api.exchangerate-api.com/v4/latest/NGN',
            { signal: AbortSignal.timeout(5000) }
          );

          if (ratesResponse.ok) {
            const ratesData = await ratesResponse.json();
            // The API returns rates as "how many of X currency = 1 NGN"
            rates = {
              NGN: 1,
              ...ratesData.rates,
            };
          }
        } catch (rateError) {
          console.warn('Using fallback exchange rates:', rateError);
        }

        setExchangeRates(rates);

        const symbol = CURRENCY_SYMBOLS[detectedCurrency] || detectedCurrency;

        setState({
          currencyCode: detectedCurrency,
          symbol,
          isLoading: false,
          error: null,
        });

        // Cache for session
        sessionStorage.setItem('user_currency_code', detectedCurrency);
        sessionStorage.setItem('user_currency_symbol', symbol);
        sessionStorage.setItem('exchange_rates', JSON.stringify(rates));
        sessionStorage.setItem('rates_timestamp', Date.now().toString());

      } catch (error) {
        console.error('Currency initialization failed:', error);
        
        // Try to use cached values
        const cachedCode = sessionStorage.getItem('user_currency_code');
        const cachedSymbol = sessionStorage.getItem('user_currency_symbol');
        const cachedRates = sessionStorage.getItem('exchange_rates');

        if (cachedCode && cachedSymbol) {
          setState({
            currencyCode: cachedCode,
            symbol: cachedSymbol,
            isLoading: false,
            error: null,
          });
          if (cachedRates) {
            setExchangeRates(JSON.parse(cachedRates));
          }
        } else {
          // Final fallback - show NGN
          setState({
            currencyCode: 'NGN',
            symbol: '₦',
            isLoading: false,
            error: 'Could not detect currency',
          });
        }
      }
    };

    // Check for recent cached data first (< 1 hour old)
    const cachedTimestamp = sessionStorage.getItem('rates_timestamp');
    const cachedCode = sessionStorage.getItem('user_currency_code');
    const cachedSymbol = sessionStorage.getItem('user_currency_symbol');
    const cachedRates = sessionStorage.getItem('exchange_rates');

    if (
      cachedTimestamp &&
      cachedCode &&
      cachedSymbol &&
      cachedRates &&
      Date.now() - parseInt(cachedTimestamp) < 3600000 // 1 hour
    ) {
      setState({
        currencyCode: cachedCode,
        symbol: cachedSymbol,
        isLoading: false,
        error: null,
      });
      setExchangeRates(JSON.parse(cachedRates));
    } else {
      initializeCurrency();
    }
  }, []);

  /**
   * Convert an amount from NGN to the user's local currency
   * @param amountInNaira - The amount in Nigerian Naira
   * @returns Formatted price string with currency symbol
   */
  const convertFromNaira = useCallback((amountInNaira: number): string => {
    const { currencyCode, symbol } = state;

    // If showing in Naira, just format with commas
    if (currencyCode === 'NGN') {
      return `${symbol}${amountInNaira.toLocaleString('en-NG')}`;
    }

    // Get the exchange rate for target currency
    const rate = exchangeRates[currencyCode];
    
    if (!rate) {
      // If no rate available, show in NGN
      return `₦${amountInNaira.toLocaleString('en-NG')}`;
    }

    // Convert: NGN amount × rate = target currency amount
    const convertedAmount = amountInNaira * rate;

    // Format based on currency
    if (['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(currencyCode)) {
      // Round to nearest whole number for major currencies
      return `${symbol}${Math.round(convertedAmount).toLocaleString('en-US')}`;
    } else {
      // Keep some precision for other currencies
      return `${symbol}${convertedAmount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    }
  }, [state, exchangeRates]);

  return {
    ...state,
    convertFromNaira,
    exchangeRates,
  };
};
