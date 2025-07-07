import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';

interface PasscodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PasscodeModal: React.FC<PasscodeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const correctPasscode = '1234'; // In a real app, this would be stored securely

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === correctPasscode) {
      setPasscode('');
      setError('');
      onSuccess();
    } else {
      setError('Incorrect passcode');
      setPasscode('');
    }
  };

  const handleClose = () => {
    setPasscode('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Fixed backdrop - covers entire viewport */}
      <div 
        className="modal-backdrop bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={handleClose}
      />
      
      {/* Modal - centered in viewport */}
      <div className="modal-backdrop flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full overflow-hidden transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Lock size={16} className="text-gray-900" />
              </div>
              <h3 className="font-semibold text-gray-900 text-base">Enter Passcode</h3>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          
          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6">
            <p className="text-sm text-gray-600 mb-4">
              This content is protected. Please enter your passcode to continue.
            </p>
            
            <div className="space-y-4">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    setError('');
                  }}
                  placeholder="Enter passcode"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-center text-lg tracking-widest"
                  autoFocus
                  maxLength={10}
                />
                {error && (
                  <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
                )}
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Unlock
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};