import { useState } from "react"
import { Building2, Home, Users, BarChart3, Settings, HelpCircle, LogOut, ChevronRight } from "lucide-react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const adminItems = [
  { title: "Dashboard", url: "/admin-dashboard", icon: Home },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
]

const clientItems = [
  { title: "Dashboard", url: "/client-dashboard", icon: Home },
  { title: "Projects", url: "/client/projects", icon: Building2 },
  { title: "Reports", url: "/client/reports", icon: BarChart3 },
  { title: "Settings", url: "/client/settings", icon: Settings },
]

const supervisorItems = [
  { title: "Dashboard", url: "/supervisor-dashboard", icon: Home },
  { title: "Team", url: "/supervisor/team", icon: Users },
  { title: "Reports", url: "/supervisor/reports", icon: BarChart3 },
  { title: "Settings", url: "/supervisor/settings", icon: Settings },
]

const labourItems = [
  { title: "Profile", url: "/labour-profile", icon: Home },
  { title: "Schedule", url: "/labour/schedule", icon: BarChart3 },
  { title: "Settings", url: "/labour/settings", icon: Settings },
]

export function GlassSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  // Determine user role from path
  let userRole = "admin"
  let navigationItems = adminItems

  if (currentPath.startsWith("/client")) {
    userRole = "client"
    navigationItems = clientItems
  } else if (currentPath.startsWith("/supervisor")) {
    userRole = "supervisor"
    navigationItems = supervisorItems
  } else if (currentPath.startsWith("/labour")) {
    userRole = "labour"
    navigationItems = labourItems
  }

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + "/")

  return (
    <Sidebar
      className={cn(
        "glass-nav border-r border-glass transition-all duration-300",
        collapsed ? "w-16" : "w-72"
      )}
      collapsible="icon"
    >
      <SidebarContent className="p-4 space-y-6">
        {/* Logo Section */}
        <div className={cn(
          "flex items-center gap-3 px-3 py-4 transition-all duration-300",
          collapsed && "justify-center"
        )}>
          <div className="neuro-container p-3 rounded-xl">
            <Building2 className="w-6 h-6 text-secondary" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-xl font-bold text-gradient">LabourLink</h2>
              <p className="text-xs text-muted-foreground capitalize">{userRole} Portal</p>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <SidebarGroup className="space-y-2">
          {!collapsed && (
            <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-3">
              Navigation
            </SidebarGroupLabel>
          )}

          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={cn(
                        "nav-item flex items-center gap-3 px-3 py-3 w-full text-left transition-all duration-300 relative group",
                        isActive(item.url) 
                          ? "active text-primary bg-accent shadow-glow" 
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="font-medium">{item.title}</span>
                          {isActive(item.url) && (
                            <ChevronRight className="w-4 h-4 ml-auto opacity-60" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        {!collapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wider font-medium px-3">
              Quick Actions
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="space-y-2 px-3">
                <Button 
                  variant="ghost" 
                  className="btn-glass w-full justify-start gap-3 py-2.5"
                >
                  <HelpCircle className="w-4 h-4" />
                  Help & Support
                </Button>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* User Section */}
        <div className="mt-auto">
          <div className={cn(
            "glass-card p-4 transition-all duration-300",
            collapsed && "p-3"
          )}>
            {!collapsed ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                    <Users className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">John Doe</p>
                    <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="btn-glass w-full justify-start gap-2 text-sm py-2"
                  onClick={() => navigate('/')}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="icon"
                className="neuro-button w-full"
                onClick={() => navigate('/')}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}