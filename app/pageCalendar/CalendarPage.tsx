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
    <div className="min-h-screen gradient-bg py-8 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <Header />
        <div className="space-y-12 mb-8 animate-fade-in">
          <AppNavigation onNavigate={onNavigate} onAddHabitClick={handleAddHabitClick} showSettingsButton />
          <HabitConfigModal
            isOpen={showHabitModal}
            onClose={() => setShowHabitModal(false)}
            onSubmit={handleHabitSubmit}
          />
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{getMonthName(currentDate)}</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-3 hover:bg-white/80 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md border border-slate-200/50"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={20} className="text-slate-600" />
                </button>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-3 hover:bg-white/80 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md border border-slate-200/50"
                  aria-label="Next month"
                >
                  <ChevronRight size={20} className="text-slate-600" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-4 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-semibold text-slate-500 py-3 text-sm tracking-wide">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-4">
              {Array.from({ length: days[0].getDay() }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {days.map(date => (
                <DayCell
                  key={date.toISOString()}
                  date={date}
                  habits={habits}
                  statuses={statuses}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-start mb-20 pt-12">
          <div className="flex-1 pr-8 animate-fade-in">
            <h1 className="text-7xl font-black text-slate-900 mb-8 tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Welcome Back, Jephte
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed italic max-w-4xl font-light">
            </p>
          </div>
        </div>
      </div>
    </div>
   );
};