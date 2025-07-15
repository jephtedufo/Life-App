@@ .. @@
   return (
     <>
       {/* Fixed backdrop - covers entire viewport */}
       <div 
-        className="modal-backdrop bg-black bg-opacity-50 z-40 transition-opacity duration-300"
+        className="modal-backdrop bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
         onClick={onClose}
       />
       
       {/* Modal - centered in viewport */}
-      <div className="modal-backdrop flex items-center justify-center z-50 p-4">
-        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
-          <div className="p-6">
-            <h3 className="text-lg font-semibold mb-2">{title}</h3>
-            <p className="text-gray-600 mb-6">{message}</p>
-            <div className="flex justify-end gap-4">
+      <div className="modal-backdrop flex items-center justify-center z-50 p-6">
+        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100 animate-scale-in border border-slate-200">
+          <div className="p-8">
+            <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
+            <p className="text-slate-600 mb-8 leading-relaxed">{message}</p>
+            <div className="flex justify-end gap-4">
               <button
                 onClick={onClose}
-                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
+                className="btn-secondary"
               >
                 No, Cancel
               </button>
               <button
                 onClick={onConfirm}
-                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
+                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-600 transform hover:scale-[1.02] transition-all duration-200"
               >
                 Yes, Reset
               </button>
             </div>
           </div>
         </div>
       </div>
     </>
   );
 };