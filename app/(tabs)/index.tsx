import * as Tweet from "@/components/ui/tweet";
import tweetsData from "@/data/tweets.json";
import type { Tweet as TweetType } from "@/types/tweet";
import { ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const tweets = tweetsData as TweetType[];

  return (
    <ScrollView
      className="flex-1 bg-white dark:bg-black"
      style={{ paddingTop: insets.top }}
    >
      {tweets.map((tweet) => (
        <Tweet.Root key={tweet.id} tweetId={tweet.id}>
          <Tweet.Header>
            <Tweet.Avatar source={{ uri: tweet.user.avatar }} />
            <Tweet.UserInfo
              name={tweet.user.name}
              username={tweet.user.username}
              verified={tweet.user.verified}
              timestamp={tweet.timestamp}
            />
          </Tweet.Header>

          <Tweet.Content>{tweet.content}</Tweet.Content>

          {tweet.metadata && (
            <Tweet.Metadata
              time={tweet.metadata.time}
              date={tweet.metadata.date}
              views={tweet.metadata.views}
            />
          )}

          <Tweet.Actions>
            <Tweet.ActionButton icon="reply" count={tweet.engagement.replies} />
            <Tweet.ActionButton
              icon="retweet"
              count={tweet.engagement.retweets}
            />
            <Tweet.ActionButton icon="heart" count={tweet.engagement.likes} />
            <Tweet.ActionButton
              icon="bookmark"
              count={tweet.engagement.bookmarks}
            />
            <Tweet.ActionButton icon="share" />
          </Tweet.Actions>
        </Tweet.Root>
      ))}
    </ScrollView>
  );
}
