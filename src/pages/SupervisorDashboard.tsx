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
  XCircle
} from "lucide-react";
import { StarRating } from "@/components/StarRating";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import WorkerLocationMap from "@/components/WorkerLocationMap";
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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Logout */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Supervisor Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Supervisor Profile */}
        <Card>
          <div className="bg-gradient-to-r from-primary to-blue-600 p-6 text-primary-foreground">
            <div className="flex items-center gap-6">
              <Avatar className="w-20 h-20 border-4 border-white/20">
                <AvatarImage src={workerProfile} alt={supervisorData.name} />
                <AvatarFallback className="text-xl bg-white/20">
                  {supervisorData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{supervisorData.name}</h2>
                <p className="text-lg opacity-90 mb-2">{supervisorData.position}</p>
                <div className="flex items-center gap-4 text-sm opacity-90">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {supervisorData.company}
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating rating={supervisorData.companyRating} size="sm" />
                    <span>{supervisorData.companyRating}</span>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-white/10 rounded-lg">
                  <p className="text-sm font-medium opacity-95">Current Site:</p>
                  <p className="text-sm opacity-90">{supervisorData.currentSite.name}</p>
                  <p className="text-xs opacity-80">{supervisorData.currentSite.location}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Present Today</p>
                  <p className="text-2xl font-bold">{presentEmployees}/{employees.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Hours</p>
                  <p className="text-2xl font-bold">{totalHours}h</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Daily Payroll</p>
                  <p className="text-2xl font-bold">₹{dailyPayroll.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Weekly Payroll</p>
                  <p className="text-2xl font-bold">₹{weeklyPayroll.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
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