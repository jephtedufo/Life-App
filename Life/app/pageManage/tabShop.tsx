import React, { useState } from 'react';
import { usePoints } from '../components/contextPoints';
import { Edit2, Trash2, Eye, EyeOff, ChevronUp, ChevronDown, GripVertical } from 'lucide-react';
import { AddRewardModal } from '../pageShop/AddRewardModal';
import { ConfirmDialog } from '../components/ConfirmDialog';

export const ShopItemsManager: React.FC = () => {
  const { rewards, deleteReward, updateReward, setRewards } = usePoints();
  const [editingReward, setEditingReward] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  // Sort rewards: items with images first, then items without images
  const sortedRewards = [...rewards].sort((a, b) => {
    const aHasImage = a.showImage !== false && a.imageUrl;
    const bHasImage = b.showImage !== false && b.imageUrl;
    if (aHasImage && !bHasImage) return -1;
    if (!aHasImage && bHasImage) return 1;
    return (a.priority || 0) - (b.priority || 0);
  });

  // Reordering logic
  const moveRewardUp = (rewardId: string) => {
    const rewardIndex = rewards.findIndex(r => r.id === rewardId);
    if (rewardIndex > 0) {
      const newRewards = [...rewards];
      [newRewards[rewardIndex], newRewards[rewardIndex - 1]] = [newRewards[rewardIndex - 1], newRewards[rewardIndex]];
      const updatedRewards = newRewards.map((reward, idx) => ({ ...reward, priority: idx }));
      setRewards(updatedRewards);
    }
  };
  const moveRewardDown = (rewardId: string) => {
    const rewardIndex = rewards.findIndex(r => r.id === rewardId);
    if (rewardIndex < rewards.length - 1) {
      const newRewards = [...rewards];
      [newRewards[rewardIndex], newRewards[rewardIndex + 1]] = [newRewards[rewardIndex + 1], newRewards[rewardIndex]];
      const updatedRewards = newRewards.map((reward, idx) => ({ ...reward, priority: idx }));
      setRewards(updatedRewards);
    }
  };
  const toggleRewardImageVisibility = (reward: any) => {
    updateReward({ ...reward, showImage: !reward.showImage });
  };

  return (
    <div className="space-y-6">
      {/* Removed Shop Items Title */}
      {sortedRewards.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <EyeOff size={32} className="mx-auto" />
          </div>
          <p className="text-gray-600">No shop items created yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRewards.map((reward, idx) => (
            <div key={reward.id} className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-all border-gray-100">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg leading-tight mb-2">{reward.title}</h4>
                    {reward.description && (
                      <p className="text-sm text-gray-600 leading-relaxed">{reward.description}</p>
                    )}
                  </div>
                  <div className="flex gap-1 ml-3">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit reward"
                      onClick={() => { setEditingReward(reward); setShowEditModal(true); }}
                    >
                      <Edit2 size={14} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(reward.id)}
                      className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                      title="Delete reward"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2 justify-between">
                  <span className="text-lg font-bold text-gray-900">{reward.cost.toLocaleString()} Points</span>
                  <div className="flex items-center gap-2 ml-auto">
                    <button onClick={() => moveRewardUp(reward.id)} className="p-1" title="Move Up"><ChevronUp size={16} /></button>
                    <button onClick={() => moveRewardDown(reward.id)} className="p-1" title="Move Down"><ChevronDown size={16} /></button>
                    <button onClick={() => toggleRewardImageVisibility(reward)} className="p-1" title="Toggle Image">
                      {reward.showImage !== false ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <AddRewardModal
        isOpen={showEditModal}
        onClose={() => { setShowEditModal(false); setEditingReward(null); }}
        editingReward={editingReward}
      />
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) deleteReward(deleteTarget);
          setDeleteTarget(null);
        }}
        title="Delete Shop Item"
        message="Are you sure you want to delete this shop item? This action cannot be undone."
      />
    </div>
  );
}; 