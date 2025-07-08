import React, { useState } from 'react';
import { X } from 'lucide-react';
import { usePoints } from '../PointsContext';

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddGoalModal: React.FC<AddGoalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addGoal } = usePoints();
  const [title, setTitle] = useState('');
  const [targetPoints, setTargetPoints] = useState(1000);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState('');

  React.useEffect(() => {
    // Set default end date to one month from start date
    const start = new Date(startDate);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);
    setEndDate(end.toISOString().split('T')[0]);
  }, [startDate]);

  const handleSubmit = () => {
    if (title.trim() && targetPoints > 0 && startDate && endDate) {
      addGoal(title.trim(), targetPoints, startDate, endDate);
      setTitle('');
      setTargetPoints(1000);
      setStartDate(new Date().toISOString().split('T')[0]);
      setEndDate('');
      onClose();
    }
  };

  const handleCancel = () => {
    setTitle('');
    setTargetPoints(1000);
    setStartDate(new Date().toISOString().split('T')[0]);
    setEndDate('');
    onClose();
  };

  const calculateDays = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  };

  const days = calculateDays();
  const pointsPerDay = days > 0 ? Math.ceil(targetPoints / days) : 0;

  if (!isOpen) return null;

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
            <h3 className="font-semibold text-gray-900 text-base">Add Points Goal</h3>
            <button
              onClick={handleCancel}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Goal Title */}
            <div>
              <label htmlFor="goal-title" className="block text-sm font-medium text-gray-700 mb-2">
                Goal Title
              </label>
              <input
                id="goal-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Monthly Points Target, Semester Goal"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                autoFocus
              />
            </div>

            {/* Target Points */}
            <div>
              <label htmlFor="target-points" className="block text-sm font-medium text-gray-700 mb-2">
                Target Points
              </label>
              <input
                id="target-points"
                type="number"
                value={targetPoints}
                onChange={(e) => setTargetPoints(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Goal Summary */}
            {days > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-medium text-blue-900 mb-2">Goal Summary:</h5>
                <div className="space-y-1 text-sm text-blue-800">
                  <div>Duration: <span className="font-medium">{days} days</span></div>
                  <div>Target: <span className="font-medium">{targetPoints.toLocaleString()} points</span></div>
                  <div>Daily average needed: <span className="font-medium">{pointsPerDay} points/day</span></div>
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
              disabled={!title.trim() || targetPoints <= 0 || !startDate || !endDate || days <= 0}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Add Goal
            </button>
          </div>
        </div>
      </div>
    </>
  );
};