import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VerificationPending = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 p-3 bg-warning/20 rounded-full w-fit">
            <Clock className="h-8 w-8 text-warning" />
          </div>
          <CardTitle className="text-2xl font-bold">Account Under Review</CardTitle>
          <CardDescription>
            Your account and documents are being reviewed by our team
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm">Account created successfully</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm">Documents uploaded</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
              <Clock className="h-5 w-5 text-warning" />
              <span className="text-sm">Manual verification in progress</span>
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">What happens next?</span>
            </div>
            <p className="text-sm text-muted-foreground text-left">
              Our development team will manually review your documents and verify your identity. 
              You will receive an email notification once your account is approved and you can log in to access your dashboard.
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate('/login')}
            >
              Back to Login
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate('/signup')}
            >
              Sign Up Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationPending;