import { View, type ViewProps } from "react-native";
import { TweetContext } from "./context";

export type TweetRootProps = ViewProps & {
  tweetId?: string;
};

export const Root = ({
  children,
  className,
  tweetId,
  ...props
}: TweetRootProps) => {
  return (
    <TweetContext.Provider value={{ tweetId }}>
      <View
        className={`bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 px-4 py-3 ${
          className || ""
        }`}
        {...props}
      >
        {children}
      </View>
    </TweetContext.Provider>
  );
};
