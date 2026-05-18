import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Modal, TextInput, Linking,
} from 'react-native';
import { Colors, Spacing, Radius } from '../theme';
import { UserState } from '../hooks/useUserStore';
import { getDayContent, getDayNumber, isContentLocked } from '../data/content';
import { GIFTS } from '../data/gifts';

interface Props {
  user: UserState;
  onMarkComplete: (day: number) => void;
  onAddEntry: (text: string, dayNumber: number, practiceCompleted: boolean) => void;
}

export default function HomeScreen({ user, onMarkComplete, onAddEntry }: Props) {
  const [expanded, setExpanded]       = useState<string | null>(null);
  const [showJournal, setShowJournal] = useState(false);
  const [journalText, setJournalText] = useState('');
  const [showPaywall, setShowPaywall] = useState(false);

  if (!user.gift) return null;

  const dayNum  = getDayNumber(user.startDate);
  const content = getDayContent(user.gift, dayNum);
  const gift    = GIFTS[user.gift];
  const isDone  = user.completedDays.includes(dayNum);
  const locked  = isContentLocked(dayNum, !!user.subscribed);

  const submitJournal = () => {
    if (journalText.trim()) {
      onAddEntry(journalText.trim(), dayNum, isDone);
      setJournalText('');
      setShowJournal(false);
    }
  };

  // ── Paywall modal ──────────────────────────────────────────────────────────
  const PaywallModal = () => (
    <Modal visible={showPaywall} animationType="slide" transparent>
      <View style={styles.paywallOverlay}>
        <View style={styles.paywallCard}>
          <Text style={styles.paywallCross}>✝</Text>
          <Text style={styles.paywallTitle}>Day 8 is waiting for you.</Text>
          <Text style={styles.paywallSub}>
            The first 7 days gave you the foundation.{'\n'}
            Days 8–28 go deeper into your specific gift.{'\n'}
            This is where it starts to change things.
          </Text>
          <View style={styles.paywallFeatures}>
            {[
              '21 more days of gift-specific devotionals',
              'Deeper practices built around your gift',
              'Scripture you\'ve never been taught',
              'Prayers that sound like you, not a bulletin',
            ].map((f, i) => (
              <View key={i} style={styles.paywallFeatureRow}>
                <Text style={styles.paywallCheck}>✓</Text>
                <Text style={styles.paywallFeatureText}>{f}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={styles.paywallBtn}
            onPress={() => {
              setShowPaywall(false);
              Linking.openURL('https://gifted.church/upgrade');
            }}
          >
            <Text style={styles.paywallBtnText}>Unlock Full Journey →</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowPaywall(false)} style={styles.paywallClose}>
            <Text style={styles.paywallCloseText}>not yet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // ── Locked state ───────────────────────────────────────────────────────────
  if (locked) {
    return (
      <SafeAreaView style={styles.safe}>
        <PaywallModal />
        <View style={styles.lockedContainer}>
          <Text style={styles.giftEmoji}>{gift.emoji}</Text>
          <Text style={styles.lockedDay}>Day {dayNum}</Text>
          <Text style={styles.lockedTitle}>You've completed the foundation.</Text>
          <Text style={styles.lockedSub}>
            {`Days 1–7 showed you what your gift is.\nDays 8–28 show you how to walk in it.\n\nThis is where the real activation happens.`}
          </Text>
          <TouchableOpacity style={styles.btnPrimary} onPress={() => setShowPaywall(true)}>
            <Text style={styles.btnPrimaryText}>Continue my journey →</Text>
          </TouchableOpacity>
          <Text style={styles.lockedNote}>
            "Fan into flame the gift of God which is in you." — 2 Timothy 1:6
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <PaywallModal />

      {/* Journal modal */}
      <Modal visible={showJournal} animationType="slide" transparent>
        <View style={styles.journalOverlay}>
          <View style={styles.journalCard}>
            <Text style={styles.journalTitle}>Day {dayNum} Reflection</Text>
            <TextInput
              style={styles.journalInput}
              multiline
              value={journalText}
              onChangeText={setJournalText}
              placeholder="What's God saying to you through this today?"
              placeholderTextColor={Colors.muted}
              autoFocus
            />
            <TouchableOpacity style={styles.btnPrimary} onPress={submitJournal}>
              <Text style={styles.btnPrimaryText}>Save reflection</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowJournal(false)} style={{ marginTop: 10, alignItems: 'center' }}>
              <Text style={{ color: Colors.muted, fontSize: 13 }}>cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Good morning{user.name ? `, ${user.name}` : ''} ✝
            </Text>
            <Text style={styles.dateText}>
              Day {dayNum} · {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
            </Text>
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

          {/* Did You Know — milestone days */}
          {content.didYouKnow && (
            <TouchableOpacity
              style={styles.dykCard}
              onPress={() => setExpanded(expanded === 'dyk' ? null : 'dyk')}
              activeOpacity={0.8}
            >
              <View style={styles.dykHeader}>
                <Text style={styles.dykBadge}>DID YOU KNOW</Text>
                <Text style={styles.dykChevron}>{expanded === 'dyk' ? '▲' : '▼'}</Text>
              </View>
              {expanded === 'dyk' && (
                <Text style={styles.dykBody}>{content.didYouKnow}</Text>
              )}
              {expanded !== 'dyk' && (
                <Text style={styles.dykPreview} numberOfLines={1}>
                  {content.didYouKnow?.substring(0, 70)}...
                </Text>
              )}
            </TouchableOpacity>
          )}

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
            style={styles.prayerCard}
            onPress={() => setExpanded(expanded === 'prayer' ? null : 'prayer')}
            activeOpacity={0.8}
          >
            <Text style={styles.prayerLabel}>✝ Today's Prayer</Text>
            {expanded === 'prayer' && (
              <Text style={styles.prayerBody}>{content.prayer}</Text>
            )}
            <Text style={styles.expandHint}>{expanded === 'prayer' ? '▲ close' : '▼ pray'}</Text>
          </TouchableOpacity>

          {/* Journal button */}
          <TouchableOpacity style={styles.journalBtn} onPress={() => setShowJournal(true)}>
            <Text style={styles.journalBtnText}>+ Add reflection</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: Colors.bg },
  page:    { padding: Spacing.md, paddingBottom: Spacing.xl },
  header:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: Spacing.md, paddingBottom: 0 },
  greeting: { fontSize: 22, fontWeight: '800', color: Colors.text, letterSpacing: -0.3 },
  dateText: { fontSize: 12, color: Colors.muted, marginTop: 2 },
  streakBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.card, borderRadius: Radius.full, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: Colors.border },
  streakIcon: { fontSize: 14, marginRight: 3 },
  streakNum: { fontSize: 16, fontWeight: '800', color: Colors.text },

  giftBadge: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', borderRadius: Radius.full, paddingHorizontal: 12, paddingVertical: 5, marginBottom: Spacing.sm },
  giftBadgeEmoji: { fontSize: 14, marginRight: 5 },
  giftBadgeText: { fontSize: 12, fontWeight: '700' },

  scriptureBlock: { backgroundColor: Colors.card, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.sm, borderWidth: 1, borderColor: Colors.border },
  scriptureLabel: { fontSize: 10, fontWeight: '700', color: Colors.accent, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 },
  scriptureText: { fontStyle: 'italic', fontSize: 16, color: Colors.text, lineHeight: 24, marginBottom: 4 },
  scriptureRef: { fontSize: 10, fontWeight: '700', color: Colors.gold, textTransform: 'uppercase', letterSpacing: 0.8 },

  // Did You Know
  dykCard: { backgroundColor: '#FFF8E1', borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.sm, borderWidth: 1.5, borderColor: Colors.gold },
  dykHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  dykBadge: { fontSize: 9, fontWeight: '800', color: Colors.gold, textTransform: 'uppercase', letterSpacing: 1 },
  dykChevron: { fontSize: 10, color: Colors.gold },
  dykPreview: { fontSize: 12, color: Colors.muted, lineHeight: 18 },
  dykBody: { fontSize: 13, color: Colors.text, lineHeight: 20, marginTop: 4 },

  card: { backgroundColor: Colors.card, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.sm, borderWidth: 1, borderColor: Colors.border },
  cardDone: { borderColor: '#2E7D3250', backgroundColor: '#F1F8F1' },
  cardLabel: { fontSize: 10, fontWeight: '700', color: Colors.muted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 },
  cardTitle: { fontSize: 16, fontWeight: '800', color: Colors.text, marginBottom: 8, letterSpacing: -0.2 },
  cardBody: { fontSize: 14, color: Colors.muted, lineHeight: 22, marginBottom: 10 },
  expandHint: { fontSize: 11, color: Colors.accent, fontWeight: '600' },
  completeBtn: { backgroundColor: Colors.accent, borderRadius: Radius.sm, padding: 12, alignItems: 'center', marginTop: 4 },
  completeBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  doneBadge: { backgroundColor: '#E8F5E9', borderRadius: Radius.sm, padding: 10, alignItems: 'center', marginTop: 4 },
  doneBadgeText: { color: '#2E7D32', fontSize: 13, fontWeight: '700' },

  prayerCard: { backgroundColor: `${Colors.accent}10`, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.sm, borderWidth: 1, borderColor: `${Colors.accent}25` },
  prayerLabel: { fontSize: 10, fontWeight: '700', color: Colors.accent, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 },
  prayerBody: { fontSize: 14, color: Colors.text, lineHeight: 22, fontStyle: 'italic', marginTop: 4 },

  journalBtn: { borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.md, padding: Spacing.md, alignItems: 'center', borderStyle: 'dashed' },
  journalBtnText: { color: Colors.muted, fontSize: 14, fontWeight: '600' },

  // Locked
  lockedContainer: { flex: 1, padding: Spacing.lg, alignItems: 'center', justifyContent: 'center' },
  giftEmoji: { fontSize: 40, marginBottom: Spacing.sm },
  lockedDay: { fontSize: 13, fontWeight: '700', color: Colors.muted, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  lockedTitle: { fontSize: 24, fontWeight: '900', color: Colors.text, textAlign: 'center', marginBottom: 12, letterSpacing: -0.5 },
  lockedSub: { fontSize: 14, color: Colors.muted, textAlign: 'center', lineHeight: 22, marginBottom: Spacing.xl },
  lockedNote: { fontSize: 12, color: Colors.muted, textAlign: 'center', fontStyle: 'italic', marginTop: Spacing.md, paddingHorizontal: Spacing.md, lineHeight: 18 },

  // Paywall modal
  paywallOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  paywallCard: { backgroundColor: Colors.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: Spacing.lg, paddingBottom: 40 },
  paywallCross: { fontSize: 28, textAlign: 'center', marginBottom: 8 },
  paywallTitle: { fontSize: 22, fontWeight: '900', color: Colors.text, textAlign: 'center', marginBottom: 8, letterSpacing: -0.4 },
  paywallSub: { fontSize: 14, color: Colors.muted, textAlign: 'center', lineHeight: 22, marginBottom: Spacing.md },
  paywallFeatures: { marginBottom: Spacing.md },
  paywallFeatureRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  paywallCheck: { color: Colors.accent, fontWeight: '800', marginRight: 8, marginTop: 1 },
  paywallFeatureText: { fontSize: 14, color: Colors.text, lineHeight: 20, flex: 1 },
  paywallBtn: { backgroundColor: Colors.accent, borderRadius: Radius.md, padding: 16, alignItems: 'center', marginBottom: 10 },
  paywallBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  paywallClose: { alignItems: 'center', padding: 8 },
  paywallCloseText: { color: Colors.muted, fontSize: 13 },

  // Journal modal
  journalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  journalCard: { backgroundColor: Colors.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: Spacing.lg, paddingBottom: 40 },
  journalTitle: { fontSize: 18, fontWeight: '800', color: Colors.text, marginBottom: 12 },
  journalInput: { backgroundColor: Colors.card, borderRadius: Radius.md, padding: Spacing.md, fontSize: 15, color: Colors.text, minHeight: 120, textAlignVertical: 'top', borderWidth: 1, borderColor: Colors.border, marginBottom: 12 },

  btnPrimary: { backgroundColor: Colors.accent, borderRadius: Radius.md, padding: 16, alignItems: 'center', marginBottom: 8, width: '100%' },
  btnPrimaryText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
