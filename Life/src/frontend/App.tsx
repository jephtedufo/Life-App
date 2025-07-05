import React, { useState } from 'react';
import { CalendarPage } from './pages/CalendarPage';
import { HabitsPage } from './pages/HabitsPage';
import { PointsPage } from './pages/PointsPage';

type Page = 'calendar' | 'habits' | 'points';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('calendar');

  const renderPage = () => {
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
  };

  return renderPage();
}

export default App;