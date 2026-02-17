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
