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
            <Avatar className="w-24 h-24 border-4 border-secondary/30">
              <AvatarImage src={workerProfile} alt={supervisorData.name} />
              <AvatarFallback className="text-2xl bg-accent text-foreground">
                {supervisorData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-gradient mb-2">{supervisorData.name}</h2>
              <p className="text-xl text-muted-foreground mb-4">{supervisorData.position}</p>
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  <span className="font-medium">{supervisorData.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StarRating rating={supervisorData.companyRating} size="sm" />
                  <span>{supervisorData.companyRating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{supervisorData.currentSite.location}</span>
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
              <p className="text-sm text-success">+12% vs last week</p>
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
              <p className="text-sm text-warning">Target: 32h</p>
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
              <p className="text-sm text-success">Within budget</p>
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
              <p className="text-sm text-muted-foreground">85% achieved</p>
            </div>
          </div>
        </div>
      </div>

        {/* Worker Location Map */}
        <WorkerLocationMap workers={employees} />

        {/* Employee Management Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Employee Management
              </CardTitle>
              <Button className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Add Worker
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Supervisor Rating</TableHead>
                  <TableHead>Daily Salary</TableHead>
                  <TableHead>Overall Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={employee.avatar} alt={employee.name} />
                          <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.role}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleAttendance(employee.id)}
                        className={employee.attendance ? "text-green-600" : "text-red-600"}
                      >
                        {employee.attendance ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={employee.hoursWorked}
                        onChange={(e) => updateHours(employee.id, Number(e.target.value))}
                        className="w-20"
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
                          className="w-16"
                          min="1"
                          max="5"
                          step="0.1"
                        />
                      </div>
                    </TableCell>
                    <TableCell>₹{employee.dailySalary}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <StarRating rating={employee.overallRating} size="sm" />
                        <span className="text-sm">{employee.overallRating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Attendance Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="present" fill="#22c55e" name="Present" />
                  <Bar dataKey="absent" fill="#ef4444" name="Absent" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Hours Worked */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Hours Worked</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={hoursData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="hours" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cost Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Cost Distribution</CardTitle>
            </CardHeader>
            <CardContent>
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
                  >
                    {costData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Productivity Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Productivity Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{((presentEmployees / employees.length) * 100).toFixed(1)}%</p>
                  <p className="text-sm text-muted-foreground">Attendance Rate</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{(totalHours / employees.length).toFixed(1)}h</p>
                  <p className="text-sm text-muted-foreground">Avg Hours/Employee</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">₹{Math.round(dailyPayroll / totalHours)}</p>
                  <p className="text-sm text-muted-foreground">Cost per Hour</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary">{(employees.reduce((sum, emp) => sum + emp.supervisorRating, 0) / employees.length).toFixed(1)}</p>
                  <p className="text-sm text-muted-foreground">Avg Team Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;