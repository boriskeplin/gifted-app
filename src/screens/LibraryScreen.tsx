import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  SafeAreaView, Linking, Modal,
} from 'react-native';
import { Colors, Spacing, Radius } from '../theme';
import { UserState } from '../hooks/useUserStore';
import { GiftType, GIFTS } from '../data/gifts';
import Analytics from '../analytics';

interface Props { user: UserState; }

// When real PDFs are uploaded, replace these URLs
const GUIDE_URLS: Record<GiftType, string[]> = {
  faith:    ['https://gifted.church/guides/faith-1', 'https://gifted.church/guides/faith-2', 'https://gifted.church/guides/faith-3', 'https://gifted.church/guides/faith-4', 'https://gifted.church/guides/faith-5'],
  mercy:    ['https://gifted.church/guides/mercy-1', 'https://gifted.church/guides/mercy-2', 'https://gifted.church/guides/mercy-3', 'https://gifted.church/guides/mercy-4', 'https://gifted.church/guides/mercy-5'],
  prophecy: ['https://gifted.church/guides/prophecy-1', 'https://gifted.church/guides/prophecy-2', 'https://gifted.church/guides/prophecy-3', 'https://gifted.church/guides/prophecy-4', 'https://gifted.church/guides/prophecy-5'],
  teaching: ['https://gifted.church/guides/teaching-1', 'https://gifted.church/guides/teaching-2', 'https://gifted.church/guides/teaching-3', 'https://gifted.church/guides/teaching-4', 'https://gifted.church/guides/teaching-5'],
};

const GIFT_GUIDES: Record<GiftType, Array<{ icon: string; title: string; sub: string }>> = {
  faith: [
    { icon: '🙏', title: 'The Intercessor\'s Field Manual', sub: 'How to pray for others with supernatural authority' },
    { icon: '🔥', title: 'Persistent Prayer: The 21-Day Practice', sub: 'Building an intercession rhythm that doesn\'t quit' },
    { icon: '⚔️', title: 'Spiritual Warfare & Prayer', sub: 'Armor of God — not theory, application' },
    { icon: '🌙', title: 'Praying Through the Night', sub: 'What your gift looks like in the hardest seasons' },
    { icon: '✝', title: 'Promises to Stand On', sub: '40 scriptures for intercessors' },
  ],
  mercy: [
    { icon: '🤲', title: 'The Servant\'s Handbook', sub: 'Serving from fullness instead of emptiness' },
    { icon: '❤️', title: 'Compassion Without Burnout', sub: 'Why you keep giving until there\'s nothing left — and how to stop' },
    { icon: '🏠', title: 'Mercy in the Home', sub: 'What your gift looks like with the people closest to you' },
    { icon: '🌍', title: 'Gift-Specific Evangelism Guide', sub: 'How mercy-gifted people introduce people to Christ' },
    { icon: '✝', title: 'Matthew 25 Activation', sub: 'Turning the parable into a weekly practice' },
  ],
  prophecy: [
    { icon: '👁', title: 'Prophetic Activation Guide', sub: 'Hearing God accurately — and testing what you receive' },
    { icon: '✝', title: 'Discernment: A Field Guide', sub: 'The gift of seeing what others miss, used with wisdom' },
    { icon: '🔥', title: 'Speaking Truth in Love', sub: 'What your gift is actually called to do' },
    { icon: '📖', title: 'Scripture & the Prophetic Gift', sub: 'Every major prophet, what they saw, what it means for you' },
    { icon: '⚡', title: 'When Nobody Listens', sub: 'The hardest part of the prophetic gift' },
  ],
  teaching: [
    { icon: '📖', title: 'Bible Study Methods Handbook', sub: 'How to study the Word the way your gift is designed to' },
    { icon: '👥', title: 'Discipleship Framework', sub: '2 Timothy 2:2 — building teachers from within your circle' },
    { icon: '✝', title: 'Teaching with Authority', sub: 'What Jesus taught about teaching' },
    { icon: '🏗️', title: 'Building the Church With Your Gift', sub: 'Ephesians 4:11-12 — your assignment in the body' },
    { icon: '📝', title: 'Scripture Memory System', sub: '52 key verses, gift-specific notes on each' },
  ],
};

const UNIVERSAL_GUIDES = [
  { icon: '💍', title: 'Covenant Home Framework', sub: 'Biblical marriage and family — gift-aware' },
  { icon: '🕊', title: 'The Healing & Miracles Guide', sub: 'Praying for the sick with biblical authority' },
  { icon: '🌿', title: 'Fasting & Spiritual Discipline', sub: 'What the gifts look like under extended surrender' },
];

const VIDEO_COURSES = [
  { id: 'v1', title: 'Walking in Your Gift — Week 1', sub: '4 lessons · 45 min total', free: true,  url: 'https://gifted.church/courses/gift-week1' },
  { id: 'v2', title: 'Prayer That Moves Heaven',       sub: '6 lessons · 1hr 10min',    free: false, url: 'https://gifted.church/courses/prayer' },
  { id: 'v3', title: 'The Prophetic Life',             sub: '5 lessons · 55 min total', free: false, url: 'https://gifted.church/courses/prophetic' },
  { id: 'v4', title: 'Mercy, Service & Burnout',       sub: '4 lessons · 50 min total', free: false, url: 'https://gifted.church/courses/mercy' },
  { id: 'v5', title: 'Teaching Scripture That Changes Lives', sub: '6 lessons · 1hr 20min', free: false, url: 'https://gifted.church/courses/teaching' },
];

export default function LibraryScreen({ user }: Props) {
  const [showPaywall, setShowPaywall]   = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [selectedItem, setSelectedItem]    = useState('');

  const gift   = user.gift ? GIFTS[user.gift] : null;
  const guides = user.gift ? GIFT_GUIDES[user.gift] : [];
  const urls   = user.gift ? GUIDE_URLS[user.gift] : [];

  const handleGuide = (index: number, title: string) => {
    if (!user.subscribed) {
      Analytics.paywallSeen('library_guide');
      setShowPaywall(true);
      return;
    }
    const url = urls[index];
    if (url && url !== '#') {
      Linking.openURL(url);
    } else {
      setSelectedItem(title);
      setShowComingSoon(true);
    }
  };

  const handleVideo = (item: typeof VIDEO_COURSES[0]) => {
    if (!item.free && !user.subscribed) {
      Analytics.paywallSeen('library_video');
      setShowPaywall(true);
      return;
    }
    if (item.url) Linking.openURL(item.url);
  };

  return (
    <SafeAreaView style={styles.safe}>

      {/* Paywall modal */}
      <Modal visible={showPaywall} animationType="slide" transparent>
        <View style={styles.paywallOverlay}>
          <View style={styles.paywallCard}>
            <Text style={styles.paywallTitle}>Unlock the full library.</Text>
            <Text style={styles.paywallSub}>
              8 gift-specific PDF guides. 5 video courses. AI Spiritual Advisor.
              {'\n'}All designed around your specific gift.
            </Text>
            <TouchableOpacity
              style={styles.paywallBtn}
              onPress={() => {
                setShowPaywall(false);
                Analytics.upgradeIntent('library');
                Linking.openURL('https://gifted.church/upgrade');
              }}
            >
              <Text style={styles.paywallBtnText}>Unlock Everything →</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowPaywall(false)} style={{ marginTop: 12, alignItems: 'center' }}>
              <Text style={{ color: Colors.muted, fontSize: 13 }}>not yet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Coming soon modal */}
      <Modal visible={showComingSoon} animationType="fade" transparent>
        <View style={styles.paywallOverlay}>
          <View style={[styles.paywallCard, { alignItems: 'center' }]}>
            <Text style={{ fontSize: 32, marginBottom: 12 }}>✝</Text>
            <Text style={[styles.paywallTitle, { fontSize: 18 }]}>{selectedItem}</Text>
            <Text style={styles.paywallSub}>
              This guide is being finished. It will appear here automatically when it's ready.
              {'\n\n'}
              "Fan into flame the gift of God which is in you." — 2 Tim 1:6
            </Text>
            <TouchableOpacity style={styles.paywallBtn} onPress={() => setShowComingSoon(false)}>
              <Text style={styles.paywallBtnText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.page}>

          {/* Gift header */}
          {gift && (
            <View style={[styles.giftHeader, { backgroundColor: `${gift.color}12`, borderColor: `${gift.color}30` }]}>
              <Text style={styles.giftEmoji}>{gift.emoji}</Text>
              <View>
                <Text style={styles.giftHeaderLabel}>Resources for</Text>
                <Text style={[styles.giftHeaderName, { color: gift.color }]}>{gift.name}</Text>
              </View>
            </View>
          )}

          {/* Gift-specific guides */}
          <Text style={styles.sectionTitle}>✝ Your Gift Guides</Text>
          <Text style={styles.sectionSub}>5 in-depth resources built around your specific gift.</Text>
          {guides.map((item, i) => (
            <TouchableOpacity key={i} style={styles.libItem} activeOpacity={0.7} onPress={() => handleGuide(i, item.title)}>
              <View style={[styles.libIcon, gift && { backgroundColor: `${gift.color}12` }]}>
                <Text style={styles.libIconText}>{item.icon}</Text>
              </View>
              <View style={styles.libInfo}>
                <Text style={styles.libTitle}>{item.title}</Text>
                <Text style={styles.libSub}>{item.sub}</Text>
              </View>
              {user.subscribed ? <Text style={styles.libArrow}>→</Text> : <Text style={styles.libLock}>🔒</Text>}
            </TouchableOpacity>
          ))}

          {/* Universal guides */}
          <Text style={[styles.sectionTitle, { marginTop: Spacing.md }]}>📖 Biblical Foundations</Text>
          <Text style={styles.sectionSub}>Deep-dive resources for every believer.</Text>
          {UNIVERSAL_GUIDES.map((item, i) => (
            <TouchableOpacity key={i} style={styles.libItem} activeOpacity={0.7}
              onPress={() => !user.subscribed ? (Analytics.paywallSeen('library_universal'), setShowPaywall(true)) : (setSelectedItem(item.title), setShowComingSoon(true))}>
              <View style={styles.libIcon}><Text style={styles.libIconText}>{item.icon}</Text></View>
              <View style={styles.libInfo}>
                <Text style={styles.libTitle}>{item.title}</Text>
                <Text style={styles.libSub}>{item.sub}</Text>
              </View>
              {user.subscribed ? <Text style={styles.libArrow}>→</Text> : <Text style={styles.libLock}>🔒</Text>}
            </TouchableOpacity>
          ))}

          {/* Video courses */}
          <Text style={[styles.sectionTitle, { marginTop: Spacing.md }]}>🎬 Video Courses</Text>
          <Text style={styles.sectionSub}>Expert-led lessons. One free to start.</Text>
          {VIDEO_COURSES.map(item => (
            <TouchableOpacity key={item.id} style={styles.libItem} activeOpacity={0.7} onPress={() => handleVideo(item)}>
              <View style={[styles.libIcon, { backgroundColor: 'rgba(139,26,26,.08)' }]}>
                <Text style={styles.libIconText}>🎬</Text>
              </View>
              <View style={styles.libInfo}>
                <Text style={styles.libTitle}>{item.title}</Text>
                <Text style={styles.libSub}>{item.sub}</Text>
              </View>
              {item.free
                ? <View style={styles.freeBadge}><Text style={styles.freeBadgeText}>Free</Text></View>
                : user.subscribed ? <Text style={styles.libArrow}>→</Text> : <Text style={styles.libLock}>🔒</Text>
              }
            </TouchableOpacity>
          ))}

          {/* AI Advisor */}
          <View style={styles.aiCard}>
            <Text style={styles.aiLabel}>✝ Gifted Plus</Text>
            <Text style={styles.aiTitle}>AI Spiritual Advisor</Text>
            <Text style={styles.aiSub}>Ask anything about your spiritual gift, Scripture, prayer, or calling. Trained on all 8 guides.</Text>
            {user.subscribed ? (
              <TouchableOpacity style={styles.aiBtn} onPress={() => Linking.openURL('https://gifted.church/advisor')}>
                <Text style={styles.aiBtnText}>Chat with Advisor →</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.upgradeBtn} onPress={() => { Analytics.upgradeIntent('library_ai'); Linking.openURL('https://gifted.church/upgrade'); }}>
                <Text style={styles.upgradeBtnText}>Unlock Plus — gifted.church/upgrade</Text>
              </TouchableOpacity>
            )}
          </View>

          {!user.subscribed && (
            <View style={styles.convictionClose}>
              <Text style={styles.convictionText}>"Fan into flame the gift of God which is in you."</Text>
              <Text style={styles.convictionRef}>2 Timothy 1:6</Text>
              <Text style={styles.convictionSub}>The guides in this library exist to help you do exactly that.</Text>
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
  giftHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, borderRadius: Radius.md, padding: Spacing.sm, marginBottom: Spacing.md, borderWidth: 1.5 },
  giftEmoji: { fontSize: 28 },
  giftHeaderLabel: { fontSize: 10, fontWeight: '700', color: Colors.muted, textTransform: 'uppercase', letterSpacing: 0.8 },
  giftHeaderName: { fontSize: 16, fontWeight: '800', letterSpacing: -0.3 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: Colors.text, marginBottom: 4, letterSpacing: -0.3 },
  sectionSub: { fontSize: 13, color: Colors.muted, marginBottom: Spacing.sm, lineHeight: 20 },
  libItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, backgroundColor: Colors.card, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.sm, borderWidth: 1, borderColor: Colors.border },
  libIcon: { width: 44, height: 44, borderRadius: 10, backgroundColor: 'rgba(27,75,138,.08)', alignItems: 'center', justifyContent: 'center' },
  libIconText: { fontSize: 20 },
  libInfo: { flex: 1 },
  libTitle: { fontSize: 14, fontWeight: '700', color: Colors.text, marginBottom: 2 },
  libSub: { fontSize: 11, color: Colors.muted },
  libArrow: { fontSize: 16, color: Colors.muted },
  libLock: { fontSize: 16 },
  freeBadge: { backgroundColor: `${Colors.accent}15`, borderRadius: Radius.full, paddingHorizontal: 8, paddingVertical: 3 },
  freeBadgeText: { fontSize: 10, fontWeight: '800', color: Colors.accent, textTransform: 'uppercase', letterSpacing: 0.5 },
  aiCard: { backgroundColor: Colors.accent, borderRadius: Radius.lg, padding: Spacing.lg, marginTop: Spacing.md },
  aiLabel: { fontSize: 10, fontWeight: '700', color: 'rgba(255,255,255,.65)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 },
  aiTitle: { fontSize: 20, fontWeight: '800', color: '#fff', marginBottom: 6 },
  aiSub: { fontSize: 13, color: 'rgba(255,255,255,.8)', lineHeight: 20, marginBottom: 16 },
  aiBtn: { backgroundColor: Colors.gold, borderRadius: Radius.md, padding: 13, alignItems: 'center' },
  aiBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  upgradeBtn: { backgroundColor: 'rgba(255,255,255,.15)', borderRadius: Radius.md, padding: 13, alignItems: 'center' },
  upgradeBtnText: { color: '#fff', fontSize: 13, fontWeight: '700', textAlign: 'center' },
  convictionClose: { marginTop: Spacing.md, alignItems: 'center', paddingHorizontal: Spacing.md },
  convictionText: { fontStyle: 'italic', fontSize: 14, color: Colors.text, textAlign: 'center', lineHeight: 22, marginBottom: 4 },
  convictionRef: { fontSize: 10, fontWeight: '700', color: Colors.gold, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 },
  convictionSub: { fontSize: 12, color: Colors.muted, textAlign: 'center', lineHeight: 18 },
  paywallOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  paywallCard: { backgroundColor: Colors.bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: Spacing.lg, paddingBottom: 40 },
  paywallTitle: { fontSize: 22, fontWeight: '900', color: Colors.text, textAlign: 'center', marginBottom: 8, letterSpacing: -0.4 },
  paywallSub: { fontSize: 14, color: Colors.muted, textAlign: 'center', lineHeight: 22, marginBottom: Spacing.md },
  paywallBtn: { backgroundColor: Colors.accent, borderRadius: Radius.md, padding: 16, alignItems: 'center', marginBottom: 8 },
  paywallBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
