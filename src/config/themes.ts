/**
 * Theme System Configuration
 *
 * Defines predefined color schemes that can be applied to components via YAML.
 * Each theme provides a consistent set of colors for backgrounds, text, accents, and borders.
 *
 * Usage in YAML:
 * ```yaml
 * components:
 *   - type: "Hero"
 *     config:
 *       style:
 *         theme: "ocean"  # Apply ocean theme
 * ```
 */

import type { ThemeName } from "./page.interface";

export interface Theme {
  name: ThemeName;
  colors: {
    background: string;
    backgroundGradient?: string; // Optional gradient background
    text: string;
    textSecondary: string;
    accent: string;
    accentHover: string;
    border: string;
    cardBackground?: string; // For nested elements like cards
  };
}

export const themes: Record<ThemeName, Theme> = {
  default: {
    name: "default",
    colors: {
      background: "#FFFFFF",
      text: "#161925",
      textSecondary: "#6B7280",
      accent: "#1D4ED8",
      accentHover: "#1E40AF",
      border: "#E5E7EB",
      cardBackground: "#F9FAFB",
    },
  },

  ocean: {
    name: "ocean",
    colors: {
      background: "#0C4A6E",
      backgroundGradient: "linear-gradient(135deg, #0C4A6E 0%, #0369A1 100%)",
      text: "#FFFFFF",
      textSecondary: "#BAE6FD",
      accent: "#38BDF8",
      accentHover: "#0EA5E9",
      border: "#075985",
      cardBackground: "#164E63",
    },
  },

  sunset: {
    name: "sunset",
    colors: {
      background: "#7C2D12",
      backgroundGradient: "linear-gradient(135deg, #7C2D12 0%, #DC2626 50%, #F59E0B 100%)",
      text: "#FFFFFF",
      textSecondary: "#FED7AA",
      accent: "#FB923C",
      accentHover: "#F97316",
      border: "#9A3412",
      cardBackground: "#92400E",
    },
  },

  forest: {
    name: "forest",
    colors: {
      background: "#14532D",
      backgroundGradient: "linear-gradient(135deg, #14532D 0%, #15803D 100%)",
      text: "#FFFFFF",
      textSecondary: "#BBF7D0",
      accent: "#4ADE80",
      accentHover: "#22C55E",
      border: "#166534",
      cardBackground: "#1A5E3A",
    },
  },

  midnight: {
    name: "midnight",
    colors: {
      background: "#1E1B4B",
      backgroundGradient: "linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)",
      text: "#FFFFFF",
      textSecondary: "#C4B5FD",
      accent: "#A78BFA",
      accentHover: "#8B5CF6",
      border: "#4C1D95",
      cardBackground: "#2E1065",
    },
  },

  lavender: {
    name: "lavender",
    colors: {
      background: "#F5F3FF",
      backgroundGradient: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)",
      text: "#581C87",
      textSecondary: "#7C3AED",
      accent: "#9333EA",
      accentHover: "#7C3AED",
      border: "#DDD6FE",
      cardBackground: "#FFFFFF",
    },
  },
};

/**
 * Get theme by name with fallback to default
 */
export function getTheme(themeName?: ThemeName): Theme {
  if (!themeName) return themes.default;
  return themes[themeName] || themes.default;
}

/**
 * Generate CSS custom properties for a theme
 * These can be applied to a component wrapper for theme-aware styling
 */
export function getThemeStyles(themeName?: ThemeName): Record<string, string> {
  const theme = getTheme(themeName);

  return {
    "--theme-bg": theme.colors.background,
    "--theme-text": theme.colors.text,
    "--theme-text-secondary": theme.colors.textSecondary,
    "--theme-accent": theme.colors.accent,
    "--theme-accent-hover": theme.colors.accentHover,
    "--theme-border": theme.colors.border,
    ...(theme.colors.cardBackground && {
      "--theme-card-bg": theme.colors.cardBackground,
    }),
  };
}

/**
 * Generate inline style string for a theme
 */
export function getThemeStyleString(themeName?: ThemeName): string {
  const styles = getThemeStyles(themeName);
  return Object.entries(styles)
    .map(([key, value]) => `${key}: ${value}`)
    .join("; ");
}

/**
 * Get background style (solid color or gradient)
 */
export function getThemeBackground(themeName?: ThemeName): string {
  const theme = getTheme(themeName);
  return theme.colors.backgroundGradient || theme.colors.background;
}
