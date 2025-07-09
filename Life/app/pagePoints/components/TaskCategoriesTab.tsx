import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Minus } from 'lucide-react';
import { AddCategoryModal } from './AddCategoryModal';
import { usePoints } from '../PointsContext';

interface TaskCategoriesTabProps {
  hideAddButton?: boolean;
}

export const TaskCategoriesTab: React.FC<TaskCategoriesTabProps> = ({ hideAddButton = false }) => {
  const { categories, deleteCategory, addPointLog, updateCategory } = usePoints();
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category? All associated logs will be removed.')) {
      deleteCategory(id);
    }
  };

  const handleAddPoints = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      addPointLog(categoryId, 'Points added', 1, category.defaultPointValue);
    }
  };

  const handleRemovePoints = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    if (category) {
      addPointLog(categoryId, 'Points removed', 1, -category.defaultPointValue);
    }
  };

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header with Edit/Delete Controls */}
        <div className="flex justify-between items-center">
          {!hideAddButton && (
            <h3 className="text-xl font-semibold text-gray-900">Task Categories</h3>
          )}
          <div className="flex items-center gap-3">
            {!hideAddButton && (
              <button
                onClick={() => setShowAddCategory(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                <Plus size={16} />
                Add Category
              </button>
            )}
            {hideAddButton && (
              <>
                <button
                  onClick={() => {
                    setEditMode(!editMode);
                    setDeleteMode(false);
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    editMode ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Edit categories"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => {
                    setDeleteMode(!deleteMode);
                    setEditMode(false);
                  }}
                  className={`p-2 rounded-lg transition-colors ${
                    deleteMode ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Delete categories"
                >
                  <Trash2 size={16} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Categories Grid */}
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Plus size={48} className="mx-auto" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No categories yet</h4>
            <p className="text-gray-600 mb-6">Create your first task category to start earning points</p>
            {!hideAddButton && (
              <button
                onClick={() => setShowAddCategory(true)}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Create Category
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => {

              return (
                <div 
                  key={category.id} 
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all relative"
                  style={{
                    borderColor: category.color,
                    borderWidth: '2px',
                    backgroundColor: hexToRgba(category.color, 0.02)
                  }}
                >
                  {/* Delete Mode Overlay */}
                  {deleteMode && (
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors z-10"
                      title="Delete category"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}

                  <div className="p-6">
                    {/* Category Header */}
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-900 text-lg mb-2">{category.name}</h4>
                      <p className="text-sm text-gray-600">Amount per click: {category.defaultPointValue} pts</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                        <div className="text-xl font-bold text-gray-900">{0}</div>
                        <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Total Points</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border border-gray-200">
                        <div className="text-xl font-bold text-gray-900">{0}</div>
                        <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Tasks Done</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddPoints(category.id)}
                        className="flex-1 py-2 px-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm flex items-center justify-center gap-1"
                      >
                        <Plus size={14} />
                        Add Points
                      </button>
                      <button
                        onClick={() => handleRemovePoints(category.id)}
                        className="flex-1 py-2 px-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm flex items-center justify-center gap-1"
                      >
                        <Minus size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modals */}
      <AddCategoryModal
        isOpen={showAddCategory}
        onClose={() => setShowAddCategory(false)}
      />
    </>
  );
};