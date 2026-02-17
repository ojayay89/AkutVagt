import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Bell,
  BellRing,
  Check,
  X,
  Briefcase,
  UserCheck,
  AlertCircle,
  TrendingUp,
  FileText,
  Settings,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';
import type { Notification, User } from '../types';

interface NotificationPanelProps {
  user: User;
}

export function NotificationPanel({ user }: NotificationPanelProps) {
  const { getUserNotifications, markAsRead, markAllAsRead, clearNotification } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const userNotifications = getUserNotifications(user.id);
  const unreadUserNotifications = userNotifications.filter(n => !n.isRead);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'drive_posted':
        return <Briefcase className="h-4 w-4 text-blue-600" />;
      case 'drive_approved':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'drive_rejected':
        return <X className="h-4 w-4 text-red-600" />;
      case 'application_received':
        return <UserCheck className="h-4 w-4 text-purple-600" />;
      case 'application_status':
        return <FileText className="h-4 w-4 text-orange-600" />;
      case 'deadline_reminder':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'profile_update':
        return <Settings className="h-4 w-4 text-gray-600" />;
      case 'system_update':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      case 'placement_success':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'drive_posted':
        return 'bg-blue-50 border-blue-200';
      case 'drive_approved':
        return 'bg-green-50 border-green-200';
      case 'drive_rejected':
        return 'bg-red-50 border-red-200';
      case 'application_received':
        return 'bg-purple-50 border-purple-200';
      case 'application_status':
        return 'bg-orange-50 border-orange-200';
      case 'deadline_reminder':
        return 'bg-yellow-50 border-yellow-200';
      case 'profile_update':
        return 'bg-gray-50 border-gray-200';
      case 'system_update':
        return 'bg-blue-50 border-blue-200';
      case 'placement_success':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleMarkAsRead = (notificationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    markAsRead(notificationId);
  };

  const handleClearNotification = (notificationId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    clearNotification(notificationId);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead(user.id);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative h-10 w-10 rounded-full hover:bg-muted/50"
        >
          {unreadUserNotifications.length > 0 ? (
            <BellRing className="h-5 w-5" />
          ) : (
            <Bell className="h-5 w-5" />
          )}
          {unreadUserNotifications.length > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadUserNotifications.length > 9 ? '9+' : unreadUserNotifications.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-96 p-0" 
        align="end" 
        forceMount
        side="bottom"
        sideOffset={8}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Notifications</h3>
            {unreadUserNotifications.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {unreadUserNotifications.length} new
              </Badge>
            )}
          </div>
          {unreadUserNotifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="text-xs h-auto p-2"
            >
              Mark all read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <ScrollArea className="max-h-96">
          {userNotifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-sm text-muted-foreground">No notifications yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                We'll notify you when something important happens
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {userNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer group ${
                    !notification.isRead ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className={`text-sm ${!notification.isRead ? 'font-semibold' : 'font-medium'}`}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-muted-foreground">
                              {formatTimeAgo(notification.createdAt)}
                            </span>
                            {!notification.isRead && (
                              <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => handleMarkAsRead(notification.id, e)}
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleClearNotification(notification.id, e)}
                            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        {userNotifications.length > 0 && (
          <>
            <Separator />
            <div className="p-3">
              <Button 
                variant="ghost" 
                className="w-full justify-center text-sm h-8"
                onClick={() => setIsOpen(false)}
              >
                View all notifications
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}