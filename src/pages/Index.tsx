import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import constructionBg from "@/assets/construction-bg.jpg";
import { ArrowRight, Building2, Users, Shield, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url(${constructionBg})`,
        }}
      />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-secondary/10 blur-xl animate-float" />
      <div className="absolute bottom-32 right-20 w-24 h-24 rounded-full bg-success/10 blur-xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-10 w-16 h-16 rounded-full bg-warning/10 blur-xl animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        {/* Hero Section */}
        <div className="text-center space-y-8 animate-slide-up">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="neuro-container p-4 rounded-2xl">
              <Building2 className="w-12 h-12 text-secondary" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-gradient">
              LabourLink
            </h1>
          </div>
          
          {/* Tagline */}
          <p className="text-2xl md:text-3xl text-muted-foreground font-light max-w-4xl mx-auto leading-relaxed">
            The Future of Construction Workforce Management
          </p>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect, manage, and optimize your construction teams with premium glassmorphism interfaces 
            designed for modern construction executives.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
            <Button 
              onClick={() => navigate("/login")} 
              className="btn-primary px-8 py-4 text-lg font-semibold rounded-2xl min-w-48 group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="ghost" 
              className="btn-glass px-8 py-4 text-lg rounded-2xl min-w-48"
            >
              Watch Demo
            </Button>
          </div>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-6xl animate-fade-in">
          {/* Feature 1 */}
          <div className="glass-card p-8 text-center hover-lift group">
            <div className="neuro-container w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl group-hover:shadow-glow transition-all duration-500">
              <Users className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Smart Workforce</h3>
            <p className="text-muted-foreground leading-relaxed">
              Real-time tracking, performance analytics, and intelligent workforce optimization
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="glass-card p-8 text-center hover-lift group">
            <div className="neuro-container w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl group-hover:shadow-glow transition-all duration-500">
              <Shield className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Enterprise Security</h3>
            <p className="text-muted-foreground leading-relaxed">
              Bank-grade security with compliance tracking and audit trails
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="glass-card p-8 text-center hover-lift group">
            <div className="neuro-container w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl group-hover:shadow-glow transition-all duration-500">
              <Zap className="w-8 h-8 text-warning" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Lightning Fast</h3>
            <p className="text-muted-foreground leading-relaxed">
              Instant updates, real-time sync, and blazing-fast performance
            </p>
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="glass-card mt-20 p-8 text-center max-w-4xl animate-scale-in">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Transform Your Construction Management?
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            Join industry leaders who trust LabourLink for their workforce management needs
          </p>
          <Button 
            onClick={() => navigate("/login")} 
            className="btn-primary px-10 py-4 text-lg font-semibold rounded-2xl animate-glow"
          >
            Start Your Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
