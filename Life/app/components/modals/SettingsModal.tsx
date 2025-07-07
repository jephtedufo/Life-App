import React, { useState } from 'react';
import { X, Edit3, RefreshCw, Download, Clock, Trophy, Grid3X3 } from 'lucide-react';
import { ToggleSwitch } from '../ui/ToggleSwitch';
import { ImportExportModal } from './ImportExportModal';
import { useHabits } from '../../context/HabitContext';
import { usePoints } from '../../context/PointsContext';

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
  const [showImportExport, setShowImportExport] = useState(false);
  const { use24HourFormat, setUse24HourFormat } = useHabits();
  const { resetAllPointsData } = usePoints();

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
            
            {/* Import/Export Data */}
            <button
              onClick={() => setShowImportExport(true)}
              className="flex items-center gap-4 w-full px-6 py-4 text-left hover:bg-gray-50/50 transition-colors group"
            >
              <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <Download size={16} className="text-blue-600" />
              </div>
              <div>
                <span className="font-medium text-gray-900 block">Import & Export</span>
                <span className="text-sm text-gray-500">Backup or restore your habit data</span>
              </div>
            </button>
            
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

      {/* Import/Export Modal */}
      <ImportExportModal
        isOpen={showImportExport}
        onClose={() => setShowImportExport(false)}
      />
    </>
  );
};