export interface Post {
  id: string;
  username: string;
  avatar?: string;
  content: string;
  emoji?: string;
  timestamp: string;
  praises: Praise[];
  praiseCount: number;
  comments: Comment[];
  commentCount: number;
}

export interface Praise {
  id: string;
  username: string;
  type: 'stamp' | 'comment';
  content: string;
  timestamp: string;
}

export interface Comment {
  id: string;
  username: string;
  content: string;
  timestamp: string;
}

export interface User {
  id: string;
  username: string;
  level: number;
  totalPraises: number;
  badges: Badge[];
  avatar?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface Notification {
  id: string;
  type: 'praise' | 'level_up' | 'badge' | 'comment';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export const PRAISE_STAMPS = [
  { id: 'great', emoji: '👏', text: 'すごいね！' },
  { id: 'awesome', emoji: '✨', text: 'えらい！' },
  { id: 'respect', emoji: '🙌', text: 'コツコツ尊敬！' },
  { id: 'excellent', emoji: '💯', text: '素晴らしい！' },
  { id: 'keep_going', emoji: '💪', text: 'がんばって！' },
  { id: 'wonderful', emoji: '🌟', text: 'すてき！' },
];