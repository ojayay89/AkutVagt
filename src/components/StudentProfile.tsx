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
  Code,
  Globe,
  Linkedin,
  Github,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  GraduationCap,
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
import type { User as UserType, StudentProfileData, Experience, Project, UploadedFile, NotificationPreferences } from '../App';

interface StudentProfileProps {
  user: UserType;
  onProfileUpdate: (profile: StudentProfileData) => void;
  onNotificationPreferencesUpdate?: (preferences: NotificationPreferences) => void;
  onLogout?: () => void;
  defaultTab?: string;
}

export function StudentProfile({ 
  user, 
  onProfileUpdate, 
  onNotificationPreferencesUpdate,
  onLogout,
  defaultTab = "personal"
}: StudentProfileProps) {
  const [profileData, setProfileData] = useState<StudentProfileData>(
    user.studentProfile || {
      personalInfo: {},
      academic: { achievements: [] },
      skills: { technical: [], soft: [], languages: [] },
      experience: { internships: [], projects: [] },
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

  const handleInputChange = (section: keyof StudentProfileData, field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section: keyof StudentProfileData, field: string, value: string[]) => {
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

  const addToArray = (section: keyof StudentProfileData, field: string, newValue: string) => {
    if (newValue.trim()) {
      const current = (profileData[section] as any)[field] || [];
      if (!current.includes(newValue.trim())) {
        handleArrayChange(section, field, [...current, newValue.trim()]);
      }
    }
  };

  const removeFromArray = (section: keyof StudentProfileData, field: string, valueToRemove: string) => {
    const current = (profileData[section] as any)[field] || [];
    handleArrayChange(section, field, current.filter((item: string) => item !== valueToRemove));
  };

  const addExperience = (type: 'internships' | 'projects') => {
    const newItem = type === 'internships' 
      ? { id: Date.now().toString(), company: '', role: '', duration: '', description: '' }
      : { id: Date.now().toString(), name: '', technologies: [], description: '', link: '' };
    
    setProfileData(prev => ({
      ...prev,
      experience: {
        ...prev.experience,
        [type]: [...prev.experience[type], newItem]
      }
    }));
  };

  const removeExperience = (type: 'internships' | 'projects', id: string) => {
    setProfileData(prev => ({
      ...prev,
      experience: {
        ...prev.experience,
        [type]: prev.experience[type].filter(item => item.id !== id)
      }
    }));
  };

  const updateExperience = (type: 'internships' | 'projects', id: string, field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      experience: {
        ...prev.experience,
        [type]: prev.experience[type].map(item => 
          item.id === id ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const handleFileUpload = async (file: File, type: 'resume' | 'transcript' | 'certificate') => {
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

  const removeFile = (fileId: string, type: 'resume' | 'transcript' | 'certificate') => {
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
    type: 'resume' | 'transcript' | 'certificate';
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
          <h1 className="text-3xl font-semibold">Student Profile</h1>
          <p className="text-muted-foreground">Manage your profile information and documents</p>
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
          <TabsTrigger value="academic" className="rounded-lg h-10 px-6">
            <GraduationCap className="h-4 w-4 mr-2" />
            Academic
          </TabsTrigger>
          <TabsTrigger value="skills" className="rounded-lg h-10 px-6">
            <Code className="h-4 w-4 mr-2" />
            Skills
          </TabsTrigger>
          <TabsTrigger value="experience" className="rounded-lg h-10 px-6">
            <Briefcase className="h-4 w-4 mr-2" />
            Experience
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
                    <p className="text-sm text-muted-foreground">{user.course} • {user.batch}</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Upload className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.personalInfo.phone || ''}
                      onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                      placeholder="+91 98765 43210"
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
                <div>
                  <Label htmlFor="github" className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub Profile
                  </Label>
                  <Input
                    id="github"
                    value={profileData.personalInfo.github || ''}
                    onChange={(e) => handleInputChange('personalInfo', 'github', e.target.value)}
                    placeholder="https://github.com/yourusername"
                  />
                </div>
                <div>
                  <Label htmlFor="portfolio" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Portfolio Website
                  </Label>
                  <Input
                    id="portfolio"
                    value={profileData.personalInfo.portfolio || ''}
                    onChange={(e) => handleInputChange('personalInfo', 'portfolio', e.target.value)}
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Academic Information Tab */}
        <TabsContent value="academic" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Academic Details */}
            <Card className="border-0 shadow-custom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Academic Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cgpa">CGPA/Percentage</Label>
                  <Input
                    id="cgpa"
                    value={profileData.academic.cgpa || ''}
                    onChange={(e) => handleInputChange('academic', 'cgpa', e.target.value)}
                    placeholder="8.5 CGPA or 85%"
                  />
                </div>
                <div>
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input
                    id="specialization"
                    value={profileData.academic.specialization || ''}
                    onChange={(e) => handleInputChange('academic', 'specialization', e.target.value)}
                    placeholder="e.g., Computer Science, Data Science"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="border-0 shadow-custom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Academic Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Add achievement (e.g., Dean's List, Scholarship)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addToArray('academic', 'achievements', (e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <Button 
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      addToArray('academic', 'achievements', input.value);
                      input.value = '';
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData.academic.achievements?.map((achievement, index) => (
                    <Badge key={index} variant="outline" className="bg-green-50 text-green-800">
                      {achievement}
                      <button
                        onClick={() => removeFromArray('academic', 'achievements', achievement)}
                        className="ml-2 hover:text-red-600"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {profileData.academic.achievements?.length === 0 && (
                    <p className="text-sm text-muted-foreground">No achievements added yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <div className="grid gap-6">
            {/* Technical Skills */}
            <Card className="border-0 shadow-custom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Technical Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Add technical skill (e.g., React, Python, SQL)"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addToArray('skills', 'technical', (e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <Button 
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                      addToArray('skills', 'technical', input.value);
                      input.value = '';
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.technical.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50 text-blue-800">
                      {skill}
                      <button
                        onClick={() => removeFromArray('skills', 'technical', skill)}
                        className="ml-2 hover:text-red-600"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {profileData.skills.technical.length === 0 && (
                    <p className="text-sm text-muted-foreground">No technical skills added yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Soft Skills */}
              <Card className="border-0 shadow-custom">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Soft Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2 mb-3">
                    <Input
                      placeholder="Add soft skill (e.g., Leadership, Communication)"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addToArray('skills', 'soft', (e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                    />
                    <Button 
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        addToArray('skills', 'soft', input.value);
                        input.value = '';
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.soft.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-purple-50 text-purple-800">
                        {skill}
                        <button
                          onClick={() => removeFromArray('skills', 'soft', skill)}
                          className="ml-2 hover:text-red-600"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {profileData.skills.soft.length === 0 && (
                      <p className="text-sm text-muted-foreground">No soft skills added yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Languages */}
              <Card className="border-0 shadow-custom">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Languages
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2 mb-3">
                    <Input
                      placeholder="Add language (e.g., English, Hindi, Spanish)"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addToArray('skills', 'languages', (e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                    />
                    <Button 
                      onClick={(e) => {
                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                        addToArray('skills', 'languages', input.value);
                        input.value = '';
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.languages.map((language, index) => (
                      <Badge key={index} variant="outline" className="bg-orange-50 text-orange-800">
                        {language}
                        <button
                          onClick={() => removeFromArray('skills', 'languages', language)}
                          className="ml-2 hover:text-red-600"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {profileData.skills.languages.length === 0 && (
                      <p className="text-sm text-muted-foreground">No languages added yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Experience Tab */}
        <TabsContent value="experience" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Internships */}
            <Card className="border-0 shadow-custom">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  Internships
                </CardTitle>
                <Button onClick={() => addExperience('internships')} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {profileData.experience.internships.map((internship) => (
                  <div key={internship.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">Internship</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExperience('internships', internship.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid gap-2">
                      <Input
                        placeholder="Company Name"
                        value={internship.company}
                        onChange={(e) => updateExperience('internships', internship.id, 'company', e.target.value)}
                      />
                      <Input
                        placeholder="Role/Position"
                        value={internship.role}
                        onChange={(e) => updateExperience('internships', internship.id, 'role', e.target.value)}
                      />
                      <Input
                        placeholder="Duration (e.g., Jun 2023 - Aug 2023)"
                        value={internship.duration}
                        onChange={(e) => updateExperience('internships', internship.id, 'duration', e.target.value)}
                      />
                      <Textarea
                        placeholder="Description of work and achievements"
                        value={internship.description}
                        onChange={(e) => updateExperience('internships', internship.id, 'description', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
                {profileData.experience.internships.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No internships added yet. Click "Add" to get started.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Projects */}
            <Card className="border-0 shadow-custom">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Projects
                </CardTitle>
                <Button onClick={() => addExperience('projects')} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {profileData.experience.projects.map((project) => (
                  <div key={project.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">Project</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExperience('projects', project.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid gap-2">
                      <Input
                        placeholder="Project Name"
                        value={project.name}
                        onChange={(e) => updateExperience('projects', project.id, 'name', e.target.value)}
                      />
                      <Input
                        placeholder="Technologies (comma-separated)"
                        value={project.technologies.join(', ')}
                        onChange={(e) => updateExperience('projects', project.id, 'technologies', e.target.value.split(', ').filter(Boolean))}
                      />
                      <Input
                        placeholder="Project Link (optional)"
                        value={project.link}
                        onChange={(e) => updateExperience('projects', project.id, 'link', e.target.value)}
                      />
                      <Textarea
                        placeholder="Project description and key features"
                        value={project.description}
                        onChange={(e) => updateExperience('projects', project.id, 'description', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
                {profileData.experience.projects.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No projects added yet. Click "Add" to get started.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <div className="grid gap-6">
            {/* Resume */}
            <FileUploadCard
              title="Resume/CV"
              description="Upload your latest resume in PDF format"
              file={profileData.documents.resume}
              onFileUpload={(file) => handleFileUpload(file, 'resume')}
              onFileRemove={() => removeFile(profileData.documents.resume!.id, 'resume')}
              accept=".pdf,.doc,.docx"
              type="resume"
            />

            {/* Academic Transcript */}
            <FileUploadCard
              title="Academic Transcript"
              description="Upload your official academic transcript"
              file={profileData.documents.transcript}
              onFileUpload={(file) => handleFileUpload(file, 'transcript')}
              onFileRemove={() => removeFile(profileData.documents.transcript!.id, 'transcript')}
              accept=".pdf,.jpg,.jpeg,.png"
              type="transcript"
            />

            {/* Certificates */}
            <Card className="border-0 shadow-custom">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Certificates & Achievements
                </CardTitle>
                <CardDescription>
                  Upload certificates for courses, achievements, and other credentials
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
                    Add a new certificate or achievement
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
                  <li>• Resume should be in PDF format for best compatibility</li>
                  <li>• Keep your documents updated and current</li>
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
                  <h4 className="font-medium">Placement Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Job Drives</p>
                        <p className="text-sm text-muted-foreground">Get notified when new job opportunities are posted</p>
                      </div>
                      <Switch
                        checked={notificationPrefs.drivePosted}
                        onCheckedChange={(checked) => handleNotificationPrefChange('drivePosted', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Application Status Updates</p>
                        <p className="text-sm text-muted-foreground">Updates on your application status</p>
                      </div>
                      <Switch
                        checked={notificationPrefs.applicationStatus}
                        onCheckedChange={(checked) => handleNotificationPrefChange('applicationStatus', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Deadline Reminders</p>
                        <p className="text-sm text-muted-foreground">Reminders for upcoming application deadlines</p>
                      </div>
                      <Switch
                        checked={notificationPrefs.deadlineReminder}
                        onCheckedChange={(checked) => handleNotificationPrefChange('deadlineReminder', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Placement Success</p>
                        <p className="text-sm text-muted-foreground">Notifications about successful placements</p>
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
                    <p className="text-sm text-muted-foreground">Allow recruiters to view your profile</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Contact Information</p>
                    <p className="text-sm text-muted-foreground">Show contact details to companies</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Application History</p>
                    <p className="text-sm text-muted-foreground">Keep track of your application history</p>
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
                    <p className="text-sm text-muted-foreground">Download a copy of your profile data</p>
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
                                Are you sure you want to log out of your account?
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