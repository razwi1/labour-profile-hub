import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { Building2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import ComicCollage from "@/components/ComicCollage";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
      {/* Comic Collage Background */}
      <ComicCollage />
      
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Main Login Card */}
      <div className="w-full max-w-md relative z-20">
        <Card className={`backdrop-blur-md border-0 shadow-2xl ${
          theme === 'dark' 
            ? 'bg-black/20 border-white/10' 
            : 'bg-white/20 border-black/10'
        }`}>
          <CardHeader className="text-center space-y-6">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3">
              <div className={`p-3 rounded-xl ${
                theme === 'dark' ? 'bg-white/10' : 'bg-black/10'
              }`}>
                <Building2 className={`w-8 h-8 ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`} />
              </div>
              <span className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                LabourLink
              </span>
            </div>
            <div>
              <CardTitle className={`text-3xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Welcome Back
              </CardTitle>
              <CardDescription className={`text-lg ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Sign in to your construction workspace
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Login Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`pl-10 py-3 ${
                      theme === 'dark' 
                        ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' 
                        : 'bg-black/10 border-black/20 text-black placeholder:text-gray-500'
                    }`}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  Password
                </Label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`pl-10 pr-10 py-3 ${
                      theme === 'dark' 
                        ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' 
                        : 'bg-black/10 border-black/20 text-black placeholder:text-gray-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'
                    } transition-colors`}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
            
            <Button 
              className={`w-full py-3 text-lg font-semibold ${
                theme === 'dark' 
                  ? 'bg-white text-black hover:bg-gray-200' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              Sign In
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className={`w-full ${
                  theme === 'dark' ? 'bg-white/20' : 'bg-black/20'
                }`} />
              </div>
              <div className="relative flex justify-center text-sm uppercase">
                <span className={`px-4 ${
                  theme === 'dark' ? 'bg-black text-gray-300' : 'bg-white text-gray-600'
                }`}>
                  Or continue with
                </span>
              </div>
            </div>
            
            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className={`py-3 ${
                  theme === 'dark' 
                    ? 'border-white/20 text-white hover:bg-white/10' 
                    : 'border-black/20 text-black hover:bg-black/10'
                }`}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button 
                variant="outline" 
                className={`py-3 ${
                  theme === 'dark' 
                    ? 'border-white/20 text-white hover:bg-white/10' 
                    : 'border-black/20 text-black hover:bg-black/10'
                }`}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>
            
            <div className="text-center text-sm">
              <span className={`${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Don't have an account? 
              </span>
              <Button 
                variant="link" 
                className={`p-0 h-auto font-medium ${
                  theme === 'dark' 
                    ? 'text-white hover:text-gray-300' 
                    : 'text-black hover:text-gray-600'
                }`}
                onClick={() => navigate('/signup')}
              >
                Sign up
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;