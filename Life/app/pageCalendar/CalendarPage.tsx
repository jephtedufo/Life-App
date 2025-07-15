import React, { useState } from 'react';
import { AppNavigation } from '../components/AppNavigation';
import { useHabits } from '../components/contextHabits';
import { getDaysInMonth, getMonthName, isToday, isPastDate } from '../utils/dateUtils';
import { ChevronLeft, ChevronRight, Settings, Check, X } from 'lucide-react';
import { HabitConfigModal } from './AddHabitModal';
import { Habit, HabitStatus } from '../types';
import { usePoints } from '../components/contextPoints';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const { use24HourFormat } = useHabits();

  React.useEffect(() => {
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

const bibleVerses = [
  "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the Lord thy God is with thee whithersoever thou goest. - Joshua 1:9",
  "I can do all things through Christ which strengtheneth me. - Philippians 4:13",
  "Trust in the Lord with all thine heart; and lean not unto thine own understanding. - Proverbs 3:5",
  "But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles. - Isaiah 40:31",
  "And we know that all things work together for good to them that love God. - Romans 8:28",
  "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end. - Jeremiah 29:11",
  "The Lord is my shepherd; I shall not want. - Psalm 23:1",
  "Commit thy way unto the Lord; trust also in him; and he shall bring it to pass. - Psalm 37:5",
  "Be ye therefore perfect, even as your Father which is in heaven is perfect. - Matthew 5:48",
  "Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven. - Matthew 5:16",
  "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you. - Matthew 6:33",
  "Come unto me, all ye that labour and are heavy laden, and I will give you rest. - Matthew 11:28",
  "And be not conformed to this world: but be ye transformed by the renewing of your mind. - Romans 12:2",
  "Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things. - Philippians 4:8",
  "Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth. - 2 Timothy 2:15",
  "But grow in grace, and in the knowledge of our Lord and Saviour Jesus Christ. - 2 Peter 3:18",
  "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him. - James 1:5",
  "Draw nigh to God, and he will draw nigh to you. - James 4:8",
  "Casting all your care upon him; for he careth for you. - 1 Peter 5:7",
  "And this is the confidence that we have in him, that, if we ask any thing according to his will, he heareth us. - 1 John 5:14",
  "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee. - Isaiah 41:10",
  "The steps of a good man are ordered by the Lord: and he delighteth in his way. - Psalm 37:23",
  "Delight thyself also in the Lord: and he shall give thee the desires of thine heart. - Psalm 37:4",
  "Create in me a clean heart, O God; and renew a right spirit within me. - Psalm 51:10",
  "Thy word is a lamp unto my feet, and a light unto my path. - Psalm 119:105",
  "The fear of the Lord is the beginning of wisdom: and the knowledge of the holy is understanding. - Proverbs 9:10",
  "A man's heart deviseth his way: but the Lord directeth his steps. - Proverbs 16:9",
  "Iron sharpeneth iron; so a man sharpeneth the countenance of his friend. - Proverbs 27:17",
  "But he that shall endure unto the end, the same shall be saved. - Matthew 24:13",
  "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new. - 2 Corinthians 5:17"
];

const Header: React.FC = () => {
  const [verse, setVerse] = useState('');
  React.useEffect(() => {
    const updateVerse = () => {
      const now = new Date();
      const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      const index = dayOfYear % bibleVerses.length;
      setVerse(bibleVerses[index]);
    };
    updateVerse();
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    const timeout = setTimeout(() => {
      updateVerse();
      const interval = setInterval(updateVerse, 24 * 60 * 60 * 1000);
      return () => clearInterval(interval);
    }, msUntilMidnight);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <div className="flex justify-between items-start mb-16 pt-8">
      <div className="flex-1 pr-8">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">Welcome Back, Jephte</h1>
        <p className="text-lg text-gray-600 leading-relaxed italic max-w-4xl">
          {verse}
        </p>
      </div>
      <Clock />
    </div>
  );
};

interface DayCellProps {
  date: Date;
  habits: Habit[];
  statuses: HabitStatus[];
  allowPastEditing: boolean;
}
const DayCell: React.FC<DayCellProps> = ({ date, habits, statuses, allowPastEditing }) => {
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
    const dayOfWeek = cellDate.getDay();
    const isScheduledDay = habit.repeatDays.includes(dayOfWeek);
    return cellDate >= habitDate && isScheduledDay;
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
      if (previousStatus === 'success') {
        removePointsForHabit(habitId);
      }
    } else {
      updateStatus(habitId, dateStr, status);
      if (status === 'success') {
        if (previousStatus !== 'success') {
          addPointsForHabit(habitId);
        }
      } else if (status === 'failure') {
        if (previousStatus === 'success') {
          removePointsForHabit(habitId);
        }
      }
    }
  };
  const getHabitInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  };
  const handleHabitClick = async (habitId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const canEdit = isDateToday || (isPast && allowPastEditing);
    if (!canEdit) return;
    handleStatusUpdate(habitId, 'success', event);
  };
  const handleHabitRightClick = async (habitId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const canEdit = isDateToday || (isPast && allowPastEditing);
    if (!canEdit) return;
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

interface CalendarPageProps {
  onNavigate: (page: 'calendar' | 'tasks' | 'shop' | 'manage') => void;
}

export const CalendarPage: React.FC<CalendarPageProps> = ({ onNavigate }) => {
  const { allowPastEditing, habits, statuses, addHabit } = useHabits();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showHabitModal, setShowHabitModal] = useState(false);
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

  // Handler for AppNavigation click
  const handleAddHabitClick = () => {
    setShowHabitModal(true);
  };

  // Handler for modal submit
  const handleHabitSubmit = (name: string, description: string, repeatDays: number[]) => {
    addHabit(name, description, repeatDays);
    setShowHabitModal(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <Header />
        <div className="space-y-12 mb-8">
          <AppNavigation onNavigate={onNavigate} onAddHabitClick={handleAddHabitClick} showSettingsButton />
          <HabitConfigModal
            isOpen={showHabitModal}
            onClose={() => setShowHabitModal(false)}
            onSubmit={handleHabitSubmit}
          />
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
        </div>
      </div>
    </div>
  );
};