import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

const DAILY_NOTIFICATION_ID = 'gifted-daily-reminder';

async function requestPermissions(): Promise<boolean> {
  if (!Device.isDevice) return false;
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

async function scheduleDailyReminder(hour = 8, minute = 0): Promise<void> {
  // Cancel any existing daily reminder first
  await Notifications.cancelScheduledNotificationAsync(DAILY_NOTIFICATION_ID).catch(() => {});

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('daily-reminder', {
      name: 'Daily Reminder',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  await Notifications.scheduleNotificationAsync({
    identifier: DAILY_NOTIFICATION_ID,
    content: {
      title: 'Your gift is waiting.',
      body: 'Today\'s practice. Today\'s scripture. Two minutes.',
      sound: false,
    },
    trigger: {
      hour,
      minute,
      repeats: true,
    } as Notifications.DailyTriggerInput,
  });
}

export function useNotifications(enabled: boolean = true) {
  const permissionRequested = useRef(false);

  useEffect(() => {
    if (!enabled || permissionRequested.current) return;
    permissionRequested.current = true;

    (async () => {
      const granted = await requestPermissions();
      if (granted) {
        await scheduleDailyReminder(8, 0);
      }
    })();
  }, [enabled]);
}

export { scheduleDailyReminder, requestPermissions };
