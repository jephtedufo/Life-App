"use client";

import React, { useState } from 'react';
import { useHabits } from '../context/HabitContext';
import { Edit2, Trash2, Check, X, X as CloseIcon, Save } from 'lucide-react';
import { isToday } from '../utils/dateUtils';

interface StatisticsProps {
  hideTitle?: boolean;
  forceGridLayout?: boolean;
}

export const Statistics: React.FC<StatisticsProps> = ({ hideTitle = false, forceGridLayout = false }) => {
  const { habits, statuses, deleteHabit, updateHabit, updateStatus, compactMode } = useHabits();
  const [editingHabit, setEditingHabit] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null);

  const getHabitStats = (habitId: string) => {
    const habitStatuses = statuses.filter(s => s.habitId === habitId);
    const total = habitStatuses.length;
    const success = habitStatuses.filter(s => s.status === 'success').length;
    const failure = habitStatuses.filter(s => s.status === 'failure').length;
    const successRate = total > 0 ? Math.round((success / total) * 100) : 0;
    
    return {
      success,
      failure,
      successRate,
      streak: calculateStreak(habitId),
    };
  };

  const calculateStreak = (habitId: string) => {
    const habitStatuses = statuses
      .filter(s => s.habitId === habitId && s.status !== 'skipped')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    let currentStreak = 0;
    let maxStreak = 0;
    let type: 'success' | 'failure' | null = null;

    for (const status of habitStatuses) {
      if (!type) {
        type = status.status === 'success' ? 'success' : 'failure';
        currentStreak = 1;
      } else if (status.status === type) {
        currentStreak++;
      } else {
        break;
      }
      maxStreak = Math.max(maxStreak, currentStreak);
    }

    return { count: maxStreak, type };
  };

  const handleEdit = (habit: { id: string; name: string; description?: string }) => {
    setEditingHabit(habit.id);
    setEditName(habit.name);
    setEditDescription(habit.description || '');
  };

  const handleSaveEdit = (habitId: string) => {
    if (editName.trim()) {
      const habit = habits.find(h => h.id === habitId);
      if (habit) {
        updateHabit({ ...habit, name: editName.trim(), description: editDescription.trim() });
      }
    }
    setEditingHabit(null);
    setEditName('');
    setEditDescription('');
  };

  const handleCancelEdit = () => {
    setEditingHabit(null);
    setEditName('');
    setEditDescription('');
  };

  const handleKeyPress = (e: React.KeyboardEvent, habitId: string) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSaveEdit(habitId);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancelEdit();
    }
  };

  const handleHabitClick = (habitId: string) => {
    if (compactMode && !forceGridLayout) {
      setSelectedHabit(habitId);
      // Prevent body scroll when sidebar is open
      document.body.style.overflow = 'hidden';
    }
  };

  const closeSidebar = () => {
    setSelectedHabit(null);
    setEditingHabit(null);
    setEditName('');
    setEditDescription('');
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  // Get today's status - ensure we're using the exact same date format as the calendar
  const getTodaysHabitStatus = (habitId: string) => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD format
    const todayStatus = statuses.find(s => s.habitId === habitId && s.date === todayStr);
    return todayStatus?.status || 'pending';
  };

  const handleStatusUpdate = (habitId: string, status: 'success' | 'failure') => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD format
    const currentStatus = getTodaysHabitStatus(habitId);
    
    if (currentStatus === status) {
      updateStatus(habitId, todayStr, 'pending');
    } else {
      updateStatus(habitId, todayStr, status);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const selectedHabitData = selectedHabit ? habits.find(h => h.id === selectedHabit) : null;
  const selectedHabitStats = selectedHabit ? getHabitStats(selectedHabit) : null;

  // Force grid layout for habits page or use compact mode logic
  const useGridLayout = forceGridLayout || !compactMode;

  if (!useGridLayout) {
    return (
      <>
        <div className="space-y-12">
          {!hideTitle && (
            <div className="flex items-center justify-between">
              <h2 className="text-6xl font-bold text-gray-900">Habits</h2>
            </div>
          )}
          
          {/* 3-Column Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {habits.map(habit => {
              const stats = getHabitStats(habit.id);
              
              return (
                <div 
                  key={habit.id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.02] transform"
                  onClick={() => handleHabitClick(habit.id)}
                >
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-4 truncate" title={habit.name}>
                      {habit.name}
                    </h3>
                    
                    {/* Condensed Stats */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="font-bold text-green-600 text-xl">{stats.success}</div>
                        <div className="text-green-700 uppercase tracking-wide text-xs">Success</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="font-bold text-blue-600 text-xl">{stats.successRate}%</div>
                        <div className="text-blue-700 uppercase tracking-wide text-xs">Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full-Screen Sliding Sidebar */}
        {selectedHabit && selectedHabitData && selectedHabitStats && (
          <>
            {/* Full-screen backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
              style={{ margin: 0, padding: 0, top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}
              onClick={closeSidebar}
            />
            
            {/* Sidebar - Absolute positioning with full viewport height */}
            <div 
              className={`fixed bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
                selectedHabit ? 'translate-x-0' : 'translate-x-full'
              }`}
              style={{ 
                top: 0, 
                right: 0, 
                bottom: 0, 
                width: '384px', 
                height: '100vh',
                margin: 0,
                padding: 0
              }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50 flex-shrink-0">
                  <h3 className="font-semibold text-gray-900 text-lg">Habit Details</h3>
                  <div className="flex items-center gap-2">
                    {editingHabit === selectedHabit ? (
                      <>
                        <button
                          onClick={() => handleSaveEdit(selectedHabit)}
                          className="p-2 hover:bg-green-50 rounded-lg transition-colors text-green-600"
                          title="Save changes"
                        >
                          <Save size={16} />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
                          title="Cancel editing"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(selectedHabitData)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit habit"
                        >
                          <Edit2 size={16} className="text-gray-600" />
                        </button>
                        <button
                          onClick={() => {
                            deleteHabit(selectedHabit);
                            closeSidebar();
                          }}
                          className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                          title="Delete habit"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                    <button
                      onClick={closeSidebar}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-2"
                    >
                      <CloseIcon size={16} className="text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {editingHabit === selectedHabit ? (
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Habit Name</label>
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onKeyDown={(e) => handleKeyPress(e, selectedHabit)}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg font-bold text-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          placeholder="Enter habit name..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          onKeyDown={(e) => handleKeyPress(e, selectedHabit)}
                          placeholder="Add description..."
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          rows={6}
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={() => handleSaveEdit(selectedHabit)}
                          className="flex-1 py-2 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
                        >
                          <Save size={16} />
                          Save Changes
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex-1 py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {/* Habit Title */}
                      <div>
                        <h4 className="font-bold text-gray-900 text-2xl leading-tight mb-4">
                          {selectedHabitData.name}
                        </h4>
                        
                        {/* Description directly under title */}
                        {selectedHabitData.description && selectedHabitData.description.trim() ? (
                          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 mb-4">
                            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                              {selectedHabitData.description}
                            </p>
                          </div>
                        ) : (
                          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 mb-4">
                            <p className="text-sm text-gray-500 italic">No description added</p>
                          </div>
                        )}
                        
                        {/* Creation Date */}
                        <p className="text-sm text-gray-500">
                          Created on {formatDate(selectedHabitData.createdAt)}
                        </p>
                      </div>

                      {/* Today's Status */}
                      <div className="space-y-4">
                        <h5 className="font-semibold text-gray-900 text-lg">Today's Status</h5>
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleStatusUpdate(selectedHabit, 'success')}
                            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                              getTodaysHabitStatus(selectedHabit) === 'success'
                                ? 'bg-green-500 text-white shadow-lg'
                                : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                            }`}
                          >
                            <Check size={16} className="inline mr-2" />
                            Success
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(selectedHabit, 'failure')}
                            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                              getTodaysHabitStatus(selectedHabit) === 'failure'
                                ? 'bg-red-500 text-white shadow-lg'
                                : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                            }`}
                          >
                            <X size={16} className="inline mr-2" />
                            Failed
                          </button>
                        </div>
                      </div>

                      {/* Statistics in 2x2 Grid */}
                      <div className="space-y-4">
                        <h5 className="font-semibold text-gray-900 text-lg">Statistics</h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
                            <div className="text-3xl font-bold text-green-600 mb-2">{selectedHabitStats.success}</div>
                            <div className="text-xs font-medium text-green-700 uppercase tracking-wide">Successful Days</div>
                          </div>
                          <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
                            <div className="text-3xl font-bold text-red-600 mb-2">{selectedHabitStats.failure}</div>
                            <div className="text-xs font-medium text-red-700 uppercase tracking-wide">Failed Days</div>
                          </div>
                          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <div className="text-3xl font-bold text-blue-600 mb-2">{selectedHabitStats.successRate}%</div>
                            <div className="text-xs font-medium text-blue-700 uppercase tracking-wide">Success Rate</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-100">
                            {selectedHabitStats.streak && selectedHabitStats.streak.count > 0 ? (
                              <>
                                <div className={`text-3xl font-bold mb-2 ${
                                  selectedHabitStats.streak.type === 'success' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {selectedHabitStats.streak.count}
                                </div>
                                <div className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                                  {selectedHabitStats.streak.type === 'success' ? 'Success' : 'Failure'} Streak
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="text-3xl font-bold text-gray-400 mb-2">0</div>
                                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">No Streak</div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  // Grid layout (regular mode or forced for habits page)
  return (
    <div className="space-y-12">
      {!hideTitle && (
        <div className="flex items-center justify-between">
          <h2 className="text-6xl font-bold text-gray-900">Habits</h2>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {habits.map(habit => {
          const stats = getHabitStats(habit.id);
          
          return (
            <div key={habit.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  {editingHabit === habit.id ? (
                    <div className="flex-1 space-y-4">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => handleKeyPress(e, habit.id)}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg font-bold text-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        placeholder="Enter habit name..."
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        onKeyDown={(e) => handleKeyPress(e, habit.id)}
                        placeholder="Add description..."
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(habit.id)}
                          className="flex-1 py-2 px-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm flex items-center justify-center gap-1"
                        >
                          <Save size={14} />
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="flex-1 py-2 px-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-xl leading-tight mb-3">
                        {habit.name}
                      </h3>
                      
                      {/* Description directly under title */}
                      {habit.description && habit.description.trim() ? (
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 mb-3">
                          <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{habit.description}</p>
                        </div>
                      ) : (
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 mb-3">
                          <p className="text-sm text-gray-500 italic">No description added</p>
                        </div>
                      )}
                      
                      {/* Creation Date */}
                      <p className="text-xs text-gray-500 mb-4">
                        Created on {formatDate(habit.createdAt)}
                      </p>
                    </div>
                  )}
                  {editingHabit !== habit.id && (
                    <div className="flex gap-1 ml-3">
                      <button
                        onClick={() => handleEdit(habit)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit habit"
                      >
                        <Edit2 size={16} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => deleteHabit(habit.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                        title="Delete habit"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
                
                {editingHabit !== habit.id && (
                  <>
                    {/* Stats Grid - 2x2 Layout */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
                        <div className="text-xl font-bold text-green-600 mb-1">{stats.success}</div>
                        <div className="text-xs font-medium text-green-700 uppercase tracking-wide">Success</div>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded-lg border border-red-100">
                        <div className="text-xl font-bold text-red-600 mb-1">{stats.failure}</div>
                        <div className="text-xs font-medium text-red-700 uppercase tracking-wide">Failed</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="text-xl font-bold text-blue-600 mb-1">{stats.successRate}%</div>
                        <div className="text-xs font-medium text-blue-700 uppercase tracking-wide">Success Rate</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                        {stats.streak && stats.streak.count > 0 ? (
                          <>
                            <div className={`text-xl font-bold mb-1 ${
                              stats.streak.type === 'success' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {stats.streak.count}
                            </div>
                            <div className="text-xs font-medium text-gray-700 uppercase tracking-wide">
                              {stats.streak.type === 'success' ? 'Success' : 'Failure'} Streak
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="text-xl font-bold text-gray-400 mb-1">0</div>
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">No Streak</div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};