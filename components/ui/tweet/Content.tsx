import { type TextProps } from "react-native";
import { LinkifiedText } from "./LinkifiedText";

export type TweetContentProps = Omit<TextProps, "children"> & {
  children: string;
};

export const Content = ({
  children,
  className,
  ...props
}: TweetContentProps) => {
  return (
    <LinkifiedText className={className} {...props}>
      {children}
    </LinkifiedText>
  );
};
