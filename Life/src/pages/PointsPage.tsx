import React from 'react';
import { PointsSystem } from '../components/points/PointsSystem';
import { AddCategoryForm } from '../components/forms/AddCategoryForm';

interface PointsPageProps {
  onNavigate: (page: 'calendar' | 'habits' | 'points') => void;
}

export const PointsPage: React.FC<PointsPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-16 pt-8">
          <div className="flex-1 pr-8">
            <h1 className="text-6xl font-bold text-gray-900 mb-6">Lifestyle Credits & Rewards</h1>
            <p className="text-lg text-gray-600 leading-relaxed italic max-w-4xl">
              Earn points for completing tasks and redeem them for meaningful rewards.
            </p>
          </div>
        </div>

        <div className="space-y-12 mb-8">
          <AddCategoryForm onNavigate={onNavigate} />
          <PointsSystem hideTitle={true} />
        </div>
      </div>
    </div>
  );
};