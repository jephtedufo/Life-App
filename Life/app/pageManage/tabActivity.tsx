import React, { useState } from 'react';
import { usePoints } from '../components/contextPoints';
import { Trash2, Plus, Minus, Calendar, Filter } from 'lucide-react';

export const ActivityTab: React.FC = () => {
  const { pointLogs, redemptions, categories, deletePointLog } = usePoints();
  const [filter, setFilter] = useState<'all' | 'earned' | 'spent'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Combine and sort all transactions
  const allTransactions = [
    ...pointLogs.map(log => ({
      id: log.id,
      type: 'earned' as const,
      date: log.date,
      createdAt: log.createdAt,
      description: log.description || 'Task completed',
      category: categories.find(c => c.id === log.categoryId)?.name || 'Unknown',
      categoryColor: categories.find(c => c.id === log.categoryId)?.color || '#6B7280',
      points: log.totalPoints,
      details: `+${log.totalPoints} points`,
      deletable: true,
      originalLog: log
    })),
    ...redemptions.map(redemption => ({
      id: redemption.id,
      type: 'spent' as const,
      date: redemption.date,
      createdAt: redemption.createdAt,
      description: redemption.rewardTitle,
      category: 'Reward',
      categoryColor: '#EF4444',
      points: -redemption.pointsSpent,
      details: 'Reward redeemed',
      deletable: false,
      originalLog: redemption
    }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Apply filters
  const filteredTransactions = allTransactions.filter(transaction => {
    if (filter !== 'all' && transaction.type !== filter) return false;
    if (selectedCategory !== 'all' && transaction.category !== selectedCategory) return false;
    return true;
  });

  const handleDeleteLog = (logId: string) => {
    if (confirm('Are you sure you want to delete this log entry?')) {
      deletePointLog(logId);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const uniqueCategories = Array.from(new Set(allTransactions.map(t => t.category)));

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h3 className="text-xl font-semibold text-gray-900">Points Activity</h3>
        
        <div className="flex gap-3">
          {/* Type Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'earned' | 'spent')}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
          >
            <option value="all">All Transactions</option>
            <option value="earned">Points Earned</option>
            <option value="spent">Points Spent</option>
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
          >
            <option value="all">All Categories</option>
            {uniqueCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Transaction List */}
      {filteredTransactions.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Calendar size={48} className="mx-auto" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h4>
          <p className="text-gray-600">
            {filter === 'all' ? 'Start earning points by completing tasks!' : 
             filter === 'earned' ? 'No points earned yet. Complete some tasks to get started!' :
             'No points spent yet. Check out the rewards store!'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTransactions.map(transaction => (
            <div key={`${transaction.type}-${transaction.id}`} className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Type Icon */}
                  <div className={`p-2 rounded-lg ${
                    transaction.type === 'earned' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'earned' ? (
                      <Plus size={16} className="text-green-600" />
                    ) : (
                      <Minus size={16} className="text-red-600" />
                    )}
                  </div>

                  {/* Transaction Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: transaction.categoryColor }}
                        />
                        <span className="text-sm text-gray-500">{transaction.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{formatDate(transaction.date)}</span>
                      <span>{transaction.details}</span>
                    </div>
                  </div>
                </div>

                {/* Points and Actions */}
                <div className="flex items-center gap-3">
                  <div className={`text-lg font-bold ${
                    transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.points > 0 ? '+' : ''}{transaction.points.toLocaleString()}
                  </div>
                  
                  {transaction.deletable && (
                    <button
                      onClick={() => handleDeleteLog(transaction.id)}
                      className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                      title="Delete log entry"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      {filteredTransactions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              +{filteredTransactions
                .filter(t => t.type === 'earned')
                .reduce((sum, t) => sum + t.points, 0)
                .toLocaleString()}
            </div>
            <div className="text-sm text-green-700 uppercase tracking-wide">Total Earned</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {filteredTransactions
                .filter(t => t.type === 'spent')
                .reduce((sum, t) => sum + Math.abs(t.points), 0)
                .toLocaleString()}
            </div>
            <div className="text-sm text-red-700 uppercase tracking-wide">Total Spent</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {filteredTransactions.length}
            </div>
            <div className="text-sm text-blue-700 uppercase tracking-wide">Transactions</div>
          </div>
        </div>
      )}
    </div>
  );
};