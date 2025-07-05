'use client';

import { AuthProvider } from '../../frontend/context/AuthContext';
import { AuthGuard } from '../../frontend/components/AuthGuard';
import { HabitProvider } from '../../frontend/context/HabitContext';
import { PointsProvider } from '../../frontend/context/PointsContext';
import App from '../../frontend/App';

export default function AppPage() {
  return (
    <AuthProvider>
      <AuthGuard>
        <HabitProvider>
          <PointsProvider>
            <App />
          </PointsProvider>
        </HabitProvider>
      </AuthGuard>
    </AuthProvider>
  );
} 