// src/pages/SupervisorProfile.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StarRating } from "@/components/StarRating"; // updated to support editable
import { MapPin, IndianRupee, Clock, Users } from "lucide-react";
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

  const smallCardClass = theme === "dark"
    ? "bg-[rgba(0,0,0,0.55)] border-[rgba(255,255,255,0.12)] text-white backdrop-blur-xl shadow-md rounded-lg p-4"
    : "bg-white/70 border-black/10 text-black backdrop-blur-xl shadow-md rounded-lg p-4";

  const dailyPayroll = employees.reduce((sum, e) => sum + (e.attendance ? e.dailySalary : 0), 0);
  const totalHours = employees.reduce((sum, e) => sum + e.hoursWorked, 0);
  const presentEmployees = employees.filter(e => e.attendance).length;

  const getStatusItems = () => {
    const items: any[] = [];
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

      {/* Top: 3 small cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={smallCardClass}>
          <p className="text-sm font-semibold">Rating</p>
          <div className="flex items-center gap-2 mt-2">
            <StarRating rating={supervisorData.companyRating} size="sm" />
            <span className="font-bold">{supervisorData.companyRating.toFixed(1)}/5</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Based on company & site feedback</p>
        </div>

        <div className={smallCardClass}>
          <p className="text-sm font-semibold">Company & Location</p>
          <div className="flex items-center gap-2 mt-2">
            <MapPin className="w-4 h-4" />
            <div className="flex flex-col">
              <span className="font-medium">{supervisorData.company}</span>
              <span className="text-xs text-muted-foreground">{supervisorData.currentSite.location}</span>
            </div>
          </div>
        </div>

        <div className={smallCardClass}>
          <p className="text-sm font-semibold">Experience</p>
          <div className="mt-2">
            <span className="text-lg font-bold">{supervisorData.experience}</span>
            <p className="text-xs text-muted-foreground mt-1">{supervisorData.position}</p>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className={glassClass}>
        <StatusIndicator title="Supervisor Status Overview" statusItems={getStatusItems()} theme={theme} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={glassClass}>
          <Users className="w-5 h-5" />
          <p className="font-semibold">Team Attendance</p>
          <p>{presentEmployees}/{employees.length} Present</p>
        </div>
        <div className={glassClass}>
          <Clock className="w-5 h-5" />
          <p className="font-semibold">Total Hours</p>
          <p>{totalHours}h</p>
        </div>
        <div className={glassClass}>
          <IndianRupee className="w-5 h-5" />
          <p className="font-semibold">Daily Payroll</p>
          <p>₹{dailyPayroll.toLocaleString()}</p>
        </div>
      </div>

      {/* Employee Table */}
      <div className={glassClass}>
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold">Employee Management</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newId = employees.length + 1;
              setEmployees([
                ...employees,
                {
                  id: newId,
                  name: "New Labour",
                  role: "New Role",
                  attendance: false,
                  hoursWorked: 0,
                  supervisorRating: 0,
                  dailySalary: 0,
                  overallRating: 0,
                  avatar: workerProfile,
                  location: { lat: 0, lng: 0, address: "" },
                  status: 'offline'
                },
              ]);
            }}
          >
            Add Labour
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Supervisor Rating</TableHead>
              <TableHead>Overall Rating</TableHead>
              <TableHead>Daily Salary</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {employees.map(e => (
              <TableRow key={e.id} className="hover:bg-white/10 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="w-10 h-10 border-2">
                      <AvatarImage src={e.avatar} />
                      <AvatarFallback>{e.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <span>{e.name}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <Button
                    variant={e.attendance ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleAttendance(e.id)}
                  >
                    {e.attendance ? "Present" : "Absent"}
                  </Button>
                </TableCell>

                <TableCell>{e.hoursWorked}</TableCell>

                <TableCell>
                  <StarRating
                    rating={e.supervisorRating}
                    size="sm"
                    editable
                    onChange={(newRating) =>
                      setEmployees(
                        employees.map(emp =>
                          emp.id === e.id ? { ...emp, supervisorRating: newRating } : emp
                        )
                      )
                    }
                  />
                </TableCell>

                <TableCell>
                  <StarRating rating={e.overallRating} size="sm" />
                </TableCell>

                <TableCell>₹{e.dailySalary}</TableCell>

                <TableCell className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => alert(`Edit ${e.name}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setEmployees(employees.filter(emp => emp.id !== e.id))}
                  >
                    Delete
                  </Button>
                </TableCell>
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
