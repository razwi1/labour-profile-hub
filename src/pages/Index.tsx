import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import constructionBg from "@/assets/construction-bg.jpg";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted relative"
      style={{
        backgroundImage: `url(${constructionBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-background/80"></div>
      <div className="text-center space-y-4 relative z-10">
        <h1 className="text-5xl font-bold mb-4 text-foreground">Welcome to LabourLink</h1>
        <p className="text-xl text-muted-foreground mb-8">Your trusted construction workforce platform</p>
        <Button onClick={() => navigate("/login")} size="lg" className="px-8 py-3 text-lg">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;
