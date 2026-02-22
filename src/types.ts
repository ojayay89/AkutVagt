export interface Craftsman {
  id: string;
  companyName: string;
  address: string;
  phone: string;
  hourlyRate?: number;
  website?: string;
  category: string;
  subcategory?: string;  // For "Andet akut" - e.g. "Skadedyrsbekæmpelse", "Autohjælp", "Sikkerhedsvagt"
  lat?: number;  // Latitude for distance calculation
  lon?: number;  // Longitude for distance calculation
  distance?: number;  // Calculated distance from user (in km)
}

export interface ClickEvent {
  craftsmanId: string;
  type: 'phone' | 'website';
  timestamp: number;
}

export interface PageView {
  id: string;
  timestamp: string;
}

export interface CategoryClick {
  id: string;
  category: string;
  timestamp: string;
}