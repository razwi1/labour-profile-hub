import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';
import { useNavigate } from 'react-router-dom';

// Import user role images
import labourImage from '@/assets/User_Roles/labour.jpg';
import supervisorImage from '@/assets/User_Roles/supervisor.jpg';
import siteManagerImage from '@/assets/User_Roles/sitemanager.jpg';
import clientImage from '@/assets/User_Roles/client.jpg';

interface UserRole {
  id: string;
  name: string;
  image: string;
  description: string;
}

const UserRoleSelection: React.FC = () => {
  const { theme } = useTheme();
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const userRoles: UserRole[] = [
    {
      id: 'labour',
      name: 'Labour',
      image: labourImage,
      description:
        'Skilled workers responsible for executing construction tasks, following safety protocols, and maintaining quality standards on site.',
    },
    {
      id: 'supervisor',
      name: 'Supervisor',
      image: supervisorImage,
      description:
        'Oversees daily operations, manages worker teams, ensures project timelines are met, and maintains safety compliance.',
    },
    {
      id: 'site_manager',
      name: 'Site Manager',
      image: siteManagerImage,
      description:
        'Coordinates entire construction projects, manages budgets, liaises with clients, and ensures overall project success.',
    },
    {
      id: 'client',
      name: 'Client/Contractor',
      image: clientImage,
      description:
        'Project owners who hire construction services, define project requirements, and oversee project delivery.',
    },
  ];

  const handleRoleSelect = (roleId: string) => {
    console.log(`Selected role: ${roleId}`);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' ? 'bg-black' : 'bg-white'
      }`}
    >
      {/* Header with back button + theme toggle */}
      <div className="flex justify-between items-center px-8 py-6">
        <button
          onClick={() => navigate('/auth')}
          className={`px-8 py-3 text-lg rounded-xl font-semibold transition ${
            theme === 'dark'
              ? 'bg-white/20 text-white hover:bg-white/30'
              : 'bg-black/10 text-black hover:bg-black/20'
          }`}
        >
          ← Back
        </button>
        <ThemeToggle />
      </div>

      {/* Title */}
      <div className="text-center mb-10">
        <h1
          className={`text-5xl font-extrabold tracking-wide ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
        >
          Choose a Role
        </h1>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[80vh] px-4">
        {userRoles.map((role) => (
          <div
            key={role.id}
            className="group cursor-pointer relative overflow-hidden rounded-2xl h-full"
            onMouseEnter={() => setHoveredRole(role.id)}
            onMouseLeave={() => setHoveredRole(null)}
            onClick={() => handleRoleSelect(role.id)}
          >
            {/* Role card */}
            <div
              className={`w-full h-full relative rounded-2xl transition-all duration-500 transform ${
                hoveredRole === role.id
                  ? 'scale-105 shadow-2xl z-10'
                  : 'scale-100 shadow-lg'
              } ${
                theme === 'dark'
                  ? 'bg-white/10 border border-white/20'
                  : 'bg-black/10 border border-black/20'
              }`}
            >
              {/* Image container */}
              <img
                src={role.image}
                alt={role.name}
                className={`w-full h-full object-cover transition-all duration-500 ${
                  hoveredRole === role.id
                    ? 'grayscale-0 brightness-100'
                    : 'grayscale brightness-75'
                }`}
              />

              {/* Overlay gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${
                  theme === 'dark'
                    ? 'from-black/80 via-black/20 to-transparent'
                    : 'from-white/80 via-white/20 to-transparent'
                } transition-opacity duration-300`}
              />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-between p-8">
                {/* Role name */}
                <h3
                  className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
                    theme === 'dark' ? 'text-white' : 'text-white'
                  }`}
                >
                  {role.name}
                </h3>

                {/* Description */}
                <p
                  className={`text-base leading-relaxed transition-all duration-500 ${
                    hoveredRole === role.id
                      ? 'opacity-100 transform translate-y-0'
                      : 'opacity-0 transform translate-y-6'
                  } ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-100'
                  }`}
                >
                  {role.description}
                </p>
              </div>

              {/* Hover effect border */}
              <div
                className={`absolute inset-0 rounded-2xl border-2 transition-opacity duration-300 ${
                  hoveredRole === role.id
                    ? 'opacity-100 border-white/50'
                    : 'opacity-0'
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRoleSelection;
