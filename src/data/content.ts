import { GiftType } from './gifts';

export interface DailyContent {
  day: number;
  scripture: string;
  scriptureRef: string;
  title: string;
  devotional: string;
  practice: string;
  practiceLabel: string;
  prayer: string;
}

// 7 days of daily content per gift type
// Expand to 30 → 90 → 365 days over time
const CONTENT: Record<GiftType, DailyContent[]> = {
  faith: [
    {
      day: 1,
      scripture: 'Be still and know that I am God.',
      scriptureRef: 'Psalm 46:10',
      title: 'The Foundation of Faith',
      devotional: 'Faith begins not with certainty about the future but with certainty about God\'s character. Before you can believe Him for anything, you must know who He is. Every act of faith in Scripture was rooted in a person\'s knowledge of God — not their knowledge of the outcome.',
      practice: 'Spend 10 minutes in silence before God. No requests. Just acknowledge who He is. Speak His names aloud: Father, Provider, Healer, Faithful One. Let relationship precede petition.',
      practiceLabel: 'Silence & Adoration',
      prayer: 'Lord, I come to You today not with a list but with a heart that wants to know You more. Increase my faith — not just my confidence in outcomes, but my confidence in You.',
    },
    {
      day: 2,
      scripture: 'Now faith is confidence in what we hope for and assurance about what we do not see.',
      scriptureRef: 'Hebrews 11:1',
      title: 'Faith Without Evidence',
      devotional: 'The heroes of Hebrews 11 are not celebrated because they saw answers. They are celebrated because they believed without seeing. Abraham left without knowing where he was going. Noah built an ark without rain. Your gift of faith is most powerful precisely when circumstances give no reason to believe.',
      practice: 'Write down one thing you have been afraid to believe God for. Speak it aloud as a prayer of faith — not "I hope", but "I believe". Then leave it with Him.',
      practiceLabel: 'Bold Declaration',
      prayer: 'Father, I choose to believe You today — especially where I cannot see. My faith is not in the outcome. My faith is in You.',
    },
    {
      day: 3,
      scripture: 'Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.',
      scriptureRef: 'Matthew 7:7',
      title: 'Persistent Prayer',
      devotional: 'Jesus told the parable of the persistent widow specifically to show that we should always pray and not give up. Persistence in prayer is not twisting God\'s arm — it is an expression of faith that He is listening, that He is working, and that the answer is coming.',
      practice: 'Choose one person to intercede for today. Pray for them three times — morning, midday, evening. Each time, pray a specific Scripture over them.',
      practiceLabel: 'Three-Part Intercession',
      prayer: 'Lord, I will not stop asking. Not because You haven\'t heard, but because I trust You are working. Today I bring [name] before You again.',
    },
    {
      day: 4,
      scripture: 'The prayer of a righteous person is powerful and effective.',
      scriptureRef: 'James 5:16',
      title: 'Your Prayers Have Weight',
      devotional: 'James doesn\'t say the prayer of a perfect person — he says a righteous person. Your righteousness is in Christ, not your performance. That means your prayers carry the full weight of Christ\'s name before the Father. You are not a small voice. You are a fully adopted child speaking to your Father.',
      practice: 'Pray for one impossible situation today — something that only God can change. After praying, write: "I declare that God is working in this situation." Date it and keep it.',
      practiceLabel: 'Faith Declaration',
      prayer: 'Father, I thank You that my prayers reach You. Not because of who I am, but because of whose I am.',
    },
    {
      day: 5,
      scripture: 'I have not stopped giving thanks for you, remembering you in my prayers.',
      scriptureRef: 'Ephesians 1:16',
      title: 'Interceding for Others',
      devotional: 'Paul\'s first instinct for the people he loved was prayer. Not advice. Not action. Prayer. Your gift of faith means you are called to carry people before God — to stand in the gap for them in ways they may never know. This is one of the most powerful things a human being can do for another.',
      practice: 'Make a list of 5 people who need prayer. Pray Ephesians 1:17–19 over each one, inserting their name into the text.',
      practiceLabel: 'Intercessory Prayer',
      prayer: 'Lord, use me as an instrument of intercession. Let my faith be a bridge that carries others to You.',
    },
    {
      day: 6,
      scripture: 'Truly I tell you, if you have faith as small as a mustard seed, you can say to this mountain, \'Move from here to there,\' and it will move.',
      scriptureRef: 'Matthew 17:20',
      title: 'The Size of Your Faith',
      devotional: 'The mustard seed is the smallest seed — but Jesus chose it deliberately. The issue was never the quantity of your faith. It is the object of your faith. Mustard-seed faith in the right God moves mountains. The mountain does not respond to your confidence in yourself. It responds to your confidence in Him.',
      practice: 'Identify one "mountain" in your life or someone else\'s. Speak to it today — literally, out loud. "In the name of Jesus, I command this mountain of [name it] to move." Then trust.',
      practiceLabel: 'Speak to the Mountain',
      prayer: 'Lord, my faith may feel small today. But I am planting it in You — and You are more than enough.',
    },
    {
      day: 7,
      scripture: 'The righteous person will live by his faithfulness.',
      scriptureRef: 'Habakkuk 2:4',
      title: 'Faith as a Way of Life',
      devotional: 'Habakkuk wrote this in one of the darkest seasons of Israel\'s history — destruction was coming, God seemed silent, and nothing made sense. And yet: the righteous will live by faith. Not the righteous will feel faith, or achieve faith. They will live by it. Faith is not a moment. It is a way of being.',
      practice: 'Review the week. What moments tested your faith? Where did you hold on? Where did you waver? Write a brief "faith log" — evidence of God\'s faithfulness this week, however small.',
      practiceLabel: 'Weekly Faith Log',
      prayer: 'Lord, I choose this week and every week to live by faith. Not because it is easy, but because You are faithful — and that is enough.',
    },
  ],

  mercy: [
    {
      day: 1,
      scripture: 'Carry each other\'s burdens, and in this way you will fulfil the law of Christ.',
      scriptureRef: 'Galatians 6:2',
      title: 'The Gift of Being Present',
      devotional: 'The most profound thing you often do for someone is not solve their problem. It is stay. The gift of mercy is first and foremost the gift of presence — the willingness to sit with someone in their pain without rushing to fix it. Jesus wept at Lazarus\' tomb even though He was about to raise him. Presence before power.',
      practice: 'Think of someone who is hurting right now. Reach out today — not to fix, just to be present. A text, a call, or showing up. Say: "I\'m here. I\'m not going anywhere."',
      practiceLabel: 'Presence Practice',
      prayer: 'Lord, give me the gift of presence today. Help me to stay when others leave. To listen when others talk. To feel when others go numb.',
    },
    {
      day: 2,
      scripture: 'Blessed are the merciful, for they will be shown mercy.',
      scriptureRef: 'Matthew 5:7',
      title: 'Mercy Received and Given',
      devotional: 'You cannot give away what you have not first received. The most merciful people are those who know what it is to have been shown mercy — by God and by others. Before you can fully walk in your gift, you must first let it land on you. You are the recipient of infinite mercy before you are its carrier.',
      practice: 'Spend 10 minutes reflecting on a specific time God showed you mercy — a failure He forgave, a consequence He withheld, a restoration He worked. Write it down. Let gratitude fill you before you go and give to others.',
      practiceLabel: 'Receive Before You Give',
      prayer: 'Father, let Your mercy sink into the places in me that still feel undeserving. I receive it fully today — so I can carry it fully to others.',
    },
    {
      day: 3,
      scripture: 'He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.',
      scriptureRef: 'Micah 6:8',
      title: 'Love Mercy — Not Just Practice It',
      devotional: 'Micah says love mercy — not just do it. There is a version of mercy that is performed out of obligation: you help because you should. And there is a version that flows from love: you help because something in you genuinely moves for the suffering person. Your gift is the second kind. Guard against the first.',
      practice: 'Before you serve anyone today, check your heart. Pray: "Lord, let my service come from love, not obligation. Let Your compassion move through me." Then serve.',
      practiceLabel: 'Heart Check',
      prayer: 'Lord, keep my mercy genuine. Let it come from love — Yours first, then mine.',
    },
    {
      day: 4, scripture: 'When he saw the crowds, he had compassion on them, because they were harassed and helpless, like sheep without a shepherd.', scriptureRef: 'Matthew 9:36',
      title: 'The Compassion of Jesus',
      devotional: 'The Greek word for "compassion" in this verse — splagchnizomai — means to be moved in your gut, in your deepest visceral place. Jesus was not professionally sympathetic. He was physically moved by human suffering. This is your gift. What others can observe from a distance, you feel in your body.',
      practice: 'Ask God today: "Show me who You are moved for." Then pay attention to who comes to mind — a person, a community, a need. Whatever the Holy Spirit surfaces, bring it back to God in prayer.',
      practiceLabel: 'Ask Who He Sees',
      prayer: 'Lord, let me see who You see. Let me feel what You feel. Move me toward the people who need Your presence today.',
    },
    {
      day: 5, scripture: 'Rejoice with those who rejoice; mourn with those who mourn.', scriptureRef: 'Romans 12:15',
      title: 'Emotional Presence',
      devotional: 'Paul\'s instruction requires emotional flexibility — the ability to enter into someone else\'s emotional reality, whether joy or grief. This is a skill most people are bad at. They celebrate halfheartedly with the joyful and offer clichés to the grieving. You can do what most cannot: genuinely enter both worlds.',
      practice: 'Find someone who is celebrating something today. Celebrate with them wholeheartedly — without the small reservation that says "I should be focusing on those who are suffering." Joy for others is also mercy.',
      practiceLabel: 'Enter the Joy',
      prayer: 'Lord, make me fluent in both joy and grief. Let me meet people where they actually are — not where I think they should be.',
    },
    {
      day: 6, scripture: 'Serve wholeheartedly, as if you were serving the Lord, not people.', scriptureRef: 'Ephesians 6:7',
      title: 'Guarding Against Burnout',
      devotional: 'The shadow side of the mercy gift is exhaustion. You carry others so naturally that you often carry more than your share — and the weight accumulates. Jesus withdrew from the crowds regularly to be alone with the Father. This was not selfishness. It was sustainability. You cannot pour from an empty vessel.',
      practice: 'Schedule one hour this week that belongs only to you and God. Protect it. Let it be an appointment you keep. This is not laziness — it is stewardship of the gift God placed in you.',
      practiceLabel: 'Restore Your Soul',
      prayer: 'Lord, teach me to receive rest as an act of obedience. Protect me from the pride that says I don\'t need to stop.',
    },
    {
      day: 7, scripture: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.', scriptureRef: 'Psalm 34:18',
      title: 'Week One Review',
      devotional: 'This week you have been invited to enter into the mercy of God — to receive it, to understand it, and to let it flow through you. The gift of mercy is not your personality. It is the Holy Spirit carrying the compassion of Christ into the world through your specific life, your specific hands, your specific presence.',
      practice: 'Reflect on this week\'s practices. Who did you serve? Who did you pray for? What did God show you? Write a one-paragraph "mercy report" — evidence of how God moved through you this week.',
      practiceLabel: 'Weekly Review',
      prayer: 'Lord, I am not just a merciful person. I am a vessel for Your mercy. Use me again next week. And the week after that. Forever.',
    },
  ],

  prophecy: [
    {
      day: 1, scripture: 'The Spirit searches all things, even the deep things of God.', scriptureRef: '1 Corinthians 2:10',
      title: 'Learning to Hear',
      devotional: 'The Holy Spirit is not silent. He communicates — through Scripture, through impressions, through dreams, through circumstances, through the counsel of others, and sometimes through a voice so still it can only be heard in silence. Your gift of prophecy and discernment begins with learning to recognise these communications for what they are.',
      practice: 'Spend 15 minutes in complete silence before God. Keep a notebook open. Write down everything that comes to mind — impressions, Scriptures, images, names of people. Don\'t filter. Review what you\'ve written and ask: does any of this bear the character of God?',
      practiceLabel: 'Listening Prayer',
      prayer: 'Lord, I quiet everything else today. Speak to me. I am listening.',
    },
    {
      day: 2, scripture: 'Do not believe every spirit, but test the spirits to see whether they are from God.', scriptureRef: '1 John 4:1',
      title: 'The Discipline of Testing',
      devotional: 'The instruction to test what we hear is not a reason to dismiss the prophetic — it is the biblical framework for taking it seriously. Your discernment gift is most trustworthy when it is submitted to testing. The greatest prophets in Scripture were also the most humble about what they heard.',
      practice: 'Apply the five filters to something you believe God has been saying to you recently: (1) Does it align with Scripture? (2) Does it bear God\'s character? (3) Does it produce good fruit? (4) Does it resonate in your spirit? (5) Can a mature believer confirm it?',
      practiceLabel: 'Five-Filter Test',
      prayer: 'Lord, give me the humility to test what I hear. I want to be accurate, not just active.',
    },
    {
      day: 3, scripture: 'Speak the truth in love.', scriptureRef: 'Ephesians 4:15',
      title: 'Truth in the Right Hands',
      devotional: 'Prophetic words are only as powerful as the love they are delivered in. Truth without love is a weapon. Truth with love is a gift. Paul\'s instruction is not "speak truth" and separately "love people" — it is one act. The truth and the love must be inseparable.',
      practice: 'Think of someone in your life who needs to hear a difficult truth. Before you approach them, ask: Am I doing this from love, or from a need to be right? Only proceed if you can answer honestly: from love.',
      practiceLabel: 'Motive Check',
      prayer: 'Lord, guard my tongue. Let truth only leave my mouth wrapped in genuine love for the person receiving it.',
    },
    {
      day: 4, scripture: 'He who has an ear, let him hear what the Spirit says to the churches.', scriptureRef: 'Revelation 2:7',
      title: 'Hearing for the Body',
      devotional: 'Prophecy in the New Testament is primarily for the community, not for the individual. "Strengthening, encouraging and comforting" the Body of Christ — that is the purpose. Your gift was given not just to inform you personally, but to serve others. What God shows you is often more for someone else than for yourself.',
      practice: 'In your listening prayer today, specifically ask: "Lord, is there anything You want to say to someone around me?" If something comes, write it down, test it, and pray about whether and how to share it.',
      practiceLabel: 'Hearing for Others',
      prayer: 'Lord, I offer my ears to You for the sake of others today. Use what You show me to serve, not to impress.',
    },
    {
      day: 5, scripture: 'Your young men will see visions, your old men will dream dreams.', scriptureRef: 'Acts 2:17',
      title: 'Dreams and Visions',
      devotional: 'God spoke through dreams to Joseph, Jacob, Daniel, and Peter. He still does. Not every dream is from God — some are the result of a busy mind or indigestion. But some dreams carry a weight, a clarity, a recurrence that marks them as different. Learning to discern which is which is part of growing in your gift.',
      practice: 'Keep a notebook by your bed tonight. When you wake, before looking at your phone, write down anything you can remember from your dreams. Over the next week, look for patterns.',
      practiceLabel: 'Dream Journal',
      prayer: 'Lord, speak to me in the night hours. And give me wisdom to discern Your voice from the noise.',
    },
    {
      day: 6, scripture: 'Prophets should speak, and the others should weigh carefully what is said.', scriptureRef: '1 Corinthians 14:29',
      title: 'Accountability in Gifting',
      devotional: 'The most mature prophetic people in Scripture were the most accountable. They submitted their words to others. They invited correction. They did not operate as lone voices above accountability. The gift grows in community, not isolation. Who are the two or three people in your life who can weigh what you hear?',
      practice: 'Identify two spiritually mature people you trust. Tell them about your gift and ask them to be your accountability partners — people who can weigh significant impressions with you before you act on or share them.',
      practiceLabel: 'Build Your Council',
      prayer: 'Lord, give me the humility to be accountable. Keep me from operating in isolation. I want my gift to serve, not to harm.',
    },
    {
      day: 7, scripture: 'Follow the way of love and eagerly desire gifts of the Spirit, especially prophecy.', scriptureRef: '1 Corinthians 14:1',
      title: 'Pursue Love First',
      devotional: 'Paul sandwiches his teaching on gifts between the love chapter (1 Corinthians 13) and the instructions on prophecy (chapter 14). This was not accidental. He is making a single argument: pursue love, then pursue gifts. In that order. Without love, prophecy is noise. With love, it is one of the most powerful expressions of God available to the Church.',
      practice: 'Ask yourself honestly: am I more excited about the gift than about the God who gives it? Spend time today simply loving Jesus — no agenda, no prophetic exercise, just worship. Let the gift follow the relationship.',
      practiceLabel: 'Love Before Gift',
      prayer: 'Lord, keep my gift in its right place. Let my love for You always exceed my love for what You can do through me.',
    },
  ],

  teaching: [
    {
      day: 1, scripture: 'Your word is a lamp for my feet, a light on my path.', scriptureRef: 'Psalm 119:105',
      title: 'The Responsibility of the Teacher',
      devotional: 'James 3:1 contains one of the most sobering statements in the New Testament: "Not many of you should become teachers, my fellow believers, because you know that we who teach will be judged more strictly." The teaching gift carries weight. The people who sit under your teaching will be shaped by what you say — which means your depth in the Word must match your boldness in sharing it.',
      practice: 'Identify one passage of Scripture you want to understand more deeply. Spend 20 minutes studying it — not for a sermon or lesson, but for your own soul. Read the context before and after it. Ask: what did this mean then? What does it mean now?',
      practiceLabel: 'Deep Study',
      prayer: 'Lord, give me hunger for Your Word that exceeds my desire to teach. Let me be a student first and a teacher second.',
    },
    {
      day: 2, scripture: 'Do your best to present yourself to God as one approved, a worker who does not need to be ashamed and who correctly handles the word of truth.', scriptureRef: '2 Timothy 2:15',
      title: 'Handling the Word Well',
      devotional: '"Correctly handles" — the Greek word is orthotomeo, meaning to cut straight, to dissect precisely. Paul is describing a craftsman, not a performer. The teaching gift is first and foremost a discipline: the careful, diligent, honest handling of Scripture. Every minute of study is an investment in the clarity and integrity of what you share.',
      practice: 'Take one verse you have been sharing or teaching recently. Trace it back to its original context. Is the way you have been using it consistent with what it meant in its context? If not, adjust.',
      practiceLabel: 'Context Check',
      prayer: 'Lord, make me a straight-cutter. Let accuracy matter more to me than impact. The impact will follow the accuracy.',
    },
    {
      day: 3, scripture: 'Go and make disciples of all nations, teaching them to obey everything I have commanded you.', scriptureRef: 'Matthew 28:19–20',
      title: 'Teaching Toward Obedience',
      devotional: 'The goal of biblical teaching is not information but transformation. Jesus did not say "teaching them to know everything I have commanded." He said teaching them to obey. The test of good teaching is not whether people can repeat what you said — it is whether their lives are different because of it.',
      practice: 'Think about the last truth you shared with someone — in a formal or informal context. Did it produce change in them? If you don\'t know, ask. This is the teacher\'s most important feedback loop.',
      practiceLabel: 'Fruit Check',
      prayer: 'Lord, let what I teach produce change, not just knowledge. Keep me focused on obedience as the goal.',
    },
    {
      day: 4, scripture: 'The things you have heard me say in the presence of many witnesses entrust to reliable people who will also be qualified to teach others.', scriptureRef: '2 Timothy 2:2',
      title: 'Teaching That Multiplies',
      devotional: 'Paul describes four generations of teaching in one verse: Paul → Timothy → reliable people → others. Your gift is not complete until it has been transferred. The greatest teachers in history are not those who taught the most people — they are those who produced the most teachers. Who are you investing in so deeply that they could one day teach what you have taught them?',
      practice: 'Identify one person in your life who shows signs of the teaching gift. Commit to investing in them specifically — sharing what you learn, answering their questions, letting them watch you prepare.',
      practiceLabel: 'Identify Your Timothy',
      prayer: 'Lord, show me who You want me to invest in. Let my gift multiply beyond what I can personally reach.',
    },
    {
      day: 5, scripture: 'Let the message of Christ dwell among you richly as you teach and admonish one another with all wisdom.', scriptureRef: 'Colossians 3:16',
      title: 'Teaching in Everyday Life',
      devotional: 'The context of this verse is not a church service — it is everyday community. The teaching gift is not only for the platform. It is for the conversation over coffee, the text message that shares a thought from your morning reading, the question you ask someone that opens a deeper door. Most of your teaching will happen informally.',
      practice: 'In one conversation today, share one thing you have learned from Scripture recently — not as a lecture, but as a gift. Something that moved you, confused you, or changed you. See how the other person responds.',
      practiceLabel: 'Informal Teaching',
      prayer: 'Lord, let me be a teacher wherever I am — not just when I have a microphone.',
    },
    {
      day: 6, scripture: 'He who teaches should teach.', scriptureRef: 'Romans 12:7',
      title: 'The Gift Is Not Negotiable',
      devotional: 'Paul\'s instruction is direct: if the gift is teaching, then teach. Not: if you feel confident, or if you have a platform, or if someone invites you. The gift creates an obligation. God did not place it in you for your own benefit — He placed it in you for the Body\'s benefit. Withholding it is a kind of disobedience.',
      practice: 'Identify one place where you have been holding back your gift — a small group, a conversation, an opportunity you have declined out of fear or false humility. Take one step toward using it this week.',
      practiceLabel: 'Step Forward',
      prayer: 'Lord, forgive me for the times I have hidden what You gave me. I choose today to offer it — not out of confidence in myself, but out of trust in You.',
    },
    {
      day: 7, scripture: 'All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness.', scriptureRef: '2 Timothy 3:16',
      title: 'The Source Is Not You',
      devotional: 'The power in your teaching does not come from your intelligence, your preparation, or your communication skills — though all three matter. The power comes from the Scripture itself, because it is God-breathed. Your role is to handle it faithfully and get out of the way. The Word does the work.',
      practice: 'This week, when you prepare to teach or share anything from Scripture, add 10 minutes to your preparation that is purely prayer: "Lord, breathe life into this word through me. Let Your Spirit carry what my words cannot."',
      practiceLabel: 'Pray Your Preparation',
      prayer: 'Lord, I am just a voice. You are the Word. Use me as a vessel for something that is entirely Yours.',
    },
  ],
};

export function getDayContent(gift: GiftType, dayNumber: number): DailyContent {
  const track = CONTENT[gift];
  const idx = (dayNumber - 1) % track.length;
  return { ...track[idx], day: dayNumber };
}

export function getDayNumber(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, diff + 1);
}
