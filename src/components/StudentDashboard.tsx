import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search, 
  MapPin, 
  Building2, 
  Calendar, 
  DollarSign, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  Briefcase,
  Send,
  Filter,
  SortAsc,
  Eye,
  BookOpen,
  Award,
  Target
} from 'lucide-react';
import type { User, Drive } from '../types';

interface StudentDashboardProps {
  user: User;
  drives: Drive[];
  onApply: (driveId: string, studentId: string) => void;
}

export function StudentDashboard({ user, drives, onApply }: StudentDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [ctcFilter, setCTCFilter] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');

  // Filter and sort drives
  const filteredDrives = drives
    .filter(drive => {
      const matchesSearch = drive.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          drive.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = locationFilter === 'all' || drive.location === locationFilter;
      
      let matchesCTC = true;
      if (ctcFilter !== 'all') {
        const ctcValue = parseInt(drive.ctc.split('-')[0]);
        switch (ctcFilter) {
          case '0-5': matchesCTC = ctcValue <= 5; break;
          case '5-10': matchesCTC = ctcValue > 5 && ctcValue <= 10; break;
          case '10-15': matchesCTC = ctcValue > 10 && ctcValue <= 15; break;
          case '15+': matchesCTC = ctcValue > 15; break;
        }
      }
      
      return matchesSearch && matchesLocation && matchesCTC;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case 'ctc':
          return parseInt(b.ctc.split('-')[0]) - parseInt(a.ctc.split('-')[0]);
        case 'company':
          return a.companyName.localeCompare(b.companyName);
        default:
          return 0;
      }
    });

  // Get unique locations for filter
  const locations = Array.from(new Set(drives.map(drive => drive.location)));

  const handleApply = (driveId: string) => {
    onApply(driveId, user.id);
  };

  const isAlreadyApplied = (driveId: string) => {
    return drives.find(d => d.id === driveId)?.applicants.includes(user.id) || false;
  };

  const getDeadlineStatus = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft < 0) return { status: 'expired', text: 'Expired', color: 'text-red-600' };
    if (daysLeft <= 3) return { status: 'urgent', text: `${daysLeft} days left`, color: 'text-orange-600' };
    if (daysLeft <= 7) return { status: 'soon', text: `${daysLeft} days left`, color: 'text-yellow-600' };
    return { status: 'normal', text: `${daysLeft} days left`, color: 'text-green-600' };
  };

  const formatDeadline = (deadline: string) => {
    return new Date(deadline).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Profile completeness calculation
  const getProfileCompleteness = () => {
    if (!user.studentProfile) return 0;
    
    let completedSections = 0;
    const totalSections = 5;
    
    const profile = user.studentProfile;
    
    if (profile.personalInfo.phone && profile.personalInfo.address) completedSections++;
    if (profile.academic.cgpa && profile.academic.specialization) completedSections++;
    if (profile.skills.technical.length > 0) completedSections++;
    if (profile.experience.internships.length > 0 || profile.experience.projects.length > 0) completedSections++;
    if (profile.documents.resume) completedSections++;
    
    return Math.round((completedSections / totalSections) * 100);
  };

  const profileCompleteness = getProfileCompleteness();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Welcome back, {user.name.split(' ')[0]}!</h1>
          <p className="text-muted-foreground">Discover and apply to exciting job opportunities</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Profile Completeness</p>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-16 rounded-full bg-muted overflow-hidden`}>
              <div 
                className={`h-full transition-all duration-300 ${
                  profileCompleteness >= 80 ? 'bg-green-500' : 
                  profileCompleteness >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${profileCompleteness}%` }}
              />
            </div>
            <span className={`text-sm font-medium ${
              profileCompleteness >= 80 ? 'text-green-600' : 
              profileCompleteness >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {profileCompleteness}%
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-custom">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Available Drives</p>
                <p className="text-2xl font-semibold">{drives.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-custom">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Send className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Applications Sent</p>
                <p className="text-2xl font-semibold">
                  {drives.filter(d => d.applicants.includes(user.id)).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-custom">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-orange-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Urgent Deadlines</p>
                <p className="text-2xl font-semibold">
                  {drives.filter(d => {
                    const daysLeft = Math.ceil((new Date(d.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                    return daysLeft <= 3 && daysLeft >= 0;
                  }).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-custom">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Package</p>
                <p className="text-2xl font-semibold">
                  {Math.round(drives.reduce((acc, d) => acc + parseInt(d.ctc.split('-')[0]), 0) / drives.length)} LPA
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-0 shadow-custom">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Search & Filter Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by company or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="ctc">Package (LPA)</Label>
              <Select value={ctcFilter} onValueChange={setCTCFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All packages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Packages</SelectItem>
                  <SelectItem value="0-5">0-5 LPA</SelectItem>
                  <SelectItem value="5-10">5-10 LPA</SelectItem>
                  <SelectItem value="10-15">10-15 LPA</SelectItem>
                  <SelectItem value="15+">15+ LPA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="sort">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="ctc">Package</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Drives */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Available Opportunities</h2>
          <Badge variant="secondary" className="text-sm">
            {filteredDrives.length} of {drives.length} drives
          </Badge>
        </div>

        {filteredDrives.length === 0 ? (
          <Card className="border-0 shadow-custom">
            <CardContent className="p-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No drives found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search terms to find more opportunities.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredDrives.map((drive) => {
              const deadlineStatus = getDeadlineStatus(drive.deadline);
              const alreadyApplied = isAlreadyApplied(drive.id);
              
              return (
                <Card key={drive.id} className="border-0 shadow-custom hover:shadow-custom-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-custom">
                          <Building2 className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-semibold">{drive.role}</h3>
                            {deadlineStatus.status === 'urgent' && (
                              <Badge variant="destructive" className="text-xs">Urgent</Badge>
                            )}
                            {alreadyApplied && (
                              <Badge variant="default" className="text-xs bg-green-600">Applied</Badge>
                            )}
                          </div>
                          <p className="text-lg text-muted-foreground font-medium">{drive.companyName}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {drive.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {drive.ctc}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span className={deadlineStatus.color}>
                                {formatDeadline(drive.deadline)} ({deadlineStatus.text})
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handleApply(drive.id)}
                          disabled={alreadyApplied || deadlineStatus.status === 'expired'}
                          className={
                            alreadyApplied 
                              ? "bg-green-600 hover:bg-green-700 text-white" 
                              : "gradient-primary text-white"
                          }
                        >
                          {alreadyApplied ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Applied
                            </>
                          ) : deadlineStatus.status === 'expired' ? (
                            <>
                              <Clock className="h-4 w-4 mr-2" />
                              Expired
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Apply Now
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium mb-2">Eligibility Criteria</h4>
                        <p className="text-sm text-muted-foreground">{drive.eligibility}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Job Description</h4>
                        <p className="text-sm text-muted-foreground">{drive.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {drive.applicants.length} applicants
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Posted {new Date(drive.postedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Profile Improvement Suggestions */}
      {profileCompleteness < 80 && (
        <Card className="border-0 shadow-custom bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-2">Improve Your Profile</h3>
                <p className="text-blue-800 text-sm mb-3">
                  Your profile is {profileCompleteness}% complete. Complete your profile to increase your chances of getting selected.
                </p>
                <div className="space-y-1 text-sm text-blue-700">
                  {!user.studentProfile?.personalInfo.phone && (
                    <p>• Add your phone number and address</p>
                  )}
                  {!user.studentProfile?.academic.cgpa && (
                    <p>• Update your academic information and CGPA</p>
                  )}
                  {!user.studentProfile?.skills.technical.length && (
                    <p>• Add your technical skills</p>
                  )}
                  {!user.studentProfile?.documents.resume && (
                    <p>• Upload your resume</p>
                  )}
                  {(!user.studentProfile?.experience.internships.length && !user.studentProfile?.experience.projects.length) && (
                    <p>• Add your projects or internship experience</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}