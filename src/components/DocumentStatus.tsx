import { CheckCircle, Clock, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Document {
  name: string;
  status: 'verified' | 'pending' | 'required';
}

interface DocumentStatusProps {
  documents: Document[];
}

export const DocumentStatus = ({ documents }: DocumentStatusProps) => {
  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'required':
        return <FileText className="w-4 h-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: Document['status']) => {
    switch (status) {
      case 'verified':
        return <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20">Verified ✓</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-warning/10 text-warning hover:bg-warning/20">Pending</Badge>;
      case 'required':
        return <Badge variant="outline">Required</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Document Verification
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-3">
                {getStatusIcon(doc.status)}
                <span className="font-medium">{doc.name}</span>
              </div>
              {getStatusBadge(doc.status)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};