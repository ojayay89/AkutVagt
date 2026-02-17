import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { GraduationCap, LogOut, User, Settings, LayoutDashboard, AlertTriangle } from 'lucide-react';
import { NotificationPanel } from './NotificationPanel';
import type { User as UserType } from '../types';

interface HeaderProps {
  user: UserType;
  onLogout: () => void;
  currentView?: 'dashboard' | 'profile' | 'settings';
  onViewChange?: (view: 'dashboard' | 'profile' | 'settings') => void;
}

export function Header({ user, onLogout, currentView = 'dashboard', onViewChange }: HeaderProps) {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'default';
      case 'tpo': return 'secondary';
      case 'student': return 'outline';
      default: return 'outline';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
      case 'tpo': return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'student': return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'admin': return 'Admin';
      case 'tpo': return 'TPO';
      case 'student': return 'Student';
      default: return role;
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutDialog(false);
    onLogout();
  };

  const handleCancelLogout = () => {
    setShowLogoutDialog(false);
  };

  // Show navigation for both students and TPOs
  const showNavigation = user.role === 'student' || user.role === 'tpo';

  return (
    <>
      <header className="border-b bg-white shadow-custom sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-custom">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-primary">CampusDrives</h1>
                <p className="text-xs text-muted-foreground">Campus Placement Portal</p>
              </div>
            </div>

            {/* Navigation for Students and TPOs */}
            {showNavigation && onViewChange && (
              <nav className="hidden md:flex items-center gap-2">
                <Button
                  variant={currentView === 'dashboard' ? 'default' : 'ghost'}
                  onClick={() => onViewChange('dashboard')}
                  className={currentView === 'dashboard' ? 'gradient-primary text-white' : ''}
                  size="sm"
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button
                  variant={currentView === 'profile' ? 'default' : 'ghost'}
                  onClick={() => onViewChange('profile')}
                  className={currentView === 'profile' ? 'gradient-primary text-white' : ''}
                  size="sm"
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button
                  variant={currentView === 'settings' ? 'default' : 'ghost'}
                  onClick={() => onViewChange('settings')}
                  className={currentView === 'settings' ? 'gradient-primary text-white' : ''}
                  size="sm"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </nav>
            )}

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* User Info - Hidden on Mobile */}
              <div className="hidden lg:flex items-center gap-3">
                <div className="text-right">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">{user.email}</div>
                </div>
                <Badge variant={getRoleBadgeVariant(user.role)} className={getRoleColor(user.role)}>
                  {getRoleDisplayName(user.role)}
                </Badge>
              </div>

              {/* Notifications */}
              <NotificationPanel user={user} />

              {/* User Menu Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="gradient-primary text-white">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                  <div className="flex items-center justify-start gap-3 p-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="gradient-primary text-white">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <Badge variant={getRoleBadgeVariant(user.role)} className={`${getRoleColor(user.role)} w-fit text-xs`}>
                        {getRoleDisplayName(user.role)}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  
                  {/* Student and TPO specific menu items */}
                  {showNavigation && onViewChange && (
                    <>
                      <DropdownMenuItem onClick={() => onViewChange('dashboard')}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onViewChange('profile')}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onViewChange('settings')}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings & Privacy</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  <DropdownMenuItem 
                    onClick={handleLogoutClick}
                    className="text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to log out of your {getRoleDisplayName(user.role)} account?
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
                  <Badge variant={getRoleBadgeVariant(user.role)} className={`${getRoleColor(user.role)} w-fit text-xs mt-1`}>
                    {getRoleDisplayName(user.role)}
                  </Badge>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              You will be redirected to the landing page and will need to log in again to access your account.
            </p>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelLogout}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmLogout}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}