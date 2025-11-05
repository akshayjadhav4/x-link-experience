import { Ionicons } from "@expo/vector-icons";
import { GlassView } from "expo-glass-effect";
import { useRouter } from "expo-router";
import {
  PlatformColor,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

interface WebViewControlProps {
  currentUrl: string;
  animatedPosition: SharedValue<number>;
  screenHeight: number;
}

export function WebViewControl({
  currentUrl,
  animatedPosition,
  screenHeight,
}: WebViewControlProps) {
  const router = useRouter();
  const animatedTextStyle = useAnimatedStyle(() => {
    const paddingVertical = interpolate(
      animatedPosition.value,
      [screenHeight * 0.9, screenHeight * 0.7],
      [8, 16],
      "clamp"
    );
    return { paddingVertical };
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    // Fade out when going from 30% snap upward to max snap
    const opacity = interpolate(
      animatedPosition.value,
      [screenHeight * 0.6, screenHeight * 0.7],
      [0, 1],
      "clamp"
    );
    return { opacity };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedPosition.value,
      [screenHeight * 0.9, screenHeight * 0.7],
      [0, 1],
      "clamp"
    );
    return { opacity };
  });

  const handleClose = () => {
    router.back();
  };

  const handleRefresh = () => {
    console.log("Refresh button pressed");
  };

  const handleMore = () => {
    console.log("More button pressed");
  };

  return (
    <Animated.View style={[styles.controlContainer, animatedContainerStyle]}>
      <View style={styles.controlRow}>
        {/* Close Button */}
        <Animated.View style={[styles.closeButtonPosition, animatedIconStyle]}>
          <GlassView glassEffectStyle="regular" style={styles.glassButton}>
            <TouchableOpacity
              style={styles.buttonTouchable}
              onPress={handleClose}
              activeOpacity={0.6}
            >
              <Ionicons
                name="close"
                size={36}
                color={PlatformColor("labelColor")}
              />
            </TouchableOpacity>
          </GlassView>
        </Animated.View>
        {/* Address Bar */}
        <GlassView glassEffectStyle="regular" style={styles.glassAddressBar}>
          <Animated.View style={[styles.addressBarPadding, animatedTextStyle]}>
            <Text
              style={[
                styles.addressBarText,
                { color: PlatformColor("labelColor") },
              ]}
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              {currentUrl}
            </Text>
          </Animated.View>
        </GlassView>
        <Animated.View
          style={[styles.rightButtonsContainer, animatedIconStyle]}
        >
          {/* Refresh Button */}
          <GlassView glassEffectStyle="regular" style={styles.glassButton}>
            <TouchableOpacity
              style={styles.buttonTouchable}
              onPress={handleRefresh}
              activeOpacity={0.6}
            >
              <Ionicons
                name="refresh"
                size={30}
                color={PlatformColor("labelColor")}
              />
            </TouchableOpacity>
          </GlassView>

          {/* More Button */}
          <GlassView glassEffectStyle="regular" style={styles.glassButton}>
            <TouchableOpacity
              style={styles.buttonTouchable}
              onPress={handleMore}
              activeOpacity={0.6}
            >
              <Ionicons
                name="ellipsis-horizontal"
                size={26}
                color={PlatformColor("labelColor")}
              />
            </TouchableOpacity>
          </GlassView>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  controlContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
  },
  controlRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonPosition: {
    position: "absolute",
    left: 10,
  },
  addressBarPadding: {
    paddingHorizontal: 20,
  },
  rightButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    gap: 10,
    right: 10,
  },
  glassButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  buttonTouchable: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  glassAddressBar: {
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  addressBarText: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
});
