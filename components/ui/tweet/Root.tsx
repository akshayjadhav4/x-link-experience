import { View, type ViewProps } from "react-native";
import { TweetContext } from "./context";

export type TweetRootProps = ViewProps;

export const Root = ({ children, className, ...props }: TweetRootProps) => {
  return (
    <TweetContext.Provider value={{}}>
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
