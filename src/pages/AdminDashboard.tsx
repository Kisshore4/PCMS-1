import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Users, Briefcase, FileText, TrendingUp } from "lucide-react";
import { ConsultantFilter } from "@/components/Admin/ConsultantFilter";
import { ConsultantTable } from "@/components/Admin/ConsultantTable";
import { AIAgentQueue } from "@/components/Admin/AIAgentQueue";

const AdminDashboard: React.FC = () => {
  const [showReport, setShowReport] = useState(false);
  const [showLogs, setShowLogs] = useState(false);

  const metrics = [
    {
      title: "Total Consultants",
      description: "Across all departments",
      value: 42,
      icon: Users,
    },
    {
      title: "Bench Consultants",
      description: "Available for allocation",
      value: 8,
      icon: Briefcase,
    },
    {
      title: "Ongoing Projects",
      description: "Currently active",
      value: 16,
      icon: TrendingUp,
    },
    {
      title: "Reports Generated",
      description: "This month",
      value: 31,
      icon: FileText,
    },
  ];

  const upcomingReviews = [
    { name: "John Doe", due: "Aug 2" },
    { name: "Riya Sharma", due: "Aug 5" },
    { name: "Akash M", due: "Aug 7" },
  ];

  const dummyReport = [
    { id: 1, name: "John Doe", project: "AI Chatbot", hours: 120 },
    { id: 2, name: "Riya Sharma", project: "Cloud Migration", hours: 98 },
  ];

  const dummyLogs = [
    { id: 1, action: "Logged in", time: "10:00 AM" },
    { id: 2, action: "Updated profile", time: "10:30 AM" },
    { id: 3, action: "Viewed reports", time: "11:00 AM" },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Overview of system metrics and management options.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <Separator />
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Add New Consultant</Button>
          <Button variant="outline" onClick={() => setShowReport(!showReport)}>
            Generate Report
          </Button>
          <Button variant="ghost" onClick={() => setShowLogs(!showLogs)}>
            View Logs
          </Button>
        </div>

        {/* Dummy Report Data */}
        {showReport && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Generated Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                {dummyReport.map((report) => (
                  <li key={report.id}>
                    {report.name} – Project: <strong>{report.project}</strong> – Hours: <strong>{report.hours}</strong>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Dummy Logs */}
        {showLogs && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Activity Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1">
                {dummyLogs.map((log) => (
                  <li key={log.id}>
                    {log.action} at <strong>{log.time}</strong>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Status Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Bench Utilization</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              Utilization is improving steadily.
            </p>
            <Badge className="text-sm" variant="default">
              85% Allocated
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Reviews</CardTitle>
            <CardDescription>Consultants pending review</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm list-disc list-inside space-y-1">
              {upcomingReviews.map((review, idx) => (
                <li key={idx}>
                  {review.name} -{" "}
                  <span className="font-medium">Due {review.due}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
