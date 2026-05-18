export type GiftType = 'faith' | 'mercy' | 'prophecy' | 'teaching';

export interface Gift {
  id: GiftType;
  name: string;
  tagline: string;
  verse: string;
  verseRef: string;
  description: string;
  shadowSide: string;
  color: string;
  emoji: string;
}

export const GIFTS: Record<GiftType, Gift> = {
  faith: {
    id: 'faith',
    name: 'Faith & Prayer',
    tagline: 'You were built to believe when no one else can.',
    verse: 'to another faith by the same Spirit',
    verseRef: '1 Corinthians 12:9',
    description: 'God gave you a supernatural capacity to trust Him that goes beyond what most believers experience. Your prayers carry weight that other people\'s don\'t. You believe for the impossible — not as an act of will, but because the Spirit made you that way. You were built to intercede. To stand in the gap. To keep praying when everyone else has moved on.',
    shadowSide: 'When this gift is misdirected, you pray for everyone but serve no one. You feel close to God in the prayer closet and invisible in the church. You\'ve been called naive. You\'ve apologized for how much you believe. You\'ve quit on prayers you were supposed to keep praying because nothing was happening.',
    color: '#1B4B8A',
    emoji: '🙏',
  },
  mercy: {
    id: 'mercy',
    name: 'Mercy & Service',
    tagline: 'You are the hands of Christ — whether anyone sees it or not.',
    verse: 'if it is showing mercy, do it cheerfully',
    verseRef: 'Romans 12:8',
    description: 'You bear the image of Christ in the most tangible way. When someone suffers, you feel it. When something needs doing, your hands are already moving before you decide to move them. You were not designed to lead from the front. You were designed to serve from the inside — the kind of service that holds everything together without needing a title.',
    shadowSide: 'When this gift is misdirected, you serve everyone else\'s vision while yours goes unbuilt. You give until empty and wonder why God feels distant. You\'ve been taken for granted by the very places you\'ve poured yourself into. You\'ve confused being needed with being fulfilled.',
    color: '#8B1A1A',
    emoji: '🤲',
  },
  prophecy: {
    id: 'prophecy',
    name: 'Prophecy & Discernment',
    tagline: 'You see what others miss — and you\'re supposed to say it.',
    verse: 'the one who prophesies speaks to people for their strengthening',
    verseRef: '1 Corinthians 14:3',
    description: 'You perceive the spiritual reality beneath the surface. You know when something is off before anyone else admits it. God has made you a truth-teller — not to cause division, but to protect His people from what\'s coming. The burden you carry when you see clearly and no one is ready to hear it: that is your gift operating exactly as designed.',
    shadowSide: 'When this gift is misdirected, you speak truth into rooms that aren\'t ready for it and walk away feeling like a liability. You\'ve been told you\'re too intense, too negative, too much. You\'ve learned to stay quiet, and the fire in your bones has nowhere to go. That burning feeling when you stay silent? That\'s not anxiety. That\'s your gift being suppressed.',
    color: '#B8870B',
    emoji: '✝',
  },
  teaching: {
    id: 'teaching',
    name: 'Teaching & Leadership',
    tagline: 'When you explain Scripture, something unlocks in people.',
    verse: 'if it is to teach, then teach; if it is to lead, do it diligently',
    verseRef: 'Romans 12:7–8',
    description: 'When you explain Scripture, something unlocks in the room. When you lead, people find direction they couldn\'t find alone. You were called to build the Church through clarity, truth, and the courage to go first. You don\'t just know the Word — you carry a supernatural ability to make it land in other people\'s lives in ways that change them.',
    shadowSide: 'When this gift is misdirected, you prepare lessons nobody uses. You lead in a vacuum. You speak with clarity into silence and wonder if the knowledge God gave you matters. You\'ve been waiting for someone to give you a platform when God designed you to build one.',
    color: '#2E7D32',
    emoji: '📖',
  },
};

export const ALL_GIFTS = Object.values(GIFTS);
