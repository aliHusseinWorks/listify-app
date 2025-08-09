import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Appearance, ColorSchemeName } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { lightTheme, darkTheme, ThemeType } from "./theme";
import { ThemeContextType } from "./theme.type";

const STORAGE_KEY = "appThemeMode";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = Appearance.getColorScheme();

  const [mode, setMode] = useState<ColorSchemeName | null>(null);
  const [theme, setTheme] = useState<ThemeType>(
    systemColorScheme === "dark" ? darkTheme : lightTheme
  );

  useEffect(() => {
    (async () => {
      try {
        const storedMode = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedMode === "light" || storedMode === "dark") {
          setMode(storedMode);
        } else {
          setMode(systemColorScheme);
        }
      } catch {
        setMode(systemColorScheme);
      }
    })();
  }, [systemColorScheme]);

  useEffect(() => {
    if (!mode) return;
    setTheme(mode === "dark" ? darkTheme : lightTheme);
    AsyncStorage.setItem(STORAGE_KEY, mode).catch(() => {});
  }, [mode]);

  useEffect(() => {
    if (mode) return;
    const listener = ({
      colorScheme,
    }: {
      colorScheme: ColorSchemeName | null;
    }) => {
      setMode(colorScheme);
    };
    const subscription = Appearance.addChangeListener(listener);
    return () => subscription.remove();
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
