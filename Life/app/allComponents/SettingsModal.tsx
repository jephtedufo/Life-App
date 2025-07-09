import React, { useState } from 'react';
import { X, Edit3, RefreshCw, Download, Clock, Trophy, Grid3X3, Upload } from 'lucide-react';
import { ToggleSwitch } from './ToggleSwitch';
import { useHabits } from '../pageHabits/HabitContext';
import { usePoints } from '../pagePoints/PointsContext';
import { exportAllAppData, importAllAppData } from '../utils/csvUtils';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  allowPastEditing: boolean;
  onTogglePastEditing: (enabled: boolean) => void;
  compactMode: boolean;
  onToggleCompactMode: (enabled: boolean) => void;
  onResetData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  allowPastEditing,
  onTogglePastEditing,
  compactMode,
  onToggleCompactMode,
  onResetData,
}) => {
  const { use24HourFormat, setUse24HourFormat, habits, statuses, setHabits, setStatuses } = useHabits();
  const {
    categories,
    pointLogs,
    rewards,
    redemptions,
    goals,
    habitConnections,
    setCategories,
    setPointLogs,
    setRewards,
    setRedemptions,
    setGoals,
    setHabitConnections,
    resetAllPointsData,
  } = usePoints();

  const handleResetAllData = () => {
    if (confirm('Are you sure you want to reset ALL data including habits and points? This action cannot be undone.')) {
      onResetData();
      resetAllPointsData();
      onClose();
    }
  };

  const handleResetPointsOnly = () => {
    if (confirm('Are you sure you want to reset only points data? This will remove all categories, logs, rewards, and goals.')) {
      resetAllPointsData();
    }
  };

  // Export all app data as JSON
  const handleExportData = () => {
    exportAllAppData({
      habits,
      statuses,
      categories,
      pointLogs,
      rewards,
      redemptions,
      goals,
      habitConnections,
    });
  };

  // Import all app data from JSON
  const handleImportData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const result = await importAllAppData(file);
    if (result.success && result.data) {
      setHabits(result.data.habits);
      setStatuses(result.data.statuses);
      setCategories(result.data.categories);
      setPointLogs(result.data.pointLogs);
      setRewards(result.data.rewards);
      setRedemptions(result.data.redemptions);
      setGoals(result.data.goals);
      setHabitConnections(result.data.habitConnections);
      alert('Data imported successfully!');
      onClose();
    } else {
      alert('Import failed: ' + (result.errors?.join('\n') || 'Unknown error'));
    }
    // Reset file input value so the same file can be selected again if needed
    e.target.value = '';
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Fixed backdrop - covers entire viewport */}
      <div 
        className="modal-backdrop bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal - centered in viewport */}
      <div className="modal-backdrop flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <h3 className="font-semibold text-gray-900 text-base">Settings</h3>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          
          {/* Content */}
          <div className="py-2">
            {/* 24-Hour Format Toggle */}
            <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Clock size={16} className="text-blue-600" />
                </div>
                <div>
                  <span className="font-medium text-gray-900 block">24-Hour Format</span>
                  <span className="text-sm text-gray-500">Use military time format</span>
                </div>
              </div>
              <ToggleSwitch
                checked={use24HourFormat}
                onChange={setUse24HourFormat}
              />
            </div>
            
            {/* Divider */}
            <div className="mx-6 border-t border-gray-100" />
            
            {/* Compact Mode Toggle */}
            <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Grid3X3 size={16} className="text-gray-900" />
                </div>
                <div>
                  <span className="font-medium text-gray-900 block">Compact Mode</span>
                  <span className="text-sm text-gray-500">Show habits as square boxes with initials</span>
                </div>
              </div>
              <ToggleSwitch
                checked={compactMode}
                onChange={onToggleCompactMode}
              />
            </div>
            
            {/* Divider */}
            <div className="mx-6 border-t border-gray-100" />
            
            {/* Edit Past Days Toggle */}
            <div className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Edit3 size={16} className="text-gray-900" />
                </div>
                <span className="font-medium text-gray-900">Edit Past Days</span>
              </div>
              <ToggleSwitch
                checked={allowPastEditing}
                onChange={onTogglePastEditing}
              />
            </div>
            
            {/* Divider */}
            <div className="mx-6 border-t border-gray-100" />

            {/* Export Data Button */}
            <button
              onClick={handleExportData}
              className="flex items-center gap-4 w-full px-6 py-4 text-left hover:bg-blue-50/50 transition-colors group"
            >
              <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <Download size={16} className="text-blue-600" />
              </div>
              <span className="font-medium text-blue-600">Export Data</span>
            </button>

            {/* Import Data Button */}
            <label className="flex items-center gap-4 w-full px-6 py-4 text-left hover:bg-green-50/50 transition-colors group cursor-pointer">
              <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                <Upload size={16} className="text-green-600" />
              </div>
              <span className="font-medium text-green-600">Import Data</span>
              <input
                type="file"
                accept="application/json,.json"
                onChange={handleImportData}
                className="hidden"
              />
            </label>

            {/* Divider */}
            <div className="mx-6 border-t border-gray-100" />
            
            {/* Reset Points Data */}
            <button
              onClick={handleResetPointsOnly}
              className="flex items-center gap-4 w-full px-6 py-4 text-left hover:bg-yellow-50/50 transition-colors group"
            >
              <div className="p-2 bg-yellow-50 rounded-lg group-hover:bg-yellow-100 transition-colors">
                <Trophy size={16} className="text-yellow-600" />
              </div>
              <span className="font-medium text-yellow-600">Reset Points Data</span>
            </button>
            
            {/* Divider */}
            <div className="mx-6 border-t border-gray-100" />
            
            {/* Reset All Data */}
            <button
              onClick={handleResetAllData}
              className="flex items-center gap-4 w-full px-6 py-4 text-left hover:bg-red-50/50 transition-colors group"
            >
              <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                <RefreshCw size={16} className="text-red-600" />
              </div>
              <span className="font-medium text-red-600">Reset All Data</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};