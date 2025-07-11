import React, { useState } from 'react';
import { usePoints } from './PointsContext';
import { useHabits } from '../pageHabits/HabitContext';
import { Settings, Edit3, Calendar, CheckSquare, Trophy, Download } from 'lucide-react';
import { ConfirmDialog } from '../allComponents/ConfirmDialog';
import { AddTaskModal } from './components/AddTaskModal';
import { AddRewardModal } from './components/AddRewardModal';
import { AddGoalModal } from './components/AddGoalModal';
import { SettingsModal } from '../allComponents/SettingsModal';

interface AddCategoryFormProps {
  onNavigate: (page: 'calendar' | 'habits' | 'points') => void;
}

export const AddCategoryForm: React.FC<AddCategoryFormProps> = ({ onNavigate }) => {
  const { resetAllPointsData } = usePoints();
  const { resetAllData, allowPastEditing, setAllowPastEditing, compactMode, setCompactMode } = useHabits();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);

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
          <button
            onClick={() => setShowRewardModal(true)}
            className="flex-1 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all text-gray-600 text-left"
          >
            Add new reward...
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
          
          {/* Export Button */}
          {/* <button
            onClick={() => setShowExportModal(true)}
            className="w-12 h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
            aria-label="Export Data"
          >
            <Download size={20} />
          </button> */}
          
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
      {/* Reward Modal */}
      <AddRewardModal
        isOpen={showRewardModal}
        onClose={() => setShowRewardModal(false)}
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