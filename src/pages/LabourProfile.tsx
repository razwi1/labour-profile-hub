// LabourProfile.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  IndianRupee,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Sun,
  Moon,
} from "lucide-react";

import { ProgressBar } from "@/components/ProgressBar";
import { DocumentStatus } from "@/components/DocumentStatus";
import { StarRating } from "@/components/StarRating";
import StatusIndicator from "@/components/StatusIndicator";
import workerProfile from "@/assets/worker-profile.jpg";
import labourLogo from "@/assets/Labour_Logo.png";

const LabourProfile: React.FC = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light") return saved;
      return window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "dark";
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (theme === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const [profileData] = useState({
    name: "Rajesh Kumar",
    jobRole: "Senior Construction Supervisor",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    placeOfOrigin: "Pune, Maharashtra",
    experience: "8+ Years",
    rating: 4.7,
    loyaltyRating: 4.9,
    skills: ["Concrete Work", "Steel Fixing", "Site Management", "Quality Control", "Team Leadership"],
    totalBudget: 500000,
    amountPaid: 350000,
    currentWorkLocation: {
      siteName: "Skyline Apartments - Block A",
      address: "Bandra West, Mumbai",
      workArea: "Foundation Level - Section 2",
      startDate: "2024-01-15",
    },
    documents: [
      { name: "AADHAR CARD", status: "verified" as const },
      { name: "PAN CARD", status: "verified" as const },
      { name: "LABOUR LICENSE", status: "verified" as const },
      { name: "BANK PASSBOOK", status: "pending" as const },
      { name: "POLICE VERIFICATION", status: "required" as const },
    ],
  });

  const getStatusItems = () => {
    const items: any[] = [];
    const paymentPercent = (profileData.amountPaid / profileData.totalBudget) * 100;

    if (paymentPercent >= 90) items.push({ section: "Payment Status", status: "good" as const, message: "Payments up to date" });
    else if (paymentPercent >= 70) items.push({ section: "Payment Status", status: "warning" as const, message: "Payment partially pending" });
    else items.push({ section: "Payment Status", status: "critical" as const, message: "Significant payment pending", actionRequired: "Contact admin for payment" });

    const pendingDocs = profileData.documents.filter(d => d.status === "pending").length;
    const requiredDocs = profileData.documents.filter(d => d.status === "required").length;

    if (requiredDocs > 0) items.push({ section: "Documentation", status: "critical" as const, message: `${requiredDocs} documents required`, actionRequired: "Submit missing documents" });
    else if (pendingDocs > 0) items.push({ section: "Documentation", status: "warning" as const, message: `${pendingDocs} documents under review` });
    else items.push({ section: "Documentation", status: "good" as const, message: "All documents verified" });

    if (profileData.rating >= 4.5) items.push({ section: "Performance Rating", status: "good" as const, message: `Excellent performance (${profileData.rating}/5)` });
    else if (profileData.rating >= 3.5) items.push({ section: "Performance Rating", status: "warning" as const, message: `Good performance (${profileData.rating}/5)` });
    else items.push({ section: "Performance Rating", status: "critical" as const, message: `Performance needs improvement (${profileData.rating}/5)`, actionRequired: "Skill development recommended" });

    items.push({ section: "Work Status", status: "good" as const, message: "Currently active on site" });
    return items;
  };

  const containerThemeClass = theme === "dark"
    ? "bg-black text-white min-h-screen transition-colors duration-300"
    : "bg-white text-black min-h-screen transition-colors duration-300";

  const sidebarThemeClass = theme === "dark"
    ? "bg-[rgba(200,200,200,0.1)] border-[rgba(255,255,255,0.15)] text-white backdrop-blur-lg shadow-lg"
    : "bg-white/60 border-black/10 text-black backdrop-blur-lg shadow-lg";

  const glassThemeClass = theme === "dark"
    ? "bg-[rgba(200,200,200,0.1)] border-[rgba(255,255,255,0.15)] text-white backdrop-blur-lg shadow-md rounded-2xl"
    : "bg-black/5 border-black/10 text-black backdrop-blur-lg shadow-md rounded-2xl";

  const collapseText = (text: string) => (sidebarOpen ? text : "");

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${containerThemeClass}`}>
      {/* Sidebar */}
      <aside className={`relative ${sidebarOpen ? "w-72" : "w-20"} flex flex-col transition-all duration-300 border p-3 ${sidebarThemeClass} rounded-2xl shadow-lg m-4`}>
        <div className="flex flex-col">
          {/* 1️⃣ Top: Logo + Dark/Light toggle + Collapse */}
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div onClick={() => navigate("/")} className="cursor-pointer flex items-center gap-3">
                <img src={labourLogo} alt="Labour Logo" className="h-16 w-auto" />
              </div>
            )}
            <div className="flex items-center gap-2">
              {sidebarOpen && (
                <button aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-md hover:bg-white/10 transition">
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              )}
              <button aria-label="Toggle sidebar" onClick={() => setSidebarOpen(s => !s)} className="p-2 rounded-full shadow-lg bg-gray-200/30 dark:bg-gray-800/50 backdrop-blur-md transition">
                {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* 2️⃣ Worker photo + profile details */}
          <div className="flex flex-col items-center mt-4">
            <Avatar className={`${sidebarOpen ? "w-24 h-24" : "w-10 h-10"} border-2 shadow-md`}>
              <AvatarImage src={workerProfile} alt={profileData.name} />
              <AvatarFallback>{profileData.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="text-center mt-2">
                <div className="font-semibold">{profileData.name}</div>
                <div className="text-sm text-muted-foreground">{profileData.placeOfOrigin}</div>
                <div className="mt-1"><Badge variant="outline">Active on Site</Badge></div>
              </div>
            )}
          </div>

          {/* 3️⃣ Dashboard */}
          <div className="px-2 py-2 mt-4">
            <Button variant="ghost" className="w-full flex items-center gap-3" disabled>
              <LayoutDashboard className="w-5 h-5" /> {collapseText("Dashboard")}
            </Button>
          </div>

          {/* 4️⃣ Logout */}
          <div className="px-2 py-2">
            <Button variant="ghost" onClick={() => navigate("/")} className="w-full flex items-center gap-3">
              <LogOut className="w-4 h-4" /> {collapseText("Logout")}
            </Button>
          </div>
        </div>
      </aside>



      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Top stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`${glassThemeClass} p-6 rounded-2xl`}>
              <h3 className="text-sm text-muted-foreground">Experience</h3>
              <p className="font-bold text-xl">{profileData.experience}</p>
            </div>
            <div className={`${glassThemeClass} p-6 rounded-2xl flex flex-col items-center`}>
              <h3 className="text-sm text-muted-foreground">Rating</h3>
              <div className="mt-2"><StarRating rating={profileData.rating} /></div>
            </div>
            <div className={`${glassThemeClass} p-6 rounded-2xl`}>
              <h3 className="text-sm text-muted-foreground">Skills</h3>
              <p className="font-semibold mt-2">{profileData.skills.length} Skills</p>
              <div className="flex flex-wrap gap-2 mt-3">{profileData.skills.slice(0, 6).map((s, i) => <Badge key={i} variant="secondary" className="bg-opacity-20">{s}</Badge>)}</div>
            </div>
          </div>

          <StatusIndicator title="Profile Status Overview" statusItems={getStatusItems()} />

          <div className={`${glassThemeClass} p-6 rounded-2xl`}>
            <div className="flex items-center gap-3 mb-4">
              <IndianRupee className="w-6 h-6" />
              <h2 className="text-lg font-semibold">Project Budget & Payment Status</h2>
            </div>
            <ProgressBar current={profileData.amountPaid} total={profileData.totalBudget} />
          </div>

          <div className={`${glassThemeClass} p-6 rounded-2xl`}>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6" />
              <h2 className="text-lg font-semibold">Current Work Location</h2>
            </div>
            <p className="font-bold text-xl">{profileData.currentWorkLocation.siteName}</p>
            <p className="text-sm text-muted-foreground">{profileData.currentWorkLocation.address}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-lg border">
                <p className="text-xs text-muted-foreground">Work Area</p>
                <p className="font-semibold">{profileData.currentWorkLocation.workArea}</p>
              </div>
              <div className="p-4 rounded-lg border">
                <p className="text-xs text-muted-foreground">Started On</p>
                <p className="font-semibold">{new Date(profileData.currentWorkLocation.startDate).toLocaleDateString("en-IN")}</p>
              </div>
            </div>
          </div>

          <div className={`${glassThemeClass} p-6 rounded-2xl`}>
            <DocumentStatus documents={profileData.documents} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LabourProfile;
