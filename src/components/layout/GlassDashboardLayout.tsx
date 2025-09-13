import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { GlassSidebar } from "./GlassSidebar"
import { Button } from "@/components/ui/button"
import { Bell, User, Menu } from "lucide-react"
import { useState } from "react"

interface GlassDashboardLayoutProps {
  children: React.ReactNode
  title: string
  userRole: string
  heroContent?: React.ReactNode
}

export function GlassDashboardLayout({ children, title, userRole, heroContent }: GlassDashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <GlassSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Premium Glass Header */}
          <header className="glass-nav h-20 flex items-center justify-between px-8 backdrop-blur-glass border-b border-glass relative z-50">
            <div className="flex items-center gap-6">
              <SidebarTrigger className="text-foreground hover:text-secondary hover:bg-accent/20 p-2 rounded-xl transition-all duration-300" />
              <div>
                <h1 className="text-2xl font-bold text-gradient">{title}</h1>
                <p className="text-sm text-muted-foreground capitalize font-medium">{userRole} Portal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="neuro-button text-foreground hover:text-secondary hover:shadow-glow relative group"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-glow"></span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="neuro-button text-foreground hover:text-secondary hover:shadow-glow"
              >
                <User className="h-5 w-5" />
              </Button>
            </div>
          </header>

          {/* Hero Section */}
          {heroContent && (
            <div className="p-8 animate-slide-up">
              {heroContent}
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-8 space-y-8">
            <div className="animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 mobile-nav p-4 z-50">
        <div className="flex items-center justify-around">
          <Button
            variant="ghost"
            size="sm"
            className="mobile-nav-item active flex-col gap-1 p-3"
          >
            <Bell className="w-5 h-5" />
            <span className="text-xs">Alerts</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="mobile-nav-item flex-col gap-1 p-3"
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="mobile-nav-item flex-col gap-1 p-3"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
            <span className="text-xs">Menu</span>
          </Button>
        </div>
      </div>
    </SidebarProvider>
  )
}