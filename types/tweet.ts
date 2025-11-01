export interface TweetUser {
  name: string;
  username: string;
  verified: boolean;
  avatar: string;
}

export interface TweetMetadata {
  time: string;
  date: string;
  views: string;
}

export interface TweetEngagement {
  replies: number;
  retweets: number;
  likes: number;
  bookmarks: number;
}

export interface Tweet {
  id: string;
  user: TweetUser;
  content: string;
  timestamp: string;
  metadata?: TweetMetadata;
  engagement: TweetEngagement;
}

