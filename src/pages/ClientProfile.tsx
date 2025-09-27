import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProgressBar } from "@/components/ProgressBar";
import StatusIndicator from "@/components/StatusIndicator";
import { Calendar, FileText, Camera, AlertTriangle, CreditCard, Shield, Home, LogOut, CheckCircle, Clock, DollarSign } from "lucide-react";

const ClientProfile: React.FC<{ theme: "dark" | "light" }> = ({ theme }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data from old client dashboard
  const projectData = {
    clientName: "Metro Construction Ltd.",
    projectName: "Residential Complex - Phase 2",
    progress: 68,
    budget: { planned: 2500000, spent: 1650000 },
    timeline: { totalDays: 180, completedDays: 122 },
    milestones: { delivered: 8, pending: 4 },
    approvalsTotal: 5
  };

  const siteReports = [
    { date: "2024-01-15", type: "Daily", photos: 12, status: "Completed" },
    { date: "2024-01-14", type: "Daily", photos: 8, status: "Completed" },
    { date: "2024-01-08", type: "Weekly", photos: 45, status: "Completed" },
    { date: "2024-01-01", type: "Monthly", photos: 120, status: "Completed" }
  ];

  const issueLog = [
    { id: "T001", title: "Foundation Concrete Quality", status: "Resolved", contractor: "ABC Contractors", solution: "Replaced with Grade M25 concrete" },
    { id: "T002", title: "Electrical Wiring Delay", status: "In Progress", contractor: "ElectroMax", solution: "Additional workforce deployed" },
    { id: "T003", title: "Water Seepage Issue", status: "Resolved", contractor: "WaterProof Pro", solution: "Applied polymer-based waterproofing" }
  ];

  const paymentHistory = [
    { date: "2024-01-10", recipient: "ABC Contractors", amount: 150000, type: "Construction", status: "Paid" },
    { date: "2024-01-05", recipient: "Design Architects", amount: 75000, type: "Architecture", status: "Paid" },
    { date: "2024-01-01", recipient: "ElectroMax", amount: 45000, type: "Electrical", status: "Pending" }
  ];

  const complianceDocuments = [
    { name: "Building Permit", status: "Approved", date: "2023-12-15" },
    { name: "Environmental Clearance", status: "Approved", date: "2023-12-20" },
    { name: "Fire Safety Certificate", status: "Pending", date: "2024-01-20" },
    { name: "Structural Stability Report", status: "Approved", date: "2024-01-10" }
  ];

  const handleLogout = () => navigate("/");

  const containerClass = theme === "dark"
    ? "bg-transparent text-white min-h-screen transition-colors duration-300 p-6"
    : "bg-transparent text-black min-h-screen transition-colors duration-300 p-6";

  // Status Indicators
  const getStatusItems = () => {
    const items = [];
    // Progress
    items.push({
      section: "Project Progress",
      status: projectData.progress >= 90 ? "good" : projectData.progress >= 60 ? "warning" : "critical",
      message: `Progress: ${projectData.progress}%`
    });
    // Budget
    const budgetUtilization = (projectData.budget.spent / projectData.budget.planned) * 100;
    items.push({
      section: "Budget Status",
      status: budgetUtilization <= 80 ? "good" : budgetUtilization <= 95 ? "warning" : "critical",
      message: `Used: ₹${projectData.budget.spent.toLocaleString()} of ₹${projectData.budget.planned.toLocaleString()}`
    });
    // Approvals
    items.push({
      section: "Pending Approvals",
      status: projectData.approvalsTotal <= 2 ? "good" : projectData.approvalsTotal <= 4 ? "warning" : "critical",
      message: `${projectData.approvalsTotal} approvals pending`
    });
    // Issues
    const unresolved = issueLog.filter(i => i.status !== "Resolved").length;
    items.push({
      section: "Unresolved Issues",
      status: unresolved === 0 ? "good" : unresolved <= 1 ? "warning" : "critical",
      message: `${unresolved} unresolved issues`
    });
    return items;
  };

  return (
    <div className={containerClass + " relative"}>
      {/* Premium header */}
      <header className="glass-nav h-20 flex items-center justify-between px-8 backdrop-blur-xl border-b border-glass relative z-50">
        <div className="flex items-center gap-6">
          <Home className="w-6 h-6 text-secondary" />
          <div>
            <h1 className="text-2xl font-bold text-gradient">{projectData.clientName}</h1>
            <p className="text-sm text-muted-foreground font-medium">{projectData.projectName}</p>
          </div>
        </div>
        <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut className="w-4 h-4" /> Logout
        </Button>
      </header>

      <div className="p-8 space-y-8">
        {/* Status Overview */}
        <StatusIndicator title="Project Status Overview" statusItems={getStatusItems()} />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 p-2 gap-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-4">
                <CheckCircle className="w-6 h-6 text-success" />
                <p className="font-semibold mt-2">Project Progress</p>
                <ProgressBar current={projectData.progress} total={100} />
              </div>
              <div className="glass-card p-4">
                <DollarSign className="w-6 h-6 text-warning" />
                <p className="font-semibold mt-2">Budget Utilization</p>
                <ProgressBar current={projectData.budget.spent} total={projectData.budget.planned} />
              </div>
              <div className="glass-card p-4">
                <Calendar className="w-6 h-6 text-secondary" />
                <p className="font-semibold mt-2">Timeline</p>
                <ProgressBar current={projectData.timeline.completedDays} total={projectData.timeline.totalDays} />
              </div>
              <div className="glass-card p-4">
                <Clock className="w-6 h-6 text-destructive" />
                <p className="font-semibold mt-2">Pending Approvals</p>
                <p>{projectData.approvalsTotal}</p>
              </div>
            </div>
          </TabsContent>

          {/* Reports */}
          <TabsContent value="reports" className="mt-6">
            <div className="glass-card p-4">
              <h2 className="text-lg font-bold mb-4">Site Reports</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Photos</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {siteReports.map((r, idx) => (
                    <TableRow key={idx} className="hover:bg-glass-bg-secondary">
                      <TableCell>{r.date}</TableCell>
                      <TableCell>{r.type}</TableCell>
                      <TableCell>{r.photos}</TableCell>
                      <TableCell>{r.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Issues */}
          <TabsContent value="issues" className="mt-6">
            <div className="glass-card p-4">
              <h2 className="text-lg font-bold mb-4">Issue Log</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Contractor</TableHead>
                    <TableHead>Solution</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {issueLog.map(i => (
                    <TableRow key={i.id} className="hover:bg-glass-bg-secondary">
                      <TableCell>{i.id}</TableCell>
                      <TableCell>{i.title}</TableCell>
                      <TableCell>{i.status}</TableCell>
                      <TableCell>{i.contractor}</TableCell>
                      <TableCell>{i.solution}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Payments */}
          <TabsContent value="payments" className="mt-6">
            <div className="glass-card p-4">
              <h2 className="text-lg font-bold mb-4">Payment History</h2>
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
                  {paymentHistory.map((p, idx) => (
                    <TableRow key={idx} className="hover:bg-glass-bg-secondary">
                      <TableCell>{p.date}</TableCell>
                      <TableCell>{p.recipient}</TableCell>
                      <TableCell>₹{p.amount.toLocaleString()}</TableCell>
                      <TableCell>{p.type}</TableCell>
                      <TableCell>
                        <Badge variant={p.status === "Paid" ? "secondary" : "destructive"}>
                          {p.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Compliance */}
          <TabsContent value="compliance" className="mt-6">
            <div className="glass-card p-4">
              <h2 className="text-lg font-bold mb-4">Compliance Documents</h2>
              {complianceDocuments.map((doc, idx) => (
                <div key={idx} className="glass-container p-4 rounded-md mb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">Updated: {doc.date}</p>
                    </div>
                    <Badge variant={doc.status === "Approved" ? "secondary" : "destructive"}>{doc.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default ClientProfile;
