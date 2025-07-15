import React, { useState } from 'react';
import { HabitProvider } from './components/contextHabits';
import { PointsProvider } from './components/contextPoints';
import { CalendarPage } from './pageCalendar/CalendarPage';
import { ShopPage } from './pageShop/ShopPage';
import { ManagePage } from './pageManage/ManagePage';
import { TaskPage } from './pageTasks/TaskPage';

type Page = 'calendar' | 'tasks' | 'shop' | 'manage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('calendar');

  const renderPage = () => {
      switch (currentPage) {
        case 'calendar':
          return <CalendarPage onNavigate={setCurrentPage} />;
        case 'tasks':
        return <TaskPage onNavigate={setCurrentPage} />;
        case 'shop':
          return <ShopPage onNavigate={setCurrentPage} />;
        case 'manage':
          return <ManagePage onNavigate={setCurrentPage} />;
        default:
          return <CalendarPage onNavigate={setCurrentPage} />;
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