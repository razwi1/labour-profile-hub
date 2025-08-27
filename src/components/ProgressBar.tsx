import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
  showLabels?: boolean;
}

export const ProgressBar = ({ current, total, className, showLabels = true }: ProgressBarProps) => {
  const percentage = Math.min((current / total) * 100, 100);
  
  return (
    <div className={cn("space-y-2", className)}>
      {showLabels && (
        <div className="flex justify-between text-sm font-medium">
          <span className="text-muted-foreground">Paid: ₹{current.toLocaleString()}</span>
          <span className="text-muted-foreground">Total: ₹{total.toLocaleString()}</span>
        </div>
      )}
      <div className="h-3 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-center text-sm font-semibold text-primary">
        {percentage.toFixed(1)}% Complete
      </div>
    </div>
  );
};