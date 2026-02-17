import type { Drive, Notification } from '../types';

export const sampleDrives: Drive[] = [
  {
    id: "1",
    companyName: "TechCorp Solutions",
    role: "Software Engineer",
    location: "Bangalore",
    ctc: "12-15 LPA",
    eligibility: "B.Tech CSE/IT, CGPA ≥ 7.0",
    deadline: "2025-02-15",
    description:
      "Full-stack development role with modern technologies including React, Node.js, and cloud platforms.",
    postedBy: "tpo1",
    postedAt: "2025-01-20",
    status: "approved",
    applicants: [],
  },
  {
    id: "2",
    companyName: "DataSoft Inc",
    role: "Data Analyst",
    location: "Mumbai",
    ctc: "8-10 LPA",
    eligibility: "Any Engineering, CGPA ≥ 6.5",
    deadline: "2025-02-20",
    description:
      "Data analysis and visualization role working with Python, SQL, and business intelligence tools.",
    postedBy: "tpo2",
    postedAt: "2025-01-22",
    status: "pending",
    applicants: [],
  },
  {
    id: "3",
    companyName: "InnovateTech",
    role: "Frontend Developer",
    location: "Hyderabad",
    ctc: "10-12 LPA",
    eligibility: "B.Tech CSE/IT, CGPA ≥ 6.8",
    deadline: "2025-02-28",
    description:
      "Frontend development role focusing on React, TypeScript, and modern UI/UX implementation.",
    postedBy: "tpo1",
    postedAt: "2025-01-25",
    status: "approved",
    applicants: [],
  },
  {
    id: "4",
    companyName: "CloudFirst Systems",
    role: "DevOps Engineer",
    location: "Pune",
    ctc: "14-18 LPA",
    eligibility: "B.Tech CSE/IT/ECE, CGPA ≥ 7.5",
    deadline: "2025-03-05",
    description:
      "DevOps role involving AWS, Docker, Kubernetes, and CI/CD pipeline management.",
    postedBy: "tpo2",
    postedAt: "2025-01-26",
    status: "approved",
    applicants: [],
  },
  {
    id: "5",
    companyName: "FinTech Innovations",
    role: "Business Analyst",
    location: "Chennai",
    ctc: "9-11 LPA",
    eligibility: "Any Engineering/MBA, CGPA ≥ 7.0",
    deadline: "2025-03-10",
    description:
      "Business analysis role in fintech domain with focus on digital banking solutions.",
    postedBy: "tpo1",
    postedAt: "2025-01-28",
    status: "approved",
    applicants: [],
  },
  {
    id: "6",
    companyName: "AI Dynamics",
    role: "Machine Learning Engineer",
    location: "Bangalore",
    ctc: "16-20 LPA",
    eligibility: "B.Tech CSE/IT, CGPA ≥ 8.0",
    deadline: "2025-03-15",
    description:
      "ML engineering role working on cutting-edge AI solutions and deep learning models.",
    postedBy: "tpo2",
    postedAt: "2025-01-30",
    status: "approved",
    applicants: [],
  },
];

export const sampleNotifications: Notification[] = [
  {
    id: '1',
    userId: 'student',
    type: 'drive_posted',
    title: 'New Job Drive Posted',
    message: 'TechCorp Solutions has posted a new Software Engineer position. Apply now!',
    isRead: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    metadata: { driveId: '1', companyName: 'TechCorp Solutions' }
  },
  {
    id: '2',
    userId: 'student',
    type: 'deadline_reminder',
    title: 'Application Deadline Approaching',
    message: 'DataSoft Inc application deadline is in 2 days. Don\'t miss out!',
    isRead: false,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    metadata: { driveId: '2', companyName: 'DataSoft Inc' }
  },
  {
    id: '3',
    userId: 'tpo',
    type: 'application_received',
    title: 'New Application Received',
    message: 'John Student has applied for the TechCorp Solutions drive.',
    isRead: true,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    metadata: { driveId: '1', studentName: 'John Student' }
  },
  {
    id: '4',
    userId: 'admin',
    type: 'drive_approved',
    title: 'Drive Approval Required',
    message: 'A new drive from InnovateTech requires your approval.',
    isRead: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    metadata: { driveId: '3', companyName: 'InnovateTech' }
  }
];