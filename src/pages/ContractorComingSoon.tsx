import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContractorComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 p-3 bg-warning/20 rounded-full w-fit">
            <Construction className="h-8 w-8 text-warning" />
          </div>
          <CardTitle className="text-2xl font-bold">Under Construction</CardTitle>
          <CardDescription>
            The contractor dashboard is currently being developed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              We're working hard to bring you a comprehensive contractor dashboard. 
              This will include project management tools, worker oversight, budget tracking, and much more.
            </p>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Expected features:</p>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                <span>• Project Management</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                <span>• Budget & Cost Control</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                <span>• Worker Management</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                <span>• Progress Tracking</span>
              </div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/login')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractorComingSoon;