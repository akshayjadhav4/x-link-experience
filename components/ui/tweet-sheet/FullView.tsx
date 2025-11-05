import { View, type ViewProps } from "react-native";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useTweetSheetContext } from "./context";
import { Avatar } from "../tweet/Avatar";
import { UserInfo } from "../tweet/UserInfo";
import { Content } from "../tweet/Content";
import { Metadata } from "../tweet/Metadata";
import { ActionButton } from "../tweet/ActionButton";

export type TweetSheetFullViewProps = ViewProps;

/**
 * FullView - Max% stage
 * Shows complete tweet with all details including metadata
 */
export const FullView = ({ className, ...props }: TweetSheetFullViewProps) => {
  const { tweet } = useTweetSheetContext();

  if (!tweet) return null;

  return (
    <BottomSheetScrollView
      className={`flex-1 ${className || ""}`}
      showsVerticalScrollIndicator={false}
      {...props}
    >
      <View className="px-4 py-4">
        {/* Header with Avatar and User Info */}
        <View className="flex-row gap-3 mb-4">
          <Avatar source={{ uri: tweet.user.avatar }} size="lg" />
          <UserInfo
            name={tweet.user.name}
            username={tweet.user.username}
            verified={tweet.user.verified}
          />
        </View>

        {/* Full Tweet Content */}
        <Content className="text-gray-900 dark:text-gray-100 text-[17px] leading-6 mb-4">
          {tweet.content}
        </Content>

        {/* Metadata (Time, Date, Views) */}
        {tweet.metadata && (
          <Metadata
            time={tweet.metadata.time}
            date={tweet.metadata.date}
            views={tweet.metadata.views}
          />
        )}

        {/* Action Buttons */}
        <View className="flex-row justify-between items-center mt-3 -ml-2 border-b border-gray-200 dark:border-gray-800 pb-3">
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
    </BottomSheetScrollView>
  );
};

