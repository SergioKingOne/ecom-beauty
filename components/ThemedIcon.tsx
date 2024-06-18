import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

type ColorSchemeType = keyof typeof Colors;

export function ThemedIcon({ name, size }: { name: string; size: number }) {
  const colorScheme = useColorScheme();
  const safeColorScheme: ColorSchemeType = colorScheme ?? "light";

  // Use `any` type for `name` when passing to Ionicons to bypass strict type checking
  return (
    <Ionicons
      name={name as any}
      size={size}
      color={Colors[safeColorScheme].text}
    />
  );
}
