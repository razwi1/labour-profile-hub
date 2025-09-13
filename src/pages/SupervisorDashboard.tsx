import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  User, 
  Building2, 
  UserPlus,
  Edit,
  Trash2,
  IndianRupee,
  Clock,
  TrendingUp,
  Users,
  LogOut,
  CheckCircle,
  XCircle,
  MapPin,
  Target
} from "lucide-react";
import { StarRating } from "@/components/StarRating";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import WorkerLocationMap from "@/components/WorkerLocationMap";
import StatusIndicator from "@/components/StatusIndicator";
import { GlassDashboardLayout } from "@/components/layout/GlassDashboardLayout";
import workerProfile from "@/assets/worker-profile.jpg";

interface Employee {
  id: number;
  name: string;
  role: string;
  attendance: boolean;
  hoursWorked: number;
  supervisorRating: number;
  dailySalary: number;
  overallRating: number;
  avatar?: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'active' | 'break' | 'offline';
}

const SupervisorDashboard = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "Rajesh Kumar",
      role: "Senior Mason",
      attendance: true,
      hoursWorked: 8,
      supervisorRating: 4.5,
      dailySalary: 800,
      overallRating: 4.7,
      avatar: workerProfile,
      location: { lat: 19.0760, lng: 72.8777, address: "Block A - Foundation" },
      status: 'active' as const
    },
    {
      id: 2,
      name: "Amit Singh",
      role: "Steel Fixer",
      attendance: true,
      hoursWorked: 7.5,
      supervisorRating: 4.2,
      dailySalary: 750,
      overallRating: 4.3,
      location: { lat: 19.0761, lng: 72.8778, address: "Block A - Level 2" },
      status: 'active' as const
    },
    {
      id: 3,
      name: "Suresh Yadav",
      role: "Helper",
      attendance: false,
      hoursWorked: 0,
      supervisorRating: 3.8,
      dailySalary: 500,
      overallRating: 3.9,
      location: { lat: 19.0759, lng: 72.8776, address: "Block A - Storage" },
      status: 'offline' as const
    },
    {
      id: 4,
      name: "Vikram Patil",
      role: "Electrician",
      attendance: true,
      hoursWorked: 8,
      supervisorRating: 4.8,
      dailySalary: 900,
      overallRating: 4.9,
      location: { lat: 19.0762, lng: 72.8779, address: "Block A - Electrical Room" },
      status: 'break' as const
    }
  ]);

  const supervisorData = {
    name: "Pradeep Sharma",
    position: "Site Supervisor",
    company: "ABC Construction Ltd.",
    companyRating: 4.6,
    experience: "12+ Years",
    currentSite: {
      name: "Skyline Apartments - Block A",
      location: "Bandra West, Mumbai",
      coordinates: { lat: 19.0760, lng: 72.8777 }
    }
  };

  const toggleAttendance = (id: number) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, attendance: !emp.attendance, hoursWorked: emp.attendance ? 0 : 8 } : emp
    ));
  };

  const updateHours = (id: number, hours: number) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, hoursWorked: hours } : emp
    ));
  };

  const updateRating = (id: number, rating: number) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, supervisorRating: rating } : emp
    ));
  };

  const dailyPayroll = employees.reduce((sum, emp) => sum + (emp.attendance ? emp.dailySalary : 0), 0);
  const weeklyPayroll = dailyPayroll * 6; // 6 working days
  const totalHours = employees.reduce((sum, emp) => sum + emp.hoursWorked, 0);
  const presentEmployees = employees.filter(emp => emp.attendance).length;

  // Chart data
  const attendanceData = [
    { name: 'Mon', present: 4, absent: 0 },
    { name: 'Tue', present: 3, absent: 1 },
    { name: 'Wed', present: 4, absent: 0 },
    { name: 'Thu', present: 4, absent: 0 },
    { name: 'Fri', present: 3, absent: 1 },
    { name: 'Sat', present: 4, absent: 0 },
  ];

  const hoursData = [
    { name: 'Week 1', hours: 160 },
    { name: 'Week 2', hours: 150 },
    { name: 'Week 3', hours: 170 },
    { name: 'Week 4', hours: 165 },
  ];

  const costData = [
    { name: 'Salaries', value: weeklyPayroll, fill: '#8884d8' },
    { name: 'Materials', value: 25000, fill: '#82ca9d' },
    { name: 'Equipment', value: 15000, fill: '#ffc658' },
  ];

  // Generate status indicators based on supervisor data
  const getStatusItems = () => {
    const items = [];
    
    // Attendance Status
    const attendanceRate = (presentEmployees / employees.length) * 100;
    if (attendanceRate >= 90) {
      items.push({ section: 'Team Attendance', status: 'good' as const, message: `Excellent attendance (${attendanceRate.toFixed(1)}%)` });
    } else if (attendanceRate >= 75) {
      items.push({ section: 'Team Attendance', status: 'warning' as const, message: `Moderate attendance (${attendanceRate.toFixed(1)}%)` });
    } else {
      items.push({ section: 'Team Attendance', status: 'critical' as const, message: `Poor attendance (${attendanceRate.toFixed(1)}%)`, actionRequired: 'Address absenteeism issues' });
    }

    // Performance Status
    const avgRating = employees.reduce((sum, emp) => sum + emp.supervisorRating, 0) / employees.length;
    if (avgRating >= 4.5) {
      items.push({ section: 'Team Performance', status: 'good' as const, message: `High performance team (${avgRating.toFixed(1)}/5)` });
    } else if (avgRating >= 3.5) {
      items.push({ section: 'Team Performance', status: 'warning' as const, message: `Average performance (${avgRating.toFixed(1)}/5)` });
    } else {
      items.push({ section: 'Team Performance', status: 'critical' as const, message: `Low performance (${avgRating.toFixed(1)}/5)`, actionRequired: 'Performance improvement needed' });
    }

    // Cost Management
    const avgHourlyRate = dailyPayroll / totalHours;
    if (avgHourlyRate <= 100) {
      items.push({ section: 'Cost Management', status: 'good' as const, message: 'Labor costs under control' });
    } else if (avgHourlyRate <= 150) {
      items.push({ section: 'Cost Management', status: 'warning' as const, message: 'Monitor labor costs closely' });
    } else {
      items.push({ section: 'Cost Management', status: 'critical' as const, message: 'High labor costs detected', actionRequired: 'Review workforce efficiency' });
    }

    // Safety & Operations
    const offlineWorkers = employees.filter(emp => emp.status === 'offline').length;
    if (offlineWorkers === 0) {
      items.push({ section: 'Site Operations', status: 'good' as const, message: 'All workers accounted for' });
    } else if (offlineWorkers <= 1) {
      items.push({ section: 'Site Operations', status: 'warning' as const, message: `${offlineWorkers} worker offline` });
    } else {
      items.push({ section: 'Site Operations', status: 'critical' as const, message: `${offlineWorkers} workers offline`, actionRequired: 'Check worker status immediately' });
    }

    return items;
  };

  return (
    <GlassDashboardLayout 
      title="Supervisor Dashboard" 
      userRole="supervisor"
      heroContent={
        <div className="hero-card animate-slide-up">
          <div className="flex items-center gap-8">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-secondary/30 shadow-glow">
                <AvatarImage src={workerProfile} alt={supervisorData.name} />
                <AvatarFallback className="text-3xl bg-accent text-primary">
                  {supervisorData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center border-2 border-background">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-gradient mb-2">{supervisorData.name}</h2>
              <p className="text-xl text-muted-foreground mb-6">{supervisorData.position}</p>
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-secondary" />
                  <span className="font-medium">{supervisorData.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StarRating rating={supervisorData.companyRating} size="sm" />
                  <span className="font-semibold">{supervisorData.companyRating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-secondary" />
                  <span className="font-medium">{supervisorData.currentSite.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      {/* Status Overview */}
      <StatusIndicator 
        title="Site Management Overview"
        statusItems={getStatusItems()}
      />

      {/* KPI Cards */}
      <div className="dashboard-grid">
        <div className="dashboard-card hover-lift">
          <div className="flex items-center gap-4">
            <div className="neuro-container p-4 rounded-2xl">
              <Users className="w-8 h-8 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Team Attendance</p>
              <p className="text-3xl font-bold text-gradient">{presentEmployees}/{employees.length}</p>
              <p className="text-sm text-success font-semibold">+12% vs last week</p>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card hover-lift">
          <div className="flex items-center gap-4">
            <div className="neuro-container p-4 rounded-2xl">
              <Clock className="w-8 h-8 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Total Hours Today</p>
              <p className="text-3xl font-bold text-gradient">{totalHours}h</p>
              <p className="text-sm text-warning font-semibold">Target: 32h</p>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card hover-lift">
          <div className="flex items-center gap-4">
            <div className="neuro-container p-4 rounded-2xl">
              <IndianRupee className="w-8 h-8 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Daily Payroll</p>
              <p className="text-3xl font-bold text-gradient">₹{dailyPayroll.toLocaleString()}</p>
              <p className="text-sm text-success font-semibold">Within budget</p>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card hover-lift">
          <div className="flex items-center gap-4">
            <div className="neuro-container p-4 rounded-2xl">
              <Target className="w-8 h-8 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Weekly Target</p>
              <p className="text-3xl font-bold text-gradient">₹{weeklyPayroll.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground font-semibold">85% achieved</p>
            </div>
          </div>
        </div>
      </div>

        {/* Worker Location Map */}
        <WorkerLocationMap workers={employees} />

        {/* Employee Management Table */}
        <div className="glass-card p-6 hover-lift">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="neuro-container p-3 rounded-xl">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Employee Management</h2>
            </div>
            <Button className="btn-primary flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Add Worker
            </Button>
          </div>
          <div className="glass-table">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-foreground font-semibold">Employee</TableHead>
                  <TableHead className="text-foreground font-semibold">Attendance</TableHead>
                  <TableHead className="text-foreground font-semibold">Hours</TableHead>
                  <TableHead className="text-foreground font-semibold">Supervisor Rating</TableHead>
                  <TableHead className="text-foreground font-semibold">Daily Salary</TableHead>
                  <TableHead className="text-foreground font-semibold">Overall Rating</TableHead>
                  <TableHead className="text-foreground font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id} className="hover:bg-glass-bg-secondary">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border-2 border-secondary/20">
                          <AvatarImage src={employee.avatar} alt={employee.name} />
                          <AvatarFallback className="bg-accent text-primary font-semibold">{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.role}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleAttendance(employee.id)}
                        className={`neuro-button ${employee.attendance ? "text-success hover:bg-success/20" : "text-destructive hover:bg-destructive/20"}`}
                      >
                        {employee.attendance ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={employee.hoursWorked}
                        onChange={(e) => updateHours(employee.id, Number(e.target.value))}
                        className="w-20 glass-container border-glass-accent"
                        min="0"
                        max="12"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <StarRating rating={employee.supervisorRating} size="sm" />
                        <Input
                          type="number"
                          value={employee.supervisorRating}
                          onChange={(e) => updateRating(employee.id, Number(e.target.value))}
                          className="w-16 glass-container border-glass-accent"
                          min="1"
                          max="5"
                          step="0.1"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-bold text-foreground">₹{employee.dailySalary}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <StarRating rating={employee.overallRating} size="sm" />
                        <span className="text-sm font-semibold text-foreground">{employee.overallRating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="btn-glass">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="btn-glass text-destructive hover:bg-destructive/20">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Attendance Trends */}
          <div className="glass-card p-6 hover-lift">
            <div className="flex items-center gap-3 mb-6">
              <div className="neuro-container p-3 rounded-xl">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Weekly Attendance Trends</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                <YAxis stroke="rgba(255,255,255,0.6)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    color: 'white'
                  }} 
                />
                <Bar dataKey="present" fill="#22c55e" name="Present" radius={[4, 4, 0, 0]} />
                <Bar dataKey="absent" fill="#ef4444" name="Absent" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Hours Worked */}
          <div className="glass-card p-6 hover-lift">
            <div className="flex items-center gap-3 mb-6">
              <div className="neuro-container p-3 rounded-xl">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Monthly Hours Worked</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hoursData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                <YAxis stroke="rgba(255,255,255,0.6)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    color: 'white'
                  }} 
                />
                <Line type="monotone" dataKey="hours" stroke="#FACC15" strokeWidth={3} dot={{ fill: '#FACC15', strokeWidth: 2, r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Cost Distribution */}
          <div className="glass-card p-6 hover-lift">
            <div className="flex items-center gap-3 mb-6">
              <div className="neuro-container p-3 rounded-xl">
                <IndianRupee className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Weekly Cost Distribution</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ₹${value.toLocaleString()}`}
                  labelLine={false}
                >
                  {costData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `₹${Number(value).toLocaleString()}`}
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    color: 'white'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Productivity Overview */}
          <div className="glass-card p-6 hover-lift">
            <div className="flex items-center gap-3 mb-6">
              <div className="neuro-container p-3 rounded-xl">
                <Target className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Productivity Metrics</h2>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="glass-container p-6 rounded-xl text-center hover:bg-glass-bg-secondary transition-all duration-300">
                  <p className="text-3xl font-bold text-gradient">{((presentEmployees / employees.length) * 100).toFixed(1)}%</p>
                  <p className="text-sm text-muted-foreground font-semibold">Attendance Rate</p>
                </div>
                <div className="glass-container p-6 rounded-xl text-center hover:bg-glass-bg-secondary transition-all duration-300">
                  <p className="text-3xl font-bold text-gradient">{(totalHours / employees.length).toFixed(1)}h</p>
                  <p className="text-sm text-muted-foreground font-semibold">Avg Hours/Employee</p>
                </div>
                <div className="glass-container p-6 rounded-xl text-center hover:bg-glass-bg-secondary transition-all duration-300">
                  <p className="text-3xl font-bold text-gradient">₹{Math.round(dailyPayroll / totalHours)}</p>
                  <p className="text-sm text-muted-foreground font-semibold">Cost per Hour</p>
                </div>
                <div className="glass-container p-6 rounded-xl text-center hover:bg-glass-bg-secondary transition-all duration-300">
                  <p className="text-3xl font-bold text-gradient">{(employees.reduce((sum, emp) => sum + emp.supervisorRating, 0) / employees.length).toFixed(1)}</p>
                  <p className="text-sm text-muted-foreground font-semibold">Avg Team Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </GlassDashboardLayout>
  );
};

export default SupervisorDashboard;