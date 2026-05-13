import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors, Spacing, Radius } from '../theme';
import { UserState, JournalEntry } from '../hooks/useUserStore';
import { getDayNumber } from '../data/content';

interface Props {
  user: UserState;
  onAddEntry: (text: string, day: number, practiceComplete: boolean) => void;
}

export default function JournalScreen({ user, onAddEntry }: Props) {
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);

  const dayNum = getDayNumber(user.startDate);

  const handleSave = () => {
    if (!text.trim()) return;
    onAddEntry(text.trim(), dayNum, user.completedDays.includes(dayNum));
    setText('');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.page}>

            <Text style={styles.sectionTitle}>Prayer Journal</Text>
            <Text style={styles.sectionSub}>Write what God showed you today, a prayer, or a reflection.</Text>

            {/* New entry */}
            <View style={styles.newEntry}>
              <Text style={styles.entryDateLabel}>Day {dayNum} · {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</Text>
              <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                placeholder="What did God show you today? Write a prayer, a reflection, or anything on your heart..."
                placeholderTextColor={Colors.muted}
                multiline
                textAlignVertical="top"
              />
              <TouchableOpacity
                style={[styles.saveBtn, !text.trim() && styles.saveBtnDisabled]}
                onPress={handleSave}
                disabled={!text.trim()}
              >
                <Text style={styles.saveBtnText}>{saved ? '✓ Saved' : 'Save Entry'}</Text>
              </TouchableOpacity>
            </View>

            {/* Past entries */}
            {user.journalEntries.length > 0 && (
              <>
                <Text style={styles.pastTitle}>Past Entries</Text>
                {user.journalEntries.map((entry: JournalEntry) => (
                  <View key={entry.id} style={styles.entryCard}>
                    <View style={styles.entryHeader}>
                      <Text style={styles.entryDate}>{entry.date}</Text>
                      <Text style={styles.entryDay}>Day {entry.dayNumber}</Text>
                    </View>
                    <Text style={styles.entryText}>{entry.text}</Text>
                    {entry.practiceCompleted && (
                      <Text style={styles.practiceTag}>✓ Practice completed</Text>
                    )}
                  </View>
                ))}
              </>
            )}

            {user.journalEntries.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>✝</Text>
                <Text style={styles.emptyTitle}>Your journal is empty</Text>
                <Text style={styles.emptySub}>Write your first entry above. These reflections become a record of your journey with God.</Text>
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
  sectionTitle: { fontSize: 22, fontWeight: '800', color: Colors.text, marginBottom: 4, letterSpacing: -0.3 },
  sectionSub: { fontSize: 13, color: Colors.muted, marginBottom: Spacing.md, lineHeight: 20 },
  newEntry: {
    backgroundColor: Colors.card, borderRadius: Radius.lg, padding: Spacing.md,
    marginBottom: Spacing.lg, borderWidth: 1, borderColor: Colors.border,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 2,
  },
  entryDateLabel: { fontSize: 11, fontWeight: '700', color: Colors.accent, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: Spacing.sm },
  input: {
    minHeight: 120, fontSize: 14, color: Colors.text, lineHeight: 22,
    borderWidth: 1.5, borderColor: '#D4C498', borderRadius: Radius.md,
    padding: Spacing.sm, marginBottom: Spacing.sm,
  },
  saveBtn: { backgroundColor: Colors.accent, borderRadius: Radius.sm, padding: 12, alignItems: 'center' },
  saveBtnDisabled: { opacity: 0.4 },
  saveBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  pastTitle: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: Spacing.sm },
  entryCard: {
    backgroundColor: Colors.card, borderRadius: Radius.md, padding: Spacing.md,
    marginBottom: Spacing.sm, borderWidth: 1, borderColor: Colors.border,
  },
  entryHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  entryDate: { fontSize: 11, fontWeight: '700', color: Colors.muted, textTransform: 'uppercase', letterSpacing: 0.5 },
  entryDay: { fontSize: 11, fontWeight: '700', color: Colors.accent },
  entryText: { fontSize: 14, color: Colors.text, lineHeight: 21 },
  practiceTag: { fontSize: 11, color: Colors.accent, fontWeight: '600', marginTop: 8 },
  emptyState: { alignItems: 'center', paddingVertical: Spacing.xl },
  emptyIcon: { fontSize: 40, color: Colors.red, marginBottom: Spacing.md, opacity: 0.5 },
  emptyTitle: { fontSize: 17, fontWeight: '700', color: Colors.text, marginBottom: 6 },
  emptySub: { fontSize: 13, color: Colors.muted, textAlign: 'center', lineHeight: 20, maxWidth: 280 },
});
