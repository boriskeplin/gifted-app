/**
 * GA4 Measurement Protocol analytics.
 * Sends events server-side — no SDK needed.
 * Measurement ID: G-LEPTSHR2ML
 */
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MEASUREMENT_ID = 'G-LEPTSHR2ML';
// API secret from GA4 → Admin → Data Streams → Measurement Protocol API secrets
const API_SECRET     = 'PASTE_GA4_API_SECRET';
const ENDPOINT       = `https://www.google-analytics.com/mp/collect?measurement_id=${MEASUREMENT_ID}&api_secret=${API_SECRET}`;
const CLIENT_ID_KEY  = '@gifted_ga_client_id';

async function getClientId(): Promise<string> {
  let id = await AsyncStorage.getItem(CLIENT_ID_KEY);
  if (!id) {
    id = `${Date.now()}.${Math.floor(Math.random() * 1000000000)}`;
    await AsyncStorage.setItem(CLIENT_ID_KEY, id);
  }
  return id;
}

async function track(eventName: string, params: Record<string, string | number> = {}): Promise<void> {
  try {
    const clientId = await getClientId();
    const body = {
      client_id: clientId,
      events: [{
        name: eventName,
        params: {
          platform: Platform.OS,
          app_version: '1.0.0',
          ...params,
        },
      }],
    };
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }).catch(() => {}); // fire and forget
  } catch { /* never block on analytics */ }
}

// ── Event library ──────────────────────────────────────────────────────────

export const Analytics = {
  /** User completed the quiz and received their gift */
  quizCompleted: (gift: string) =>
    track('quiz_completed', { gift_type: gift }),

  /** User opened the app */
  appOpen: (gift: string, dayNum: number) =>
    track('app_open', { gift_type: gift, day_number: dayNum }),

  /** User marked a day complete */
  dayCompleted: (gift: string, dayNum: number, streakCount: number) =>
    track('day_completed', { gift_type: gift, day_number: dayNum, streak: streakCount }),

  /** User hit a streak milestone (7, 14, 21, 28) */
  streakMilestone: (gift: string, milestone: number) =>
    track('streak_milestone', { gift_type: gift, milestone_day: milestone }),

  /** User completed the full 28-day journey */
  journeyCompleted: (gift: string, totalDays: number) =>
    track('journey_completed', { gift_type: gift, total_days: totalDays }),

  /** User wrote a journal entry */
  journalEntry: (gift: string, dayNum: number) =>
    track('journal_entry', { gift_type: gift, day_number: dayNum }),

  /** User hit the paywall */
  paywallSeen: (source: string) =>
    track('paywall_seen', { source }),

  /** User tapped the upgrade button */
  upgradeIntent: (source: string) =>
    track('upgrade_intent', { source }),

  /** User opened the library */
  libraryOpened: (gift: string) =>
    track('library_opened', { gift_type: gift }),

  /** User reset their gift */
  giftReset: (oldGift: string) =>
    track('gift_reset', { old_gift: oldGift }),
};

export default Analytics;
