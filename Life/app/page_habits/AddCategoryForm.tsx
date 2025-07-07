import React, { useState } from 'react';
import { usePoints } from '../../config/context/PointsContext';
import { useHabits } from '../../config/context/HabitContext';
import { Settings, Edit3, Calendar, CheckSquare, Trophy } from 'lucide-react';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import { AddTaskModal } from '../page_points/AddTaskModal';
import { SettingsModal } from '../components/modals/SettingsModal';

interface AddCategoryFormProps {
  onNavigate: (page: 'calendar' | 'habits' | 'points') => void;
}

export const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onNavigate }) => {
  const { resetAllPointsData } = usePoints();
  const { resetAllData, allowPastEditing, setAllowPastEditing, compactMode, setCompactMode } = useHabits();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const handleResetData = () => {
    setShowResetConfirm(true);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setShowTaskModal(true)}
            className="flex-1 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all text-gray-600 text-left"
          >
            Add new task...
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

      {/* Task Modal */}
      <AddTaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
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
          resetAllPointsData();
          setShowResetConfirm(false);
        }}
        title="Reset All Data"
        message="Are you sure you want to reset all data? This action cannot be undone."
      />
    </>
  );
};