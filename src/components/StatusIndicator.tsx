// src/components/StatusIndicator.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface StatusItem {
  section: string;
  status: "good" | "warning" | "critical";
  message: string;
  actionRequired?: string;
}

interface StatusIndicatorProps {
  title: string;
  statusItems: StatusItem[];
  theme?: "light" | "dark"; // optional, defaults to light
}

const StatusIndicator = ({ title, statusItems, theme = "light" }: StatusIndicatorProps) => {
  const textColorClass = theme === "dark" ? "text-white" : "text-black";

  const getStatusConfig = (status: StatusItem["status"]) => {
    switch (status) {
      case "good":
        return {
          icon: CheckCircle,
          bgColor: "bg-green-100 dark:bg-green-900/50",
          borderColor: "border-green-300 dark:border-green-700",
          textColor: "text-green-800 dark:text-green-200",
          badgeColor: "bg-green-200 dark:bg-green-800 text-green-900 dark:text-green-100",
        };
      case "warning":
        return {
          icon: Clock,
          bgColor: "bg-yellow-100 dark:bg-yellow-900/50",
          borderColor: "border-yellow-300 dark:border-yellow-700",
          textColor: "text-yellow-800 dark:text-yellow-200",
          badgeColor: "bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100",
        };
      case "critical":
        return {
          icon: AlertTriangle,
          bgColor: "bg-red-100 dark:bg-red-900/50",
          borderColor: "border-red-300 dark:border-red-700",
          textColor: "text-red-800 dark:text-red-200",
          badgeColor: "bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100",
        };
    }
  };

  const overallStatus = statusItems.some((i) => i.status === "critical")
    ? "critical"
    : statusItems.some((i) => i.status === "warning")
    ? "warning"
    : "good";

  const overallConfig = getStatusConfig(overallStatus);
  const OverallIcon = overallConfig.icon;

  const counts = {
    good: statusItems.filter((i) => i.status === "good").length,
    warning: statusItems.filter((i) => i.status === "warning").length,
    critical: statusItems.filter((i) => i.status === "critical").length,
  };

  return (
    <Card className={`${overallConfig.bgColor} ${overallConfig.borderColor} border-2`}>
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${textColorClass}`}>
          <OverallIcon className={`w-5 h-5 ${textColorClass}`} />
          {title}
          <Badge className={`ml-auto text-xs ${overallConfig.badgeColor}`}>
            {overallStatus === "good"
              ? "All Good"
              : overallStatus === "warning"
              ? "Needs Attention"
              : "Urgent Action Required"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Summary */}
        <div className="flex gap-4 mb-4 text-sm">
          {counts.good > 0 && (
            <div className="flex items-center gap-1 text-green-800 dark:text-green-200">
              <CheckCircle className="w-4 h-4" />
              <span>{counts.good} Good</span>
            </div>
          )}
          {counts.warning > 0 && (
            <div className="flex items-center gap-1 text-yellow-800 dark:text-yellow-200">
              <Clock className="w-4 h-4" />
              <span>{counts.warning} Warning</span>
            </div>
          )}
          {counts.critical > 0 && (
            <div className="flex items-center gap-1 text-red-800 dark:text-red-200">
              <AlertTriangle className="w-4 h-4" />
              <span>{counts.critical} Critical</span>
            </div>
          )}
        </div>

        {/* Status Items */}
        <div className="space-y-3">
          {statusItems.map((item, index) => {
            const config = getStatusConfig(item.status);
            const Icon = config.icon;
            return (
              <div
                key={index}
                className={`flex items-start gap-3 p-3 rounded-lg border ${config.bgColor} ${config.borderColor}`}
              >
                <Icon className={`w-4 h-4 mt-0.5 ${config.textColor}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-medium text-sm ${textColorClass}`}>
                      {item.section}
                    </span>
                    <Badge className={`text-xs ${config.badgeColor}`}>
                      {item.status === "good"
                        ? "OK"
                        : item.status === "warning"
                        ? "Warning"
                        : "Critical"}
                    </Badge>
                  </div>
                  <p className={`text-sm ${textColorClass}`}>{item.message}</p>
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
