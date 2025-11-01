import { View, Text, type ViewProps } from 'react-native';

export type TweetMetadataProps = ViewProps & {
  time?: string;
  date?: string;
  views?: string;
};

export const Metadata = ({ 
  time, 
  date, 
  views,
  className,
  ...props 
}: TweetMetadataProps) => {
  return (
    <View 
      className={`flex-row items-center gap-1 mt-3 border-b border-gray-200 dark:border-gray-800 pb-3 ${className || ''}`}
      {...props}
    >
      {time && (
        <Text className="text-gray-600 dark:text-gray-400 text-[15px]">
          {time}
        </Text>
      )}
      {time && date && (
        <Text className="text-gray-600 dark:text-gray-400 text-[15px]">·</Text>
      )}
      {date && (
        <Text className="text-gray-600 dark:text-gray-400 text-[15px]">
          {date}
        </Text>
      )}
      {views && (
        <>
          <Text className="text-gray-600 dark:text-gray-400 text-[15px]">·</Text>
          <Text className="text-gray-900 dark:text-gray-100 font-bold text-[15px]">
            {views}
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 text-[15px]">Views</Text>
        </>
      )}
    </View>
  );
};

