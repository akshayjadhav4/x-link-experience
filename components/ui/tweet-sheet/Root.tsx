import { View, type ViewProps } from "react-native";
import { TweetSheetContext, type SheetStage } from "./context";
import type { Tweet } from "@/types/tweet";

export type TweetSheetRootProps = ViewProps & {
  tweet: Tweet;
  stage: SheetStage;
  setStage?: (stage: SheetStage) => void;
};

export const Root = ({
  children,
  tweet,
  stage,
  setStage,
  className,
  ...props
}: TweetSheetRootProps) => {
  return (
    <TweetSheetContext.Provider value={{ tweet, stage, setStage }}>
      <View
        className={`bg-white dark:bg-black ${className || ""}`}
        {...props}
      >
        {children}
      </View>
    </TweetSheetContext.Provider>
  );
};

