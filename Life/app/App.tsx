import React, { useState } from 'react';
import { HabitProvider } from './pageHabits/HabitContext';
import { PointsProvider } from './pagePoints/PointsContext';
import { CalendarPage } from './pageCalendar/CalendarPage';
import { HabitsPage } from './pageHabits/HabitsPage';
import { PointsPage } from './pagePoints/PointsPage';

type Page = 'calendar' | 'habits' | 'points';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('calendar');

  const renderPage = () => {
    try {
      switch (currentPage) {
        case 'calendar':
          return <CalendarPage onNavigate={setCurrentPage} />;
        case 'habits':
          return <HabitsPage onNavigate={setCurrentPage} />;
        case 'points':
          return <PointsPage onNavigate={setCurrentPage} />;
        default:
          return <CalendarPage onNavigate={setCurrentPage} />;
      }
    } catch (error) {
      console.error('Error rendering page:', error);
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Error Loading Page</h1>
          <p>There was an error loading the {currentPage} page.</p>
          <pre>{error instanceof Error ? error.message : String(error)}</pre>
        </div>
      );
    }
  };

  return (
    <HabitProvider>
      <PointsProvider>
        {renderPage()}
      </PointsProvider>
    </HabitProvider>
  );
}

export default App;