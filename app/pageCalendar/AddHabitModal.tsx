@@ .. @@
   return (
     <>
       {/* Fixed backdrop - covers entire viewport */}
       <div 
-        className="modal-backdrop bg-black bg-opacity-50 z-40 transition-opacity duration-300"
+        className="modal-backdrop bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
         onClick={handleCancel}
       />
       {/* Modal - centered in viewport */}
-      <div className="modal-backdrop flex items-center justify-center z-50 p-4">
-        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden transform transition-all duration-300 scale-100">
+      <div className="modal-backdrop flex items-center justify-center z-50 p-6">
+        <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden transform transition-all duration-300 scale-100 animate-scale-in border border-slate-200">
           {/* Header */}
-          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50 bg-gray-50/50">
-            <h3 className="font-semibold text-gray-900 text-base">{editingHabit ? 'Edit Habit' : 'Add New Habit'}</h3>
+          <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-slate-100/50">
+            <h3 className="font-bold text-slate-900 text-xl tracking-tight">{editingHabit ? 'Edit Habit' : 'Add New Habit'}</h3>
             <button
               onClick={handleCancel}
-              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
+              className="p-2 hover:bg-slate-200 rounded-xl transition-colors"
             >
-              <X size={16} className="text-gray-500" />
+              <X size={18} className="text-slate-500" />
             </button>
           </div>
           {/* Content */}
-          <div className="p-6 space-y-6">
+          <div className="p-8 space-y-8">
             {/* Habit Name Input */}
             <div>
-              <label htmlFor="habit-name" className="block text-sm font-medium text-gray-700 mb-2">
+              <label htmlFor="habit-name" className="block text-sm font-semibold text-slate-700 mb-3">
                 Habit Name
               </label>
               <input
@@ -1,7 +1,7 @@
                 value={habitName}
                 onChange={(e) => setHabitName(e.target.value)}
                 placeholder="Enter habit name..."
-                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
+                className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all shadow-sm hover:shadow-md font-medium"
                 autoFocus
               />
             </div>
             {/* Habit Description Input */}
             <div>
-              <label htmlFor="habit-description" className="block text-sm font-medium text-gray-700 mb-2">
-                Description <span className="text-gray-400 font-normal">(optional)</span>
+              <label htmlFor="habit-description" className="block text-sm font-semibold text-slate-700 mb-3">
+                Description <span className="text-slate-400 font-normal">(optional)</span>
               </label>
               <textarea
                 id="habit-description"
                 value={habitDescription}
                 onChange={(e) => setHabitDescription(e.target.value)}
                 placeholder="Add a description for your habit..."
-                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
-                rows={3}
+                className="w-full px-5 py-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all resize-none shadow-sm hover:shadow-md"
+                rows={4}
               />
             </div>
             {/* Weekly Schedule */}
             <div>
-              <div className="flex items-center justify-between mb-3">
-                <label className="block text-sm font-medium text-gray-700">
+              <div className="flex items-center justify-between mb-4">
+                <label className="block text-sm font-semibold text-slate-700">
                   Weekly Schedule
                 </label>
                 <button
                   onClick={selectAllDays}
-                  className="text-sm text-gray-900 hover:text-gray-700 font-medium transition-colors"
+                  className="text-sm text-slate-900 hover:text-slate-700 font-semibold transition-colors px-3 py-1 rounded-lg hover:bg-slate-100"
                 >
                   All Days
                 </button>
               </div>
               {/* Day Selector */}
-              <div className="flex gap-2 justify-between">
+              <div className="flex gap-3 justify-between">
                 {dayNames.map((day, index) => (
                   <button
                     key={day}
                     onClick={() => toggleDay(index)}
                     className={`
-                      w-12 h-12 rounded-full text-sm font-medium transition-all duration-200 transform hover:scale-105
+                      w-14 h-14 rounded-2xl text-sm font-bold transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md
                       ${selectedDays.includes(index)
-                        ? 'bg-gray-900 text-white shadow-lg shadow-gray-300'
-                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
+                        ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg shadow-slate-300'
+                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                       }
                     `}
                     title={fullDayNames[index]}
                   >
                     {day}
                   </button>
                 ))}
               </div>
               {/* Selected Days Summary */}
               {selectedDays.length > 0 && (
-                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
-                  <p className="text-sm text-gray-600">
-                    <span className="font-medium text-gray-900">Selected days:</span>{' '}
-                    <span className="text-gray-500">
+                <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
+                  <p className="text-sm text-slate-600">
+                    <span className="font-semibold text-slate-900">Selected days:</span>{' '}
+                    <span className="text-slate-500">
                       {selectedDays.length === 7 
                         ? 'Every day'
                         : selectedDays.map(day => fullDayNames[day]).join(', ')
                       }
                     </span>
                   </p>
                 </div>
               )}
             </div>
           </div>
           {/* Footer */}
-          <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50/30 border-t border-gray-100">
+          <div className="flex justify-end gap-4 px-8 py-6 bg-gradient-to-r from-slate-50 to-slate-100/50 border-t border-slate-100">
             <button
               onClick={handleCancel}
-              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
+              className="btn-secondary"
             >
               Cancel
             </button>
             <button
               onClick={handleSubmit}
               disabled={!habitName.trim() || selectedDays.length === 0}
-              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
+              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
             >
               {editingHabit ? 'Save Changes' : 'Add Habit'}
             </button>
           </div>
         </div>
       </div>
     </>
   );
 };