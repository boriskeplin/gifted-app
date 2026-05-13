import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors, Spacing, Radius } from '../theme';
import { UserState } from '../hooks/useUserStore';
import { getDayContent, getDayNumber } from '../data/content';
import { GIFTS } from '../data/gifts';

interface Props {
  user: UserState;
  onMarkComplete: (day: number) => void;
}

export default function HomeScreen({ user, onMarkComplete }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!user.gift) return null;

  const dayNum = getDayNumber(user.startDate);
  const content = getDayContent(user.gift, dayNum);
  const gift = GIFTS[user.gift];
  const isDone = user.completedDays.includes(dayNum);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning{user.name ? `, ${user.name}` : ''} ✝</Text>
            <Text style={styles.dateText}>Day {dayNum} · {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</Text>
          </View>
          <View style={styles.streakBadge}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakNum}>{user.streak}</Text>
          </View>
        </View>

        <View style={styles.page}>
          {/* Gift badge */}
          <View style={[styles.giftBadge, { backgroundColor: `${gift.color}15` }]}>
            <Text style={styles.giftBadgeEmoji}>{gift.emoji}</Text>
            <Text style={[styles.giftBadgeText, { color: gift.color }]}>{gift.name}</Text>
          </View>

          {/* Today's Scripture */}
          <View style={styles.scriptureBlock}>
            <Text style={styles.scriptureLabel}>✝ Today's Scripture</Text>
            <Text style={styles.scriptureText}>"{content.scripture}"</Text>
            <Text style={styles.scriptureRef}>{content.scriptureRef}</Text>
          </View>

          {/* Today's Devotional */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => setExpanded(expanded === 'devot' ? null : 'devot')}
            activeOpacity={0.8}
          >
            <Text style={styles.cardLabel}>Today's Devotional</Text>
            <Text style={styles.cardTitle}>{content.title}</Text>
            {expanded === 'devot' && (
              <Text style={styles.cardBody}>{content.devotional}</Text>
            )}
            <Text style={styles.expandHint}>{expanded === 'devot' ? '▲ less' : '▼ read'}</Text>
          </TouchableOpacity>

          {/* Today's Practice */}
          <View style={[styles.card, isDone && styles.cardDone]}>
            <Text style={styles.cardLabel}>{content.practiceLabel}</Text>
            <Text style={styles.cardTitle}>Today's Practice</Text>
            <Text style={styles.cardBody}>{content.practice}</Text>
            {!isDone ? (
              <TouchableOpacity style={styles.completeBtn} onPress={() => onMarkComplete(dayNum)}>
                <Text style={styles.completeBtnText}>✓ Mark Complete</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.doneBadge}>
                <Text style={styles.doneBadgeText}>✓ Completed today</Text>
              </View>
            )}
          </View>

          {/* Prayer */}
          <TouchableOpacity
            style={[styles.card, styles.prayerCard]}
            onPress={() => setExpanded(expanded === 'prayer' ? null : 'prayer')}
            activeOpacity={0.8}
          >
            <Text style={[styles.cardLabel, { color: Colors.red }]}>✝ Prayer</Text>
            <Text style={styles.cardTitle}>Pray With Us</Text>
            {expanded === 'prayer' && (
              <Text style={[styles.cardBody, { fontStyle: 'italic' }]}>"{content.prayer}"</Text>
            )}
            <Text style={styles.expandHint}>{expanded === 'prayer' ? '▲ close' : '▼ open'}</Text>
          </TouchableOpacity>

          {/* Stats */}
          <View style={styles.statRow}>
            <View style={styles.stat}>
              <Text style={styles.statNum}>{user.streak}</Text>
              <Text style={styles.statLbl}>Day Streak</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNum}>{user.totalDays}</Text>
              <Text style={styles.statLbl}>Days Complete</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNum}>{user.journalEntries.length}</Text>
              <Text style={styles.statLbl}>Journal Entries</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.md, paddingTop: Spacing.md, paddingBottom: Spacing.sm,
  },
  greeting: { fontSize: 18, fontWeight: '700', color: Colors.text },
  dateText: { fontSize: 12, color: Colors.muted, marginTop: 2 },
  streakBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.btn, borderRadius: Radius.full, paddingHorizontal: 12, paddingVertical: 6,
  },
  streakIcon: { fontSize: 14 },
  streakNum: { fontSize: 15, fontWeight: '800', color: Colors.gold },
  page: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xl },
  giftBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    alignSelf: 'flex-start', borderRadius: Radius.full,
    paddingHorizontal: 12, paddingVertical: 5, marginBottom: Spacing.sm,
  },
  giftBadgeEmoji: { fontSize: 14 },
  giftBadgeText: { fontSize: 12, fontWeight: '700' },
  scriptureBlock: {
    backgroundColor: Colors.btn, borderLeftWidth: 3, borderLeftColor: Colors.gold,
    padding: Spacing.md, marginBottom: Spacing.sm,
    borderTopRightRadius: Radius.md, borderBottomRightRadius: Radius.md,
  },
  scriptureLabel: { fontSize: 10, fontWeight: '700', color: Colors.gold, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 },
  scriptureText: { fontStyle: 'italic', fontSize: 14, color: Colors.text, lineHeight: 22, marginBottom: 4 },
  scriptureRef: { fontSize: 10, fontWeight: '700', color: Colors.gold, textTransform: 'uppercase', letterSpacing: 0.8 },
  card: {
    backgroundColor: Colors.card, borderRadius: Radius.md,
    padding: Spacing.md, marginBottom: Spacing.sm,
    borderWidth: 1, borderColor: Colors.border,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 2,
  },
  cardDone: { borderColor: 'rgba(27,75,138,0.3)', backgroundColor: 'rgba(27,75,138,0.04)' },
  prayerCard: { borderLeftWidth: 3, borderLeftColor: Colors.red },
  cardLabel: { fontSize: 10, fontWeight: '700', color: Colors.muted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: 8 },
  cardBody: { fontSize: 14, color: Colors.muted, lineHeight: 22, marginBottom: 10 },
  expandHint: { fontSize: 11, color: Colors.muted, textAlign: 'right' },
  completeBtn: {
    backgroundColor: Colors.accent, borderRadius: Radius.sm,
    padding: Spacing.sm, alignItems: 'center', marginTop: Spacing.sm,
  },
  completeBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  doneBadge: {
    backgroundColor: 'rgba(27,75,138,0.08)', borderRadius: Radius.sm,
    padding: Spacing.sm, alignItems: 'center', marginTop: Spacing.sm,
  },
  doneBadgeText: { color: Colors.accent, fontSize: 13, fontWeight: '600' },
  statRow: { flexDirection: 'row', gap: Spacing.sm, marginTop: Spacing.sm },
  stat: {
    flex: 1, backgroundColor: Colors.card, borderRadius: Radius.md,
    padding: Spacing.md, alignItems: 'center',
    borderWidth: 1, borderColor: Colors.border,
  },
  statNum: { fontSize: 26, fontWeight: '800', color: Colors.accent },
  statLbl: { fontSize: 10, color: Colors.muted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2, textAlign: 'center' },
});
