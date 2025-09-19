import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import labourlinkHero from "@/assets/labourlink_hero.mp4";
import { ArrowRight, Building2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={labourlinkHero} type="video/mp4" />
      </video>
      
      {/* Video Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Hero Section */}
        <div className="text-center space-y-8 animate-slide-up">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="neuro-container p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
              <Building2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-2xl">
              LabourLink
            </h1>
          </div>
          
          {/* Punchline */}
          <p className="text-2xl md:text-4xl text-white/90 font-light max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
            Connecting Construction Excellence
          </p>
          
          {/* CTA Button */}
          <div className="mt-12">
            <Button 
              onClick={() => navigate("/auth")} 
              className="bg-white text-black hover:bg-white/90 px-12 py-6 text-xl font-semibold rounded-2xl min-w-64 group shadow-2xl hover:shadow-white/20 transition-all duration-300"
            >
              Get Started
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
