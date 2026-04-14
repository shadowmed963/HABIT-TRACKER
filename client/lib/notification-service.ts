/**
 * Notification Service
 * Handles push notifications for habits at specified times
 */

export interface NotificationSchedule {
  habitId: string;
  habitName: string;
  notificationTime: string; // HH:mm format
  enabled: boolean;
}

// Request permission for notifications
export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
}

// Send a notification
export function sendNotification(title: string, options?: NotificationOptions) {
  if (Notification.permission === 'granted') {
    new Notification(title, options);
  }
}

// Schedule daily notifications
export function scheduleNotification(schedule: NotificationSchedule) {
  if (!schedule.enabled) return;

  // Run check every minute
  const checkInterval = setInterval(() => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    if (currentTime === schedule.notificationTime) {
      sendNotification(`Reminder: ${schedule.habitName}`, {
        icon: '/image.png',
        badge: '/image.png',
        tag: `habit-${schedule.habitId}`,
        requireInteraction: false,
      });
    }
  }, 60000); // Check every minute

  return checkInterval;
}

// Get stored notification schedules from localStorage
export function getStoredSchedules(): NotificationSchedule[] {
  try {
    const stored = localStorage.getItem('habit_notification_schedules');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Save notification schedules to localStorage
export function saveSchedules(schedules: NotificationSchedule[]) {
  localStorage.setItem('habit_notification_schedules', JSON.stringify(schedules));
}

// Update or add a notification schedule
export function updateSchedule(habitId: string, habitName: string, notificationTime: string, enabled: boolean) {
  const schedules = getStoredSchedules();
  const existingIndex = schedules.findIndex(s => s.habitId === habitId);

  if (existingIndex > -1) {
    schedules[existingIndex] = { habitId, habitName, notificationTime, enabled };
  } else {
    schedules.push({ habitId, habitName, notificationTime, enabled });
  }

  saveSchedules(schedules);
  return schedules;
}

// Remove a notification schedule
export function removeSchedule(habitId: string) {
  const schedules = getStoredSchedules();
  const filtered = schedules.filter(s => s.habitId !== habitId);
  saveSchedules(filtered);
  return filtered;
}
