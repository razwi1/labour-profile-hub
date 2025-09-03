import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface StatusItem {
  section: string;
  status: 'good' | 'warning' | 'critical';
  message: string;
  actionRequired?: string;
}

interface StatusIndicatorProps {
  title: string;
  statusItems: StatusItem[];
}

const StatusIndicator = ({ title, statusItems }: StatusIndicatorProps) => {
  const getStatusConfig = (status: StatusItem['status']) => {
    switch (status) {
      case 'good':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50 dark:bg-green-950/20',
          borderColor: 'border-green-200 dark:border-green-800',
          badgeVariant: 'secondary' as const,
          badgeClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
        };
      case 'warning':
        return {
          icon: Clock,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          badgeVariant: 'outline' as const,
          badgeClass: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 border-yellow-300'
        };
      case 'critical':
        return {
          icon: AlertTriangle,
          color: 'text-red-600',
          bgColor: 'bg-red-50 dark:bg-red-950/20',
          borderColor: 'border-red-200 dark:border-red-800',
          badgeVariant: 'destructive' as const,
          badgeClass: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
        };
    }
  };

  const overallStatus = statusItems.some(item => item.status === 'critical') 
    ? 'critical' 
    : statusItems.some(item => item.status === 'warning') 
    ? 'warning' 
    : 'good';

  const overallConfig = getStatusConfig(overallStatus);
  const OverallIcon = overallConfig.icon;

  const criticalCount = statusItems.filter(item => item.status === 'critical').length;
  const warningCount = statusItems.filter(item => item.status === 'warning').length;
  const goodCount = statusItems.filter(item => item.status === 'good').length;

  return (
    <Card className={`${overallConfig.bgColor} ${overallConfig.borderColor} border-2`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <OverallIcon className={`w-5 h-5 ${overallConfig.color}`} />
          {title}
          <Badge className={overallConfig.badgeClass}>
            {overallStatus === 'good' ? 'All Good' : 
             overallStatus === 'warning' ? 'Needs Attention' : 
             'Urgent Action Required'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Summary Stats */}
        <div className="flex gap-4 mb-4 text-sm">
          {goodCount > 0 && (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span>{goodCount} Good</span>
            </div>
          )}
          {warningCount > 0 && (
            <div className="flex items-center gap-1 text-yellow-600">
              <Clock className="w-4 h-4" />
              <span>{warningCount} Warning</span>
            </div>
          )}
          {criticalCount > 0 && (
            <div className="flex items-center gap-1 text-red-600">
              <AlertTriangle className="w-4 h-4" />
              <span>{criticalCount} Critical</span>
            </div>
          )}
        </div>

        {/* Status Items */}
        <div className="space-y-3">
          {statusItems.map((item, index) => {
            const config = getStatusConfig(item.status);
            const Icon = config.icon;
            
            return (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-card border">
                <Icon className={`w-4 h-4 mt-0.5 ${config.color}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{item.section}</span>
                    <Badge variant={config.badgeVariant} className="text-xs">
                      {item.status === 'good' ? 'OK' : 
                       item.status === 'warning' ? 'Warning' : 
                       'Critical'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.message}</p>
                  {item.actionRequired && (
                    <p className="text-xs mt-1 font-medium text-primary">
                      Action: {item.actionRequired}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusIndicator;