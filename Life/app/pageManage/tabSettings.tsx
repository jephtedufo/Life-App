import React, { useState } from 'react';
import { useHabits } from '../components/contextHabits';
import { usePoints } from '../components/contextPoints';
import { exportAllAppData, importAllAppData } from '../utils/csvUtils';

export default function TabSettings() {
  const { use24HourFormat, setUse24HourFormat, compactMode, setCompactMode, allowPastEditing, setAllowPastEditing, resetAllData, habits, statuses, setHabits, setStatuses } = useHabits();
  const {
    categories,
    pointLogs,
    rewards,
    redemptions,
    habitConnections,
    setCategories,
    setPointLogs,
    setRewards,
    setRedemptions,
    setHabitConnections,
    resetAllPointsData,
  } = usePoints();
  const [importing, setImporting] = useState(false);
  const [sound, setSound] = useState(true); // Dummy state for sound toggle
  const [darkMode, setDarkMode] = useState(false); // Dummy state for dark mode toggle

  const handleResetAllData = () => {
    if (window.confirm('Are you sure you want to reset ALL data including habits, points, and rewards? This action cannot be undone.')) {
      resetAllData();
      resetAllPointsData();
      setRewards([]);
    }
  };

  const handleResetPointsOnly = () => {
    if (window.confirm('Are you sure you want to reset only points data? This will remove all categories, logs, and rewards.')) {
      resetAllPointsData();
      setRewards([]);
    }
  };

  const handleResetHabitsOnly = () => {
    if (window.confirm('Are you sure you want to reset all habits? This will remove all habits and their statuses.')) {
      setHabits([]);
      setStatuses([]);
    }
  };

  const handleResetRewardsOnly = () => {
    if (window.confirm('Are you sure you want to reset all rewards? This will remove all rewards.')) {
      setRewards([]);
    }
  };

  // Export all app data as JSON
  const handleExportData = () => {
    exportAllAppData({
      habits,
      statuses,
      categories,
      pointLogs,
      rewards,
      redemptions,
      habitConnections,
    });
  };

  // Import all app data from JSON
  const handleImportData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    const result = await importAllAppData(file);
    if (result.success && result.data) {
      setHabits(result.data.habits);
      setStatuses(result.data.statuses);
      setCategories(result.data.categories);
      setPointLogs(result.data.pointLogs);
      setRewards(result.data.rewards);
      setRedemptions(result.data.redemptions);
      setHabitConnections(result.data.habitConnections);
      alert('Data imported successfully!');
    } else {
      alert('Import failed: ' + (result.errors?.join('\n') || 'Unknown error'));
    }
    setImporting(false);
    e.target.value = '';
  };

  return (
    <div className="md:grid-cols-2 lg:gap-8 grid grid-cols-1 gap-6">
      {/* Preferences Card */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex-col">
          <p className="text-3xl font-medium text-gray-900 mb-6 dark:text-gray-100">Preferences</p>
          <div className="space-y-4">
            {/* 24-Hour Format */}
            <div className="items-center justify-between flex">
              <div>
                <label className="text-lg font-medium text-gray-900 dark:text-gray-100">24-Hour Format</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Use military time format</p>
              </div>
              <div className="w-10 mr-2 relative inline-block align-middle select-none">
                <input
                  type="checkbox"
                  checked={use24HourFormat}
                  onChange={() => setUse24HourFormat(!use24HourFormat)}
                  className="toggle-checkbox absolute block border-4 appearance-none cursor-pointer w-6 h-6 rounded-full bg-white"
                  id="toggle-24hr"
                />
                <label htmlFor="toggle-24hr" className="h-6 rounded-full bg-gray-600 toggle-label block overflow-hidden cursor-pointer"></label>
              </div>
            </div>
            {/* Edit Past Days */}
            <div className="items-center justify-between flex">
            <div>
                <label className="text-lg font-medium text-gray-900 dark:text-gray-100">Edit Past Days</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Enable editing of previous day entries in Habits</p>
              </div>
              <div className="w-10 mr-2 relative inline-block align-middle select-none">
                <input
                  type="checkbox"
                  checked={allowPastEditing}
                  onChange={() => setAllowPastEditing(!allowPastEditing)}
                  className="toggle-checkbox absolute block border-4 appearance-none cursor-pointer w-6 h-6 rounded-full bg-white"
                  id="toggle-edit-past"
                />
                <label htmlFor="toggle-edit-past" className="h-6 rounded-full bg-gray-600 toggle-label block overflow-hidden cursor-pointer"></label>
              </div>
            </div>
            {/* Compact Mode */}
            <div className="items-center justify-between flex">
              <div>
                <label className="text-lg font-medium text-gray-900 dark:text-gray-100">Compact Mode</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Use a more compact layout to fit more content</p>
          </div>
              <div className="w-10 mr-2 relative inline-block align-middle select-none">
                <input
                  type="checkbox"
                  checked={compactMode}
                  onChange={() => setCompactMode(!compactMode)}
                  className="toggle-checkbox absolute block border-4 appearance-none cursor-pointer w-6 h-6 rounded-full bg-white"
                  id="toggle-compact"
                />
                <label htmlFor="toggle-compact" className="h-6 rounded-full bg-gray-300 toggle-label block overflow-hidden cursor-pointer"></label>
        </div>
            </div>
            {/* Sound */}
            <div className="items-center justify-between flex">
            <div>
                <label className="text-lg font-medium text-gray-900 dark:text-gray-100">Sound</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Play sounds for notifications</p>
              </div>
              <div className="w-10 mr-2 relative inline-block align-middle select-none">
                <input
                  type="checkbox"
                  checked={sound}
                  onChange={() => setSound(!sound)}
                  className="toggle-checkbox absolute block border-4 appearance-none cursor-pointer w-6 h-6 rounded-full bg-white"
                  id="toggle-sound"
                />
                <label htmlFor="toggle-sound" className="h-6 rounded-full bg-gray-300 toggle-label block overflow-hidden cursor-pointer"></label>
              </div>
            </div>
            {/* Dark Mode */}
            <div className="items-center justify-between flex">
              <div>
                <label className="text-lg font-medium text-gray-900 dark:text-gray-100">Dark Mode</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Use dark theme throughout the app</p>
          </div>
              <div className="w-10 mr-2 relative inline-block align-middle select-none">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  className="toggle-checkbox absolute block border-4 appearance-none cursor-pointer w-6 h-6 rounded-full bg-white"
                  id="toggle-dark"
                />
                <label htmlFor="toggle-dark" className="h-6 rounded-full bg-gray-300 toggle-label block overflow-hidden cursor-pointer"></label>
        </div>
            </div>
          </div>
        </div>
          </div>
      {/* Account Data Card */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 flex-col">
          <p className="text-3xl font-medium text-gray-900 mb-6 dark:text-gray-100">Account Data</p>
          <div className="space-y-4">
            {/* Import Data */}
            <div className="items-center justify-between flex">
              <div>
                <label className="text-lg font-medium text-gray-900 dark:text-gray-100">Import Data</label>
          </div>
              <label className="hover:bg-gray-700 dark:hover:bg-gray-400 transition duration-200 bg-gray-600 dark:bg-gray-500 text-white font-normal py-2 px-4 rounded-md cursor-pointer">
                Import
          <input
            type="file"
            accept="application/json,.json"
            onChange={handleImportData}
            className="hidden"
            disabled={importing}
          />
        </label>
            </div>
            {/* Export Data */}
            <div className="items-center justify-between flex">
              <div>
                <label className="text-lg font-medium text-gray-900 dark:text-gray-100">Export Data</label>
              </div>
              <button
                type="button"
                onClick={handleExportData}
                className="hover:bg-gray-700 dark:hover:bg-gray-400 transition duration-200 bg-gray-600 dark:bg-gray-500 text-white font-normal py-2 px-4 rounded-md"
              >
                Export
              </button>
            </div>
        {/* Reset Points Data */}
            <div className="items-center justify-between flex">
              <div>
                <label className="text-lg font-medium text-gray-900 dark:text-gray-100">Reset Points Data</label>
              </div>
        <button
                type="button"
          onClick={handleResetPointsOnly}
                className="hover:bg-gray-700 dark:hover:bg-gray-400 transition duration-200 bg-gray-600 dark:bg-gray-500 text-white font-normal py-2 px-4 rounded-md"
              >
                Reset
              </button>
            </div>
            {/* Reset Habits Data */}
            <div className="items-center justify-between flex">
              <div>
                <label className="text-lg font-medium text-gray-900 dark:text-gray-100">Reset Habits Data</label>
              </div>
              <button
                type="button"
                onClick={handleResetHabitsOnly}
                className="hover:bg-gray-700 dark:hover:bg-gray-400 transition duration-200 bg-gray-600 dark:bg-gray-500 text-white font-normal py-2 px-4 rounded-md"
              >
                Reset
              </button>
            </div>
            {/* Reset Rewards Data */}
            <div className="items-center justify-between flex">
              <div>
                <label className="text-lg font-medium text-gray-900 dark:text-gray-100">Reset Rewards Data</label>
          </div>
              <button
                type="button"
                onClick={handleResetRewardsOnly}
                className="hover:bg-gray-700 dark:hover:bg-gray-400 transition duration-200 bg-gray-600 dark:bg-gray-500 text-white font-normal py-2 px-4 rounded-md"
              >
                Reset
        </button>
            </div>
        {/* Reset All Data */}
            <div className="items-center justify-between flex">
              <div>
                <label className="text-lg font-medium text-gray-900 dark:text-gray-100">Reset All Data</label>
              </div>
        <button
                type="button"
          onClick={handleResetAllData}
                className="hover:bg-gray-700 dark:hover:bg-gray-400 transition duration-200 bg-gray-600 dark:bg-gray-500 text-white font-normal py-2 px-4 rounded-md"
        >
                Reset
              </button>
            </div>
          </div>
        </div>
        <div className="mb-6"></div>
      </div>
    </div>
  );
}
