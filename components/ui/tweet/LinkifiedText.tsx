import { Alert, Linking, Text, type TextProps } from "react-native";

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

  const handleLinkPress = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", `Cannot open URL: ${url}`);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open link");
    }
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
