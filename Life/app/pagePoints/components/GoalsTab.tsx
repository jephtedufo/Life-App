import React, { useState } from 'react';
import { usePoints } from '../PointsContext';
import { Plus, Target, Calendar, TrendingUp } from 'lucide-react';
import { AddGoalModal } from './AddGoalModal';

export const GoalsTab: React.FC = () => {
  const { goals, pointLogs } = usePoints();
  const [showAddGoal, setShowAddGoal] = useState(false);

  const getGoalProgress = (goal: any) => {
    const startDate = new Date(goal.startDate);
    const endDate = new Date(goal.endDate);
    const now = new Date();
    
    // Get points earned within the goal period
    const relevantLogs = pointLogs.filter(log => {
      const logDate = new Date(log.date);
      return logDate >= startDate && logDate <= endDate;
    });
    
    const earnedPoints = relevantLogs.reduce((total, log) => total + log.totalPoints, 0);
    const progress = Math.min((earnedPoints / goal.targetPoints) * 100, 100);
    
    // Calculate days remaining
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysElapsed = Math.ceil((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.max(0, totalDays - daysElapsed);
    
    return {
      earnedPoints,
      progress,
      daysRemaining,
      isCompleted: earnedPoints >= goal.targetPoints,
      isExpired: now > endDate
    };
  };

  const activeGoals = goals.filter(goal => {
    const progress = getGoalProgress(goal);
    return !progress.isExpired && !progress.isCompleted;
  });

  const completedGoals = goals.filter(goal => {
    const progress = getGoalProgress(goal);
    return progress.isCompleted;
  });

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">Points Goals</h3>
          <button
            onClick={() => setShowAddGoal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            <Plus size={16} />
            Add Goal
          </button>
        </div>

        {/* Active Goals */}
        {activeGoals.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Target size={18} className="text-blue-600" />
              Active Goals
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeGoals.map(goal => {
                const progress = getGoalProgress(goal);
                
                return (
                  <div key={goal.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h5 className="font-bold text-gray-900 text-lg">{goal.title}</h5>
                        <p className="text-sm text-gray-500">
                          {new Date(goal.startDate).toLocaleDateString()} - {new Date(goal.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Target</div>
                        <div className="font-bold text-gray-900">{goal.targetPoints.toLocaleString()}</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-gray-900">{progress.progress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${progress.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{progress.earnedPoints.toLocaleString()}</div>
                        <div className="text-xs text-green-700 uppercase tracking-wide">Earned</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{progress.daysRemaining}</div>
                        <div className="text-xs text-blue-700 uppercase tracking-wide">Days Left</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Completed Goals */}
        {completedGoals.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <TrendingUp size={18} className="text-green-600" />
              Completed Goals
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completedGoals.map(goal => {
                const progress = getGoalProgress(goal);
                
                return (
                  <div key={goal.id} className="bg-green-50 rounded-xl border border-green-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h5 className="font-bold text-green-900 text-lg">{goal.title}</h5>
                        <p className="text-sm text-green-600">
                          Completed • {new Date(goal.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-green-600">Achieved</div>
                        <div className="font-bold text-green-800">{progress.earnedPoints.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="w-full bg-green-200 rounded-full h-3 mb-4">
                      <div className="bg-green-600 h-3 rounded-full w-full" />
                    </div>

                    <div className="text-center p-3 bg-green-100 rounded-lg">
                      <div className="text-lg font-bold text-green-700">🎉 Goal Achieved!</div>
                      <div className="text-sm text-green-600">
                        {((progress.earnedPoints / goal.targetPoints) * 100).toFixed(1)}% of target
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {goals.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Target size={48} className="mx-auto" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No goals set</h4>
            <p className="text-gray-600 mb-6">Set point goals to stay motivated and track your progress</p>
            <button
              onClick={() => setShowAddGoal(true)}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Create Your First Goal
            </button>
          </div>
        )}
      </div>

      <AddGoalModal
        isOpen={showAddGoal}
        onClose={() => setShowAddGoal(false)}
      />
    </>
  );
};