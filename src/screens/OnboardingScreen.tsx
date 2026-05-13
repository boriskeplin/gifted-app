import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../theme';
import { GiftType, GIFTS, ALL_GIFTS } from '../data/gifts';

interface Props {
  onComplete: (name: string, gift: GiftType, scores: Record<string, number>) => void;
}

type Step = 'welcome' | 'name' | 'quiz' | 'result';

// Simplified onboarding quiz (full quiz lives on web funnel)
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

export default function OnboardingScreen({ onComplete }: Props) {
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [scores, setScores] = useState<Record<GiftType, number>>({ faith: 0, mercy: 0, prophecy: 0, teaching: 0 });
  const [qIdx, setQIdx] = useState(0);
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

  if (step === 'welcome') {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.cross}>✝</Text>
          <Text style={styles.welcomeTitle}>Welcome to Gifted</Text>
          <Text style={styles.welcomeSub}>
            God placed a specific spiritual gift in you before you were born. This app will help you discover it, develop it, and walk in it — every single day.
          </Text>
          <TouchableOpacity style={styles.btnPrimary} onPress={() => setStep('name')}>
            <Text style={styles.btnPrimaryText}>Begin →</Text>
          </TouchableOpacity>
          <Text style={styles.welcomeVerse}>
            "Now to each one the manifestation of the Spirit is given for the common good." — 1 Corinthians 12:7
          </Text>
        </View>
      </SafeAreaView>
    );
  }

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

  if (step === 'quiz') {
    const q = QUIZ_QUESTIONS[qIdx];
    const progress = (qIdx / QUIZ_QUESTIONS.length) * 100;
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

  // Result screen
  const gift = GIFTS[topGift];
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.resultContainer}>
        <Text style={styles.resultBadge}>✝ Your Gift</Text>
        <Text style={[styles.giftName, { color: gift.color }]}>{gift.name}</Text>
        <Text style={styles.giftTagline}>{gift.tagline}</Text>
        <View style={styles.verseBlock}>
          <Text style={styles.verseText}>"{gift.verse}"</Text>
          <Text style={styles.verseRef}>{gift.verseRef}</Text>
        </View>
        <Text style={styles.giftDesc}>{gift.description}</Text>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => onComplete(name.trim(), topGift, scores)}
        >
          <Text style={styles.btnPrimaryText}>Start My Journey →</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.lg },
  cross: { fontSize: 52, color: Colors.red, marginBottom: Spacing.md },
  welcomeTitle: { ...Typography.h1, textAlign: 'center', marginBottom: Spacing.sm },
  welcomeSub: { ...Typography.body, textAlign: 'center', marginBottom: Spacing.xl, maxWidth: 320 },
  welcomeVerse: { fontFamily: 'serif', fontStyle: 'italic', fontSize: 12, color: Colors.muted, textAlign: 'center', marginTop: Spacing.lg, paddingHorizontal: Spacing.md },
  h1: { ...Typography.h1, textAlign: 'center', marginBottom: Spacing.sm },
  sub: { ...Typography.body, textAlign: 'center', marginBottom: Spacing.lg },
  input: {
    width: '100%', backgroundColor: Colors.card,
    borderWidth: 1.5, borderColor: '#D4C498', borderRadius: Radius.md,
    padding: Spacing.md, fontSize: 18, color: Colors.text, marginBottom: Spacing.md,
  },
  btnPrimary: {
    width: '100%', backgroundColor: Colors.accent, borderRadius: Radius.md,
    padding: Spacing.md, alignItems: 'center', marginBottom: Spacing.sm,
  },
  btnDisabled: { opacity: 0.4 },
  btnPrimaryText: { color: '#fff', fontSize: 16, fontWeight: '700' },
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
  resultContainer: { padding: Spacing.lg, alignItems: 'center' },
  resultBadge: {
    backgroundColor: 'rgba(27,75,138,0.1)', color: Colors.accent,
    borderRadius: Radius.full, paddingHorizontal: 14, paddingVertical: 5,
    fontSize: 12, fontWeight: '700', marginBottom: Spacing.md,
  },
  giftName: { fontSize: 30, fontWeight: '800', marginBottom: 6, letterSpacing: -0.5, textAlign: 'center' },
  giftTagline: { fontSize: 16, color: Colors.muted, textAlign: 'center', marginBottom: Spacing.lg },
  verseBlock: {
    backgroundColor: Colors.btn, borderLeftWidth: 3, borderLeftColor: Colors.gold,
    padding: Spacing.md, marginBottom: Spacing.lg, width: '100%',
    borderTopRightRadius: Radius.md, borderBottomRightRadius: Radius.md,
  },
  verseText: { fontStyle: 'italic', fontSize: 14, color: Colors.text, marginBottom: 4 },
  verseRef: { fontSize: 10, fontWeight: '700', color: Colors.gold, textTransform: 'uppercase', letterSpacing: 0.8 },
  giftDesc: { ...Typography.body, textAlign: 'center', marginBottom: Spacing.xl },
});
