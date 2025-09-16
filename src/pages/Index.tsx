import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import constructionBg from "@/assets/construction-bg.jpg";
import { ArrowRight, Building2, Users, Shield, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 via-purple-50 to-orange-100 animate-gradient-shift" />
      <div className="absolute inset-0 bg-gradient-to-tr from-orange-100/50 via-transparent via-blue-100/30 to-slate-200/40 animate-gradient-shift-reverse" />
      
      {/* Moving gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-orange-200/30 to-amber-200/30 rounded-full blur-3xl opacity-60 animate-float-slow" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl opacity-50 animate-float-reverse" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-slate-200/25 to-gray-200/25 rounded-full blur-3xl opacity-40 animate-pulse-slow" />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Hero Section with Translucent Glass */}
        <div className="glass-card p-12 text-center space-y-8 max-w-2xl backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="glass-card p-4 rounded-2xl backdrop-blur-md bg-white/15 border border-white/25">
              <Building2 className="w-16 h-16 text-primary drop-shadow-sm" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight drop-shadow-sm">
              LabourLink
            </h1>
          </div>
          
          {/* Simple Tagline */}
          <p className="text-xl text-slate-700 font-normal leading-relaxed drop-shadow-sm">
            Construction workforce management made simple
          </p>
          
          {/* Single CTA Button */}
          <div className="pt-8">
            <Button 
              onClick={() => navigate("/login")} 
              size="lg"
              className="px-12 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-primary hover:bg-primary/90"
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
