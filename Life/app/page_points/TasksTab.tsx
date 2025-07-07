import React, { useState } from 'react';
import { usePoints } from '../../config/context/PointsContext';
import { Plus, Minus, Edit2 } from 'lucide-react';
import { AddTaskModal } from './AddTaskModal';
import { TaskCategory } from '../../config/types';

export const TasksTab: React.FC = () => {
  const { categories, addPointLog, updateCategory } = usePoints();
  const [editMode, setEditMode] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskCategory | null>(null);

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

  const handleEditTask = (task: TaskCategory) => {
    setEditingTask(task);
  };

  // Group tasks by color
  const groupedTasks: Record<string, TaskCategory[]> = categories.reduce((groups, task) => {
    const color = task.color;
    if (!groups[color]) {
      groups[color] = [];
    }
    groups[color].push(task);
    return groups;
  }, {} as Record<string, TaskCategory[]>);

  return (
    <>
      <div className="space-y-8">
        {/* Header with Edit Controls */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">Task Categories</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`p-2 rounded-lg transition-colors ${
                editMode ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-600'
              }`}
              title="Edit tasks"
            >
              <Edit2 size={16} />
            </button>
          </div>
        </div>

        {/* Grouped Task Cards in 2-Column Layout */}
        {Object.keys(groupedTasks).length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Plus size={48} className="mx-auto" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h4>
            <p className="text-gray-600 mb-6">Create your first task to start earning points</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Object.entries(groupedTasks).map(([color, tasks]) => {
              // Calculate grid rows needed for dynamic height
              const tasksPerRow = 2;
              const rows = Math.ceil(tasks.length / tasksPerRow);
              
              return (
                <div 
                  key={color} 
                  className="rounded-2xl overflow-hidden shadow-lg border border-white/20 backdrop-blur-md"
                  style={{
                    background: `linear-gradient(135deg, ${color}15, ${color}08)`,
                    borderColor: `${color}30`,
                    minHeight: `${120 + (rows * 120)}px` // Dynamic height based on content
                  }}
                >
                  {/* Group Header - Glassmorphism */}
                  <div 
                    className="px-6 py-4 text-white relative overflow-hidden"
                    style={{ backgroundColor: color }}
                  >
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                    <div className="relative z-10 flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-white/30" />
                      <h4 className="text-lg font-semibold">
                        {tasks[0].name.split(' ')[0]} Tasks
                      </h4>
                    </div>
                  </div>

                  {/* Tasks in this group - 2 column layout */}
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {tasks.map((task: TaskCategory) => (
                        <div 
                          key={task.id} 
                          className="relative rounded-xl border border-white/20 backdrop-blur-sm p-3 hover:shadow-md transition-all"
                          style={{
                            background: `linear-gradient(135deg, ${color}10, ${color}05)`,
                            borderColor: `${color}20`
                          }}
                        >
                          {/* Edit Icon */}
                          {editMode && (
                            <button
                              onClick={() => handleEditTask(task)}
                              className="absolute top-2 left-2 p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors z-10"
                              title="Edit task"
                            >
                              <Edit2 size={12} />
                            </button>
                          )}

                          <div className="space-y-3">
                            {/* Task Header - Title and Points on same line */}
                            <div className={`flex items-start justify-between ${editMode ? 'pt-6' : ''}`}>
                              <h5 className="font-bold text-gray-900 text-sm flex-1 pr-2">{task.name}</h5>
                              {/* Points indicator in top-right */}
                              <div 
                                className="px-2 py-1 rounded-full text-xs font-bold text-white flex-shrink-0"
                                style={{ backgroundColor: color }}
                              >
                                +{task.defaultPointValue}
                              </div>
                            </div>

                            {/* Description */}
                            {task.description && (
                              <p className="text-xs text-gray-600 line-clamp-2">{task.description}</p>
                            )}

                            {/* Action Buttons - Icon only for compact layout */}
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleAddPoints(task.id)}
                                className="flex-1 py-2 px-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-xs flex items-center justify-center"
                                title="Add Points"
                              >
                                <Plus size={12} />
                              </button>
                              <button
                                onClick={() => handleRemovePoints(task.id)}
                                className="flex-1 py-2 px-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-xs flex items-center justify-center"
                                title="Remove Points"
                              >
                                <Minus size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Edit Task Modal */}
      <AddTaskModal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        editingTask={editingTask}
      />
    </>
  );
};