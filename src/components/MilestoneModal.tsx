import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Modal, Animated, Dimensions,
} from 'react-native';
import { Colors, Spacing, Radius } from '../theme';
import { GiftType, GIFTS } from '../data/gifts';

const { width } = Dimensions.get('window');

interface Props {
  visible: boolean;
  milestone: number;           // 7 | 14 | 21 | 28
  gift: GiftType;
  didYouKnow?: string;
  onClose: () => void;
}

const MILESTONE_COPY: Record<number, { headline: string; sub: string; verse: string; ref: string }> = {
  7: {
    headline: 'One week in.',
    sub: "Seven days of showing up. You know what your gift is. You've started walking in it. That's more than most people ever do.",
    verse: '"Fan into flame the gift of God which is in you."',
    ref: '2 Timothy 1:6',
  },
  14: {
    headline: 'Two weeks.',
    sub: "The first week showed you what your gift is. The second week showed you what it costs to walk in it consistently. You're still here.",
    verse: '"For the gifts and calling of God are irrevocable."',
    ref: 'Romans 11:29',
  },
  21: {
    headline: 'Three weeks.',
    sub: "21 days of activating what God placed in you before you were born. This is no longer just information. This is becoming practice.",
    verse: '"Now to each one the manifestation of the Spirit is given."',
    ref: '1 Corinthians 12:7',
  },
  28: {
    headline: 'You finished.',
    sub: "28 days. Every gift that operated through you this month was placed in you before you existed. It will outlast this month too.",
    verse: '"He who began a good work in you will carry it on to completion."',
    ref: 'Philippians 1:6',
  },
};

export default function MilestoneModal({ visible, milestone, gift, didYouKnow, onClose }: Props) {
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 65, friction: 8 }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
      ]).start();
    } else {
      scaleAnim.setValue(0.85);
      opacityAnim.setValue(0);
    }
  }, [visible]);

  const giftData = GIFTS[gift];
  const copy     = MILESTONE_COPY[milestone] ?? MILESTONE_COPY[7];

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Animated.View style={[styles.overlay, { opacity: opacityAnim }]}>
        <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>

          {/* Gift emoji + day badge */}
          <View style={styles.topRow}>
            <Text style={styles.giftEmoji}>{giftData.emoji}</Text>
            <View style={[styles.dayBadge, { backgroundColor: `${giftData.color}20` }]}>
              <Text style={[styles.dayBadgeText, { color: giftData.color }]}>DAY {milestone}</Text>
            </View>
          </View>

          {/* Headline */}
          <Text style={styles.headline}>{copy.headline}</Text>
          <Text style={styles.sub}>{copy.sub}</Text>

          {/* Did You Know */}
          {didYouKnow && (
            <View style={styles.dykBlock}>
              <Text style={styles.dykLabel}>DID YOU KNOW</Text>
              <Text style={styles.dykText}>{didYouKnow}</Text>
            </View>
          )}

          {/* Verse */}
          <View style={styles.verseBlock}>
            <Text style={styles.verseText}>{copy.verse}</Text>
            <Text style={styles.verseRef}>{copy.ref}</Text>
          </View>

          <TouchableOpacity style={[styles.btn, { backgroundColor: giftData.color }]} onPress={onClose}>
            <Text style={styles.btnText}>
              {milestone === 28 ? 'Go again →' : 'Keep going →'}
            </Text>
          </TouchableOpacity>

        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.bg,
    borderRadius: 24,
    padding: Spacing.lg,
    width: '100%',
    maxWidth: 380,
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  giftEmoji: { fontSize: 36 },
  dayBadge: { borderRadius: Radius.full, paddingHorizontal: 12, paddingVertical: 5 },
  dayBadgeText: { fontSize: 11, fontWeight: '800', letterSpacing: 1 },

  headline: { fontSize: 28, fontWeight: '900', color: Colors.text, letterSpacing: -0.5, marginBottom: 8 },
  sub: { fontSize: 14, color: Colors.muted, lineHeight: 22, marginBottom: Spacing.md },

  dykBlock: {
    backgroundColor: '#FFF8E1',
    borderRadius: Radius.md,
    padding: Spacing.sm,
    marginBottom: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.gold,
  },
  dykLabel: { fontSize: 9, fontWeight: '800', color: Colors.gold, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
  dykText: { fontSize: 13, color: Colors.text, lineHeight: 20 },

  verseBlock: {
    backgroundColor: Colors.accent,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    alignItems: 'center',
  },
  verseText: { fontStyle: 'italic', fontSize: 14, color: '#fff', textAlign: 'center', lineHeight: 22, marginBottom: 4 },
  verseRef: { fontSize: 9, fontWeight: '700', color: Colors.gold, textTransform: 'uppercase', letterSpacing: 0.8 },

  btn: { borderRadius: Radius.md, padding: 15, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
