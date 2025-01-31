import performFetch from './api';

// Get the 3 most recent activity logs
export const getRecentActivities = async () => {
  const response = await performFetch('/activity-log/recent');
  return response || [];
};

// Get all activity logs
export const getAllActivities = async () => {
  const response = await performFetch('/activity-log');
  return response || [];
};
