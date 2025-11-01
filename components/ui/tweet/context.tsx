import { createContext, useContext } from 'react';

type TweetContextValue = {
  // Add any shared state here if needed in the future
  // For now, this serves as a placeholder for composition pattern
};

export const TweetContext = createContext<TweetContextValue>({});

export const useTweetContext = () => {
  const context = useContext(TweetContext);
  return context;
};

