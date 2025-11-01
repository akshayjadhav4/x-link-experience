import { View, type ViewProps } from 'react-native';

export type TweetActionsProps = ViewProps;

export const Actions = ({ children, className, ...props }: TweetActionsProps) => {
  return (
    <View 
      className={`flex-row justify-between items-center mt-3 -ml-2 ${className || ''}`}
      {...props}
    >
      {children}
    </View>
  );
};

