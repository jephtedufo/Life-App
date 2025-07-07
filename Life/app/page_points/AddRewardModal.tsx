import React, { useState, useRef } from 'react';
import { X, Upload } from 'lucide-react';
import { usePoints } from '../../config/context/PointsContext';

interface AddRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingReward?: any;
}

export const AddRewardModal: React.FC<AddRewardModalProps> = ({
  isOpen,
  onClose,
  editingReward,
}) => {
  const { addReward, updateReward } = usePoints();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState(100);
  const [imageUrl, setImageUrl] = useState('');
  const [columnWidth, setColumnWidth] = useState(1);
  const [showImage, setShowImage] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-fill fields when editing
  React.useEffect(() => {
    if (editingReward) {
      setTitle(editingReward.title || '');
      setDescription(editingReward.description || '');
      setCost(editingReward.cost || 100);
      setImageUrl(editingReward.imageUrl || '');
      setColumnWidth(editingReward.columnWidth || 1);
      setShowImage(editingReward.showImage !== false);
    } else {
      // Reset for new reward
      setTitle('');
      setDescription('');
      setCost(100);
      setImageUrl('');
      setColumnWidth(1);
      setShowImage(true);
    }
  }, [editingReward, isOpen]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a stable data URL that persists
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (title.trim() && cost > 0) {
      if (editingReward) {
        updateReward({
          ...editingReward,
          title: title.trim(),
          description: description.trim(),
          cost,
          imageUrl,
          columnWidth,
          showImage,
        });
      } else {
        // Create new reward with all properties
        const newReward = {
          id: crypto.randomUUID(),
          title: title.trim(),
          description: description.trim(),
          cost,
          imageUrl,
          showImage,
          columnWidth,
          priority: 0,
          createdAt: new Date().toISOString(),
        };
        
        // Use the internal method to add with all properties
        addReward(newReward.title, newReward.description, newReward.cost, newReward.imageUrl);
        
        // Update with additional properties after creation
        setTimeout(() => {
          updateReward(newReward);
        }, 100);
      }
      handleCancel();
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setCost(100);
    setImageUrl('');
    setColumnWidth(1);
    setShowImage(true);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="modal-backdrop bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={handleCancel}
      />
      
      <div className="modal-backdrop flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[85vh] overflow-hidden transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <h3 className="font-semibold text-gray-900 text-lg">
              {editingReward ? 'Edit Shop Item' : 'Add Shop Item'}
            </h3>
            <button
              onClick={handleCancel}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          
          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(85vh-140px)] p-6 space-y-4">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>
              <div className="space-y-3">
                {imageUrl && (
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200 relative">
                    <img 
                      src={imageUrl} 
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Image preview failed to load');
                      }}
                    />
                    <button
                      onClick={() => setImageUrl('')}
                      className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      title="Remove image"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
                <div className="space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-gray-600"
                  >
                    <Upload size={16} />
                    Upload Image
                  </button>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Or paste image URL here..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Item Details */}
            <div className="grid grid-cols-1 gap-4">
              {/* Item Title */}
              <div>
                <label htmlFor="reward-title" className="block text-sm font-medium text-gray-700 mb-1">
                  Item Title
                </label>
                <input
                  id="reward-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Watch a movie, Buy a game, Take a break"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  autoFocus
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="reward-description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  id="reward-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add details about this reward..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                  rows={2}
                />
              </div>

              {/* Cost and Column Width */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="reward-cost" className="block text-sm font-medium text-gray-700 mb-1">
                    Point Cost
                  </label>
                  <input
                    id="reward-cost"
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Width
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(width => (
                      <button
                        key={width}
                        type="button"
                        onClick={() => setColumnWidth(width)}
                        className={`flex-1 py-2 text-xs rounded transition-colors ${
                          columnWidth === width
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {width}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Show Image Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Show Image
                </label>
                <button
                  type="button"
                  onClick={() => setShowImage(!showImage)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showImage ? 'bg-gray-900' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showImage ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h5 className="font-medium text-blue-900 mb-2">Preview:</h5>
              <div className="bg-white rounded-lg border border-blue-200 overflow-hidden">
                {imageUrl && showImage && (
                  <div className="aspect-video bg-gray-100">
                    <img 
                      src={imageUrl} 
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-3">
                  <div className="font-medium text-gray-900 mb-1">{title || 'Item Title'}</div>
                  {description && <div className="text-sm text-gray-600 mb-2">{description}</div>}
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-gray-600">{cost.toLocaleString()} Points</div>
                    <div className="text-xs text-gray-500">{columnWidth}x width</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50/30 border-t border-gray-100">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!title.trim() || cost <= 0}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {editingReward ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};