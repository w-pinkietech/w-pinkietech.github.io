import { type ThemeConfig } from "../lib/types"

export const theme: ThemeConfig = {
  colors: {
    primary: {
      DEFAULT: "#C64418", // Deep warm orange for WCAG compliance (4.5:1 contrast)
      foreground: "#FFFFFF",
    },
    secondary: {
      DEFAULT: "#FFB563", // Light orange
      foreground: "#1A1A1A",
    },
    background: "#FFF9F5", // Warm white
    foreground: "#1A1A1A",
    muted: {
      DEFAULT: "#F5E6E0", // Warm gray
      foreground: "#666666",
    },
    accent: {
      DEFAULT: "#E85A4F", // Warm red
      foreground: "#FFFFFF",
    },
    border: "#F5E6E0", // Warm gray
    ring: "#FF6B35", // Warm orange
  },
}

export default theme
