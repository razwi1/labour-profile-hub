import React from 'react';
import { useNavigate } from 'react-router-dom';
import ComicCollage from '@/components/ComicCollage';
import TabbedAuthForm from '@/components/TabbedAuthForm';
import ThemeToggle from '@/components/ThemeToggle';

const Auth: React.FC = () => {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    // Navigate to dashboard or appropriate page after successful auth
    navigate('/labour-profile');
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
      {/* Comic Collage Background */}
      <ComicCollage />
      
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Auth Form */}
      <div className="relative z-20">
        <TabbedAuthForm onSuccess={handleAuthSuccess} />
      </div>
    </div>
  );
};

export default Auth;

