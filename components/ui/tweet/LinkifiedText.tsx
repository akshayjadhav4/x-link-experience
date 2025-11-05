import { useRouter } from "expo-router";
import { Text, type TextProps } from "react-native";
import { useTweetContext } from "./context";

export type LinkifiedTextProps = TextProps & {
  children: string;
};

// Regex to match URLs
const URL_REGEX = /(https?:\/\/[^\s]+)/g;

export const LinkifiedText = ({
  children,
  className,
  ...props
}: LinkifiedTextProps) => {
  const text = children || "";
  const router = useRouter();
  const { tweetId } = useTweetContext();

  const handleLinkPress = async (url: string) => {
    router.push(`/preview?url=${encodeURIComponent(url)}&id=${tweetId || ""}`);
  };

  // Split text by URLs and create array of text and link components
  const parts = text.split(URL_REGEX);

  return (
    <Text
      className={`text-gray-900 dark:text-gray-100 text-[15px] leading-5 mt-2 ${
        className || ""
      }`}
      {...props}
    >
      {parts.map((part, index) => {
        // Check if this part is a URL
        if (part.match(URL_REGEX)) {
          return (
            <Text
              key={index}
              className="text-blue-500"
              onPress={() => handleLinkPress(part)}
            >
              {part}
            </Text>
          );
        }
        // Regular text
        return <Text key={index}>{part}</Text>;
      })}
    </Text>
  );
};
