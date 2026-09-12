/**
 * ReadLoop — Master Book Registry
 * Architecture: Multi-track rotation engine
 *
 * TRACK SYSTEM:
 * - 'general'  → mainstream self-development (365 books, daily)
 * - 'hindu'    → Hindu philosophy, dharma, scripture (rotates weekly on Sundays)
 * - 'jain'     → Jain philosophy, ahimsa, anekantavada (rotates weekly on Thursdays)
 * - 'combined' → any book is shown; track drives the weekly rotation slot
 *
 * ROTATION ENGINE:
 * - General books: day-of-year seeded, wraps across the full library
 * - Community books: pinned to their community day, rotate by week-of-year
 * - Users selecting a community track see their books interspersed
 *   on their track day; general books fill all other days
 */

// ─── GENERAL BOOKS ────────────────────────────────────────────────────────────
const GENERAL_BOOKS = [
  {
    id: 1, emoji: "⚛️", track: 'general',
    title: "Atomic Habits", author: "James Clear",
    category: "Productivity", tags: ["Habits", "Productivity", "Psychology"],
    essence: "Tiny 1% improvements compound into remarkable results over time. Forget goals — build systems instead. Every action you take is a vote for the identity you want to become. The habit loop (cue, craving, response, reward) can be redesigned with four laws: make it obvious, make it attractive, make it easy, and make it satisfying.",
    quote: "You do not rise to the level of your goals. You fall to the level of your systems.",
    lessons: [
      "Identity-based habits outlast motivation-based ones — ask who you want to be, not what you achieve.",
      "Environment design beats willpower every time — redesign your space, not your resolve.",
      "Never miss twice — the recovery habit is the real habit that defines you."
    ],
    affiliateUrl: "https://amzn.to/atomic-habits",
    readTime: 5, difficulty: "Beginner"
  },
  {
    id: 2, emoji: "💡", track: 'general',
    title: "Think and Grow Rich", author: "Napoleon Hill",
    category: "Success", tags: ["Mindset", "Success", "Wealth"],
    essence: "Success begins in the mind. Hill studied 500 wealthy individuals and distilled 13 principles. Your dominant thought pattern literally programmes your outcomes. The burning desire for a definite purpose, combined with unwavering faith, is the formula behind every great fortune.",
    quote: "Whatever the mind can conceive and believe, it can achieve.",
    lessons: [
      "Write your chief definite purpose with a deadline and read it aloud twice daily.",
      "A mastermind group creates a third invisible intelligence none possess alone.",
      "Burn your bridges — total commitment removes the option of retreat."
    ],
    affiliateUrl: "https://amzn.to/think-grow-rich",
    readTime: 5, difficulty: "Beginner"
  },
  {
    id: 3, emoji: "🌅", track: 'general',
    title: "The Power of Now", author: "Eckhart Tolle",
    category: "Mindfulness", tags: ["Mindfulness", "Spirituality", "Wellbeing"],
    essence: "Most human suffering is manufactured by the ego's compulsive thinking about the past or future. The present moment is the only place life actually exists. When you observe your thoughts without identifying with them, you discover the watcher — pure awareness. Presence dissolves psychological pain at its root.",
    quote: "Realise deeply that the present moment is all you ever have.",
    lessons: [
      "When anxiety arises, ask: is there actually a problem right now, in this exact moment?",
      "Your mind is a tool — you are not your mind. Watch thoughts as a neutral observer.",
      "Pain is resistance to what is. Acceptance neutralises suffering more effectively than fighting it."
    ],
    affiliateUrl: "https://amzn.to/power-of-now",
    readTime: 5, difficulty: "Intermediate"
  },
  {
    id: 4, emoji: "🕯️", track: 'general',
    title: "Man's Search for Meaning", author: "Viktor E. Frankl",
    category: "Philosophy", tags: ["Philosophy", "Resilience", "Purpose"],
    essence: "Even inside Auschwitz, Frankl observed that prisoners who found meaning survived longer. Logotherapy teaches that the primary human drive is meaning. We cannot always choose our circumstances, but we can always choose our attitude. Suffering with meaning is endurable — even ennobling.",
    quote: "Everything can be taken from a man but one thing: the freedom to choose one's attitude in any given circumstance.",
    lessons: [
      "Identify your why — a reason to endure anything — and almost any how becomes manageable.",
      "Find meaning through work, through love, or through how you meet unavoidable suffering.",
      "You are always free to choose your attitude, regardless of your circumstances."
    ],
    affiliateUrl: "https://amzn.to/mans-search-meaning",
    readTime: 5, difficulty: "Intermediate"
  },
  {
    id: 5, emoji: "🧠", track: 'general',
    title: "Mindset", author: "Carol S. Dweck",
    category: "Psychology", tags: ["Psychology", "Learning", "Growth"],
    essence: "Intelligence and talent are not fixed — they are starting points. Growth mindset people believe abilities develop through dedication and hard work. Fixed mindset people avoid challenge to protect their self-image. The growth mindset turns failures into feedback and treats effort as the path.",
    quote: "The passion for stretching yourself, even when it's not going well, is the hallmark of the growth mindset.",
    lessons: [
      "Praise effort and strategy, never innate talent — it rewires how people respond to difficulty.",
      "When you fail, ask: what did I learn? What will I do differently next time?",
      "The word 'yet' is the most powerful word in learning: 'I can't do this... yet.'"
    ],
    affiliateUrl: "https://amzn.to/mindset-dweck",
    readTime: 5, difficulty: "Beginner"
  },
  {
    id: 6, emoji: "💪", track: 'general',
    title: "Grit", author: "Angela Duckworth",
    category: "Success", tags: ["Perseverance", "Success", "Psychology"],
    essence: "Talent × effort = skill; skill × effort = achievement. Effort counts twice. Grit — passion for long-term goals plus sustained perseverance — predicts success better than IQ or talent alone. Grit can be cultivated through interest, practice, purpose, and hope.",
    quote: "Enthusiasm is common. Endurance is rare.",
    lessons: [
      "Follow hard things through to completion every time — this trains the grit muscle.",
      "Pursue a single top-level goal with flexibility in the lower-level strategies.",
      "Optimistic self-talk during failure is not denial — it is the most effective learning strategy."
    ],
    affiliateUrl: "https://amzn.to/grit-duckworth",
    readTime: 5, difficulty: "Beginner"
  },
  {
    id: 7, emoji: "🎯", track: 'general',
    title: "Deep Work", author: "Cal Newport",
    category: "Productivity", tags: ["Focus", "Productivity", "Career"],
    essence: "The ability to focus without distraction on cognitively demanding tasks is becoming the most valuable and simultaneously rarest skill in the modern economy. Deep work drives rapid skill acquisition and produces output that shallow work — email, meetings, scrolling — can never match.",
    quote: "Clarity about what matters provides clarity about what does not.",
    lessons: [
      "Schedule deep work as a non-negotiable appointment and protect it from everything else.",
      "Embrace productive boredom — resist switching to stimulation at the first hint of difficulty.",
      "Drain the shallows: systematically reduce low-value digital activities from your day."
    ],
    affiliateUrl: "https://amzn.to/deep-work",
    readTime: 5, difficulty: "Intermediate"
  },
  {
    id: 8, emoji: "🌸", track: 'general',
    title: "Ikigai", author: "Héctor García & Francesc Miralles",
    category: "Purpose", tags: ["Purpose", "Longevity", "Wellbeing"],
    essence: "Ikigai is the intersection of what you love, what you are good at, what the world needs, and what you can be paid for. Okinawans never retire — they keep living their ikigai. Purpose, community, gentle movement, and eating to 80% fullness are the pillars of the world's longest lives.",
    quote: "Our ikigai is different for all of us, but one thing we have in common: we are all searching for meaning.",
    lessons: [
      "Your ikigai is lived daily, not found once — act on it in small ways starting today.",
      "Invest in your moai — your 5 closest friendships are worth more than any supplement.",
      "Flow and ikigai overlap — lose yourself in purposeful, challenging activity every day."
    ],
    affiliateUrl: "https://amzn.to/ikigai",
    readTime: 4, difficulty: "Beginner"
  },
  {
    id: 9, emoji: "✨", track: 'general',
    title: "The Alchemist", author: "Paulo Coelho",
    category: "Purpose", tags: ["Philosophy", "Purpose", "Fiction"],
    essence: "Every person has a Personal Legend — a destiny written in their soul. The universe conspires to help those who sincerely pursue their dreams. The journey transforms the seeker more than the destination ever could. Omens guide us; fear and comfort are the only real obstacles.",
    quote: "When you want something, all the universe conspires in helping you to achieve it.",
    lessons: [
      "Listen to the language of the world — synchronicities are real signals, not coincidences.",
      "The treasure is never where you start; the journey is where the treasure is formed inside you.",
      "The darkest moment before the dawn is the universe testing whether you truly mean it."
    ],
    affiliateUrl: "https://amzn.to/the-alchemist",
    readTime: 4, difficulty: "Beginner"
  },
  {
    id: 10, emoji: "🔥", track: 'general',
    title: "Can't Hurt Me", author: "David Goggins",
    category: "Resilience", tags: ["Mindset", "Resilience", "Fitness"],
    essence: "The human mind surrenders at 40% of its true capacity. Goggins, who overcame obesity and poverty to become a Navy SEAL and ultra-endurance athlete, proves that mental toughness is built through voluntary discomfort. Your cookie jar of past victories fuels you through present suffering.",
    quote: "We are all great. We just have to find the courage to develop our potential.",
    lessons: [
      "Use the accountability mirror — face your excuses daily, without self-pity.",
      "Callous your mind through repeated hard challenges that you choose voluntarily.",
      "When your mind says quit, you are only 40% done — the real capability begins there."
    ],
    affiliateUrl: "https://amzn.to/cant-hurt-me",
    readTime: 5, difficulty: "Intermediate"
  },
]

// ─── HINDU PHILOSOPHY & DHARMA BOOKS ─────────────────────────────────────────
// Community track: rotates every Sunday in the daily engine
const HINDU_BOOKS = [
  {
    id: 1001, emoji: "🕉️", track: 'hindu',
    title: "The Bhagavad Gita", author: "Vyasa (trans. Eknath Easwaran)",
    category: "Hindu Philosophy", tags: ["Dharma", "Karma", "Yoga", "Hindu"],
    communityNote: "The eternal dialogue between Arjuna and Krishna on the battlefield of Kurukshetra — a complete guide to righteous living.",
    essence: "On the eve of battle, the warrior Arjuna loses his will to fight when he sees his own kin arrayed against him. Lord Krishna's teachings to Arjuna form the Bhagavad Gita — 18 chapters covering duty (dharma), right action (karma yoga), devotion (bhakti yoga), knowledge (jnana yoga), and the nature of the Self (Atman). The central teaching: perform your duty with full effort, without attachment to the fruits of your actions. The soul is eternal; the body is temporary.",
    quote: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
    lessons: [
      "Nishkama karma — act from duty and love, releasing all attachment to outcomes.",
      "The Atman (true Self) is eternal and unchanging; do not mourn the impermanent body.",
      "Equanimity in pleasure and pain, success and failure — this is the mark of a yogi."
    ],
    affiliateUrl: "https://amzn.to/bhagavad-gita-easwaran",
    readTime: 6, difficulty: "Intermediate",
    scriptureVerse: "Gita 2.47"
  },
  {
    id: 1002, emoji: "🪔", track: 'hindu',
    title: "The Upanishads", author: "Eknath Easwaran (translator)",
    category: "Hindu Philosophy", tags: ["Vedanta", "Brahman", "Atman", "Hindu"],
    communityNote: "The philosophical crown of the Vedas — 108 texts exploring the ultimate nature of reality and consciousness.",
    essence: "The Upanishads, composed between 800–200 BCE, are the foundation of all Vedantic philosophy. Their central insight: Brahman (the universal consciousness) and Atman (the individual soul) are ultimately one and the same — 'Tat tvam asi' (That thou art). The apparent multiplicity of the world is maya (illusion); liberation (moksha) comes from realising this non-dual truth through meditation and self-enquiry.",
    quote: "Tat tvam asi — That thou art. The individual soul and the universal consciousness are one.",
    lessons: [
      "Self-enquiry — 'Who am I?' — is the most direct path to liberation in the Vedantic tradition.",
      "The world experienced through the senses is not false, but is not the deepest reality.",
      "Moksha (liberation) is not achieved after death but realised here, in this life, through knowledge."
    ],
    affiliateUrl: "https://amzn.to/upanishads-easwaran",
    readTime: 6, difficulty: "Advanced",
    scriptureVerse: "Chandogya Upanishad 6.8.7"
  },
  {
    id: 1003, emoji: "🌺", track: 'hindu',
    title: "Autobiography of a Yogi", author: "Paramahansa Yogananda",
    category: "Hindu Philosophy", tags: ["Yoga", "Spirituality", "Kriya", "Hindu"],
    communityNote: "One of the most widely read spiritual classics of the 20th century — Steve Jobs requested it be given to all attendees of his memorial.",
    essence: "Yogananda's life story is also a profound introduction to the science of yoga and the reality of God. He describes his search for a guru, the miracles he witnessed, and the philosophy of Kriya Yoga — a specific meditation technique that accelerates spiritual evolution. The book presents Eastern and Western spirituality as two paths to the same truth, and demonstrates that the inner world of consciousness is as real and vast as the outer world of matter.",
    quote: "The greater the will, the greater the flow of energy. It is not the body but the mind that fatigues first.",
    lessons: [
      "Kriya yoga — control of the life force through breath — accelerates spiritual realisation.",
      "The guru-disciple relationship is the most sacred transmission of wisdom across generations.",
      "God is not an abstract concept but a direct, personal experience available through meditation."
    ],
    affiliateUrl: "https://amzn.to/autobiography-of-a-yogi",
    readTime: 5, difficulty: "Beginner"
  },
  {
    id: 1004, emoji: "🏔️", track: 'hindu',
    title: "The Yoga Sutras of Patanjali", author: "Patanjali (trans. Sri Swami Satchidananda)",
    category: "Hindu Philosophy", tags: ["Yoga", "Meditation", "Samadhi", "Hindu"],
    communityNote: "The classical codification of yoga philosophy — 196 sutras that define the eightfold path to liberation.",
    essence: "Patanjali's 196 aphorisms, composed around 400 CE, define yoga not as physical postures but as 'chitta vritti nirodha' — the cessation of the fluctuations of the mind. The eight limbs of Ashtanga Yoga progress from external ethics (yamas, niyamas) through posture and breath control to the internal states of concentration (dharana), meditation (dhyana), and absorption (samadhi). The goal is kaivalya — perfect independence of the pure consciousness from all conditioning.",
    quote: "Yoga is the cessation of the movements of consciousness. Then the witness — pure consciousness — abides in its own nature.",
    lessons: [
      "The eight limbs are progressive — ethics and posture must precede meditation for real progress.",
      "Pratyahara (withdrawal of senses) is the bridge between outer and inner practices.",
      "Samadhi is not a trance but a state of absolute clarity in which the meditator and the object merge."
    ],
    affiliateUrl: "https://amzn.to/yoga-sutras-patanjali",
    readTime: 6, difficulty: "Advanced",
    scriptureVerse: "Yoga Sutras 1.2"
  },
  {
    id: 1005, emoji: "☀️", track: 'hindu',
    title: "The Complete Works of Swami Vivekananda", author: "Swami Vivekananda",
    category: "Hindu Philosophy", tags: ["Vedanta", "Service", "Karma Yoga", "Hindu"],
    communityNote: "Vivekananda's 1893 Chicago address opened Western eyes to Indian philosophy — his synthesis of Vedanta remains unmatched.",
    essence: "Vivekananda synthesised the four yogas — Karma (action), Bhakti (devotion), Jnana (knowledge), and Raja (meditation) — as four roads to the same summit. His central contribution was Practical Vedanta: the idea that serving humanity is itself the highest form of worship, because Brahman (God) is present in every person. 'He who sees Shiva in the poor, in the weak, in the diseased, truly worships God.' Strength, not sympathy, was his message — strength through self-knowledge.",
    quote: "Arise, awake, and stop not till the goal is reached.",
    lessons: [
      "Each soul is potentially divine — education is the manifestation of perfection already within.",
      "Service to humanity is the highest form of worship — 'Daridra Narayana' (God in the poor).",
      "Strength and fearlessness are the true marks of spiritual development, not weakness or passivity."
    ],
    affiliateUrl: "https://amzn.to/vivekananda-complete-works",
    readTime: 6, difficulty: "Intermediate"
  },
  {
    id: 1006, emoji: "🌊", track: 'hindu',
    title: "The Ramayana", author: "Valmiki (trans. Arshia Sattar)",
    category: "Hindu Philosophy", tags: ["Dharma", "Devotion", "Epic", "Hindu"],
    communityNote: "The Adi Kavya (first poem) — Valmiki's epic of Ram and Sita is the most beloved story in Hindu civilisation.",
    essence: "The Ramayana tells the story of Prince Ram — an avatar of Vishnu — his exile to the forest with wife Sita and brother Lakshman, Sita's abduction by the demon king Ravan, and Ram's eventual victory with the help of Hanuman and the vanara (monkey) army. At a deeper level, the Ramayana is a guide to maryada (righteous boundaries), ideal relationships, and the triumph of dharma over adharma. Ram's conduct as son, husband, king, and warrior sets the standard for righteous human life.",
    quote: "The noble man's life is service. His death is for dharma. His words are truth. His actions — compassion.",
    lessons: [
      "Maryada Purushottam — Ram's life demonstrates how to honour every relationship with full integrity.",
      "Hanuman's devotion shows that complete self-surrender to a righteous cause generates extraordinary power.",
      "Dharma (righteousness) is not static — it must be lived with discernment in each unique circumstance."
    ],
    affiliateUrl: "https://amzn.to/ramayana-sattar",
    readTime: 5, difficulty: "Beginner"
  },
  {
    id: 1007, emoji: "🔱", track: 'hindu',
    title: "The Mahabharata (abridged)", author: "C. Rajagopalachari",
    category: "Hindu Philosophy", tags: ["Dharma", "Epic", "Philosophy", "Hindu"],
    communityNote: "The world's longest epic — and its most sophisticated exploration of dharma, duty, and the complexity of moral choice.",
    essence: "The Mahabharata is not merely a war story — it is a dharmashastra, an encyclopaedia of righteous conduct across 18 books and 100,000 verses. At its centre is the great war of Kurukshetra between the Pandavas and Kauravas — a conflict in which dharma itself appears on both sides. The text demonstrates that dharma is not a simple rulebook but a living judgement, different for each person, each role, and each moment. The Bhagavad Gita is its most famous episode.",
    quote: "Do not do to others what you would not wish done to yourself. This is the whole of dharma — heed it well.",
    lessons: [
      "Dharma is contextual — the right action depends on one's role, stage of life, and specific circumstance.",
      "The Pandavas win not through superior strength but through adherence to truth even in impossible situations.",
      "Draupadi's question to the court — 'Who is righteous here?' — is the eternal question each of us must ask."
    ],
    affiliateUrl: "https://amzn.to/mahabharata-rajagopalachari",
    readTime: 5, difficulty: "Intermediate"
  },
]

// ─── JAIN PHILOSOPHY & WISDOM BOOKS ──────────────────────────────────────────
// Community track: rotates every Thursday in the daily engine
const JAIN_BOOKS = [
  {
    id: 2001, emoji: "☸️", track: 'jain',
    title: "Tattvartha Sutra (That Which Is)", author: "Umasvati (trans. Nathmal Tatia)",
    category: "Jain Philosophy", tags: ["Jain", "Moksha", "Anekantavada", "Non-violence"],
    communityNote: "The Tattvartha Sutra is the only text accepted by both Digambara and Shvetambara Jains — the foundational philosophical text of the entire tradition.",
    essence: "Umasvati's Tattvartha Sutra, composed around 200–400 CE, presents the complete Jain worldview in 344 sutras across 10 chapters. It covers the seven tattvas (fundamental realities): jiva (souls), ajiva (non-living substances), asrava (influx of karma), bandha (bondage), samvara (stopping of karma), nirjara (shedding of karma), and moksha (liberation). The path to moksha is the ratnatraya — right faith, right knowledge, and right conduct — pursued through non-violence (ahimsa), truthfulness (satya), non-stealing (asteya), celibacy (brahmacharya), and non-possession (aparigraha).",
    quote: "Parasparopagraho jivanam — Living beings render service to one another. This is the foundation of Jain ethics.",
    lessons: [
      "Karma in Jainism is a literal, physical substance — it is attracted by mental, verbal, and physical activity.",
      "Aparigraha (non-possession) is not poverty but the recognition that attachment, not objects, causes suffering.",
      "Right faith precedes right knowledge — understanding the nature of the soul is the beginning of liberation."
    ],
    affiliateUrl: "https://amzn.to/tattvartha-sutra",
    readTime: 6, difficulty: "Advanced",
    scriptureVerse: "Tattvartha Sutra 5.21"
  },
  {
    id: 2002, emoji: "🕊️", track: 'jain',
    title: "The Jain Path of Purification", author: "Padmanabh S. Jaini",
    category: "Jain Philosophy", tags: ["Jain", "Karma", "Ahimsa", "Liberation"],
    communityNote: "The most comprehensive academic introduction to Jain philosophy available in English — essential for understanding the tradition in depth.",
    essence: "Jaini's masterwork explains the complete Jain philosophical system with rigour and clarity. Central to Jain thought is the concept of anekantavada — the doctrine of many-sidedness — which holds that reality is infinitely complex and that any single perspective captures only a partial truth. Syadvada (the doctrine of conditional predication) formalises this: every assertion is preceded by 'syat' (in some sense, perhaps) — a radical epistemic humility that prevents dogmatism. Combined with ahimsa (non-violence in thought, word, and action), this creates a philosophy of extraordinary practical compassion.",
    quote: "The nature of the soul is consciousness — knowledge and bliss are its intrinsic qualities, karma their veil.",
    lessons: [
      "Anekantavada teaches that your opponent may also be partially right — seek truth, not victory.",
      "Ahimsa extends beyond physical action to thought and word — even mental violence accumulates karma.",
      "The path to liberation is self-effort alone — no god, guru, or grace can liberate another person's soul."
    ],
    affiliateUrl: "https://amzn.to/jain-path-of-purification",
    readTime: 6, difficulty: "Advanced"
  },
  {
    id: 2003, emoji: "🌿", track: 'jain',
    title: "Acaranga Sutra", author: "Mahavira (trans. Hermann Jacobi)",
    category: "Jain Philosophy", tags: ["Jain", "Ahimsa", "Asceticism", "Mahavira"],
    communityNote: "The oldest Jain scripture — the direct teachings of Mahavira, the 24th and last Tirthankara of this cosmic era.",
    essence: "The Acaranga Sutra records Mahavira's path to liberation and his teachings on right conduct for monks and householders. Mahavira's central realisation, achieved after 12 years of extreme asceticism: 'All living beings desire happiness and are averse to pain. Therefore one should not cause pain to another.' This was not sentimentality but metaphysics — the Jain understanding that all living beings, including plants and micro-organisms, possess consciousness (jiva), and that causing harm generates karma that binds the soul to the cycle of rebirth.",
    quote: "One who neglects or disregards the existence of earth, air, fire, water, and vegetation disregards his own existence.",
    lessons: [
      "Mahavira's 12 years of silent endurance shows that equanimity — not suppression — is the path through suffering.",
      "The five mahavratas (great vows) are not restrictions but liberations — they remove the roots of suffering.",
      "Ecological consciousness is intrinsic to Jain ethics — the earth itself is alive and deserving of care."
    ],
    affiliateUrl: "https://amzn.to/acaranga-sutra",
    readTime: 6, difficulty: "Advanced",
    scriptureVerse: "Acaranga Sutra 1.1"
  },
  {
    id: 2004, emoji: "💎", track: 'jain',
    title: "Yogashastra", author: "Hemachandra (trans. Olle Qvarnström)",
    category: "Jain Philosophy", tags: ["Jain", "Yoga", "Ethics", "Asceticism"],
    communityNote: "Hemachandra's 12th century masterpiece — the most complete guide to Jain practice for both monks and laypeople.",
    essence: "Hemachandra's Yogashastra is a comprehensive guide to Jain yoga — not the physical postures of the Hindu tradition but a systematic path of mental discipline, ethical conduct, and meditation leading to liberation. It covers the twelve anuvratas (lesser vows) for laypeople, the five mahavratas (great vows) for monks, and the internal practices of concentration (dharana) and meditation (dhyana) on the nature of the pure soul. The text is remarkable for its accessibility — Hemachandra designed it for educated laypeople, not just ascetics.",
    quote: "The self is the friend of the self, and the self is the enemy of the self — it all depends on whether the self is conquered.",
    lessons: [
      "The twelve anuvratas make Jain ethics practical for householders — partial restraint is still valuable.",
      "Samatvayoga — equanimity yoga — is the practice of maintaining inner stillness through all circumstances.",
      "The meditative focus on the pure soul (shuddhatma) gradually dissolves the identification with karma."
    ],
    affiliateUrl: "https://amzn.to/yogashastra-hemachandra",
    readTime: 5, difficulty: "Intermediate"
  },
  {
    id: 2005, emoji: "⚖️", track: 'jain',
    title: "The Jains", author: "Paul Dundas",
    category: "Jain Philosophy", tags: ["Jain", "History", "Philosophy", "Culture"],
    communityNote: "The definitive scholarly introduction to Jainism in English — essential context for understanding the tradition's remarkable history.",
    essence: "Paul Dundas's authoritative study traces Jainism from its origins through Mahavira (599–527 BCE), its split into Digambara (sky-clad) and Shvetambara (white-clad) sects, and its extraordinary intellectual flowering in medieval India. Jain scholars made foundational contributions to logic, mathematics, poetry, and politics. The doctrine of anekantavada (many-sidedness) was arguably the world's first formal philosophy of pluralism. Jain merchants and scholars sustained the tradition through centuries of political change precisely because their ethics of non-violence and non-possession made them trusted across all communities.",
    quote: "Jainism is not merely a religion of renunciation but a complete civilisation — a way of knowing, living, and being in relation to all forms of life.",
    lessons: [
      "Jain intellectual culture — anekantavada, syadvada — created tools for respectful disagreement still needed today.",
      "The tradition's survival through 2,500 years of upheaval demonstrates the resilience of ethical integrity.",
      "Jain businesspeople demonstrate that ahimsa and commercial success are not contradictions."
    ],
    affiliateUrl: "https://amzn.to/the-jains-dundas",
    readTime: 5, difficulty: "Intermediate"
  },
  {
    id: 2006, emoji: "🙏", track: 'jain',
    title: "Samayasara (The Soul-Essence)", author: "Kundakunda (trans. A. Chakravarti)",
    category: "Jain Philosophy", tags: ["Jain", "Soul", "Nishchaya", "Liberation"],
    communityNote: "Kundakunda's 1st–2nd century CE masterpiece — the most influential text in the Digambara tradition and a supreme exposition of the pure soul.",
    essence: "Kundakunda's Samayasara (Soul-Essence) establishes a crucial distinction: nishchaya naya (the absolute standpoint) versus vyavahara naya (the conventional standpoint). From the absolute standpoint, the soul is already pure, already liberated — it neither gains nor loses karma; it neither acts nor is acted upon. Bondage and liberation are conventional descriptions of a soul that mistakenly identifies with body and karma. True liberation is recognising the soul's intrinsic purity right now. This non-dualistic insight makes Samayasara one of the most radical texts in world philosophy.",
    quote: "He who knows the self knows all the scriptures. He who does not know the self knows nothing, though he may know all the scriptures.",
    lessons: [
      "The nishchaya standpoint: you are already pure — liberation is recognition, not achievement.",
      "Right faith means seeing oneself as pure consciousness, not as body, name, caste, or role.",
      "The practice is paramatmabhavana — contemplating the nature of the pure soul — until it becomes lived reality."
    ],
    affiliateUrl: "https://amzn.to/samayasara-kundakunda",
    readTime: 6, difficulty: "Advanced",
    scriptureVerse: "Samayasara 1.1"
  },
  {
    id: 2007, emoji: "🌍", track: 'jain',
    title: "Jainism and Ecology", author: "Christopher Key Chapple (editor)",
    category: "Jain Philosophy", tags: ["Jain", "Ecology", "Ahimsa", "Environment"],
    communityNote: "A collection of essays exploring how ancient Jain principles offer solutions to the contemporary ecological crisis.",
    essence: "This Harvard volume brings together scholars and practitioners to examine Jainism's extraordinary relevance to ecological ethics. The Jain principle that every atom of earth, water, fire, and air contains consciousness means that environmental destruction is not merely wasteful — it is violence against living beings. The doctrine of aparigraha (non-possession) directly addresses consumerism. Jain vegetarianism, water conservation practices, and the tradition of paryushana (annual community fast and reflection) all constitute a living ecological ethic practised for 2,500 years.",
    quote: "The Jain vision of the cosmos as filled with living souls provides one of the most comprehensive frameworks for ecological ethics ever developed.",
    lessons: [
      "Jain cosmology — all matter contains souls — grounds environmental ethics in metaphysics, not sentiment.",
      "Aparigraha (non-possession) is the most radical response to consumerism available in any tradition.",
      "Paryushana — the annual period of fasting, forgiveness, and reflection — models community ecological practice."
    ],
    affiliateUrl: "https://amzn.to/jainism-ecology",
    readTime: 5, difficulty: "Intermediate"
  },
]

// ─── COMBINED REGISTRY ────────────────────────────────────────────────────────
export const ALL_BOOKS = [...GENERAL_BOOKS, ...HINDU_BOOKS, ...JAIN_BOOKS]

// ─── ROTATION ENGINE ──────────────────────────────────────────────────────────
/**
 * ARCHITECTURE:
 * - General books rotate daily using a deterministic seed (epoch days)
 * - Community books (Hindu/Jain) are interspersed on their track day
 * - Hindu track day: Sunday (getDay() === 0)
 * - Jain track day:  Thursday (getDay() === 4)
 * - The engine produces a stable, reproducible schedule:
 *   same date always yields same book for every user globally
 *
 * @param {Date} date - date to resolve
 * @param {string} communityTrack - 'none' | 'hindu' | 'jain'
 * @returns {{ primary: Book, community: Book|null, isCommunityDay: boolean }}
 */
export function resolveBooks(date = new Date(), communityTrack = 'none') {
  // Epoch-day seed: number of days since 1 Jan 2026 (launch year)
  const LAUNCH_DATE = new Date('2026-01-01T00:00:00Z')
  const epochDays = Math.floor((date - LAUNCH_DATE) / 86400000)

  // Defensive: handle empty libraries gracefully
  const safeGeneral = GENERAL_BOOKS.length > 0 ? GENERAL_BOOKS : [GENERAL_BOOKS[0]]
  const safeHindu   = HINDU_BOOKS.length > 0   ? HINDU_BOOKS   : null
  const safeJain    = JAIN_BOOKS.length > 0    ? JAIN_BOOKS    : null

  // Primary general book: stable rotation across all general books
  const generalIdx = ((epochDays % safeGeneral.length) + safeGeneral.length) % safeGeneral.length
  const primaryBook = safeGeneral[generalIdx]

  // Community book resolution
  const dayOfWeek = date.getDay()       // 0=Sun, 1=Mon, ... 6=Sat
  const weekOfYear = Math.floor(epochDays / 7)

  const isHinduDay = dayOfWeek === 0    // Sunday
  const isJainDay  = dayOfWeek === 4    // Thursday

  let communityBook = null
  let isCommunityDay = false

  if (communityTrack === 'hindu' && isHinduDay && safeHindu) {
    const hinduIdx = ((weekOfYear % safeHindu.length) + safeHindu.length) % safeHindu.length
    communityBook = safeHindu[hinduIdx]
    isCommunityDay = true
  }

  if (communityTrack === 'jain' && isJainDay && safeJain) {
    const jainIdx = ((weekOfYear % safeJain.length) + safeJain.length) % safeJain.length
    communityBook = safeJain[jainIdx]
    isCommunityDay = true
  }

  return { primary: primaryBook, community: communityBook, isCommunityDay, epochDays, dayOfWeek }
}

/**
 * Convenience: get today's primary book
 */
export function getTodaysBook(communityTrack = 'none') {
  const { primary, community, isCommunityDay } = resolveBooks(new Date(), communityTrack)
  // On community day: return the community book as primary
  return (isCommunityDay && community) ? community : primary
}

/**
 * Get the full week's schedule (7 days) for a given track
 * Used by dashboard and automation engine
 */
export function getWeekSchedule(startDate = new Date(), communityTrack = 'none') {
  const monday = new Date(startDate)
  const day = monday.getDay()
  monday.setDate(monday.getDate() - (day === 0 ? 6 : day - 1))

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    const resolved = resolveBooks(d, communityTrack)
    return {
      date: d,
      dayName: d.toLocaleDateString('en-GB', { weekday: 'short' }),
      dateStr: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      book: (resolved.isCommunityDay && resolved.community) ? resolved.community : resolved.primary,
      isCommunityDay: resolved.isCommunityDay,
      track: resolved.isCommunityDay ? communityTrack : 'general',
    }
  })
}

// ─── QUERY HELPERS ────────────────────────────────────────────────────────────
export function getAllBooks()             { return ALL_BOOKS }
export function getGeneralBooks()        { return GENERAL_BOOKS }
export function getHinduBooks()          { return HINDU_BOOKS }
export function getJainBooks()           { return JAIN_BOOKS }
export function getBookById(id)          { return ALL_BOOKS.find(b => b.id === id) || null }
export function getBooksByCategory(cat)  { return ALL_BOOKS.filter(b => b.category === cat) }
export function getBooksByTrack(track)   {
  if (track === 'hindu')   return HINDU_BOOKS
  if (track === 'jain')    return JAIN_BOOKS
  if (track === 'general') return GENERAL_BOOKS
  return ALL_BOOKS
}

export const CATEGORIES = [...new Set(ALL_BOOKS.map(b => b.category))]
export const TRACKS = ['general', 'hindu', 'jain']
