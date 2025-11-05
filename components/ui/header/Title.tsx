import { Text, type TextProps } from "react-native";

export type HeaderTitleProps = TextProps;

export const Title = ({ children, className, ...props }: HeaderTitleProps) => {
  return (
    <Text
      className={`text-gray-900 dark:text-white text-xl font-bold flex-1 text-center ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </Text>
  );
};
