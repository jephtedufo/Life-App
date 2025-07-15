import React, { useState } from 'react';
import { Settings, Calendar, CheckSquare, Trophy, Plus, TrendingUp, ShoppingCart as ShoppingCartIcon, ShoppingBag } from 'lucide-react';
import { AppNavigation } from '../components/AppNavigation';
import { AddRewardModal } from './AddRewardModal';
import { RedeemRewardModal } from './RedeemRewardModal';
import { usePoints } from '../components/contextPoints';

function PointsStats() {
  const { getCurrentBalance, getTotalPoints } = usePoints();
  const currentBalance = getCurrentBalance();
  const totalEarned = getTotalPoints();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-gray-100 rounded-xl p-6 border border-gray-200">
        <div className="mb-3">
          <h3 className="font-semibold text-black">Points Earned</h3>
        </div>
        <div className="text-3xl font-bold text-black">{totalEarned.toLocaleString()}</div>
        <div className="text-sm text-gray-600 mt-1">Lifetime total</div>
      </div>
      <div className="bg-gray-100 rounded-xl p-6 border border-gray-200">
        <div className="mb-3">
          <h3 className="font-semibold text-black">Available Balance</h3>
        </div>
        <div className="text-3xl font-bold text-black">{currentBalance.toLocaleString()}</div>
        <div className="text-sm text-gray-600 mt-1">Ready to spend</div>
      </div>
      <div className="bg-gray-100 rounded-xl p-6 border border-gray-200">
        <div className="mb-3">
          <h3 className="font-semibold text-black">Points Spent</h3>
        </div>
        <div className="text-3xl font-bold text-black">{(totalEarned - currentBalance).toLocaleString()}</div>
        <div className="text-sm text-gray-600 mt-1">On rewards</div>
      </div>
    </div>
  );
}

interface ShopPageProps {
  onNavigate: (page: 'calendar' | 'tasks' | 'shop' | 'manage') => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onNavigate }) => {
  const [showAddReward, setShowAddReward] = useState(false);
  const [redeemingReward, setRedeemingReward] = useState<string | null>(null);
  const { rewards, getCurrentBalance } = usePoints();
  const currentBalance = getCurrentBalance();

  // Handler for AppNavigation button (optional: open AddRewardModal)
  const handleAddRewardClick = () => {
    setShowAddReward(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-16 pt-8">
          <div className="flex-1 pr-8">
            <h1 className="text-6xl font-bold text-gray-900 mb-6">Reward Shop</h1>
            <p className="text-lg text-gray-600 leading-relaxed italic max-w-4xl">
              Redeem your hard-earned points for exciting rewards and track your progress.
            </p>
          </div>
        </div>
        {/* Navigation Bar (replaces old nav) */}
        <div className="space-y-6 mb-6">
          <AppNavigation onNavigate={onNavigate} onAddHabitClick={handleAddRewardClick} showSettingsButton addButtonLabel="Add new reward..." className="mb-8" />
          <AddRewardModal isOpen={showAddReward} onClose={() => setShowAddReward(false)} />
          {/* Points Stat Cards */}
          <PointsStats />
          {/* Inlined ShopTab logic below */}
          <div className="space-y-6">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 auto-rows-[22rem] items-stretch">
                {rewards.map(reward => {
                  const canAfford = currentBalance >= reward.cost;
                  const hasImage = reward.showImage !== false && reward.imageUrl;
                  const colSpan = reward.columnWidth === 2 ? 'md:col-span-2' : reward.columnWidth === 3 ? 'md:col-span-3' : reward.columnWidth === 4 ? 'md:col-span-4' : 'md:col-span-1';
                  // Set a fixed height for all cards on md+ screens
                  const fixedHeightClass = 'md:h-64';
                  let aspectClass = 'aspect-square';
                  if (reward.columnWidth === 2) aspectClass = 'aspect-[2/1]';
                  else if (reward.columnWidth === 3 || reward.columnWidth === 4) aspectClass = 'aspect-[4/1]';
                  return (
                    <div 
                      key={reward.id} 
                      className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 group flex flex-col h-full ${colSpan} ${reward.columnWidth === 2 ? 'h-full min-h-[22rem]' : ''}`}
                      style={reward.columnWidth === 2 ? { height: '100%' } : {}}
                    >
                      {/* For 3x/4x: image as background, glassmorphism info overlay */}
                      {reward.columnWidth === 2 || reward.columnWidth === 3 || reward.columnWidth === 4 ? (
                      <div
                        className={`relative w-full h-full flex flex-col justify-end ${fixedHeightClass} ${reward.columnWidth === 2 ? 'h-full min-h-[22rem]' : ''} ${reward.columnWidth === 4 ? 'border-4x-custom-height' : ''}`}
                        // @ts-expect-error: customHeight is for demonstration; add to Reward type for production
                        style={reward.columnWidth === 4 ? { minHeight: reward.customHeight ?? '28rem', height: reward.customHeight ?? '28rem' } : reward.columnWidth === 2 ? { minHeight: '22rem', height: '100%' } : { minHeight: '22rem' }}
                      >
                        {hasImage ? (
                            <img 
                              src={reward.imageUrl} 
                              alt={reward.title}
                            className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-300 group-hover:scale-105"
                            onError={() => {}}
                            />
                        ) : (
                          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 z-0">
                            <ShoppingBag size={64} className="text-gray-400" />
                          </div>
                        )}
                        <div className="relative z-10 w-full flex flex-col justify-end h-full">
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="backdrop-blur-md bg-black/40 rounded-xl p-4 shadow-lg">
                              <h4 className="font-bold text-white text-2xl mb-2 line-clamp-2">{reward.title}</h4>
                              {reward.description && (
                                <p className="text-base text-white mb-3 line-clamp-2">{reward.description}</p>
                              )}
                              <div className="flex items-center mt-4">
                                <button
                                  onClick={() => setRedeemingReward(reward.id)}
                                  disabled={!canAfford}
                                  className={`p-3 rounded-lg transition-all flex items-center gap-1.5 ${canAfford ? 'bg-white text-gray-900 hover:bg-gray-100 shadow-sm hover:shadow-md' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                  title={canAfford ? 'Purchase' : 'Insufficient Points'}
                                >
                                  <ShoppingBag size={20} />
                                  <span className="text-xs font-medium">Buy</span>
                                </button>
                                <div style={{ marginLeft: '1em' }} className="flex flex-col items-start leading-none">
                                  <span className="text-2xl font-bold text-white">{reward.cost.toLocaleString()}</span>
                                  <span className="text-base font-medium text-white" style={{ marginTop: '-0.3em' }}>Points</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                        <div className={`${aspectClass} ${fixedHeightClass} bg-gray-100 overflow-hidden relative h-full min-h-[22rem]`} style={reward.columnWidth === 2 ? { minHeight: '22rem', height: '100%' } : {}}>
                          {hasImage ? (
                            <img
                              src={reward.imageUrl}
                              alt={reward.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={() => {}}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                              <ShoppingBag size={48} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                      )}
                      {/* Info for 1x cards */}
                      {reward.columnWidth === 1 && (
                        <div className="p-4 flex flex-col flex-1">
                          <h4 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">{reward.title}</h4>
                          {reward.description && (
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{reward.description}</p>
                          )}
                          <div className="flex-1" />
                          <div className="flex items-center justify-between mt-10 pt-4 border-t border-gray-100">
                            <span className={`text-lg font-bold ${canAfford ? 'text-gray-900' : 'text-gray-400'}`}>{reward.cost.toLocaleString()}<span className="ml-2 text-base font-medium">Points</span></span>
                            <button
                              onClick={() => setRedeemingReward(reward.id)}
                              disabled={!canAfford}
                              className={`p-2.5 rounded-lg transition-all flex items-center gap-1.5 ${canAfford ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-sm hover:shadow-md' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                              title={canAfford ? 'Purchase' : 'Insufficient Points'}
                            >
                              <ShoppingBag size={16} />
                              <span className="text-xs font-medium">Buy</span>
                            </button>
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
          {redeemingReward && (
            <RedeemRewardModal
              isOpen={true}
              onClose={() => setRedeemingReward(null)}
              rewardId={redeemingReward}
            />
          )}
        </div>
      </div>
    </div>
  );
}; 