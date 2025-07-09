/**
 * CSV Import/Export Utilities for Habit Tracking Data
 */

import { Habit, HabitStatus } from '../types';

export interface CSVExportData {
  habits: Habit[];
  statuses: HabitStatus[];
  exportDate: string;
  version: string;
}

export interface CSVImportResult {
  success: boolean;
  data?: CSVExportData;
  errors: string[];
  warnings: string[];
}

export interface DataConflict {
  type: 'habit' | 'status';
  existing: Habit | HabitStatus;
  incoming: Habit | HabitStatus;
  field: string;
}

/**
 * Export habits and statuses to CSV format
 */
export const exportToCSV = (habits: Habit[], statuses: HabitStatus[]): string => {
  const exportData: CSVExportData = {
    habits,
    statuses,
    exportDate: new Date().toISOString(),
    version: '1.0'
  };

  // Create CSV content with multiple sections
  let csvContent = '';
  
  // Header section
  csvContent += '# Jephte Habit Tracker Export\n';
  csvContent += `# Export Date: ${exportData.exportDate}\n`;
  csvContent += `# Version: ${exportData.version}\n`;
  csvContent += '\n';

  // Habits section
  csvContent += '# HABITS\n';
  csvContent += 'habit_id,name,description,repeat_days,created_at\n';
  
  habits.forEach(habit => {
    const repeatDaysStr = habit.repeatDays.join(';');
    const description = (habit.description || '').replace(/"/g, '""');
    csvContent += `"${habit.id}","${habit.name}","${description}","${repeatDaysStr}","${habit.createdAt}"\n`;
  });

  csvContent += '\n';

  // Statuses section
  csvContent += '# STATUSES\n';
  csvContent += 'habit_id,date,status\n';
  
  statuses.forEach(status => {
    csvContent += `"${status.habitId}","${status.date}","${status.status}"\n`;
  });

  return csvContent;
};

/**
 * Download CSV file
 */
export const downloadCSV = (habits: Habit[], statuses: HabitStatus[], filename?: string) => {
  const csvContent = exportToCSV(habits, statuses);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename || `habit-tracker-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

/**
 * Parse CSV content and validate structure
 */
export const parseCSV = (csvContent: string): CSVImportResult => {
  const result: CSVImportResult = {
    success: false,
    errors: [],
    warnings: []
  };

  try {
    const lines = csvContent.split('\n').map(line => line.trim()).filter(line => line);
    
    if (lines.length === 0) {
      result.errors.push('CSV file is empty');
      return result;
    }

    let currentSection = '';
    let habitHeaderFound = false;
    let statusHeaderFound = false;
    const habits: Habit[] = [];
    const statuses: HabitStatus[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Skip comments and empty lines
      if (line.startsWith('#') || line === '') {
        if (line.includes('HABITS')) {
          currentSection = 'habits';
        } else if (line.includes('STATUSES')) {
          currentSection = 'statuses';
        }
        continue;
      }

      // Parse habits section
      if (currentSection === 'habits') {
        if (line === 'habit_id,name,description,repeat_days,created_at') {
          habitHeaderFound = true;
          continue;
        }

        if (habitHeaderFound) {
          try {
            const habit = parseHabitRow(line);
            if (habit) {
              habits.push(habit);
            }
          } catch (error) {
            result.errors.push(`Error parsing habit at line ${i + 1}: ${error}`);
          }
        }
      }

      // Parse statuses section
      if (currentSection === 'statuses') {
        if (line === 'habit_id,date,status') {
          statusHeaderFound = true;
          continue;
        }

        if (statusHeaderFound) {
          try {
            const status = parseStatusRow(line);
            if (status) {
              statuses.push(status);
            }
          } catch (error) {
            result.errors.push(`Error parsing status at line ${i + 1}: ${error}`);
          }
        }
      }
    }

    // Validation
    if (!habitHeaderFound) {
      result.errors.push('Habits section header not found');
    }

    if (!statusHeaderFound) {
      result.warnings.push('Statuses section header not found - no status data will be imported');
    }

    if (habits.length === 0) {
      result.errors.push('No valid habits found in CSV');
    }

    // Validate status references
    const habitIds = new Set(habits.map(h => h.id));
    const invalidStatuses = statuses.filter(s => !habitIds.has(s.habitId));
    
    if (invalidStatuses.length > 0) {
      result.warnings.push(`${invalidStatuses.length} status entries reference non-existent habits and will be skipped`);
    }

    const validStatuses = statuses.filter(s => habitIds.has(s.habitId));

    if (result.errors.length === 0) {
      result.success = true;
      result.data = {
        habits,
        statuses: validStatuses,
        exportDate: new Date().toISOString(),
        version: '1.0'
      };
    }

  } catch (error) {
    result.errors.push(`Failed to parse CSV: ${error}`);
  }

  return result;
};

/**
 * Parse a single habit row from CSV
 */
const parseHabitRow = (line: string): Habit | null => {
  const columns = parseCSVRow(line);
  
  if (columns.length !== 5) {
    throw new Error(`Expected 5 columns, got ${columns.length}`);
  }

  const [id, name, description, repeatDaysStr, createdAt] = columns;

  if (!id || !name || !createdAt) {
    throw new Error('Missing required fields: id, name, or createdAt');
  }

  // Parse repeat days
  let repeatDays: number[] = [];
  if (repeatDaysStr) {
    try {
      repeatDays = repeatDaysStr.split(';').map(day => {
        const num = parseInt(day.trim(), 10);
        if (isNaN(num) || num < 0 || num > 6) {
          throw new Error(`Invalid repeat day: ${day}`);
        }
        return num;
      });
    } catch (error) {
      throw new Error(`Invalid repeat days format: ${error}`);
    }
  }

  // Validate date
  const createdDate = new Date(createdAt);
  if (isNaN(createdDate.getTime())) {
    throw new Error(`Invalid created date: ${createdAt}`);
  }

  return {
    id,
    name,
    description: description || '',
    repeatDays,
    createdAt
  };
};

/**
 * Parse a single status row from CSV
 */
const parseStatusRow = (line: string): HabitStatus | null => {
  const columns = parseCSVRow(line);
  
  if (columns.length !== 3) {
    throw new Error(`Expected 3 columns, got ${columns.length}`);
  }

  const [habitId, date, status] = columns;

  if (!habitId || !date || !status) {
    throw new Error('Missing required fields');
  }

  // Validate status
  const validStatuses = ['success', 'failure', 'skipped', 'pending'];
  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid status: ${status}`);
  }

  // Validate date format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    throw new Error(`Invalid date format: ${date}`);
  }

  return {
    habitId,
    date,
    status: status as HabitStatus['status']
  };
};

/**
 * Parse a CSV row handling quoted fields
 */
const parseCSVRow = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  let i = 0;

  while (i < line.length) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i += 2;
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
        i++;
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      result.push(current);
      current = '';
      i++;
    } else {
      current += char;
      i++;
    }
  }

  result.push(current);
  return result;
};

/**
 * Detect conflicts between existing and imported data
 */
export const detectConflicts = (
  existingHabits: Habit[],
  existingStatuses: HabitStatus[],
  importData: CSVExportData
): DataConflict[] => {
  const conflicts: DataConflict[] = [];

  // Check habit conflicts (same ID but different data)
  importData.habits.forEach(importedHabit => {
    const existing = existingHabits.find(h => h.id === importedHabit.id);
    if (existing) {
      if (existing.name !== importedHabit.name) {
        conflicts.push({
          type: 'habit',
          existing,
          incoming: importedHabit,
          field: 'name'
        });
      }
      if (existing.description !== importedHabit.description) {
        conflicts.push({
          type: 'habit',
          existing,
          incoming: importedHabit,
          field: 'description'
        });
      }
      if (JSON.stringify(existing.repeatDays) !== JSON.stringify(importedHabit.repeatDays)) {
        conflicts.push({
          type: 'habit',
          existing,
          incoming: importedHabit,
          field: 'repeatDays'
        });
      }
    }
  });

  // Check status conflicts (same habit and date but different status)
  importData.statuses.forEach(importedStatus => {
    const existing = existingStatuses.find(s => 
      s.habitId === importedStatus.habitId && s.date === importedStatus.date
    );
    if (existing && existing.status !== importedStatus.status) {
      conflicts.push({
        type: 'status',
        existing,
        incoming: importedStatus,
        field: 'status'
      });
    }
  });

  return conflicts;
};

/**
 * Merge imported data with existing data
 */
export const mergeData = (
  existingHabits: Habit[],
  existingStatuses: HabitStatus[],
  importData: CSVExportData,
  conflictResolution: 'keep_existing' | 'overwrite' | 'merge' = 'merge'
): { habits: Habit[]; statuses: HabitStatus[] } => {
  const mergedHabits = [...existingHabits];
  const mergedStatuses = [...existingStatuses];

  // Merge habits
  importData.habits.forEach(importedHabit => {
    const existingIndex = mergedHabits.findIndex(h => h.id === importedHabit.id);
    
    if (existingIndex >= 0) {
      if (conflictResolution === 'overwrite') {
        mergedHabits[existingIndex] = importedHabit;
      } else if (conflictResolution === 'merge') {
        // Merge non-empty fields
        const existing = mergedHabits[existingIndex];
        mergedHabits[existingIndex] = {
          ...existing,
          name: importedHabit.name || existing.name,
          description: importedHabit.description || existing.description,
          repeatDays: importedHabit.repeatDays.length > 0 ? importedHabit.repeatDays : existing.repeatDays
        };
      }
      // 'keep_existing' does nothing
    } else {
      mergedHabits.push(importedHabit);
    }
  });

  // Merge statuses
  importData.statuses.forEach(importedStatus => {
    const existingIndex = mergedStatuses.findIndex(s => 
      s.habitId === importedStatus.habitId && s.date === importedStatus.date
    );
    
    if (existingIndex >= 0) {
      if (conflictResolution === 'overwrite') {
        mergedStatuses[existingIndex] = importedStatus;
      }
      // For 'keep_existing' and 'merge', keep the existing status
    } else {
      mergedStatuses.push(importedStatus);
    }
  });

  return { habits: mergedHabits, statuses: mergedStatuses };
};

// --- ALL DATA EXPORT/IMPORT (JSON) ---

export interface FullAppDataExport {
  habits: Habit[];
  statuses: HabitStatus[];
  categories: TaskCategory[];
  pointLogs: PointLog[];
  rewards: Reward[];
  redemptions: RedemptionLog[];
  goals: PointsGoal[];
  habitConnections: HabitTaskConnection[];
  exportDate: string;
  version: string;
}

export interface FullAppDataImportResult {
  success: boolean;
  data?: FullAppDataExport;
  errors: string[];
  warnings: string[];
}

export const exportAllAppData = (data: Omit<FullAppDataExport, 'exportDate' | 'version'>, filename?: string) => {
  const exportData: FullAppDataExport = {
    ...data,
    exportDate: new Date().toISOString(),
    version: '2.0',
  };
  const json = JSON.stringify(exportData, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename || `life-app-export-${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const importAllAppData = async (file: File): Promise<FullAppDataImportResult> => {
  const result: FullAppDataImportResult = {
    success: false,
    errors: [],
    warnings: [],
  };
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    // Basic validation
    const requiredKeys = [
      'habits', 'statuses', 'categories', 'pointLogs', 'rewards', 'redemptions', 'goals', 'habitConnections',
    ];
    for (const key of requiredKeys) {
      if (!Array.isArray(data[key])) {
        result.errors.push(`Missing or invalid array for key: ${key}`);
      }
    }
    if (result.errors.length === 0) {
      result.success = true;
      result.data = {
        habits: data.habits,
        statuses: data.statuses,
        categories: data.categories,
        pointLogs: data.pointLogs,
        rewards: data.rewards,
        redemptions: data.redemptions,
        goals: data.goals,
        habitConnections: data.habitConnections,
        exportDate: data.exportDate || '',
        version: data.version || '2.0',
      };
    }
  } catch (e) {
    result.errors.push('Failed to parse JSON: ' + (e instanceof Error ? e.message : String(e)));
  }
  return result;
};