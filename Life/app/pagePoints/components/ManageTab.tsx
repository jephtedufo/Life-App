import React, { useState } from 'react';
import { usePoints } from '../PointsContext';
import { Edit2, Trash2, Plus, Gift, Eye, EyeOff, ChevronUp, ChevronDown } from 'lucide-react';
import { AddTaskModal } from './AddTaskModal';
import { AddRewardModal } from './AddRewardModal';

export const ManageTab: React.FC = () => {
  const { categories, rewards, deleteCategory, deleteReward, updateReward, updateCategory } = usePoints();
  const [editingTask, setEditingTask] = useState<any>(null);
  const [editingReward, setEditingReward] = useState<any>(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddReward, setShowAddReward] = useState(false);
  const [groupTitles, setGroupTitles] = useState<Record<string, string>>({});
  const [editingGroupTitle, setEditingGroupTitle] = useState<string | null>(null);
  const [groupTitleValue, setGroupTitleValue] = useState('');

  const handleDeleteTask = (id: string) => {
    if (confirm('Are you sure you want to delete this task? All associated logs will be removed.')) {
      deleteCategory(id);
    }
  };

  const handleDeleteReward = (id: string) => {
    if (confirm('Are you sure you want to delete this reward?')) {
      deleteReward(id);
    }
  };

  const toggleRewardImageVisibility = (reward: any) => {
    updateReward({
      ...reward,
      showImage: !reward.showImage
    });
  };

  const updateRewardColumnWidth = (reward: any, width: number) => {
    updateReward({
      ...reward,
      columnWidth: width
    });
  };

  // Reordering functions
  const moveTaskUp = (taskId: string) => {
    const taskIndex = categories.findIndex(t => t.id === taskId);
    if (taskIndex > 0) {
      const newCategories = [...categories];
      [newCategories[taskIndex], newCategories[taskIndex - 1]] = [newCategories[taskIndex - 1], newCategories[taskIndex]];
      
      // Update priorities
      newCategories.forEach((cat, index) => {
        updateCategory({ ...cat, priority: index });
      });
    }
  };

  const moveTaskDown = (taskId: string) => {
    const taskIndex = categories.findIndex(t => t.id === taskId);
    if (taskIndex < categories.length - 1) {
      const newCategories = [...categories];
      [newCategories[taskIndex], newCategories[taskIndex + 1]] = [newCategories[taskIndex + 1], newCategories[taskIndex]];
      
      // Update priorities
      newCategories.forEach((cat, index) => {
        updateCategory({ ...cat, priority: index });
      });
    }
  };

  const moveRewardUp = (rewardId: string) => {
    const rewardIndex = rewards.findIndex(r => r.id === rewardId);
    if (rewardIndex > 0) {
      const newRewards = [...rewards];
      [newRewards[rewardIndex], newRewards[rewardIndex - 1]] = [newRewards[rewardIndex - 1], newRewards[rewardIndex]];
      
      // Update priorities
      newRewards.forEach((reward, index) => {
        updateReward({ ...reward, priority: index });
      });
    }
  };

  const moveRewardDown = (rewardId: string) => {
    const rewardIndex = rewards.findIndex(r => r.id === rewardId);
    if (rewardIndex < rewards.length - 1) {
      const newRewards = [...rewards];
      [newRewards[rewardIndex], newRewards[rewardIndex + 1]] = [newRewards[rewardIndex + 1], newRewards[rewardIndex]];
      
      // Update priorities
      newRewards.forEach((reward, index) => {
        updateReward({ ...reward, priority: index });
      });
    }
  };

  // Group tasks by color for group title editing
  const groupedTasks = categories.reduce((groups, task) => {
    const color = task.color;
    if (!groups[color]) {
      groups[color] = [];
    }
    groups[color].push(task);
    return groups;
  }, {} as Record<string, typeof categories>);

  const handleEditGroupTitle = (color: string, currentTitle: string) => {
    setEditingGroupTitle(color);
    setGroupTitleValue(currentTitle);
  };

  const handleSaveGroupTitle = (color: string) => {
    setGroupTitles(prev => ({ ...prev, [color]: groupTitleValue }));
    setEditingGroupTitle(null);
    setGroupTitleValue('');
  };

  const getGroupTitle = (color: string, tasks: any[]) => {
    return groupTitles[color] || `${tasks[0]?.name.split(' ')[0] || 'Task'} Group`;
  };

  // Sort rewards: items with images first, then items without images
  const sortedRewards = [...rewards].sort((a, b) => {
    const aHasImage = a.showImage !== false && a.imageUrl;
    const bHasImage = b.showImage !== false && b.imageUrl;
    
    if (aHasImage && !bHasImage) return -1;
    if (!aHasImage && bHasImage) return 1;
    return (a.priority || 0) - (b.priority || 0);
  });

  // Sort categories by priority
  const sortedCategories = [...categories].sort((a, b) => (a.priority || 0) - (b.priority || 0));

  return (
    <>
      <div className="space-y-12">
        {/* Group Titles Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">Task Groups</h3>
          </div>

          {Object.keys(groupedTasks).length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <Plus size={32} className="mx-auto" />
              </div>
              <p className="text-gray-600">No task groups created yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(groupedTasks).map(([color, tasks]) => {
                const groupTitle = getGroupTitle(color, tasks);
                
                return (
                  <div key={color} className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                        {editingGroupTitle === color ? (
                          <input
                            type="text"
                            value={groupTitleValue}
                            onChange={(e) => setGroupTitleValue(e.target.value)}
                            onBlur={() => handleSaveGroupTitle(color)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveGroupTitle(color);
                              if (e.key === 'Escape') setEditingGroupTitle(null);
                            }}
                            className="font-medium text-gray-900 border border-gray-300 rounded px-2 py-1"
                            autoFocus
                          />
                        ) : (
                          <h4 className="font-medium text-gray-900">{groupTitle}</h4>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{tasks.length} tasks</span>
                        <button
                          onClick={() => handleEditGroupTitle(color, groupTitle)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit group title"
                        >
                          <Edit2 size={14} className="text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Tasks Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">Manage Tasks</h3>
            <button
              onClick={() => setShowAddTask(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              <Plus size={16} />
              Add Task
            </button>
          </div>

          {categories.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <Plus size={32} className="mx-auto" />
              </div>
              <p className="text-gray-600">No tasks created yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedCategories.map((task, index) => (
                <div key={task.id} className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => moveTaskUp(task.id)}
                          disabled={index === 0}
                          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          title="Move up"
                        >
                          <ChevronUp size={16} className="text-gray-600" />
                        </button>
                        <button
                          onClick={() => moveTaskDown(task.id)}
                          disabled={index === categories.length - 1}
                          className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          title="Move down"
                        >
                          <ChevronDown size={16} className="text-gray-600" />
                        </button>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: task.color }}
                          />
                          <h4 className="font-medium text-gray-900">{task.name}</h4>
                        </div>
                        {task.description && (
                          <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                        )}
                        <p className="text-sm text-gray-500">
                          Point value: {task.defaultPointValue}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setEditingTask(task)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit task"
                      >
                        <Edit2 size={14} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                        title="Delete task"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Shop Items Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">Manage Shop Items</h3>
            <button
              onClick={() => setShowAddReward(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              <Plus size={16} />
              Add Item
            </button>
          </div>

          {rewards.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <Gift size={32} className="mx-auto" />
              </div>
              <p className="text-gray-600">No shop items created yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedRewards.map((reward, index) => {
                const hasImage = reward.showImage !== false && reward.imageUrl;
                
                return (
                  <div key={reward.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    {/* Image Preview with Toggle */}
                    {hasImage ? (
                      <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
                        <img 
                          src={reward.imageUrl} 
                          alt={reward.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error('Image failed to load:', reward.imageUrl);
                          }}
                        />
                        <button
                          onClick={() => toggleRewardImageVisibility(reward)}
                          className="absolute top-2 right-2 p-1.5 bg-black bg-opacity-50 text-white rounded-lg hover:bg-opacity-70 transition-colors"
                          title="Hide image"
                        >
                          <EyeOff size={12} />
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">No image</span>
                          {reward.imageUrl && (
                            <button
                              onClick={() => toggleRewardImageVisibility(reward)}
                              className="p-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                              title="Show image"
                            >
                              <Eye size={12} />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-2 flex-1">
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => moveRewardUp(reward.id)}
                              disabled={index === 0}
                              className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed text-xs transition-colors"
                              title="Move up"
                            >
                              <ChevronUp size={12} className="text-gray-600" />
                            </button>
                            <button
                              onClick={() => moveRewardDown(reward.id)}
                              disabled={index === rewards.length - 1}
                              className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed text-xs transition-colors"
                              title="Move down"
                            >
                              <ChevronDown size={12} className="text-gray-600" />
                            </button>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-2">{reward.title}</h4>
                            {reward.description && (
                              <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
                            )}
                            <p className="text-sm text-gray-500">
                              Cost: {reward.cost.toLocaleString()} points
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => setEditingReward(reward)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit reward"
                          >
                            <Edit2 size={14} className="text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteReward(reward.id)}
                            className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                            title="Delete reward"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Column Width Controls */}
                      <div className="border-t pt-3">
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Card Width
                        </label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map(width => (
                            <button
                              key={width}
                              onClick={() => updateRewardColumnWidth(reward, width)}
                              className={`px-2 py-1 text-xs rounded transition-colors ${
                                (reward.columnWidth || 1) === width
                                  ? 'bg-gray-900 text-white'
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {width}x
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddTaskModal
        isOpen={showAddTask || !!editingTask}
        onClose={() => {
          setShowAddTask(false);
          setEditingTask(null);
        }}
        editingTask={editingTask}
      />

      <AddRewardModal
        isOpen={showAddReward || !!editingReward}
        onClose={() => {
          setShowAddReward(false);
          setEditingReward(null);
        }}
        editingReward={editingReward}
      />
    </>
  );
};