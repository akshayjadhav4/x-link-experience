import { TouchableOpacity, Text, View, type TouchableOpacityProps, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type TweetActionButtonProps = Omit<TouchableOpacityProps, 'children'> & {
  icon: 'reply' | 'retweet' | 'heart' | 'bookmark' | 'share';
  count?: number;
  active?: boolean;
};

const iconMap = {
  reply: 'chatbubble-outline',
  retweet: 'repeat',
  heart: 'heart-outline',
  bookmark: 'bookmark-outline',
  share: 'share-outline',
} as const;

export const ActionButton = ({ 
  icon, 
  count,
  active = false,
  className,
  ...props 
}: TweetActionButtonProps) => {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === 'dark' ? '#71767b' : '#536471';
  
  return (
    <TouchableOpacity 
      className={`flex-row items-center gap-2 ${className || ''}`}
      activeOpacity={0.7}
      {...props}
    >
      <View className="w-9 h-9 items-center justify-center rounded-full">
        <Ionicons 
          name={iconMap[icon] as any}
          size={18} 
          color={iconColor}
        />
      </View>
      {count !== undefined && count > 0 && (
        <Text className="text-gray-600 dark:text-gray-400 text-[13px]">
          {count}
        </Text>
      )}
    </TouchableOpacity>
  );
};

