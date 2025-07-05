import React from 'react';
import { Calendar, CheckSquare, Settings } from 'lucide-react';

interface NavigationProps {
  currentPage: 'calendar' | 'habits' | 'points';
  onNavigate: (page: 'calendar' | 'habits' | 'points') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    {
      id: 'calendar' as const,
      label: 'Calendar',
      icon: Calendar,
      page: 'calendar' as const,
    },
    {
      id: 'habits' as const,
      label: 'Tasks',
      icon: CheckSquare,
      page: 'habits' as const,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-around">
        {/* Navigation Items */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.page;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.page)}
              className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                isActive
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}

        {/* Settings */}
        <button className="flex flex-col items-center gap-1 p-3 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-all">
          <Settings size={20} />
          <span className="text-xs font-medium">Settings</span>
        </button>
      </div>
    </nav>
  );
}; 