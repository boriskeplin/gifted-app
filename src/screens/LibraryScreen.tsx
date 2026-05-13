import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import { Colors, Spacing, Radius } from '../theme';
import { UserState } from '../hooks/useUserStore';

interface Props { user: UserState; }

const LIBRARY_ITEMS = [
  { id: '1', icon: '🙏', title: "The Intercessor's Prayer Guide", sub: '21-day structured prayer plan', free: false },
  { id: '2', icon: '💍', title: 'Marriage & Family Covenant Guide', sub: 'Biblical covenant home framework', free: false },
  { id: '3', icon: '📖', title: 'Scripture Memory System', sub: '52 key verses — one per week', free: false },
  { id: '4', icon: '⚔️', title: 'Spiritual Warfare Handbook', sub: 'Armor of God + breaking strongholds', free: false },
  { id: '5', icon: '✝', title: 'Identity in Christ Workbook', sub: '40 Scripture-based declarations', free: false },
  { id: '6', icon: '🌍', title: 'The Great Commission Blueprint', sub: 'Gift-specific evangelism guide', free: false },
  { id: '7', icon: '👁', title: 'Prophetic Activation Guide', sub: 'Hearing God + testing what you receive', free: false },
  { id: '8', icon: '🕊', title: 'The Healing & Miracles Guide', sub: 'Praying for the sick with biblical authority', free: false },
];

const VIDEO_COURSES = [
  { id: 'v1', icon: '🎬', title: 'Walking in Your Gift — Week 1', sub: '4 lessons · 45 min total', free: true },
  { id: 'v2', icon: '🎬', title: 'Prayer That Moves Heaven', sub: '6 lessons · 1hr 10min total', free: false },
  { id: 'v3', icon: '🎬', title: 'The Prophetic Life', sub: '5 lessons · 55 min total', free: false },
];

export default function LibraryScreen({ user }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.page}>

          {/* Guides */}
          <Text style={styles.sectionTitle}>✝ PDF Guides</Text>
          <Text style={styles.sectionSub}>8 in-depth biblical resources — download and keep forever.</Text>
          {LIBRARY_ITEMS.map(item => (
            <TouchableOpacity key={item.id} style={styles.libItem} activeOpacity={0.7}
              onPress={() => !user.subscribed && !item.free ? null : null}>
              <View style={styles.libIcon}><Text style={styles.libIconText}>{item.icon}</Text></View>
              <View style={styles.libInfo}>
                <Text style={styles.libTitle}>{item.title}</Text>
                <Text style={styles.libSub}>{item.sub}</Text>
              </View>
              {user.subscribed || item.free
                ? <Text style={styles.libArrow}>→</Text>
                : <Text style={styles.libLock}>🔒</Text>
              }
            </TouchableOpacity>
          ))}

          {/* Video Courses */}
          <Text style={[styles.sectionTitle, { marginTop: Spacing.lg }]}>🎬 Video Courses</Text>
          <Text style={styles.sectionSub}>Expert-led lessons for every spiritual gift.</Text>
          {VIDEO_COURSES.map(item => (
            <TouchableOpacity key={item.id} style={styles.libItem} activeOpacity={0.7}>
              <View style={[styles.libIcon, { backgroundColor: 'rgba(139,26,26,.08)' }]}><Text style={styles.libIconText}>{item.icon}</Text></View>
              <View style={styles.libInfo}>
                <Text style={styles.libTitle}>{item.title}</Text>
                <Text style={styles.libSub}>{item.sub}</Text>
              </View>
              {item.free
                ? <Text style={[styles.libArrow, { color: Colors.accent }]}>Free</Text>
                : <Text style={styles.libLock}>🔒</Text>
              }
            </TouchableOpacity>
          ))}

          {/* AI Advisor */}
          <View style={styles.aiCard}>
            <Text style={styles.aiLabel}>✝ Gifted Plus Feature</Text>
            <Text style={styles.aiTitle}>AI Spiritual Advisor</Text>
            <Text style={styles.aiSub}>Ask anything about your spiritual gift, Scripture, prayer, or calling. Trained on all 8 guides and thousands of biblical references.</Text>
            {user.subscribed
              ? <TouchableOpacity style={styles.aiBtn}><Text style={styles.aiBtnText}>Chat with Advisor →</Text></TouchableOpacity>
              : <TouchableOpacity style={styles.upgradeBtn}><Text style={styles.upgradeBtnText}>Upgrade to Plus — £9.99/mo</Text></TouchableOpacity>
            }
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  page: { padding: Spacing.md, paddingBottom: Spacing.xl },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: Colors.text, marginBottom: 4, letterSpacing: -0.3 },
  sectionSub: { fontSize: 13, color: Colors.muted, marginBottom: Spacing.sm, lineHeight: 20 },
  libItem: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    backgroundColor: Colors.card, borderRadius: Radius.md, padding: Spacing.md,
    marginBottom: Spacing.sm, borderWidth: 1, borderColor: Colors.border,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 6, elevation: 2,
  },
  libIcon: { width: 44, height: 44, borderRadius: 10, backgroundColor: 'rgba(27,75,138,.08)', alignItems: 'center', justifyContent: 'center' },
  libIconText: { fontSize: 20 },
  libInfo: { flex: 1 },
  libTitle: { fontSize: 14, fontWeight: '700', color: Colors.text, marginBottom: 2 },
  libSub: { fontSize: 11, color: Colors.muted },
  libArrow: { fontSize: 16, color: Colors.muted },
  libLock: { fontSize: 16 },
  aiCard: { backgroundColor: Colors.accent, borderRadius: Radius.lg, padding: Spacing.lg, marginTop: Spacing.md },
  aiLabel: { fontSize: 10, fontWeight: '700', color: 'rgba(255,255,255,.65)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  aiTitle: { fontSize: 20, fontWeight: '800', color: '#fff', marginBottom: 6 },
  aiSub: { fontSize: 13, color: 'rgba(255,255,255,.8)', lineHeight: 20, marginBottom: 16 },
  aiBtn: { backgroundColor: Colors.gold, borderRadius: Radius.md, padding: 13, alignItems: 'center' },
  aiBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  upgradeBtn: { backgroundColor: 'rgba(255,255,255,.15)', borderRadius: Radius.md, padding: 13, alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
});
