import { useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";

import * as Header from "@/components/ui/header";
import * as TweetSheet from "@/components/ui/tweet-sheet";
import { WebViewControl } from "@/components/ui/WebViewControl";
import { Colors } from "@/constants/theme";
import tweetsData from "@/data/tweets.json";
import { useColorScheme } from "@/hooks/useColorScheme";
import type { Tweet } from "@/types/tweet";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const HEADER_HEIGHT = 64.66;

export default function PreviewScreen() {
  const { url, id: tweetId } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const { height: screenHeight } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const animatedPosition = useSharedValue(0);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const targetSnapIndex = useRef<number | null>(null);
  const lastScrollY = useRef<number>(0);
  const scrollYWhenSnappedToZero = useRef<number | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>(url as string);

  const tweet = useMemo(
    () => tweetsData.find((tweet) => tweet.id === tweetId) as Tweet,
    [tweetId]
  );

  const snapPoints = useMemo(() => {
    // max bottom sheet height: screen - safe area top - header
    const maxBottomSheetHeight = screenHeight - insets.top - HEADER_HEIGHT;
    const maxSnapPercentage = (maxBottomSheetHeight / screenHeight) * 100;

    return ["10%", "30%", `${maxSnapPercentage}%`];
  }, [screenHeight, insets.top]);

  // Calculate snap point positions in pixels for smooth animation
  const snapPointsPixels = useMemo(() => {
    const minimalHeight = screenHeight * 0.1;
    const compactHeight = screenHeight * 0.3;
    const maxBottomSheetHeight = screenHeight - insets.top - HEADER_HEIGHT;

    return {
      minimal: screenHeight - minimalHeight,
      compact: screenHeight - compactHeight,
      full: screenHeight - maxBottomSheetHeight,
    };
  }, [screenHeight, insets.top]);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const lastSnapPoint = useDerivedValue(() => insets.top + HEADER_HEIGHT);
  const secondSnapPoint = useDerivedValue(() => screenHeight * 0.7);

  const animatedBorderRadiusStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      animatedPosition.value,
      [lastSnapPoint.value, lastSnapPoint.value + 40, secondSnapPoint.value],
      [0, 24, 24],
      "clamp"
    );

    return {
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
    };
  });

  const animatedOpacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedPosition.value,
      [lastSnapPoint.value, lastSnapPoint.value + 40, secondSnapPoint.value],
      [0, 1, 1],
      "clamp"
    );

    return {
      opacity,
    };
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const height = interpolate(
      animatedPosition.value,
      [lastSnapPoint.value, lastSnapPoint.value + 40, secondSnapPoint.value],
      [HEADER_HEIGHT, 0, 0],
      "clamp"
    );

    return {
      height,
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        className="flex-1 bg-white dark:bg-black"
        style={{ paddingTop: insets.top }}
      >
        <Animated.View style={animatedHeaderStyle}>
          <Header.Root>
            <Header.BackButton />
            <Header.Title>Post</Header.Title>
            <Header.ActionButton />
          </Header.Root>
        </Animated.View>

        <WebView
          source={{ uri: url as string }}
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          allowsBackForwardNavigationGestures={true}
          onNavigationStateChange={(navState) => {
            try {
              const domain = new URL(navState.url).hostname;
              setCurrentUrl(domain);
            } catch {
              // Handle invalid URL
              setCurrentUrl(navState.url);
            }
          }}
          onScroll={({ nativeEvent }) => {
            const scrollY = nativeEvent.contentOffset.y;
            const isScrollingDown = scrollY > lastScrollY.current;
            const isScrollingUp = scrollY < lastScrollY.current;

            let targetIndex: number | null = null;

            // If scrolling down and past threshold, snap to 0 (minimal - 10%)
            if (isScrollingDown && scrollY >= 100) {
              targetIndex = 0;
              scrollYWhenSnappedToZero.current = scrollY;
            }
            // If scrolling up and scrolled up 100 pixels from when snapped to 0 then snap to 1 (compact - 30%)
            else if (
              isScrollingUp &&
              scrollYWhenSnappedToZero.current !== null &&
              scrollY <= scrollYWhenSnappedToZero.current - 100
            ) {
              targetIndex = 1;
              scrollYWhenSnappedToZero.current = null;
            }
            // If already below threshold, snap to 1 (compact - 30%)
            else if (scrollY < 100) {
              targetIndex = 1;
              scrollYWhenSnappedToZero.current = null;
            }

            if (
              targetIndex !== null &&
              targetSnapIndex.current !== targetIndex
            ) {
              targetSnapIndex.current = targetIndex;
              bottomSheetRef.current?.snapToIndex(targetIndex);
            }

            lastScrollY.current = scrollY;
          }}
        />

        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          animatedPosition={animatedPosition}
          enablePanDownToClose={false}
          enableOverDrag={false}
          handleComponent={() => (
            <Animated.View
              style={[
                animatedBorderRadiusStyle,
                {
                  alignItems: "center",
                  paddingVertical: 12,
                  backgroundColor: backgroundColor,
                },
              ]}
            >
              {/* WebView Control */}
              <WebViewControl
                currentUrl={currentUrl}
                animatedPosition={animatedPosition}
                screenHeight={screenHeight}
              />
              <Animated.View
                style={[
                  animatedOpacityStyle,
                  {
                    backgroundColor:
                      colorScheme === "dark"
                        ? Colors.dark.border
                        : Colors.light.border,
                    height: 5,
                    width: 40,
                    borderRadius: 3,
                  },
                ]}
              />
            </Animated.View>
          )}
          backgroundStyle={{
            backgroundColor: backgroundColor,
          }}
        >
          <BottomSheetView
            style={[
              styles.contentContainer,
              {
                backgroundColor: backgroundColor,
              },
            ]}
          >
            <TweetSheet.Root tweet={tweet} stage="full">
              <TweetSheet.AnimatedView
                animatedPosition={animatedPosition}
                snapPoints={snapPointsPixels}
                maxContentLines={3}
              />
            </TweetSheet.Root>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
});
