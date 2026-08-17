export type NavTab = 'home' | 'network' | 'jobs' | 'messaging' | 'notifications';

export interface UserProfile {
  id: string;
  name: string;
  title: string;
  avatar: string;
  banner: string;
  company: string;
  location: string;
  connectionsCount: number;
  profileViewers: number;
  postImpressions: number;
}

export interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userTitle: string;
  isUserStory?: boolean;
  mediaUrl?: string;
  textContent?: string;
  bgGradient?: string;
  timeAgo: string;
  isSeen: boolean;
}

export interface PostComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorTitle: string;
  text: string;
  timestamp: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface Post {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorTitle: string;
  authorCompany: string;
  timeAgo: string;
  content: string;
  imageUrl?: string;
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  isLiked: boolean;
  isSaved?: boolean;
  isReposted?: boolean;
  comments: PostComment[];
}

export interface ConnectionCandidate {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  mutualConnections: number;
  status: 'none' | 'pending' | 'connected';
}

export interface CompanyReview {
  id: string;
  authorRole: string;
  authorStatus: 'Current Employee' | 'Former Employee';
  rating: number;
  headline: string;
  pros: string;
  cons: string;
  date: string;
  recommend: boolean;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  workPolicy: 'Hybrid' | 'Remote' | 'On-site';
  salaryRange: string;
  salaryMinNumeric?: number;
  salaryMaxNumeric?: number;
  applicantsCount: number;
  timeAgo: string;
  postedDaysAgo?: number;
  experienceLevel?: 'Entry' | 'Mid-Senior' | 'Senior' | 'Director';
  employmentType?: 'Full-time' | 'Part-time' | 'Contract';
  easyApply: boolean;
  isSaved: boolean;
  verifiedRecruiter?: boolean;
  rating?: number;
  ratingsCount?: string;
  recommendPercent?: number;
  officesCount?: string;
  industry?: string;
  awards?: string;
  websiteUrl?: string;
  reviews?: CompanyReview[];
  aiSummary?: string;
  description: string;
  requirements: string[];
  benefits: string[];
  companyDescription: string;
}

export interface CategoryStorySlide {
  id: string;
  companyName: string;
  companyLogo: string;
  isSponsored?: boolean;
  timeAgo: string;
  headline: string;
  body: string;
  mediaUrl?: string;
  aiInsight?: string;
  likesCount: number;
  commentsCount: number;
}

export interface CategoryStory {
  id: string;
  categoryName: string;
  icon?: string;
  isUnseen?: boolean;
  isSponsored?: boolean;
  badgeText?: string;
  slides: CategoryStorySlide[];
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isUser: boolean;
  isAi?: boolean;
  sources?: string[];
  searchQueryRef?: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantTitle: string;
  participantCompany: string;
  onlineStatus: 'online' | 'offline' | 'away';
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  messages: Message[];
}

export interface NewsItem {
  id: string;
  title: string;
  timeAgo: string;
  readersCount: number;
}
