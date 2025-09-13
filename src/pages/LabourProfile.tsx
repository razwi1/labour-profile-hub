import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  MapPin, 
  Briefcase, 
  Award, 
  Calendar,
  Upload,
  IndianRupee,
  Phone,
  Mail,
  LogOut
} from "lucide-react";
import { ProgressBar } from "@/components/ProgressBar";
import { DocumentStatus } from "@/components/DocumentStatus";
import { StarRating } from "@/components/StarRating";
import StatusIndicator from "@/components/StatusIndicator";
import workerProfile from "@/assets/worker-profile.jpg";

const LabourProfile = () => {
  const navigate = useNavigate();
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
      startDate: "2024-01-15"
    },
    documents: [
      { name: "AADHAR CARD", status: 'verified' as const },
      { name: "PAN CARD", status: 'verified' as const },
      { name: "LABOUR LICENSE", status: 'verified' as const },
      { name: "BANK PASSBOOK", status: 'pending' as const },
      { name: "POLICE VERIFICATION", status: 'required' as const },
    ]
  });

  // Generate status indicators based on profile data
  const getStatusItems = () => {
    const items = [];
    
    // Payment Status
    const paymentPercent = (profileData.amountPaid / profileData.totalBudget) * 100;
    if (paymentPercent >= 90) {
      items.push({ section: 'Payment Status', status: 'good' as const, message: 'Payments up to date' });
    } else if (paymentPercent >= 70) {
      items.push({ section: 'Payment Status', status: 'warning' as const, message: 'Payment partially pending' });
    } else {
      items.push({ section: 'Payment Status', status: 'critical' as const, message: 'Significant payment pending', actionRequired: 'Contact admin for payment' });
    }

    // Document Status
    const verifiedDocs = profileData.documents.filter(doc => doc.status === 'verified').length;
    const pendingDocs = profileData.documents.filter(doc => doc.status === 'pending').length;
    const requiredDocs = profileData.documents.filter(doc => doc.status === 'required').length;
    
    if (requiredDocs > 0) {
      items.push({ section: 'Documentation', status: 'critical' as const, message: `${requiredDocs} documents required`, actionRequired: 'Submit missing documents' });
    } else if (pendingDocs > 0) {
      items.push({ section: 'Documentation', status: 'warning' as const, message: `${pendingDocs} documents under review` });
    } else {
      items.push({ section: 'Documentation', status: 'good' as const, message: 'All documents verified' });
    }

    // Performance Status
    if (profileData.rating >= 4.5) {
      items.push({ section: 'Performance Rating', status: 'good' as const, message: `Excellent performance (${profileData.rating}/5)` });
    } else if (profileData.rating >= 3.5) {
      items.push({ section: 'Performance Rating', status: 'warning' as const, message: `Good performance (${profileData.rating}/5)` });
    } else {
      items.push({ section: 'Performance Rating', status: 'critical' as const, message: `Performance needs improvement (${profileData.rating}/5)`, actionRequired: 'Skill development recommended' });
    }

    // Work Status
    items.push({ section: 'Work Status', status: 'good' as const, message: 'Currently active on site' });

    return items;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-secondary/10 blur-xl animate-float" />
      <div className="absolute bottom-32 right-20 w-24 h-24 rounded-full bg-success/10 blur-xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-10 w-16 h-16 rounded-full bg-warning/10 blur-xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Premium Header with Logout */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="neuro-container p-3 rounded-xl">
                <User className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">Labour Profile</h1>
                <p className="text-sm text-muted-foreground">Personal Dashboard & Management</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="btn-glass flex items-center gap-2 hover:shadow-glow"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

        {/* Status Overview */}
        <StatusIndicator 
          title="Profile Status Overview"
          statusItems={getStatusItems()}
        />

        {/* Premium Hero Section */}
        <div className="hero-card animate-slide-up">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-secondary/30 shadow-glow">
                <AvatarImage src={workerProfile} alt={profileData.name} />
                <AvatarFallback className="text-3xl bg-accent text-primary">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center border-2 border-background">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse" />
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gradient mb-2">{profileData.name}</h1>
              <p className="text-xl text-muted-foreground mb-6">{profileData.jobRole}</p>
              
              <div className="flex flex-wrap gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-secondary" />
                  <span className="font-medium">{profileData.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-secondary" />
                  <span className="font-medium">{profileData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-secondary" />
                  <span className="font-medium">{profileData.placeOfOrigin}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Budget Progress Section */}
        <div className="glass-card p-6 hover-lift">
          <div className="flex items-center gap-3 mb-6">
            <div className="neuro-container p-3 rounded-xl">
              <IndianRupee className="w-6 h-6 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Project Budget & Payment Status</h2>
          </div>
          <ProgressBar 
            current={profileData.amountPaid}
            total={profileData.totalBudget}
          />
        </div>

        {/* Current Work Location */}
        <div className="glass-card p-6 hover-lift">
          <div className="flex items-center gap-3 mb-6">
            <div className="neuro-container p-3 rounded-xl">
              <MapPin className="w-6 h-6 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Current Work Location</h2>
          </div>
          <div className="space-y-6">
            <div>
              <p className="font-bold text-2xl text-foreground mb-2">{profileData.currentWorkLocation.siteName}</p>
              <p className="text-lg text-muted-foreground">{profileData.currentWorkLocation.address}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-container p-4 rounded-xl">
                <p className="text-sm font-medium text-muted-foreground mb-2">Work Area</p>
                <p className="font-semibold text-lg text-foreground">{profileData.currentWorkLocation.workArea}</p>
              </div>
              <div className="glass-container p-4 rounded-xl">
                <p className="text-sm font-medium text-muted-foreground mb-2">Started On</p>
                <p className="font-semibold text-lg text-foreground">{new Date(profileData.currentWorkLocation.startDate).toLocaleDateString('en-IN')}</p>
              </div>
            </div>
            <div className="glass-container p-4 rounded-xl border-glass-accent bg-success/10">
              <div className="flex items-center gap-3 text-success">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="font-semibold text-lg">Currently Active on Site</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Details */}
          <div className="glass-card p-6 hover-lift">
            <div className="flex items-center gap-3 mb-6">
              <div className="neuro-container p-3 rounded-xl">
                <User className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Profile Details</h2>
            </div>
            <div className="space-y-6">
              {/* Experience & Role */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Current Role</span>
                  </div>
                  <Badge variant="secondary">{profileData.jobRole}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">Experience</span>
                  </div>
                  <Badge variant="outline">{profileData.experience}</Badge>
                </div>
              </div>

              <Separator />

              {/* Skills */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Ratings */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Overall Rating</h3>
                  <StarRating rating={profileData.rating} />
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Loyalty Rating</h3>
                  <StarRating rating={profileData.loyaltyRating} />
                </div>
              </div>

              {/* Add Documents Button */}
              <Button className="w-full btn-primary" variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Add Documents
              </Button>
            </div>
          </div>

          {/* Document Verification */}
          <div className="glass-card p-6 hover-lift">
            <DocumentStatus documents={profileData.documents} />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default LabourProfile;