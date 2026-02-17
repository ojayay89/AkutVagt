export interface Craftsman {
  id: string;
  companyName: string;
  address: string;
  phone: string;
  hourlyRate?: number;
  website?: string;
  category: string;
}

export interface ClickEvent {
  craftsmanId: string;
  type: 'phone' | 'website';
  timestamp: number;
}
