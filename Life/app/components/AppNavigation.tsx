import React, { useState } from 'react';
import { useHabits } from './contextHabits';
import { Settings, Calendar, CheckSquare, Trophy } from 'lucide-react';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { HabitConfigModal } from '../pageCalendar/AddHabitModal';

interface AppNavigationProps {
  onNavigate: (page: 'calendar' | 'tasks' | 'shop' | 'manage') => void;
  onAddHabitClick?: () => void;
  showSettingsButton?: boolean;
  addButtonLabel?: string;
  className?: string;
}

export const AppNavigation: React.FC<AppNavigationProps> = ({ onNavigate, onAddHabitClick, showSettingsButton, addButtonLabel = 'Add new habit...', className }) => {
  const { allowPastEditing } = useHabits();
  const [showHabitConfig, setShowHabitConfig] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  return (
    <>
      <div className={`space-y-4${className ? ` ${className}` : ''}`}>
        <div className="flex gap-2">
          <button
            onClick={onAddHabitClick ? onAddHabitClick : () => setShowHabitConfig(true)}
            className="flex-1 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all text-gray-600 text-left"
          >
            {addButtonLabel}
          </button>
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
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
        </div>
        {allowPastEditing && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <span className="text-yellow-600"><svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 12.93A5.93 5.93 0 1 1 8 2.07a5.93 5.93 0 0 1 0 11.86z"/><path d="M7.002 11h2V9h-2v2zm0-4h2V5h-2v2z"/></svg></span>
              <p className="text-sm text-yellow-800">
                Past day editing is enabled. You can now modify habit statuses for previous days.
              </p>
            </div>
          </div>
        )}
      </div>
      <HabitConfigModal
        isOpen={showHabitConfig}
        onClose={() => setShowHabitConfig(false)}
        onSubmit={() => setShowHabitConfig(false)}
      />
      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={() => setShowResetConfirm(false)}
        title="Reset All Data"
        message="Are you sure you want to reset all habit data? This action cannot be undone."
      />
    </>
  );
};