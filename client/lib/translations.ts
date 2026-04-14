export type Language = "en" | "ar" | "fr";

export interface Translations {
  header: {
    habitTracker: string;
    niyyahDaily: string;
    aiHabitGuide: string;
  };
  hero: {
    headline: string;
    subheading: string;
    activeHabits: string;
    dayTracked: string;
    challengeStatus: string;
    resetChallenge: string;
  };
  quiz: {
    title: string;
    subtitle: string;
    step: string;
    back: string;
    continue: string;
    seeHabits: string;
    suggested: string;
    suggestedDesc: string;
    removeAnything: string;
    addCustomHabit: string;
    addCustomPlaceholder: string;
    addCustomBtn: string;
    acceptAll: string;
    startChallenge: string;
    backToQuiz: string;
    habitsAdded: string;
    improveArea: string;
    improveAreaDesc: string;
    dailyTime: string;
    dailyTimeDesc: string;
    preference: string;
    preferenceDesc: string;
    goal: string;
    goalDesc: string;
    customImproveLabel: string;
    customImprovePlaceholder: string;
    goalLabel: string;
    timeLabel: string;
    typeLabel: string;
    smartTip: string;
    prayerQuranAlways: string;
    disciplineTip: string;
    healthTip: string;
    learningTip: string;
    productivityTip: string;
    financialTip: string;
    socialTip: string;
    creativeTip: string;
    basedOnAnswers: string;
    helpGoal: {
      discipline: string;
      health: string;
      learning: string;
      spirituality: string;
      productivity: string;
      financial: string;
      social: string;
      creative: string;
    };
    helpTime: {
      "5 min": string;
      "10 min": string;
      "20 min": string;
      "30 min": string;
      "45 min": string;
      "60 min": string;
    };
    helpType: {
      mental: string;
      physical: string;
      religious: string;
      study: string;
      mixed: string;
      mindfulness: string;
      work: string;
    };
    addHabits: string;
    viewInGrid: string;
    backToQuestions: string;
    aiSuggestedHabits: string;
    personalizedHabit: string;
    personalizedHabits: string;
    basedOn: string;
    daily: string;
  };
  options: {
    productivity: string;
    health: string;
    religion: string;
    study: string;
    discipline: string;
    learning: string;
    spirituality: string;
    consistency: string;
    calm: string;
    mental: string;
    physical: string;
    religious: string;
    mixed: string;
    mindfulness: string;
    work: string;
    financial: string;
    social: string;
    creative: string;
    fiveMin: string;
    tenMin: string;
    twentyMin: string;
    thirtyMin: string;
    fortyFiveMin: string;
    sixtyMin: string;
  };
  habits: {
    prayer: string;
    quran: string;
    readQuran: string;
    "morning-dhikr": string;
    "evening-dhikr": string;
    "night-prayer": string;
    istighfar: string;
    dua: string;
    hadith: string;
    "memorize-verse": string;
    "duha-prayer": string;
    "witr-prayer": string;
    "daily-charity": string;
    dhikr: string;
    reflect: string;
    charity: string;
    fasting: string;
    "study-20min": string;
    "review-notes": string;
    "spaced-repetition": string;
    summarize: string;
    "practice-questions": string;
    "read-pages": string;
    "phone-free-study": string;
    flashcards: string;
    "revise-previous": string;
    "write-summary": string;
    "deep-focus": string;
    "read-10pages": string;
    journaling: string;
    "learn-word": string;
    "problem-solving": string;
    "memory-training": string;
    "logic-puzzles": string;
    "brain-exercise": string;
    reflection: string;
    "gratitude-writing": string;
    "plan-tomorrow": string;
    "walk-10min": string;
    stretch: string;
    pushups: string;
    "drink-water": string;
    "workout-15min": string;
    "posture-check": string;
    "breathing-exercise": string;
    "stand-hourly": string;
    "steps-goal": string;
    "mobility-routine": string;
    "meditation-5min": string;
    breathing: string;
    "phone-free": string;
    "mindful-walk": string;
    gratitude: string;
    "calm-sitting": string;
    "focus-breathing": string;
    "relax-5min": string;
    "body-scan": string;
    "slow-breathing": string;
    "plan-tasks": string;
    "deep-work-20": string;
    "inbox-zero": string;
    "review-goals": string;
    "top-3": string;
    "no-distraction": string;
    "task-batching": string;
    "productivity-block": string;
    "organize-workspace": string;
    "check-progress": string;
    "wake-early": string;
    "no-phone": string;
    "plan-day": string;
    exercise: string;
    "sleep-time": string;
    journal: string;
    water: string;
    walk: string;
    "healthy-food": string;
    meditation: string;
    "deep-work": string;
    review: string;
    priorities: string;
    "no-distractions": string;
    "break-time": string;
    study: string;
    read: string;
    notes: string;
    podcast: string;
    practice: string;
    "track-spending": string;
    save: string;
    "budget-plan": string;
    "invest-learn": string;
    "side-hustle": string;
    "call-friend": string;
    "social-outing": string;
    "help-others": string;
    "listen-actively": string;
    network: string;
    sketch: string;
    write: string;
    music: string;
    craft: string;
    "learn-hobby": string;
    "consistent-learning": string;
    "walking-meeting": string;
    "blessed-morning": string;
    "learning-to-work": string;
    gridTitle: string;
    gridDesc: string;
    habits: string;
    removeHabit: string;
    noHabits: string;
  };
  progress: {
    completionRate: string;
    completionDesc: string;
    doneToday: string;
    doneTodayDesc: string;
    currentStreak: string;
    streakDesc: string;
    progressChart: string;
    progressDesc: string;
    lastSevenDays: string;
    habitsActive: string;
  };
  quickAdd: {
    title: string;
    subtitle: string;
    placeholder: string;
    addBtn: string;
  };
  auth: {
    personalSpace: string;
    mainTitle: string;
    mainDesc: string;
    userSpecificHabits: string;
    userSpecificDesc: string;
    privateChart: string;
    privateChartDesc: string;
    personalAI: string;
    personalAIDesc: string;
    logIn: string;
    signUp: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholderLogin: string;
    passwordPlaceholderSignup: string;
    infoLoginMessage: string;
    infoSignupMessage: string;
    loginButton: string;
    createAccountButton: string;
    emailRequired: string;
    nameRequired: string;
    authFailed: string;
    existingUsersMessage: string;
    newAccountMessage: string;
  };
  challenge: {
    startWithAI: string;
    challengeActive: string;
    challengeLive: string;
    challengeDesc: string;
    resetButton: string;
    resetConfirmMessage: string;
  };
  grid: {
    gridLabel: string;
    remove: string;
    markToday: string;
    notificationTime: string;
    notificationEnabled: string;
    setReminder: string;
    notificationPlaceholder: string;
  };
  statistics: {
    successRate: string;
    today: string;
    overallCompletion: string;
    habitsCompleted: string;
    tracking: string;
    activeHabits: string;
    best: string;
    focusArea: string;
    completions: string;
  };
  common: {
    savedCheckIns: string;
    todaysGoal: string;
    english: string;
    arabic: string;
    french: string;
    selectLanguage: string;
    daily: string;
    anytime: string;
    custom: string;
    menuFor: string;
    addedByYou: string;
    addHabitsToSeeChart: string;
  };
  features: {
    howItWorks: string;
    progressTitle: string;
    realtimeCompletion: string;
  };
  footer: string;
}

const translations: Record<Language, Translations> = {
  en: {
    header: {
      habitTracker: "Habit Tracker",
      niyyahDaily: "Daily Intention",
      aiHabitGuide: "Smart Habit Assistant",
    },
    hero: {
      headline: "Build a calm 30-day habit system that truly fits your life.",
      subheading:
        "Track multiple habits, monitor your progress, and use smart AI to turn your goals into a sustainable plan—with Prayer and Quran always at the center.",
      activeHabits: "Active habits",
      dayTracked: "Days tracked",
      challengeStatus: "Challenge status",
      resetChallenge: "Reset challenge",
      quickLinks: "Quick Links",
      openGrid: "Open Grid",
      openChart: "Open Chart",
    },
    quiz: {
      title: "Let's build your personalized system",
      subtitle: "A simple AI-powered guide that keeps Prayer and Quran core to everything.",
      step: "Step",
      back: "Back",
      continue: "Next",
      seeHabits: "See suggestions",
      suggested: "Your personalized suggestions",
      suggestedDesc:
        "Remove what doesn't fit, add your own, or start the challenge now.",
      removeAnything: "Remove what doesn't fit, add your own, or start the challenge now.",
      addCustomHabit: "Add your own habit",
      addCustomPlaceholder: "Examples: Writing journal, family time, light walk",
      addCustomBtn: "Add",
      acceptAll: "Accept all",
      startChallenge: "Start now",
      backToQuiz: "Back to questions",
      habitsAdded: "Done! View your habits in the grid below.",
      improveArea: "What area do you want to improve?",
      improveAreaDesc: "Pick what feels most important right now.",
      dailyTime: "How much time do you have daily?",
      dailyTimeDesc: "We'll suggest realistic habits for your schedule.",
      preference: "What type of habits suit you best?",
      preferenceDesc: "Choose what resonates with your style.",
      goal: "What's your primary goal?",
      goalDesc: "This helps us match habits to your life.",
      customImproveLabel: "What do you want to improve in your life?",
      customImprovePlaceholder: "Example: Patience, sleep quality, family connection",
      goalLabel: "Goal",
      timeLabel: "Time available",
      typeLabel: "Preferred type",
      smartTip: "💡 Smart tip:",
      prayerQuranAlways: "Prayer and Quran form your foundation. Build everything around them.",
      disciplineTip: "One strong habit beats five weak ones. Master one, then add others.",
      healthTip: "Water and movement are life's essentials. Start with these.",
      learningTip: "Your brain learns best with regular breaks. Respect that rhythm.",
      productivityTip: "Focus on 3 main tasks daily. Don't chase perfection everywhere.",
      financialTip: "Track your money first. Regular small savings beat risky big moves.",
      socialTip: "Real relationships need real time—not just messages and screens.",
      creativeTip: "Creativity needs daily practice, even just 10-15 minutes.",
      basedOnAnswers: "Based on your answers, you'll get 3-8 personalized habit recommendations.",
      helpGoal: {
        discipline: "Wake early • No phone mornings • Daily planning • Regular sleep • Brief journaling",
        health: "Drink water regularly • Daily walks • Stretching • Healthy eating • Deep breathing",
        learning: "Focused study sessions • Daily reading • Take notes • Practice problems • Listen to lessons",
        spirituality: "Daily prayers • Quran reading • Remembrance of God • Spiritual reflection • Sincere prayers",
        productivity: "Focused work blocks • Pick top 3 tasks • Time block • Daily review • Regular breaks",
        financial: "Track spending • Save consistently • Weekly budget review • Learn investing • Goal-setting",
        social: "Regular contact • Help others • Active listening • Schedule meetups • Join communities",
        creative: "Sketch or write daily • Freewrite • Try music or crafts • Experiment • Express yourself",
      },
      helpTime: {
        "5 min": "Micro-habits: 1-min breathing • 5 pushups • One page reading • Quick gratitude note",
        "10 min": "Short session: Stretching • Focused reading • Quick study • Light walk • Journal",
        "20 min": "Focused practice: Language drills • Training sets • Chapter reading • Code exercises",
        "30 min": "Solid block: Full workout • Study lesson • Creative work • Project progress",
        "45 min": "Deep session: Practice + review • Longer walk • Focused craft work",
        "60 min": "Complete session: Full workout • Study module • Extended reading • Dedicated focus",
      },
      helpType: {
        mental: "Puzzles • Reading • Memory exercises • Journaling • Problem-solving drills",
        physical: "Walks/runs • HIIT • Flexibility work • Posture breaks • Short workouts",
        religious: "Prayer • Quran reading • Remembrance • Acts of charity • Spiritual reflection",
          resetChallenge: "إعادة التحدي",
          quickLinks: "روابط سريعة",
          openGrid: "افتح الشبكة",
          openChart: "افتح المخطط",
        mixed: "Combine light exercise + study time + mindfulness",
        mindfulness: "Breath awareness • Body scan • Meditative walk • Present moment journaling",
        work: "Pomodoro timers • Task batching • Email sorting • Morning planning",
      },
      addHabits: "Add habits",
      viewInGrid: "Added! View your habits in the grid below.",
      backToQuestions: "Back to questions",
      aiSuggestedHabits: "Your personalized suggestions",
      personalizedHabit: "Personalized habit",
      personalizedHabits: "Personalized habits",
      basedOn: "Based on:",
      daily: "Daily",
    },
    options: {
      productivity: "Productivity",
      health: "Health",
          resetChallenge: "Réinitialiser le défi",
          quickLinks: "Liens rapides",
          openGrid: "Ouvrir la grille",
          openChart: "Ouvrir le graphique",
      study: "Study",
      discipline: "Discipline",
      learning: "Learning",
      spirituality: "Spirituality",
      consistency: "Consistency",
      calm: "Calm",
      mental: "Mental",
      physical: "Physical",
      religious: "Religious",
      mixed: "Mixed",
      mindfulness: "Mindfulness",
      work: "Work",
      financial: "Financial",
      social: "Social",
      creative: "Creative",
      fiveMin: "5 minutes",
      tenMin: "10 minutes",
      twentyMin: "20 minutes",
      thirtyMin: "30 minutes",
      fortyFiveMin: "45 minutes",
      sixtyMin: "1 hour",
    },
    habits: {
      prayer: "Prayer",
      quran: "Read Quran",
      readQuran: "Read Quran",
      "morning-dhikr": "Morning Remembrance",
      "evening-dhikr": "Evening Remembrance",
      "night-prayer": "Night Prayer",
      istighfar: "Seek Forgiveness",
      dua: "Supplicate",
      hadith: "Read Hadith",
      "memorize-verse": "Memorize Verse",
      "duha-prayer": "Morning Prayer",
      "witr-prayer": "Witr Prayer",
      "daily-charity": "Daily Charity",
      dhikr: "Dhikr",
      reflect: "Reflection",
      charity: "Charity",
      fasting: "Fasting",
      "study-20min": "20 Min Study",
      "review-notes": "Review Notes",
      "spaced-repetition": "Spaced Repetition",
      summarize: "Summarize Lesson",
      "practice-questions": "Practice Questions",
      "read-pages": "Read 5 Pages",
      "phone-free-study": "Phone-Free Study",
      flashcards: "Flashcards",
      "revise-previous": "Revise Previous",
      "write-summary": "Write Summary",
      "deep-focus": "Deep Focus",
      "read-10pages": "Read 10 Pages",
      journaling: "Journaling",
      "learn-word": "Learn New Word",
      "problem-solving": "Problem Solving",
      "memory-training": "Memory Training",
      "logic-puzzles": "Logic Puzzles",
      "brain-exercise": "Brain Exercise",
      reflection: "Reflection",
      "gratitude-writing": "Gratitude Writing",
      "plan-tomorrow": "Plan Tomorrow",
      "walk-10min": "Walk 10 Minutes",
      stretch: "Stretching",
      pushups: "Pushups",
      "drink-water": "Drink Water",
      "workout-15min": "15 Min Workout",
      "posture-check": "Posture Check",
      "breathing-exercise": "Breathing Exercise",
      "stand-hourly": "Stand Hourly",
      "steps-goal": "Daily Steps",
      "mobility-routine": "Mobility Routine",
      "meditation-5min": "5 Min Meditation",
      breathing: "Breathing",
      "phone-free": "Phone-Free Time",
      "mindful-walk": "Mindful Walk",
      gratitude: "Gratitude",
      "calm-sitting": "Calm Sitting",
      "focus-breathing": "Focus Breathing",
      "relax-5min": "5 Min Relax",
      "body-scan": "Body Scan",
      "slow-breathing": "Slow Breathing",
      "plan-tasks": "Plan Tasks",
      "deep-work-20": "Deep Work 20 Min",
      "inbox-zero": "Inbox Zero",
      "review-goals": "Review Goals",
      "top-3": "Top 3 Priorities",
      "no-distraction": "No Distractions",
      "task-batching": "Task Batching",
      "productivity-block": "Productivity Block",
      "organize-workspace": "Organize Workspace",
      "check-progress": "Check Progress",
      "wake-early": "Wake Early",
      "no-phone": "No Phone Morning",
      "plan-day": "Plan Day",
      exercise: "Exercise",
      "sleep-time": "Regular Sleep",
      journal: "Journal",
      water: "Drink Water",
      walk: "Fast Walk",
      "healthy-food": "Healthy Food",
      meditation: "Meditation",
      "deep-work": "Deep Work",
      review: "Daily Review",
      priorities: "Top 3 Priorities",
      "no-distractions": "Distraction-Free Time",
      "break-time": "Regular Breaks",
      study: "Study Session",
      read: "Read Book",
      notes: "Take Notes",
      podcast: "Listen Podcast",
      practice: "Practice Skills",
      "track-spending": "Track Spending",
      save: "Daily Savings",
      "budget-plan": "Budget Planning",
      "invest-learn": "Learn Investing",
      "side-hustle": "Side Project",
      "call-friend": "Call Friend",
      "social-outing": "Social Outing",
      "help-others": "Help Others",
      "listen-actively": "Active Listening",
      network: "Networking",
      sketch: "Sketch",
      write: "Creative Writing",
      music: "Music Practice",
      craft: "Craft Work",
      "learn-hobby": "Learn Hobby",
      "consistent-learning": "Regular Learning",
      "walking-meeting": "Walking Meetings",
      "blessed-morning": "Blessed Morning",
      "learning-to-work": "Apply Learning",
      gridTitle: "Track each habit, day by day",
      gridDesc: "Click each cell to mark it complete. Scroll right to see all 30 days.",
      habits: "Habits",
      removeHabit: "Remove habit",
      noHabits: "No habits yet. Add habits from the section above.",
    },
    progress: {
      completionRate: "Completion rate",
      completionDesc: "Across your active 30-day habit plan.",
      doneToday: "Done today",
      doneTodayDesc: "Small wins count when they're repeated.",
      currentStreak: "Current streak",
      streakDesc: "Your longest active streak across all habits.",
      progressChart: "Progress chart",
      progressDesc: "Simple view of how well you're completing habits each day.",
      lastSevenDays: "Last 7 days",
      habitsActive: "Active habits",
    },
    quickAdd: {
      title: "Quick Add",
      subtitle: "Add a new habit to your 30-day challenge",
      placeholder: "Enter habit name...",
      addBtn: "Add Habit",
    },
    challenge: {
      startWithAI: "Get personalized habits from AI",
      challengeActive: "Challenge Active",
      challengeLive: "30-Day Challenge Live",
      challengeDesc: "Track your habits daily and build lasting routines",
      resetButton: "Reset Challenge",
      resetConfirmMessage: "Are you sure you want to reset all progress for this month? This cannot be undone.",
    },
    auth: {
      personalSpace: "Your personal habit space",
      mainTitle: "Sign up or log in to load your own habit tracker.",
      mainDesc:
        "Each account keeps its own habits, 30-day grid, progress chart, and AI suggestions. Sign out anytime to switch users.",
      userSpecificHabits: "User-specific habits",
      userSpecificDesc: "Every add, delete, and completion is recorded for this account only.",
      privateChart: "Private progress chart",
      privateChartDesc: "Weekly progress and streaks always reflect the active user only.",
      personalAI: "Personal AI suggestions",
      personalAIDesc: "Suggested habits are generated and saved inside your personal tracker.",
      logIn: "Log in",
      signUp: "Sign up",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "Enter your email",
      passwordLabel: "Password",
      passwordPlaceholderLogin: "Your password ",
      passwordPlaceholderSignup: "Create a password (optional)",
      infoLoginMessage: "Use your email to continue where you left off.",
      infoSignupMessage: "Create an account with your email to get started.",
      loginButton: "Log in",
      createAccountButton: "Create account",
      emailRequired: "Email is required",
      nameRequired: "Name is required for signup",
      authFailed: "Authentication failed",
      existingUsersMessage: "Existing users can log back in with their saved email and code.",
      newAccountMessage: "No accounts yet. Create the first account to get started.",
    },
    grid: {
      gridLabel: "30-day habit grid",
      remove: "Remove",
      markToday: "Mark today",
      notificationTime: "Notification time",
      notificationEnabled: "Enable notification",
      setReminder: "Set reminder",
      notificationPlaceholder: "HH:mm (e.g., 08:30)",
    },
    statistics: {
      successRate: "Success rate",
      today: "Today",
      overallCompletion: "Overall completion",
      habitsCompleted: "Habits completed",
      tracking: "Tracking",
      activeHabits: "Active habits",
      best: "Best",
      focusArea: "Focus area",
      completions: "completions",
    },
    common: {
      savedCheckIns: "saved check-ins",
      todaysGoal: "Today's goal",
      english: "English",
      arabic: "العربية",
      french: "Français",
      selectLanguage: "Select language",
      daily: "Daily",
      anytime: "Anytime",
      custom: "Custom",
      menuFor: "Menu for",
      addedByYou: "Added by you to personalize your journey.",
      addHabitsToSeeChart: "Add habits to see your progress chart",
    },
    features: {
      howItWorks: "How it works: The AI generates 3-8 personalized habits based on your goal, available time, and preferred type. Religious habits are always included as the foundation.",
      progressTitle: "Progress over 30 days",
      realtimeCompletion: "Real-time completion percentage for all days",
    },
    footer: "A gentle 30-day system for prayer, Quran, and the habits that move your life forward.",
  },
  ar: {
    header: {
      habitTracker: "متتبع العادات",
      niyyahDaily: "الهدف اليومي",
      aiHabitGuide: "مساعد العادات الذكي",
    },
    hero: {
      headline: "بناء نظام عادات هادئ لمدة 30 يوماً يتناسب مع حياتك الحقيقية.",
      subheading:
        "تتبع عدة عادات، راقب تقدمك، واستخدم مساعداً ذكياً ليحول أهدافك إلى خطة واقعية تضمن الصلاة وقراءة القرآن دائماً.",
      activeHabits: "عادات نشطة",
      dayTracked: "أيام مُتتبعة",
      challengeStatus: "حالة التحدي",
      resetChallenge: "إعادة تشغيل التحدي",
    },
    quiz: {
      title: "دعنا نبني عاداتك الشخصية",
      subtitle: "نظام ذكي بسيط يبقي الصلاة وقراءة القرآن أساساً في كل خطتك.",
      step: "خطوة",
      back: "رجوع",
      continue: "التالي",
      seeHabits: "عرض الاقتراحات",
      suggested: "العادات المقترحة لك",
      suggestedDesc: "احذف ما لا تحتاجه، أضِف عاداتك الخاصة، أو ابدأ التحدي الآن.",
      removeAnything: "احذف ما لا تحتاجه، أضِف عاداتك الخاصة، أو ابدأ التحدي الآن.",
      addCustomHabit: "إضافة عادة شخصية",
      addCustomPlaceholder: "أمثلة: تدوين يومي، وقت عائلي، تمرين خفيف",
      addCustomBtn: "إضافة",
      acceptAll: "قبول الكل",
      startChallenge: "ابدأ التحدي الآن",
      backToQuiz: "العودة للأسئلة",
      habitsAdded: "تم إضافة عاداتك! اعرضها في الشبكة أسفله.",
      improveArea: "ما أهم مجال تريد تطويره؟",
      improveAreaDesc: "اختر ما يشعر أنه الأولوية الآن.",
      dailyTime: "كم وقتاً يمكنك تخصيصه يومياً؟",
      dailyTimeDesc: "سنختار عادات واقعية تناسب وقتك.",
      preference: "ما نوع العادات التي تفضل؟",
      preferenceDesc: "اختر النمط الذي يناسب شخصيتك.",
      goal: "ما هدفك الرئيسي من هذه العادات؟",
      goalDesc: "يساعد في تحديد العادات الأنسب لك.",
      customImproveLabel: "أخبرنا: ماذا تريد أن تحسّن في حياتك؟",
      customImprovePlaceholder: "مثال: الصبر، جودة النوم، الوقت مع الأسرة",
      goalLabel: "الهدف",
      timeLabel: "الوقت المتاح",
      typeLabel: "النوع المفضل",
      smartTip: "💡 نصيحة ذكية:",
      prayerQuranAlways: "الصلاة والقرآن أساس كل شيء. ابدأ بهما ثم أضِف تدريجياً.",
      disciplineTip: "عادة واحدة قوية أفضل من خمس ضعيفة. أتقن الواحدة أولاً.",
      healthTip: "الماء والحركة أساس الصحة. ابدأ بهما قبل أي شيء.",
      learningTip: "المخ يتعلم بشكل أفضل مع فترات راحة منتظمة. احترم هذا الإيقاع.",
      productivityTip: "ركز على 3 مهام رئيسية يومياً. لا تسعَ للكمال في كل شيء.",
      financialTip: "تتبع مصروفاتك أولاً. الادخار المنتظم أفضل من المخاطرة الكبيرة.",
      socialTip: "العلاقات الحقيقية تحتاج وقتاً حقيقياً، وليس مجرد رسائل.",
      creativeTip: "الإبداع يحتاج ممارسة يومية، حتى لو 10-15 دقيقة فقط.",
      basedOnAnswers: "بناءً على إجاباتك، ستحصل على 3-8 عادات مخصصة موصى بها.",
      helpGoal: {
        discipline: "استيقاظ مبكر • تجنب الهاتف صباحاً • تخطيط يومي واضح • نوم منتظم • تدوين يومي قصير",
        health: "شرب الماء بانتظام • مشي يومي • تمارين استطالة • طعام صحي • تنفس عميق",
        learning: "دراسة مركزة • قراءة يومية • تدوين الملاحظات • تمارين عملية • الاستماع للدروس",
        spirituality: "الصلوات الخمس • قراءة القرآن • ذكر الله • تأمل روحي • دعاء صادق",
        productivity: "فترات عمل مركزة • تحديد الأولويات • إدارة الوقت • مراجعة يومية • فترات راحة منتظمة",
        financial: "تتبع المصروفات • الادخار المنتظم • مراجعة الميزانية • تعلم استثمار • تحديد الأهداف المالية",
        social: "اتصالات منتظمة • مساعدة الآخرين • الاستماع الفعال • لقاءات مجدولة • الانضمام لمجموعات",
        creative: "رسم أو كتابة يومية • كتابة حرة • تجربة فنون • استكشاف أفكار جديدة • التعبير الحر",
      },
      helpTime: {
        "5 min": "تمارين صغيرة: تنفس دقيقة واحدة • 5 تمارين ضغط • صفحة واحدة قراءة • ملاحظة امتنان سريعة",
        "10 min": "جلسة قصيرة: تمدد عام • قراءة مركزة • دراسة سريعة • مشي خفيف • تدوين قصير",
        "20 min": "ممارسة مركزة: تمارين لغة • مجموعات تدريب • قراءة فصل • تمارين برمجة",
        "30 min": "جلسة متوسطة: تمرين رياضي • درس دراسي • عمل إبداعي • تقدم في مشروع",
        "45 min": "جلسة عميقة: ممارسة + مراجعة • مشي طويل • عمل فني مركز",
        "60 min": "جلسة كاملة: تمرين شامل • وحدة دراسية • قراءة مطولة • عمل مخصص",
      },
      helpType: {
        mental: "ألغاز ذهنية • قراءة عميقة • تمارين ذاكرة • تدوين يومي • حل مشاكل منطقية",
        physical: "مشي أو ركض • تمارين HIIT • تمارين مرونة • تصحيح وضعية • تمارين قصيرة",
        religious: "الصلاة • قراءة القرآن • ذكر الله • أعمال خيرية • تأمل روحي",
        study: "مراجعة متكررة • ملخصات الدروس • أسئلة تدريبية • جلسات دراسة مركزة",
        mixed: "مزج بين تمرين خفيف + فترة دراسية + يقظة ذهنية",
        mindfulness: "تنفس واعي • مسح جسدي • مشي تأملي • تدوين اللحظة الحالية",
        work: "فترات بوموديرو • تجميع المهام • فرز الرسائل • تخطيط الصباح",
      },
      addHabits: "إضافة العادات",
      viewInGrid: "تمت الإضافة! شاهد عاداتك في الشبكة أسفله.",
      backToQuestions: "العودة للأسئلة",
      aiSuggestedHabits: "اقتراحاتك الشخصية",
      personalizedHabit: "عادة مخصصة",
      personalizedHabits: "عادات مخصصة",
      basedOn: "بناءً على:",
      daily: "يومياً",
    },
    options: {
      productivity: "الإنتاجية",
      health: "الصحة",
      religion: "الدين",
      study: "الدراسة",
      discipline: "الانضباط",
      learning: "التعلم",
      spirituality: "الروحانية",
      consistency: "الاستمرارية",
      calm: "الهدوء",
      mental: "عقلي",
      physical: "جسدي",
      religious: "ديني",
      mixed: "مختلط",
      mindfulness: "اليقظة الذهنية",
      work: "العمل",
      financial: "مالي",
      social: "اجتماعي",
      creative: "إبداعي",
      fiveMin: "5 دقائق",
      tenMin: "10 دقائق",
      twentyMin: "20 دقيقة",
      thirtyMin: "30 دقيقة",
      fortyFiveMin: "45 دقيقة",
      sixtyMin: "ساعة واحدة",
    },
    habits: {
      prayer: "الصلاة",
      quran: "قراءة القرآن",
      readQuran: "قراءة القرآن",
      "morning-dhikr": "أذكار الصباح",
      "evening-dhikr": "أذكار المساء",
      "night-prayer": "قيام الليل",
      istighfar: "الاستغفار",
      dua: "الدعاء",
      hadith: "قراءة الحديث",
      "memorize-verse": "حفظ آية",
      "duha-prayer": "صلاة الضحى",
      "witr-prayer": "صلاة الوتر",
      "daily-charity": "صدقة يومية",
      dhikr: "الذكر",
      reflect: "التأمل",
      charity: "صدقة",
      fasting: "صيام",
      "study-20min": "دراسة 20 دقيقة",
      "review-notes": "مراجعة الملاحظات",
      "spaced-repetition": "التكرار المتباعد",
      summarize: "تلخيص الدرس",
      "practice-questions": "تمارين عملية",
      "read-pages": "قراءة 5 صفحات",
      "phone-free-study": "دراسة بدون هاتف",
      flashcards: "بطاقات تعليمية",
      "revise-previous": "مراجعة الدرس السابق",
      "write-summary": "كتابة ملخص",
      "deep-focus": "تركيز عميق",
      "read-10pages": "قراءة 10 صفحات",
      journaling: "كتابة اليوميات",
      "learn-word": "تعلم كلمة جديدة",
      "problem-solving": "حل المشاكل",
      "memory-training": "تدريب الذاكرة",
      "logic-puzzles": "ألغاز منطقية",
      "brain-exercise": "تمرين عقلي",
      reflection: "التأمل",
      "gratitude-writing": "كتابة الامتنان",
      "plan-tomorrow": "التخطيط للغد",
      "walk-10min": "المشي 10 دقائق",
      stretch: "تمارين الاستطالة",
      pushups: "تمارين الضغط",
      "drink-water": "شرب الماء",
      "workout-15min": "تمرين 15 دقيقة",
      "posture-check": "فحص الوضعية",
      "breathing-exercise": "تمرين التنفس",
      "stand-hourly": "الوقوف كل ساعة",
      "steps-goal": "هدف الخطوات",
      "mobility-routine": "روتين الحركة",
      "meditation-5min": "تأمل 5 دقائق",
      breathing: "التنفس",
      "phone-free": "وقت بدون هاتف",
      "mindful-walk": "مشي واعٍ",
      gratitude: "الامتنان",
      "calm-sitting": "جلسة هادئة",
      "focus-breathing": "تنفس التركيز",
      "relax-5min": "الاسترخاء 5 دقائق",
      "body-scan": "مسح الجسم",
      "slow-breathing": "تنفس بطيء",
      "plan-tasks": "تخطيط المهام",
      "deep-work-20": "عمل عميق 20 دقيقة",
      "inbox-zero": "صندوق بريد فارغ",
      "review-goals": "مراجعة الأهداف",
      "top-3": "أفضل 3 أولويات",
      "no-distraction": "بدون تشتيت",
      "task-batching": "تجميع المهام",
      "productivity-block": "كتلة إنتاجية",
      "organize-workspace": "تنظيم مساحة العمل",
      "check-progress": "فحص التقدم",
      "wake-early": "الاستيقاظ مبكراً",
      "no-phone": "بدون هاتف صباحاً",
      "plan-day": "تخطيط اليوم",
      exercise: "رياضة",
      "sleep-time": "وقت نوم منتظم",
      journal: "دفتر يوميات",
      water: "شرب الماء",
      walk: "مشي سريع",
      "healthy-food": "طعام صحي",
      meditation: "تأمل",
      "deep-work": "عمل عميق",
      review: "مراجعة يومية",
      priorities: "أفضل الأولويات",
      "no-distractions": "وقت بدون تشتيت",
      "break-time": "فترات راحة منتظمة",
      study: "جلسة دراسة",
      read: "قراءة كتاب",
      notes: "تدوين الملاحظات",
      podcast: "الاستماع للبودكاست",
      practice: "تطبيق المهارات",
      "track-spending": "تتبع النفقات",
      save: "ادخار يومي",
      "budget-plan": "تخطيط الميزانية",
      "invest-learn": "تعلم الاستثمار",
      "side-hustle": "مشروع جانبي",
      "call-friend": "اتصال بصديق",
      "social-outing": "خروج اجتماعي",
      "help-others": "مساعدة الآخرين",
      "listen-actively": "الاستماع النشط",
      network: "بناء الشبكة",
      sketch: "الرسم",
      write: "الكتابة الإبداعية",
      music: "ممارسة الموسيقى",
      craft: "الحرف اليدوية",
      "learn-hobby": "تعلم هواية",
      "consistent-learning": "التعلم المنتظم",
      "walking-meeting": "لقاءات أثناء المشي",
      "blessed-morning": "صباح مبارك",
      "learning-to-work": "تطبيق المعرفة",
      gridTitle: "تتبع كل عادة، يوماً تلو الآخر",
      gridDesc: "اضغط على كل خلية لتحديدها كمكتملة. مرر لليمين لرؤية جميع الأيام الـ 30.",
      habits: "العادات",
      removeHabit: "إزالة العادة",
      noHabits: "لا توجد عادات حتى الآن. أضف عادات من القسم أعلاه.",
    },
    progress: {
      completionRate: "معدل الإكمال",
      completionDesc: "عبر خطة عاداتك النشطة لمدة 30 يوماً.",
      doneToday: "منجز اليوم",
      doneTodayDesc: "الانتصارات الصغيرة تحسب عند تكرارها.",
      currentStreak: "السلسلة الحالية",
      streakDesc: "أقوى سلسلة نشطة لديك عبر جميع العادات.",
      progressChart: "مخطط التقدم",
      progressDesc:  "عرض بسيط لمدى إكمال عاداتك كل يوم.",
      lastSevenDays: "آخر 7 أيام",
      habitsActive: "عادات نشطة",
    },
    quickAdd: {
      title: "إضافة سريعة",
      subtitle: "أضف عادة جديدة لتحديك لـ 30 يوم",
      placeholder: "أدخل اسم العادة...",
      addBtn: "إضافة عادة",
    },
    challenge: {
      startWithAI: "احصل على عادات شخصية من الذكاء الاصطناعي",
      challengeActive: "التحدي نشط",
      challengeLive: "تحدي 30 يوماً مباشر",
      challengeDesc: "تتبع عاداتك يومياً وبني روتينات دائمة",
      resetButton: "إعادة تشغيل التحدي",
      resetConfirmMessage: "هل أنت متأكد من أنك تريد إعادة تشغيل جميع التقدم لهذا الشهر؟ لن يتمكن من التراجع عن هذا.",
    },
    auth: {
      personalSpace: "مساحة العادات الشخصية",
      mainTitle: "سجل الدخول أو أنشئ حساباً لتحميل متتبع عاداتك.",
      mainDesc:
        "كل حساب يحتفظ بعاداته الخاصة، وشبكته الـ 30 يوم، ومخطط تقدمه، واقتراحات الذكاء الاصطناعي. يمكنك تسجيل الخروج في أي وقت للتبديل إلى مستخدم آخر.",
      userSpecificHabits: "عادات خاصة بالمستخدم",
      userSpecificDesc: "يتم تسجيل كل إضافة أو حذف أو إكمال لهذا الحساب فقط.",
      privateChart: "مخطط التقدم الخاص",
      privateChartDesc: "يعكس التقدم الأسبوعي والسلاسل دائماً المستخدم النشط فقط.",
      personalAI: "اقتراحات الذكاء الاصطناعي الشخصية",
      personalAIDesc: "يتم إنشاء العادات المقترحة وحفظها في متتبعك الشخصي.",
      logIn: "تسجيل الدخول",
      signUp: "إنشاء حساب",
      nameLabel: "الاسم",
      namePlaceholder: "اسمك",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      passwordLabel: "كلمة المرور",
      passwordPlaceholderLogin: "كلمة مرورك ",
      passwordPlaceholderSignup: "أنشئ كلمة مرور (اختيارية)",
      infoLoginMessage: "استخدم بريدك الإلكتروني لمتابعة من حيث توقفت.",
      infoSignupMessage: "أنشئ حساباً باستخدام بريدك الإلكتروني للبدء.",
      loginButton: "تسجيل الدخول",
      createAccountButton: "إنشاء حساب",
      emailRequired: "البريد الإلكتروني مطلوب",
      nameRequired: "الاسم مطلوب لإنشاء الحساب",
      authFailed: "فشل المصادقة",
      existingUsersMessage: "يمكن للمستخدمين الحاليين تسجيل الدخول مجدداً ببريدهم الإلكتروني وكودهم المحفوظ.",
      newAccountMessage: "لا توجد حسابات حتى الآن. أنشئ الحساب الأول للبدء.",
    },
    grid: {
      gridLabel: "شبكة العادات لمدة 30 يوماً",
      remove: "إزالة",
      markToday: "تحديد اليوم",
      notificationTime: "وقت الإشعار",
      notificationEnabled: "تفعيل الإشعار",
      setReminder: "تعيين التذكير",
      notificationPlaceholder: "HH:mm (مثال: 08:30)",
    },
    statistics: {
      successRate: "معدل النجاح",
      today: "اليوم",
      overallCompletion: "الإكمال الإجمالي",
      habitsCompleted: "العادات المكتملة",
      tracking: "التتبع",
      activeHabits: "العادات النشطة",
      best: "الأفضل",
      focusArea: "مجال التركيز",
      completions: "إكمال",
    },
    common: {
      savedCheckIns: "عمليات تسجيل محفوظة",
      todaysGoal: "هدف اليوم",
      english: "الإنجليزية",
      arabic: "العربية",
      french: "الفرنسية",
      selectLanguage: "اختر اللغة",
      daily: "يومياً",
      anytime: "في أي وقت",
      custom: "مخصص",
      menuFor: "قائمة ل",
      addedByYou: "أضافتها لتخصيص رحلتك",
      addHabitsToSeeChart: "أضف عادات لرؤية مخطط التقدم الخاص بك",
    },
    features: {
      howItWorks: "كيف يعمل: ينشئ الذكاء الاصطناعي 3-8 عادات مخصصة بناءً على هدفك والوقت المتاح ونوعك المفضل. تُدرج العادات الدينية دائماً كأساس.",
      progressTitle: "التقدم على مدار 30 يوماً",
      realtimeCompletion: "نسبة الإكمال الفورية لجميع الأيام",
    },
    footer: "نظام لطيف لمدة 30 يوماً للصلاة والقرآن والعادات التي تحرك حياتك للأمام.",
  },
  fr: {
    header: {
      habitTracker: "Suivi des habitudes",
      niyyahDaily: "Intention quotidienne",
      aiHabitGuide: "Guide d'habitudes IA",
    },
    hero: {
      headline: "Construire un système d'habitudes paisible de 30 jours qui s'adapte vraiment à votre vie.",
      subheading:
        "Suivez plusieurs habitudes, surveillez vos progrès, et utilisez un assistant IA simple pour transformer vos objectifs en un plan qui inclut toujours la prière et la lecture du Coran.",
      activeHabits: "Habitudes actives",
      dayTracked: "Jours suivis",
      challengeStatus: "Statut du défi",
      resetChallenge: "Réinitialiser le défi",
    },
    quiz: {
      title: "Construisons vos habitudes",
      subtitle: "Un guide basé sur des règles simples qui garde toujours la prière et la lecture du Coran dans votre plan.",
      step: "Étape",
      back: "Retour",
      continue: "Continuer",
      seeHabits: "Voir les habitudes",
      suggested: "Habitudes suggérées pour vous",
      suggestedDesc:
        "Supprimez ce qui ne vous convient pas, ajoutez les vôtres, ou commencez le défi de 30 jours maintenant.",
      removeAnything: "Supprimez ce qui ne vous convient pas, ajoutez les vôtres, ou commencez le défi de 30 jours maintenant.",
      addCustomHabit: "Ajouter une habitude personnalisée",
      addCustomPlaceholder: "Exemples : Journal quotidien 5 minutes, appel aux parents",
      addCustomBtn: "Ajouter personnalisé",
      acceptAll: "Accepter tout",
      startChallenge: "Commencer maintenant",
      backToQuiz: "Retour aux questions",
      habitsAdded: "Fait ! Consultez vos habitudes dans la grille ci-dessous.",
      improveArea: "Quel domaine voulez-vous améliorer ?",
      improveAreaDesc: "Choisissez ce qui semble le plus important en ce moment.",
      dailyTime: "Combien de temps avez-vous chaque jour ?",
      dailyTimeDesc: "Nous suggérerons des habitudes réalistes pour votre emploi du temps.",
      preference: "Quel type d'habitudes vous convient le mieux ?",
      preferenceDesc: "Choisissez ce qui résonne avec votre style.",
      goal: "Quel est votre objectif principal ?",
      goalDesc: "Cela nous aide à adapter les habitudes à votre vie.",
      customImproveLabel: "Qu'aimeriez-vous améliorer dans votre vie ?",
      customImprovePlaceholder: "Exemple : Patience, qualité du sommeil, connexion familiale",
      goalLabel: "Objectif",
      timeLabel: "Temps disponible",
      typeLabel: "Type préféré",
      smartTip: "💡 Conseil intelligent :",
      prayerQuranAlways: "La prière et le Coran forment votre fondation. Construisez tout le reste autour.",
      disciplineTip: "Une habitude forte vaut mieux que cinq faibles. Maîtrisez-en une d'abord.",
      healthTip: "L'eau et le mouvement sont essentiels à la vie. Commencez par ceux-ci.",
      learningTip: "Votre cerveau apprend mieux avec des pauses régulières. Respectez ce rythme.",
      productivityTip: "Concentrez-vous sur 3 tâches principales chaque jour. Ne cherchez pas la perfection partout.",
      financialTip: "Suivez votre argent en premier. Les petites économies régulières battent les gros risques.",
      socialTip: "Les vraies relations ont besoin de vraiment temps—pas juste des messages et des écrans.",
      creativeTip: "La créativité a besoin de pratique quotidienne, même juste 10-15 minutes.",
      basedOnAnswers: "Sur la base de vos réponses, vous recevrez 3 à 8 recommandations d'habitudes personnalisées.",
      helpGoal: {
        discipline: "Réveil tôt • Pas de téléphone le matin • Planification quotidienne • Sommeil régulier • Journalisation brève",
        health: "Boire de l'eau régulièrement • Promenades quotidiennes • Étirements • Alimentation saine • Respiration profonde",
        learning: "Sessions d'étude concentrées • Lecture quotidienne • Prise de notes • Problèmes pratiques • Écoute de leçons",
        spirituality: "Prières quotidiennes • Lecture du Coran • Invocation de Dieu • Réflexion spirituelle • Prières sincères",
        productivity: "Blocs de travail concentrés • Sélectionnez les 3 premières tâches • Bloc de temps • Examen quotidien • Pauses régulières",
        financial: "Suivi des dépenses • Économies régulières • Examen hebdomadaire du budget • Apprentissage de l'investissement • Fixation d'objectifs",
        social: "Contact régulier • Aider les autres • Écoute active • Réunions programmées • Rejoindre des communautés",
        creative: "Dessiner ou écrire quotidiennement • Écriture libre • Essayer de la musique ou de l'artisanat • Expérimenter • S'exprimer",
      },
      helpTime: {
        "5 min": "Micro-habitudes : Respiration 1 min • 5 pompes • Une page de lecture • Note de gratitude rapide",
        "10 min": "Courte session : Étirements • Lecture concentrée • Étude rapide • Promenade légère • Journal",
        "20 min": "Pratique concentrée : Exercices linguistiques • Séries d'entraînement • Lecture de chapitre • Exercices de codage",
        "30 min": "Bloc solide : Entraînement complet • Leçon d'étude • Travail créatif • Progression du projet",
        "45 min": "Session approfondie : Pratique + examen • Promenade plus longue • Travail artisanal concentré",
        "60 min": "Session complète : Entraînement complet • Module d'étude • Lecture prolongée • Focus dédié",
      },
      helpType: {
        mental: "Puzzles • Lecture • Exercices de mémoire • Journalisation • Exercices de résolution de problèmes",
        physical: "Promenades/courses • HIIT • Travail de flexibilité • Pauses posturales • Courts entraînements",
        religious: "Prière • Lecture du Coran • Invocation • Actes de charité • Réflexion spirituelle",
        study: "Répétition espacée • Résumés de notes • Questions d'entraînement • Blocs d'étude concentrés",
        mixed: "Combinez exercice léger + temps d'étude + pleine conscience",
        mindfulness: "Conscience du souffle • Scan corporel • Promenade méditative • Journalisation du moment présent",
        work: "Minuteurs Pomodoro • Regroupement de tâches • Tri des emails • Planification matinale",
      },
      addHabits: "Ajouter des habitudes",
      viewInGrid: "Ajouté ! Consultez vos habitudes dans la grille ci-dessous.",
      backToQuestions: "Retour aux questions",
      aiSuggestedHabits: "Vos suggestions personnalisées",
      personalizedHabit: "Habitude personnalisée",
      personalizedHabits: "Habitudes personnalisées",
      basedOn: "Basé sur :",
      daily: "Quotidien",
    },
    options: {
      productivity: "Productivité",
      health: "Santé",
      religion: "Religion",
      study: "Étude",
      discipline: "Discipline",
      learning: "Apprentissage",
      spirituality: "Spiritualité",
      consistency: "Cohérence",
      calm: "Calme",
      mental: "Mental",
      physical: "Physique",
      religious: "Religieux",
      mixed: "Mixte",
      mindfulness: "Pleine conscience",
      work: "Travail",      financial: "Financier",
      social: "Social",
      creative: "Créatif",
      fiveMin: "5 minutes",
      tenMin: "10 minutes",
      twentyMin: "20 minutes",
      thirtyMin: "30 minutes",
      fortyFiveMin: "45 minutes",
      sixtyMin: "1 heure",    },
    habits: {
      prayer: "La prière",
      quran: "Lire le Coran",
      readQuran: "Lire le Coran",
      "morning-dhikr": "Glorification Matinale",
      "evening-dhikr": "Glorification Nocturne",
      "night-prayer": "Prière Nocturne",
      istighfar: "Demander Pardon",
      dua: "Supplication",
      hadith: "Lire Hadith",
      "memorize-verse": "Mémoriser Verset",
      "duha-prayer": "Prière du Matin",
      "witr-prayer": "Prière Witr",
      "daily-charity": "Charité Quotidienne",
      dhikr: "Glorification",
      reflect: "Réflexion",
      charity: "Charité",
      fasting: "Jeûne",
      "study-20min": "Étude 20 Min",
      "review-notes": "Revoir Notes",
      "spaced-repetition": "Répétition Espacée",
      summarize: "Résumer Leçon",
      "practice-questions": "Questions Pratiques",
      "read-pages": "Lire 5 Pages",
      "phone-free-study": "Étude Sans Téléphone",
      flashcards: "Cartes Flash",
      "revise-previous": "Réviser Précédent",
      "write-summary": "Écrire Résumé",
      "deep-focus": "Concentration Profonde",
      "read-10pages": "Lire 10 Pages",
      journaling: "Journalisation",
      "learn-word": "Apprendre Mot",
      "problem-solving": "Résolution Problèmes",
      "memory-training": "Entraînement Mémoire",
      "logic-puzzles": "Énigmes Logiques",
      "brain-exercise": "Exercice Cérébral",
      reflection: "Réflexion",
      "gratitude-writing": "Écriture Gratitude",
      "plan-tomorrow": "Planifier Demain",
      "walk-10min": "Marche 10 Min",
      stretch: "Étirements",
      pushups: "Pompes",
      "drink-water": "Boire Eau",
      "workout-15min": "Entraînement 15 Min",
      "posture-check": "Vérifier Posture",
      "breathing-exercise": "Exercice Respiration",
      "stand-hourly": "Debout Chaque Heure",
      "steps-goal": "Objectif Pas",
      "mobility-routine": "Routine Mobilité",
      "meditation-5min": "Méditation 5 Min",
      breathing: "Respiration",
      "phone-free": "Temps Sans Téléphone",
      "mindful-walk": "Marche Consciente",
      gratitude: "Gratitude",
      "calm-sitting": "Assis Calme",
      "focus-breathing": "Respiration Concentration",
      "relax-5min": "Détente 5 Min",
      "body-scan": "Balayage Corps",
      "slow-breathing": "Respiration Lente",
      "plan-tasks": "Planifier Tâches",
      "deep-work-20": "Travail Profond 20 Min",
      "inbox-zero": "Boîte Vide",
      "review-goals": "Revoir Objectifs",
      "top-3": "Top 3 Priorités",
      "no-distraction": "Sans Distraction",
      "task-batching": "Regroupement Tâches",
      "productivity-block": "Bloc Productivité",
      "organize-workspace": "Organiser Espace Travail",
      "check-progress": "Vérifier Progrès",
      "wake-early": "Lever Tôt",
      "no-phone": "Sans Téléphone Matin",
      "plan-day": "Planifier Jour",
      exercise: "Exercice",
      "sleep-time": "Sommeil Régulier",
      journal: "Journal",
      water: "Boire Eau",
      walk: "Marche Rapide",
      "healthy-food": "Nourriture Saine",
      meditation: "Méditation",
      "deep-work": "Travail Profond",
      review: "Examen Quotidien",
      priorities: "Priorités",
      "no-distractions": "Temps Sans Distraction",
      "break-time": "Pauses Régulières",
      study: "Session Étude",
      read: "Lire Livre",
      notes: "Prendre Notes",
      podcast: "Écouter Podcast",
      practice: "Pratiquer Compétences",
      "track-spending": "Suivre Dépenses",
      save: "Épargner Quotidien",
      "budget-plan": "Planifier Budget",
      "invest-learn": "Apprendre Investissement",
      "side-hustle": "Projet Secondaire",
      "call-friend": "Appeler Ami",
      "social-outing": "Sortie Sociale",
      "help-others": "Aider Autres",
      "listen-actively": "Écoute Active",
      network: "Réseautage",
      sketch: "Croquis",
      write: "Écriture Créative",
      music: "Pratique Musique",
      craft: "Artisanat",
      "learn-hobby": "Apprendre Loisir",
      "consistent-learning": "Apprentissage Régulier",
      "walking-meeting": "Réunions à Pied",
      "blessed-morning": "Matin Béni",
      "learning-to-work": "Appliquer Apprentissage",
      gridTitle: "Suivre chaque habitude, jour après jour",
      gridDesc:
        "Cliquez sur chaque cellule pour la marquer comme terminée. Faites défiler vers la droite pour voir tous les 30 jours.",
      habits: "Habitudes",
      removeHabit: "Supprimer l'habitude",
      noHabits: "Aucune habitude pour le moment. Ajoutez des habitudes depuis la section ci-dessus.",
    },
    progress: {
      completionRate: "Taux d'achèvement",
      completionDesc: "À travers votre plan d'habitudes actif de 30 jours.",
      doneToday: "Fait aujourd'hui",
      doneTodayDesc: "Les petites victoires comptent lorsqu'elles sont répétées.",
      currentStreak: "Série actuelle",
      streakDesc: "Votre plus longue série active à travers toutes les habitudes.",
      progressChart: "Graphique de progression",
      progressDesc: "Vue simple de la façon dont vous complétez les habitudes chaque jour.",
      lastSevenDays: "7 derniers jours",
      habitsActive: "Habitudes actives",
    },
    quickAdd: {
      title: "Ajout Rapide",
      subtitle: "Ajoutez une nouvelle habitude à votre défi de 30 jours",
      placeholder: "Entrez le nom de l'habitude...",
      addBtn: "Ajouter Habitude",
    },
    challenge: {
      startWithAI: "Obtenez des habitudes personnalisées de l'IA",
      challengeActive: "Défi Actif",
      challengeLive: "Défi de 30 Jours En Direct",
      challengeDesc: "Suivez vos habitudes quotidiennement et établissez des routines durables",
      resetButton: "Réinitialiser le Défi",
      resetConfirmMessage: "Êtes-vous sûr de vouloir réinitialiser toute la progression pour ce mois? Cela ne peut pas être annulé.",
    },
    auth: {
      personalSpace: "Votre espace personnel d'habitudes",
      mainTitle: "Inscrivez-vous ou connectez-vous pour charger votre propre suivi d'habitudes.",
      mainDesc:
        "Chaque compte conserve ses propres habitudes, sa grille de 30 jours, son graphique de progression et ses suggestions IA. Déconnectez-vous à tout moment pour basculer vers un autre utilisateur.",
      userSpecificHabits: "Habitudes spécifiques à l'utilisateur",
      userSpecificDesc: "Chaque ajout, suppression et complétion n'est enregistré que pour ce compte.",
      privateChart: "Graphique de progression privé",
      privateChartDesc: "La progression hebdomadaire et les séries reflètent toujours uniquement l'utilisateur actif.",
      personalAI: "Suggestions IA personnelles",
      personalAIDesc: "Les habitudes suggérées sont générées et enregistrées dans votre suivi personnel.",
      logIn: "Connexion",
      signUp: "S'inscrire",
      nameLabel: "Nom",
      namePlaceholder: "Votre nom",
      emailLabel: "Adresse e-mail",
      emailPlaceholder: "Entrez votre adresse e-mail",
      passwordLabel: "Mot de passe",
      passwordPlaceholderLogin: "Votre mot de passe ",
      passwordPlaceholderSignup: "Créez un mot de passe (facultatif)",
      infoLoginMessage: "Utilisez votre adresse e-mail pour continuer où vous vous êtes arrêté.",
      infoSignupMessage: "Créez un compte avec votre adresse e-mail pour commencer.",
      loginButton: "Se connecter",
      createAccountButton: "Créer un compte",
      emailRequired: "L'adresse e-mail est requise",
      nameRequired: "Le nom est requis pour s'inscrire",
      authFailed: "Échec de l'authentification",
      existingUsersMessage: "Les utilisateurs existants peuvent se reconnecter avec leur adresse e-mail et leur code enregistrés.",
      newAccountMessage: "Aucun compte pour le moment. Créez le premier compte pour commencer.",
    },
    grid: {
      gridLabel: "Grille des habitudes de 30 jours",
      remove: "Supprimer",
      markToday: "Marquer aujourd'hui",
      notificationTime: "Heure de notification",
      notificationEnabled: "Activer la notification",
      setReminder: "Définir un rappel",
      notificationPlaceholder: "HH:mm (ex: 08:30)",
    },
    statistics: {
      successRate: "Taux de réussite",
      today: "Aujourd'hui",
      overallCompletion: "Achèvement global",
      habitsCompleted: "Habitudes terminées",
      tracking: "Suivi",
      activeHabits: "Habitudes actives",
      best: "Meilleur",
      focusArea: "Domaine à améliorer",
      completions: "Complétions",
    },
    common: {
      savedCheckIns: "enregistrements sauvegardés",
      todaysGoal: "Objectif d'aujourd'hui",
      english: "Anglais",
      arabic: "Arabe",
      french: "Français",
      selectLanguage: "Sélectionner la langue",
      daily: "Quotidien",
      anytime: "N'importe quand",
      custom: "Personnalisé",
      menuFor: "Menu pour",
      addedByYou: "Ajouté par vous pour personnaliser votre parcours.",
      addHabitsToSeeChart: "Ajoutez des habitudes pour voir votre graphique de progression",
    },
    features: {
      howItWorks: "Comment cela fonctionne : L'IA génère 3-8 habitudes personnalisées en fonction de votre objectif, du temps disponible et du type préféré. Les habitudes religieuses sont toujours incluses comme fondation.",
      progressTitle: "Progrès sur 30 jours",
      realtimeCompletion: "Pourcentage d'achèvement en temps réel pour tous les jours",
    },
    footer: "Un système doux de 30 jours pour la prière, le Coran et les habitudes qui font avancer votre vie.",
  },
};

export function getTranslations(language: Language): Translations {
  return translations[language];
}