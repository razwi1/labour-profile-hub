import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { 
  LayoutDashboard, 
  Users, 
  HardHat, 
  ClipboardList, 
  Settings, 
  FileText,
  BarChart3,
  UserCheck,
  Building,
  Shield
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"

// Navigation items for different user roles
const adminItems = [
  { title: "Dashboard", url: "/admin-dashboard", icon: LayoutDashboard },
  { title: "Manage Users", url: "/admin/users", icon: Users },
  { title: "Projects", url: "/admin/projects", icon: Building },
  { title: "Reports", url: "/admin/reports", icon: BarChart3 },
  { title: "Safety Compliance", url: "/admin/safety", icon: Shield },
  { title: "Settings", url: "/admin/settings", icon: Settings },
]

const clientItems = [
  { title: "Dashboard", url: "/client-dashboard", icon: LayoutDashboard },
  { title: "My Projects", url: "/client/projects", icon: Building },
  { title: "Workers", url: "/client/workers", icon: HardHat },
  { title: "Reports", url: "/client/reports", icon: FileText },
  { title: "Settings", url: "/client/settings", icon: Settings },
]

const supervisorItems = [
  { title: "Dashboard", url: "/supervisor-dashboard", icon: LayoutDashboard },
  { title: "Worker Management", url: "/supervisor/workers", icon: Users },
  { title: "Site Safety", url: "/supervisor/safety", icon: Shield },
  { title: "Task Assignment", url: "/supervisor/tasks", icon: ClipboardList },
  { title: "Compliance", url: "/supervisor/compliance", icon: UserCheck },
  { title: "Settings", url: "/supervisor/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"
  const location = useLocation()
  const currentPath = location.pathname

  // Determine user role based on current path (in real app, get from auth context)
  const getUserRole = () => {
    if (currentPath.includes('/admin')) return 'admin'
    if (currentPath.includes('/client')) return 'client'
    if (currentPath.includes('/supervisor')) return 'supervisor'
    return 'admin' // default
  }

  const userRole = getUserRole()
  const getNavigationItems = () => {
    switch (userRole) {
      case 'admin': return adminItems
      case 'client': return clientItems
      case 'supervisor': return supervisorItems
      default: return adminItems
    }
  }

  const navigationItems = getNavigationItems()
  const isActive = (path: string) => currentPath === path
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
      : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"

  return (
    <Sidebar
      className={cn(
        "nav-header border-r-2 border-sidebar-border",
        collapsed ? "w-16" : "w-64"
      )}
      collapsible="icon"
    >
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-construction-yellow/20">
            <HardHat className="h-6 w-6 text-construction-yellow" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-sidebar-foreground">
                LabourLink
              </h2>
              <p className="text-xs text-sidebar-foreground/70 capitalize">
                {userRole} Portal
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60 mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) => cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                        getNavClass({ isActive })
                      )}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {!collapsed && (
          <div className="glass-card p-3 rounded-lg">
            <p className="text-xs text-sidebar-foreground/70">
              Construction Industry Management Platform
            </p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}