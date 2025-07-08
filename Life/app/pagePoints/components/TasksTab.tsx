import React, { useState } from 'react';
import { usePoints } from '../PointsContext';
import { Plus, Minus, Edit2 } from 'lucide-react';
import { AddTaskModal } from './AddTaskModal';

export const TasksTab: React.FC = () => {
  const { categories, addPointLog, updateCategory } = usePoints();
  const [editMode, setEditMode] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);

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

  const handleEditTask = (task: any) => {
    setEditingTask(task);
  };

  // Group tasks by color
  const groupedTasks = categories.reduce((groups, task) => {
    const color = task.color;
    if (!groups[color]) {
      groups[color] = [];
    }
    groups[color].push(task);
    return groups;
  }, {} as Record<string, typeof categories>);

  // Split into two columns by order, only requirement: each column has at least one group if possible
  const groupEntries = Object.entries(groupedTasks);
  let columns: [Array<[string, typeof categories]>, Array<[string, typeof categories]>] = [[], []];
  if (groupEntries.length === 1) {
    columns[0] = [groupEntries[0]];
  } else if (groupEntries.length > 1) {
    // First group in col 0, second in col 1, then alternate
    columns[0] = [groupEntries[0]];
    columns[1] = [groupEntries[1]];
    for (let i = 2; i < groupEntries.length; i++) {
      columns[i % 2].push(groupEntries[i]);
    }
  }

  return (
    <>
      <div className="space-y-8">
        {/* Grouped Task Cards in 2-Column Masonry Layout */}
        {groupEntries.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Plus size={48} className="mx-auto" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h4>
            <p className="text-gray-600 mb-6">Create your first task to start earning points</p>
          </div>
        ) : (
          <div className="flex flex-row gap-8">
            <div className="flex-1 flex flex-col gap-8">
              {columns[0].map(([color, tasks]) => (
                <div 
                  key={color} 
                  className="rounded-2xl overflow-hidden shadow-lg border border-white/20 backdrop-blur-md"
                  style={{
                    background: `linear-gradient(135deg, ${color}15, ${color}08)`,
                    borderColor: `${color}30`
                  }}
                >
                  {/* Tasks in this group - 2 column layout */}
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {tasks.map(task => (
                        <div 
                          key={task.id} 
                          className="relative rounded-xl border border-white/20 backdrop-blur-sm p-3 hover:shadow-md transition-all"
                          style={{
                            background: `linear-gradient(135deg, ${color}10, ${color}05)`,
                            borderColor: `${color}20`
                          }}
                        >
                          <div className="space-y-3">
                            {/* Task Header - Title and Points on same line */}
                            <div className="flex items-start justify-between">
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
                                className="flex-1 py-2 px-2 rounded-lg transition-colors text-xs flex items-center justify-center"
                                style={{ backgroundColor: color, color: '#fff' }}
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
              ))}
            </div>
            <div className="flex-1 flex flex-col gap-8">
              {columns[1].map(([color, tasks]) => (
                <div 
                  key={color} 
                  className="rounded-2xl overflow-hidden shadow-lg border border-white/20 backdrop-blur-md"
                  style={{
                    background: `linear-gradient(135deg, ${color}15, ${color}08)`,
                    borderColor: `${color}30`
                  }}
                >
                  {/* Tasks in this group - 2 column layout */}
                  <div className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {tasks.map(task => (
                        <div 
                          key={task.id} 
                          className="relative rounded-xl border border-white/20 backdrop-blur-sm p-3 hover:shadow-md transition-all"
                          style={{
                            background: `linear-gradient(135deg, ${color}10, ${color}05)`,
                            borderColor: `${color}20`
                          }}
                        >
                          <div className="space-y-3">
                            {/* Task Header - Title and Points on same line */}
                            <div className="flex items-start justify-between">
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
                                className="flex-1 py-2 px-2 rounded-lg transition-colors text-xs flex items-center justify-center"
                                style={{ backgroundColor: color, color: '#fff' }}
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
              ))}
            </div>
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