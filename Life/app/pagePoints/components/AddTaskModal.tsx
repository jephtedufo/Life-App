import React, { useState } from 'react';
import { X } from 'lucide-react';
import { usePoints } from '../PointsContext';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingTask?: any;
}

const taskColors = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#F97316', // Orange
  '#06B6D4', // Cyan
  '#84CC16', // Lime
  '#EC4899', // Pink
  '#6B7280', // Gray
];

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  editingTask,
}) => {
  const { addCategory, updateCategory } = usePoints();
  const [name, setName] = useState(editingTask?.name || '');
  const [description, setDescription] = useState(editingTask?.description || '');
  const [categoryAmount, setCategoryAmount] = useState(editingTask?.defaultPointValue || 10);
  const [selectedColor, setSelectedColor] = useState(editingTask?.color || taskColors[0]);

  // Pre-fill fields when editing
  React.useEffect(() => {
    if (editingTask) {
      setName(editingTask.name || '');
      setDescription(editingTask.description || '');
      setCategoryAmount(editingTask.defaultPointValue || 10);
      setSelectedColor(editingTask.color || taskColors[0]);
    }
  }, [editingTask]);

  const handleSubmit = () => {
    if (name.trim()) {
      if (editingTask) {
        updateCategory({
          ...editingTask,
          name: name.trim(),
          description: description.trim(),
          defaultPointValue: categoryAmount,
          color: selectedColor,
        });
      } else {
        addCategory(name.trim(), description.trim(), categoryAmount, selectedColor);
      }
      handleCancel();
    }
  };

  const handleCancel = () => {
    setName('');
    setDescription('');
    setCategoryAmount(10);
    setSelectedColor(taskColors[0]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="modal-backdrop bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={handleCancel}
      />
      
      <div className="modal-backdrop flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[85vh] overflow-hidden transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <h3 className="font-semibold text-gray-900 text-base">
              {editingTask ? 'Edit Task' : 'Add Task'}
            </h3>
            <button
              onClick={handleCancel}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          
          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(85vh-140px)] p-6 space-y-4">
            {/* Task Name */}
            <div>
              <label htmlFor="task-name" className="block text-sm font-medium text-gray-700 mb-2">
                Task Name
              </label>
              <input
                id="task-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., School, Work, Fitness"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                autoFocus
              />
            </div>

            {/* Task Description */}
            <div>
              <label htmlFor="task-description" className="block text-sm font-medium text-gray-700 mb-2">
                Task Description
              </label>
              <textarea
                id="task-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what this task involves..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                rows={3}
              />
            </div>

            {/* Task Amount */}
            <div>
              <label htmlFor="task-amount" className="block text-sm font-medium text-gray-700 mb-2">
                Task Amount
              </label>
              <input
                id="task-amount"
                type="number"
                value={categoryAmount}
                onChange={(e) => setCategoryAmount(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
              />
              <p className="text-sm text-gray-500 mt-1">Points added or removed per click</p>
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Task Color
              </label>
              <div className="grid grid-cols-5 gap-3">
                {taskColors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-xl transition-all ${
                      selectedColor === color
                        ? 'ring-2 ring-gray-900 ring-offset-2 scale-110'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
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
              disabled={!name.trim()}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {editingTask ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};