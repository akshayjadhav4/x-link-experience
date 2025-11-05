import { createContext, useContext } from "react";
import type { Tweet } from "@/types/tweet";

export type SheetStage = "minimal" | "compact" | "full";

type TweetSheetContextValue = {
  tweet?: Tweet;
  stage: SheetStage;
  setStage?: (stage: SheetStage) => void;
};

export const TweetSheetContext = createContext<TweetSheetContextValue>({
  stage: "minimal",
});

export const useTweetSheetContext = () => {
  const context = useContext(TweetSheetContext);
  return context;
};

