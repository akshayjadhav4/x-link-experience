import { View, type ViewProps } from "react-native";
import { useTweetSheetContext } from "./context";
import { ActionButton } from "../tweet/ActionButton";

export type TweetSheetMinimalViewProps = ViewProps;

/**
 * MinimalView - 10% stage
 * Shows only action buttons in a compact horizontal layout
 */
export const MinimalView = ({
  className,
  ...props
}: TweetSheetMinimalViewProps) => {
  const { tweet } = useTweetSheetContext();

  if (!tweet) return null;

  return (
    <View
      className={`flex-row justify-between items-center px-4 py-3 ${
        className || ""
      }`}
      {...props}
    >
      <ActionButton
        icon="reply"
        count={tweet.engagement.replies}
        onPress={() => console.log("Reply")}
      />
      <ActionButton
        icon="retweet"
        count={tweet.engagement.retweets}
        onPress={() => console.log("Retweet")}
      />
      <ActionButton
        icon="heart"
        count={tweet.engagement.likes}
        onPress={() => console.log("Like")}
      />
      <ActionButton
        icon="bookmark"
        count={tweet.engagement.bookmarks}
        onPress={() => console.log("Bookmark")}
      />
      <ActionButton
        icon="share"
        onPress={() => console.log("Share")}
      />
    </View>
  );
};

