/**
 * Central, typed site configuration.
 *
 * Navigation and feature metadata live here as a single source of truth.
 * Human-readable labels are stored as i18n KEYS (resolved via `t()` in the UI)
 * so every string is automatically bilingual (English ⇄ Kannada).
 */

export type NavItem = {
  /** i18n key for the label */
  labelKey: string;
  href: string;
};

export type FeatureItem = {
  /** i18n key for the title */
  titleKey: string;
  /** i18n key for the description */
  descKey: string;
  /** lucide-react icon name, resolved where rendered */
  icon: string;
  /** Whether the feature is live yet (drives "Soon" badges) */
  available: boolean;
  href: string;
};

export const siteConfig = {
  name: "Akkaverse",
  nav: [
    { labelKey: "nav.assistant", href: "/chat" },
    { labelKey: "nav.learn", href: "/learn" },
    { labelKey: "nav.explore", href: "/explore" },
    { labelKey: "nav.roots", href: "/roots" },
    { labelKey: "nav.festivals", href: "/festivals" },
    { labelKey: "nav.stories", href: "/stories" },
    { labelKey: "nav.timeline", href: "/timeline" },
    { labelKey: "nav.quiz", href: "/quiz" },
    { labelKey: "nav.memories", href: "/memories" },
    { labelKey: "nav.about", href: "/about" },
  ] as NavItem[],
} as const;

/**
 * Desktop primary navigation — deliberately focused. Fewer, stronger
 * destinations read as a confident product, not a pile of features. The rest
 * live under a "More" menu; the AI Assistant is reachable via the header CTA.
 */
export const primaryNav: NavItem[] = [
  { labelKey: "nav.roots", href: "/roots" },
  { labelKey: "nav.explore", href: "/explore" },
  { labelKey: "nav.stories", href: "/stories" },
  { labelKey: "nav.timeline", href: "/timeline" },
  { labelKey: "nav.learn", href: "/learn" },
  { labelKey: "nav.quiz", href: "/quiz" },
];

/** Secondary destinations, tucked into the header "More" menu. */
export const moreNav: NavItem[] = [
  { labelKey: "nav.festivals", href: "/festivals" },
  { labelKey: "nav.memories", href: "/memories" },
  { labelKey: "nav.about", href: "/about" },
];

export const features: FeatureItem[] = [
  {
    titleKey: "feature.roots.title",
    descKey: "feature.roots.desc",
    icon: "TreeDeciduous",
    available: true,
    href: "/roots",
  },
  {
    titleKey: "feature.assistant.title",
    descKey: "feature.assistant.desc",
    icon: "Sparkles",
    available: true,
    href: "/chat",
  },
  {
    titleKey: "feature.learn.title",
    descKey: "feature.learn.desc",
    icon: "GraduationCap",
    available: true,
    href: "/learn",
  },
  {
    titleKey: "feature.explore.title",
    descKey: "feature.explore.desc",
    icon: "Map",
    available: true,
    href: "/explore",
  },
  {
    titleKey: "feature.festivals.title",
    descKey: "feature.festivals.desc",
    icon: "PartyPopper",
    available: true,
    href: "/festivals",
  },
  {
    titleKey: "feature.timeline.title",
    descKey: "feature.timeline.desc",
    icon: "Milestone",
    available: true,
    href: "/timeline",
  },
  {
    titleKey: "feature.quiz.title",
    descKey: "feature.quiz.desc",
    icon: "Brain",
    available: true,
    href: "/quiz",
  },
  {
    titleKey: "feature.stories.title",
    descKey: "feature.stories.desc",
    icon: "BookOpen",
    available: true,
    href: "/stories",
  },
  {
    titleKey: "feature.memories.title",
    descKey: "feature.memories.desc",
    icon: "Heart",
    available: true,
    href: "/memories",
  },
];
