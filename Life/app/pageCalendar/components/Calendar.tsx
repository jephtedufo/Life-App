import React, { useState } from 'react';
import { DayCell } from './DayCell';
import { getDaysInMonth, getMonthName } from '../../utils/dateUtils';
import { useHabits } from '../../pageHabits/HabitContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  allowPastEditing?: boolean;
}

export const Calendar: React.FC<CalendarProps> = ({ allowPastEditing = false }) => {
  const { habits, statuses } = useHabits();
  const [currentDate, setCurrentDate] = useState(new Date());
  const days = getDaysInMonth(currentDate);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'prev') {
        newDate.setMonth(prevDate.getMonth() - 1);
      } else {
        newDate.setMonth(prevDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{getMonthName(currentDate)}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Next month"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-medium text-gray-500">
            {day}
          </div>
        ))}
        {Array.from({ length: days[0].getDay() }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map(date => (
          <DayCell
            key={date.toISOString()}
            date={date}
            habits={habits}
            statuses={statuses}
            allowPastEditing={allowPastEditing}
          />
        ))}
      </div>
    </div>
  );
};