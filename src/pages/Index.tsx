import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import constructionBg from "@/assets/construction-bg.jpg";
import { ArrowRight, Building2, Users, Shield, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Simplified Hero Section */}
        <div className="text-center space-y-8 max-w-2xl">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <Building2 className="w-16 h-16 text-primary" />
            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight">
              LabourLink
            </h1>
          </div>
          
          {/* Simple Tagline */}
          <p className="text-xl text-muted-foreground font-normal leading-relaxed">
            Construction workforce management made simple
          </p>
          
          {/* Single CTA Button */}
          <div className="pt-8">
            <Button 
              onClick={() => navigate("/login")} 
              size="lg"
              className="px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
