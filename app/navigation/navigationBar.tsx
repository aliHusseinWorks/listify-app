import React from "react";
import { Text, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feather from "react-native-vector-icons/Feather";

import { useTheme } from "@theme";
import { HomeComponent } from "@components/home/home.component";
import { AccountComponent } from "@components/account/account.component";

const Tab = createBottomTabNavigator();

export const NavigationBar = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const tabLabels: Record<string, string> = {
    Home: t("tabs.home"),
    Account: t("tabs.account"),
  };

  const getTabIcon = (routeName: string, focused: boolean) => {
    const color = focused ? theme.primary : theme.placeholder;
    const size = 22;

    switch (routeName) {
      case "Home":
        return <Feather name="home" size={size} color={color} />;
      case "Account":
        return <Feather name="user" size={size} color={color} />;
      default:
        return null;
    }
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => getTabIcon(route.name, focused),
        tabBarLabel: ({ focused }) => (
          <Text
            style={{
              color: focused ? theme.primary : theme.placeholder,
              fontWeight: focused ? "bold" : "normal",
              fontSize: 12,
            }}
          >
            {tabLabels[route.name] ?? route.name}
          </Text>
        ),
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 8,
          backgroundColor: theme.background,
          borderTopWidth: 1,
          borderTopColor: theme.border,
          ...(Platform.OS === "ios"
            ? { paddingBottom: insets.bottom + 10 }
            : {}),
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeComponent} />
      <Tab.Screen name="Account" component={AccountComponent} />
    </Tab.Navigator>
  );
};
