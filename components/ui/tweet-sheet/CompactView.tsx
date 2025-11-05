import { View, Text, type ViewProps } from "react-native";
import { useTweetSheetContext } from "./context";
import { Avatar } from "../tweet/Avatar";
import { UserInfo } from "../tweet/UserInfo";
import { ActionButton } from "../tweet/ActionButton";

export type TweetSheetCompactViewProps = ViewProps & {
  maxContentLines?: number;
};

/**
 * CompactView - 30% stage
 * Shows profile data, truncated tweet content, and action buttons
 */
export const CompactView = ({
  maxContentLines = 2,
  className,
  ...props
}: TweetSheetCompactViewProps) => {
  const { tweet } = useTweetSheetContext();

  if (!tweet) return null;

  return (
    <View className={`px-4 py-4 ${className || ""}`} {...props}>
      {/* Header with Avatar and User Info */}
      <View className="flex-row gap-3 mb-3">
        <Avatar source={{ uri: tweet.user.avatar }} size="md" />
        <UserInfo
          name={tweet.user.name}
          username={tweet.user.username}
          verified={tweet.user.verified}
          timestamp={tweet.timestamp}
        />
      </View>

      {/* Tweet Content - Truncated */}
      <Text
        className="text-gray-900 dark:text-gray-100 text-[15px] leading-5 mb-3"
        numberOfLines={maxContentLines}
      >
        {tweet.content}
      </Text>

      {/* Action Buttons */}
      <View className="flex-row justify-between items-center -ml-2">
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
    </View>
  );
};

