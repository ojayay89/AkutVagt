import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Check, X, Users, FileText, Building2, MapPin, Calendar, DollarSign } from 'lucide-react';
import type { Drive } from '../App';

interface AdminDashboardProps {
  drives: Drive[];
  onUpdateStatus: (driveId: string, status: 'approved' | 'rejected') => void;
}

export function AdminDashboard({ drives, onUpdateStatus }: AdminDashboardProps) {
  const pendingDrives = drives.filter(d => d.status === 'pending');
  const approvedDrives = drives.filter(d => d.status === 'approved');
  const rejectedDrives = drives.filter(d => d.status === 'rejected');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const DriveCard = ({ drive, showActions = false }: { drive: Drive; showActions?: boolean }) => (
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
          Posted by: {drive.postedBy} • {new Date(drive.postedAt).toLocaleDateString()}
        </div>
        
        {showActions && drive.status === 'pending' && (
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateStatus(drive.id, 'rejected')}
              className="text-red-600 hover:text-red-700"
            >
              <X className="h-4 w-4 mr-1" />
              Reject
            </Button>
            <Button
              size="sm"
              onClick={() => onUpdateStatus(drive.id, 'approved')}
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="h-4 w-4 mr-1" />
              Approve
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2>Admin Dashboard</h2>
        <p className="text-muted-foreground">Manage campus drives and monitor platform activity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            <CardTitle className="text-sm">Pending Approval</CardTitle>
            <div className="h-4 w-4 rounded-full bg-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{pendingDrives.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Approved Drives</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{approvedDrives.length}</div>
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

      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">
            Pending Approval ({pendingDrives.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approvedDrives.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejectedDrives.length})
          </TabsTrigger>
          <TabsTrigger value="all">
            All Drives ({drives.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingDrives.length > 0 ? (
            <>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>{pendingDrives.length}</strong> drive(s) require your approval before they can be visible to students.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {pendingDrives.map(drive => (
                  <DriveCard key={drive.id} drive={drive} showActions={true} />
                ))}
              </div>
            </>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground">No drives pending approval.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {approvedDrives.map(drive => (
              <DriveCard key={drive.id} drive={drive} />
            ))}
          </div>
          {approvedDrives.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground">No approved drives yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rejectedDrives.map(drive => (
              <DriveCard key={drive.id} drive={drive} />
            ))}
          </div>
          {rejectedDrives.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground">No rejected drives.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {drives.map(drive => (
              <DriveCard key={drive.id} drive={drive} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}