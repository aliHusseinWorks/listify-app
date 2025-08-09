import React, { useEffect, useRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "@hooks";
import { NavigationBar } from "./navigationBar";
import { LoginComponent } from "@components/login/login.component";

const Stack = createNativeStackNavigator();

export const Navigator = () => {
  const { auth } = useAuth();
  const user = auth.user;
  const navigationRef = useRef<any>(null);

  useEffect(() => {
    if (navigationRef.current && user !== undefined) {
      if (user) {
        navigationRef.current.reset({
          index: 0,
          routes: [{ name: "MainTabs" }],
        });
      } else {
        navigationRef.current.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    }
  }, [user]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Login" // default initial screen
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginComponent} />
        <Stack.Screen name="MainTabs" component={NavigationBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
