export type CourseLevel = "Basic" | "Immediate" | "Advanced";

export type Lesson = {
  id: string;
  level: CourseLevel;
  title: string;
  objective: string;
  teaching: string;
  scriptures: string[];
  deepDive: string[];
  practice: string[];
  prayerFocus: string;
};

export type Flashcard = {
  term: string;
  definition: string;
  level: CourseLevel;
  scripture: string;
};

export type LexiconEntry = {
  term: string;
  strongs: string;
  language: "Greek" | "Hebrew";
  transliteration: string;
  shortDefinition: string;
  studyNote: string;
  scriptures: string[];
};

export const lessons: Lesson[] = [
  {
    id: "new-identity",
    level: "Basic",
    title: "Your New Identity and Spiritual Anatomy",
    objective:
      "Understand what happened at salvation and begin agreeing with the new creation reality in Christ.",
    teaching:
      "You are a spirit, you possess a soul, and you live in a body. When you came to Christ, your body and habits did not instantly change, but your inner spirit was made alive to God. This lesson anchors the believer in the new creation before moving into deeper spiritual practice.",
    scriptures: ["1 Thessalonians 5:23", "2 Corinthians 5:17", "1 Corinthians 6:17", "Ephesians 4:24"],
    deepDive: [
      "What does Scripture say changed when a person is in Christ?",
      "Where do spirit, soul, and body each show up in daily life?",
      "Which old identity statements need to be replaced with Scripture?"
    ],
    practice: [
      "Write one old identity statement you have repeated and replace it with 2 Corinthians 5:17.",
      "Pray slowly through 1 Thessalonians 5:23 and ask the Lord to sanctify spirit, soul, and body.",
      "Declare daily: I am a new creation in Christ. My spirit is joined to the Lord."
    ],
    prayerFocus:
      "Father, establish my heart in the truth of the new birth and teach me to live from the life of Christ in me."
  },
  {
    id: "fear-and-love",
    level: "Basic",
    title: "Defeating Fear with Perfect Love",
    objective:
      "Learn how to reject fear, cast down false imaginations, and answer anxiety with the Word of God.",
    teaching:
      "Fear is not the believer's inheritance. Scripture identifies a spirit of fear as something God has not given. The disciple learns to rest in the Father's love, resist fearful thoughts, and speak truth with authority.",
    scriptures: ["2 Timothy 1:7", "1 John 4:18", "2 Corinthians 10:4-5", "Psalm 27:1"],
    deepDive: [
      "How does perfect love cast out fear?",
      "What thoughts need to be taken captive instead of entertained?",
      "What does a sound mind look like in a normal day?"
    ],
    practice: [
      "List three recurring fear thoughts and answer each with a Scripture.",
      "Speak 2 Timothy 1:7 aloud every morning for seven days.",
      "When fear rises, pause, breathe, reject it, and replace it with a direct confession of truth."
    ],
    prayerFocus:
      "Holy Spirit, reveal the Father's love to me and train my mind to reject fear quickly."
  },
  {
    id: "daily-altar",
    level: "Basic",
    title: "Building Spiritual Capacity",
    objective:
      "Establish simple daily practices that feed the spirit and quiet the soul.",
    teaching:
      "Your spirit must be strengthened through Scripture, prayer, worship, and silence. This is not performance; it is spiritual nourishment. A consistent altar builds capacity for obedience, discernment, and endurance.",
    scriptures: ["Jude 1:20", "Acts 20:32", "1 Corinthians 14:2-4", "Psalm 46:10"],
    deepDive: [
      "How does the Word build the believer up?",
      "What does praying in the Holy Ghost produce in the inner man?",
      "Why does silence help the soul stop dominating the spirit?"
    ],
    practice: [
      "Set a 20-minute daily altar: 7 minutes Word, 7 minutes prayer, 6 minutes silence.",
      "Use a notebook to record one Scripture, one prayer, and one obedience step.",
      "Increase the altar gradually rather than trying to force a dramatic routine."
    ],
    prayerFocus:
      "Lord, teach me to build a faithful daily altar that strengthens my spirit and renews my mind."
  },
  {
    id: "words-and-faith",
    level: "Immediate",
    title: "The Architecture of Words and Faith",
    objective:
      "Practice speaking in agreement with Scripture and confronting obstacles with faith-filled words.",
    teaching:
      "Faith is described as substance and evidence. Scripture also teaches that words carry weight. This lesson helps the disciple stop using speech to rehearse defeat and begin using speech to agree with God's promises.",
    scriptures: ["Hebrews 11:1-3", "Mark 11:23", "Proverbs 18:21", "Romans 10:17"],
    deepDive: [
      "How does faith come according to Romans 10:17?",
      "What mountain is Jesus describing in Mark 11:23?",
      "Where have your words been framing an outcome you do not want?"
    ],
    practice: [
      "Identify one mountain and write a Scripture-based confession against it.",
      "Spend five minutes reading Hebrews 11 aloud and mark repeated faith patterns.",
      "Replace complaint language with direct prayer and biblical confession for one full day."
    ],
    prayerFocus:
      "Jesus, purify my words so my speech agrees with Your authority and Your promises."
  },
  {
    id: "dream-realm",
    level: "Immediate",
    title: "Securing the Dream Realm",
    objective:
      "Create a prayerful, Scripture-grounded bedtime pattern for discernment, peace, and spiritual protection.",
    teaching:
      "Scripture shows that God can speak through dreams and that spiritual opposition can move while people sleep. This lesson keeps the focus practical: consecrate sleep to the Lord, test dreams by Scripture, reject fear, and bring troubling dreams to prayer.",
    scriptures: ["Job 33:14-18", "Matthew 13:25", "Genesis 40:8", "Psalm 4:8"],
    deepDive: [
      "How did God use dreams in Scripture?",
      "How should a believer test a dream instead of reacting in fear?",
      "What bedtime habits invite peace and spiritual clarity?"
    ],
    practice: [
      "Before sleep, pray Psalm 4:8 and dedicate your dreams to the Lord.",
      "Keep a simple dream journal: date, dream summary, emotions, Scripture check, prayer response.",
      "If a dream feels defiling or fearful, reject agreement with it and ask Jesus for cleansing, wisdom, and peace."
    ],
    prayerFocus:
      "Lord, guard my sleep, purify my imagination, and train me to discern Your voice with peace."
  },
  {
    id: "deliverance-protocol",
    level: "Immediate",
    title: "The 4-Step Legal Deliverance Protocol",
    objective:
      "Walk through repentance, renunciation, closing doors, and recovery in a clear prayer sequence.",
    teaching:
      "Deliverance is approached as agreement with the victory of Jesus. The disciple removes known legal ground through repentance, renounces ungodly agreements, closes doors by obedience and the blood of Christ, then commands oppression to leave in Jesus' name.",
    scriptures: ["1 John 1:9", "Colossians 2:14-15", "Luke 10:19", "Revelation 12:10-11"],
    deepDive: [
      "What does Colossians say Jesus did to the record against us?",
      "What doors need repentance and practical obedience?",
      "How does the blood of Jesus answer accusation?"
    ],
    practice: [
      "Repent: confess known sin and receive cleansing according to 1 John 1:9.",
      "Renounce: verbally reject ungodly covenants, occult ties, sexual sin, fear, bitterness, and inherited patterns.",
      "Close the door: remove objects, habits, media, or agreements that keep the door open.",
      "Cast out and recover: command oppression to leave in Jesus' name and ask the Lord to restore what was stolen."
    ],
    prayerFocus:
      "Righteous Judge, I present the blood of Jesus over every accusation and receive freedom through Christ's finished work."
  },
  {
    id: "altars-and-priesthood",
    level: "Advanced",
    title: "Priesthood, Altars, and Consecrated Space",
    objective:
      "Understand worship, consecration, and the home altar as a lifestyle of ministering to the Lord.",
    teaching:
      "Priesthood precedes rulership. A disciple learns to minister to the Lord, not only ask for things. Consecrated space, worship, thanksgiving, and obedience shape the atmosphere of a home and form a stable place of communion with God.",
    scriptures: ["Romans 12:1", "Hebrews 10:19-22", "Psalm 100:4", "Amos 9:11"],
    deepDive: [
      "What does it mean to present your body as a living sacrifice?",
      "How does Hebrews describe access to the holiest by the blood of Jesus?",
      "What changes when worship becomes ministry to the Lord rather than only request?"
    ],
    practice: [
      "Choose a clean, quiet place for daily worship and Scripture.",
      "Begin with thanksgiving, move into praise, then sit quietly before the Lord.",
      "Keep this altar simple, uncluttered, and free from performance pressure."
    ],
    prayerFocus:
      "Lord, make my life and home a consecrated place where Your presence is honored."
  },
  {
    id: "courtroom-prayer",
    level: "Advanced",
    title: "Courtroom Prayer and the Accuser",
    objective:
      "Pray with biblical confidence against accusation, condemnation, and recurring bondage.",
    teaching:
      "Scripture presents God as Judge, Jesus as Advocate, and Satan as accuser. The disciple does not beg from fear; the disciple appeals to the finished work of Christ, repents where needed, and receives the verdict of the cross.",
    scriptures: ["Daniel 7:26", "Luke 18:1-8", "1 John 2:1", "Revelation 12:10-11"],
    deepDive: [
      "What does Jesus teach through the persistent widow?",
      "How does Jesus function as Advocate?",
      "What accusations have you believed that the blood of Jesus answers?"
    ],
    practice: [
      "Enter prayer with thanksgiving and worship before presenting petitions.",
      "Name the accusation, repent if needed, and answer it with the blood of Jesus.",
      "Write a verdict statement: In Christ, this accusation has no authority over me."
    ],
    prayerFocus:
      "Father, teach me to stand in Christ's advocacy and reject every accusation answered by the cross."
  },
  {
    id: "glory-protocol",
    level: "Advanced",
    title: "The Glory Protocol and Resurrection Hope",
    objective:
      "Develop a mature rhythm of thanksgiving, praise, worship, stillness, and obedience.",
    teaching:
      "The advanced life is not noise or clutter; it is sustained nearness to God. Thanksgiving, praise, worship, stillness, and obedience train the disciple to become sensitive to the presence of God and anchored in resurrection hope.",
    scriptures: ["Psalm 100:4", "John 11:25", "Hebrews 10:19-20", "2 Corinthians 3:18"],
    deepDive: [
      "How does Psalm 100 order thanksgiving and praise?",
      "What does resurrection life mean for daily discipleship?",
      "How are believers transformed as they behold the Lord?"
    ],
    practice: [
      "Spend 10 minutes in thanksgiving, 10 minutes in praise, and 10 minutes in worshipful stillness.",
      "Read John 11:25 and pray over areas that need resurrection hope.",
      "End every glory practice with one concrete act of obedience."
    ],
    prayerFocus:
      "Jesus, draw me into Your presence and transform me as I behold Your glory."
  }
];

export const flashcards: Flashcard[] = [
  {
    term: "New Creation",
    definition: "The believer's new identity in Christ where old things are passed away and all things become new.",
    level: "Basic",
    scripture: "2 Corinthians 5:17"
  },
  {
    term: "Spirit, Soul, and Body",
    definition: "The biblical anatomy of the person: spirit relates to God, soul includes mind/will/emotions, body lives in the natural world.",
    level: "Basic",
    scripture: "1 Thessalonians 5:23"
  },
  {
    term: "Sound Mind",
    definition: "The disciplined, Spirit-helped mind that rejects fear and agrees with God's truth.",
    level: "Basic",
    scripture: "2 Timothy 1:7"
  },
  {
    term: "Daily Altar",
    definition: "A simple, consistent rhythm of Scripture, prayer, worship, silence, and obedience before God.",
    level: "Basic",
    scripture: "Acts 20:32"
  },
  {
    term: "Faith",
    definition: "Biblical confidence in God that receives His Word as substance and acts in obedience.",
    level: "Immediate",
    scripture: "Hebrews 11:1"
  },
  {
    term: "Renounce",
    definition: "To verbally reject and break agreement with sin, fear, occult ties, ungodly covenants, or demonic oppression.",
    level: "Immediate",
    scripture: "Colossians 2:14-15"
  },
  {
    term: "Dream Journal",
    definition: "A simple record used to test dreams by Scripture, pray with wisdom, and avoid fear-driven interpretation.",
    level: "Immediate",
    scripture: "Job 33:14-18"
  },
  {
    term: "Accuser",
    definition: "A biblical title for Satan as the one who accuses, answered by the blood of the Lamb and Christ's advocacy.",
    level: "Advanced",
    scripture: "Revelation 12:10-11"
  },
  {
    term: "Priesthood",
    definition: "The believer's ministry to God through consecration, worship, prayer, and surrendered living.",
    level: "Advanced",
    scripture: "Romans 12:1"
  },
  {
    term: "Glory Protocol",
    definition: "A structured practice of thanksgiving, praise, worship, stillness, and obedience for deeper communion with God.",
    level: "Advanced",
    scripture: "Psalm 100:4"
  }
];

export const lexicon: LexiconEntry[] = [
  {
    term: "Spirit",
    strongs: "G4151 / H7307",
    language: "Greek",
    transliteration: "pneuma / ruach",
    shortDefinition: "Breath, wind, spirit.",
    studyNote:
      "Used for the human spirit, spiritual beings, and the Holy Spirit depending on context. Always read the verse context before assigning meaning.",
    scriptures: ["1 Thessalonians 5:23", "John 3:6", "Romans 8:16"]
  },
  {
    term: "Soul",
    strongs: "G5590 / H5315",
    language: "Greek",
    transliteration: "psyche / nephesh",
    shortDefinition: "Life, soul, self, inner person.",
    studyNote:
      "Often points to the living person, inner life, desires, or seat of natural life. It should not be flattened into only modern psychology.",
    scriptures: ["Matthew 16:26", "Psalm 103:1", "1 Thessalonians 5:23"]
  },
  {
    term: "Body",
    strongs: "G4983",
    language: "Greek",
    transliteration: "soma",
    shortDefinition: "Body, physical frame.",
    studyNote:
      "Paul often uses this term when teaching consecration, resurrection, and bodily obedience to God.",
    scriptures: ["Romans 12:1", "1 Corinthians 6:19-20", "1 Thessalonians 5:23"]
  },
  {
    term: "Faith",
    strongs: "G4102",
    language: "Greek",
    transliteration: "pistis",
    shortDefinition: "Faith, trust, belief, faithfulness.",
    studyNote:
      "Biblical faith is trustful allegiance to God, not mere optimism or mental agreement.",
    scriptures: ["Hebrews 11:1", "Romans 10:17", "Mark 11:22-24"]
  },
  {
    term: "Power",
    strongs: "G1411",
    language: "Greek",
    transliteration: "dynamis",
    shortDefinition: "Power, might, ability.",
    studyNote:
      "Often used for God's active power, miracles, and Spirit-empowered ability.",
    scriptures: ["2 Timothy 1:7", "Acts 1:8", "Luke 10:19"]
  },
  {
    term: "Love",
    strongs: "G26",
    language: "Greek",
    transliteration: "agape",
    shortDefinition: "Self-giving love.",
    studyNote:
      "The love revealed in God and commanded among believers; 1 John connects this love with freedom from fear.",
    scriptures: ["1 John 4:18", "John 13:35", "Romans 5:5"]
  },
  {
    term: "Mind",
    strongs: "G3563",
    language: "Greek",
    transliteration: "nous",
    shortDefinition: "Mind, understanding, faculty of perception.",
    studyNote:
      "A renewed mind learns to perceive and agree with the will of God.",
    scriptures: ["Romans 12:2", "2 Timothy 1:7", "2 Corinthians 10:5"]
  },
  {
    term: "Repent",
    strongs: "G3340",
    language: "Greek",
    transliteration: "metanoeo",
    shortDefinition: "To change one's mind, turn, repent.",
    studyNote:
      "Repentance includes changed thinking and changed direction before God.",
    scriptures: ["1 John 1:9", "Acts 3:19", "Luke 13:3"]
  },
  {
    term: "Accuser",
    strongs: "G2725",
    language: "Greek",
    transliteration: "kategoros",
    shortDefinition: "Accuser, prosecutor.",
    studyNote:
      "Revelation uses this courtroom language for Satan's accusations against believers.",
    scriptures: ["Revelation 12:10-11", "1 John 2:1", "Colossians 2:14"]
  },
  {
    term: "Glory",
    strongs: "G1391 / H3519",
    language: "Greek",
    transliteration: "doxa / kabod",
    shortDefinition: "Glory, honor, weight, splendor.",
    studyNote:
      "Glory language includes God's honor, manifested presence, and transformative splendor.",
    scriptures: ["2 Corinthians 3:18", "John 11:40", "Hebrews 10:19-20"]
  }
];

export const quickReferences = Array.from(
  new Set(lessons.flatMap((lesson) => lesson.scriptures))
).sort();

