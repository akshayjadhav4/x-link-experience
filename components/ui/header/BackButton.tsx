import { Ionicons } from "@expo/vector-icons";
import { Pressable, type PressableProps, useColorScheme } from "react-native";

export type HeaderBackButtonProps = PressableProps & {
  iconName?: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
};

export const BackButton = ({
  iconName = "arrow-back",
  iconSize = 24,
  iconColor,
  className,
  ...props
}: HeaderBackButtonProps) => {
  const colorScheme = useColorScheme();
  const defaultIconColor =
    iconColor || (colorScheme === "dark" ? "#ffffff" : "#000000");

  return (
    <Pressable className={`p-2 ${className || ""}`} {...props}>
      <Ionicons name={iconName} size={iconSize} color={defaultIconColor} />
    </Pressable>
  );
};
