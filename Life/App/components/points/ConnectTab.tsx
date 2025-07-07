import React, { useState } from 'react';
import { useHabits } from '../../context/HabitContext';
import { usePoints } from '../../context/PointsContext';
import { Link2, Check, X } from 'lucide-react';

export const ConnectTab: React.FC = () => {
  const { habits } = useHabits();
  const { categories, habitConnections, connectHabitToTask, disconnectHabitFromTask } = usePoints();
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null);

  const getConnectedTasks = (habitId: string) => {
    return habitConnections
      .filter(conn => conn.habitId === habitId)
      .map(conn => categories.find(cat => cat.id === conn.taskId))
      .filter(Boolean);
  };

  const isTaskConnected = (habitId: string, taskId: string) => {
    return habitConnections.some(conn => conn.habitId === habitId && conn.taskId === taskId);
  };

  const handleToggleConnection = (habitId: string, taskId: string) => {
    if (isTaskConnected(habitId, taskId)) {
      disconnectHabitFromTask(habitId, taskId);
    } else {
      connectHabitToTask(habitId, taskId);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect Habits to Tasks</h3>
        <p className="text-gray-600">
          When a habit is marked as <strong>successful</strong>, connected tasks will automatically gain points.
        </p>
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Points are only added when habits are marked as successful. If you change a habit back to failed or pending, the points will be removed.
          </p>
        </div>
      </div>

      {/* Habits List */}
      {habits.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Link2 size={48} className="mx-auto" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No habits found</h4>
          <p className="text-gray-600">Create some habits first to connect them to tasks</p>
        </div>
      ) : (
        <div className="space-y-6">
          {habits.map(habit => {
            const connectedTasks = getConnectedTasks(habit.id);
            
            return (
              <div key={habit.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Habit Header */}
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setSelectedHabit(selectedHabit === habit.id ? null : habit.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 text-lg mb-2">{habit.name}</h4>
                      {habit.description && (
                        <p className="text-sm text-gray-600 mb-3">{habit.description}</p>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Connected to:</span>
                        {connectedTasks.length === 0 ? (
                          <span className="text-sm text-gray-400">No tasks connected</span>
                        ) : (
                          <div className="flex gap-2">
                            {connectedTasks.map(task => (
                              <span 
                                key={task?.id}
                                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs"
                              >
                                <div 
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: task?.color }}
                                />
                                {task?.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-gray-400">
                      {selectedHabit === habit.id ? '−' : '+'}
                    </div>
                  </div>
                </div>

                {/* Task Connections */}
                {selectedHabit === habit.id && (
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <h5 className="font-medium text-gray-900 mb-4">Available Tasks:</h5>
                    {categories.length === 0 ? (
                      <p className="text-gray-500 text-sm">No tasks available. Create some tasks first.</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {categories.map(task => {
                          const isConnected = isTaskConnected(habit.id, task.id);
                          
                          return (
                            <button
                              key={task.id}
                              onClick={() => handleToggleConnection(habit.id, task.id)}
                              className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                                isConnected
                                  ? 'border-green-200 bg-green-50 text-green-900'
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div 
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: task.color }}
                                />
                                <div className="text-left">
                                  <div className="font-medium">{task.name}</div>
                                  <div className="text-sm opacity-75">
                                    +{task.defaultPointValue} points per success
                                  </div>
                                </div>
                              </div>
                              <div className={`p-1 rounded-full ${
                                isConnected ? 'bg-green-500' : 'bg-gray-300'
                              }`}>
                                {isConnected ? (
                                  <Check size={12} className="text-white" />
                                ) : (
                                  <X size={12} className="text-white" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};