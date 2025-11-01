import {
  Icon,
  Label,
  NativeTabs as Tabs,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import React from "react";

import { Colors } from "@/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { DynamicColorIOS, Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      // For the selected icon color
      tintColor={DynamicColorIOS({
        dark: Colors.dark.tint,
        light: Colors.light.tint,
      })}
    >
      <Tabs.Trigger name="index">
        <Label hidden />
        {Platform.select({
          ios: <Icon sf="house.fill" />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="home" />} />
          ),
        })}
      </Tabs.Trigger>
      <Tabs.Trigger name="search">
        <Label hidden />
        {Platform.select({
          ios: <Icon sf="magnifyingglass" />,
          android: (
            <Icon src={<VectorIcon family={MaterialIcons} name="search" />} />
          ),
        })}
      </Tabs.Trigger>
      <Tabs.Trigger name="notifications">
        <Label hidden />
        {Platform.select({
          ios: <Icon sf="bell" />,
          android: (
            <Icon
              src={<VectorIcon family={MaterialIcons} name="notifications" />}
            />
          ),
        })}
      </Tabs.Trigger>
      <Tabs.Trigger name="messages">
        <Label hidden />
        {Platform.select({
          ios: <Icon sf="envelope" />,
          android: (
            <Icon
              src={<VectorIcon family={MaterialIcons} name="mail-outline" />}
            />
          ),
        })}
      </Tabs.Trigger>
    </Tabs>
  );
}
