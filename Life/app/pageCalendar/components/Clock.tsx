import React, { useState, useEffect } from 'react';
import { useHabits } from '../../pageHabits/HabitContext';

export const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const { use24HourFormat } = useHabits();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    if (use24HourFormat) {
      return date.toLocaleTimeString('en-US', {
        timeZone: 'Africa/Nairobi',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });
    } else {
      return date.toLocaleTimeString('en-US', {
        timeZone: 'Africa/Nairobi',
        hour12: true,
        hour: 'numeric',
        minute: '2-digit'
      });
    }
  };

  const getAMPM = (date: Date) => {
    if (use24HourFormat) return '';
    return date.toLocaleTimeString('en-US', {
      timeZone: 'Africa/Nairobi',
      hour12: true
    }).split(' ')[1];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      timeZone: 'Africa/Nairobi',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const timeString = use24HourFormat ? formatTime(time) : formatTime(time).split(' ')[0];
  const ampm = getAMPM(time);

  return (
    <div className="text-right">
      <div className="flex items-start justify-end gap-3">
        {!use24HourFormat && (
          <div className="text-lg font-medium text-gray-600 mt-1">
            {ampm}
          </div>
        )}
        <div className="text-6xl font-mono font-bold text-gray-800 tracking-wider">
          {timeString}
        </div>
      </div>
      <div className="text-2xl text-gray-600 mt-2 text-right">
        {formatDate(time)}
      </div>
    </div>
  );
};