import React from 'react';
import UploadResume from '@/components/UploadResume';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  GraduationCap,
  ArrowRight,
  Shield,
  FileText
} from 'lucide-react';

const dashboardSummary = {
  consultant: {
    resumeStatus: 'updated',
    attendanceRate: 95,
    opportunitiesCount: 12,
    trainingProgress: 67,
    upcomingSessions: [
      { title: 'React Advanced Patterns', date: '2024-01-22', time: '10:00 AM' },
      { title: 'System Design Workshop', date: '2024-01-24', time: '2:00 PM' }
    ],
    recentActivity: [
      { type: 'opportunity', description: 'Applied to Senior React Developer position', time: '2 hours ago' },
      { type: 'training', description: 'Completed AWS Fundamentals module', time: '1 day ago' },
      { type: 'attendance', description: 'Attended Daily Standup meeting', time: '2 days ago' }
    ]
  },
  admin: {
    totalConsultants: 39,
    onBench: 18,
    needingAttention: 5,
    recentAlerts: [
      { type: 'attendance', consultant: 'Lisa Designer', description: 'Low attendance rate (65%)', priority: 'high' },
      { type: 'training', consultant: 'Mike Engineer', description: 'Training overdue', priority: 'medium' },
      { type: 'resume', consultant: 'Tom Developer', description: 'Resume not updated', priority: 'low' }
    ]
  }
};

export default function Home() {
  const { user } = useAuth();
  const isConsultant = user?.role === 'consultant';
  const consultantData = dashboardSummary.consultant;
  const adminData = dashboardSummary.admin;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center py-8 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-lg border">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Welcome to Pool CMS
        </h1>
        <p className="text-xl text-muted-foreground mb-4">
          Your comprehensive consultant management system
        </p>
        <Badge className="bg-primary text-primary-foreground text-sm px-4 py-1">
          {isConsultant ? 'Consultant Portal' : 'Administrator Dashboard'}
        </Badge>
      </div>

      {/* Quick Stats */}
      {isConsultant ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-status-completed/10 to-status-completed/5 border-status-completed/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Resume Status</p>
                    <p className="text-2xl font-bold text-status-completed">Updated</p>
                  </div>
                  <FileText className="h-8 w-8 text-status-completed" aria-hidden="true" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
                    <p className="text-2xl font-bold text-primary">{consultantData.attendanceRate}%</p>
                  </div>
                  <Calendar className="h-8 w-8 text-primary" aria-hidden="true" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-status-in-progress/10 to-status-in-progress/5 border-status-in-progress/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Opportunities</p>
                    <p className="text-2xl font-bold text-status-in-progress">{consultantData.opportunitiesCount}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-status-in-progress" aria-hidden="true" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-status-pending/10 to-status-pending/5 border-status-pending/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Training Progress</p>
                    <p className="text-2xl font-bold text-status-pending">{consultantData.trainingProgress}%</p>
                  </div>
                  <GraduationCap className="h-8 w-8 text-status-pending" aria-hidden="true" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upload Resume Section */}
          <UploadResume />
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Consultants</p>
                  <p className="text-2xl font-bold text-primary">{adminData.totalConsultants}</p>
                </div>
                <Users className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-status-in-progress/10 to-status-in-progress/5 border-status-in-progress/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">On Bench</p>
                  <p className="text-2xl font-bold text-status-in-progress">{adminData.onBench}</p>
                </div>
                <Calendar className="h-8 w-8 text-status-in-progress" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-status-missed/10 to-status-missed/5 border-status-missed/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Need Attention</p>
                  <p className="text-2xl font-bold text-status-missed">{adminData.needingAttention}</p>
                </div>
                <Shield className="h-8 w-8 text-status-missed" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              {isConsultant ? 'Manage your bench activities' : 'Administrative functions'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {isConsultant ? (
              <>
                <Button asChild className="w-full justify-between">
                  <Link to="/consultant-dashboard">
                    View My Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-between">
                  <Link to="/profile">
                    Update Profile & Resume
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-between">
                  <Link to="/reports">
                    View My Reports
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild className="w-full justify-between">
                  <Link to="/admin-dashboard">
                    Admin Console
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-between">
                  <Link to="/reports">
                    Generate Reports
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity / Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>{isConsultant ? 'Recent Activity' : 'Recent Alerts'}</CardTitle>
            <CardDescription>
              {isConsultant ? 'Your latest activities and updates' : 'Items requiring your attention'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isConsultant
                ? consultantData.recentActivity.map((activity, i) => (
                    <div key={i} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'opportunity'
                            ? 'bg-primary'
                            : activity.type === 'training'
                            ? 'bg-status-completed'
                            : 'bg-status-in-progress'
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))
                : adminData.recentAlerts.map((alert, i) => (
                    <div key={i} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          alert.priority === 'high'
                            ? 'bg-status-missed'
                            : alert.priority === 'medium'
                            ? 'bg-status-pending'
                            : 'bg-status-in-progress'
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{alert.consultant}</p>
                        <p className="text-xs text-muted-foreground">{alert.description}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          alert.priority === 'high'
                            ? 'border-status-missed text-status-missed'
                            : alert.priority === 'medium'
                            ? 'border-status-pending text-status-pending'
                            : 'border-status-in-progress text-status-in-progress'
                        }
                      >
                        {alert.priority}
                      </Badge>
                    </div>
                  ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Sessions */}
      {isConsultant && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Training Sessions
            </CardTitle>
            <CardDescription>Your scheduled learning sessions this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {consultantData.upcomingSessions.map((session, i) => (
                <div
                  key={i}
                  className="p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <h4 className="font-medium text-foreground">{session.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {session.date} at {session.time}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
