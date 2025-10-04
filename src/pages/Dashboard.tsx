import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, LayoutDashboard, LogOut, Sun, Moon } from "lucide-react";

import LabourProfile from "@/pages/LabourProfile";
import SupervisorProfile from "@/pages/SupervisorProfile";
import SitemanagerProfile from "@/pages/SitemanagerProfile";
import ClientProfile from "@/pages/ClientProfile";

import workerProfile from "@/assets/worker-profile.jpg";
import labourLogo from "@/assets/Labour_Logo.png";

type UserRole = "labour" | "supervisor" | "site_manager" | "client";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { roleId } = useParams<{ roleId: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    if (roleId && ["labour", "supervisor", "site_manager", "client"].includes(roleId)) {
      setRole(roleId as UserRole);
    } else {
      navigate("/user-role-selection");
    }
  }, [roleId, navigate]);

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "dark";
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const collapseText = (text: string) => (sidebarOpen ? text : "");

  // Add role-based class for blob CSS
  const containerClass = `labour-profile-bg ${theme} ${role || ""} min-h-screen transition-colors duration-300`;

  const sidebarThemeClass =
    theme === "dark"
      ? "bg-[rgba(0,0,0,0.6)] border-[rgba(255,255,255,0.2)] text-white backdrop-blur-xl shadow-lg"
      : "bg-white/70 border-black/20 text-black backdrop-blur-xl shadow-lg";

  // 🟢 Role-based user details
  const getUserDetails = () => {
    switch (role) {
      case "labour":
        return { name: "Rajesh Kumar", subRole: "Labour Worker" };
      case "supervisor":
        return { name: "Pradeep Sharma", subRole: "Site Supervisor" };
      case "site_manager":
        return { name: "Amit Verma", subRole: "Site Manager" };
      case "client":
        return { name: "ABC Constructions Pvt. Ltd.", subRole: "Client Company" };
      default:
        return { name: "Unknown", subRole: "" };
    }
  };

  const { name, subRole } = getUserDetails();

  return (
    <div className={`flex min-h-screen ${containerClass}`}>
      {/* Sidebar */}
      <aside
        className={`relative ${sidebarOpen ? "w-72" : "w-20"} flex flex-col transition-all duration-300 border p-3 ${sidebarThemeClass} rounded-2xl shadow-lg m-4`}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div onClick={() => navigate("/")} className="cursor-pointer flex items-center gap-3">
                <img
                  src={labourLogo}
                  alt="Logo"
                  className={`h-16 w-auto transition filter ${theme === "dark" ? "" : "invert"}`}
                />
              </div>
            )}
            <div className="flex items-center gap-2">
              {sidebarOpen && (
                <button
                  aria-label="Toggle theme"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-md hover:bg-white/10 transition"
                >
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              )}
              <button
                aria-label="Toggle sidebar"
                onClick={() => setSidebarOpen((s) => !s)}
                className="p-2 rounded-full shadow-lg bg-gray-200/30 dark:bg-gray-800/50 backdrop-blur-md transition"
              >
                {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* User avatar / Company name */}
          <div className="flex flex-col items-center">
            {role !== "client" ? (
              <Avatar className={`${sidebarOpen ? "w-24 h-24" : "w-10 h-10"} border-2 shadow-md`}>
                <AvatarImage src={workerProfile} alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            ) : (
              <div
                className={`flex items-center justify-center font-bold text-lg ${
                  sidebarOpen ? "w-24 h-24" : "w-10 h-10"
                } rounded-full bg-primary text-white`}
              >
                {name.charAt(0)}
              </div>
            )}

            {sidebarOpen && (
              <div className="text-center mt-2">
                <div className="font-semibold">{name}</div>
                <div className="text-sm capitalize">{subRole}</div>
                {role !== "client" && (
                  <div className="mt-1">
                    <Badge variant="outline">Active on Site</Badge>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar buttons */}
          <Button variant="ghost" className="w-full flex items-center gap-3" disabled>
            <LayoutDashboard className="w-5 h-5" /> {collapseText("Dashboard")}
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigate("/user-role-selection")}
            className="w-full flex items-center gap-3"
          >
            <LogOut className="w-4 h-4" /> {collapseText("Logout")}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {role === "labour" && <LabourProfile theme={theme} />}
        {role === "supervisor" && <SupervisorProfile theme={theme} />}
        {role === "site_manager" && <SitemanagerProfile theme={theme} />}
        {role === "client" && <ClientProfile theme={theme} />}
      </main>
    </div>
  );
};

export default Dashboard;
