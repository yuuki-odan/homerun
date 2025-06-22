import { Post, User, Notification, Badge } from '@/types';

export const mockUser: User = {
  id: '1',
  username: 'がんばりさん',
  level: 5,
  totalPraises: 127,
  badges: [
    {
      id: '1',
      name: 'コツコツマスター',
      description: '7日連続で投稿しました',
      icon: '🏆',
      unlockedAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      name: '褒め上手',
      description: '50回他の人を褒めました',
      icon: '💝',
      unlockedAt: '2024-01-20T15:30:00Z',
    },
  ],
};

export const mockPosts: Post[] = [
  {
    id: '1',
    username: 'みかん太郎',
    content: '今日は早起きして朝の散歩をしました！空気が美味しくて気持ちよかったです 🌅',
    emoji: '🚶‍♂️',
    timestamp: '2024-01-25T07:30:00Z',
    praises: [
      {
        id: '1',
        username: 'さくらちゃん',
        type: 'stamp',
        content: 'すごいね！',
        timestamp: '2024-01-25T08:00:00Z',
      },
      {
        id: '2',
        username: 'がんばりさん',
        type: 'comment',
        content: '朝の散歩素敵ですね！私も見習いたいです',
        timestamp: '2024-01-25T09:15:00Z',
      },
    ],
    praiseCount: 12,
    comments: [
      {
        id: '1',
        username: 'ひまわり',
        content: '朝の散歩いいですね！私も始めてみようかな',
        timestamp: '2024-01-25T08:30:00Z',
      },
      {
        id: '2',
        username: 'ぽんこ',
        content: '早起きは三文の徳って言いますもんね✨',
        timestamp: '2024-01-25T09:00:00Z',
      },
    ],
    commentCount: 2,
  },
  {
    id: '2',
    username: 'ぽんこ',
    content: '資格試験の勉強を2時間やりました！難しいけど少しずつ進歩している気がします',
    emoji: '📚',
    timestamp: '2024-01-25T14:45:00Z',
    praises: [
      {
        id: '3',
        username: 'みかん太郎',
        type: 'stamp',
        content: 'えらい！',
        timestamp: '2024-01-25T15:00:00Z',
      },
    ],
    praiseCount: 8,
    comments: [
      {
        id: '3',
        username: 'がんばりさん',
        content: '2時間も集中できるなんてすごいです！',
        timestamp: '2024-01-25T15:30:00Z',
      },
    ],
    commentCount: 1,
  },
  {
    id: '3',
    username: 'ひまわり',
    content: '今日は家族のために手料理を作りました。みんな美味しいって言ってくれて嬉しかった ✨',
    emoji: '🍳',
    timestamp: '2024-01-25T19:20:00Z',
    praises: [],
    praiseCount: 15,
    comments: [],
    commentCount: 0,
  },
  {
    id: '4',
    username: '空の青',
    content: 'ジムに行くのをサボりたかったけど、頑張って行きました！体を動かすとスッキリしますね',
    emoji: '💪',
    timestamp: '2024-01-25T21:10:00Z',
    praises: [
      {
        id: '4',
        username: 'がんばりさん',
        type: 'stamp',
        content: 'コツコツ尊敬！',
        timestamp: '2024-01-25T21:30:00Z',
      },
    ],
    praiseCount: 6,
    comments: [
      {
        id: '4',
        username: 'みかん太郎',
        content: 'サボりたい気持ちに打ち勝つのって本当にすごいです！',
        timestamp: '2024-01-25T21:45:00Z',
      },
    ],
    commentCount: 1,
  },
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'comment',
    title: 'コメントがつきました！',
    message: 'みかん太郎さんがあなたの投稿にコメントしました',
    timestamp: '2024-01-25T21:45:00Z',
    read: false,
  },
  {
    id: '2',
    type: 'praise',
    title: '褒められました！',
    message: 'みかん太郎さんがあなたの投稿を「すごいね！」で褒めました',
    timestamp: '2024-01-25T15:00:00Z',
    read: false,
  },
  {
    id: '3',
    type: 'level_up',
    title: 'レベルアップ！',
    message: 'レベル5になりました！新しいバッジを獲得できるかも？',
    timestamp: '2024-01-25T10:30:00Z',
    read: false,
  },
  {
    id: '4',
    type: 'badge',
    title: '新しいバッジ獲得！',
    message: '「褒め上手」バッジを獲得しました！🎉',
    timestamp: '2024-01-24T20:15:00Z',
    read: true,
  },
  {
    id: '5',
    type: 'praise',
    title: '褒められました！',
    message: 'ひまわりさんがあなたにコメントしました',
    timestamp: '2024-01-24T18:45:00Z',
    read: true,
  },
];