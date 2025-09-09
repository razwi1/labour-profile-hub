import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  color?: "blue" | "green" | "yellow" | "red" | "default"
  isExpanded?: boolean
  onClick?: () => void
  children?: React.ReactNode
  className?: string
}

const colorClasses = {
  blue: "from-blue-500/10 to-blue-600/10 border-blue-200/50",
  green: "from-green-500/10 to-green-600/10 border-green-200/50 text-safety-green",
  yellow: "from-yellow-500/10 to-yellow-600/10 border-yellow-200/50 text-construction-yellow",
  red: "from-red-500/10 to-red-600/10 border-red-200/50 text-safety-red",
  default: "from-gray-500/10 to-gray-600/10 border-gray-200/50"
}

export const DashboardCard = React.forwardRef<
  HTMLDivElement,
  DashboardCardProps
>(({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color = "default", 
  isExpanded = false, 
  onClick, 
  children, 
  className, 
  ...props 
}, ref) => {
  return (
    <Card
      ref={ref}
      className={cn(
        "curved-quad glass-card cursor-pointer animate-fluid",
        `bg-gradient-to-br ${colorClasses[color]}`,
        isExpanded ? "expanded" : "",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {icon && (
            <div className="p-2 rounded-lg bg-white/20">
              {icon}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
        {isExpanded && children && (
          <div className="mt-4 animate-fluid">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  )
})

DashboardCard.displayName = "DashboardCard"