'use client';

import { HabitProvider } from '../../frontend/context/HabitContext';
import { PointsProvider } from '../../frontend/context/PointsContext';
import App from '../../frontend/App';

export default function AppPage() {
  return (
    <HabitProvider>
      <PointsProvider>
        <App />
      </PointsProvider>
    </HabitProvider>
  );
} 