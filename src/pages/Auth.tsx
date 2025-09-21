import React from 'react';
import { useNavigate } from 'react-router-dom';
import ComicCollage from '@/components/ComicCollage';
import TabbedAuthForm from '@/components/TabbedAuthForm';
import ThemeToggle from '@/components/ThemeToggle';
import Logo from '@/assets/Labour_Logo.png'; // Import your logo image
import { useTheme } from '@/contexts/ThemeContext';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get current theme

  const handleAuthSuccess = () => {
    navigate('/labour-profile');
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
      {/* Comic Collage Background */}
      <ComicCollage />
      
      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Top-left Logo */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-30"
      >
        <img
          src={Logo}
          alt="LabourLink Logo"
          className={`h-24 w-auto cursor-pointer transition-colors duration-300 ${
            theme === 'light' ? 'invert' : ''
          }`}
        />
      </button>

      {/* Auth Form */}
      <div className="relative z-20">
        <TabbedAuthForm onSuccess={handleAuthSuccess} />
      </div>
    </div>
  );
};

export default Auth;
