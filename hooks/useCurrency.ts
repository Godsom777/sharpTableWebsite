import { useState, useEffect } from 'react';
import { dinero, toDecimal } from 'dinero.js';
import { USD, NGN } from '@dinero.js/currencies';

interface CurrencyState {
  currency: string;
  symbol: string;
  isLoading: boolean;
}

interface ConversionRates {
  [key: string]: number;
}

// Base prices in Naira (NGN) - THE SOURCE OF TRUTH
export const BASE_PRICES_NGN = {
  'pro-monthly': 99_999, // ₦99,999/month
  'pro-yearly': 1_000_000, // ₦1,000,000/year
  'enterprise-monthly': 199_999, // ₦199,999/month
  'enterprise-yearly': 2_000_000, // ₦2,000,000/year
};

export const useCurrency = (): CurrencyState & {
  convertFromNaira: (amountInNaira: number) => string;
} => {
  const [state, setState] = useState<CurrencyState>({
    currency: 'NGN',
    symbol: '₦',
    isLoading: true,
  });

  const [exchangeRates, setExchangeRates] = useState<ConversionRates>({
    NGN: 1,
    USD: 0.00069, // 1 NGN = ~0.00069 USD (1450 NGN = 1 USD)
  });

  useEffect(() => {
    const detectCurrencyAndRates = async () => {
      try {
        // Get user's location
        const geoResponse = await fetch('https://ipapi.co/json/', {
          signal: AbortSignal.timeout(5000),
        });

        if (!geoResponse.ok) {
          throw new Error('Failed to fetch location');
        }

        const geoData = await geoResponse.json();
        const countryCode = geoData.country_code?.toUpperCase();

        // Determine currency based on country
        let currency = 'NGN';
        let symbol = '₦';

        // Use USD for non-African countries
        const africanCountries = [
          'AO', 'BF', 'BI', 'BJ', 'BW', 'CD', 'CF', 'CG', 'CI', 'CM', 'CV', 'DJ', 'DZ',
          'EG', 'EH', 'ER', 'ET', 'GA', 'GH', 'GM', 'GN', 'GQ', 'GW', 'KE', 'KM', 'LR',
          'LS', 'LY', 'MA', 'MG', 'ML', 'MR', 'MU', 'MW', 'MZ', 'NA', 'NE', 'NG', 'RE',
          'RW', 'SC', 'SD', 'SL', 'SN', 'SO', 'SS', 'ST', 'SZ', 'TD', 'TG', 'TN', 'TZ',
          'UG', 'YT', 'ZA', 'ZM', 'ZW'
        ];

        if (!africanCountries.includes(countryCode)) {
          currency = 'USD';
          symbol = '$';
        }

        // Fetch live exchange rates from a free API
        try {
          const ratesResponse = await fetch(
            'https://api.exchangerate-api.com/v4/latest/NGN',
            { signal: AbortSignal.timeout(5000) }
          );

          if (ratesResponse.ok) {
            const ratesData = await ratesResponse.json();
            setExchangeRates({
              NGN: 1,
              USD: ratesData.rates.USD || 0.00069,
            });
          }
        } catch (rateError) {
          console.warn('Failed to fetch live rates, using fallback', rateError);
          // Use fallback rates
        }

        setState({
          currency,
          symbol,
          isLoading: false,
        });

        // Cache in sessionStorage
        sessionStorage.setItem('user_currency', currency);
        sessionStorage.setItem('user_currency_symbol', symbol);
      } catch (error) {
        console.warn('Currency detection failed, using cache or default', error);

        // Check cache
        const cachedCurrency = sessionStorage.getItem('user_currency');
        const cachedSymbol = sessionStorage.getItem('user_currency_symbol');

        setState({
          currency: cachedCurrency || 'NGN',
          symbol: cachedSymbol || '₦',
          isLoading: false,
        });
      }
    };

    // Check cache first
    const cachedCurrency = sessionStorage.getItem('user_currency');
    const cachedSymbol = sessionStorage.getItem('user_currency_symbol');

    if (cachedCurrency && cachedSymbol) {
      setState({
        currency: cachedCurrency,
        symbol: cachedSymbol,
        isLoading: false,
      });
    } else {
      detectCurrencyAndRates();
    }
  }, []);

  const convertFromNaira = (amountInNaira: number): string => {
    if (state.currency === 'NGN') {
      // Format Naira with commas
      return `${state.symbol}${amountInNaira.toLocaleString('en-NG')}`;
    }

    // Convert to target currency
    const rate = exchangeRates[state.currency] || exchangeRates.USD;
    const convertedAmount = amountInNaira * rate;

    // Round to nearest dollar for USD
    const rounded = Math.round(convertedAmount);

    return `${state.symbol}${rounded.toLocaleString('en-US')}`;
  };

  return {
    ...state,
    convertFromNaira,
  };
};
