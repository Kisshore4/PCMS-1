import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { StatusCard } from '@/components/Dashboard/StatusCard';
import { WorkflowProgressBar } from '@/components/Dashboard/WorkflowProgressBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ConsultantOpportunities from "@/components/Consultant/Opportunities";
import { 
  FileText, 
  Calendar, 
  Briefcase, 
  GraduationCap,
  TrendingUp
} from 'lucide-react';

// Mock data - in real app, this would come from API
const mockConsultantData = {
  resumeStatus: 'updated',
  attendanceReport: {
    completed: 18,
    missed: 2,
    total: 20
  },
  opportunities: 12,
  trainingProgress: 'in-progress',
  workflowSteps: [
    { id: 'resume', label: 'Resume Updated', completed: true, inProgress: false },
    { id: 'attendance', label: 'Attendance Reported', completed: true, inProgress: false },
    { id: 'opportunities', label: 'Opportunities Documented', completed: true, inProgress: false },
    { id: 'training', label: 'Training Completed', completed: false, inProgress: true }
  ],
  recentOpportunities: [
    { id: 1, title: 'Senior React Developer', company: 'TechCorp Inc.', date: '2024-01-15', status: 'Applied' },
    { id: 2, title: 'Full Stack Engineer', company: 'StartupXYZ', date: '2024-01-12', status: 'Interview Scheduled' },
    { id: 3, title: 'Frontend Lead', company: 'BigTech Ltd.', date: '2024-01-10', status: 'Under Review' }
  ],
  trainingModules: [
    { id: 1, name: 'Advanced React Patterns', progress: 85, status: 'in-progress' },
    { id: 2, name: 'System Design Fundamentals', progress: 100, status: 'completed' },
    { id: 3, name: 'Cloud Architecture AWS', progress: 30, status: 'in-progress' }
  ]
};

export default function ConsultantDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {user?.name}
        </h1>
        <p className="text-muted-foreground mt-2">
          Track your bench period progress and opportunities
        </p>
      </div>

      {/* Workflow Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" aria-hidden="true" />
            Workflow Progress
          </CardTitle>
          <CardDescription>
            Complete all steps to optimize your bench period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <WorkflowProgressBar steps={mockConsultantData.workflowSteps} />
        </CardContent>
      </Card>

      {/* Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          title="Resume Status"
          value="Updated"
          status={mockConsultantData.resumeStatus === 'updated' ? 'completed' : 'pending'}
          description="Last updated 3 days ago"
          icon={<FileText className="h-4 w-4" />}
        />

        
        
        <StatusCard
          title="Attendance Rate"
          value={`${Math.round((mockConsultantData.attendanceReport.completed / mockConsultantData.attendanceReport.total) * 100)}%`}
          status="completed"
          description={`${mockConsultantData.attendanceReport.completed}/${mockConsultantData.attendanceReport.total} sessions`}
          icon={<Calendar className="h-4 w-4" />}
        />
        
        <StatusCard
          title="Opportunities"
          value={mockConsultantData.opportunities}
          status="completed"
          description="Applications submitted"
          icon={<Briefcase className="h-4 w-4" />}
        />
        
        <StatusCard
          title="Training Progress"
          value="67%"
          status={mockConsultantData.trainingProgress as any}
          description="2 of 3 modules completed"
          icon={<GraduationCap className="h-4 w-4" />}
        />
      </div>

      {/* Detailed Information Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Opportunities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" aria-hidden="true" />
              Recent Opportunities
            </CardTitle>
            <CardDescription>
              Your latest job applications and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockConsultantData.recentOpportunities.map((opportunity) => (
                <div key={opportunity.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{opportunity.title}</h4>
                    <p className="text-sm text-muted-foreground">{opportunity.company}</p>
                    <p className="text-xs text-muted-foreground mt-1">{opportunity.date}</p>
                  </div>
                  <Badge variant="outline" className="ml-4">
                    {opportunity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Training Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />
              Training Modules
            </CardTitle>
            <CardDescription>
              Your current learning progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockConsultantData.trainingModules.map((module) => (
                <div key={module.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">{module.name}</h4>
                    <Badge 
                      className={module.status === 'completed' ? 'bg-status-completed text-white' : 'bg-status-in-progress text-white'}
                    >
                      {module.progress}%
                    </Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        module.status === 'completed' ? 'bg-status-completed' : 'bg-status-in-progress'
                      }`}
                      style={{ width: `${module.progress}%` }}
                      role="progressbar"
                      aria-valuenow={module.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${module.name} progress: ${module.progress}%`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" aria-hidden="true" />
            Attendance Report
          </CardTitle>
          <CardDescription>
            Detailed breakdown of your session attendance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <div className="text-2xl font-bold text-status-completed">
                {mockConsultantData.attendanceReport.completed}
              </div>
              <div className="text-sm text-muted-foreground">Completed Sessions</div>
            </div>
            <div className="text-center p-4 bg-destructive/10 rounded-lg">
              <div className="text-2xl font-bold text-status-missed">
                {mockConsultantData.attendanceReport.missed}
              </div>
              <div className="text-sm text-muted-foreground">Missed Sessions</div>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {Math.round((mockConsultantData.attendanceReport.completed / mockConsultantData.attendanceReport.total) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Attendance Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}