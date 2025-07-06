'use client';

import { HabitProvider } from '../../frontend/context/HabitContext';
import { PointsProvider } from '../../frontend/context/PointsContext';
import { AuthGuard } from '../../frontend/components/AuthGuard';
import App from '../../frontend/App';

export default function AppPage() {
  return (
    <AuthGuard>
      <HabitProvider>
        <PointsProvider>
          <App />
        </PointsProvider>
      </HabitProvider>
    </AuthGuard>
  );
} 