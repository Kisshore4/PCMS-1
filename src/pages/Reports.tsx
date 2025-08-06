import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  FileText, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar,
  PieChart
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock report data
const departmentStats = [
  { department: 'Development', total: 15, onBench: 8, placed: 7, avgBenchDays: 45 },
  { department: 'Design', total: 6, onBench: 2, placed: 4, avgBenchDays: 32 },
  { department: 'DevOps', total: 8, onBench: 3, placed: 5, avgBenchDays: 28 },
  { department: 'QA', total: 10, onBench: 5, placed: 5, avgBenchDays: 51 }
];

const monthlyTrends = [
  { month: 'Dec 2023', newToBench: 8, placed: 12, training: 15 },
  { month: 'Jan 2024', newToBench: 5, placed: 9, training: 18 },
  { month: 'Feb 2024', newToBench: 7, placed: 6, training: 22 }
];

const individualReports = [
  {
    id: '1',
    name: 'John Consultant',
    department: 'Development',
    benchDays: 23,
    opportunitiesApplied: 12,
    interviewsScheduled: 4,
    trainingCompleted: 2,
    attendanceRate: 95
  },
  {
    id: '2',
    name: 'Sarah Developer',
    department: 'Development',
    benchDays: 18,
    opportunitiesApplied: 8,
    interviewsScheduled: 2,
    trainingCompleted: 3,
    attendanceRate: 78
  }
];

export default function Reports() {
  const [selectedReportType, setSelectedReportType] = useState('department');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('3months');

  const handleExportReport = (reportType: string) => {
    toast({
      title: "Export Started",
      description: `Generating ${reportType} report for download`,
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generated",
      description: "Custom report has been generated with your selected criteria",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive reporting on consultant pool performance and metrics
        </p>
      </div>

      {/* Report Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />
            Generate Custom Report
          </CardTitle>
          <CardDescription>
            Configure your report parameters and export data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label htmlFor="reportType" className="text-sm font-medium">
                Report Type
              </label>
              <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                <SelectTrigger id="reportType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="department">Department Summary</SelectItem>
                  <SelectItem value="individual">Individual Consultant</SelectItem>
                  <SelectItem value="training">Training Progress</SelectItem>
                  <SelectItem value="opportunities">Opportunity Tracking</SelectItem>
                  <SelectItem value="attendance">Attendance Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="department" className="text-sm font-medium">
                Department
              </label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger id="department">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="devops">DevOps</SelectItem>
                  <SelectItem value="qa">Quality Assurance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="timeframe" className="text-sm font-medium">
                Timeframe
              </label>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger id="timeframe">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={handleGenerateReport} className="w-full">
                <FileText className="h-4 w-4 mr-2" aria-hidden="true" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Tabs */}
      <Tabs defaultValue="department" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="department" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" aria-hidden="true" />
            Department Analytics
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" aria-hidden="true" />
            Monthly Trends
          </TabsTrigger>
          <TabsTrigger value="individual" className="flex items-center gap-2">
            <Users className="h-4 w-4" aria-hidden="true" />
            Individual Reports
          </TabsTrigger>
        </TabsList>

        {/* Department Analytics */}
        <TabsContent value="department" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Department Performance Summary</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExportReport('department')}
                >
                  <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Department</TableHead>
                      <TableHead>Total Consultants</TableHead>
                      <TableHead>Currently on Bench</TableHead>
                      <TableHead>Placed This Quarter</TableHead>
                      <TableHead>Avg. Bench Days</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentStats.map((dept) => (
                      <TableRow key={dept.department}>
                        <TableCell className="font-medium">{dept.department}</TableCell>
                        <TableCell>{dept.total}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{dept.onBench}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-status-completed text-white">
                            {dept.placed}
                          </Badge>
                        </TableCell>
                        <TableCell>{dept.avgBenchDays} days</TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              dept.avgBenchDays < 35 
                                ? 'bg-status-completed text-white'
                                : dept.avgBenchDays < 50
                                ? 'bg-status-pending text-foreground'
                                : 'bg-status-missed text-white'
                            }
                          >
                            {dept.avgBenchDays < 35 ? 'Excellent' : 
                             dept.avgBenchDays < 50 ? 'Good' : 'Needs Improvement'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monthly Trends */}
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Monthly Trends & Metrics</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExportReport('trends')}
                >
                  <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">20</div>
                    <div className="text-sm text-muted-foreground">New to Bench (3mo)</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-status-completed">27</div>
                    <div className="text-sm text-muted-foreground">Total Placed (3mo)</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-status-in-progress">55</div>
                    <div className="text-sm text-muted-foreground">Training Sessions (3mo)</div>
                  </CardContent>
                </Card>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>New to Bench</TableHead>
                      <TableHead>Consultants Placed</TableHead>
                      <TableHead>Training Sessions</TableHead>
                      <TableHead>Placement Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlyTrends.map((trend) => (
                      <TableRow key={trend.month}>
                        <TableCell className="font-medium">{trend.month}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{trend.newToBench}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-status-completed text-white">
                            {trend.placed}
                          </Badge>
                        </TableCell>
                        <TableCell>{trend.training}</TableCell>
                        <TableCell>
                          <span className="font-medium text-status-completed">
                            {Math.round((trend.placed / (trend.newToBench + 5)) * 100)}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Individual Reports */}
        <TabsContent value="individual" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Individual Consultant Performance</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExportReport('individual')}
                >
                  <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Consultant</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Bench Days</TableHead>
                      <TableHead>Opportunities Applied</TableHead>
                      <TableHead>Interviews Scheduled</TableHead>
                      <TableHead>Training Completed</TableHead>
                      <TableHead>Attendance Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {individualReports.map((consultant) => (
                      <TableRow key={consultant.id}>
                        <TableCell className="font-medium">{consultant.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{consultant.department}</Badge>
                        </TableCell>
                        <TableCell>{consultant.benchDays} days</TableCell>
                        <TableCell>
                          <Badge className="bg-primary text-primary-foreground">
                            {consultant.opportunitiesApplied}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-status-in-progress text-white">
                            {consultant.interviewsScheduled}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-status-completed text-white">
                            {consultant.trainingCompleted}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className={`font-medium ${
                            consultant.attendanceRate >= 90 ? 'text-status-completed' :
                            consultant.attendanceRate >= 75 ? 'text-status-in-progress' :
                            'text-status-missed'
                          }`}>
                            {consultant.attendanceRate}%
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}