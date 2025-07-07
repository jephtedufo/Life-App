"use client";

import React, { useState } from 'react';
import { usePoints } from '../../context/PointsContext';
import { Link2, Target, History, ShoppingCart, Plus, TrendingUp, Settings, Edit2, Trash2, Download } from 'lucide-react';
import { TasksTab } from './TasksTab';
import { ShopTab } from './ShopTab';
import { HistoryTab } from './HistoryTab';
import { GoalsTab } from './GoalsTab';
import { ManageTab } from './ManageTab';
import { ConnectTab } from './ConnectTab';
import { PointsExportModal } from './PointsExportModal';

type PointsTab = 'tasks' | 'shop' | 'goals' | 'history' | 'manage' | 'connect';

interface PointsSystemProps {
  hideTitle?: boolean;
}

export const PointsSystem: React.FC<PointsSystemProps> = ({ hideTitle = false }) => {
  const { getCurrentBalance, getTotalPoints } = usePoints();
  const [activeTab, setActiveTab] = useState<PointsTab>('tasks');
  const [showExportModal, setShowExportModal] = useState(false);

  const currentBalance = getCurrentBalance();
  const totalEarned = getTotalPoints();

  const tabs = [
    { id: 'tasks' as const, label: 'Tasks', icon: Plus },
    { id: 'shop' as const, label: 'Shop', icon: ShoppingCart },
    { id: 'goals' as const, label: 'Goals', icon: Target },
    { id: 'history' as const, label: 'History', icon: History },
    { id: 'manage' as const, label: 'Manage', icon: Settings },
    { id: 'connect' as const, label: 'Connect', icon: Link2 },
  ];

  return (
    <>
      <div className="space-y-12">
        {/* Header */}
        {!hideTitle && (
          <div className="flex items-center justify-between">
            <h2 className="text-6xl font-bold text-gray-900">Points</h2>
            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Download size={16} />
              Export Data
            </button>
          </div>
        )}

        {/* Points Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <TrendingUp size={20} className="text-white" />
              </div>
              <h3 className="font-semibold text-green-900">Points Earned</h3>
            </div>
            <div className="text-3xl font-bold text-green-700">{totalEarned.toLocaleString()}</div>
            <div className="text-sm text-green-600 mt-1">Lifetime total</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <ShoppingCart size={20} className="text-white" />
              </div>
              <h3 className="font-semibold text-blue-900">Available Balance</h3>
            </div>
            <div className="text-3xl font-bold text-blue-700">{currentBalance.toLocaleString()}</div>
            <div className="text-sm text-blue-600 mt-1">Ready to spend</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <ShoppingCart size={20} className="text-white" />
              </div>
              <h3 className="font-semibold text-purple-900">Points Spent</h3>
            </div>
            <div className="text-3xl font-bold text-purple-700">{(totalEarned - currentBalance).toLocaleString()}</div>
            <div className="text-sm text-purple-600 mt-1">On rewards</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-gray-900 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'tasks' && <TasksTab />}
          {activeTab === 'shop' && <ShopTab />}
          {activeTab === 'goals' && <GoalsTab />}
          {activeTab === 'history' && <HistoryTab />}
          {activeTab === 'manage' && <ManageTab />}
          {activeTab === 'connect' && <ConnectTab />}
        </div>
      </div>

      {/* Export Modal */}
      <PointsExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </>
  );
};