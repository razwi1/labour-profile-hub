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
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-secondary/10 blur-xl animate-float" />
      <div className="absolute bottom-32 right-20 w-24 h-24 rounded-full bg-success/10 blur-xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-10 w-16 h-16 rounded-full bg-warning/10 blur-xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10">
        {/* Premium Header */}
        <header className="glass-nav h-20 flex items-center justify-between px-8 backdrop-blur-glass border-b border-glass relative z-50">
          <div className="flex items-center gap-6">
            <div className="neuro-container p-3 rounded-xl">
              <Home className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient">{projectData.clientName}</h1>
              <p className="text-sm text-muted-foreground font-medium">{projectData.projectName}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            onClick={handleLogout} 
            className="btn-glass flex items-center gap-2 hover:shadow-glow"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </header>

        <div className="p-8 space-y-8">
          {/* Status Overview */}
          <div className="animate-fade-in">
            <StatusIndicator 
              title="Project Status Overview"
              statusItems={getStatusItems()}
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="glass-container grid w-full grid-cols-2 lg:grid-cols-5 p-2">
              <TabsTrigger value="overview" className="data-[state=active]:bg-accent data-[state=active]:text-primary">Overview</TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-accent data-[state=active]:text-primary">Reports</TabsTrigger>
              <TabsTrigger value="issues" className="data-[state=active]:bg-accent data-[state=active]:text-primary">Issues</TabsTrigger>
              <TabsTrigger value="payments" className="data-[state=active]:bg-accent data-[state=active]:text-primary">Payments</TabsTrigger>
              <TabsTrigger value="compliance" className="data-[state=active]:bg-accent data-[state=active]:text-primary">Compliance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="dashboard-grid mb-8">
                {/* Progress Card */}
                <div className="dashboard-card hover-lift">
                  <div className="flex items-center gap-4">
                    <div className="neuro-container p-4 rounded-2xl">
                      <CheckCircle className="w-8 h-8 text-success" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Project Progress</p>
                      <p className="text-3xl font-bold text-gradient">{projectData.progress}%</p>
                      <Progress value={projectData.progress} className="mt-2" />
                    </div>
                  </div>
                </div>

                {/* Budget Card */}
                <div className="dashboard-card hover-lift">
                  <div className="flex items-center gap-4">
                    <div className="neuro-container p-4 rounded-2xl">
                      <DollarSign className="w-8 h-8 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Budget Status</p>
                      <p className="text-3xl font-bold text-gradient">₹{(projectData.budget.spent / 100000).toFixed(1)}L</p>
                      <p className="text-sm text-muted-foreground">of ₹{(projectData.budget.planned / 100000).toFixed(1)}L planned</p>
                      <Progress value={(projectData.budget.spent / projectData.budget.planned) * 100} className="mt-2" />
                    </div>
                  </div>
                </div>

                {/* Timeline Card */}
                <div className="dashboard-card hover-lift">
                  <div className="flex items-center gap-4">
                    <div className="neuro-container p-4 rounded-2xl">
                      <CalendarIcon className="w-8 h-8 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Timeline</p>
                      <p className="text-3xl font-bold text-gradient">{projectData.timeline.completedDays}</p>
                      <p className="text-sm text-muted-foreground">of {projectData.timeline.totalDays} days</p>
                      <Progress value={(projectData.timeline.completedDays / projectData.timeline.totalDays) * 100} className="mt-2" />
                    </div>
                  </div>
                </div>

                {/* Approvals Card */}
                <div className="dashboard-card hover-lift">
                  <div className="flex items-center gap-4">
                    <div className="neuro-container p-4 rounded-2xl">
                      <Clock className="w-8 h-8 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Pending Approvals</p>
                      <p className="text-3xl font-bold text-gradient">{projectData.approvalsTotal}</p>
                      <p className="text-sm text-muted-foreground">requiring attention</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Progress Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-6 hover-lift">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="neuro-container p-3 rounded-xl">
                      <DollarSign className="w-6 h-6 text-secondary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Budget Breakdown</h2>
                  </div>
                  <ProgressBar 
                    current={projectData.budget.spent} 
                    total={projectData.budget.planned}
                    className="mb-6"
                  />
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg">
                      <span className="text-muted-foreground">Remaining Budget:</span>
                      <span className="font-bold text-foreground">₹{((projectData.budget.planned - projectData.budget.spent) / 100000).toFixed(1)}L</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-muted-foreground">Budget Utilization:</span>
                      <span className="font-bold text-foreground">{((projectData.budget.spent / projectData.budget.planned) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 hover-lift">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="neuro-container p-3 rounded-xl">
                      <CheckCircle className="w-6 h-6 text-secondary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Milestones Status</h2>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-lg text-muted-foreground">Delivered Milestones</span>
                      <Badge className="bg-success/20 text-success border-success/30 px-4 py-2 text-lg font-semibold">
                        {projectData.milestones.delivered} Complete
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg text-muted-foreground">Pending Milestones</span>
                      <Badge variant="outline" className="px-4 py-2 text-lg font-semibold">
                        {projectData.milestones.pending} Pending
                      </Badge>
                    </div>
                    <Progress 
                      value={(projectData.milestones.delivered / (projectData.milestones.delivered + projectData.milestones.pending)) * 100} 
                      className="mt-6"
                    />
                  </div>
                </div>
              </div>
          </TabsContent>

            <TabsContent value="reports" className="mt-8">
              <div className="glass-card p-6 hover-lift">
                <div className="flex items-center gap-3 mb-6">
                  <div className="neuro-container p-3 rounded-xl">
                    <Camera className="w-6 h-6 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Site Photos & Reports</h2>
                </div>
                <div className="glass-table">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-foreground font-semibold">Date</TableHead>
                        <TableHead className="text-foreground font-semibold">Report Type</TableHead>
                        <TableHead className="text-foreground font-semibold">Photos</TableHead>
                        <TableHead className="text-foreground font-semibold">Status</TableHead>
                        <TableHead className="text-foreground font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {siteReports.map((report, index) => (
                        <TableRow key={index} className="hover:bg-glass-bg-secondary">
                          <TableCell className="font-medium">{report.date}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-glass-accent">{report.type}</Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{report.photos} photos</TableCell>
                          <TableCell>
                            <Badge className="bg-success/20 text-success border-success/30">
                              {report.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="btn-glass">View</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="issues" className="mt-8">
              <div className="glass-card p-6 hover-lift">
                <div className="flex items-center gap-3 mb-6">
                  <div className="neuro-container p-3 rounded-xl">
                    <AlertTriangle className="w-6 h-6 text-warning" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Issue Log & Resolutions</h2>
                </div>
                <div className="glass-table">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-foreground font-semibold">Ticket ID</TableHead>
                        <TableHead className="text-foreground font-semibold">Issue Title</TableHead>
                        <TableHead className="text-foreground font-semibold">Status</TableHead>
                        <TableHead className="text-foreground font-semibold">Contractor</TableHead>
                        <TableHead className="text-foreground font-semibold">Solution</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {issueLog.map((issue) => (
                        <TableRow key={issue.id} className="hover:bg-glass-bg-secondary">
                          <TableCell className="font-mono text-secondary">{issue.id}</TableCell>
                          <TableCell className="font-medium">{issue.title}</TableCell>
                          <TableCell>
                            <Badge variant={issue.status === 'Resolved' ? 'secondary' : 'outline'}
                                   className={issue.status === 'Resolved' ? 'bg-success/20 text-success border-success/30' : 'border-glass-accent'}>
                              {issue.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{issue.contractor}</TableCell>
                          <TableCell className="max-w-xs truncate text-muted-foreground">{issue.solution}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payments" className="mt-8">
              <div className="glass-card p-6 hover-lift">
                <div className="flex items-center gap-3 mb-6">
                  <div className="neuro-container p-3 rounded-xl">
                    <CreditCard className="w-6 h-6 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Payment History</h2>
                </div>
                <div className="glass-table">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-foreground font-semibold">Date</TableHead>
                        <TableHead className="text-foreground font-semibold">Recipient</TableHead>
                        <TableHead className="text-foreground font-semibold">Amount</TableHead>
                        <TableHead className="text-foreground font-semibold">Type</TableHead>
                        <TableHead className="text-foreground font-semibold">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paymentHistory.map((payment, index) => (
                        <TableRow key={index} className="hover:bg-glass-bg-secondary">
                          <TableCell className="font-medium">{payment.date}</TableCell>
                          <TableCell className="text-muted-foreground">{payment.recipient}</TableCell>
                          <TableCell className="font-bold text-foreground">₹{payment.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="border-glass-accent">{payment.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={payment.status === 'Paid' ? 'secondary' : 'destructive'}
                                   className={payment.status === 'Paid' ? 'bg-success/20 text-success border-success/30' : 'bg-destructive/20 text-destructive border-destructive/30'}>
                              {payment.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="mt-8">
              <div className="glass-card p-6 hover-lift">
                <div className="flex items-center gap-3 mb-6">
                  <div className="neuro-container p-3 rounded-xl">
                    <Shield className="w-6 h-6 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Compliance Documents</h2>
                </div>
                <div className="space-y-4">
                  {complianceDocuments.map((doc, index) => (
                    <div key={index} className="glass-container p-6 rounded-xl hover:bg-glass-bg-secondary transition-all duration-300">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="neuro-container p-3 rounded-xl">
                            <FileText className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-semibold text-lg text-foreground">{doc.name}</p>
                            <p className="text-muted-foreground">Updated: {doc.date}</p>
                          </div>
                        </div>
                        <Badge variant={doc.status === 'Approved' ? 'secondary' : 'destructive'}
                               className={doc.status === 'Approved' ? 'bg-success/20 text-success border-success/30 px-4 py-2 text-lg font-semibold' : 'bg-destructive/20 text-destructive border-destructive/30 px-4 py-2 text-lg font-semibold'}>
                          {doc.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;