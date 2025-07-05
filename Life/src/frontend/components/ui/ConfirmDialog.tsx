import React from 'react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Fixed backdrop - covers entire viewport */}
      <div 
        className="modal-backdrop bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal - centered in viewport */}
      <div className="modal-backdrop flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                No, Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};