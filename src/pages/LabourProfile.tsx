import React from "react";
import { Badge } from "@/components/ui/badge";
import { MapPin, IndianRupee } from "lucide-react";
import { ProgressBar } from "@/components/ProgressBar";
import { DocumentStatus } from "@/components/DocumentStatus";
import { StarRating } from "@/components/StarRating";
import StatusIndicator from "@/components/StatusIndicator";
import "@/components/CSS/LabourProfile.css";

interface LabourProfileProps {
  theme: "dark" | "light";
}

const LabourProfile: React.FC<LabourProfileProps> = ({ theme }) => {
  // ---- LabourProfile Data ----
  const profileData = {
    name: "Rajesh Kumar",
    jobRole: "Senior Construction Supervisor",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    placeOfOrigin: "Pune, Maharashtra",
    experience: "8+ Years",
    rating: 4.7,
    loyaltyRating: 4.9,
    skills: [
      "Concrete Work",
      "Steel Fixing",
      "Site Management",
      "Quality Control",
      "Team Leadership",
    ],
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
  };

  const getStatusItems = () => {
    const items: any[] = [];
    const paymentPercent = (profileData.amountPaid / profileData.totalBudget) * 100;

    if (paymentPercent >= 90)
      items.push({ section: "Payment Status", status: "good", message: "Payments up to date" });
    else if (paymentPercent >= 70)
      items.push({ section: "Payment Status", status: "warning", message: "Payment partially pending" });
    else
      items.push({ section: "Payment Status", status: "critical", message: "Significant payment pending", actionRequired: "Contact admin for payment" });

    const pendingDocs = profileData.documents.filter(d => d.status === "pending").length;
    const requiredDocs = profileData.documents.filter(d => d.status === "required").length;

    if (requiredDocs > 0)
      items.push({ section: "Documentation", status: "critical", message: `${requiredDocs} documents required`, actionRequired: "Submit missing documents" });
    else if (pendingDocs > 0)
      items.push({ section: "Documentation", status: "warning", message: `${pendingDocs} documents under review` });
    else
      items.push({ section: "Documentation", status: "good", message: "All documents verified" });

    if (profileData.rating >= 4.5)
      items.push({ section: "Performance Rating", status: "good", message: `Excellent performance (${profileData.rating}/5)` });
    else if (profileData.rating >= 3.5)
      items.push({ section: "Performance Rating", status: "warning", message: `Good performance (${profileData.rating}/5)` });
    else
      items.push({ section: "Performance Rating", status: "critical", message: `Performance needs improvement (${profileData.rating}/5)`, actionRequired: "Skill development recommended" });

    items.push({ section: "Work Status", status: "good", message: "Currently active on site" });
    return items;
  };

  const glassThemeClass =
    theme === "dark"
      ? "bg-[rgba(0,0,0,0.55)] border-[rgba(255,255,255,0.2)] text-white backdrop-blur-xl shadow-md rounded-2xl"
      : "bg-white/60 border-black/20 text-black backdrop-blur-xl shadow-md rounded-2xl";

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Experience Card */}
        <div className={`${glassThemeClass} p-6 rounded-2xl flex flex-col items-start`}>
          <h3 className={`text-sm font-semibold uppercase tracking-wider ${theme === "dark" ? "text-white/80" : "text-black/60"}`}>Experience</h3>
          <p className={`mt-2 font-extrabold text-2xl md:text-3xl leading-tight ${theme === "dark" ? "text-white" : "text-black"}`}>{profileData.experience}</p>
          <p className={`mt-1 text-sm text-muted-foreground`}>Years of hands-on experience in construction supervision and site management</p>
          <div className="w-12 h-1 bg-primary rounded-full mt-3 mb-1" />
          <span className={`text-xs font-medium ${theme === "dark" ? "text-white/70" : "text-black/70"}`}>Highly skilled & trusted</span>
        </div>

        {/* Rating Card */}
        <div className={`${glassThemeClass} p-6 rounded-2xl flex flex-col items-center`}>
          <h3 className={`text-sm font-semibold uppercase tracking-wider ${theme === "dark" ? "text-white/80" : "text-black/60"}`}>Rating</h3>
          <div className="mt-3"><StarRating rating={profileData.rating} /></div>
          <p className={`mt-2 font-extrabold text-2xl md:text-3xl leading-tight ${theme === "dark" ? "text-white" : "text-black"}`}>{profileData.rating.toFixed(1)}/5</p>
          <p className={`mt-1 text-sm text-muted-foreground`}>Average performance rating from recent projects</p>
          <div className="w-16 h-1 bg-primary rounded-full mt-3 mb-1" />
          <span className={`text-xs font-medium ${theme === "dark" ? "text-white/70" : "text-black/70"}`}>Consistently high-rated worker</span>
        </div>

        {/* Skills Card */}
        <div className={`${glassThemeClass} p-6 rounded-2xl`}>
          <h3 className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-black-600"}`}>Skills</h3>
          <p className={`font-semibold mt-2 ${theme === "dark" ? "text-white" : "text-black"}`}>{profileData.skills.length} Skills</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {profileData.skills.slice(0, 6).map((s, i) => (
              <Badge key={i} variant="secondary" className={`bg-opacity-30 ${theme === "dark" ? "text-white border-white" : "text-black border-black"}`}>{s}</Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className={`${glassThemeClass} p-6 rounded-2xl`}>
        <StatusIndicator title="Profile Status Overview" statusItems={getStatusItems()} theme={theme} />
      </div>

      {/* Budget & Payment */}
      <div className={`${glassThemeClass} p-6 rounded-2xl`}>
        <div className="flex items-center gap-3 mb-4">
          <IndianRupee className={`w-6 h-6 ${theme === "dark" ? "text-white" : "text-black"}`} />
          <h2 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>Project Budget & Payment Status</h2>
        </div>
        <ProgressBar current={profileData.amountPaid} total={profileData.totalBudget} />
      </div>

      {/* Current Work Location */}
      <div className={`${glassThemeClass} p-6 rounded-2xl`}>
        <div className="flex items-center gap-3 mb-4">
          <MapPin className={`w-6 h-6 ${theme === "dark" ? "text-white" : "text-black"}`} />
          <h2 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>Current Work Location</h2>
        </div>
        <p className={`font-bold text-xl ${theme === "dark" ? "text-white" : "text-black"}`}>{profileData.currentWorkLocation.siteName}</p>
        <p className={`text-sm ${theme === "dark" ? "text-white" : "text-black"}`}>{profileData.currentWorkLocation.address}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className={`p-4 rounded-lg border ${theme === "dark" ? "border-white/20" : "border-black/20"}`}>
            <p className={`text-xs ${theme === "dark" ? "text-white" : "text-black"}`}>Work Area</p>
            <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>{profileData.currentWorkLocation.workArea}</p>
          </div>
          <div className={`p-4 rounded-lg border ${theme === "dark" ? "border-white/20" : "border-black/20"}`}>
            <p className={`text-xs ${theme === "dark" ? "text-white" : "text-black"}`}>Started On</p>
            <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>{new Date(profileData.currentWorkLocation.startDate).toLocaleDateString("en-IN")}</p>
          </div>
        </div>
      </div>

      {/* Document Status */}
      <div className={`${glassThemeClass} p-6 rounded-2xl`}>
        <DocumentStatus documents={profileData.documents} theme={theme} />
      </div>
    </div>
  );
};

export default LabourProfile;
