import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors, Spacing, Radius } from '../theme';
import { UserState } from '../hooks/useUserStore';
import { GIFTS } from '../data/gifts';
import Analytics from '../analytics';

interface Props {
  user: UserState;
  onContinue: () => void;   // restarts Day 1
  onReset: () => void;      // retake the quiz
}

export default function CompletionScreen({ user, onContinue, onReset }: Props) {
  const gift = user.gift ? GIFTS[user.gift] : null;

  useEffect(() => {
    if (user.gift) {
      Analytics.journeyCompleted(user.gift, user.totalDays);
    }
  }, []);

  if (!gift) return null;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* Gold cross */}
        <Text style={styles.cross}>✝</Text>

        {/* Headline */}
        <Text style={styles.headline}>
          You finished the 28 days.
        </Text>
        <Text style={styles.subhead}>
          That is not nothing.
        </Text>

        {/* What they built */}
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{user.totalDays}</Text>
            <Text style={styles.statLabel}>Days completed</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{user.streak}</Text>
            <Text style={styles.statLabel}>Day streak</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{user.journalEntries.length}</Text>
            <Text style={styles.statLabel}>Reflections written</Text>
          </View>
        </View>

        {/* Gift reminder */}
        <View style={[styles.giftCard, { backgroundColor: `${gift.color}12`, borderColor: `${gift.color}30` }]}>
          <Text style={styles.giftEmoji}>{gift.emoji}</Text>
          <Text style={[styles.giftName, { color: gift.color }]}>{gift.name}</Text>
          <Text style={styles.giftTagline}>{gift.tagline}</Text>
        </View>

        {/* The conviction */}
        <View style={styles.convictionBlock}>
          <Text style={styles.convictionText}>
            {`28 days ago, you didn't know what your gift was.\n\nNow you do.\n\nThat changes how you show up in every room, every relationship, every conversation where God has placed you.\n\nYou don't start over from zero. You go around again — deeper, with more clarity, and more of the gift already activated.`}
          </Text>
        </View>

        {/* Scripture */}
        <View style={styles.verseBlock}>
          <Text style={styles.verseText}>
            "Fan into flame the gift of God which is in you."
          </Text>
          <Text style={styles.verseRef}>2 Timothy 1:6</Text>
        </View>

        {/* Actions */}
        <TouchableOpacity style={styles.btnPrimary} onPress={onContinue}>
          <Text style={styles.btnPrimaryText}>Go again — Day 1 →</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} onPress={onReset}>
          <Text style={styles.btnSecondaryText}>Retake the quiz</Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          The gift doesn't change. Your understanding of it does.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:      { flex: 1, backgroundColor: Colors.bg },
  container: { padding: Spacing.lg, paddingBottom: 50, alignItems: 'center' },

  cross:    { fontSize: 48, color: Colors.gold, marginBottom: Spacing.md, marginTop: Spacing.md },
  headline: { fontSize: 30, fontWeight: '900', color: Colors.text, textAlign: 'center', letterSpacing: -0.6, marginBottom: 8 },
  subhead:  { fontSize: 18, color: Colors.muted, textAlign: 'center', marginBottom: Spacing.lg, fontStyle: 'italic' },

  statsRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg, width: '100%' },
  stat: { flex: 1, backgroundColor: Colors.card, borderRadius: Radius.md, padding: Spacing.md, alignItems: 'center', borderWidth: 1, borderColor: Colors.border },
  statNum: { fontSize: 28, fontWeight: '900', color: Colors.accent, marginBottom: 2 },
  statLabel: { fontSize: 10, color: Colors.muted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, textAlign: 'center' },

  giftCard: { borderRadius: Radius.lg, padding: Spacing.lg, alignItems: 'center', borderWidth: 1.5, marginBottom: Spacing.lg, width: '100%' },
  giftEmoji: { fontSize: 32, marginBottom: 6 },
  giftName: { fontSize: 22, fontWeight: '900', letterSpacing: -0.4, marginBottom: 4, textAlign: 'center' },
  giftTagline: { fontSize: 13, color: Colors.muted, textAlign: 'center', fontStyle: 'italic' },

  convictionBlock: { backgroundColor: Colors.card, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.border, width: '100%' },
  convictionText: { fontSize: 15, color: Colors.text, lineHeight: 24 },

  verseBlock: { backgroundColor: Colors.accent, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.lg, width: '100%', alignItems: 'center' },
  verseText: { fontStyle: 'italic', fontSize: 15, color: '#fff', textAlign: 'center', lineHeight: 22, marginBottom: 4 },
  verseRef: { fontSize: 10, fontWeight: '700', color: Colors.gold, textTransform: 'uppercase', letterSpacing: 0.8 },

  btnPrimary: { backgroundColor: Colors.accent, borderRadius: Radius.md, padding: 16, alignItems: 'center', width: '100%', marginBottom: Spacing.sm },
  btnPrimaryText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  btnSecondary: { borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.md, padding: 14, alignItems: 'center', width: '100%', marginBottom: Spacing.sm },
  btnSecondaryText: { color: Colors.muted, fontSize: 14, fontWeight: '600' },
  note: { fontSize: 12, color: Colors.muted, textAlign: 'center', fontStyle: 'italic', marginTop: 4 },
});
