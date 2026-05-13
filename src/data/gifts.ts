export type GiftType = 'faith' | 'mercy' | 'prophecy' | 'teaching';

export interface Gift {
  id: GiftType;
  name: string;
  tagline: string;
  verse: string;
  verseRef: string;
  description: string;
  color: string;
  emoji: string;
}

export const GIFTS: Record<GiftType, Gift> = {
  faith: {
    id: 'faith',
    name: 'Faith & Prayer',
    tagline: 'Your prayers move mountains',
    verse: 'to another faith by the same Spirit',
    verseRef: '1 Corinthians 12:9',
    description: 'God has given you an extraordinary capacity to trust Him that goes beyond what most believers experience. Your prayers carry spiritual weight and you believe for the impossible. You are called to intercede for the Body of Christ.',
    color: '#1B4B8A',
    emoji: '🙏',
  },
  mercy: {
    id: 'mercy',
    name: 'Mercy & Service',
    tagline: 'You are the hands of Christ',
    verse: 'if it is showing mercy, do it cheerfully',
    verseRef: 'Romans 12:8',
    description: 'You bear the image of Christ in the most tangible way. When someone suffers, you feel it. When something needs doing, your hands are already moving. Your service is a proclamation that Jesus is alive.',
    color: '#8B1A1A',
    emoji: '🤲',
  },
  prophecy: {
    id: 'prophecy',
    name: 'Prophecy & Discernment',
    tagline: 'The Holy Spirit speaks through you',
    verse: 'the one who prophesies speaks to people for their strengthening',
    verseRef: '1 Corinthians 14:3',
    description: 'You perceive what others miss — the spiritual reality beneath the surface. God has made you a truth-teller for the Church. Speak what He gives you, with love and boldness.',
    color: '#B8870B',
    emoji: '✝',
  },
  teaching: {
    id: 'teaching',
    name: 'Teaching & Leadership',
    tagline: 'You build the Church with your words',
    verse: 'if it is to teach, then teach; if it is to lead, do it diligently',
    verseRef: 'Romans 12:7–8',
    description: 'When you explain Scripture, something unlocks in people. When you lead, people find direction. You are called to build the Church through clarity, truth, and the courage to go first.',
    color: '#2E7D32',
    emoji: '📖',
  },
};

export const ALL_GIFTS = Object.values(GIFTS);
