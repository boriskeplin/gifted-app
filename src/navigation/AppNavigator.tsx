import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet } from 'react-native';
import { Colors } from '../theme';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import JournalScreen from '../screens/JournalScreen';
import LibraryScreen from '../screens/LibraryScreen';
import { UserState } from '../hooks/useUserStore';
import Analytics from '../analytics';

const Tab = createBottomTabNavigator();

const ICONS: Record<string, string> = {
  Today:   '✝',
  Gift:    '🎁',
  Journal: '📔',
  Library: '📚',
};

interface Props {
  user: UserState;
  onMarkComplete: (day: number) => void;
  onAddEntry: (text: string, day: number, done: boolean) => void;
  onResetGift: () => void;
}

export default function AppNavigator({ user, onMarkComplete, onAddEntry, onResetGift }: Props) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 19, opacity: focused ? 1 : 0.4 }}>
              {ICONS[route.name]}
            </Text>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{
              fontSize: 10, fontWeight: '700',
              color: focused ? Colors.accent : Colors.muted,
              textTransform: 'uppercase', letterSpacing: 0.5,
            }}>
              {route.name}
            </Text>
          ),
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabItem,
        })}
        screenListeners={{
          tabPress: (e) => {
            const name = e.target?.split('-')[0] ?? '';
            if (name === 'Library' && user.gift) Analytics.libraryOpened(user.gift);
          },
        }}
      >
        <Tab.Screen name="Today">
          {() => (
            <HomeScreen
              user={user}
              onMarkComplete={onMarkComplete}
              onAddEntry={onAddEntry}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Gift">
          {() => (
            <ProfileScreen
              user={user}
              onResetGift={onResetGift}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Journal">
          {() => <JournalScreen user={user} onAddEntry={onAddEntry} />}
        </Tab.Screen>
        <Tab.Screen name="Library">
          {() => <LibraryScreen user={user} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.card,
    borderTopColor: 'rgba(180,140,60,0.2)',
    borderTopWidth: 1,
    paddingTop: 6,
    height: 72,
  },
  tabItem: { paddingBottom: 8 },
});
