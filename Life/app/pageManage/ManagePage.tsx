import React, { useState } from 'react';
import { Sun, Moon, Monitor, Bell, Download, Upload, RefreshCw, Settings, Calendar, CheckSquare, Trophy, Target, ShoppingCart, Link2, History, Cog, Edit2 } from 'lucide-react';
import { HabitsPage } from './tabHabits';
import { ConnectTab } from './tabConnect';
import { ActivityTab } from './tabActivity';
import { useHabits } from '../components/contextHabits';
import { usePoints } from '../components/contextPoints';
import { TaskGroupsManager } from './tabTasks';
import { ShopItemsManager } from './tabShop';
import TabSettings from './tabSettings.tsx';

interface ManagePageProps {
  onNavigate: (page: 'calendar' | 'tasks' | 'shop' | 'manage') => void;
}

type ManageTab = 'habits' | 'tasks' | 'shop' | 'connect' | 'activity' | 'settings';

export const ManagePage: React.FC<ManagePageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<ManageTab>('habits');
  const { allowPastEditing, setAllowPastEditing, compactMode, setCompactMode, resetAllData, use24HourFormat, setUse24HourFormat } = useHabits();
  const { resetAllPointsData } = usePoints();

  const handleResetData = () => {
    resetAllData();
    resetAllPointsData();
  };

  const tabs = [
    { id: 'habits' as const, label: 'Habits Manager', icon: Target },
    { id: 'tasks' as const, label: 'Task Manager', icon: CheckSquare },
    { id: 'shop' as const, label: 'Shop Manager', icon: ShoppingCart },
    { id: 'connect' as const, label: 'Connecting Habits', icon: Link2 },
    { id: 'activity' as const, label: 'Activity', icon: History },
    { id: 'settings' as const, label: 'General Settings', icon: Cog },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'habits':
        return (
          <div className="space-y-12">
            <HabitsPage onNavigate={onNavigate} hideHeader={true} />
          </div>
        );
      case 'tasks':
        return <TaskGroupsManager />;
      case 'shop':
        return <ShopItemsManager />;
      case 'connect':
        return <ConnectTab />;
      case 'activity':
        return <ActivityTab />;
      case 'settings':
        return <TabSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-16 pt-8">
          <div className="flex-1 pr-8">
            <h1 className="text-6xl font-bold text-gray-900 mb-6">Manage Your Life App</h1>
            <p className="text-lg text-gray-600 leading-relaxed italic max-w-4xl">
              Access advanced management tools, settings, and activity for your habits, tasks, and rewards.
            </p>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => onNavigate('calendar')}
            className="w-12 h-12 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
            aria-label="Calendar"
          >
            <Calendar size={20} />
          </button>
          <button
            onClick={() => onNavigate('tasks')}
            className="w-12 h-12 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
            aria-label="Tasks"
          >
            <CheckSquare size={20} />
          </button>
          <button
            onClick={() => onNavigate('shop')}
            className="w-12 h-12 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
            aria-label="Shop"
          >
            <Trophy size={20} />
          </button>
          <button
            onClick={() => onNavigate('manage')}
            className="w-12 h-12 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
            aria-label="Manage"
          >
            <Settings size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}; 