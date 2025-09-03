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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Logout Button */}
        <div className="flex justify-end mb-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
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

        {/* Header Section */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-blue-600 p-6 text-primary-foreground">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="w-24 h-24 border-4 border-white/20">
                <AvatarImage src={workerProfile} alt={profileData.name} />
                <AvatarFallback className="text-2xl bg-white/20">
                  {profileData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{profileData.name}</h1>
                <p className="text-lg opacity-90 mb-3">{profileData.jobRole}</p>
                
                <div className="flex flex-wrap gap-4 text-sm opacity-90">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {profileData.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {profileData.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {profileData.placeOfOrigin}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Budget Progress Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IndianRupee className="w-5 h-5" />
              Project Budget & Payment Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressBar 
              current={profileData.amountPaid}
              total={profileData.totalBudget}
            />
          </CardContent>
        </Card>

        {/* Current Work Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Current Work Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-lg">{profileData.currentWorkLocation.siteName}</p>
                <p className="text-muted-foreground">{profileData.currentWorkLocation.address}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Work Area</p>
                  <p className="font-medium">{profileData.currentWorkLocation.workArea}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Started On</p>
                  <p className="font-medium">{new Date(profileData.currentWorkLocation.startDate).toLocaleDateString('en-IN')}</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Currently Active on Site</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
              <Button className="w-full" variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Add Documents
              </Button>
            </CardContent>
          </Card>

          {/* Document Verification */}
          <DocumentStatus documents={profileData.documents} />
        </div>
      </div>
    </div>
  );
};

export default LabourProfile;