export type UserRole = "student" | "tpo" | "admin";

export interface NotificationPreferences {
  drivePosted: boolean;
  driveApproved: boolean;
  driveRejected: boolean;
  applicationReceived: boolean;
  applicationStatus: boolean;
  deadlineReminder: boolean;
  profileUpdate: boolean;
  systemUpdate: boolean;
  placementSuccess: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  college?: string;
  course?: string;
  batch?: string;
  studentProfile?: StudentProfileData;
  tpoProfile?: TPOProfileData;
  lastLoginAt?: string;
  notificationPreferences?: NotificationPreferences;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'drive_posted' | 'drive_approved' | 'drive_rejected' | 'application_received' | 'application_status' | 'deadline_reminder' | 'profile_update' | 'system_update' | 'placement_success';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  metadata?: {
    driveId?: string;
    companyName?: string;
    studentName?: string;
    applicationId?: string;
    [key: string]: any;
  };
}

export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: (userId: string) => void;
  clearNotification: (notificationId: string) => void;
  getUserNotifications: (userId: string) => Notification[];
}

export interface StudentProfileData {
  personalInfo: {
    phone?: string;
    address?: string;
    dateOfBirth?: string;
    linkedIn?: string;
    github?: string;
    portfolio?: string;
  };
  academic: {
    cgpa?: string;
    percentage?: string;
    specialization?: string;
    achievements?: string[];
  };
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
  };
  experience: {
    internships: Experience[];
    projects: Project[];
  };
  documents: {
    resume?: UploadedFile;
    transcript?: UploadedFile;
    certificates: UploadedFile[];
  };
}

export interface TPOProfileData {
  personalInfo: {
    phone?: string;
    alternatePhone?: string;
    address?: string;
    dateOfBirth?: string;
    linkedIn?: string;
    emergencyContact?: string;
  };
  professionalInfo: {
    designation?: string;
    department?: string;
    employeeId?: string;
    joiningDate?: string;
    experience?: string;
    qualifications?: string[];
    specializations?: string[];
  };
  collegeInfo: {
    collegeName?: string;
    collegeAddress?: string;
    collegeWebsite?: string;
    collegePhone?: string;
    collegeEmail?: string;
    establishedYear?: string;
    affiliation?: string;
  };
  placementStats: {
    totalStudentsPlaced?: string;
    averagePackage?: string;
    highestPackage?: string;
    placementPercentage?: string;
    topRecruiters?: string[];
    achievements?: string[];
  };
  companyRelations: {
    activePartnerships?: number;
    newPartnerships?: number;
    upcomingDrives?: number;
    successfulPlacements?: number;
  };
  documents: {
    idProof?: UploadedFile;
    authorizationLetter?: UploadedFile;
    collegeIdCard?: UploadedFile;
    certificates: UploadedFile[];
  };
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  technologies: string[];
  description: string;
  link?: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  url: string; // In real app, this would be a proper file URL
}

export interface Drive {
  id: string;
  companyName: string;
  role: string;
  location: string;
  ctc: string;
  eligibility: string;
  deadline: string;
  description: string;
  postedBy: string;
  postedAt: string;
  status: "pending" | "approved" | "rejected";
  applicants: string[];
}