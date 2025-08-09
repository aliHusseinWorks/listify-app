import { ColorSchemeName } from "react-native";

import { ThemeType } from "./theme";

export interface ThemeContextType {
    theme: ThemeType;
    toggleTheme: () => void;
    mode: ColorSchemeName | null;
};

