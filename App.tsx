import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { GiftType } from './src/data/gifts';
import { useUserStore } from './src/hooks/useUserStore';
import { useNotifications } from './src/hooks/useNotifications';
import { getDayNumber } from './src/data/content';
import OnboardingScreen from './src/screens/OnboardingScreen';
import CompletionScreen from './src/screens/CompletionScreen';
import AppNavigator from './src/navigation/AppNavigator';
import Analytics from './src/analytics';
import { Colors } from './src/theme';

export default function App() {
  const { user, loaded, save, markDayComplete, addJournalEntry, clearUser } = useUserStore();

  // Daily push notification (only after onboarding)
  useNotifications(!!user.gift);

  // Track app opens
  useEffect(() => {
    if (user.gift) {
      const dayNum = getDayNumber(user.startDate);
      Analytics.appOpen(user.gift, dayNum);
    }
  }, [loaded]);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.bg }}>
        <ActivityIndicator color={Colors.accent} />
      </View>
    );
  }

  // No gift yet → onboarding
  if (!user.gift) {
    return (
      <OnboardingScreen
        onComplete={(name: string, gift: GiftType, scores: Record<string, number>) => {
          save({
            name,
            gift,
            giftScores: scores,
            startDate: new Date().toISOString().split('T')[0],
            streak: 0,
            totalDays: 0,
          });
          Analytics.quizCompleted(gift);
        }}
      />
    );
  }

  // Completed 28 days → completion screen
  const dayNum   = getDayNumber(user.startDate);
  const is28Done = user.totalDays >= 28 && dayNum === 28 && user.completedDays.includes(28);

  if (is28Done) {
    return (
      <CompletionScreen
        user={user}
        onContinue={() => {
          // Restart the 28-day cycle
          save({ startDate: new Date().toISOString().split('T')[0], completedDays: [] });
        }}
        onReset={() => {
          // Clear gift so user re-enters onboarding
          save({ gift: null, giftScores: {}, startDate: new Date().toISOString().split('T')[0], completedDays: [], streak: 0, totalDays: 0 });
        }}
      />
    );
  }

  return (
    <AppNavigator
      user={user}
      onMarkComplete={(day) => {
        markDayComplete(day);
        Analytics.dayCompleted(user.gift!, day, user.streak + 1);
        // Milestone events
        const newTotal = user.totalDays + 1;
        if ([7, 14, 21, 28].includes(newTotal)) {
          Analytics.streakMilestone(user.gift!, newTotal);
        }
      }}
      onAddEntry={(text, day, done) => {
        addJournalEntry(text, day, done);
        Analytics.journalEntry(user.gift!, day);
      }}
      onResetGift={() => {
        save({ gift: null, giftScores: {}, startDate: new Date().toISOString().split('T')[0], completedDays: [], streak: 0, totalDays: 0 });
      }}
    />
  );
}
