import React from 'react';
import { X, Gift, AlertTriangle } from 'lucide-react';
import { usePoints } from '../components/contextPoints';

interface RedeemRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  rewardId: string;
}

export const RedeemRewardModal: React.FC<RedeemRewardModalProps> = ({
  isOpen,
  onClose,
  rewardId,
}) => {
  const { rewards, redeemReward, getCurrentBalance } = usePoints();
  
  const reward = rewards.find(r => r.id === rewardId);
  const currentBalance = getCurrentBalance();
  const canAfford = reward ? currentBalance >= reward.cost : false;

  const handleRedeem = () => {
    if (reward && canAfford) {
      const success = redeemReward(rewardId);
      if (success) {
        onClose();
      }
    }
  };

  if (!isOpen || !reward) return null;

  return (
    <>
      <div 
        className="modal-backdrop bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className="modal-backdrop flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Gift size={16} className="text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-base">Redeem Reward</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Reward Details */}
            <div className="text-center">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{reward.title}</h4>
              {reward.description && (
                <p className="text-gray-600 mb-4">{reward.description}</p>
              )}
              <div className="text-3xl font-bold text-green-600 mb-2">
                {reward.cost.toLocaleString()} Points
              </div>
            </div>

            {/* Balance Check */}
            <div className={`p-4 rounded-lg border-2 ${
              canAfford 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-3">
                {canAfford ? (
                  <div className="p-2 bg-green-500 rounded-lg">
                    <Gift size={16} className="text-white" />
                  </div>
                ) : (
                  <div className="p-2 bg-red-500 rounded-lg">
                    <AlertTriangle size={16} className="text-white" />
                  </div>
                )}
                <div>
                  <div className={`font-medium ${canAfford ? 'text-green-900' : 'text-red-900'}`}>
                    {canAfford ? 'Ready to redeem!' : 'Insufficient points'}
                  </div>
                  <div className={`text-sm ${canAfford ? 'text-green-700' : 'text-red-700'}`}>
                    Current balance: {currentBalance.toLocaleString()} points
                  </div>
                  {!canAfford && (
                    <div className="text-sm text-red-600">
                      Need {(reward.cost - currentBalance).toLocaleString()} more points
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Confirmation */}
            {canAfford && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={16} className="text-yellow-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-yellow-900">Confirm Redemption</div>
                    <div className="text-sm text-yellow-800">
                      This will deduct {reward.cost.toLocaleString()} points from your balance. This action cannot be undone.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50/30 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            {canAfford && (
              <button
                onClick={handleRedeem}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Redeem for {reward.cost.toLocaleString()} Points
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};