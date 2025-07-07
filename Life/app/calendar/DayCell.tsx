import React from 'react';
import { Check, X } from 'lucide-react';
import { Habit, HabitStatus } from '../.config/types';
import { useHabits } from '../.config/context/HabitContext';
import { usePoints } from '../.config/context/PointsContext';
import { isToday, isPastDate } from '../.config/utils/dateUtils';

interface DayCellProps {
  date: Date;
  habits: Habit[];
  statuses: HabitStatus[];
  allowPastEditing: boolean;
}

export const DayCell: React.FC<DayCellProps> = ({ date, habits, statuses, allowPastEditing }) => {
  const { updateStatus, compactMode } = useHabits();
  const { addPointsForHabit, removePointsForHabit } = usePoints();
  
  const isDateToday = isToday(date);
  const isPast = isPastDate(date);
  const dateStr = date.toISOString().split('T')[0];

  const getHabitStatus = (habitId: string) => {
    return statuses.find(s => s.habitId === habitId && s.date === dateStr)?.status || 'pending';
  };

  const isHabitActive = (habit: Habit) => {
    const habitDate = new Date(habit.createdAt);
    habitDate.setHours(0, 0, 0, 0);
    const cellDate = new Date(date);
    cellDate.setHours(0, 0, 0, 0);
    
    // Check if the habit is active on this day of the week
    const dayOfWeek = cellDate.getDay();
    const isScheduledDay = habit.repeatDays.includes(dayOfWeek);
    
    return cellDate >= habitDate && isScheduledDay;
  };

  const playSound = async (type: 'success' | 'failure') => {
    try {
      const sound = new Audio(
        type === 'success'
          ? 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'
          : 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3'
      );
      await sound.play();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const handleStatusUpdate = async (habitId: string, status: HabitStatus['status'], event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    
    const canEdit = isDateToday || (isPast && allowPastEditing);
    if (!canEdit) return;
    
    const currentStatus = getHabitStatus(habitId);
    const previousStatus = currentStatus;
    
    if (currentStatus === status) {
      updateStatus(habitId, dateStr, 'pending');
      // If changing from success to pending, remove points
      if (previousStatus === 'success') {
        removePointsForHabit(habitId);
      }
    } else {
      updateStatus(habitId, dateStr, status);
      
      // Handle points based on status change
      if (status === 'success') {
        // If previously failed or pending, add points
        if (previousStatus !== 'success') {
          addPointsForHabit(habitId);
        }
      } else if (status === 'failure') {
        // If previously successful, remove points
        if (previousStatus === 'success') {
          removePointsForHabit(habitId);
        }
      }
    }
    
    if (isDateToday) {
      await playSound(status === 'success' ? 'success' : 'failure');
    }
  };

  const getHabitInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  };

  const handleHabitClick = (habitId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const canEdit = isDateToday || (isPast && allowPastEditing);
    if (!canEdit) return;
    
    // Left click marks as successful
    handleStatusUpdate(habitId, 'success', event);
  };

  const handleHabitRightClick = (habitId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const canEdit = isDateToday || (isPast && allowPastEditing);
    if (!canEdit) return;
    
    // Right click marks as failure
    handleStatusUpdate(habitId, 'failure', event);
  };

  const canEditDate = isDateToday || (isPast && allowPastEditing);
  const activeHabits = habits.filter(habit => isHabitActive(habit));

  if (compactMode) {
    return (
      <div className={`p-3 rounded-xl transition-all duration-300 ${
        isDateToday ? 
          'bg-white shadow-lg shadow-black/20 ring-1 ring-gray-900/10 transform scale-[1.02]' : 
        isPast && !allowPastEditing ? 
          'bg-gray-50 opacity-75 border border-gray-200 rounded-lg' : 
          'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm rounded-lg'
      }`}>
        <div className={`text-sm font-medium mb-3 ${
          isDateToday ? 'text-gray-900 font-bold' : 'text-gray-700'
        }`}>
          {date.getDate()}
        </div>
        
        {/* 3-Column Grid Layout */}
        <div className={`grid gap-3 ${
          activeHabits.length === 1 ? 'grid-cols-1' : 
          activeHabits.length === 2 ? 'grid-cols-2' : 
          'grid-cols-3'
        }`}>
          {activeHabits.map(habit => {
            const status = getHabitStatus(habit.id);
            const initials = getHabitInitials(habit.name);
            const isSingleHabit = activeHabits.length === 1;

            return (
              <div
                key={habit.id}
                className={`
                  ${isSingleHabit ? 'h-8 px-3' : 'aspect-square'} 
                  flex items-center justify-center text-xs font-bold rounded-lg cursor-pointer transition-all relative group
                  ${status === 'success' ? 'bg-green-500 text-white' :
                    status === 'failure' ? 'bg-red-500 text-white' :
                    'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }
                  ${!canEditDate ? 'cursor-not-allowed opacity-50' : ''}
                `}
                style={{
                  fontSize: isSingleHabit ? '11px' : '10px',
                  letterSpacing: '1.2px',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
                onClick={(e) => handleHabitClick(habit.id, e)}
                onContextMenu={(e) => handleHabitRightClick(habit.id, e)}
                title={habit.name}
              >
                {isSingleHabit ? habit.name : initials}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Regular mode (existing implementation)
  return (
    <div className={`p-3 rounded-xl transition-all duration-300 ${
      isDateToday ? 
        'bg-white shadow-lg shadow-black/20 ring-1 ring-gray-900/10 transform scale-[1.02]' : 
      isPast && !allowPastEditing ? 
        'bg-gray-50 opacity-75 border border-gray-200 rounded-lg' : 
        'bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm rounded-lg'
    }`}>
      <div className={`text-sm font-medium mb-2 ${
        isDateToday ? 'text-gray-900 font-bold' : 'text-gray-700'
      }`}>
        {date.getDate()}
      </div>
      <div className="space-y-2">
        {activeHabits.map(habit => {
          const status = getHabitStatus(habit.id);

          return (
            <div
              key={habit.id}
              className={`p-2 rounded-lg text-sm transition-all ${
                status === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
                status === 'failure' ? 'bg-red-100 text-red-800 border border-red-200' :
                isDateToday ? 'bg-white/95 text-gray-900 border border-gray-300 shadow-sm font-medium backdrop-blur-sm' :
                'bg-gray-100 text-gray-700 border border-gray-200'
              } ${!canEditDate ? 'cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center justify-between group">
                <span className="truncate font-medium">{habit.name}</span>
                {canEditDate && (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleStatusUpdate(habit.id, 'success')}
                      className={`p-1 hover:bg-green-200 rounded transition-all ${
                        status === 'success' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                      title="Mark as completed"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(habit.id, 'failure')}
                      className={`p-1 hover:bg-red-200 rounded transition-all ${
                        status === 'failure' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                      title="Mark as failed"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};