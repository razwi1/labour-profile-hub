import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Mail, Lock, Eye, EyeOff, Upload, X } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';

interface TabbedAuthFormProps {
  onSuccess?: () => void;
}

const TabbedAuthForm: React.FC<TabbedAuthFormProps> = ({ onSuccess }) => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [documents, setDocuments] = useState<File[]>([]);

  const handleLogin = async () => {
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Logged in successfully!",
        variant: "default"
      });
      onSuccess?.();
      setIsLoading(false);
    }, 1000);
  };

  const handleSignup = async () => {
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }

    if (!signupData.role) {
      toast({
        title: "Error",
        description: "Please select a user role",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // Simulate signup
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Account created successfully!",
        variant: "default"
      });
      onSuccess?.();
      setIsLoading(false);
    }, 1000);
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setDocuments(prev => [...prev, ...newFiles]);
    }
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Card className={`w-full max-w-md backdrop-blur-md border-0 shadow-2xl ${
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

        {/* Tabs */}
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === 'login'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
              activeTab === 'signup'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Sign Up
          </button>
        </div>

        <div>
          <CardTitle className={`text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}>
            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
          </CardTitle>
          <CardDescription className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {activeTab === 'login' 
              ? 'Sign in to your construction workspace' 
              : 'Sign up to get started'
            }
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {activeTab === 'login' ? (
          // Login Form
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email" className={`font-medium ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Email Address
              </Label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <Input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  className={`pl-10 py-3 ${
                    theme === 'dark' 
                      ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' 
                      : 'bg-black/10 border-black/20 text-black placeholder:text-gray-500'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password" className={`font-medium ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Password
              </Label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
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

            <Button 
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full py-3 text-lg font-semibold ${
                theme === 'dark' 
                  ? 'bg-white text-black hover:bg-gray-200' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
        ) : (
          // Signup Form
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName" className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  First Name
                </Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={signupData.firstName}
                  onChange={(e) => setSignupData(prev => ({ ...prev, firstName: e.target.value }))}
                  className={`py-3 ${
                    theme === 'dark' 
                      ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' 
                      : 'bg-black/10 border-black/20 text-black placeholder:text-gray-500'
                  }`}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className={`font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-black'
                }`}>
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={signupData.lastName}
                  onChange={(e) => setSignupData(prev => ({ ...prev, lastName: e.target.value }))}
                  className={`py-3 ${
                    theme === 'dark' 
                      ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' 
                      : 'bg-black/10 border-black/20 text-black placeholder:text-gray-500'
                  }`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email" className={`font-medium ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Email
              </Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                value={signupData.email}
                onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                className={`py-3 ${
                  theme === 'dark' 
                    ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' 
                    : 'bg-black/10 border-black/20 text-black placeholder:text-gray-500'
                }`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className={`font-medium ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                User Role
              </Label>
              <Select value={signupData.role} onValueChange={(value) => setSignupData(prev => ({ ...prev, role: value }))}>
                <SelectTrigger className={`py-3 ${
                  theme === 'dark' 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : 'bg-black/10 border-black/20 text-black'
                }`}>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="labour">Labour</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="site_manager">Site Manager</SelectItem>
                  <SelectItem value="client_contractor">Client/Contractor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-password" className={`font-medium ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Password
              </Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="Create a password"
                value={signupData.password}
                onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                className={`py-3 ${
                  theme === 'dark' 
                    ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' 
                    : 'bg-black/10 border-black/20 text-black placeholder:text-gray-500'
                }`}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className={`font-medium ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`}>
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={signupData.confirmPassword}
                onChange={(e) => setSignupData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className={`py-3 ${
                  theme === 'dark' 
                    ? 'bg-white/10 border-white/20 text-white placeholder:text-gray-400' 
                    : 'bg-black/10 border-black/20 text-black placeholder:text-gray-500'
                }`}
              />
            </div>

            <Button 
              onClick={handleSignup}
              disabled={isLoading}
              className={`w-full py-3 text-lg font-semibold ${
                theme === 'dark' 
                  ? 'bg-white text-black hover:bg-gray-200' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        )}

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
      </CardContent>
    </Card>
  );
};

export default TabbedAuthForm;

