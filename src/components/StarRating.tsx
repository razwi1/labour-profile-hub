import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
  editable?: boolean; // ✅ new
  onChange?: (rating: number) => void; // ✅ new
}

export const StarRating = ({
  rating,
  maxRating = 5,
  size = "md",
  showValue = true,
  className,
  editable = false,
  onChange,
}: StarRatingProps) => {
  const [currentRating, setCurrentRating] = useState(rating);

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleClick = (index: number) => {
    if (!editable) return;
    setCurrentRating(index + 1);
    onChange?.(index + 1);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }, (_, index) => {
          const filled = index < Math.floor(currentRating);
          const partial = index < currentRating && index >= Math.floor(currentRating);

          return (
            <div
              key={index}
              className="relative cursor-pointer"
              onClick={() => handleClick(index)}
            >
              <Star className={cn(sizeClasses[size], "text-muted-foreground")} />
              {(filled || partial) && (
                <Star
                  className={cn(
                    sizeClasses[size],
                    "absolute top-0 left-0 text-yellow-500 fill-yellow-500"
                  )}
                  style={{
                    clipPath: partial
                      ? `inset(0 ${100 - (currentRating % 1) * 100}% 0 0)`
                      : undefined,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-muted-foreground">
          {currentRating.toFixed(1)} / {maxRating}
        </span>
      )}
    </div>
  );
};
