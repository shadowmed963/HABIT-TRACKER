export type MainGoal = "discipline" | "health" | "learning" | "spirituality" | "productivity" | "financial" | "social" | "creative";
export type DailyTime = "5 min" | "10 min" | "20 min" | "30 min" | "45 min" | "60 min";
export type PreferredType = "mental" | "physical" | "religious" | "study" | "mixed" | "mindfulness" | "work";

export interface QuizAnswers {
  goal?: MainGoal;
  dailyTime?: DailyTime;
  preferredType?: PreferredType;
}

export interface QuizQuestion<T extends string> {
  id: "goal" | "dailyTime" | "preferredType";
  title: string;
  subtitle: string;
  options: readonly T[];
}

export interface HabitSuggestion {
  id: string;
  name: string;
  category: string;
  cadence: string;
  reason: string;
}

export interface HabitItem {
  id: string;
  name: string;
  category: string;
  cadence: string;
  completions: boolean[];
  notificationTime?: string; // HH:mm format, e.g., "08:30"
  notificationEnabled?: boolean;
}

export const QUIZ_QUESTIONS: readonly QuizQuestion<string>[] = [
  {
    id: "goal",
    title: "What is your main goal?",
    subtitle: "Pick the area that feels most important right now.",
    options: ["Discipline", "Health", "Learning", "Spirituality", "Productivity", "Financial", "Social", "Creative"],
  },
  {
    id: "dailyTime",
    title: "How much time per day?",
    subtitle: "We will keep your plan realistic.",
    options: ["5 min", "10 min", "20 min", "30 min", "45 min", "60 min"],
  },
  {
    id: "preferredType",
    title: "Preferred type?",
    subtitle: "Choose what resonates with you.",
    options: ["Mental", "Physical", "Religious", "Study", "Mixed", "Mindfulness", "Work"],
  },
] as const;

// Religious habits - always included at start
const RELIGIOUS_HABITS: HabitSuggestion[] = [
  {
    id: "prayer",
    name: "الصلاة",
    category: "Spirituality",
    cadence: "Daily",
    reason: "أساس الحياة المتوازنة",
  },
  {
    id: "quran",
    name: "قراءة القرآن",
    category: "Spirituality",
    cadence: "Daily",
    reason: "الهداية والارتباط الروحي",
  },
];

// Religious habits - additional options for Religious type
const RELIGIOUS_HABITS_POOL: HabitSuggestion[] = [
  ...RELIGIOUS_HABITS,
  {
    id: "morning-dhikr",
    name: "أذكار الصباح",
    category: "Spirituality",
    cadence: "Daily",
    reason: "ابدأ يومك بالذكر والحماية",
  },
  {
    id: "evening-dhikr",
    name: "أذكار المساء",
    category: "Spirituality",
    cadence: "Daily",
    reason: "أنهِ يومك بالذكر والشكر",
  },
  {
    id: "night-prayer",
    name: "قيام الليل",
    category: "Spirituality",
    cadence: "3-4 times weekly",
    reason: "اقترب من الله في هدأة الليل",
  },
  {
    id: "istighfar",
    name: "الاستغفار 100 مرة",
    category: "Spirituality",
    cadence: "Daily",
    reason: "طهر نفسك وأطلب المغفرة",
  },
  {
    id: "dua",
    name: "الدعاء 5 دقائق",
    category: "Spirituality",
    cadence: "Daily",
    reason: "تضرع إلى الله بما تحتاج",
  },
  {
    id: "hadith",
    name: "قراءة حديث",
    category: "Spirituality",
    cadence: "Daily",
    reason: "تعلم من سنة النبي صلى الله عليه وسلم",
  },
  {
    id: "memorize-verse",
    name: "حفظ آية",
    category: "Spirituality",
    cadence: "3-4 times weekly",
    reason: "احفظ كلام الله في قلبك",
  },
  {
    id: "duha-prayer",
    name: "صلاة الضحى",
    category: "Spirituality",
    cadence: "3-4 times weekly",
    reason: "صلِّ صلاة الضحى لتستقيم أحوالك",
  },
  {
    id: "witr-prayer",
    name: "صلاة الوتر",
    category: "Spirituality",
    cadence: "Daily",
    reason: "اختم ليلك بالوتر",
  },
  {
    id: "daily-charity",
    name: "صدقة يومية",
    category: "Spirituality",
    cadence: "Daily",
    reason: "تصدق ولو بقليل كل يوم",
  },
];

// Study habits pool
const STUDY_HABITS_POOL: HabitSuggestion[] = [
  {
    id: "study-20min",
    name: "20 minutes focused study",
    category: "Learning",
    cadence: "Daily",
    reason: "Build consistent learning habit",
  },
  {
    id: "review-notes",
    name: "Review notes",
    category: "Learning",
    cadence: "Daily",
    reason: "Reinforce what you learned",
  },
  {
    id: "spaced-repetition",
    name: "Spaced repetition",
    category: "Learning",
    cadence: "3-4 times weekly",
    reason: "Remember information longer",
  },
  {
    id: "summarize",
    name: "Summarize lesson",
    category: "Learning",
    cadence: "Daily",
    reason: "Consolidate understanding",
  },
  {
    id: "practice-questions",
    name: "Practice questions",
    category: "Learning",
    cadence: "Daily",
    reason: "Test your knowledge",
  },
  {
    id: "read-pages",
    name: "Read 5 pages",
    category: "Learning",
    cadence: "Daily",
    reason: "Steady reading progress",
  },
  {
    id: "phone-free-study",
    name: "No phone during study",
    category: "Learning",
    cadence: "Daily",
    reason: "Maximize focus and retention",
  },
  {
    id: "flashcards",
    name: "Flashcards 10 min",
    category: "Learning",
    cadence: "Daily",
    reason: "Quick memory boost",
  },
  {
    id: "revise-previous",
    name: "Revise previous lesson",
    category: "Learning",
    cadence: "3-4 times weekly",
    reason: "Build on previous knowledge",
  },
  {
    id: "write-summary",
    name: "Write summary",
    category: "Learning",
    cadence: "Weekly",
    reason: "Deepen comprehension",
  },
  {
    id: "deep-focus",
    name: "Deep focus session",
    category: "Learning",
    cadence: "2-3 times weekly",
    reason: "Master complex topics",
  },
];

// Mental habits pool
const MENTAL_HABITS_POOL: HabitSuggestion[] = [
  {
    id: "read-10pages",
    name: "Read 10 pages",
    category: "Learning",
    cadence: "Daily",
    reason: "Expand your knowledge",
  },
  {
    id: "journaling",
    name: "Journaling",
    category: "Learning",
    cadence: "Daily",
    reason: "Process thoughts and emotions",
  },
  {
    id: "learn-word",
    name: "Learn new word",
    category: "Learning",
    cadence: "Daily",
    reason: "Build vocabulary",
  },
  {
    id: "problem-solving",
    name: "Problem solving",
    category: "Learning",
    cadence: "3-4 times weekly",
    reason: "Sharpen analytical skills",
  },
  {
    id: "memory-training",
    name: "Memory training",
    category: "Learning",
    cadence: "3-4 times weekly",
    reason: "Boost cognitive function",
  },
  {
    id: "logic-puzzles",
    name: "Logic puzzles",
    category: "Learning",
    cadence: "3-4 times weekly",
    reason: "Exercise your mind",
  },
  {
    id: "brain-exercise",
    name: "Brain exercise",
    category: "Learning",
    cadence: "Daily",
    reason: "Keep your mind sharp",
  },
  {
    id: "reflection",
    name: "Reflection 5 min",
    category: "Learning",
    cadence: "Daily",
    reason: "Gain insights and clarity",
  },
  {
    id: "gratitude-writing",
    name: "Gratitude writing",
    category: "Learning",
    cadence: "Daily",
    reason: "Cultivate positive mindset",
  },
  {
    id: "plan-tomorrow",
    name: "Plan tomorrow",
    category: "Learning",
    cadence: "Daily",
    reason: "Start tomorrow with purpose",
  },
];

// Physical habits pool
const PHYSICAL_HABITS_POOL: HabitSuggestion[] = [
  {
    id: "walk-10min",
    name: "Walk 10 minutes",
    category: "Health",
    cadence: "Daily",
    reason: "Get moving and energized",
  },
  {
    id: "stretch",
    name: "Stretch",
    category: "Health",
    cadence: "Daily",
    reason: "Improve flexibility",
  },
  {
    id: "pushups",
    name: "Pushups",
    category: "Health",
    cadence: "5-6 times weekly",
    reason: "Build upper body strength",
  },
  {
    id: "drink-water",
    name: "Drink water",
    category: "Health",
    cadence: "8 glasses daily",
    reason: "Stay hydrated",
  },
  {
    id: "workout-15min",
    name: "Workout 15 min",
    category: "Health",
    cadence: "Daily",
    reason: "Boost fitness levels",
  },
  {
    id: "posture-check",
    name: "Posture check",
    category: "Health",
    cadence: "Hourly",
    reason: "Prevent back pain",
  },
  {
    id: "breathing-exercise",
    name: "Breathing exercise",
    category: "Health",
    cadence: "2-3 times daily",
    reason: "Reduce stress and anxiety",
  },
  {
    id: "stand-hourly",
    name: "Stand every hour",
    category: "Health",
    cadence: "Hourly",
    reason: "Combat sedentary lifestyle",
  },
  {
    id: "steps-goal",
    name: "Steps goal",
    category: "Health",
    cadence: "Daily",
    reason: "Track daily movement",
  },
  {
    id: "mobility-routine",
    name: "Mobility routine",
    category: "Health",
    cadence: "3-4 times weekly",
    reason: "Improve range of motion",
  },
];

// Mindfulness habits pool
const MINDFULNESS_HABITS_POOL: HabitSuggestion[] = [
  {
    id: "meditation-5min",
    name: "Meditation 5 min",
    category: "Spirituality",
    cadence: "Daily",
    reason: "Calm your mind",
  },
  {
    id: "breathing",
    name: "Breathing exercise",
    category: "Spirituality",
    cadence: "Daily",
    reason: "Release tension",
  },
  {
    id: "phone-free",
    name: "No phone 10 min",
    category: "Discipline",
    cadence: "Daily",
    reason: "Be present with yourself",
  },
  {
    id: "mindful-walk",
    name: "Mindful walking",
    category: "Health",
    cadence: "3-4 times weekly",
    reason: "Connect with surroundings",
  },
  {
    id: "gratitude",
    name: "Gratitude",
    category: "Spirituality",
    cadence: "Daily",
    reason: "Appreciate what you have",
  },
  {
    id: "calm-sitting",
    name: "Calm sitting",
    category: "Spirituality",
    cadence: "Daily",
    reason: "Find inner peace",
  },
  {
    id: "focus-breathing",
    name: "Focus breathing",
    category: "Spirituality",
    cadence: "Daily",
    reason: "Improve concentration",
  },
  {
    id: "relax-5min",
    name: "Relax 5 min",
    category: "Health",
    cadence: "Daily",
    reason: "Reduce stress",
  },
  {
    id: "body-scan",
    name: "Body scan",
    category: "Health",
    cadence: "3-4 times weekly",
    reason: "Develop body awareness",
  },
  {
    id: "slow-breathing",
    name: "Slow breathing",
    category: "Spirituality",
    cadence: "Daily",
    reason: "Activate relaxation response",
  },
];

// Work habits pool
const WORK_HABITS_POOL: HabitSuggestion[] = [
  {
    id: "plan-tasks",
    name: "Plan tasks",
    category: "Productivity",
    cadence: "Daily",
    reason: "Set clear daily direction",
  },
  {
    id: "deep-work-20",
    name: "Deep work 20 min",
    category: "Productivity",
    cadence: "Daily",
    reason: "Focus on important work",
  },
  {
    id: "inbox-zero",
    name: "Inbox zero",
    category: "Productivity",
    cadence: "Daily",
    reason: "Clear your communications",
  },
  {
    id: "review-goals",
    name: "Review goals",
    category: "Productivity",
    cadence: "Weekly",
    reason: "Stay aligned with objectives",
  },
  {
    id: "top-3",
    name: "Top 3 priorities",
    category: "Productivity",
    cadence: "Daily",
    reason: "Focus on what matters",
  },
  {
    id: "no-distraction",
    name: "No distraction work",
    category: "Discipline",
    cadence: "Daily",
    reason: "Maximum productivity",
  },
  {
    id: "task-batching",
    name: "Task batching",
    category: "Productivity",
    cadence: "Daily",
    reason: "Reduce context switching",
  },
  {
    id: "productivity-block",
    name: "Productivity block",
    category: "Productivity",
    cadence: "Daily",
    reason: "Dedicated focus time",
  },
  {
    id: "organize-workspace",
    name: "Organize workspace",
    category: "Discipline",
    cadence: "Weekly",
    reason: "Create optimal environment",
  },
  {
    id: "check-progress",
    name: "Check progress",
    category: "Productivity",
    cadence: "Daily",
    reason: "Track what you've accomplished",
  },
];

const GOAL_SUGGESTIONS: Record<MainGoal, HabitSuggestion[]> = {
  spirituality: [
    {
      id: "dhikr",
      name: "Dhikr",
      category: "Spirituality",
      cadence: "Daily",
      reason: "Remember and glorify God in your morning and evening",
    },
    {
      id: "dua",
      name: "Dua",
      category: "Spirituality",
      cadence: "Daily",
      reason: "Supplicate to God for what you need",
    },
    {
      id: "reflect",
      name: "Reflection",
      category: "Spirituality",
      cadence: "Daily",
      reason: "Contemplate Quranic verses and their meanings",
    },
    {
      id: "night-prayer",
      name: "Night prayer",
      category: "Spirituality",
      cadence: "3-4 times weekly",
      reason: "Get closer to God in the quiet night",
    },
    {
      id: "charity",
      name: "Charity",
      category: "Spirituality",
      cadence: "Daily",
      reason: "Give charity even if little",
    },
  ],
  discipline: [
    {
      id: "wake-early",
      name: "الاستيقاظ مبكراً",
      category: "Discipline",
      cadence: "Daily",
      reason: "اجعل يومك منظم من البداية",
    },
    {
      id: "no-phone",
      name: "بدون هاتف صباحاً",
      category: "Discipline",
      cadence: "First 30 min",
      reason: "ركز على نفسك قبل مساعات العمل",
    },
    {
      id: "plan-day",
      name: "تخطيط اليوم",
      category: "Discipline",
      cadence: "Morning",
      reason: "اعرف ما ستفعله قبل أن تبدأ",
    },
    {
      id: "exercise",
      name: "تمرين رياضي",
      category: "Discipline",
      cadence: "5 days weekly",
      reason: "قوي جسدك وعقلك",
    },
    {
      id: "sleep-time",
      name: "وقت نوم منتظم",
      category: "Discipline",
      cadence: "Daily",
      reason: "نم وأستيقظ في نفس الوقت",
    },
    {
      id: "journal",
      name: "كتابة يومياتك",
      category: "Discipline",
      cadence: "Evening",
      reason: "انعكس على يومك وتعلم منه",
    },
  ],
  health: [
    {
      id: "water",
      name: "شرب الماء",
      category: "Health",
      cadence: "8 glasses daily",
      reason: "رطب جسدك طول اليوم",
    },
    {
      id: "walk",
      name: "مشي سريع",
      category: "Health",
      cadence: "30 min daily",
      reason: "حرك جسدك وقلبك",
    },
    {
      id: "stretch",
      name: "تمارين استطالة",
      category: "Health",
      cadence: "10 min daily",
      reason: "قلل التوتر والآلام",
    },
    {
      id: "healthy-food",
      name: "أكل صحي",
      category: "Health",
      cadence: "Daily",
      reason: "اختر طعام غني بالفوائد",
    },
    {
      id: "meditation",
      name: "تأمل وتنفس",
      category: "Health",
      cadence: "10 min daily",
      reason: "هدئ عقلك وأعصابك",
    },
  ],
  productivity: [
    {
      id: "deep-work",
      name: "عمل عميق",
      category: "Productivity",
      cadence: "2 hours block",
      reason: "أنجز أهم مهامك",
    },
    {
      id: "review",
      name: "مراجعة اليوم",
      category: "Productivity",
      cadence: "Evening",
      reason: "قيم إنجازاتك وتعلم",
    },
    {
      id: "priorities",
      name: "أهم 3 أولويات",
      category: "Productivity",
      cadence: "Morning",
      reason: "حدد ما يحتاج تركيز فقط",
    },
    {
      id: "no-distractions",
      name: "وقت بدون تشتيت",
      category: "Productivity",
      cadence: "4 hours daily",
      reason: "عطل الإشعارات وركز",
    },
    {
      id: "break-time",
      name: "فترات راحة منتظمة",
      category: "Productivity",
      cadence: "Every 90 min",
      reason: "استرح لتبقى منتجاً",
    },
  ],
  learning: [
    {
      id: "study",
      name: "جلسة دراسة",
      category: "Learning",
      cadence: "45 min daily",
      reason: "بني معرفتك بانتظام",
    },
    {
      id: "read",
      name: "قراءة كتاب",
      category: "Learning",
      cadence: "20 pages daily",
      reason: "وسع آفاقك",
    },
    {
      id: "notes",
      name: "ملاحظات وملخصات",
      category: "Learning",
      cadence: "After studying",
      reason: "احفظ وتذكر ما تعلمت",
    },
    {
      id: "podcast",
      name: "استماع بودكاست",
      category: "Learning",
      cadence: "30 min daily",
      reason: "تعلم في أثناء ذهابك",
    },
    {
      id: "practice",
      name: "تطبيق ما تعلمت",
      category: "Learning",
      cadence: "Daily",
      reason: "حول المعرفة لمهارة",
    },
  ],
  financial: [
    {
      id: "track-spending",
      name: "تتبع النفقات",
      category: "Financial",
      cadence: "Daily",
      reason: "اعرف أين يذهب مالك",
    },
    {
      id: "save",
      name: "ادخار يومي",
      category: "Financial",
      cadence: "Daily",
      reason: "بني ثروتك خطوة بخطوة",
    },
    {
      id: "budget-plan",
      name: "تخطيط الميزانية",
      category: "Financial",
      cadence: "Weekly",
      reason: "تحكم بأموالك بذكاء",
    },
    {
      id: "invest-learn",
      name: "تعلم الاستثمار",
      category: "Financial",
      cadence: "2-3 times weekly",
      reason: "اجعل أموالك تعمل لك",
    },
    {
      id: "side-hustle",
      name: "مشروع جانبي",
      category: "Financial",
      cadence: "2-3 hours",
      reason: "زيادة دخلك الإضافي",
    },
  ],
  social: [
    {
      id: "call-friend",
      name: "اتصال يومي بصديق",
      category: "Social",
      cadence: "Daily",
      reason: "عزز علاقاتك الاجتماعية",
    },
    {
      id: "social-outing",
      name: "خروج اجتماعي",
      category: "Social",
      cadence: "2-3 times weekly",
      reason: "استمتع بوقتك مع الآخرين",
    },
    {
      id: "help-others",
      name: "مساعدة الآخرين",
      category: "Social",
      cadence: "Daily",
      reason: "كن إيجابياً في المجتمع",
    },
    {
      id: "listen-actively",
      name: "الاستماع النشط",
      category: "Social",
      cadence: "Daily",
      reason: "فهم احتياجات من حولك",
    },
    {
      id: "network",
      name: "بناء الشبكة",
      category: "Social",
      cadence: "Weekly",
      reason: "وسع دائرة معارفك المفيدة",
    },
  ],
  creative: [
    {
      id: "sketch",
      name: "رسم أو تصميم",
      category: "Creative",
      cadence: "30 min daily",
      reason: "عبر عن إبداعك",
    },
    {
      id: "write",
      name: "كتابة إبداعية",
      category: "Creative",
      cadence: "20 min daily",
      reason: "طور موهبتك الكتابية",
    },
    {
      id: "music",
      name: "موسيقى أو غناء",
      category: "Creative",
      cadence: "30 min daily",
      reason: "استكشف عالم الموسيقى",
    },
    {
      id: "craft",
      name: "حرفة يدوية",
      category: "Creative",
      cadence: "1 hour 2-3 times",
      reason: "أنتج شيء جميل بيديك",
    },
    {
      id: "learn-hobby",
      name: "تعلم هواية جديدة",
      category: "Creative",
      cadence: "2-3 times weekly",
      reason: "اكتشف مواهب جديدة لديك",
    },
  ],
};

const TYPE_FILTER: Record<PreferredType, string[]> = {
  mental: ["Spirituality", "Learning", "Productivity"],
  physical: ["Health"],
  religious: ["Spirituality"],
  study: ["Learning"],
  mixed: ["Health", "Discipline", "Learning", "Productivity", "Spirituality"],
  mindfulness: ["Spirituality", "Health"],
  work: ["Productivity", "Financial", "Learning"],
};

// Bonus habits based on goal combinations
const COMBO_BONUSES: Record<string, HabitSuggestion> = {
  "spirituality-health": {
    id: "fasting",
    name: "صيام صحي",
    category: "Spirituality",
    cadence: "2-3 days weekly",
    reason: "ارتقِ روحياً وجسدياً معاً",
  },
  "discipline-learning": {
    id: "consistent-learning",
    name: "جدول تعليمي ثابت",
    category: "Learning",
    cadence: "Same time daily",
    reason: "العادة تجعل التعلم أسهل",
  },
  "productivity-health": {
    id: "walking-meeting",
    name: "اجتماعات أثناء المشي",
    category: "Health",
    cadence: "During calls",
    reason: "اجمع بين العمل والصحة",
  },
  "discipline-spirituality": {
    id: "blessed-morning",
    name: "صباح مبارك منظم",
    category: "Spirituality",
    cadence: "Every morning",
    reason: "ابدأ يومك بذكر وتنظيم",
  },
  "learning-productivity": {
    id: "learning-to-work",
    name: "طبق المعرفة في عملك",
    category: "Learning",
    cadence: "Daily",
    reason: "استفيد من تعلمك فوراً",
  },
};

const TIME_LIMITS: Record<DailyTime, number> = {
  "5 min": 8,
  "10 min": 9,
  "20 min": 10,
  "30 min": 10,
  "45 min": 10,
  "60 min": 10,
};

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get habit pool for a specific preferred type
 */
function getHabitsForType(type: PreferredType): HabitSuggestion[] {
  switch (type) {
    case "religious":
      return [...RELIGIOUS_HABITS_POOL];
    case "study":
      return [...STUDY_HABITS_POOL];
    case "mental":
      return [...MENTAL_HABITS_POOL];
    case "physical":
      return [...PHYSICAL_HABITS_POOL];
    case "mindfulness":
      return [...MINDFULNESS_HABITS_POOL];
    case "work":
      return [...WORK_HABITS_POOL];
    case "mixed":
      // Mix from all categories
      return [
        ...RELIGIOUS_HABITS_POOL,
        ...PHYSICAL_HABITS_POOL,
        ...MENTAL_HABITS_POOL,
        ...STUDY_HABITS_POOL,
      ];
    default:
      return [];
  }
}

export function buildHabitSuggestions(answers: QuizAnswers, t?: any): HabitSuggestion[] {
  // Determine max suggestions based on daily time
  const maxSuggestions = answers.dailyTime 
    ? Math.min(TIME_LIMITS[answers.dailyTime], 10) 
    : 10;

  let suggestions: HabitSuggestion[] = [];

  // If a preferred type is selected, use type-specific pool
  if (answers.preferredType) {
    const typeHabits = getHabitsForType(answers.preferredType);
    const shuffled = shuffleArray(typeHabits);
    suggestions = shuffled.slice(0, maxSuggestions);
  } else if (answers.goal) {
    // Fallback to goal-based suggestions if only goal is selected
    let goalHabits = GOAL_SUGGESTIONS[answers.goal] || [];
    suggestions = [...RELIGIOUS_HABITS, ...goalHabits];
  } else {
    // Default to religious habits
    suggestions = RELIGIOUS_HABITS.slice(0, maxSuggestions);
  }

  // Deduplicate and limit final results
  const deduped = dedupeSuggestions(suggestions);
  const limited = deduped.slice(0, maxSuggestions);

  return limited.length > 0 ? limited : RELIGIOUS_HABITS.slice(0, 2);
}

export function createHabitItem(suggestion: HabitSuggestion): HabitItem {
  return {
    id: suggestion.id,
    name: suggestion.name,
    category: suggestion.category,
    cadence: suggestion.cadence,
    completions: Array.from({ length: 30 }, () => false),
  };
}

export function getCompletionRate(habits: HabitItem[]) {
  if (!habits.length) return 0;

  const totalDays = habits.length * 30;
  const completed = habits.reduce(
    (sum, habit) => sum + habit.completions.filter(Boolean).length,
    0,
  );

  return Math.round((completed / totalDays) * 100);
}

export function getWeeklyChartData(habits: HabitItem[]) {
  return Array.from({ length: 7 }, (_, chartIndex) => {
    const dayIndex = 23 + chartIndex;
    const completed = habits.filter((habit) => habit.completions[dayIndex]).length;
    const total = habits.length || 1;

    return {
      label: `D${dayIndex + 1}`,
      percentage: Math.round((completed / total) * 100),
      completed,
      total: habits.length,
    };
  });
}

export function getAllDaysChartData(habits: HabitItem[]) {
  if (!habits.length) return [];

  return Array.from({ length: 30 }, (_, dayIndex) => {
    const completed = habits.filter((habit) => habit.completions[dayIndex]).length;
    const total = habits.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      day: dayIndex + 1,
      label: `D${dayIndex + 1}`,
      percentage,
      completed,
      total,
    };
  });
}

export function getSuccessRate(habits: HabitItem[]) {
  if (!habits.length) return 0;

  const totalPossible = habits.length * 30;
  const totalCompleted = habits.reduce(
    (sum, habit) => sum + habit.completions.filter(Boolean).length,
    0,
  );

  return Math.round((totalCompleted / totalPossible) * 100);
}

export function getBestHabit(habits: HabitItem[]) {
  if (!habits.length) return null;

  let best = habits[0];
  let bestCount = best.completions.filter(Boolean).length;

  for (const habit of habits.slice(1)) {
    const count = habit.completions.filter(Boolean).length;
    if (count > bestCount) {
      best = habit;
      bestCount = count;
    }
  }

  return { habit: best, count: bestCount };
}

export function getWorstHabit(habits: HabitItem[]) {
  if (!habits.length) return null;

  let worst = habits[0];
  let worstCount = worst.completions.filter(Boolean).length;

  for (const habit of habits.slice(1)) {
    const count = habit.completions.filter(Boolean).length;
    if (count < worstCount) {
      worst = habit;
      worstCount = count;
    }
  }

  return { habit: worst, count: worstCount };
}

export function getCurrentStreakFromDay(habits: HabitItem[], dayIndex: number = 29) {
  let streak = 0;

  for (let i = dayIndex; i >= 0; i -= 1) {
    const dayCompleted = habits.filter((h) => h.completions[i]).length;
    const total = habits.length;

    // Consider day complete if at least one habit is done
    if (dayCompleted > 0) {
      streak += 1;
    } else {
      break;
    }
  }

  return streak;
}

export function getBestStreakValue(habits: HabitItem[]) {
  let best = 0;
  let current = 0;

  for (let i = 0; i < 30; i += 1) {
    const dayCompleted = habits.filter((h) => h.completions[i]).length;

    if (dayCompleted > 0) {
      current += 1;
      best = Math.max(best, current);
    } else {
      current = 0;
    }
  }

  return best;
}

export function getTodayCompleted(habits: HabitItem[]) {
  return habits.filter((habit) => habit.completions[29]).length;
}

export function getLongestCurrentStreak(habits: HabitItem[]) {
  let best = 0;

  habits.forEach((habit) => {
    let streak = 0;

    for (let index = habit.completions.length - 1; index >= 0; index -= 1) {
      if (!habit.completions[index]) break;
      streak += 1;
    }

    best = Math.max(best, streak);
  });

  return best;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function dedupeSuggestions(suggestions: HabitSuggestion[]) {
  const seen = new Set<string>();

  return suggestions.filter((habit) => {
    const key = habit.name.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function toTitleCase(value: string) {
  return value
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
