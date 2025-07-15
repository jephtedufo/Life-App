@@ .. @@
   return (
     <>
-      <div className={`space-y-4${className ? ` ${className}` : ''}`}>
-        <div className="flex gap-2">
+      <div className={`space-y-6${className ? ` ${className}` : ''}`}>
+        <div className="flex gap-3">
           <button
             onClick={onAddHabitClick ? onAddHabitClick : () => setShowHabitConfig(true)}
   )
-            className="flex-1 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all text-gray-600 text-left"
+            className="flex-1 px-6 py-4 border-2 border-dashed border-slate-300 rounded-2xl hover:border-slate-400 hover:bg-white/80 transition-all text-slate-600 text-left font-medium shadow-sm hover:shadow-md"
           >
             {addButtonLabel}
           </button>
           <button
             onClick={() => onNavigate('calendar')}
-            className="w-12 h-12 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
+            className="nav-item w-14 h-14 flex items-center justify-center"
             aria-label="Calendar"
           >
-            <Calendar size={20} />
+            <Calendar size={22} />
           </button>
           <button
             onClick={() => onNavigate('tasks')}
-            className="w-12 h-12 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
+            className="nav-item w-14 h-14 flex items-center justify-center"
             aria-label="Tasks"
           >
-            <CheckSquare size={20} />
+            <CheckSquare size={22} />
           </button>
           <button
             onClick={() => onNavigate('shop')}
-            className="w-12 h-12 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
+            className="nav-item w-14 h-14 flex items-center justify-center"
             aria-label="Shop"
           >
-            <Trophy size={20} />
+            <Trophy size={22} />
           </button>
           <button
             onClick={() => onNavigate('manage')}
-            className="w-12 h-12 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center"
+            className="nav-item w-14 h-14 flex items-center justify-center"
             aria-label="Settings"
           >
-            <Settings size={20} />
+            <Settings size={22} />
           </button>
         </div>
         {allowPastEditing && (
           )
           }
-          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
-            <div className="flex items-center gap-2">
-              <span className="text-yellow-600"><svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 12.93A5.93 5.93 0 1 1 8 2.07a5.93 5.93 0 0 1 0 11.86z"/><path d="M7.002 11h2V9h-2v2zm0-4h2V5h-2v2z"/></svg></span>
-              <p className="text-sm text-yellow-800">
+          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-4 shadow-sm">
+            <div className="flex items-center gap-3">
+              <span className="text-amber-600 bg-amber-100 p-2 rounded-xl">
+                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
+                  <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 12.93A5.93 5.93 0 1 1 8 2.07a5.93 5.93 0 0 1 0 11.86z"/>
+                  <path d="M7.002 11h2V9h-2v2zm0-4h2V5h-2v2z"/>
+                </svg>
+              </span>
+              <p className="text-sm text-amber-800 font-medium">
                 Past day editing is enabled. You can now modify habit statuses for previous days.
               </p>
             </div>
           </div>
         )}
       </div>
       <HabitConfigModal
         isOpen={showHabitConfig}
         onClose={() => setShowHabitConfig(false)}
         onSubmit={() => setShowHabitConfig(false)}
       />
       <ConfirmDialog
         isOpen={showResetConfirm}
         onClose={() => setShowResetConfirm(false)}
         onConfirm={() => setShowResetConfirm(false)}
         title="Reset All Data"
         message="Are you sure you want to reset all habit data? This action cannot be undone."
       />
     </>
   );
 };