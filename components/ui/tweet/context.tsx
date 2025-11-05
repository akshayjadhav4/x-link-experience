import { createContext, useContext } from "react";

type TweetContextValue = {
  tweetId?: string;
};

export const TweetContext = createContext<TweetContextValue>({});

export const useTweetContext = () => {
  const context = useContext(TweetContext);
  return context;
};
