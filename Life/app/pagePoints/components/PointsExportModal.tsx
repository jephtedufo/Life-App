import React, { useState } from 'react';
import { X, Download, FileText, Database, Calendar, Trophy, Target, Link2 } from 'lucide-react';
import { usePoints } from '../PointsContext';
import { downloadPointsCSV, downloadPointsJSON } from '../../utils/pointsExportUtils';

interface PointsExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PointsExportModal: React.FC<PointsExportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { categories, pointLogs, rewards, redemptions, goals, habitConnections, getTotalPoints, getCurrentBalance } = usePoints();
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv');

  const handleExport = () => {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `points-system-${timestamp}`;

    if (exportFormat === 'csv') {
      downloadPointsCSV(categories, pointLogs, rewards, redemptions, goals, habitConnections, `${filename}.csv`);
    } else {
      downloadPointsJSON(categories, pointLogs, rewards, redemptions, goals, habitConnections, `${filename}.json`);
    }

    onClose();
  };

  const totalPoints = getTotalPoints();
  const currentBalance = getCurrentBalance();
  const totalSpent = totalPoints - currentBalance;

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="modal-backdrop bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      <div className="modal-backdrop flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Download size={18} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">Export Points Data</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          
          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6 space-y-6">
            {/* Export Summary */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
                <Database size={18} />
                Export Summary
              </h4>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold text-blue-700 mb-1">{categories.length}</div>
                  <div className="text-xs font-medium text-blue-600 uppercase tracking-wide flex items-center justify-center gap-1">
                    <Trophy size={12} />
                    Tasks
                  </div>
                </div>
                
                <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold text-green-700 mb-1">{pointLogs.length}</div>
                  <div className="text-xs font-medium text-green-600 uppercase tracking-wide flex items-center justify-center gap-1">
                    <Calendar size={12} />
                    Logs
                  </div>
                </div>
                
                <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold text-purple-700 mb-1">{rewards.length}</div>
                  <div className="text-xs font-medium text-purple-600 uppercase tracking-wide flex items-center justify-center gap-1">
                    <Trophy size={12} />
                    Rewards
                  </div>
                </div>
                
                <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold text-red-700 mb-1">{redemptions.length}</div>
                  <div className="text-xs font-medium text-red-600 uppercase tracking-wide flex items-center justify-center gap-1">
                    <Download size={12} />
                    Redeemed
                  </div>
                </div>
                
                <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold text-amber-700 mb-1">{goals.length}</div>
                  <div className="text-xs font-medium text-amber-600 uppercase tracking-wide flex items-center justify-center gap-1">
                    <Target size={12} />
                    Goals
                  </div>
                </div>
                
                <div className="text-center p-3 bg-white/60 rounded-lg backdrop-blur-sm">
                  <div className="text-2xl font-bold text-gray-700 mb-1">{habitConnections.length}</div>
                  <div className="text-xs font-medium text-gray-600 uppercase tracking-wide flex items-center justify-center gap-1">
                    <Link2 size={12} />
                    Links
                  </div>
                </div>
              </div>
            </div>

            {/* Points Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-2xl font-bold text-green-600 mb-1">{totalPoints.toLocaleString()}</div>
                <div className="text-sm text-green-700 uppercase tracking-wide">Total Earned</div>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600 mb-1">{currentBalance.toLocaleString()}</div>
                <div className="text-sm text-blue-700 uppercase tracking-wide">Current Balance</div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-2xl font-bold text-purple-600 mb-1">{totalSpent.toLocaleString()}</div>
                <div className="text-sm text-purple-700 uppercase tracking-wide">Total Spent</div>
              </div>
            </div>

            {/* Export Format Selection */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Export Format</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  exportFormat === 'csv' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}>
                  <input
                    type="radio"
                    name="exportFormat"
                    value="csv"
                    checked={exportFormat === 'csv'}
                    onChange={(e) => setExportFormat(e.target.value as 'csv')}
                    className="text-blue-600"
                  />
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      exportFormat === 'csv' ? 'bg-blue-500' : 'bg-gray-400'
                    }`}>
                      <FileText size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">CSV Format</div>
                      <div className="text-sm text-gray-600">Spreadsheet compatible, human readable</div>
                    </div>
                  </div>
                </label>

                <label className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  exportFormat === 'json' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}>
                  <input
                    type="radio"
                    name="exportFormat"
                    value="json"
                    checked={exportFormat === 'json'}
                    onChange={(e) => setExportFormat(e.target.value as 'json')}
                    className="text-blue-600"
                  />
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      exportFormat === 'json' ? 'bg-blue-500' : 'bg-gray-400'
                    }`}>
                      <Database size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">JSON Format</div>
                      <div className="text-sm text-gray-600">Complete data structure, developer friendly</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Export Details */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-3">What's Included:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Task categories and configurations
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Complete point earning history
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Rewards and shop items
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Redemption transaction history
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  Goals and progress tracking
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  Habit-task connections
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50/30 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <Download size={16} />
              Export {exportFormat.toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};