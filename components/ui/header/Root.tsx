import { View, type ViewProps } from "react-native";

export type HeaderRootProps = ViewProps;

export const Root = ({ children, className, ...props }: HeaderRootProps) => {
  return (
    <View
      className={`flex-row items-center justify-between bg-white dark:bg-black px-4 py-3 ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </View>
  );
};
