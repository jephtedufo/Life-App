import React, { useState, useRef } from 'react';
import { X, Download, Upload, AlertTriangle, CheckCircle, FileText, AlertCircle } from 'lucide-react';
import { useHabits } from '../../context/HabitContext';
import { downloadCSV, parseCSV, detectConflicts, mergeData, CSVImportResult, DataConflict } from '../../utils/csvUtils';

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ImportStep = 'select' | 'preview' | 'conflicts' | 'complete';

export const ImportExportModal: React.FC<ImportExportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { habits, statuses, setHabits, setStatuses } = useHabits();
  const [importStep, setImportStep] = useState<ImportStep>('select');
  const [importResult, setImportResult] = useState<CSVImportResult | null>(null);
  const [conflicts, setConflicts] = useState<DataConflict[]>([]);
  const [conflictResolution, setConflictResolution] = useState<'keep_existing' | 'overwrite' | 'merge'>('merge');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    try {
      downloadCSV(habits, statuses);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export data. Please try again.');
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      alert('Please select a CSV file.');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const csvContent = e.target?.result as string;
        const result = parseCSV(csvContent);
        setImportResult(result);
        
        if (result.success && result.data) {
          const detectedConflicts = detectConflicts(habits, statuses, result.data);
          setConflicts(detectedConflicts);
          setImportStep(detectedConflicts.length > 0 ? 'conflicts' : 'preview');
        } else {
          setImportStep('preview');
        }
      } catch (error) {
        setImportResult({
          success: false,
          errors: [`Failed to read file: ${error}`],
          warnings: []
        });
        setImportStep('preview');
      } finally {
        setIsProcessing(false);
      }
    };

    reader.onerror = () => {
      setImportResult({
        success: false,
        errors: ['Failed to read file'],
        warnings: []
      });
      setImportStep('preview');
      setIsProcessing(false);
    };

    reader.readAsText(file);
  };

  const handleImport = () => {
    if (!importResult?.success || !importResult.data) return;

    setIsProcessing(true);
    
    try {
      const { habits: mergedHabits, statuses: mergedStatuses } = mergeData(
        habits,
        statuses,
        importResult.data,
        conflictResolution
      );

      setHabits(mergedHabits);
      setStatuses(mergedStatuses);
      setImportStep('complete');
    } catch (error) {
      console.error('Import failed:', error);
      alert('Failed to import data. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetModal = () => {
    setImportStep('select');
    setImportResult(null);
    setConflicts([]);
    setConflictResolution('merge');
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="modal-backdrop bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={handleClose}
      />
      
      <div className="modal-backdrop flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <h3 className="font-semibold text-gray-900 text-lg">Import & Export Data</h3>
            <button
              onClick={handleClose}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>
          
          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            {importStep === 'select' && (
              <div className="p-6 space-y-6">
                {/* Export Section */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Download size={18} />
                    Export Data
                  </h4>
                  <p className="text-sm text-gray-600">
                    Download all your habit tracking data as a CSV file. This includes all habits, their configurations, and tracking history.
                  </p>
                  <button
                    onClick={handleExport}
                    className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Export to CSV
                  </button>
                </div>

                <div className="border-t border-gray-200" />

                {/* Import Section */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Upload size={18} />
                    Import Data
                  </h4>
                  <p className="text-sm text-gray-600">
                    Import habit tracking data from a CSV file. The system will validate the data and handle any conflicts with existing habits.
                  </p>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <FileText size={32} className="mx-auto text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600 mb-3">
                      Select a CSV file to import your habit data
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isProcessing}
                      className="py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50"
                    >
                      {isProcessing ? 'Processing...' : 'Choose CSV File'}
                    </button>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-medium text-blue-900 mb-2">CSV Format Requirements:</h5>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Must contain habits section with: ID, name, description, repeat days, created date</li>
                      <li>• Optional statuses section with: habit ID, date, status</li>
                      <li>• Use proper CSV formatting with quoted fields containing commas</li>
                      <li>• Dates should be in YYYY-MM-DD format</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {importStep === 'preview' && importResult && (
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  {importResult.success ? (
                    <CheckCircle size={20} className="text-green-600" />
                  ) : (
                    <AlertCircle size={20} className="text-red-600" />
                  )}
                  <h4 className="font-semibold text-gray-900">
                    {importResult.success ? 'Import Preview' : 'Import Failed'}
                  </h4>
                </div>

                {/* Errors */}
                {importResult.errors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h5 className="font-medium text-red-900 mb-2">Errors:</h5>
                    <ul className="text-sm text-red-800 space-y-1">
                      {importResult.errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Warnings */}
                {importResult.warnings.length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h5 className="font-medium text-yellow-900 mb-2">Warnings:</h5>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      {importResult.warnings.map((warning, index) => (
                        <li key={index}>• {warning}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Success Preview */}
                {importResult.success && importResult.data && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h5 className="font-medium text-green-900 mb-3">Ready to Import:</h5>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-green-800">Habits:</span>
                        <span className="ml-2 text-green-700">{importResult.data.habits.length}</span>
                      </div>
                      <div>
                        <span className="font-medium text-green-800">Status Records:</span>
                        <span className="ml-2 text-green-700">{importResult.data.statuses.length}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={resetModal}
                    className="flex-1 py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                  >
                    Back
                  </button>
                  {importResult.success && (
                    <button
                      onClick={handleImport}
                      disabled={isProcessing}
                      className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors font-medium"
                    >
                      {isProcessing ? 'Importing...' : 'Import Data'}
                    </button>
                  )}
                </div>
              </div>
            )}

            {importStep === 'conflicts' && (
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={20} className="text-yellow-600" />
                  <h4 className="font-semibold text-gray-900">Data Conflicts Detected</h4>
                </div>

                <p className="text-sm text-gray-600">
                  The import data conflicts with existing data. Choose how to resolve these conflicts:
                </p>

                {/* Conflict Resolution Options */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="conflictResolution"
                      value="keep_existing"
                      checked={conflictResolution === 'keep_existing'}
                      onChange={(e) => setConflictResolution(e.target.value as any)}
                      className="text-gray-900"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Keep Existing Data</div>
                      <div className="text-sm text-gray-600">Preserve current data, skip conflicting imports</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="conflictResolution"
                      value="overwrite"
                      checked={conflictResolution === 'overwrite'}
                      onChange={(e) => setConflictResolution(e.target.value as any)}
                      className="text-gray-900"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Overwrite with Import</div>
                      <div className="text-sm text-gray-600">Replace existing data with imported data</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="conflictResolution"
                      value="merge"
                      checked={conflictResolution === 'merge'}
                      onChange={(e) => setConflictResolution(e.target.value as any)}
                      className="text-gray-900"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Smart Merge (Recommended)</div>
                      <div className="text-sm text-gray-600">Combine data intelligently, keeping the best of both</div>
                    </div>
                  </label>
                </div>

                {/* Conflict Details */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-48 overflow-y-auto">
                  <h5 className="font-medium text-gray-900 mb-3">Conflicts ({conflicts.length}):</h5>
                  <div className="space-y-2 text-sm">
                    {conflicts.map((conflict, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
                        <AlertTriangle size={14} className="text-yellow-600 flex-shrink-0" />
                        <span>
                          {conflict.type === 'habit' ? 'Habit' : 'Status'} conflict: {conflict.field}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setImportStep('preview')}
                    className="flex-1 py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleImport}
                    disabled={isProcessing}
                    className="flex-1 py-2 px-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:opacity-50 transition-colors font-medium"
                  >
                    {isProcessing ? 'Resolving...' : 'Resolve & Import'}
                  </button>
                </div>
              </div>
            )}

            {importStep === 'complete' && (
              <div className="p-6 space-y-6 text-center">
                <div className="flex flex-col items-center gap-4">
                  <CheckCircle size={48} className="text-green-600" />
                  <h4 className="font-semibold text-gray-900 text-xl">Import Complete!</h4>
                  <p className="text-gray-600">
                    Your habit data has been successfully imported and merged with existing data.
                  </p>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};