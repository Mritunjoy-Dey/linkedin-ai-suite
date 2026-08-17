import {
  UserProfile,
  Story,
  Post,
  ConnectionCandidate,
  JobListing,
  Conversation,
  NewsItem,
  CategoryStory
} from './types';

export const MESSAGING_CATEGORY_STORIES: CategoryStory[] = [
  {
    id: 'cat_top_picks',
    categoryName: 'Top Pick',
    badgeText: '★',
    icon: 'star',
    isUnseen: true,
    slides: [
      {
        id: 's_tp_1',
        companyName: 'OpenAI',
        companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150',
        timeAgo: '2h ago',
        headline: 'OpenAI Ships GPT-4.5 Reasoning Engine for Autonomous Coding Agents',
        body: 'Based on your recent engagement with LLM architectures and AI tooling, OpenAI posted a major update on zero-shot code generation, multi-file workspace reasoning, and API latency improvements.',
        mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
        aiInsight: 'Curated by LinkedIn AI from your interest in OpenAI, LLMs & Software Engineering.',
        likesCount: 1420,
        commentsCount: 188
      },
      {
        id: 's_tp_2',
        companyName: 'Anthropic',
        companyLogo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=150',
        timeAgo: '4h ago',
        headline: 'Claude 3.7 Hybrid Reasoning Released with Custom Budget Control',
        body: 'Anthropic announced Claude 3.7 featuring real-time hybrid thinking budgets. Developers can adjust reasoning depth dynamically per API call for complex algorithmic tasks.',
        mediaUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
        aiInsight: 'Matched from your network connections at Figma & Anthropic research followers.',
        likesCount: 980,
        commentsCount: 112
      }
    ]
  },
  {
    id: 'cat_tech',
    categoryName: 'Tech',
    isUnseen: true,
    slides: [
      {
        id: 's_tech_1',
        companyName: 'Google Cloud',
        companyLogo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
        timeAgo: '3h ago',
        headline: 'Google Cloud Unveils Gemini 2.5 Flash for Sub-50ms Cloud Agents',
        body: 'Google launched Vertex AI agent orchestration with Gemini 2.5 Flash, delivering ultra-low latency context windows and native function calling for enterprise web services.',
        mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        aiInsight: 'Matched from your followed topics: Cloud Computing, Google Cloud & Developer Infra.',
        likesCount: 2150,
        commentsCount: 310
      },
      {
        id: 's_tech_2',
        companyName: 'Stripe',
        companyLogo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=150',
        timeAgo: '5h ago',
        headline: 'Stripe Launches AI Agent Payments SDK',
        body: 'Stripe announced an autonomous agent checkout layer allowing verifiable AI agents to execute metered micropayments and SaaS subscriptions safely.',
        mediaUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
        aiInsight: 'Recommended based on your recent interactions with Priya Mehta (Stripe).',
        likesCount: 1840,
        commentsCount: 245
      }
    ]
  },
  {
    id: 'cat_finance',
    categoryName: 'Finance',
    isUnseen: false,
    slides: [
      {
        id: 's_fin_1',
        companyName: 'Sequoia Capital',
        companyLogo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=150',
        timeAgo: '6h ago',
        headline: 'Silicon Valley AI VC Investment Reaches Record $18B in Q3',
        body: 'Sequoia published their annual State of Enterprise AI report, showing a 45% increase in seed funding for AI-native infrastructure, developer toolchains, and security runtimes.',
        mediaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        aiInsight: 'Derived from trending network signals in San Francisco & Silicon Valley startup networks.',
        likesCount: 1290,
        commentsCount: 94
      }
    ]
  },
  {
    id: 'cat_ai_cloud',
    categoryName: 'AI & Cloud',
    isUnseen: true,
    slides: [
      {
        id: 's_ai_1',
        companyName: 'Microsoft Azure',
        companyLogo: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=150',
        timeAgo: '1h ago',
        headline: 'Microsoft Expands Copilot Studio with Native LinkedIn Graph Tools',
        body: 'Enterprise recruiters and engineering managers can now auto-summarize talent pipelines and project specs directly inside Microsoft Teams using LinkedIn Graph APIs.',
        mediaUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
        aiInsight: 'LinkedIn AI matched from your Cloud AI & Recruiter message signals.',
        likesCount: 890,
        commentsCount: 67
      }
    ]
  },
  {
    id: 'cat_design_ux',
    categoryName: 'Design & UX',
    isUnseen: false,
    slides: [
      {
        id: 's_ux_1',
        companyName: 'Figma',
        companyLogo: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=150',
        timeAgo: '4h ago',
        headline: 'Figma Unveils Variables Engine 2.0 with Live Code Token Sync',
        body: 'Figma released automated design token sync for Tailwind CSS v4 and React 19, enabling seamless dual-direction updates between design files and GitHub pull requests.',
        mediaUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=800',
        aiInsight: 'Matched from your current role as Senior Software Engineer at Figma.',
        likesCount: 3120,
        commentsCount: 420
      }
    ]
  },
  {
    id: 'cat_sponsored',
    categoryName: 'Sponsored',
    isSponsored: true,
    badgeText: 'Promoted',
    isUnseen: true,
    slides: [
      {
        id: 's_sp_1',
        companyName: 'Databricks',
        companyLogo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=150',
        isSponsored: true,
        timeAgo: 'Sponsored',
        headline: 'Databricks Data Intelligence Platform for Enterprise AI',
        body: 'Build, evaluate, and deploy custom GenAI models securely on your enterprise data warehouse with zero data copy required. Try the 14-day free trial.',
        mediaUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
        aiInsight: 'Sponsored content targeted for Tech Leaders & System Architects.',
        likesCount: 540,
        commentsCount: 32
      }
    ]
  }
];

export const CURRENT_USER: UserProfile = {
  id: 'user_me',
  name: 'Mritunjoy Dey',
  title: 'Senior Software Engineer · Figma',
  company: 'Figma',
  location: 'San Francisco, CA',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  banner: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000',
  connectionsCount: 842,
  profileViewers: 342,
  postImpressions: 2819
};

export const INITIAL_STORIES: Story[] = [
  {
    id: 'story_me',
    userId: 'user_me',
    userName: 'Add story',
    userAvatar: CURRENT_USER.avatar,
    userTitle: CURRENT_USER.title,
    isUserStory: true,
    timeAgo: 'Now',
    isSeen: true
  },
  {
    id: 'story_1',
    userId: 'user_1',
    userName: 'Priya Mehta',
    userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    userTitle: 'Engineering Manager · Stripe',
    mediaUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
    textContent: '🚀 Just wrapped up our Q3 Stripe Tech All-Hands! Incredible momentum on zero-downtime database migrations.',
    bgGradient: 'from-blue-600 to-indigo-800',
    timeAgo: '2h ago',
    isSeen: false
  },
  {
    id: 'story_2',
    userId: 'user_2',
    userName: 'Marcus Chen',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    userTitle: 'Staff Product Designer · Airbnb',
    mediaUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800',
    textContent: '🎨 Exploring new spatial design tokens for web and mobile component systems.',
    bgGradient: 'from-purple-600 to-pink-600',
    timeAgo: '4h ago',
    isSeen: false
  },
  {
    id: 'story_3',
    userId: 'user_3',
    userName: 'Amara Osei',
    userAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200',
    userTitle: 'Tech Lead · Google',
    mediaUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    textContent: '⚡ Speaking at Bay Area Web Dev Conference on distributed state management!',
    bgGradient: 'from-cyan-600 to-blue-700',
    timeAgo: '5h ago',
    isSeen: false
  },
  {
    id: 'story_4',
    userId: 'user_4',
    userName: 'Keiko Tanaka',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    userTitle: 'Product Lead · Notion',
    mediaUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    textContent: '💡 Launching Notion AI Workflow Automations today. Huge milestone for our product team!',
    bgGradient: 'from-emerald-600 to-teal-800',
    timeAgo: '7h ago',
    isSeen: false
  },
  {
    id: 'story_5',
    userId: 'user_5',
    userName: 'Daniel Svensson',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    userTitle: 'SRE · Cloudflare',
    mediaUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
    textContent: '🛡️ Edge compute latency down by 22% globally following our network overhaul.',
    bgGradient: 'from-slate-700 to-slate-900',
    timeAgo: '12h ago',
    isSeen: true
  },
  {
    id: 'story_6',
    userId: 'user_6',
    userName: 'Fatima Al-Rashid',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    userTitle: 'Staff Engineer · Shopify',
    mediaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    textContent: '☕ Coffee, code & high-volume e-commerce checkout optimization.',
    bgGradient: 'from-amber-600 to-orange-700',
    timeAgo: '14h ago',
    isSeen: false
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post_1',
    authorName: 'Priya Mehta',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    authorTitle: 'Engineering Manager · Stripe',
    authorCompany: 'Stripe',
    timeAgo: '2h',
    content: 'Excited to share that our team shipped zero-downtime database migrations at Stripe last week — serving 300M+ API requests daily with no customer impact. The secret? Expand-contract pattern + feature flags + a very patient SRE team 🙏\n\nWhen handling high-concurrency payment streams, schema evolution cannot block reader or writer threads. We partitioned the migration phase into three non-destructive steps: dual writes, shadowed validation reads, and final column cutovers. Huge props to everyone involved!',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    likesCount: 248,
    commentsCount: 34,
    repostsCount: 12,
    isLiked: false,
    comments: [
      {
        id: 'c1',
        authorName: 'Daniel Svensson',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
        authorTitle: 'SRE · Cloudflare',
        text: 'The expand-contract pattern is a lifesaver. Did you hit any locking issues during initial shadow indexing?',
        timestamp: '1h ago',
        likesCount: 14
      },
      {
        id: 'c2',
        authorName: 'Mritunjoy Dey',
        authorAvatar: CURRENT_USER.avatar,
        authorTitle: 'Senior Software Engineer · Figma',
        text: 'Congrats Priya! 300M+ requests with zero downtime is a massive engineering win.',
        timestamp: '45m ago',
        likesCount: 8
      }
    ]
  },
  {
    id: 'post_2',
    authorName: 'Marcus Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    authorTitle: 'Staff Product Designer · Airbnb',
    authorCompany: 'Airbnb',
    timeAgo: '5h',
    content: 'Design systems aren\'t just about UI components; they are about velocity, consistency, and cross-functional trust.\n\nOver the past two quarters at Airbnb, our design engineering group overhauled our core design tokens pipeline. By syncing Figma variables directly to code repositories via GitHub Actions, we eliminated manual handoff overhead by 40%.\n\nHere is a quick snapshot of how our token translation layer works across web (Tailwind/CSS) and native iOS/Android targets! What token workflows do you use in your team?',
    imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1000',
    likesCount: 412,
    commentsCount: 56,
    repostsCount: 29,
    isLiked: true,
    comments: [
      {
        id: 'c3',
        authorName: 'Keiko Tanaka',
        authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
        authorTitle: 'Product Lead · Notion',
        text: 'Super inspiring Marcus! We are currently building similar token automations in Notion.',
        timestamp: '3h ago',
        likesCount: 19
      }
    ]
  },
  {
    id: 'post_3',
    authorName: 'Amara Osei',
    authorAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200',
    authorTitle: 'Tech Lead · Google Cloud',
    authorCompany: 'Google',
    timeAgo: '1d',
    content: 'We are hiring Senior & Staff Full Stack Engineers for our Cloud Platform & AI Infrastructure team in San Francisco, CA & Remote!\n\nIf you love building high-throughput distributed systems, WebAssembly runtimes, and Gemini AI agent toolings, feel free to reach out directly or drop your resume in my DMs.',
    likesCount: 189,
    commentsCount: 22,
    repostsCount: 8,
    isLiked: false,
    comments: []
  }
];

export const INITIAL_CONNECTIONS: ConnectionCandidate[] = [
  {
    id: 'conn_1',
    name: 'Keiko Tanaka',
    title: 'Product Lead · Notion',
    company: 'Notion',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    mutualConnections: 14,
    status: 'none'
  },
  {
    id: 'conn_2',
    name: 'Daniel Svensson',
    title: 'SRE · Cloudflare',
    company: 'Cloudflare',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    mutualConnections: 8,
    status: 'none'
  },
  {
    id: 'conn_3',
    name: 'Fatima Al-Rashid',
    title: 'Staff Engineer · Shopify',
    company: 'Shopify',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    mutualConnections: 22,
    status: 'none'
  },
  {
    id: 'conn_4',
    name: 'Alexander Wright',
    title: 'VP of Product · Figma',
    company: 'Figma',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    mutualConnections: 41,
    status: 'none'
  }
];

export const INITIAL_JOBS: JobListing[] = [
  {
    id: 'job_1',
    title: 'Senior Software Engineer, Frontend',
    company: 'Vercel',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=100',
    location: 'San Francisco, CA',
    workPolicy: 'Hybrid',
    salaryRange: '$180,000 - $220,000 · Equity',
    salaryMinNumeric: 180000,
    salaryMaxNumeric: 220000,
    postedDaysAgo: 0,
    experienceLevel: 'Senior',
    employmentType: 'Full-time',
    applicantsCount: 18,
    timeAgo: '3 hours ago',
    easyApply: true,
    isSaved: false,
    verifiedRecruiter: true,
    rating: 3.4,
    ratingsCount: '18,504',
    recommendPercent: 48,
    officesCount: '21 Offices',
    industry: 'Internet & Web Services',
    awards: 'Top Developer Tooling 2025',
    websiteUrl: 'https://vercel.com',
    reviews: [
      {
        id: 'rev_v1',
        authorRole: 'Senior Frontend Engineer',
        authorStatus: 'Current Employee',
        rating: 4.0,
        headline: 'Great technical culture & fast-paced shipping',
        pros: 'High engineering autonomy, brilliant peers, great remote work setup, cutting-edge Next.js tech stack.',
        cons: 'Fast pace means occasional crunch times around major product launches like Vercel Ship.',
        date: 'Jul 2026',
        recommend: true
      },
      {
        id: 'rev_v2',
        authorRole: 'Software Developer',
        authorStatus: 'Former Employee',
        rating: 3.0,
        headline: 'Exciting product, rapid organizational shifts',
        pros: 'Top tier compensation, equity upside, freedom to choose developer tooling.',
        cons: 'High expectations for self-driven learning; rapid shift in priorities.',
        date: 'May 2026',
        recommend: false
      }
    ],
    aiSummary: 'Vercel is seeking a Senior Software Engineer to build Next.js developer tools, edge compute APIs, and web rendering engine architecture. Offers $180K–$220K salary with equity in a Hybrid San Francisco setup. Matches 8 of 10 skills on your profile including React & TypeScript.',
    description: 'Vercel is looking for a Senior Software Engineer to help build the next generation of frontend developer tools, edge compute runtime APIs, and web rendering architecture.\n\nIn this role, you will work closely with Next.js maintainers and cloud platform engineers to deliver fast, resilient, and intuitive developer experiences for millions of creators worldwide.',
    requirements: [
      '5+ years of software engineering experience with React, TypeScript, and modern SSR frameworks.',
      'Deep understanding of web performance metrics (Core Web Vitals, streaming SSR, edge caching).',
      'Track record of building complex, high-traffic web applications with clean, tested codebases.',
      'Experience with bundlers (Vite, Turbopack) and cloud deployment infrastructure.'
    ],
    benefits: [
      'Competitive salary + generous equity options',
      'Full health, dental, and vision insurance with $0 deductible',
      'Flexible PTO policy and annual learning stipend ($2,500)',
      '$1,500 home office hardware credit'
    ],
    companyDescription: 'Vercel provides developer tools and cloud infrastructure to build, scale, and deploy fast web applications.'
  },
  {
    id: 'job_2',
    title: 'Product Manager, AI Platform',
    company: 'LinkedIn',
    companyLogo: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?auto=format&fit=crop&q=80&w=100',
    location: 'Sunnyvale, CA',
    workPolicy: 'On-site',
    salaryRange: '$190,000 - $240,000',
    salaryMinNumeric: 190000,
    salaryMaxNumeric: 240000,
    postedDaysAgo: 1,
    experienceLevel: 'Mid-Senior',
    employmentType: 'Full-time',
    applicantsCount: 42,
    timeAgo: '1 day ago',
    easyApply: true,
    isSaved: true,
    verifiedRecruiter: true,
    rating: 4.5,
    ratingsCount: '42,110',
    recommendPercent: 88,
    officesCount: '34 Offices',
    industry: 'Professional Social Network',
    awards: 'Best Workplaces for AI Talent 2025',
    websiteUrl: 'https://linkedin.com',
    reviews: [
      {
        id: 'rev_l1',
        authorRole: 'Product Lead',
        authorStatus: 'Current Employee',
        rating: 5.0,
        headline: 'Exceptional work-life balance & massive reach',
        pros: 'Supportive leadership, clear career ladders, incredible scale (1B+ users), generous perks and food.',
        cons: 'Matrixed decision making across global teams can slow down v1 launches.',
        date: 'Aug 2026',
        recommend: true
      }
    ],
    aiSummary: 'Join LinkedIn as an AI PM to lead consumer generative AI features, web & database grounding, and smart assistant experiences. Salary $190K–$240K with top-tier healthcare & campus perks.',
    description: 'Join LinkedIn as an AI Product Manager on the Core Feed & Assistant team! You will define product strategy, roadmap, and UI experiences for generative AI assistants, post summarization, and smart networking tools.',
    requirements: [
      '4+ years in product management leading consumer or B2B SaaS features.',
      'Hands-on experience delivering LLM-backed or ML-driven user experiences.',
      'Strong quantitative analysis, A/B experimentation skills, and executive communication.',
      'BS or MS in Computer Science, HCI, or equivalent technical field.'
    ],
    benefits: [
      'Top-tier compensation package and annual performance bonuses',
      'Comprehensive healthcare + wellness reimbursement',
      'On-site gourmet cafeterias, gym, and shuttle transportation'
    ],
    companyDescription: 'LinkedIn connects the world\'s professionals to make them more productive and successful.'
  },
  {
    id: 'job_3',
    title: 'Staff Frontend Architect',
    company: 'Stripe',
    companyLogo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=100',
    location: 'San Francisco, CA',
    workPolicy: 'Remote',
    salaryRange: '$210,000 - $260,000',
    salaryMinNumeric: 210000,
    salaryMaxNumeric: 260000,
    postedDaysAgo: 2,
    experienceLevel: 'Senior',
    employmentType: 'Full-time',
    applicantsCount: 9,
    timeAgo: '2 days ago',
    easyApply: false,
    isSaved: false,
    verifiedRecruiter: true,
    rating: 4.3,
    ratingsCount: '12,400',
    recommendPercent: 82,
    officesCount: '15 Offices',
    industry: 'Financial Infrastructure',
    awards: 'Forbes Cloud 100 Leader',
    websiteUrl: 'https://stripe.com',
    reviews: [
      {
        id: 'rev_s1',
        authorRole: 'Staff Software Engineer',
        authorStatus: 'Current Employee',
        rating: 4.5,
        headline: 'Highest engineering bar in Silicon Valley',
        pros: 'Clear written documentation culture, impressive technical rigor, high autonomy, great remote perks.',
        cons: 'Demanding work expectations when supporting global payment bursts.',
        date: 'Jun 2026',
        recommend: true
      }
    ],
    aiSummary: 'Stripe is hiring a Remote Staff Frontend Architect ($210K–$260K) to lead Dashboard & payment elements architecture. Demands 8+ years React/TypeScript mastery, design systems, and web accessibility.',
    description: 'Stripe builds financial infrastructure for the internet. As a Staff Frontend Architect, you will establish architectural standards across Stripe Dashboard, Payment Elements, and developer documentation apps.',
    requirements: [
      '8+ years of frontend experience leading large-scale React/TypeScript architectures.',
      'Expert knowledge of web accessibility (WCAG 2.1 AA), design systems, and micro-frontends.',
      'Proven leadership in technical RFCs and cross-team alignment.'
    ],
    benefits: [
      '401(k) matching up to 6%',
      'Uncapped wellness stipend and mental health support',
      'Flexible remote work setups worldwide'
    ],
    companyDescription: 'Stripe is a financial infrastructure platform for businesses.'
  },
  {
    id: 'job_4',
    title: 'Lead Product Designer',
    company: 'Figma',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=100',
    location: 'San Francisco, CA',
    workPolicy: 'Hybrid',
    salaryRange: '$175,000 - $215,000',
    salaryMinNumeric: 175000,
    salaryMaxNumeric: 215000,
    postedDaysAgo: 3,
    experienceLevel: 'Senior',
    employmentType: 'Full-time',
    applicantsCount: 25,
    timeAgo: '3 days ago',
    easyApply: true,
    isSaved: false,
    verifiedRecruiter: true,
    rating: 4.6,
    ratingsCount: '8,920',
    recommendPercent: 91,
    officesCount: '8 Offices',
    industry: 'Design Software',
    awards: 'Design Innovation Award 2025',
    websiteUrl: 'https://figma.com',
    reviews: [
      {
        id: 'rev_f1',
        authorRole: 'Product Designer',
        authorStatus: 'Current Employee',
        rating: 5.0,
        headline: 'Best product design culture in the industry',
        pros: 'Deep customer empathy, fantastic design system tooling, collaborative cross-functional atmosphere.',
        cons: 'High standard for every design critique, but very rewarding.',
        date: 'Jul 2026',
        recommend: true
      }
    ],
    aiSummary: 'Figma is hiring a Lead Product Designer ($175K–$215K) to craft real-time collaborative canvas tools. Offers hybrid work in San Francisco with top benefits and design autonomy.',
    description: 'Figma is seeking a Lead Product Designer to shape interactive collaborative canvas experiences, multiplayer tools, and real-time design prototyping tools.',
    requirements: [
      '6+ years of UX/UI product design experience.',
      'Mastery of Figma, complex interactive prototyping, and user research.',
      'Strong portfolio demonstrating systemic design thinking.'
    ],
    benefits: [
      'Unlimited PTO and wellness days',
      'Generous parental leave',
      'Equipped home workspace grant'
    ],
    companyDescription: 'Figma is the leading collaborative interface design platform.'
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_ai',
    participantId: 'user_linkedin_ai',
    participantName: 'LinkedIn AI',
    participantAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
    participantTitle: 'AI Search & Network Assistant',
    participantCompany: 'LinkedIn',
    onlineStatus: 'online',
    unreadCount: 1,
    lastMessage: 'Ask me anything! e.g., "What happened in the last 24h in tech?" or "What are the new features updated by Google?"',
    lastMessageTime: 'Just now',
    messages: [
      {
        id: 'm_ai_welcome',
        senderId: 'user_linkedin_ai',
        senderName: 'LinkedIn AI',
        senderAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=200',
        text: 'Hi Mritunjoy! I am your integrated LinkedIn AI assistant. 🚀\n\nI can search across the entire web, real-time tech news, and LinkedIn\'s network database to answer your queries.\n\nTry asking me:\n• "Update me what happened in the last 24 in tech."\n• "What are the new launches in AI in the last month?"\n• "What are the new features updated by Google in the last month?"',
        timestamp: '10:00 AM',
        isUser: false,
        isAi: true
      }
    ]
  },
  {
    id: 'conv_1',
    participantId: 'user_1',
    participantName: 'Priya Mehta',
    participantAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    participantTitle: 'Engineering Manager',
    participantCompany: 'Stripe',
    onlineStatus: 'online',
    unreadCount: 1,
    lastMessage: 'Thanks for checking out the database post! Let\'s connect on backend design next week.',
    lastMessageTime: '10:42 AM',
    messages: [
      {
        id: 'm1',
        senderId: 'user_1',
        senderName: 'Priya Mehta',
        senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
        text: 'Hi Mritunjoy! Saw your comment on my Stripe zero-downtime migration post.',
        timestamp: '10:30 AM',
        isUser: false
      },
      {
        id: 'm2',
        senderId: 'user_me',
        senderName: 'Mritunjoy Dey',
        senderAvatar: CURRENT_USER.avatar,
        text: 'Hey Priya! Really impressive writeup. We\'re working on similar database migration patterns at Figma right now.',
        timestamp: '10:35 AM',
        isUser: true
      },
      {
        id: 'm3',
        senderId: 'user_1',
        senderName: 'Priya Mehta',
        senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
        text: 'Thanks for checking out the database post! Let\'s connect on backend design next week.',
        timestamp: '10:42 AM',
        isUser: false
      }
    ]
  },
  {
    id: 'conv_2',
    participantId: 'user_5',
    participantName: 'Daniel Svensson',
    participantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    participantTitle: 'SRE',
    participantCompany: 'Cloudflare',
    onlineStatus: 'offline',
    unreadCount: 0,
    lastMessage: 'Hey Mritunjoy, saw your profile. Are you open to discussing SRE infra at Cloudflare?',
    lastMessageTime: 'Yesterday',
    messages: [
      {
        id: 'm2_1',
        senderId: 'user_5',
        senderName: 'Daniel Svensson',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
        text: 'Hey Mritunjoy, saw your profile. Are you open to discussing SRE infra at Cloudflare?',
        timestamp: 'Yesterday, 4:15 PM',
        isUser: false
      }
    ]
  },
  {
    id: 'conv_3',
    participantId: 'user_4',
    participantName: 'Keiko Tanaka',
    participantAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    participantTitle: 'Product Lead',
    participantCompany: 'Notion',
    onlineStatus: 'away',
    unreadCount: 0,
    lastMessage: 'Great insights on product specs. Let\'s schedule a 15-min chat next week.',
    lastMessageTime: 'Aug 10',
    messages: [
      {
        id: 'm3_1',
        senderId: 'user_4',
        senderName: 'Keiko Tanaka',
        senderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
        text: 'Great insights on product specs. Let\'s schedule a 15-min chat next week.',
        timestamp: 'Aug 10, 2:30 PM',
        isUser: false
      }
    ]
  },
  {
    id: 'conv_4',
    participantId: 'user_recruiter',
    participantName: 'Sarah Jenkins',
    participantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    participantTitle: 'Staff Recruiter',
    participantCompany: 'Google',
    onlineStatus: 'online',
    unreadCount: 0,
    lastMessage: 'Hi Mritunjoy, we have an open Staff Engineer role in Cloud AI that matches your background.',
    lastMessageTime: 'Aug 8',
    messages: [
      {
        id: 'm4_1',
        senderId: 'user_recruiter',
        senderName: 'Sarah Jenkins',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        text: 'Hi Mritunjoy, we have an open Staff Engineer role in Cloud AI that matches your background. Would you be open to a quick 10-minute intro call?',
        timestamp: 'Aug 8, 11:00 AM',
        isUser: false
      }
    ]
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'n1',
    title: 'AI Product Managers in high demand across tech',
    timeAgo: '1h ago',
    readersCount: 18420
  },
  {
    id: 'n2',
    title: 'Tech hiring rebounds in Q3',
    timeAgo: '3h ago',
    readersCount: 12150
  },
  {
    id: 'n3',
    title: 'Design Systems shift toward token automation',
    timeAgo: '5h ago',
    readersCount: 9480
  },
  {
    id: 'n4',
    title: 'Remote vs. Hybrid: Latest survey trends',
    timeAgo: '12h ago',
    readersCount: 32900
  },
  {
    id: 'n5',
    title: 'Zero-downtime database patterns explained',
    timeAgo: '1d ago',
    readersCount: 7800
  }
];
