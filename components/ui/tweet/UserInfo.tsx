import { View, Text, type ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type TweetUserInfoProps = ViewProps & {
  name: string;
  username: string;
  verified?: boolean;
  timestamp?: string;
};

export const UserInfo = ({ 
  name, 
  username, 
  verified = false,
  timestamp,
  className,
  ...props 
}: TweetUserInfoProps) => {
  return (
    <View className={`flex-1 ${className || ''}`} {...props}>
      <View className="flex-row items-center gap-1">
        <Text 
          className="text-gray-900 dark:text-gray-100 font-bold text-[15px]"
          numberOfLines={1}
        >
          {name}
        </Text>
        {verified && (
          <Ionicons 
            name="checkmark-circle" 
            size={16} 
            color="#1d9bf0"
          />
        )}
        {timestamp && (
          <Text className="text-gray-600 dark:text-gray-400 text-[15px]">
            · {timestamp}
          </Text>
        )}
      </View>
      <Text className="text-gray-600 dark:text-gray-400 text-[15px]">
        @{username}
      </Text>
    </View>
  );
};

