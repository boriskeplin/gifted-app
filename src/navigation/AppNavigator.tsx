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

const Tab = createBottomTabNavigator();

const Icon = ({ name, focused }: { name: string; focused: boolean }) => {
  const icons: Record<string, string> = { Home: '🏠', Profile: '✝', Journal: '📔', Library: '📚' };
  return <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.45 }}>{icons[name]}</Text>;
};

interface Props {
  user: UserState;
  onMarkComplete: (day: number) => void;
  onAddEntry: (text: string, day: number, done: boolean) => void;
}

export default function AppNavigator({ user, onMarkComplete, onAddEntry }: Props) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => <Icon name={route.name} focused={focused} />,
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 10, fontWeight: '700', color: focused ? Colors.accent : Colors.muted, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              {route.name}
            </Text>
          ),
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabItem,
        })}
      >
        <Tab.Screen name="Home">
          {() => <HomeScreen user={user} onMarkComplete={onMarkComplete} />}
        </Tab.Screen>
        <Tab.Screen name="Profile">
          {() => <ProfileScreen user={user} />}
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
