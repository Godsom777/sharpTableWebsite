import { useEffect, useState } from 'react';

const AFRICAN_COUNTRIES = [
  'AO', 'BF', 'BI', 'BJ', 'BW', 'CD', 'CF', 'CG', 'CI', 'CM', 'CV', 'DJ', 'DZ',
  'EG', 'EH', 'ER', 'ET', 'GA', 'GH', 'GM', 'GN', 'GQ', 'GW', 'KE', 'KM', 'LR',
  'LS', 'LY', 'MA', 'MG', 'ML', 'MR', 'MU', 'MW', 'MZ', 'NA', 'NE', 'NG', 'RE',
  'RW', 'SC', 'SD', 'SL', 'SN', 'SO', 'SS', 'ST', 'SZ', 'TD', 'TG', 'TN', 'TZ',
  'UG', 'YT', 'ZA', 'ZM', 'ZW',
];

const TIMEZONE_TO_COUNTRY: Record<string, string> = {
  'Africa/Lagos': 'NG',
  'Africa/Accra': 'GH',
  'Africa/Nairobi': 'KE',
  'Africa/Johannesburg': 'ZA',
  'Africa/Cairo': 'EG',
  'Africa/Casablanca': 'MA',
  'Africa/Tunis': 'TN',
  'Africa/Algiers': 'DZ',
  'Africa/Kampala': 'UG',
  'Africa/Kigali': 'RW',
  'Africa/Lusaka': 'ZM',
  'Africa/Harare': 'ZW',
};

interface GeoLocationState {
  isAfrica: boolean;
  isLoading: boolean;
  countryCode: string | null;
}

function getRegionFromLocale(locale: string): string | null {
  const parts = locale.split(/[-_]/);
  const region = parts.length > 1 ? parts[parts.length - 1]?.toUpperCase() : null;
  return region && /^[A-Z]{2}$/.test(region) ? region : null;
}

function detectCountryCode(): string | null {
  const localeCandidates = [
    ...(navigator.languages || []),
    navigator.language,
    (Intl.DateTimeFormat().resolvedOptions().locale || ''),
  ].filter(Boolean);

  for (const locale of localeCandidates) {
    const region = getRegionFromLocale(locale);
    if (region) {
      return region;
    }
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return timeZone ? TIMEZONE_TO_COUNTRY[timeZone] || null : null;
}

export const useGeoLocation = (): GeoLocationState => {
  const [state, setState] = useState<GeoLocationState>({
    isAfrica: true,
    isLoading: true,
    countryCode: null,
  });

  useEffect(() => {
    const cachedCountryCode = sessionStorage.getItem('geo_country_code');
    const cachedIsAfrica = sessionStorage.getItem('geo_is_africa');

    if (cachedCountryCode && cachedIsAfrica !== null) {
      setState({
        isAfrica: cachedIsAfrica === 'true',
        isLoading: false,
        countryCode: cachedCountryCode,
      });
      return;
    }

    const countryCode = detectCountryCode();
    const isAfrica = countryCode ? AFRICAN_COUNTRIES.includes(countryCode) : true;

    setState({
      isAfrica,
      isLoading: false,
      countryCode,
    });

    if (countryCode) {
      sessionStorage.setItem('geo_country_code', countryCode);
      sessionStorage.setItem('geo_is_africa', String(isAfrica));
    }
  }, []);

  return state;
};
