import { Text, type TextProps } from 'react-native';

export type TweetContentProps = TextProps;

export const Content = ({ children, className, ...props }: TweetContentProps) => {
  return (
    <Text 
      className={`text-gray-900 dark:text-gray-100 text-[15px] leading-5 mt-2 ${className || ''}`}
      {...props}
    >
      {children}
    </Text>
  );
};

