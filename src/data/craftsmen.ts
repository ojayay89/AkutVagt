import { Craftsman } from '../types';

export const craftsmen: Craftsman[] = [
  {
    id: '1',
    companyName: 'Akut VVS Service ApS',
    address: 'Hovedgaden 123, 2100 København Ø',
    phone: '+45 12 34 56 78',
    hourlyRate: 850,
    website: 'https://www.akutvvs.dk',
    category: 'VVS',
    lat: 55.7018,
    lon: 12.5839
  },
  {
    id: '2',
    companyName: 'Elektrikeren 24/7',
    address: 'Nørregade 45, 8000 Aarhus C',
    phone: '+45 23 45 67 89',
    hourlyRate: 950,
    website: 'https://www.elektrikeren247.dk',
    category: 'Elektriker',
    lat: 56.1572,
    lon: 10.2107
  },
  {
    id: '3',
    companyName: 'Nødblik & Vindue',
    address: 'Vesterbrogade 78, 1620 København V',
    phone: '+45 34 56 78 90',
    hourlyRate: 750,
    website: 'https://www.noedblik.dk',
    category: 'Glarmester',
    lat: 55.6738,
    lon: 12.5534
  },
  {
    id: '4',
    companyName: 'Akut Låsesmed Service',
    address: 'Åboulevarden 12, 8000 Aarhus C',
    phone: '+45 45 67 89 01',
    hourlyRate: 900,
    website: 'https://www.akutlaasesmed.dk',
    category: 'Låsesmed',
    lat: 56.1496,
    lon: 10.2134
  },
  {
    id: '5',
    companyName: 'Tag & Tætning SOS',
    address: 'Roskildevej 234, 2630 Taastrup',
    phone: '+45 56 78 90 12',
    hourlyRate: 800,
    category: 'Andet akut',
    subcategory: 'Tag & facade',
    lat: 55.6509,
    lon: 12.2986
  },
  {
    id: '6',
    companyName: 'Varme Nu ApS',
    address: 'Fynsgade 56, 5000 Odense C',
    phone: '+45 67 89 01 23',
    hourlyRate: 875,
    website: 'https://www.varmenu.dk',
    category: 'VVS',
    lat: 55.3959,
    lon: 10.3883
  },
  {
    id: '7',
    companyName: 'Skadedyr Stop 24/7',
    address: 'Vestergade 89, 2100 København Ø',
    phone: '+45 78 90 12 34',
    hourlyRate: 950,
    category: 'Andet akut',
    subcategory: 'Skadedyrsbekæmpelse',
    lat: 55.7074,
    lon: 12.5805
  }
];