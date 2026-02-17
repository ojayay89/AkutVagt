import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Switch } from './ui/switch';
import { 
  User, 
  FileText, 
  Upload, 
  Download, 
  Trash2, 
  Plus, 
  Minus,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Building2,
  Award,
  Briefcase,
  TrendingUp,
  Users,
  Globe,
  Linkedin,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  Target,
  BarChart3,
  UserCheck,
  Building,
  Settings,
  Bell,
  Shield,
  LogOut,
  AlertTriangle
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import type { User as UserType, TPOProfileData, UploadedFile, NotificationPreferences } from '../types';

interface TPOProfileProps {
  user: UserType;
  onProfileUpdate: (profile: TPOProfileData) => void;
  onNotificationPreferencesUpdate?: (preferences: NotificationPreferences) => void;
  onLogout?: () => void;
  defaultTab?: string;
}

export function TPOProfile({ 
  user, 
  onProfileUpdate, 
  onNotificationPreferencesUpdate,
  onLogout,
  defaultTab = "personal"
}: TPOProfileProps) {
  const [profileData, setProfileData] = useState<TPOProfileData>(
    user.tpoProfile || {
      personalInfo: {},
      professionalInfo: { qualifications: [], specializations: [] },
      collegeInfo: {},
      placementStats: { topRecruiters: [], achievements: [] },
      companyRelations: {},
      documents: { certificates: [] }
    }
  );

  const [notificationPrefs, setNotificationPrefs] = useState<NotificationPreferences>(
    user.notificationPreferences || {
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
    }
  );

  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (section: keyof TPOProfileData, field: string, value: string | number) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section: keyof TPOProfileData, field: string, value: string[]) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNotificationPrefChange = (field: keyof NotificationPreferences, value: boolean) => {
    const newPrefs = { ...notificationPrefs, [field]: value };
    setNotificationPrefs(newPrefs);
    if (onNotificationPreferencesUpdate) {
      onNotificationPreferencesUpdate(newPrefs);
    }
  };

  const addToArray = (section: keyof TPOProfileData, field: string, newValue: string) => {
    if (newValue.trim()) {
      const current = (profileData[section] as any)[field] || [];
      if (!current.includes(newValue.trim())) {
        handleArrayChange(section, field, [...current, newValue.trim()]);
      }
    }
  };

  const removeFromArray = (section: keyof TPOProfileData, field: string, valueToRemove: string) => {
    const current = (profileData[section] as any)[field] || [];
    handleArrayChange(section, field, current.filter((item: string) => item !== valueToRemove));
  };

  const handleFileUpload = async (file: File, type: 'idProof' | 'authorizationLetter' | 'collegeIdCard' | 'certificate') => {
    setIsUploading(true);
    
    // Simulate file upload - in real app, this would upload to a server
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const uploadedFile: UploadedFile = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
      url: URL.createObjectURL(file) // In real app, this would be the server URL
    };

    setProfileData(prev => {
      const newData = { ...prev };
      if (type === 'certificate') {
        newData.documents.certificates = [...newData.documents.certificates, uploadedFile];
      } else {
        newData.documents[type] = uploadedFile;
      }
      return newData;
    });

    setIsUploading(false);
  };

  const removeFile = (fileId: string, type: 'idProof' | 'authorizationLetter' | 'collegeIdCard' | 'certificate') => {
    setProfileData(prev => {
      const newData = { ...prev };
      if (type === 'certificate') {
        newData.documents.certificates = newData.documents.certificates.filter(cert => cert.id !== fileId);
      } else {
        delete newData.documents[type];
      }
      return newData;
    });
  };

  const handleSave = () => {
    onProfileUpdate(profileData);
    // Show success message (in real app, handle API response)
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const FileUploadCard = ({ 
    title, 
    description, 
    file, 
    onFileUpload, 
    onFileRemove, 
    accept,
    type 
  }: {
    title: string;
    description: string;
    file?: UploadedFile;
    onFileUpload: (file: File) => void;
    onFileRemove?: () => void;
    accept: string;
    type: 'idProof' | 'authorizationLetter' | 'collegeIdCard' | 'certificate';
  }) => (
    <Card className="border-0 shadow-custom">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {file ? (
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(file.size)} • Uploaded {new Date(file.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              {onFileRemove && (
                <Button variant="outline" size="sm" onClick={onFileRemove}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop your file here, or click to browse
            </p>
            <input
              type="file"
              accept={accept}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onFileUpload(file);
                }
              }}
              className="hidden"
              id={`file-${type}`}
            />
            <Button variant="outline" asChild disabled={isUploading}>
              <label htmlFor={`file-${type}`} className="cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                {isUploading ? 'Uploading...' : 'Choose File'}
              </label>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">TPO Profile</h1>
          <p className="text-muted-foreground">Manage your professional information and placement activities</p>
        </div>
        <Button onClick={handleSave} className="gradient-primary text-white">
          <CheckCircle className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="h-12 p-1 bg-muted rounded-xl">
          <TabsTrigger value="personal" className="rounded-lg h-10 px-6">
            <User className="h-4 w-4 mr-2" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="professional" className="rounded-lg h-10 px-6">
            <Briefcase className="h-4 w-4 mr-2" />
            Professional
          </TabsTrigger>
          <TabsTrigger value="college" className="rounded-lg h-10 px-6">
            <Building2 className="h-4 w-4 mr-2" />
            College
          </TabsTrigger>
          <TabsTrigger value="placement" className="rounded-lg h-10 px-6">
            <TrendingUp className="h-4 w-4 mr-2" />
            Placement
          </TabsTrigger>
          <TabsTrigger value="documents" className="rounded-lg h-10 px-6">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="settings" className="rounded-lg h-10 px-6">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Basic Information */}
            <Card className="border-0 shadow-custom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="gradient-primary text-white text-2xl">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-muted-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground">Training & Placement Officer</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Upload className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="phone">Primary Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.personalInfo.phone || ''}
                      onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <Label htmlFor="alternatePhone">Alternate Phone</Label>
                    <Input
                      id="alternatePhone"
                      value={profileData.personalInfo.alternatePhone || ''}
                      onChange={(e) => handleInputChange('personalInfo', 'alternatePhone', e.target.value)}
                      placeholder="+91 98765 43211"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={profileData.personalInfo.dateOfBirth || ''}
                      onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      value={profileData.personalInfo.emergencyContact || ''}
                      onChange={(e) => handleInputChange('personalInfo', 'emergencyContact', e.target.value)}
                      placeholder="Emergency contact number"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-0 shadow-custom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Contact & Social
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={profileData.personalInfo.address || ''}
                    onChange={(e) => handleInputChange('personalInfo', 'address', e.target.value)}
                    placeholder="Your current address"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin" className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn Profile
                  </Label>
                  <Input
                    id="linkedin"
                    value={profileData.personalInfo.linkedIn || ''}
                    onChange={(e) => handleInputChange('personalInfo', 'linkedIn', e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Professional Information Tab */}
        <TabsContent value="professional" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Professional Details */}
            <Card className="border-0 shadow-custom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Professional Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="designation">Designation</Label>
                  <Input
                    id="designation"
                    value={profileData.professionalInfo.designation || ''}
                    onChange={(e) => handleInputChange('professionalInfo', 'designation', e.target.value)}
                    placeholder="e.g., Training & Placement Officer"
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={profileData.professionalInfo.department || ''}
                    onChange={(e) => handleInputChange('professionalInfo', 'department', e.target.value)}
                    placeholder="e.g., Placement Cell"
                  />
                </div>
                <div>
                  <Label htmlFor="employeeId">Employee ID</Label>
                  <Input
                    id="employeeId"
                    value={profileData.professionalInfo.employeeId || ''}
                    onChange={(e) => handleInputChange('professionalInfo', 'employeeId', e.target.value)}
                    placeholder="Your employee ID"
                  />
                </div>
                <div>
                  <Label htmlFor="joiningDate">Joining Date</Label>
                  <Input
                    id="joiningDate"
                    type="date"
                    value={profileData.professionalInfo.joiningDate || ''}
                    onChange={(e) => handleInputChange('professionalInfo', 'joiningDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Total Experience</Label>
                  <Input
                    id="experience"
                    value={profileData.professionalInfo.experience || ''}
                    onChange={(e) => handleInputChange('professionalInfo', 'experience', e.target.value)}
                    placeholder="e.g., 8 years"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Qualifications & Specializations */}
            <Card className="border-0 shadow-custom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Qualifications & Expertise
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Qualifications */}
                <div>
                  <Label className="mb-3 block">Educational Qualifications</Label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      placeholder="Add qualification (e.g., M.Tech CSE)"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addToArray('professionalInfo', 'qualifications', (e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                    />
                    <Button 
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        addToArray('professionalInfo', 'qualifications', input.value);
                        input.value = '';
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profileData.professionalInfo.qualifications?.map((qual, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50 text-blue-800">
                        {qual}
                        <button
                          onClick={() => removeFromArray('professionalInfo', 'qualifications', qual)}
                          className="ml-2 hover:text-red-600"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {profileData.professionalInfo.qualifications?.length === 0 && (
                      <p className="text-sm text-muted-foreground">No qualifications added yet</p>
                    )}
                  </div>
                </div>

                {/* Specializations */}
                <div>
                  <Label className="mb-3 block">Areas of Specialization</Label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      placeholder="Add specialization (e.g., Corporate Relations)"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addToArray('professionalInfo', 'specializations', (e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                    />
                    <Button 
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        addToArray('professionalInfo', 'specializations', input.value);
                        input.value = '';
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profileData.professionalInfo.specializations?.map((spec, index) => (
                      <Badge key={index} variant="outline" className="bg-green-50 text-green-800">
                        {spec}
                        <button
                          onClick={() => removeFromArray('professionalInfo', 'specializations', spec)}
                          className="ml-2 hover:text-red-600"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {profileData.professionalInfo.specializations?.length === 0 && (
                      <p className="text-sm text-muted-foreground">No specializations added yet</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* College Information Tab */}
        <TabsContent value="college" className="space-y-6">
          <Card className="border-0 shadow-custom">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                College/Institution Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="collegeName">College/University Name</Label>
                  <Input
                    id="collegeName"
                    value={profileData.collegeInfo.collegeName || user.college || ''}
                    onChange={(e) => handleInputChange('collegeInfo', 'collegeName', e.target.value)}
                    placeholder="Your institution name"
                  />
                </div>
                <div>
                  <Label htmlFor="establishedYear">Established Year</Label>
                  <Input
                    id="establishedYear"
                    value={profileData.collegeInfo.establishedYear || ''}
                    onChange={(e) => handleInputChange('collegeInfo', 'establishedYear', e.target.value)}
                    placeholder="e.g., 1995"
                  />
                </div>
                <div>
                  <Label htmlFor="affiliation">Affiliation</Label>
                  <Input
                    id="affiliation"
                    value={profileData.collegeInfo.affiliation || ''}
                    onChange={(e) => handleInputChange('collegeInfo', 'affiliation', e.target.value)}
                    placeholder="e.g., AICTE, UGC"
                  />
                </div>
                <div>
                  <Label htmlFor="collegePhone">College Phone</Label>
                  <Input
                    id="collegePhone"
                    value={profileData.collegeInfo.collegePhone || ''}
                    onChange={(e) => handleInputChange('collegeInfo', 'collegePhone', e.target.value)}
                    placeholder="College main number"
                  />
                </div>
                <div>
                  <Label htmlFor="collegeEmail">College Email</Label>
                  <Input
                    id="collegeEmail"
                    type="email"
                    value={profileData.collegeInfo.collegeEmail || ''}
                    onChange={(e) => handleInputChange('collegeInfo', 'collegeEmail', e.target.value)}
                    placeholder="official@college.edu"
                  />
                </div>
                <div>
                  <Label htmlFor="collegeWebsite" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    College Website
                  </Label>
                  <Input
                    id="collegeWebsite"
                    value={profileData.collegeInfo.collegeWebsite || ''}
                    onChange={(e) => handleInputChange('collegeInfo', 'collegeWebsite', e.target.value)}
                    placeholder="https://college.edu"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="collegeAddress">College Address</Label>
                <Textarea
                  id="collegeAddress"
                  value={profileData.collegeInfo.collegeAddress || ''}
                  onChange={(e) => handleInputChange('collegeInfo', 'collegeAddress', e.target.value)}
                  placeholder="Complete college address"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Placement Statistics Tab */}
        <TabsContent value="placement" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Placement Statistics */}
            <Card className="border-0 shadow-custom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Placement Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="totalStudentsPlaced">Total Students Placed (This Year)</Label>
                  <Input
                    id="totalStudentsPlaced"
                    value={profileData.placementStats.totalStudentsPlaced || ''}
                    onChange={(e) => handleInputChange('placementStats', 'totalStudentsPlaced', e.target.value)}
                    placeholder="e.g., 150"
                  />
                </div>
                <div>
                  <Label htmlFor="placementPercentage">Placement Percentage</Label>
                  <Input
                    id="placementPercentage"
                    value={profileData.placementStats.placementPercentage || ''}
                    onChange={(e) => handleInputChange('placementStats', 'placementPercentage', e.target.value)}
                    placeholder="e.g., 85%"
                  />
                </div>
                <div>
                  <Label htmlFor="averagePackage">Average Package (LPA)</Label>
                  <Input
                    id="averagePackage"
                    value={profileData.placementStats.averagePackage || ''}
                    onChange={(e) => handleInputChange('placementStats', 'averagePackage', e.target.value)}
                    placeholder="e.g., 6.5 LPA"
                  />
                </div>
                <div>
                  <Label htmlFor="highestPackage">Highest Package (LPA)</Label>
                  <Input
                    id="highestPackage"
                    value={profileData.placementStats.highestPackage || ''}
                    onChange={(e) => handleInputChange('placementStats', 'highestPackage', e.target.value)}
                    placeholder="e.g., 25 LPA"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Company Relations */}
            <Card className="border-0 shadow-custom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  Company Relations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="activePartnerships">Active Company Partnerships</Label>
                  <Input
                    id="activePartnerships"
                    type="number"
                    value={profileData.companyRelations.activePartnerships || ''}
                    onChange={(e) => handleInputChange('companyRelations', 'activePartnerships', parseInt(e.target.value))}
                    placeholder="Number of active partnerships"
                  />
                </div>
                <div>
                  <Label htmlFor="newPartnerships">New Partnerships (This Year)</Label>
                  <Input
                    id="newPartnerships"
                    type="number"
                    value={profileData.companyRelations.newPartnerships || ''}
                    onChange={(e) => handleInputChange('companyRelations', 'newPartnerships', parseInt(e.target.value))}
                    placeholder="New partnerships established"
                  />
                </div>
                <div>
                  <Label htmlFor="upcomingDrives">Upcoming Drives</Label>
                  <Input
                    id="upcomingDrives"
                    type="number"
                    value={profileData.companyRelations.upcomingDrives || ''}
                    onChange={(e) => handleInputChange('companyRelations', 'upcomingDrives', parseInt(e.target.value))}
                    placeholder="Number of scheduled drives"
                  />
                </div>
                <div>
                  <Label htmlFor="successfulPlacements">Successful Placements (Total)</Label>
                  <Input
                    id="successfulPlacements"
                    type="number"
                    value={profileData.companyRelations.successfulPlacements || ''}
                    onChange={(e) => handleInputChange('companyRelations', 'successfulPlacements', parseInt(e.target.value))}
                    placeholder="Total successful placements"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Recruiters & Achievements */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-0 shadow-custom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Top Recruiters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Add top recruiter company"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addToArray('placementStats', 'topRecruiters', (e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <Button 
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      addToArray('placementStats', 'topRecruiters', input.value);
                      input.value = '';
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData.placementStats.topRecruiters?.map((recruiter, index) => (
                    <Badge key={index} variant="outline" className="bg-purple-50 text-purple-800">
                      {recruiter}
                      <button
                        onClick={() => removeFromArray('placementStats', 'topRecruiters', recruiter)}
                        className="ml-2 hover:text-red-600"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {profileData.placementStats.topRecruiters?.length === 0 && (
                    <p className="text-sm text-muted-foreground">No top recruiters added yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-custom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Achievements & Recognition
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Add achievement or award"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addToArray('placementStats', 'achievements', (e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <Button 
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      addToArray('placementStats', 'achievements', input.value);
                      input.value = '';
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData.placementStats.achievements?.map((achievement, index) => (
                    <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-800">
                      {achievement}
                      <button
                        onClick={() => removeFromArray('placementStats', 'achievements', achievement)}
                        className="ml-2 hover:text-red-600"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {profileData.placementStats.achievements?.length === 0 && (
                    <p className="text-sm text-muted-foreground">No achievements added yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <div className="grid gap-6">
            {/* ID Proof */}
            <FileUploadCard
              title="Government ID Proof"
              description="Upload Aadhaar Card, PAN Card, or Passport (PDF/Image format)"
              file={profileData.documents.idProof}
              onFileUpload={(file) => handleFileUpload(file, 'idProof')}
              onFileRemove={() => removeFile(profileData.documents.idProof!.id, 'idProof')}
              accept=".pdf,.jpg,.jpeg,.png"
              type="idProof"
            />

            {/* Authorization Letter */}
            <FileUploadCard
              title="TPO Authorization Letter"
              description="Official letter authorizing you as TPO from college administration"
              file={profileData.documents.authorizationLetter}
              onFileUpload={(file) => handleFileUpload(file, 'authorizationLetter')}
              onFileRemove={() => removeFile(profileData.documents.authorizationLetter!.id, 'authorizationLetter')}
              accept=".pdf,.doc,.docx"
              type="authorizationLetter"
            />

            {/* College ID Card */}
            <FileUploadCard
              title="College ID Card"
              description="Your official college/institution identity card"
              file={profileData.documents.collegeIdCard}
              onFileUpload={(file) => handleFileUpload(file, 'collegeIdCard')}
              onFileRemove={() => removeFile(profileData.documents.collegeIdCard!.id, 'collegeIdCard')}
              accept=".pdf,.jpg,.jpeg,.png"
              type="collegeIdCard"
            />

            {/* Additional Certificates */}
            <Card className="border-0 shadow-custom">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Professional Certificates & Training
                </CardTitle>
                <CardDescription>
                  Upload certificates for professional training, workshops, or additional qualifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {profileData.documents.certificates.map((cert) => (
                  <div key={cert.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <Award className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(cert.size)} • Uploaded {new Date(cert.uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => removeFile(cert.id, 'certificate')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Upload new certificate */}
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Award className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Add a new professional certificate
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleFileUpload(file, 'certificate');
                      }
                    }}
                    className="hidden"
                    id="certificate-upload"
                  />
                  <Button variant="outline" asChild disabled={isUploading}>
                    <label htmlFor="certificate-upload" className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      {isUploading ? 'Uploading...' : 'Upload Certificate'}
                    </label>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Document Guidelines */}
            <Card className="border-0 shadow-custom bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  Document Upload Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Maximum file size: 10MB per document</li>
                  <li>• Supported formats: PDF, DOC, DOCX, JPG, PNG</li>
                  <li>• Ensure all documents are clear and readable</li>
                  <li>• ID proofs must be government-issued documents</li>
                  <li>• Authorization letter must be on official letterhead</li>
                  <li>• Keep all documents current and valid</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6">
            {/* Notification Preferences */}
            <Card className="border-0 shadow-custom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Manage your notification settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Placement Drive Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Drive Approvals</p>
                        <p className="text-sm text-muted-foreground">Notifications when your drives are approved/rejected</p>
                      </div>
                      <Switch
                        checked={notificationPrefs.driveApproved}
                        onCheckedChange={(checked) => handleNotificationPrefChange('driveApproved', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Student Applications</p>
                        <p className="text-sm text-muted-foreground">New applications from students</p>
                      </div>
                      <Switch
                        checked={notificationPrefs.applicationReceived}
                        onCheckedChange={(checked) => handleNotificationPrefChange('applicationReceived', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Placement Success</p>
                        <p className="text-sm text-muted-foreground">Successful student placements</p>
                      </div>
                      <Switch
                        checked={notificationPrefs.placementSuccess}
                        onCheckedChange={(checked) => handleNotificationPrefChange('placementSuccess', checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">System Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Profile Updates</p>
                        <p className="text-sm text-muted-foreground">Notifications about profile changes</p>
                      </div>
                      <Switch
                        checked={notificationPrefs.profileUpdate}
                        onCheckedChange={(checked) => handleNotificationPrefChange('profileUpdate', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">System Updates</p>
                        <p className="text-sm text-muted-foreground">Important system announcements</p>
                      </div>
                      <Switch
                        checked={notificationPrefs.systemUpdate}
                        onCheckedChange={(checked) => handleNotificationPrefChange('systemUpdate', checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Delivery Preferences</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={notificationPrefs.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationPrefChange('emailNotifications', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Browser push notifications</p>
                      </div>
                      <Switch
                        checked={notificationPrefs.pushNotifications}
                        onCheckedChange={(checked) => handleNotificationPrefChange('pushNotifications', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card className="border-0 shadow-custom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>
                  Manage your account privacy and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Profile Visibility</p>
                    <p className="text-sm text-muted-foreground">Allow companies to view your professional profile</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Contact Information</p>
                    <p className="text-sm text-muted-foreground">Show contact details to verified companies</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Placement Statistics</p>
                    <p className="text-sm text-muted-foreground">Share placement data with partner institutions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Account Management */}
            <Card className="border-0 shadow-custom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Account Management
                </CardTitle>
                <CardDescription>
                  Manage your account settings and data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Download My Data</p>
                    <p className="text-sm text-muted-foreground">Download a copy of your profile and placement data</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
                
                <Separator />
                
                {onLogout && (
                  <div className="pt-4">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                              <AlertTriangle className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                              <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to log out of your TPO account?
                              </AlertDialogDescription>
                            </div>
                          </div>
                        </AlertDialogHeader>
                        <div className="py-4">
                          <div className="bg-muted/50 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="gradient-primary text-white">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-4">
                            You will be redirected to the landing page and will need to log in again to access your account.
                          </p>
                        </div>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={onLogout}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}