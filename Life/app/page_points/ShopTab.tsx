import React, { useState } from 'react';
import { usePoints } from '../../config/context/PointsContext';
import { ShoppingBag } from 'lucide-react';
import { AddRewardModal } from './AddRewardModal';
import { RedeemRewardModal } from './RedeemRewardModal';

export const ShopTab: React.FC = () => {
  const { rewards, getCurrentBalance } = usePoints();
  const [showAddReward, setShowAddReward] = useState(false);
  const [redeemingReward, setRedeemingReward] = useState<string | null>(null);

  const currentBalance = getCurrentBalance();
  
  // Sort rewards by priority and ensure proper grid flow
  const sortedRewards = [...rewards]
    .sort((a, b) => (a.priority || 0) - (b.priority || 0))
    .filter(reward => reward.showImage !== false || !reward.imageUrl);

  const getGridColumnClass = (columnWidth: number) => {
    switch (columnWidth) {
      case 2: return 'md:col-span-2';
      case 3: return 'md:col-span-3';
      case 4: return 'md:col-span-4';
      default: return 'md:col-span-1';
    }
  };

  const isLargeCard = (columnWidth: number) => columnWidth >= 3;

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Shop</h3>
            <p className="text-gray-600 mt-1">
              Current Balance: <span className="font-bold text-gray-900">{currentBalance.toLocaleString()} Points</span>
            </p>
          </div>
          <button
            onClick={() => setShowAddReward(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Add Item
          </button>
        </div>

        {/* E-commerce Style Rewards Grid */}
        {rewards.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <ShoppingBag size={48} className="mx-auto" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No items in shop</h4>
            <p className="text-gray-600 mb-6">Add items to your shop to start spending points</p>
            <button
              onClick={() => setShowAddReward(true)}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Add First Item
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {sortedRewards.map(reward => {
              const canAfford = currentBalance >= reward.cost;
              const columnWidth = reward.columnWidth || 1;
              const isLarge = isLargeCard(columnWidth);
              const hasImage = reward.showImage !== false && reward.imageUrl;

              return (
                <div 
                  key={reward.id} 
                  className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group ${getGridColumnClass(columnWidth)} ${
                    canAfford ? '' : 'opacity-75'
                  }`}
                  style={{ 
                    height: isLarge ? 'auto' : '320px' // Fixed height for 1x and 2x cards
                  }}
                >
                  {/* Product Image */}
                  <div className={`${isLarge ? 'aspect-[2/1]' : 'h-48'} bg-gray-100 overflow-hidden relative`}>
                    {hasImage ? (
                      <>
                        <img 
                          src={reward.imageUrl} 
                          alt={reward.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.error('Image failed to load:', reward.imageUrl);
                          }}
                        />
                        {isLarge && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <ShoppingBag size={isLarge ? 64 : 48} className="text-gray-400" />
                      </div>
                    )}

                    {/* Large card overlay content */}
                    {isLarge && (
                      <div className="absolute inset-0 flex items-end">
                        <div className="w-full p-6 text-white">
                          <div className="backdrop-blur-sm bg-black/30 rounded-lg p-4 border border-white/20">
                            <h4 className="font-bold text-xl mb-2">{reward.title}</h4>
                            {reward.description && (
                              <p className="text-sm opacity-90 mb-3">{reward.description}</p>
                            )}
                            <div className="flex items-center justify-between">
                              <div className="text-lg font-bold text-gray-600">
                                {reward.cost.toLocaleString()} Points
                              </div>
                              <button
                                onClick={() => setRedeemingReward(reward.id)}
                                disabled={!canAfford}
                                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                                  canAfford
                                    ? 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                                    : 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
                                }`}
                                title={canAfford ? 'Purchase' : 'Insufficient Points'}
                              >
                                <ShoppingBag size={16} />
                                Buy
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Regular card content */}
                  {!isLarge && (
                    <div className="p-4 flex flex-col h-[calc(100%-12rem)]">
                      <h4 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">{reward.title}</h4>
                      
                      {reward.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">{reward.description}</p>
                      )}

                      {/* Price and Action Section */}
                      <div className="mt-auto">
                        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-100">
                          <div className="text-lg font-bold text-gray-600">
                            {reward.cost.toLocaleString()} Points
                          </div>

                          <button
                            onClick={() => setRedeemingReward(reward.id)}
                            disabled={!canAfford}
                            className={`px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${
                              canAfford
                                ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-sm hover:shadow-md'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                            title={canAfford ? 'Purchase' : 'Insufficient Points'}
                          >
                            <ShoppingBag size={16} />
                            Buy
                          </button>
                        </div>

                        {!canAfford && (
                          <p className="text-xs text-red-500 text-center mt-2 font-medium">
                            Need {(reward.cost - currentBalance).toLocaleString()} more points
                          </p>
                        )}
                      </div>
                    </div>
                  )}
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