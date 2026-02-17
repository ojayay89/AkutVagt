import React, { createContext, useContext, useState } from 'react';
import { toast } from "sonner@2.0.3";
import type { Notification, NotificationContextType } from '../types';
import { sampleNotifications } from '../data/sampleData';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications);

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast notification with reduced duration
    toast.success(notification.title, {
      description: notification.message,
      duration: 3000, // Reduced from 4000ms
    });
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isRead: true }
          : notif
      )
    );
  };

  const markAllAsRead = (userId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.userId === userId 
          ? { ...notif, isRead: true }
          : notif
      )
    );
  };

  const clearNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  const getUserNotifications = (userId: string) => {
    return notifications.filter(notif => notif.userId === userId);
  };

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearNotification,
      getUserNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
}