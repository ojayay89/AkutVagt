import React, { useEffect } from 'react';
import { useNotifications } from '../contexts/NotificationContext';
import type { User, UserRole } from '../types';

interface NotificationDemoProps {
  user: User;
}

export function NotificationDemo({ user }: NotificationDemoProps) {
  const { addNotification } = useNotifications();

  useEffect(() => {
    const generateRoleSpecificNotifications = () => {
      const notifications = getNotificationsForRole(user.role, user.id);
      
      // Simulate real-time notifications with longer intervals to prevent overlap
      notifications.forEach((notification, index) => {
        setTimeout(() => {
          addNotification(notification);
        }, (index + 1) * 120000); // 2 minutes between notifications (reduced frequency)
      });
    };

    // Generate initial notification after 30 seconds (longer delay)
    const timer = setTimeout(() => {
      generateRoleSpecificNotifications();
    }, 30000);

    return () => clearTimeout(timer);
  }, [user.role, user.id, addNotification]);

  const getNotificationsForRole = (role: UserRole, userId: string) => {
    switch (role) {
      case 'student':
        return [
          {
            userId,
            type: 'drive_posted' as const,
            title: 'New Job Opportunity',
            message: 'Microsoft has posted a Software Development Engineer position. Deadline: March 20th.',
            isRead: false,
            metadata: { companyName: 'Microsoft', driveId: 'ms-001' }
          },
          {
            userId,
            type: 'deadline_reminder' as const,
            title: 'Application Deadline Reminder',
            message: 'Only 2 days left to apply for Google Summer Internship. Apply now!',
            isRead: false,
            metadata: { companyName: 'Google', driveId: 'google-001' }
          },
          {
            userId,
            type: 'application_status' as const,
            title: 'Application Status Update',
            message: 'Your application for Amazon SDE role has been shortlisted for the next round.',
            isRead: false,
            metadata: { companyName: 'Amazon', driveId: 'amazon-001' }
          }
        ];

      case 'tpo':
        return [
          {
            userId,
            type: 'application_received' as const,
            title: 'New Student Application',
            message: '5 new applications received for the TCS placement drive.',
            isRead: false,
            metadata: { companyName: 'TCS', applicantCount: 5 }
          },
          {
            userId,
            type: 'drive_approved' as const,
            title: 'Drive Approved',
            message: 'Your Infosys placement drive has been approved by the admin.',
            isRead: false,
            metadata: { companyName: 'Infosys', driveId: 'infosys-001' }
          },
          {
            userId,
            type: 'placement_success' as const,
            title: 'Placement Success',
            message: '3 students successfully placed at Wipro. Congratulations!',
            isRead: false,
            metadata: { companyName: 'Wipro', placedCount: 3 }
          }
        ];

      case 'admin':
        return [
          {
            userId,
            type: 'drive_posted' as const,
            title: 'New Drive Submission',
            message: 'TPO has submitted a new placement drive for Cognizant. Requires approval.',
            isRead: false,
            metadata: { companyName: 'Cognizant', tpoName: 'Dr. Smith' }
          },
          {
            userId,
            type: 'system_update' as const,
            title: 'System Statistics',
            message: 'Weekly report: 45 new applications, 12 successful placements this week.',
            isRead: false,
            metadata: { newApplications: 45, placements: 12 }
          },
          {
            userId,
            type: 'profile_update' as const,
            title: 'Profile Updates Required',
            message: '8 TPO profiles are pending verification and approval.',
            isRead: false,
            metadata: { pendingProfiles: 8 }
          }
        ];

      default:
        return [];
    }
  };

  // This component doesn't render anything visible
  return null;
}