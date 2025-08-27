import { useState } from "react";
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
  Mail
} from "lucide-react";
import { ProgressBar } from "@/components/ProgressBar";
import { DocumentStatus } from "@/components/DocumentStatus";
import { StarRating } from "@/components/StarRating";
import workerProfile from "@/assets/worker-profile.jpg";

const LabourProfile = () => {
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
    documents: [
      { name: "AADHAR CARD", status: 'verified' as const },
      { name: "PAN CARD", status: 'verified' as const },
      { name: "LABOUR LICENSE", status: 'verified' as const },
      { name: "BANK PASSBOOK", status: 'pending' as const },
      { name: "POLICE VERIFICATION", status: 'required' as const },
    ]
  });

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
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