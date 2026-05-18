import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GiftType } from '../data/gifts';

export interface JournalEntry {
  id: string;
  date: string;
  text: string;
  dayNumber: number;
  practiceCompleted: boolean;
}

export interface UserState {
  name: string;
  gift: GiftType | null;
  giftScores: Record<string, number>;
  startDate: string;
  streak: number;
  lastActiveDate: string;
  totalDays: number;
  subscribed: boolean;
  journalEntries: JournalEntry[];
  completedDays: number[];
}

const DEFAULT_STATE: UserState = {
  name: '',
  gift: null,
  giftScores: {},
  startDate: new Date().toISOString().split('T')[0],
  streak: 0,
  lastActiveDate: '',
  totalDays: 0,
  subscribed: false,
  journalEntries: [],
  completedDays: [],
};

const KEY = '@gifted_user';

export function useUserStore() {
  const [user, setUser]     = useState<UserState>(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then(raw => {
      if (raw) {
        try { setUser({ ...DEFAULT_STATE, ...JSON.parse(raw) }); }
        catch { /* use defaults */ }
      }
      setLoaded(true);
    });
  }, []);

  const persist = (next: UserState) => {
    AsyncStorage.setItem(KEY, JSON.stringify(next));
    return next;
  };

  const save = useCallback((update: Partial<UserState>) => {
    setUser(prev => persist({ ...prev, ...update }));
  }, []);

  const markDayComplete = useCallback((dayNum: number) => {
    setUser(prev => {
      const today    = new Date().toISOString().split('T')[0];
      const wasToday = prev.lastActiveDate === today;
      const newStreak = wasToday ? prev.streak : prev.streak + 1;
      const completedDays = prev.completedDays.includes(dayNum)
        ? prev.completedDays
        : [...prev.completedDays, dayNum];
      return persist({
        ...prev,
        streak: newStreak,
        lastActiveDate: today,
        totalDays: completedDays.length,
        completedDays,
      });
    });
  }, []);

  const addJournalEntry = useCallback((text: string, dayNumber: number, practiceCompleted: boolean) => {
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      text,
      dayNumber,
      practiceCompleted,
    };
    setUser(prev => persist({ ...prev, journalEntries: [entry, ...prev.journalEntries] }));
  }, []);

  // Full clear — used for gift reset (keeps journal)
  const resetGift = useCallback(() => {
    setUser(prev => persist({
      ...prev,
      gift: null,
      giftScores: {},
      startDate: new Date().toISOString().split('T')[0],
      streak: 0,
      totalDays: 0,
      completedDays: [],
      lastActiveDate: '',
      // journalEntries preserved
    }));
  }, []);

  const clearUser = useCallback(() => {
    AsyncStorage.removeItem(KEY);
    setUser(DEFAULT_STATE);
  }, []);

  return { user, loaded, save, markDayComplete, addJournalEntry, resetGift, clearUser };
}
