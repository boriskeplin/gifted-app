import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  ScrollView, SafeAreaView, Animated,
} from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../theme';
import { GiftType, GIFTS, ALL_GIFTS } from '../data/gifts';

interface Props {
  onComplete: (name: string, gift: GiftType, scores: Record<string, number>) => void;
}

type Step = 'welcome' | 'conviction' | 'name' | 'quiz' | 'result';

const QUIZ_QUESTIONS = [
  {
    id: 'q1',
    text: 'When a friend is going through something painful, your first instinct is to...',
    answers: [
      { text: 'Pray for them intensely right then', gift: 'faith' },
      { text: 'Feel their pain deeply — it becomes yours', gift: 'mercy' },
      { text: 'Speak truth or a word of encouragement', gift: 'prophecy' },
      { text: 'Help them understand God\'s perspective', gift: 'teaching' },
    ],
  },
  {
    id: 'q2',
    text: 'In your church or community, you naturally gravitate toward...',
    answers: [
      { text: 'Interceding and praying for others', gift: 'faith' },
      { text: 'Serving practically behind the scenes', gift: 'mercy' },
      { text: 'Speaking up when something is spiritually off', gift: 'prophecy' },
      { text: 'Explaining Scripture or leading discussions', gift: 'teaching' },
    ],
  },
  {
    id: 'q3',
    text: 'People come to you most often for...',
    answers: [
      { text: 'Prayer — they know you\'ll really intercede', gift: 'faith' },
      { text: 'Presence — you listen and genuinely understand', gift: 'mercy' },
      { text: 'Insight — you see what they\'re missing', gift: 'prophecy' },
      { text: 'Wisdom — you help things make sense', gift: 'teaching' },
    ],
  },
  {
    id: 'q4',
    text: 'What would make you feel most fulfilled in your faith?',
    answers: [
      { text: 'Watching someone healed or set free through prayer', gift: 'faith' },
      { text: 'Knowing someone felt the love of Christ through you', gift: 'mercy' },
      { text: 'Speaking a word that changed someone\'s direction', gift: 'prophecy' },
      { text: 'Seeing someone\'s understanding of Scripture transform how they live', gift: 'teaching' },
    ],
  },
];

const CONVICTION_LINES = [
  'Something has been off in your faith life.',
  'You show up. You serve. You read the Word.',
  'And something still feels hollow.',
  '',
  'Not because you\'re doing it wrong.',
  'Because you\'re doing everything\n— instead of the one thing\nyou were built for.',
  '',
  '1 Corinthians 12:7 —\n"to EACH is given the manifestation\nof the Spirit."',
  '',
  'Not to the ordained.\nNot to the specially qualified.\nTo EACH.',
  '',
  'Including you.',
  'You already have a specific gift.\nYou probably don\'t know what it is.',
  'This changes that.',
];

export default function OnboardingScreen({ onComplete }: Props) {
  const [step, setStep]     = useState<Step>('welcome');
  const [name, setName]     = useState('');
  const [convIdx, setConvIdx] = useState(0);
  const [scores, setScores] = useState<Record<GiftType, number>>({ faith: 0, mercy: 0, prophecy: 0, teaching: 0 });
  const [qIdx, setQIdx]     = useState(0);
  const [topGift, setTopGift] = useState<GiftType>('faith');

  const handleAnswer = (gift: string) => {
    const newScores = { ...scores, [gift]: (scores[gift as GiftType] || 0) + 1 };
    setScores(newScores as Record<GiftType, number>);
    if (qIdx < QUIZ_QUESTIONS.length - 1) {
      setQIdx(qIdx + 1);
    } else {
      const top = (Object.entries(newScores) as [GiftType, number][])
        .sort((a, b) => b[1] - a[1])[0][0];
      setTopGift(top);
      setStep('result');
    }
  };

  const advanceConviction = () => {
    if (convIdx < CONVICTION_LINES.length - 1) {
      setConvIdx(convIdx + 1);
    } else {
      setStep('name');
    }
  };

  // ── Welcome ────────────────────────────────────────────────────────────────
  if (step === 'welcome') {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.cross}>✝</Text>
          <Text style={styles.welcomeTitle}>Gifted</Text>
          <Text style={styles.welcomeSub}>
            God gave you a specific spiritual gift before you were born.
          </Text>
          <Text style={styles.welcomeBody}>
            Not a calling. Not a personality type. A specific, supernatural assignment — already operating in you.
          </Text>
          <Text style={styles.welcomeConviction}>
            Most Christians never find out what it is.
          </Text>
          <TouchableOpacity style={styles.btnPrimary} onPress={() => setStep('conviction')}>
            <Text style={styles.btnPrimaryText}>Find mine →</Text>
          </TouchableOpacity>
          <Text style={styles.welcomeVerse}>
            "to EACH is given the manifestation of the Spirit for the common good"
            {'\n'}1 Corinthians 12:7
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ── Conviction scroll ──────────────────────────────────────────────────────
  if (step === 'conviction') {
    const line = CONVICTION_LINES[convIdx];
    const isLast = convIdx === CONVICTION_LINES.length - 1;
    return (
      <SafeAreaView style={styles.safe}>
        <TouchableOpacity style={styles.convictionScreen} onPress={advanceConviction} activeOpacity={0.9}>
          {line === '' ? (
            <View style={styles.convictionSpacer} />
          ) : (
            <Text style={line.includes('Corinthians') || line.includes('including') ? styles.convictionVerse : styles.convictionLine}>
              {line}
            </Text>
          )}
          <Text style={styles.convictionTap}>
            {isLast ? 'Begin →' : 'tap to continue'}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // ── Name ───────────────────────────────────────────────────────────────────
  if (step === 'name') {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.cross}>✝</Text>
          <Text style={styles.h1}>God knows you by name.</Text>
          <Text style={styles.sub}>What is it?</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your first name"
            placeholderTextColor={Colors.muted}
            autoFocus
          />
          <TouchableOpacity
            style={[styles.btnPrimary, !name.trim() && styles.btnDisabled]}
            onPress={() => name.trim() && setStep('quiz')}
          >
            <Text style={styles.btnPrimaryText}>Continue →</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // ── Quiz ───────────────────────────────────────────────────────────────────
  if (step === 'quiz') {
    const q        = QUIZ_QUESTIONS[qIdx];
    const progress = ((qIdx) / QUIZ_QUESTIONS.length) * 100;
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.quizContainer}>
          <View style={styles.progressWrap}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress}%` as any }]} />
            </View>
            <Text style={styles.progressLabel}>{qIdx + 1} of {QUIZ_QUESTIONS.length}</Text>
          </View>
          <Text style={styles.qText}>{q.text}</Text>
          {q.answers.map((a, i) => (
            <TouchableOpacity key={i} style={styles.answerBtn} onPress={() => handleAnswer(a.gift)}>
              <Text style={styles.answerText}>{a.text}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ── Result ─────────────────────────────────────────────────────────────────
  const gift = GIFTS[topGift];
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.resultContainer} showsVerticalScrollIndicator={false}>

        {/* The reveal */}
        <View style={[styles.revealHeader, { backgroundColor: `${gift.color}12`, borderColor: `${gift.color}30` }]}>
          <Text style={styles.revealEyebrow}>✝ Your Gift Has Always Been</Text>
          <Text style={[styles.revealGiftName, { color: gift.color }]}>{gift.name}</Text>
          <Text style={styles.revealTagline}>{gift.tagline}</Text>
        </View>

        {/* Why nothing worked */}
        <View style={styles.revelationBlock}>
          <Text style={styles.revelationTitle}>This explains a lot.</Text>
          <Text style={styles.revelationBody}>
            {`The hollow feeling after you serve.\nThe frustration when people don't respond the way you expected.\nThe gap between how hard you try and how full you feel.\n\nIt wasn't your fault. You weren't doing it wrong.\nYou were doing the right things with the wrong gift.\n\nNow you know what you're actually built for.`}
          </Text>
        </View>

        {/* Scripture */}
        <View style={styles.verseBlock}>
          <Text style={styles.verseText}>"{gift.verse}"</Text>
          <Text style={styles.verseRef}>{gift.verseRef}</Text>
        </View>

        {/* Gift description */}
        <View style={styles.giftDescBlock}>
          <Text style={styles.giftDescTitle}>What this means for you</Text>
          <Text style={styles.giftDescBody}>{gift.description}</Text>
        </View>

        {/* Shadow side — conviction */}
        <View style={styles.shadowBlock}>
          <Text style={styles.shadowTitle}>Why it's felt off</Text>
          <Text style={styles.shadowBody}>{gift.shadowSide}</Text>
        </View>

        {/* Romans 11:29 anchor */}
        <View style={styles.irrevocableBlock}>
          <Text style={styles.irrevocableText}>
            "The gifts and the calling of God are irrevocable."
          </Text>
          <Text style={styles.irrevocableRef}>Romans 11:29</Text>
          <Text style={styles.irrevocableNote}>
            God placed this in you before you were born. He has never once reconsidered.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.btnPrimary, { marginTop: Spacing.lg }]}
          onPress={() => onComplete(name.trim() || 'Friend', topGift, scores)}
        >
          <Text style={styles.btnPrimaryText}>Start walking in it →</Text>
        </TouchableOpacity>

        <Text style={styles.resultNote}>
          28-day activation plan — one day at a time.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.lg },
  cross: { fontSize: 48, color: Colors.red, marginBottom: Spacing.md },

  // Welcome
  welcomeTitle: { fontSize: 38, fontWeight: '900', color: Colors.text, letterSpacing: -1, marginBottom: Spacing.sm, textAlign: 'center' },
  welcomeSub: { fontSize: 20, fontWeight: '700', color: Colors.text, textAlign: 'center', marginBottom: Spacing.sm, lineHeight: 28 },
  welcomeBody: { fontSize: 15, color: Colors.muted, textAlign: 'center', lineHeight: 22, marginBottom: Spacing.sm, paddingHorizontal: Spacing.sm },
  welcomeConviction: { fontSize: 16, fontWeight: '700', color: Colors.accent, textAlign: 'center', marginBottom: Spacing.xl },
  welcomeVerse: { fontFamily: 'serif', fontStyle: 'italic', fontSize: 12, color: Colors.muted, textAlign: 'center', marginTop: Spacing.lg, paddingHorizontal: Spacing.md, lineHeight: 18 },

  // Conviction
  convictionScreen: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.xl, backgroundColor: Colors.bg },
  convictionLine: { fontSize: 24, fontWeight: '700', color: Colors.text, textAlign: 'center', lineHeight: 34, marginBottom: Spacing.lg },
  convictionVerse: { fontSize: 18, fontStyle: 'italic', color: Colors.accent, textAlign: 'center', lineHeight: 28, marginBottom: Spacing.lg, paddingHorizontal: Spacing.md },
  convictionSpacer: { height: Spacing.xl },
  convictionTap: { position: 'absolute', bottom: 60, fontSize: 13, color: Colors.muted, letterSpacing: 0.5 },

  // Name
  h1: { ...Typography.h1, textAlign: 'center', marginBottom: Spacing.sm },
  sub: { ...Typography.body, textAlign: 'center', marginBottom: Spacing.lg },
  input: {
    width: '100%', backgroundColor: Colors.card,
    borderWidth: 1.5, borderColor: '#D4C498', borderRadius: Radius.md,
    padding: Spacing.md, fontSize: 18, color: Colors.text, marginBottom: Spacing.md,
  },

  // Quiz
  quizContainer: { padding: Spacing.lg },
  progressWrap: { marginBottom: Spacing.lg },
  progressTrack: { height: 4, backgroundColor: '#E8DFC8', borderRadius: 2, marginBottom: 6, overflow: 'hidden' },
  progressFill: { height: 4, backgroundColor: Colors.accent, borderRadius: 2 },
  progressLabel: { fontSize: 11, color: Colors.muted, textAlign: 'right' },
  qText: { ...Typography.h2, marginBottom: Spacing.lg, lineHeight: 28 },
  answerBtn: {
    backgroundColor: Colors.btn, borderWidth: 1.5, borderColor: '#C4B99E',
    borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.sm,
  },
  answerText: { fontSize: 15, color: Colors.text, lineHeight: 22 },

  // Result
  resultContainer: { padding: Spacing.md, paddingBottom: 50 },
  revealHeader: {
    borderRadius: Radius.lg, padding: Spacing.lg, alignItems: 'center',
    borderWidth: 1.5, marginBottom: Spacing.md,
  },
  revealEyebrow: { fontSize: 11, fontWeight: '700', color: Colors.muted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  revealGiftName: { fontSize: 32, fontWeight: '900', textAlign: 'center', marginBottom: 8, letterSpacing: -0.5 },
  revealTagline: { fontSize: 15, color: Colors.muted, textAlign: 'center', fontStyle: 'italic', lineHeight: 22 },

  revelationBlock: { backgroundColor: Colors.card, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.md, borderWidth: 1, borderColor: Colors.border },
  revelationTitle: { fontSize: 18, fontWeight: '800', color: Colors.text, marginBottom: 10 },
  revelationBody: { fontSize: 14, color: Colors.muted, lineHeight: 22 },

  verseBlock: {
    backgroundColor: Colors.btn, borderLeftWidth: 3, borderLeftColor: Colors.gold,
    padding: Spacing.md, marginBottom: Spacing.md,
    borderTopRightRadius: Radius.md, borderBottomRightRadius: Radius.md,
  },
  verseText: { fontStyle: 'italic', fontSize: 14, color: Colors.text, marginBottom: 4 },
  verseRef: { fontSize: 10, fontWeight: '700', color: Colors.gold, textTransform: 'uppercase', letterSpacing: 0.8 },

  giftDescBlock: { marginBottom: Spacing.md },
  giftDescTitle: { fontSize: 16, fontWeight: '800', color: Colors.text, marginBottom: 8 },
  giftDescBody: { fontSize: 14, color: Colors.muted, lineHeight: 22 },

  shadowBlock: { backgroundColor: '#FFF5F5', borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.md, borderWidth: 1, borderColor: '#F5D5D5' },
  shadowTitle: { fontSize: 14, fontWeight: '700', color: '#8B1A1A', marginBottom: 6 },
  shadowBody: { fontSize: 13, color: '#666', lineHeight: 20 },

  irrevocableBlock: { backgroundColor: Colors.accent, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.md, alignItems: 'center' },
  irrevocableText: { fontStyle: 'italic', fontSize: 15, color: '#fff', textAlign: 'center', marginBottom: 4, lineHeight: 22 },
  irrevocableRef: { fontSize: 10, fontWeight: '700', color: Colors.gold, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  irrevocableNote: { fontSize: 12, color: 'rgba(255,255,255,0.8)', textAlign: 'center', lineHeight: 18 },

  btnPrimary: {
    width: '100%', backgroundColor: Colors.accent, borderRadius: Radius.md,
    padding: Spacing.md, alignItems: 'center', marginBottom: Spacing.sm,
  },
  btnDisabled: { opacity: 0.4 },
  btnPrimaryText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  resultNote: { fontSize: 12, color: Colors.muted, textAlign: 'center' },
});
