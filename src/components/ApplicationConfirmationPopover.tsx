import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import {
  User,
  GraduationCap,
  FileText,
  Award,
  Code,
  Building2,
  Calendar,
  CheckCircle,
  AlertCircle,
  Send,
  X
} from 'lucide-react';
import type { User as UserType, Drive } from '../types';

interface ApplicationConfirmationPopoverProps {
  user: UserType;
  drive: Drive;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

export function ApplicationConfirmationPopover({
  user,
  drive,
  isOpen,
  onOpenChange,
  onConfirm,
  onCancel,
  children
}: ApplicationConfirmationPopoverProps) {
  const profile = user.studentProfile;
  
  const getProfileCompleteness = () => {
    if (!profile) return 0;
    
    let completedSections = 0;
    const totalSections = 5;
    
    // Personal Info
    if (profile.personalInfo.phone && profile.personalInfo.address) completedSections++;
    
    // Academic Info
    if (profile.academic.cgpa && profile.academic.specialization) completedSections++;
    
    // Skills
    if (profile.skills.technical.length > 0) completedSections++;
    
    // Experience
    if (profile.experience.internships.length > 0 || profile.experience.projects.length > 0) completedSections++;
    
    // Documents
    if (profile.documents.resume) completedSections++;
    
    return Math.round((completedSections / totalSections) * 100);
  };

  const profileCompleteness = getProfileCompleteness();

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent 
        className="w-96 p-0" 
        align="center" 
        side="top"
        sideOffset={8}
      >
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Send className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Confirm Application</CardTitle>
                  <CardDescription>Review your profile before applying</CardDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Job Details */}
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-4 w-4 text-primary" />
                <h4 className="font-medium">Applying for</h4>
              </div>
              <p className="font-medium">{drive.role}</p>
              <p className="text-sm text-muted-foreground">{drive.companyName} • {drive.location}</p>
              <p className="text-sm text-muted-foreground">Package: {drive.ctc}</p>
            </div>

            <Separator />

            {/* Student Profile Summary */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <h4 className="font-medium">Your Profile Summary</h4>
              </div>

              {/* Basic Info */}
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="gradient-primary text-white">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {user.course} • {user.batch}
                    </Badge>
                    {profile?.academic.cgpa && (
                      <Badge variant="outline" className="text-xs">
                        CGPA: {profile.academic.cgpa}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Completeness */}
              <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  {profileCompleteness >= 80 ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                  )}
                  <span className="text-sm font-medium">Profile Completeness</span>
                </div>
                <span className={`text-sm font-medium ${
                  profileCompleteness >= 80 ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {profileCompleteness}%
                </span>
              </div>

              {/* Key Skills */}
              {profile?.skills.technical.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Key Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {profile.skills.technical.slice(0, 6).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {profile.skills.technical.length > 6 && (
                      <Badge variant="secondary" className="text-xs">
                        +{profile.skills.technical.length - 6} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Resume Status */}
              <div className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Resume</span>
                </div>
                <div className="flex items-center gap-2">
                  {profile?.documents.resume ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Uploaded</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      <span className="text-sm text-orange-600">Not uploaded</span>
                    </>
                  )}
                </div>
              </div>

              {/* Academic Achievement */}
              {profile?.academic.achievements && profile.academic.achievements.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Recent Achievement</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {profile.academic.achievements[0]}
                  </p>
                </div>
              )}

              {/* Profile Warning */}
              {profileCompleteness < 60 && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800">Profile Incomplete</span>
                  </div>
                  <p className="text-xs text-orange-700">
                    Your profile is {profileCompleteness}% complete. Consider updating your profile to improve your chances.
                  </p>
                </div>
              )}
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 gradient-primary text-white"
                onClick={handleConfirm}
              >
                <Send className="h-4 w-4 mr-2" />
                Confirm Apply
              </Button>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground text-center">
              By applying, you agree to share your profile information with {drive.companyName}
            </p>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}