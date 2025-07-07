/**
 * Points Data Export Utilities
 */

import { TaskCategory, PointLog, Reward, RedemptionLog, PointsGoal, HabitTaskConnection } from '../types';

export interface PointsExportData {
  categories: TaskCategory[];
  pointLogs: PointLog[];
  rewards: Reward[];
  redemptions: RedemptionLog[];
  goals: PointsGoal[];
  habitConnections: HabitTaskConnection[];
  exportDate: string;
  version: string;
}

/**
 * Export points data to CSV format
 */
export const exportPointsToCSV = (
  categories: TaskCategory[],
  pointLogs: PointLog[],
  rewards: Reward[],
  redemptions: RedemptionLog[],
  goals: PointsGoal[],
  habitConnections: HabitTaskConnection[]
): string => {
  const exportData: PointsExportData = {
    categories,
    pointLogs,
    rewards,
    redemptions,
    goals,
    habitConnections,
    exportDate: new Date().toISOString(),
    version: '1.0'
  };

  let csvContent = '';
  
  // Header section
  csvContent += '# Jephte Points System Export\n';
  csvContent += `# Export Date: ${exportData.exportDate}\n`;
  csvContent += `# Version: ${exportData.version}\n`;
  csvContent += '\n';

  // Categories section
  csvContent += '# TASK_CATEGORIES\n';
  csvContent += 'id,name,description,default_point_value,color,created_at,priority\n';
  
  categories.forEach(category => {
    const description = (category.description || '').replace(/"/g, '""');
    csvContent += `"${category.id}","${category.name}","${description}",${category.defaultPointValue},"${category.color}","${category.createdAt}",${category.priority || 0}\n`;
  });

  csvContent += '\n';

  // Point logs section
  csvContent += '# POINT_LOGS\n';
  csvContent += 'id,category_id,description,tasks_completed,points_per_task,total_points,date,created_at\n';
  
  pointLogs.forEach(log => {
    const description = (log.description || '').replace(/"/g, '""');
    csvContent += `"${log.id}","${log.categoryId}","${description}",${log.tasksCompleted},${log.pointsPerTask},${log.totalPoints},"${log.date}","${log.createdAt}"\n`;
  });

  csvContent += '\n';

  // Rewards section
  csvContent += '# REWARDS\n';
  csvContent += 'id,title,description,cost,image_url,show_image,column_width,priority,created_at\n';
  
  rewards.forEach(reward => {
    const title = (reward.title || '').replace(/"/g, '""');
    const description = (reward.description || '').replace(/"/g, '""');
    const imageUrl = (reward.imageUrl || '').replace(/"/g, '""');
    csvContent += `"${reward.id}","${title}","${description}",${reward.cost},"${imageUrl}",${reward.showImage !== false},${reward.columnWidth || 1},${reward.priority || 0},"${reward.createdAt}"\n`;
  });

  csvContent += '\n';

  // Redemptions section
  csvContent += '# REDEMPTIONS\n';
  csvContent += 'id,reward_id,reward_title,points_spent,date,created_at\n';
  
  redemptions.forEach(redemption => {
    const rewardTitle = (redemption.rewardTitle || '').replace(/"/g, '""');
    csvContent += `"${redemption.id}","${redemption.rewardId}","${rewardTitle}",${redemption.pointsSpent},"${redemption.date}","${redemption.createdAt}"\n`;
  });

  csvContent += '\n';

  // Goals section
  csvContent += '# GOALS\n';
  csvContent += 'id,title,target_points,start_date,end_date,created_at\n';
  
  goals.forEach(goal => {
    const title = (goal.title || '').replace(/"/g, '""');
    csvContent += `"${goal.id}","${title}",${goal.targetPoints},"${goal.startDate}","${goal.endDate}","${goal.createdAt}"\n`;
  });

  csvContent += '\n';

  // Habit connections section
  csvContent += '# HABIT_CONNECTIONS\n';
  csvContent += 'id,habit_id,task_id,created_at\n';
  
  habitConnections.forEach(connection => {
    csvContent += `"${connection.id}","${connection.habitId}","${connection.taskId}","${connection.createdAt}"\n`;
  });

  return csvContent;
};

/**
 * Export points data to JSON format
 */
export const exportPointsToJSON = (
  categories: TaskCategory[],
  pointLogs: PointLog[],
  rewards: Reward[],
  redemptions: RedemptionLog[],
  goals: PointsGoal[],
  habitConnections: HabitTaskConnection[]
): string => {
  const exportData: PointsExportData = {
    categories,
    pointLogs,
    rewards,
    redemptions,
    goals,
    habitConnections,
    exportDate: new Date().toISOString(),
    version: '1.0'
  };

  return JSON.stringify(exportData, null, 2);
};

/**
 * Download points data as CSV file
 */
export const downloadPointsCSV = (
  categories: TaskCategory[],
  pointLogs: PointLog[],
  rewards: Reward[],
  redemptions: RedemptionLog[],
  goals: PointsGoal[],
  habitConnections: HabitTaskConnection[],
  filename?: string
) => {
  const csvContent = exportPointsToCSV(categories, pointLogs, rewards, redemptions, goals, habitConnections);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename || `points-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

/**
 * Download points data as JSON file
 */
export const downloadPointsJSON = (
  categories: TaskCategory[],
  pointLogs: PointLog[],
  rewards: Reward[],
  redemptions: RedemptionLog[],
  goals: PointsGoal[],
  habitConnections: HabitTaskConnection[],
  filename?: string
) => {
  const jsonContent = exportPointsToJSON(categories, pointLogs, rewards, redemptions, goals, habitConnections);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename || `points-export-${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};