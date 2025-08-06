import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  addOpportunity,
  opportunities,
  loadOpportunities,
} from '@/services/opportunityStore';
import { differenceInDays, parseISO } from "date-fns";

// Helper for CSV export
const exportToCSV = (data: any[], filename = "opportunities.csv") => {
  const csvRows = [
    ["Title", "Description", "Consultant Email", "Start Date", "End Date", "Status"],
    ...data.map(opp => [
      opp.title, opp.description, opp.consultantEmail, opp.startDate, opp.endDate, opp.status
    ])
  ];
  const csvContent = csvRows.map(e => e.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const OpportunitiesAdmin: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [consultantEmail, setConsultantEmail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [refresh, setRefresh] = useState(0);

  // Search, filter, sort, pagination
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState<'startDate' | 'endDate' | 'duration' | 'status'>('startDate');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [showConsultantDetails, setShowConsultantDetails] = useState<string | null>(null);

  useEffect(() => {
    loadOpportunities();
    setRefresh(prev => prev + 1);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !consultantEmail || !startDate || !endDate) return;

    const newOpportunity = {
      id: Date.now().toString(),
      title,
      description,
      consultantEmail,
      startDate,
      endDate,
      status: 'pending' as const,
    };

    addOpportunity(newOpportunity);
    setTitle('');
    setDescription('');
    setConsultantEmail('');
    setStartDate('');
    setEndDate('');
    setRefresh(prev => prev + 1);
  };

  const deleteOpportunity = (id: string) => {
    const index = opportunities.findIndex(o => o.id === id);
    if (index !== -1) {
      opportunities.splice(index, 1);
      setRefresh(r => r + 1);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'accepted':
        return <Badge className="bg-green-500">Accepted</Badge>;
      case 'declined':
        return <Badge variant="destructive">Declined</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getDuration = (start: string, end: string) => {
    if (!start || !end) return "-";
    try {
      const days = differenceInDays(parseISO(end), parseISO(start));
      return days >= 0 ? `${days} day${days !== 1 ? "s" : ""}` : "-";
    } catch {
      return "-";
    }
  };

  // Filter, search, sort, paginate
  let filtered = opportunities.filter(opp =>
    (!search || opp.title.toLowerCase().includes(search.toLowerCase()) || opp.consultantEmail.toLowerCase().includes(search.toLowerCase())) &&
    (!statusFilter || opp.status === statusFilter)
  );
  filtered = filtered.sort((a, b) => {
    let valA: number | string = '';
    let valB: number | string = '';
    switch (sortBy) {
      case 'startDate':
        valA = new Date(String(a.startDate)).getTime();
        valB = new Date(String(b.startDate)).getTime();
        break;
      case 'endDate':
        valA = new Date(String(a.endDate)).getTime();
        valB = new Date(String(b.endDate)).getTime();
        break;
      case 'duration':
        valA = differenceInDays(parseISO(String(a.endDate)), parseISO(String(a.startDate)));
        valB = differenceInDays(parseISO(String(b.endDate)), parseISO(String(b.startDate)));
        break;
      case 'status':
        valA = a.status;
        valB = b.status;
        break;
      default:
        valA = new Date(String(a.startDate)).getTime();
        valB = new Date(String(b.startDate)).getTime();
    }
    if (typeof valA === 'string' && typeof valB === 'string') {
      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    } else {
      return sortDir === 'asc'
        ? (valA as number) - (valB as number)
        : (valB as number) - (valA as number);
    }
  });
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Metrics calculation
  const consultantMetrics = useMemo(() => {
    const grouped: Record<string, { total: number; accepted: number; declined: number; pending: number }> = {};
    opportunities.forEach(o => {
      if (!grouped[o.consultantEmail]) {
        grouped[o.consultantEmail] = { total: 0, accepted: 0, declined: 0, pending: 0 };
      }
      grouped[o.consultantEmail].total++;
      grouped[o.consultantEmail][o.status]++;
    });
    return grouped;
  }, [refresh]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Assign Opportunities</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Create and assign opportunities to consultants
        </p>
      </div>

      {/* Assignment Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Opportunity</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Opportunity Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <Input placeholder="Consultant Email" value={consultantEmail} onChange={(e) => setConsultantEmail(e.target.value)} required />
            <div className="flex gap-4">
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </div>
            <Button type="submit">Assign Opportunity</Button>
          </form>
        </CardContent>
      </Card>

      <Separator />

      {/* Consultant Metrics */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Consultant Performance</h2>
        {Object.entries(consultantMetrics).map(([email, stats]) => {
          const responseRate = ((stats.accepted + stats.declined) / stats.total) * 100 || 0;
          const completionRate = (stats.accepted / stats.total) * 100 || 0;
          const engagementRate = ((stats.accepted) / (stats.accepted + stats.declined || 1)) * 100 || 0;
          return (
            <Card key={email} className="mb-3">
              <CardContent className="py-3">
                <p><strong>{email}</strong></p>
                <p>Opportunities Provided: {stats.total}</p>
                <p>Accepted: {stats.accepted}</p>
                <p>Declined: {stats.declined}</p>
                <Button size="sm" className="mt-2" onClick={() => setShowConsultantDetails(email)}>View Details</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Opportunities Table */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Assigned Opportunities</h2>
        {filtered.length === 0 ? (
          <p className="text-muted-foreground">No opportunities assigned yet.</p>
        ) : (
          <div className="space-y-4">
            {paged.map((opp) => (
              <Card key={opp.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{opp.title}</CardTitle>
                    {getStatusBadge(opp.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{opp.description}</p>
                  <p className="text-xs text-muted-foreground">Assigned to: {opp.consultantEmail}</p>
                  <p className="text-xs text-muted-foreground">Duration: {getDuration(opp.startDate, opp.endDate)}</p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="destructive" onClick={() => deleteOpportunity(opp.id)}>Delete</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            {/* Pagination */}
            <div className="flex gap-2 mt-4">
              <Button size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</Button>
              <span className="text-xs mt-2">Page {page} of {totalPages}</span>
              <Button size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
            </div>
          </div>
        )}
      </div>

      {/* Consultant Details Modal */}
      {showConsultantDetails && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">Consultant: {showConsultantDetails}</h3>
            {opportunities.filter(o => o.consultantEmail === showConsultantDetails).map(o => (
              <div key={o.id} className="border-b py-2">
                <p className="font-medium">{o.title}</p>
                <p className="text-sm text-muted-foreground">{o.status}</p>
              </div>
            ))}
            <div className="flex gap-2 mt-4">
              <Button size="sm" onClick={() => setShowConsultantDetails(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpportunitiesAdmin;
