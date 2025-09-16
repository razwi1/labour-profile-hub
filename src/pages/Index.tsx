import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import constructionBg from "@/assets/construction-bg.jpg";
import { ArrowRight, Building2, Users, Shield, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200">
      {/* Glassmorphism overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-slate-300/20" />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Simplified Hero Section with Glass Card */}
        <div className="glass-card p-12 text-center space-y-8 max-w-2xl backdrop-blur-xl">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="glass-card p-4 rounded-2xl backdrop-blur-md">
              <Building2 className="w-16 h-16 text-primary" />
            </div>
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
              className="px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm"
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
