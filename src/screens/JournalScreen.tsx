import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Colors, Spacing, Radius } from '../theme';
import { UserState, JournalEntry } from '../hooks/useUserStore';
import { getDayContent, getDayNumber } from '../data/content';
import { GIFTS } from '../data/gifts';

interface Props {
  user: UserState;
  onAddEntry: (text: string, day: number, practiceComplete: boolean) => void;
}

const PROMPTS = [
  "What did God show you through today's scripture?",
  "Where did you feel your gift operating this week?",
  "What are you believing God for that hasn't arrived yet?",
  "Write a prayer for someone who came to mind today.",
  "What would it look like to fully walk in your gift this week?",
];

export default function JournalScreen({ user, onAddEntry }: Props) {
  const [text, setText]             = useState('');
  const [saved, setSaved]           = useState(false);
  const [promptIdx, setPromptIdx]   = useState(0);
  const [showPrompts, setShowPrompts] = useState(false);

  const dayNum  = getDayNumber(user.startDate);
  const content = user.gift ? getDayContent(user.gift, dayNum) : null;
  const gift    = user.gift ? GIFTS[user.gift] : null;

  const handleSave = () => {
    if (!text.trim()) return;
    onAddEntry(text.trim(), dayNum, user.completedDays.includes(dayNum));
    setText('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const usePrompt = () => {
    setText(PROMPTS[promptIdx] + '\n\n');
    setPromptIdx((promptIdx + 1) % PROMPTS.length);
    setShowPrompts(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.page}>

            <Text style={styles.pageTitle}>Journal</Text>
            <Text style={styles.pageSub}>
              Write what God is doing. These become your record.
            </Text>

            {/* Today's scripture reminder */}
            {content && (
              <View style={styles.todayScripture}>
                <Text style={styles.todayScriptureLabel}>Today's Scripture</Text>
                <Text style={styles.todayScriptureText}>"{content.scripture}"</Text>
                <Text style={styles.todayScriptureRef}>{content.scriptureRef}</Text>
              </View>
            )}

            {/* New entry */}
            <View style={styles.newEntry}>
              <View style={styles.entryHeaderRow}>
                <Text style={styles.entryDateLabel}>
                  Day {dayNum} · {new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                </Text>
                {gift && (
                  <View style={[styles.giftTag, { backgroundColor: `${gift.color}15` }]}>
                    <Text style={[styles.giftTagText, { color: gift.color }]}>{gift.emoji} {gift.name}</Text>
                  </View>
                )}
              </View>

              <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                placeholder="Write freely — a prayer, a reflection, what God showed you..."
                placeholderTextColor={Colors.muted}
                multiline
                textAlignVertical="top"
              />

              <View style={styles.entryActions}>
                <TouchableOpacity
                  style={styles.promptBtn}
                  onPress={() => setShowPrompts(!showPrompts)}
                >
                  <Text style={styles.promptBtnText}>Need a prompt?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.saveBtn, !text.trim() && styles.saveBtnDisabled]}
                  onPress={handleSave}
                  disabled={!text.trim()}
                >
                  <Text style={styles.saveBtnText}>{saved ? '✓ Saved' : 'Save'}</Text>
                </TouchableOpacity>
              </View>

              {showPrompts && (
                <TouchableOpacity style={styles.promptSuggestion} onPress={usePrompt}>
                  <Text style={styles.promptSuggestionText}>"{PROMPTS[promptIdx]}"</Text>
                  <Text style={styles.promptTap}>tap to use →</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Past entries */}
            {user.journalEntries.length > 0 ? (
              <>
                <Text style={styles.pastTitle}>Past Entries</Text>
                {user.journalEntries.map((entry: JournalEntry) => {
                  const entryContent = user.gift
                    ? getDayContent(user.gift, entry.dayNumber)
                    : null;
                  return (
                    <View key={entry.id} style={styles.entryCard}>
                      <View style={styles.entryHeader}>
                        <Text style={styles.entryDate}>{entry.date}</Text>
                        <Text style={styles.entryDay}>Day {entry.dayNumber}</Text>
                      </View>
                      {/* Scripture from that day */}
                      {entryContent && (
                        <View style={styles.entryScripture}>
                          <Text style={styles.entryScriptureText}>"{entryContent.scripture}"</Text>
                          <Text style={styles.entryScriptureRef}>{entryContent.scriptureRef}</Text>
                        </View>
                      )}
                      <Text style={styles.entryText}>{entry.text}</Text>
                      {entry.practiceCompleted && (
                        <Text style={styles.practiceTag}>✓ Practice completed that day</Text>
                      )}
                    </View>
                  );
                })}
              </>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>✝</Text>
                <Text style={styles.emptyTitle}>Your journal is empty.</Text>
                <Text style={styles.emptySub}>
                  Start writing. These entries become the record of God working in you through your gift.
                  {'\n\n'}You'll want to have this a year from now.
                </Text>
              </View>
            )}

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  page: { padding: Spacing.md, paddingBottom: Spacing.xl },

  pageTitle: { fontSize: 26, fontWeight: '900', color: Colors.text, letterSpacing: -0.5, marginBottom: 4 },
  pageSub: { fontSize: 13, color: Colors.muted, marginBottom: Spacing.md, lineHeight: 20 },

  todayScripture: {
    backgroundColor: `${Colors.accent}08`, borderRadius: Radius.md,
    padding: Spacing.sm, marginBottom: Spacing.md,
    borderLeftWidth: 3, borderLeftColor: Colors.gold,
  },
  todayScriptureLabel: { fontSize: 9, fontWeight: '700', color: Colors.gold, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 },
  todayScriptureText: { fontStyle: 'italic', fontSize: 13, color: Colors.text, lineHeight: 20, marginBottom: 2 },
  todayScriptureRef: { fontSize: 10, color: Colors.muted, fontWeight: '600' },

  newEntry: { backgroundColor: Colors.card, borderRadius: Radius.lg, padding: Spacing.md, marginBottom: Spacing.lg, borderWidth: 1, borderColor: Colors.border },
  entryHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.sm },
  entryDateLabel: { fontSize: 11, fontWeight: '700', color: Colors.accent, textTransform: 'uppercase', letterSpacing: 0.8 },
  giftTag: { borderRadius: Radius.full, paddingHorizontal: 8, paddingVertical: 3 },
  giftTagText: { fontSize: 10, fontWeight: '700' },

  input: {
    minHeight: 120, fontSize: 14, color: Colors.text, lineHeight: 22,
    borderWidth: 1.5, borderColor: '#D4C498', borderRadius: Radius.md,
    padding: Spacing.sm, marginBottom: Spacing.sm,
  },
  entryActions: { flexDirection: 'row', gap: Spacing.sm },
  promptBtn: { flex: 1, borderWidth: 1.5, borderColor: Colors.border, borderRadius: Radius.sm, padding: 10, alignItems: 'center' },
  promptBtnText: { fontSize: 13, color: Colors.muted, fontWeight: '600' },
  saveBtn: { flex: 1, backgroundColor: Colors.accent, borderRadius: Radius.sm, padding: 10, alignItems: 'center' },
  saveBtnDisabled: { opacity: 0.4 },
  saveBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },

  promptSuggestion: { marginTop: Spacing.sm, backgroundColor: `${Colors.accent}08`, borderRadius: Radius.sm, padding: Spacing.sm },
  promptSuggestionText: { fontSize: 13, color: Colors.text, fontStyle: 'italic', lineHeight: 20, marginBottom: 4 },
  promptTap: { fontSize: 11, color: Colors.accent, fontWeight: '600' },

  pastTitle: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: Spacing.sm },
  entryCard: { backgroundColor: Colors.card, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.sm, borderWidth: 1, borderColor: Colors.border },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  entryDate: { fontSize: 11, fontWeight: '700', color: Colors.muted, textTransform: 'uppercase', letterSpacing: 0.5 },
  entryDay: { fontSize: 11, fontWeight: '700', color: Colors.accent },
  entryScripture: { backgroundColor: `${Colors.gold}12`, borderRadius: Radius.sm, padding: 8, marginBottom: 8 },
  entryScriptureText: { fontStyle: 'italic', fontSize: 12, color: Colors.text, marginBottom: 2 },
  entryScriptureRef: { fontSize: 9, color: Colors.gold, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  entryText: { fontSize: 14, color: Colors.text, lineHeight: 21 },
  practiceTag: { fontSize: 11, color: '#2E7D32', fontWeight: '600', marginTop: 8 },

  emptyState: { alignItems: 'center', paddingVertical: Spacing.xl },
  emptyIcon: { fontSize: 36, color: Colors.red, marginBottom: Spacing.md, opacity: 0.4 },
  emptyTitle: { fontSize: 17, fontWeight: '700', color: Colors.text, marginBottom: 6 },
  emptySub: { fontSize: 13, color: Colors.muted, textAlign: 'center', lineHeight: 20, maxWidth: 280 },
});
