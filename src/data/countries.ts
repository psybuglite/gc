export type Country = { code: string; name: string; dial: string }

/** Curated list (ISO 3166-1 alpha-2 code, name, calling code). Flags are derived from the code. */
const RAW: Country[] = [
  { code: 'NG', name: 'Nigeria', dial: '+234' },
  { code: 'GH', name: 'Ghana', dial: '+233' },
  { code: 'KE', name: 'Kenya', dial: '+254' },
  { code: 'ZA', name: 'South Africa', dial: '+27' },
  { code: 'EG', name: 'Egypt', dial: '+20' },
  { code: 'MA', name: 'Morocco', dial: '+212' },
  { code: 'SN', name: 'Senegal', dial: '+221' },
  { code: 'CI', name: 'Côte d’Ivoire', dial: '+225' },
  { code: 'CM', name: 'Cameroon', dial: '+237' },
  { code: 'TZ', name: 'Tanzania', dial: '+255' },
  { code: 'UG', name: 'Uganda', dial: '+256' },
  { code: 'ET', name: 'Ethiopia', dial: '+251' },
  { code: 'RW', name: 'Rwanda', dial: '+250' },
  { code: 'GB', name: 'United Kingdom', dial: '+44' },
  { code: 'IE', name: 'Ireland', dial: '+353' },
  { code: 'US', name: 'United States', dial: '+1' },
  { code: 'CA', name: 'Canada', dial: '+1' },
  { code: 'FR', name: 'France', dial: '+33' },
  { code: 'DE', name: 'Germany', dial: '+49' },
  { code: 'ES', name: 'Spain', dial: '+34' },
  { code: 'IT', name: 'Italy', dial: '+39' },
  { code: 'NL', name: 'Netherlands', dial: '+31' },
  { code: 'PT', name: 'Portugal', dial: '+351' },
  { code: 'BE', name: 'Belgium', dial: '+32' },
  { code: 'CH', name: 'Switzerland', dial: '+41' },
  { code: 'SE', name: 'Sweden', dial: '+46' },
  { code: 'AE', name: 'United Arab Emirates', dial: '+971' },
  { code: 'SA', name: 'Saudi Arabia', dial: '+966' },
  { code: 'TR', name: 'Türkiye', dial: '+90' },
  { code: 'IN', name: 'India', dial: '+91' },
  { code: 'PK', name: 'Pakistan', dial: '+92' },
  { code: 'CN', name: 'China', dial: '+86' },
  { code: 'JP', name: 'Japan', dial: '+81' },
  { code: 'KR', name: 'South Korea', dial: '+82' },
  { code: 'SG', name: 'Singapore', dial: '+65' },
  { code: 'AU', name: 'Australia', dial: '+61' },
  { code: 'NZ', name: 'New Zealand', dial: '+64' },
  { code: 'BR', name: 'Brazil', dial: '+55' },
  { code: 'MX', name: 'Mexico', dial: '+52' },
  { code: 'AR', name: 'Argentina', dial: '+54' },
  { code: 'JM', name: 'Jamaica', dial: '+1876' },
]

const FIRST = ['NG', 'GH', 'KE', 'ZA', 'GB', 'US', 'CA', 'FR']
const rank = (c: Country) => (FIRST.includes(c.code) ? FIRST.indexOf(c.code) : FIRST.length)
export const COUNTRIES: Country[] = [...RAW].sort((a, b) => rank(a) - rank(b))

export const flagEmoji = (code: string) =>
  String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65))

export const findCountry = (code: string) => COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0]
