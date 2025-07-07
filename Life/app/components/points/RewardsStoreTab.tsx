"use client";

import React, { useState } from 'react';
import { usePoints } from '../../context/PointsContext';
import { Plus, Edit2, Trash2, Gift, ShoppingCart } from 'lucide-react';
import { AddRewardModal } from './AddRewardModal';
import { RedeemRewardModal } from './RedeemRewardModal';

export const RewardsStoreTab: React.FC = () => {
  const { rewards, deleteReward, getCurrentBalance } = usePoints();
  const [showAddReward, setShowAddReward] = useState(false);
  const [redeemingReward, setRedeemingReward] = useState<string | null>(null);

  const currentBalance = getCurrentBalance();

  const handleDeleteReward = (id: string) => {
    if (confirm('Are you sure you want to delete this reward?')) {
      deleteReward(id);
    }
  };

  const sortedRewards = [...rewards].sort((a, b) => a.cost - b.cost);

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Rewards Store</h3>
            <p className="text-gray-600">Current Balance: <span className="font-semibold text-gray-900">{currentBalance.toLocaleString()} points</span></p>
          </div>
          <button
            onClick={() => setShowAddReward(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            <Plus size={16} />
            Add Reward
          </button>
        </div>

        {/* Rewards Grid */}
        {rewards.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Gift size={48} className="mx-auto" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No rewards yet</h4>
            <p className="text-gray-600 mb-6">Create rewards to motivate yourself and spend your earned points</p>
            <button
              onClick={() => setShowAddReward(true)}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Create Reward
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedRewards.map(reward => {
              const canAfford = currentBalance >= reward.cost;

              return (
                <div key={reward.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all ${
                  canAfford ? 'border-gray-100' : 'border-gray-200 opacity-75'
                }`}>
                  <div className="p-6">
                    {/* Reward Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-lg leading-tight mb-2">{reward.title}</h4>
                        {reward.description && (
                          <p className="text-sm text-gray-600 leading-relaxed">{reward.description}</p>
                        )}
                      </div>
                      <div className="flex gap-1 ml-3">
                        <button
                          onClick={() => {/* TODO: Edit reward */}}
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

                    {/* Cost */}
                    <div className="mb-4">
                      <div className={`text-center p-4 rounded-lg border-2 ${
                        canAfford 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className={`text-2xl font-bold ${
                          canAfford ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          {reward.cost.toLocaleString()}
                        </div>
                        <div className={`text-sm font-medium uppercase tracking-wide ${
                          canAfford ? 'text-green-700' : 'text-gray-500'
                        }`}>
                          Points
                        </div>
                      </div>
                    </div>

                    {/* Redeem Button */}
                    <button
                      onClick={() => setRedeemingReward(reward.id)}
                      disabled={!canAfford}
                      className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                        canAfford
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart size={16} />
                      {canAfford ? 'Redeem Reward' : 'Insufficient Points'}
                    </button>

                    {!canAfford && (
                      <p className="text-xs text-gray-500 text-center mt-2">
                        Need {(reward.cost - currentBalance).toLocaleString()} more points
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modals */}
      <AddRewardModal
        isOpen={showAddReward}
        onClose={() => setShowAddReward(false)}
      />

      {redeemingReward && (
        <RedeemRewardModal
          isOpen={true}
          onClose={() => setRedeemingReward(null)}
          rewardId={redeemingReward}
        />
      )}
    </>
  );
};