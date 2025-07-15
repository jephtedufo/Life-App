import React, { useState, useRef } from 'react';
import { usePoints } from '../components/contextPoints';
import { Edit2, Trash2, Plus, ChevronUp, ChevronDown, GripVertical } from 'lucide-react';
import { AddTaskModal } from '../pageTasks/AddTaskModal';
import { ConfirmDialog } from '../components/ConfirmDialog';

export const TaskGroupsManager: React.FC = () => {
  const { categories, deleteCategory, updateCategory, setCategories } = usePoints();
  const [groupTitles, setGroupTitles] = useState<Record<string, string>>({});
  const [editingGroupTitle, setEditingGroupTitle] = useState<string | null>(null);
  const [groupTitleValue, setGroupTitleValue] = useState('');
  const [dragged, setDragged] = useState<{col: number, idx: number} | null>(null);
  const dragOver = useRef<{col: number, idx: number} | null>(null);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  // Group tasks by color for group title editing
  const groupedTasks = categories.reduce((groups, task) => {
    const color = task.color;
    if (!groups[color]) {
      groups[color] = [];
    }
    groups[color].push(task);
    return groups;
  }, {} as Record<string, typeof categories>);

  // Split into two columns by order
  const groupKeys = Object.keys(groupedTasks);
  const groupEntries: [string, typeof categories][] = groupKeys.map(key => [key, groupedTasks[key]]);
  let columns: [Array<[string, typeof categories]>, Array<[string, typeof categories]>] = [[], []];
  if (groupEntries.length === 1) {
    columns[0] = [groupEntries[0]];
  } else if (groupEntries.length > 1) {
    columns[0] = [groupEntries[0]];
    columns[1] = [groupEntries[1]];
    for (let i = 2; i < groupEntries.length; i++) {
      columns[i % 2].push(groupEntries[i]);
    }
  }

  // Drag and drop logic
  const handleDragStart = (col: number, idx: number) => setDragged({col, idx});
  const handleDragEnter = (col: number, idx: number) => { dragOver.current = {col, idx}; };
  const handleDragEnd = () => {
    if (!dragged || !dragOver.current) {
      setDragged(null);
      dragOver.current = null;
      return;
    }
    var flat = columns[0].concat(columns[1]);
    const fromIdx = dragged.col === 0 ? dragged.idx : columns[0].length + dragged.idx;
    const toIdx = dragOver.current.col === 0 ? dragOver.current.idx : columns[0].length + dragOver.current.idx;
    if (fromIdx === toIdx) {
      setDragged(null);
      dragOver.current = null;
      return;
    }
    const newOrder = flat.slice();
    const removed = newOrder.splice(fromIdx, 1)[0];
    newOrder.splice(toIdx, 0, removed);
    var flatTasks = newOrder.reduce(function(acc, entry) {
      return acc.concat(entry[1]);
    }, []);
    setCategories(flatTasks.map(function(cat, idx) { return { ...cat, priority: idx }; }));
    setDragged(null);
    dragOver.current = null;
  };

  const handleEditGroupTitle = (color: string, currentTitle: string) => {
    setEditingGroupTitle(color);
    setGroupTitleValue(currentTitle);
  };

  const handleSaveGroupTitle = (color: string) => {
    setGroupTitles(prev => ({ ...prev, [color]: groupTitleValue }));
    setEditingGroupTitle(null);
    setGroupTitleValue('');
  };

  const getGroupTitle = (color: string, tasks: any[]) => {
    return groupTitles[color] || `${tasks[0]?.name.split(' ')[0] || 'Task'} Group`;
  };

  // Reorder group cards
  const moveGroupUp = (col: number, idx: number) => {
    if (idx === 0) return;
    const newColumns = columns.map(colArr => [...colArr]);
    [newColumns[col][idx], newColumns[col][idx - 1]] = [newColumns[col][idx - 1], newColumns[col][idx]];
    // Flatten and update priorities
    const flatTasks = newColumns[0].concat(newColumns[1]).reduce((acc, entry) => acc.concat(entry[1]), []);
    setCategories(flatTasks.map((cat, idx) => ({ ...cat, priority: idx })));
  };
  const moveGroupDown = (col: number, idx: number) => {
    if (idx === columns[col].length - 1) return;
    const newColumns = columns.map(colArr => [...colArr]);
    [newColumns[col][idx], newColumns[col][idx + 1]] = [newColumns[col][idx + 1], newColumns[col][idx]];
    // Flatten and update priorities
    const flatTasks = newColumns[0].concat(newColumns[1]).reduce((acc, entry) => acc.concat(entry[1]), []);
    setCategories(flatTasks.map((cat, idx) => ({ ...cat, priority: idx })));
  };

  // Edit and delete handlers for tasks
  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setShowEditModal(true);
  };
  const handleEditSubmit = (updatedTask: any) => {
    // updateCategory is called inside AddTaskModal
    setShowEditModal(false);
    setEditingTask(null);
  };

  return (
    <div className="space-y-6">
      {/* Removed Task Groups Title */}
      {Object.keys(groupedTasks).length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <Plus size={32} className="mx-auto" />
          </div>
          <p className="text-gray-600">No task groups created yet</p>
        </div>
      ) : (
        <div className="flex flex-row gap-8">
          {[0, 1].map(col => (
            <div key={col} className="flex-1 flex flex-col gap-4">
              {columns[col].map(([color, tasks], idx) => {
                const groupTitle = getGroupTitle(color, tasks);
                return (
                  <div
                    key={color}
                    className={`bg-white rounded-lg border border-gray-200 p-4 ${(dragged && dragged.col === col && dragged.idx === idx) ? 'opacity-50' : ''}`}
                    draggable
                    onDragStart={() => handleDragStart(col, idx)}
                    onDragEnter={() => handleDragEnter(col, idx)}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {editingGroupTitle === color ? (
                          <>
                            <input
                              className="border rounded px-2 py-1 text-sm"
                              value={groupTitleValue}
                              onChange={e => setGroupTitleValue(e.target.value)}
                            />
                            <button className="ml-2 text-blue-600 text-xs" onClick={() => handleSaveGroupTitle(color)}>Save</button>
                          </>
                        ) : (
                          <>
                            <span className="font-semibold text-gray-900 text-lg">{groupTitle}</span>
                            <button className="ml-2 text-gray-500 hover:text-gray-700 text-xs" onClick={() => handleEditGroupTitle(color, groupTitle)}>Edit</button>
                          </>
                        )}
                        {/* Reorder group icons */}
                        <button className="ml-2 p-1" title="Move Group Up" onClick={() => moveGroupUp(col, idx)} disabled={idx === 0}><ChevronUp size={16} /></button>
                        <button className="p-1" title="Move Group Down" onClick={() => moveGroupDown(col, idx)} disabled={idx === columns[col].length - 1}><ChevronDown size={16} /></button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {tasks.map((task, i) => (
                        <div key={task.id} className="flex items-center gap-2 bg-gray-50 rounded p-2 border border-gray-100">
                          <GripVertical size={16} className="text-gray-400 cursor-move" />
                          <span className="flex-1 text-gray-800">{task.name}</span>
                          <button className="p-1 hover:bg-gray-100 rounded" onClick={() => handleEditTask(task)} title="Edit">
                            <Edit2 size={14} className="text-gray-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded" onClick={() => setDeleteTarget(task.id)} title="Delete">
                            <Trash2 size={14} className="text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
      <AddTaskModal
        isOpen={showEditModal}
        onClose={() => { setShowEditModal(false); setEditingTask(null); }}
        editingTask={editingTask}
      />
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) deleteCategory(deleteTarget);
          setDeleteTarget(null);
        }}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </div>
  );
}; 