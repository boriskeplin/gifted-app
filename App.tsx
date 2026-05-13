import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { GiftType } from './src/data/gifts';
import { useUserStore } from './src/hooks/useUserStore';
import OnboardingScreen from './src/screens/OnboardingScreen';
import AppNavigator from './src/navigation/AppNavigator';
import { Colors } from './src/theme';

export default function App() {
  const { user, loaded, save, markDayComplete, addJournalEntry } = useUserStore();

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.bg }}>
        <ActivityIndicator color={Colors.accent} />
      </View>
    );
  }

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
        }}
      />
    );
  }

  return (
    <AppNavigator
      user={user}
      onMarkComplete={markDayComplete}
      onAddEntry={addJournalEntry}
    />
  );
}
