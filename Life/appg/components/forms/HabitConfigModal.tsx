import React, { useState } from 'react';
import { X } from 'lucide-react';

interface HabitConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, description: string, repeatDays: number[]) => void;
}

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const fullDayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const HabitConfigModal: React.FC<HabitConfigModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [habitName, setHabitName] = useState('');
  const [habitDescription, setHabitDescription] = useState('');
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const toggleDay = (dayIndex: number) => {
    setSelectedDays(prev => 
      prev.includes(dayIndex) 
        ? prev.filter(d => d !== dayIndex)
        : [...prev, dayIndex]
    );
  };

  const selectAllDays = () => {
    setSelectedDays([0, 1, 2, 3, 4, 5, 6]);
  };

  const handleSubmit = () => {
    if (habitName.trim() && selectedDays.length > 0) {
      onSubmit(habitName.trim(), habitDescription.trim(), selectedDays);
      setHabitName('');
      setHabitDescription('');
      setSelectedDays([]);
      onClose();
    }
  };

  const handleCancel = () => {
    setHabitName('');
    setHabitDescription('');
    setSelectedDays([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Fixed backdrop - covers entire viewport */}
      <div 
        className="modal-backdrop bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={handleCancel}
      />
      
      {/* Modal - centered in viewport */}
      <div className="modal-backdrop flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <h3 className="font-semibold text-gray-900 text-base">Add New Habit</h3>
            <button
              onClick={handleCancel}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Habit Name Input */}
            <div>
              <label htmlFor="habit-name" className="block text-sm font-medium text-gray-700 mb-2">
                Habit Name
              </label>
              <input
                id="habit-name"
                type="text"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                placeholder="Enter habit name..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                autoFocus
              />
            </div>

            {/* Habit Description Input */}
            <div>
              <label htmlFor="habit-description" className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                id="habit-description"
                value={habitDescription}
                onChange={(e) => setHabitDescription(e.target.value)}
                placeholder="Add a description for your habit..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                rows={3}
              />
            </div>

            {/* Weekly Schedule */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Weekly Schedule
                </label>
                <button
                  onClick={selectAllDays}
                  className="text-sm text-gray-900 hover:text-gray-700 font-medium transition-colors"
                >
                  All Days
                </button>
              </div>
              
              {/* Day Selector */}
              <div className="flex gap-2 justify-between">
                {dayNames.map((day, index) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(index)}
                    className={`
                      w-12 h-12 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105
                      ${selectedDays.includes(index)
                        ? 'bg-gray-900 text-white shadow-lg shadow-gray-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }
                    `}
                    title={fullDayNames[index]}
                  >
                    {day}
                  </button>
                ))}
              </div>
              
              {/* Selected Days Summary */}
              {selectedDays.length > 0 && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Selected days:</span>{' '}
                    <span className="text-gray-500">
                      {selectedDays.length === 7 
                        ? 'Every day'
                        : selectedDays.map(day => fullDayNames[day]).join(', ')
                      }
                    </span>
                  </p>
                </div>
              )}
            </div>
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
              disabled={!habitName.trim() || selectedDays.length === 0}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Add Habit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};