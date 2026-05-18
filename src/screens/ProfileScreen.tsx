import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Alert, Linking, Modal,
} from 'react-native';
import { Colors, Spacing, Radius } from '../theme';
import { UserState } from '../hooks/useUserStore';
import { GIFTS, GiftType } from '../data/gifts';
import Analytics from '../analytics';

interface Props {
  user: UserState;
  onResetGift: () => void;
}

const GIFT_ORDER: GiftType[] = ['faith', 'mercy', 'prophecy', 'teaching'];

export default function ProfileScreen({ user, onResetGift }: Props) {
  const [showReset, setShowReset] = useState(false);
  if (!user.gift) return null;

  const gift    = GIFTS[user.gift];
  const scores  = user.giftScores as Record<string, number>;
  const maxScore = Math.max(...Object.values(scores), 1);

  const handleReset = () => {
    Alert.alert(
      'Retake the quiz?',
      'This will reset your gift and restart your journey. Your journal entries will be saved.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Retake',
          style: 'destructive',
          onPress: () => {
            Analytics.giftReset(user.gift!);
            onResetGift();
          },
        },
      ]
    );
  };

  const daysRemaining = Math.max(0, 28 - user.totalDays);
  const progressPct   = Math.min(Math.round((user.totalDays / 28) * 100), 100);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.page}>

          {/* Gift hero */}
          <View style={[styles.giftHero, { backgroundColor: `${gift.color}18`, borderColor: `${gift.color}40` }]}>
            <Text style={styles.giftEmoji}>{gift.emoji}</Text>
            <Text style={styles.giftLabel}>Your Spiritual Gift</Text>
            <Text style={[styles.giftName, { color: gift.color }]}>{gift.name}</Text>
            <Text style={styles.giftTagline}>{gift.tagline}</Text>
            <View style={styles.verseBlock}>
              <Text style={styles.verseText}>"{gift.verse}"</Text>
              <Text style={styles.verseRef}>{gift.verseRef}</Text>
            </View>
            <Text style={styles.giftDesc}>{gift.description}</Text>
          </View>

          {/* 28-day progress */}
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>28-Day Journey</Text>
              <Text style={styles.progressPct}>{progressPct}%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progressPct}%` as any, backgroundColor: gift.color }]} />
            </View>
            <Text style={styles.progressSub}>
              {user.totalDays} days completed
              {daysRemaining > 0 ? ` · ${daysRemaining} to go` : ' · Journey complete'}
            </Text>
          </View>

          {/* Gift profile scores */}
          <Text style={styles.sectionTitle}>Your Gift Profile</Text>
          {GIFT_ORDER.map(gid => {
            const pct = scores[gid] ? Math.round((scores[gid] / maxScore) * 100) : 0;
            const g   = GIFTS[gid];
            return (
              <View key={gid} style={styles.scoreItem}>
                <View style={styles.scoreRow}>
                  <Text style={styles.scoreLbl}>{g.name}</Text>
                  <Text style={[styles.scoreVal, { color: g.color }]}>{pct}%</Text>
                </View>
                <View style={styles.scoreTrack}>
                  <View style={[styles.scoreFill, { width: `${pct}%` as any, backgroundColor: g.color }]} />
                </View>
              </View>
            );
          })}

          {/* Journey stats */}
          <Text style={styles.sectionTitle}>Your Journey</Text>
          <View style={styles.statRow}>
            <View style={styles.stat}>
              <Text style={styles.statNum}>{user.streak}</Text>
              <Text style={styles.statLbl}>Streak</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNum}>{user.totalDays}</Text>
              <Text style={styles.statLbl}>Days done</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNum}>{user.journalEntries.length}</Text>
              <Text style={styles.statLbl}>Reflections</Text>
            </View>
          </View>

          {/* Upgrade card */}
          {!user.subscribed && (
            <View style={styles.upgradeCard}>
              <Text style={styles.upgradeLabel}>✝ Gifted Plus</Text>
              <Text style={styles.upgradeTitle}>Go deeper.</Text>
              <Text style={styles.upgradeSub}>
                Unlock all 8 gift-specific PDF guides, 5 video courses,
                AI Spiritual Advisor, and the full library.
                Built around your specific gift — not generic Christian content.
              </Text>
              <TouchableOpacity
                style={styles.upgradeBtn}
                onPress={() => {
                  Analytics.upgradeIntent('profile');
                  Linking.openURL('https://gifted.church/upgrade');
                }}
              >
                <Text style={styles.upgradeBtnText}>Unlock everything →</Text>
              </TouchableOpacity>
              <Text style={styles.upgradeNote}>
                gifted.church/upgrade
              </Text>
            </View>
          )}

          {/* Settings */}
          <Text style={styles.sectionTitle}>Settings</Text>
          <TouchableOpacity style={styles.settingRow} onPress={handleReset}>
            <Text style={styles.settingLabel}>Retake the quiz</Text>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => Linking.openURL('mailto:support@gifted.church')}
          >
            <Text style={styles.settingLabel}>Contact support</Text>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => Linking.openURL('https://gifted.church/privacy')}
          >
            <Text style={styles.settingLabel}>Privacy policy</Text>
            <Text style={styles.settingArrow}>→</Text>
          </TouchableOpacity>

          {/* Version */}
          <Text style={styles.version}>Gifted · v1.0.0</Text>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  page: { padding: Spacing.md, paddingBottom: Spacing.xl },

  giftHero: { borderRadius: Radius.lg, padding: Spacing.lg, marginBottom: Spacing.md, alignItems: 'center', borderWidth: 1.5 },
  giftEmoji: { fontSize: 36, marginBottom: 8 },
  giftLabel: { fontSize: 10, fontWeight: '700', color: Colors.muted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 },
  giftName: { fontSize: 26, fontWeight: '900', textAlign: 'center', marginBottom: 6, letterSpacing: -0.5 },
  giftTagline: { fontSize: 14, color: Colors.muted, fontStyle: 'italic', textAlign: 'center', marginBottom: Spacing.md },
  verseBlock: { backgroundColor: Colors.btn, borderLeftWidth: 3, borderLeftColor: Colors.gold, padding: Spacing.sm, marginBottom: Spacing.sm, width: '100%', borderTopRightRadius: Radius.sm, borderBottomRightRadius: Radius.sm },
  verseText: { fontStyle: 'italic', fontSize: 13, color: Colors.text, marginBottom: 3 },
  verseRef: { fontSize: 9, fontWeight: '700', color: Colors.gold, textTransform: 'uppercase', letterSpacing: 0.8 },
  giftDesc: { fontSize: 13, color: Colors.muted, lineHeight: 20, textAlign: 'center' },

  progressCard: { backgroundColor: Colors.card, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.border },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  progressTitle: { fontSize: 14, fontWeight: '700', color: Colors.text },
  progressPct: { fontSize: 14, fontWeight: '800', color: Colors.accent },
  progressTrack: { height: 8, backgroundColor: '#E8DFC8', borderRadius: 4, overflow: 'hidden', marginBottom: 6 },
  progressFill: { height: 8, borderRadius: 4 },
  progressSub: { fontSize: 11, color: Colors.muted },

  sectionTitle: { fontSize: 17, fontWeight: '800', color: Colors.text, marginBottom: 10, marginTop: Spacing.sm, letterSpacing: -0.3 },

  scoreItem: { marginBottom: 10 },
  scoreRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  scoreLbl: { fontSize: 13, fontWeight: '600', color: Colors.muted },
  scoreVal: { fontSize: 13, fontWeight: '700' },
  scoreTrack: { height: 6, backgroundColor: '#E8DFC8', borderRadius: 3, overflow: 'hidden' },
  scoreFill: { height: 6, borderRadius: 3 },

  statRow: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  stat: { flex: 1, backgroundColor: Colors.card, borderRadius: Radius.md, padding: Spacing.md, alignItems: 'center', borderWidth: 1, borderColor: Colors.border },
  statNum: { fontSize: 26, fontWeight: '900', color: Colors.accent },
  statLbl: { fontSize: 10, color: Colors.muted, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2, textAlign: 'center' },

  upgradeCard: { backgroundColor: Colors.accent, borderRadius: Radius.lg, padding: Spacing.lg, alignItems: 'center', marginBottom: Spacing.md },
  upgradeLabel: { fontSize: 10, fontWeight: '700', color: 'rgba(255,255,255,.65)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  upgradeTitle: { fontSize: 22, fontWeight: '900', color: '#fff', marginBottom: 6 },
  upgradeSub: { fontSize: 13, color: 'rgba(255,255,255,.8)', textAlign: 'center', lineHeight: 20, marginBottom: 18 },
  upgradeBtn: { backgroundColor: Colors.gold, borderRadius: Radius.md, paddingHorizontal: 24, paddingVertical: 14, marginBottom: 8 },
  upgradeBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  upgradeNote: { fontSize: 11, color: 'rgba(255,255,255,.5)' },

  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: Colors.card, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.sm, borderWidth: 1, borderColor: Colors.border },
  settingLabel: { fontSize: 14, color: Colors.text, fontWeight: '600' },
  settingArrow: { fontSize: 16, color: Colors.muted },

  version: { fontSize: 11, color: Colors.muted, textAlign: 'center', marginTop: Spacing.md },
});
