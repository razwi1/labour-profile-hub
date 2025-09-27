import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StarRating } from "@/components/StarRating";
import { MapPin, IndianRupee, Clock, Users, Target } from "lucide-react";
import { ProgressBar } from "@/components/ProgressBar";
import StatusIndicator from "@/components/StatusIndicator";
import WorkerLocationMap from "@/components/WorkerLocationMap";
import workerProfile from "@/assets/worker-profile.jpg";

interface SupervisorProfileProps {
  theme: "dark" | "light";
}

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

const SupervisorProfile: React.FC<SupervisorProfileProps> = ({ theme }) => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1, name: "Rajesh Kumar", role: "Senior Mason", attendance: true,
      hoursWorked: 8, supervisorRating: 4.5, dailySalary: 800,
      overallRating: 4.7, avatar: workerProfile,
      location: { lat: 19.0760, lng: 72.8777, address: "Block A - Foundation" },
      status: 'active'
    },
    {
      id: 2, name: "Amit Singh", role: "Steel Fixer", attendance: true,
      hoursWorked: 7.5, supervisorRating: 4.2, dailySalary: 750,
      overallRating: 4.3, avatar: workerProfile,
      location: { lat: 19.0761, lng: 72.8778, address: "Block A - Level 2" },
      status: 'active'
    }
  ]);

  const supervisorData = {
    name: "Pradeep Sharma",
    position: "Site Supervisor",
    company: "ABC Construction Ltd.",
    companyRating: 4.6,
    experience: "12+ Years",
    currentSite: { name: "Skyline Apartments - Block A", location: "Bandra West, Mumbai" }
  };

  const toggleAttendance = (id: number) => {
    setEmployees(employees.map(emp =>
      emp.id === id ? { ...emp, attendance: !emp.attendance, hoursWorked: emp.attendance ? 0 : 8 } : emp
    ));
  };

  const containerClass = theme === "dark"
    ? "bg-transparent text-white min-h-screen transition-colors duration-300 p-6"
    : "bg-transparent text-black min-h-screen transition-colors duration-300 p-6";

  const glassClass = theme === "dark"
    ? "bg-[rgba(0,0,0,0.55)] border-[rgba(255,255,255,0.2)] text-white backdrop-blur-xl shadow-md rounded-2xl p-6"
    : "bg-white/60 border-black/20 text-black backdrop-blur-xl shadow-md rounded-2xl p-6";

  const dailyPayroll = employees.reduce((sum, e) => sum + (e.attendance ? e.dailySalary : 0), 0);
  const totalHours = employees.reduce((sum, e) => sum + e.hoursWorked, 0);
  const presentEmployees = employees.filter(e => e.attendance).length;

  const getStatusItems = () => {
    const items = [];
    const attendanceRate = (presentEmployees / employees.length) * 100;
    items.push({
      section: "Team Attendance",
      status: attendanceRate >= 90 ? "good" : attendanceRate >= 75 ? "warning" : "critical",
      message: `Attendance: ${attendanceRate.toFixed(1)}%`
    });

    const avgRating = employees.reduce((sum, e) => sum + e.supervisorRating, 0) / employees.length;
    items.push({
      section: "Team Performance",
      status: avgRating >= 4.5 ? "good" : avgRating >= 3.5 ? "warning" : "critical",
      message: `Avg Rating: ${avgRating.toFixed(1)}/5`
    });
    return items;
  };

  return (
    <div className={containerClass + " space-y-8"}>
      {/* Supervisor Info */}
      <div className={glassClass + " flex items-center gap-6"}>
        <Avatar className="w-32 h-32 border-4 border-secondary/30 shadow-glow">
          <AvatarImage src={workerProfile} alt={supervisorData.name} />
          <AvatarFallback>{supervisorData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-3xl font-bold">{supervisorData.name}</h2>
          <p className="text-lg">{supervisorData.position}</p>
          <p className="text-sm flex items-center gap-2 mt-1">
            <StarRating rating={supervisorData.companyRating} size="sm" />
            {supervisorData.company} - {supervisorData.currentSite.location}
          </p>
          <p className="text-sm mt-2">Experience: {supervisorData.experience}</p>
        </div>
      </div>

      {/* Status Overview */}
      <div className={glassClass}>
        <StatusIndicator title="Supervisor Status Overview" statusItems={getStatusItems()} theme={theme} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={glassClass + " flex flex-col items-start gap-2"}>
          <Users className="w-6 h-6" />
          <p className="font-semibold">Team Attendance</p>
          <p>{presentEmployees}/{employees.length} Present</p>
        </div>
        <div className={glassClass + " flex flex-col items-start gap-2"}>
          <Clock className="w-6 h-6" />
          <p className="font-semibold">Total Hours</p>
          <p>{totalHours}h</p>
        </div>
        <div className={glassClass + " flex flex-col items-start gap-2"}>
          <IndianRupee className="w-6 h-6" />
          <p className="font-semibold">Daily Payroll</p>
          <p>₹{dailyPayroll.toLocaleString()}</p>
        </div>
      </div>

      {/* Employee Table */}
      <div className={glassClass}>
        <p className="font-semibold mb-4">Employee Management</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Daily Salary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map(e => (
              <TableRow key={e.id} className="hover:bg-white/10 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-10 h-10 border-2">
                      <AvatarImage src={e.avatar} />
                      <AvatarFallback>{e.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span>{e.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" onClick={() => toggleAttendance(e.id)}>{e.attendance ? "Present" : "Absent"}</Button>
                </TableCell>
                <TableCell>{e.hoursWorked}</TableCell>
                <TableCell><StarRating rating={e.supervisorRating} size="sm" /></TableCell>
                <TableCell>₹{e.dailySalary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Map */}
      <div className={glassClass}>
        <p className="font-semibold mb-4">Team Location</p>
        <WorkerLocationMap workers={employees} theme={theme} />
      </div>

    </div>
  );
};

export default SupervisorProfile;
