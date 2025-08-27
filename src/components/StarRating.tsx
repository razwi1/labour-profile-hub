import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

export const StarRating = ({ 
  rating, 
  maxRating = 5, 
  size = "md", 
  showValue = true,
  className 
}: StarRatingProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }, (_, index) => {
          const filled = index < Math.floor(rating);
          const partial = index < rating && index >= Math.floor(rating);
          
          return (
            <div key={index} className="relative">
              <Star className={cn(sizeClasses[size], "text-muted-foreground")} />
              {(filled || partial) && (
                <Star 
                  className={cn(
                    sizeClasses[size], 
                    "absolute top-0 left-0 text-yellow-500 fill-yellow-500"
                  )}
                  style={{
                    clipPath: partial ? `inset(0 ${100 - (rating % 1) * 100}% 0 0)` : undefined
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-muted-foreground">
          {rating.toFixed(1)} / {maxRating}
        </span>
      )}
    </div>
  );
};