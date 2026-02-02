import { useState, useEffect } from 'react';

// List of African country codes
const AFRICAN_COUNTRIES = [
  'AO', 'BF', 'BI', 'BJ', 'BW', 'CD', 'CF', 'CG', 'CI', 'CM', 'CV', 'DJ', 'DZ',
  'EG', 'EH', 'ER', 'ET', 'GA', 'GH', 'GM', 'GN', 'GQ', 'GW', 'KE', 'KM', 'LR',
  'LS', 'LY', 'MA', 'MG', 'ML', 'MR', 'MU', 'MW', 'MZ', 'NA', 'NE', 'NG', 'RE',
  'RW', 'SC', 'SD', 'SL', 'SN', 'SO', 'SS', 'ST', 'SZ', 'TD', 'TG', 'TN', 'TZ',
  'UG', 'YT', 'ZA', 'ZM', 'ZW'
];

interface GeoLocationState {
  isAfrica: boolean;
  isLoading: boolean;
  countryCode: string | null;
}

export const useGeoLocation = (): GeoLocationState => {
  const [state, setState] = useState<GeoLocationState>({
    isAfrica: true, // Default to Africa (your primary market)
    isLoading: true,
    countryCode: null,
  });

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Use a free geo-location API
        const response = await fetch('https://ipapi.co/json/', {
          signal: AbortSignal.timeout(5000), // 5 second timeout
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch location');
        }
        
        const data = await response.json();
        const countryCode = data.country_code?.toUpperCase() || null;
        const isAfrica = countryCode ? AFRICAN_COUNTRIES.includes(countryCode) : true;
        
        setState({
          isAfrica,
          isLoading: false,
          countryCode,
        });
        
        // Cache the result in sessionStorage
        if (countryCode) {
          sessionStorage.setItem('geo_country_code', countryCode);
          sessionStorage.setItem('geo_is_africa', String(isAfrica));
        }
      } catch (error) {
        // On error, check sessionStorage first, then default to Africa
        const cachedCountryCode = sessionStorage.getItem('geo_country_code');
        const cachedIsAfrica = sessionStorage.getItem('geo_is_africa');
        
        setState({
          isAfrica: cachedIsAfrica ? cachedIsAfrica === 'true' : true,
          isLoading: false,
          countryCode: cachedCountryCode,
        });
      }
    };

    // Check sessionStorage first for cached result
    const cachedCountryCode = sessionStorage.getItem('geo_country_code');
    const cachedIsAfrica = sessionStorage.getItem('geo_is_africa');
    
    if (cachedCountryCode && cachedIsAfrica !== null) {
      setState({
        isAfrica: cachedIsAfrica === 'true',
        isLoading: false,
        countryCode: cachedCountryCode,
      });
    } else {
      detectLocation();
    }
  }, []);

  return state;
};
