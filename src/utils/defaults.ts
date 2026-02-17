import type { NotificationPreferences } from '../types';

export const defaultNotificationPreferences: NotificationPreferences = {
  drivePosted: true,
  driveApproved: true,
  driveRejected: true,
  applicationReceived: true,
  applicationStatus: true,
  deadlineReminder: true,
  profileUpdate: false,
  systemUpdate: true,
  placementSuccess: true,
  emailNotifications: true,
  pushNotifications: true,
};

export const createUserWithDefaults = (userData: any) => ({
  ...userData,
  lastLoginAt: new Date().toISOString(),
  notificationPreferences: defaultNotificationPreferences
});

export const simulateAsyncOperation = (delay: number = 500) => 
  new Promise(resolve => setTimeout(resolve, delay));

export const cleanupBlobUrls = () => {
  // Clear any cached data or temporary files
  // In a real app, you might also:
  // - Clear localStorage/sessionStorage
  // - Revoke authentication tokens
  // - Clear any uploaded file URLs
  // - Reset application state
  
  // For demo purposes, we'll also reset any temporary file URLs
  // that might have been created for document uploads
  if (typeof window !== 'undefined' && window.URL) {
    // This would clean up any blob URLs created during the session
    // In production, you'd want to be more specific about which URLs to revoke
  }
};