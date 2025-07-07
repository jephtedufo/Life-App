"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { usePoints } from '../../context/PointsContext';

interface AddPointLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: string;
}

const PRESET_POINTS = [5, 10, 15, 20];

export const AddPointLogModal: React.FC<AddPointLogModalProps> = ({
  isOpen,
  onClose,
  categoryId,
}) => {
  const { categories, addPointLog } = usePoints();
  const [taskName, setTaskName] = useState('');
  const [selectedPoints, setSelectedPoints] = useState<number | null>(null);

  const category = categories.find(c => c.id === categoryId);

  const handleSubmit = () => {
    if (taskName.trim() && selectedPoints !== null) {
      addPointLog(categoryId, taskName.trim(), 1, selectedPoints);
      setTaskName('');
      setSelectedPoints(null);
      onClose();
    }
  };

  const handleCancel = () => {
    setTaskName('');
    setSelectedPoints(null);
    onClose();
  };

  if (!isOpen || !category) return null;

  return (
    <>
      <div 
        className="modal-backdrop bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={handleCancel}
      />
      
      <div className="modal-backdrop flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <h3 className="font-semibold text-gray-900 text-base">Add Task - {category.name}</h3>
            </div>
            <button
              onClick={handleCancel}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Task Name */}
            <div>
              <label htmlFor="task-name" className="block text-sm font-medium text-gray-700 mb-2">
                Task Name
              </label>
              <input
                id="task-name"
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="e.g., Completed math homework, Finished project milestone"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                autoFocus
              />
            </div>

            {/* Point Value Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Point Value
              </label>
              <div className="grid grid-cols-4 gap-3">
                {PRESET_POINTS.map(points => (
                  <button
                    key={points}
                    onClick={() => setSelectedPoints(points)}
                    className={`py-3 px-4 rounded-xl font-medium transition-all ${
                      selectedPoints === points
                        ? 'bg-gray-900 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    +{points}
                  </button>
                ))}
              </div>
            </div>

            {/* Total Points Preview */}
            {selectedPoints !== null && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-green-900">Points to Earn:</span>
                  <span className="text-2xl font-bold text-green-600">+{selectedPoints}</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50/30 border-t border-gray-100">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!taskName.trim() || selectedPoints === null}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Add +{selectedPoints || 0} Points
            </button>
          </div>
        </div>
      </div>
    </>
  );
};