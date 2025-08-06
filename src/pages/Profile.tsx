import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Building, 
  Calendar, 
  Save,
  Upload,
  Download,
  Settings,
  Shield
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock profile data
const profileData = {
  consultant: {
    id: '1',
    name: 'John Consultant',
    email: 'john@company.com',
    department: 'Development',
    role: 'consultant',
    employeeId: 'EMP001',
    skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    joinDate: '2022-03-15',
    benchStartDate: '2024-01-01',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Experienced full-stack developer with 5+ years in modern web technologies.',
    experience: '5 years',
    education: 'BS Computer Science',
    certifications: ['AWS Solutions Architect', 'React Professional']
  },
  admin: {
    id: '2',
    name: 'Sarah Admin',
    email: 'sarah@company.com',
    department: 'HR',
    role: 'admin',
    employeeId: 'ADM001',
    joinDate: '2021-08-10',
    phone: '+1 (555) 987-6543',
    location: 'San Francisco, CA',
    bio: 'HR administrator specializing in consultant management and workforce optimization.',
    permissions: ['user_management', 'report_access', 'system_admin']
  }
};

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(
    user?.role === 'consultant' ? profileData.consultant : profileData.admin
  );

  const handleSave = () => {
    // In real app, this would call an API to update the profile
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleFileUpload = (type: 'resume' | 'avatar') => {
    // In real app, this would handle file upload
    toast({
      title: `${type === 'resume' ? 'Resume' : 'Avatar'} Upload`,
      description: `${type === 'resume' ? 'Resume' : 'Profile picture'} upload functionality would be implemented here.`,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account information and preferences
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" aria-hidden="true" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Settings className="h-4 w-4 mr-2" aria-hidden="true" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <User className="h-4 w-4" aria-hidden="true" />
            General
          </TabsTrigger>
          <TabsTrigger value="professional" className="flex items-center gap-2">
            <Building className="h-4 w-4" aria-hidden="true" />
            Professional
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" aria-hidden="true" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* General Information */}
        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Picture */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>
                  Upload a professional profile photo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center">
                  <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-16 w-16 text-primary" aria-hidden="true" />
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleFileUpload('avatar')}
                  disabled={!isEditing}
                >
                  <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
                  Upload Photo
                </Button>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Professional Information */}
        <TabsContent value="professional" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Professional Details</CardTitle>
              <CardDescription>
                Your work-related information and achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Employee ID</Label>
                  <Input value={formData.employeeId || formData.id} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Input value={formData.department} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Badge variant="outline" className="w-fit">
                    {formData.role === 'consultant' ? 'Consultant' : 'Administrator'}
                  </Badge>
                </div>
              </div>

              <Separator />

              {user?.role === 'consultant' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Experience Level</Label>
                      <Input 
                        value={(formData as any).experience || ''} 
                        disabled={!isEditing}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Education</Label>
                      <Input 
                        value={(formData as any).education || ''} 
                        disabled={!isEditing}
                        onChange={(e) => handleInputChange('education', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Technical Skills</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {((formData as any).skills || []).map((skill: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Certifications</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {((formData as any).certifications || []).map((cert: string, index: number) => (
                          <Badge key={index} className="bg-status-completed text-white">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Resume</Label>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleFileUpload('resume')}
                          disabled={!isEditing}
                        >
                          <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
                          Upload New
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                          Download Current
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Last updated: January 15, 2024
                    </p>
                  </div>
                </>
              )}

              {user?.role === 'admin' && (
                <div className="space-y-4">
                  <div>
                    <Label>System Permissions</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {((formData as any).permissions || []).map((permission: string, index: number) => (
                        <Badge key={index} className="bg-primary text-primary-foreground">
                          {permission.replace('_', ' ').toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Password</h4>
                  <Button variant="outline">
                    Change Password
                  </Button>
                  <p className="text-sm text-muted-foreground mt-1">
                    Last changed: December 20, 2023
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Account Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Join Date:</span>
                      <span className="ml-2">{formData.joinDate}</span>
                    </div>
                    {user?.role === 'consultant' && (
                      <div>
                        <span className="text-muted-foreground">Bench Start:</span>
                        <span className="ml-2">{(formData as any).benchStartDate}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground">Account Status:</span>
                      <Badge className="ml-2 bg-status-completed text-white">Active</Badge>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Login:</span>
                      <span className="ml-2">Today, 9:30 AM</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Privacy Settings</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      Download My Data
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Request a copy of your personal data stored in the system.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}