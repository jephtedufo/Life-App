import React, { useState } from 'react';
import { useHabits } from '../../context/HabitContext';
import { Settings, Edit3, Calendar, CheckSquare, Trophy } from 'lucide-react';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { HabitConfigModal } from './HabitConfigModal';
import { SettingsModal } from '../modals/SettingsModal';
import { PointsModal } from '../points/PointsModal';

interface AddHabitFormProps {
  onNavigate: (page: 'calendar' | 'habits' | 'points') => void;
}

export const AddHabitForm: React.FC<AddHabitFormProps> = ({ onNavigate }) => {
  const { addHabit, resetAllData, allowPastEditing, setAllowPastEditing, compactMode, setCompactMode } = useHabits();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showHabitConfig, setShowHabitConfig] = useState(false);

  const handleAddHabit = (name: string, description: string, repeatDays: number[]) => {
    addHabit(name, description, repeatDays);
  };

  const handleResetData = () => {
    setShowResetConfirm(true);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setShowHabitConfig(true)}
            className="flex-1 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all text-gray-600 text-left"
          >
            Add new habit...
          </button>
          
          {/* Navigation Icons */}
          <button
            onClick={() => onNavigate('calendar')}
            className="w-12 h-12 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
            aria-label="Calendar"
          >
            <Calendar size={20} />
          </button>
          
          <button
            onClick={() => onNavigate('habits')}
            className="w-12 h-12 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
            aria-label="Habits"
          >
            <CheckSquare size={20} />
          </button>
          
          <button
            onClick={() => onNavigate('points')}
            className="w-12 h-12 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
            aria-label="Points"
          >
            <Trophy size={20} />
          </button>
          
          {/* Settings Button */}
          <button
            onClick={() => setShowSettingsModal(true)}
            className="w-12 h-12 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
            aria-label="Settings"
          >
            <Settings size={20} />
          </button>
        </div>

        {/* Past Editing Notice */}
        {allowPastEditing && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Edit3 size={16} className="text-yellow-600" />
              <p className="text-sm text-yellow-800">
                Past day editing is enabled. You can now modify habit statuses for previous days.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Habit Configuration Modal */}
      <HabitConfigModal
        isOpen={showHabitConfig}
        onClose={() => setShowHabitConfig(false)}
        onSubmit={handleAddHabit}
      />

      {/* Points Modal */}
      <PointsModal
        isOpen={showPointsModal}
        onClose={() => setShowPointsModal(false)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        allowPastEditing={allowPastEditing}
        onTogglePastEditing={setAllowPastEditing}
        compactMode={compactMode}
        onToggleCompactMode={setCompactMode}
        onResetData={handleResetData}
      />

      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={() => {
          resetAllData();
          setShowResetConfirm(false);
        }}
        title="Reset All Data"
        message="Are you sure you want to reset all habit data? This action cannot be undone."
      />
    </>
  );
};