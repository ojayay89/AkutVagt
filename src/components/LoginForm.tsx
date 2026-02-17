import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { GraduationCap, User, UserCheck, Shield, Sparkles, ArrowLeft } from 'lucide-react';
import type { User, UserRole } from '../App';

interface LoginFormProps {
  onLogin: (user: User) => void;
  onBack?: () => void;
}

export function LoginForm({ onLogin, onBack }: LoginFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '' as UserRole,
    college: '',
    course: '',
    batch: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) return;

    const user: User = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      college: formData.college || undefined,
      course: formData.course || undefined,
      batch: formData.batch || undefined
    };

    onLogin(user);
  };

  const handleQuickLogin = (role: UserRole, name: string) => {
    const user: User = {
      id: role,
      name,
      email: `${role}@example.com`,
      role,
      college: role === 'student' ? 'Sample University' : undefined,
      course: role === 'student' ? 'Computer Science' : undefined,
      batch: role === 'student' ? '2025' : undefined
    };
    onLogin(user);
  };

  const demoUsers = [
    { role: 'student' as UserRole, name: 'John Student', icon: GraduationCap, color: 'bg-blue-50 border-blue-200 hover:bg-blue-100', iconColor: 'text-blue-600' },
    { role: 'tpo' as UserRole, name: 'Jane TPO', icon: UserCheck, color: 'bg-green-50 border-green-200 hover:bg-green-100', iconColor: 'text-green-600' },
    { role: 'admin' as UserRole, name: 'Admin User', icon: Shield, color: 'bg-purple-50 border-purple-200 hover:bg-purple-100', iconColor: 'text-purple-600' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-md">
        {/* Back Button */}
        {onBack && (
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-6 hover:bg-white/80"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <div className="h-16 w-16 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center shadow-custom-lg">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-primary mb-2">Welcome to CampusDrives</h1>
          <p className="text-muted-foreground">Your gateway to campus placement opportunities</p>
        </div>

        <Card className="shadow-custom-lg border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg">Get Started</CardTitle>
            <CardDescription>
              Sign in to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="demo" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="demo" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Quick Demo
                </TabsTrigger>
                <TabsTrigger value="login" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Sign In
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="demo" className="space-y-4">
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Experience the platform with demo accounts
                </p>
                <div className="space-y-3">
                  {demoUsers.map(({ role, name, icon: Icon, color, iconColor }) => (
                    <Button 
                      key={role}
                      variant="outline" 
                      className={`w-full h-14 ${color} transition-all duration-200`}
                      onClick={() => handleQuickLogin(role, name)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-lg bg-white flex items-center justify-center ${iconColor}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{name}</div>
                          <div className="text-xs text-muted-foreground capitalize">{role} Dashboard</div>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="h-11"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="h-11"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, role: value as UserRole }))}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="tpo">TPO (Training & Placement Officer)</SelectItem>
                        <SelectItem value="admin">Admin (Placement Head)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {formData.role === 'student' && (
                    <div className="space-y-4 pt-2 border-t">
                      <div className="space-y-2">
                        <Label htmlFor="college">College/University</Label>
                        <Input
                          id="college"
                          value={formData.college}
                          onChange={(e) => setFormData(prev => ({ ...prev, college: e.target.value }))}
                          className="h-11"
                          placeholder="e.g., Indian Institute of Technology"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="course">Course</Label>
                          <Input
                            id="course"
                            value={formData.course}
                            onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
                            className="h-11"
                            placeholder="e.g., B.Tech CSE"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="batch">Batch Year</Label>
                          <Input
                            id="batch"
                            value={formData.batch}
                            onChange={(e) => setFormData(prev => ({ ...prev, batch: e.target.value }))}
                            className="h-11"
                            placeholder="e.g., 2025"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <Button type="submit" className="w-full h-11 gradient-primary text-white mt-6">
                    Sign In
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            Streamlining campus placements for students, colleges, and companies
          </p>
        </div>
      </div>
    </div>
  );
}