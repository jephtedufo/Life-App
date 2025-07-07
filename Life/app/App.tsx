import React, { useState } from 'react';
import { HabitProvider } from './context/HabitContext';
import { PointsProvider } from './context/PointsContext';
import { CalendarPage } from './pages/CalendarPage';
import { HabitsPage } from './pages/HabitsPage';
import { PointsPage } from './pages/PointsPage';

type Page = 'calendar' | 'habits' | 'points';

function App() {
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