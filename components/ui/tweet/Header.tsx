import { View, type ViewProps } from 'react-native';

export type TweetHeaderProps = ViewProps;

export const Header = ({ children, className, ...props }: TweetHeaderProps) => {
  return (
    <View 
      className={`flex-row gap-3 ${className || ''}`}
      {...props}
    >
      {children}
    </View>
  );
};

