import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Plus, Users, MapPin, Calendar, DollarSign, FileText } from 'lucide-react';
import type { User, Drive } from '../App';

interface TPODashboardProps {
  user: User;
  drives: Drive[];
  onAddDrive: (drive: Omit<Drive, 'id' | 'postedAt' | 'applicants'>) => void;
}

export function TPODashboard({ user, drives, onAddDrive }: TPODashboardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    location: '',
    ctc: '',
    eligibility: '',
    deadline: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddDrive({
      ...formData,
      postedBy: user.id,
      status: 'pending'
    });
    
    setFormData({
      companyName: '',
      role: '',
      location: '',
      ctc: '',
      eligibility: '',
      deadline: '',
      description: ''
    });
    setIsDialogOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const DriveCard = ({ drive }: { drive: Drive }) => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{drive.companyName}</CardTitle>
            <CardDescription className="text-base mt-1">{drive.role}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge className={getStatusColor(drive.status)}>
              {drive.status.charAt(0).toUpperCase() + drive.status.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{drive.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>{drive.ctc}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Deadline: {new Date(drive.deadline).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{drive.applicants.length} applicants</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{drive.eligibility}</p>
          <p className="text-sm">{drive.description}</p>
        </div>
        
        <div className="text-xs text-muted-foreground">
          Posted on: {new Date(drive.postedAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2>TPO Dashboard</h2>
          <p className="text-muted-foreground">Welcome, {user.name}</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Post New Drive
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Post New Campus Drive</DialogTitle>
              <DialogDescription>
                Fill in the details for the new placement drive.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Job Role</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ctc">CTC Range</Label>
                  <Input
                    id="ctc"
                    placeholder="e.g., 12-15 LPA"
                    value={formData.ctc}
                    onChange={(e) => setFormData(prev => ({ ...prev, ctc: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="eligibility">Eligibility Criteria</Label>
                  <Input
                    id="eligibility"
                    placeholder="e.g., B.Tech CSE/IT, CGPA ≥ 7.0"
                    value={formData.eligibility}
                    onChange={(e) => setFormData(prev => ({ ...prev, eligibility: e.target.value }))}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter detailed job description..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[100px]"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jd">Job Description File (PDF)</Label>
                <Input
                  id="jd"
                  type="file"
                  accept=".pdf"
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-primary file:text-primary-foreground"
                />
                <p className="text-xs text-muted-foreground">
                  Upload a detailed job description (PDF format only)
                </p>
              </div>
              
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <FileText className="h-4 w-4 mr-2" />
                  Post Drive
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Drives</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{drives.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Approved Drives</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{drives.filter(d => d.status === 'approved').length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{drives.reduce((sum, drive) => sum + drive.applicants.length, 0)}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Drives ({drives.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({drives.filter(d => d.status === 'pending').length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({drives.filter(d => d.status === 'approved').length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {drives.map(drive => (
              <DriveCard key={drive.id} drive={drive} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {drives.filter(d => d.status === 'pending').map(drive => (
              <DriveCard key={drive.id} drive={drive} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {drives.filter(d => d.status === 'approved').map(drive => (
              <DriveCard key={drive.id} drive={drive} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}