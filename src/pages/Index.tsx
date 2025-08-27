import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold mb-8">Welcome</h1>
        <Button onClick={() => navigate("/login")} size="lg">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;
