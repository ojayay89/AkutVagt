import { ClickEvent } from '../types';

const STORAGE_KEY = 'craftsmen_click_events';

export const trackClick = (craftsmanId: string, type: 'phone' | 'website') => {
  const event: ClickEvent = {
    craftsmanId,
    type,
    timestamp: Date.now()
  };

  const existingEvents = getClickEvents();
  existingEvents.push(event);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existingEvents));
};

export const getClickEvents = (): ClickEvent[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getClickStats = (craftsmanId: string) => {
  const events = getClickEvents();
  const craftsmanEvents = events.filter(e => e.craftsmanId === craftsmanId);
  
  return {
    phoneClicks: craftsmanEvents.filter(e => e.type === 'phone').length,
    websiteClicks: craftsmanEvents.filter(e => e.type === 'website').length,
    total: craftsmanEvents.length
  };
};

// Track page view to backend
export const trackPageView = async () => {
  try {
    const { projectId, publicAnonKey } = await import('./supabase/info');
    const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-27acf415`;
    
    await fetch(`${API_URL}/page-view`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

// Track category click to backend
export const trackCategoryClick = async (category: string) => {
  try {
    const { projectId, publicAnonKey } = await import('./supabase/info');
    const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-27acf415`;
    
    await fetch(`${API_URL}/category-click`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ category })
    });
  } catch (error) {
    console.error('Error tracking category click:', error);
  }
};