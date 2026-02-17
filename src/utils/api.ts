import { Craftsman } from '../types';
import { projectId, publicAnonKey } from './supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-27acf415`;

const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const api = {
  // Get all craftsmen
  getCraftsmen: async (): Promise<Craftsman[]> => {
    const result = await fetchAPI('/craftsmen');
    return result.data;
  },

  // Get single craftsman
  getCraftsman: async (id: string): Promise<Craftsman> => {
    const result = await fetchAPI(`/craftsmen/${id}`);
    return result.data;
  },

  // Create craftsman
  createCraftsman: async (craftsman: Omit<Craftsman, 'id'>): Promise<Craftsman> => {
    const result = await fetchAPI('/craftsmen', {
      method: 'POST',
      body: JSON.stringify(craftsman),
    });
    return result.data;
  },

  // Update craftsman
  updateCraftsman: async (id: string, craftsman: Partial<Craftsman>): Promise<Craftsman> => {
    const result = await fetchAPI(`/craftsmen/${id}`, {
      method: 'PUT',
      body: JSON.stringify(craftsman),
    });
    return result.data;
  },

  // Delete craftsman
  deleteCraftsman: async (id: string): Promise<void> => {
    await fetchAPI(`/craftsmen/${id}`, {
      method: 'DELETE',
    });
  },

  // Track click
  trackClick: async (craftsmanId: string, type: 'phone' | 'website'): Promise<void> => {
    await fetchAPI('/clicks', {
      method: 'POST',
      body: JSON.stringify({ craftsmanId, type }),
    });
  },

  // Get stats
  getStats: async (craftsmanId: string) => {
    const result = await fetchAPI(`/stats/${craftsmanId}`);
    return result.data;
  },

  // Initialize database with sample data
  initDatabase: async () => {
    const result = await fetchAPI('/init', {
      method: 'POST',
    });
    return result;
  },
};
