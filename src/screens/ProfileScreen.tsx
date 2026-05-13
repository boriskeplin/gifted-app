import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors, Spacing, Radius } from '../theme';
import { UserState } from '../hooks/useUserStore';
import { GIFTS } from '../data/gifts';

interface Props { user: UserState; }

export default function ProfileScreen({ user }: Props) {
  if (!user.gift) return null;
  const gift = GIFTS[user.gift];
  const scores = user.giftScores as Record<string, number>;
  const maxScore = Math.max(...Object.values(scores), 1);

  const giftOrder = ['faith', 'mercy', 'prophecy', 'teaching'];
  const giftLabels: Record<string, string> = {
    faith: 'Faith & Prayer',
    mercy: 'Mercy & Service',
    prophecy: 'Prophecy & Discernment',
    teaching: 'Teaching & Leadership',
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.page}>

          {/* Gift card */}
          <View style={[styles.giftHero, { backgroundColor: `${gift.color}18`, borderColor: `${gift.color}40` }]}>
            <Text style={styles.giftEmoji}>{gift.emoji}</Text>
            <Text style={styles.giftLabel}>Your Primary Gift</Text>
            <Text style={[styles.giftName, { color: gift.color }]}>{gift.name}</Text>
            <View style={styles.verseBlock}>
              <Text style={styles.verseText}>"{gift.verse}"</Text>
              <Text style={styles.verseRef}>{gift.verseRef}</Text>
            </View>
            <Text style={styles.giftDesc}>{gift.description}</Text>
          </View>

          {/* Score breakdown */}
          <Text style={styles.sectionTitle}>Your Gift Profile</Text>
          {giftOrder.map(gid => {
            const pct = scores[gid] ? Math.round((scores[gid] / maxScore) * 100) : 0;
            const g = GIFTS[gid as keyof typeof GIFTS];
            return (
              <View key={gid} style={styles.scoreItem}>
                <View style={styles.scoreRow}>
                  <Text style={styles.scoreLbl}>{giftLabels[gid]}</Text>
                  <Text style={[styles.scoreVal, { color: g.color }]}>{pct}%</Text>
                </View>
                <View style={styles.scoreTrack}>
                  <View style={[styles.scoreFill, { width: `${pct}%` as any, backgroundColor: g.color }]} />
                </View>
              </View>
            );
          })}

          {/* Progress */}
          <Text style={styles.sectionTitle}>Your Journey</Text>
          <View style={styles.statRow}>
            <View style={styles.stat}>
              <Text style={styles.statNum}>{user.streak}</Text>
              <Text style={styles.statLbl}>Day Streak</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNum}>{user.totalDays}</Text>
              <Text style={styles.statLbl}>Days Done</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNum}>{user.journalEntries.length}</Text>
              <Text style={styles.statLbl}>Reflections</Text>
            </View>
          </View>

          {/* Subscription state */}
          {!user.subscribed && (
            <View style={styles.upgradeCard}>
              <Text style={styles.upgradeLabel}>✝ Gifted Plus</Text>
              <Text style={styles.upgradeTitle}>Unlock the full experience</Text>
              <Text style={styles.upgradeSub}>Full 365-day content track, AI Spiritual Advisor, video courses, offline access.</Text>
              <TouchableOpacity style={styles.upgradeBtn}>
                <Text style={styles.upgradeBtnText}>Upgrade — £9.99/mo</Text>
              </TouchableOpacity>
              <Text style={styles.upgradeNote}>or £79/yr · Cancel anytime</Text>
            </View>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  page: { padding: Spacing.md, paddingBottom: Spacing.xl },
  giftHero: {
    borderRadius: Radius.lg, padding: Spacing.lg, marginBottom: Spacing.lg,
    alignItems: 'center', borderWidth: 1.5,
  },
  giftEmoji: { fontSize: 36, marginBottom: 8 },
  giftLabel: { fontSize: 11, fontWeight: '700', color: Colors.muted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 },
  giftName: { fontSize: 26, fontWeight: '800', textAlign: 'center', marginBottom: 14, letterSpacing: -0.5 },
  verseBlock: {
    backgroundColor: Colors.btn, borderLeftWidth: 3, borderLeftColor: Colors.gold,
    padding: Spacing.sm, marginBottom: Spacing.sm, width: '100%',
    borderTopRightRadius: Radius.sm, borderBottomRightRadius: Radius.sm,
  },
  verseText: { fontStyle: 'italic', fontSize: 13, color: Colors.text, marginBottom: 3 },
  verseRef: { fontSize: 9, fontWeight: '700', color: Colors.gold, textTransform: 'uppercase', letterSpacing: 0.8 },
  giftDesc: { fontSize: 13, color: Colors.muted, lineHeight: 20, textAlign: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: Colors.text, marginBottom: 12, marginTop: 4, letterSpacing: -0.3 },
  scoreItem: { marginBottom: 12 },
  scoreRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  scoreLbl: { fontSize: 13, fontWeight: '600', color: Colors.muted },
  scoreVal: { fontSize: 13, fontWeight: '700' },
  scoreTrack: { height: 6, backgroundColor: '#E8DFC8', borderRadius: 3, overflow: 'hidden' },
  scoreFill: { height: 6, borderRadius: 3 },
  statRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg },
  stat: {
    flex: 1, backgroundColor: Colors.card, borderRadius: Radius.md,
    padding: Spacing.md, alignItems: 'center',
    borderWidth: 1, borderColor: Colors.border,
  },
  statNum: { fontSize: 26, fontWeight: '800', color: Colors.accent },
  statLbl: { fontSize: 10, color: Colors.muted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2, textAlign: 'center' },
  upgradeCard: {
    backgroundColor: Colors.accent, borderRadius: Radius.lg,
    padding: Spacing.lg, alignItems: 'center',
  },
  upgradeLabel: { fontSize: 10, fontWeight: '700', color: 'rgba(255,255,255,.7)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  upgradeTitle: { fontSize: 20, fontWeight: '800', color: '#fff', marginBottom: 6 },
  upgradeSub: { fontSize: 13, color: 'rgba(255,255,255,.8)', textAlign: 'center', lineHeight: 20, marginBottom: 18 },
  upgradeBtn: { backgroundColor: Colors.gold, borderRadius: Radius.md, paddingHorizontal: 24, paddingVertical: 14, marginBottom: 8 },
  upgradeBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  upgradeNote: { fontSize: 11, color: 'rgba(255,255,255,.6)' },
});
