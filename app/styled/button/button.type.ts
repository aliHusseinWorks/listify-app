import { TextStyle, TouchableOpacityProps, ViewStyle } from "react-native";

export interface ButtonProps extends TouchableOpacityProps {
    title: string;
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
    variant?: "primary" | "secondary" | "danger";
}
