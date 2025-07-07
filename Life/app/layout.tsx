import type { Metadata } from 'next';
import { HabitProvider } from './context/HabitContext';
import { PointsProvider } from './context/PointsContext';
import './index.css';

export const metadata: Metadata = {
  title: 'Jephte Habit Track',
  description: 'A beautiful habit tracking application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <HabitProvider>
          <PointsProvider>
            {children}
          </PointsProvider>
        </HabitProvider>
      </body>
    </html>
  );
} 