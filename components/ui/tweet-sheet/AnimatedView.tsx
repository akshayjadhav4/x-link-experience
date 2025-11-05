import { View } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { CompactView } from "./CompactView";
import { FullView } from "./FullView";
import { MinimalView } from "./MinimalView";
import { useTweetSheetContext } from "./context";

type AnimatedViewProps = {
  animatedPosition: SharedValue<number>;
  snapPoints: {
    minimal: number;
    compact: number;
    full: number;
  };
  maxContentLines?: number;
};

export function AnimatedView({
  animatedPosition,
  snapPoints,
  maxContentLines = 3,
}: AnimatedViewProps) {
  const { tweet } = useTweetSheetContext();

  // Animate opacity for minimal view (visible when at minimal position)
  // Note: Y position is HIGH when sheet is at bottom (minimal)
  const minimalStyle = useAnimatedStyle(() => {
    const transitionPoint =
      snapPoints.compact + (snapPoints.minimal - snapPoints.compact) * 0.5;

    const opacity = interpolate(
      animatedPosition.value,
      [snapPoints.compact, transitionPoint, snapPoints.minimal],
      [0, 1, 1],
      "clamp"
    );

    return {
      opacity,
      zIndex: opacity > 0.01 ? 3 : -1,
    };
  });

  // Animate opacity for compact view (visible between minimal and compact)
  const compactStyle = useAnimatedStyle(() => {
    // Calculate transition points - fade in from minimal, fade out to full
    const fadeInEnd =
      snapPoints.compact + (snapPoints.minimal - snapPoints.compact) * 0.5;
    const fadeOutStart =
      snapPoints.compact - (snapPoints.compact - snapPoints.full) * 0.4;

    const opacity = interpolate(
      animatedPosition.value,
      [
        snapPoints.full,
        fadeOutStart,
        snapPoints.compact,
        fadeInEnd,
        snapPoints.minimal,
      ],
      [0, 0, 1, 1, 0],
      "clamp"
    );

    return {
      opacity,
      zIndex: opacity > 0.01 ? 3 : -1,
    };
  });

  // Animate opacity for full view (visible when approaching full position)
  // Note: Y position is LOW when sheet is at top (full)
  const fullStyle = useAnimatedStyle(() => {
    const fadeInEnd =
      snapPoints.compact - (snapPoints.compact - snapPoints.full) * 0.4;

    const opacity = interpolate(
      animatedPosition.value,
      [snapPoints.full, fadeInEnd, snapPoints.compact],
      [1, 1, 0],
      "clamp"
    );

    return {
      opacity,
      zIndex: opacity > 0.01 ? 3 : -1,
    };
  });

  if (!tweet) return null;

  return (
    <View style={{ flex: 1 }}>
      {/* Minimal View */}
      <Animated.View
        style={[
          {
            position: "absolute",
            width: "100%",
            left: 0,
            top: 0,
          },
          minimalStyle,
        ]}
      >
        <MinimalView />
      </Animated.View>

      {/* Compact View */}
      <Animated.View
        style={[
          {
            position: "absolute",
            width: "100%",
            left: 0,
            top: 0,
          },
          compactStyle,
        ]}
      >
        <CompactView maxContentLines={maxContentLines} />
      </Animated.View>

      {/* Full View */}
      <Animated.View
        style={[
          {
            flex: 1,
            width: "100%",
          },
          fullStyle,
        ]}
      >
        <FullView />
      </Animated.View>
    </View>
  );
}
