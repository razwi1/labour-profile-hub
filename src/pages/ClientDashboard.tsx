import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, FileText, Camera, AlertTriangle, CreditCard, Shield, Home, LogOut, CheckCircle, Clock, DollarSign, Calendar as CalendarIcon } from 'lucide-react';
import { ProgressBar } from '@/components/ProgressBar';
import StatusIndicator from '@/components/StatusIndicator';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const projectData = {
    clientName: "Metro Construction Ltd.",
    projectName: "Residential Complex - Phase 2",
    progress: 68,
    budget: {
      planned: 2500000,
      spent: 1650000
    },
    timeline: {
      totalDays: 180,
      completedDays: 122
    },
    milestones: {
      delivered: 8,
      pending: 4
    },
    approvalsTotal: 5
  };

  const siteReports = [
    { date: '2024-01-15', type: 'Daily', photos: 12, status: 'Completed' },
    { date: '2024-01-14', type: 'Daily', photos: 8, status: 'Completed' },
    { date: '2024-01-08', type: 'Weekly', photos: 45, status: 'Completed' },
    { date: '2024-01-01', type: 'Monthly', photos: 120, status: 'Completed' }
  ];

  const issueLog = [
    { id: 'T001', title: 'Foundation Concrete Quality', status: 'Resolved', contractor: 'ABC Contractors', solution: 'Replaced with Grade M25 concrete' },
    { id: 'T002', title: 'Electrical Wiring Delay', status: 'In Progress', contractor: 'ElectroMax', solution: 'Additional workforce deployed' },
    { id: 'T003', title: 'Water Seepage Issue', status: 'Resolved', contractor: 'WaterProof Pro', solution: 'Applied polymer-based waterproofing' }
  ];

  const paymentHistory = [
    { date: '2024-01-10', recipient: 'ABC Contractors', amount: 150000, type: 'Construction', status: 'Paid' },
    { date: '2024-01-05', recipient: 'Design Architects', amount: 75000, type: 'Architecture', status: 'Paid' },
    { date: '2024-01-01', recipient: 'ElectroMax', amount: 45000, type: 'Electrical', status: 'Pending' }
  ];

  const complianceDocuments = [
    { name: 'Building Permit', status: 'Approved', date: '2023-12-15' },
    { name: 'Environmental Clearance', status: 'Approved', date: '2023-12-20' },
    { name: 'Fire Safety Certificate', status: 'Pending', date: '2024-01-20' },
    { name: 'Structural Stability Report', status: 'Approved', date: '2024-01-10' }
  ];

  const handleLogout = () => {
    navigate('/');
  };

  // Generate status indicators based on project data
  const getStatusItems = () => {
    const items = [];
    
    // Progress Status
    if (projectData.progress >= 90) {
      items.push({ section: 'Project Progress', status: 'good' as const, message: 'Project is nearing completion' });
    } else if (projectData.progress >= 60) {
      items.push({ section: 'Project Progress', status: 'warning' as const, message: 'Project progressing but monitor timeline' });
    } else {
      items.push({ section: 'Project Progress', status: 'critical' as const, message: 'Project behind schedule', actionRequired: 'Review timeline and resources' });
    }

    // Budget Status
    const budgetUtilization = (projectData.budget.spent / projectData.budget.planned) * 100;
    if (budgetUtilization <= 80) {
      items.push({ section: 'Budget Management', status: 'good' as const, message: 'Budget is well controlled' });
    } else if (budgetUtilization <= 95) {
      items.push({ section: 'Budget Management', status: 'warning' as const, message: 'Budget utilization high, monitor expenses' });
    } else {
      items.push({ section: 'Budget Management', status: 'critical' as const, message: 'Budget overrun detected', actionRequired: 'Immediate cost review needed' });
    }

    // Approvals Status
    if (projectData.approvalsTotal === 0) {
      items.push({ section: 'Pending Approvals', status: 'good' as const, message: 'No pending approvals' });
    } else if (projectData.approvalsTotal <= 2) {
      items.push({ section: 'Pending Approvals', status: 'warning' as const, message: `${projectData.approvalsTotal} approvals pending` });
    } else {
      items.push({ section: 'Pending Approvals', status: 'critical' as const, message: `${projectData.approvalsTotal} approvals pending`, actionRequired: 'Review and expedite approvals' });
    }

    // Issues Status
    const unresolvedIssues = issueLog.filter(issue => issue.status !== 'Resolved').length;
    if (unresolvedIssues === 0) {
      items.push({ section: 'Issue Management', status: 'good' as const, message: 'All issues resolved' });
    } else if (unresolvedIssues <= 1) {
      items.push({ section: 'Issue Management', status: 'warning' as const, message: `${unresolvedIssues} issue in progress` });
    } else {
      items.push({ section: 'Issue Management', status: 'critical' as const, message: `${unresolvedIssues} unresolved issues`, actionRequired: 'Follow up with contractors' });
    }

    return items;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Home className="w-6 h-6 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">{projectData.clientName}</h1>
              <p className="text-sm text-muted-foreground">{projectData.projectName}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="p-6">
        {/* Status Overview */}
        <div className="mb-6">
          <StatusIndicator 
            title="Project Status Overview"
            statusItems={getStatusItems()}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Progress Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Project Progress</CardTitle>
                  <CheckCircle className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{projectData.progress}%</div>
                  <Progress value={projectData.progress} className="mt-2" />
                </CardContent>
              </Card>

              {/* Budget Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">₹{(projectData.budget.spent / 100000).toFixed(1)}L</div>
                  <p className="text-xs text-muted-foreground">of ₹{(projectData.budget.planned / 100000).toFixed(1)}L planned</p>
                  <Progress value={(projectData.budget.spent / projectData.budget.planned) * 100} className="mt-2" />
                </CardContent>
              </Card>

              {/* Timeline Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Timeline</CardTitle>
                  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{projectData.timeline.completedDays}</div>
                  <p className="text-xs text-muted-foreground">of {projectData.timeline.totalDays} days</p>
                  <Progress value={(projectData.timeline.completedDays / projectData.timeline.totalDays) * 100} className="mt-2" />
                </CardContent>
              </Card>

              {/* Approvals Card */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                  <Clock className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{projectData.approvalsTotal}</div>
                  <p className="text-xs text-muted-foreground">requiring attention</p>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Progress Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Budget Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProgressBar 
                    current={projectData.budget.spent} 
                    total={projectData.budget.planned}
                    className="mb-4"
                  />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Remaining Budget:</span>
                      <span className="font-medium">₹{((projectData.budget.planned - projectData.budget.spent) / 100000).toFixed(1)}L</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Budget Utilization:</span>
                      <span className="font-medium">{((projectData.budget.spent / projectData.budget.planned) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Milestones Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Delivered Milestones</span>
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        {projectData.milestones.delivered} Complete
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Pending Milestones</span>
                      <Badge variant="outline">
                        {projectData.milestones.pending} Pending
                      </Badge>
                    </div>
                    <Progress 
                      value={(projectData.milestones.delivered / (projectData.milestones.delivered + projectData.milestones.pending)) * 100} 
                      className="mt-4"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Site Photos & Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Report Type</TableHead>
                      <TableHead>Photos</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {siteReports.map((report, index) => (
                      <TableRow key={index}>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{report.type}</Badge>
                        </TableCell>
                        <TableCell>{report.photos} photos</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-success/10 text-success">
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Issue Log & Resolutions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Issue Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Contractor</TableHead>
                      <TableHead>Solution</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {issueLog.map((issue) => (
                      <TableRow key={issue.id}>
                        <TableCell className="font-mono">{issue.id}</TableCell>
                        <TableCell>{issue.title}</TableCell>
                        <TableCell>
                          <Badge variant={issue.status === 'Resolved' ? 'secondary' : 'outline'}
                                 className={issue.status === 'Resolved' ? 'bg-success/10 text-success' : ''}>
                            {issue.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{issue.contractor}</TableCell>
                        <TableCell className="max-w-xs truncate">{issue.solution}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentHistory.map((payment, index) => (
                      <TableRow key={index}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.recipient}</TableCell>
                        <TableCell>₹{payment.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{payment.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={payment.status === 'Paid' ? 'secondary' : 'destructive'}
                                 className={payment.status === 'Paid' ? 'bg-success/10 text-success' : ''}>
                            {payment.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Compliance Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">Updated: {doc.date}</p>
                        </div>
                      </div>
                      <Badge variant={doc.status === 'Approved' ? 'secondary' : 'destructive'}
                             className={doc.status === 'Approved' ? 'bg-success/10 text-success' : ''}>
                        {doc.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientDashboard;