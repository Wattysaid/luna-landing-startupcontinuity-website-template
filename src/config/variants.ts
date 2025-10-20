/**
 * Component Variant System
 *
 * Defines reusable style variants that can be applied to any component via YAML.
 * Variants control the visual presentation style (solid, outline, gradient, etc.)
 * and work in combination with themes for complete styling control.
 *
 * Usage in YAML:
 * ```yaml
 * components:
 *   - type: "Hero"
 *     config:
 *       style:
 *         variant: "gradient"  # Apply gradient variant
 *         theme: "ocean"       # With ocean theme colors
 * ```
 */

import type { ComponentVariant } from "./page.interface";

export interface VariantStyle {
  name: ComponentVariant;
  description: string;
  classes: {
    container: string; // Classes for the component wrapper
    text: string; // Classes for text elements
    heading: string; // Classes for headings
    button: string; // Classes for buttons/CTAs
    card?: string; // Classes for card-like elements
    border?: string; // Classes for borders
  };
}

export const variants: Record<ComponentVariant, VariantStyle> = {
  default: {
    name: "default",
    description: "Standard solid background with default styling",
    classes: {
      container: "bg-white",
      text: "text-gray-700",
      heading: "text-gray-900 font-bold",
      button:
        "bg-primary hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors",
      card: "bg-gray-50 border border-gray-200 rounded-lg",
      border: "border-gray-200",
    },
  },

  dark: {
    name: "dark",
    description: "Dark background with light text for contrast",
    classes: {
      container: "bg-gray-900",
      text: "text-gray-300",
      heading: "text-white font-bold",
      button:
        "bg-white hover:bg-gray-100 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors",
      card: "bg-gray-800 border border-gray-700 rounded-lg",
      border: "border-gray-700",
    },
  },

  light: {
    name: "light",
    description: "Light, airy background with subtle styling",
    classes: {
      container: "bg-gray-50",
      text: "text-gray-600",
      heading: "text-gray-800 font-bold",
      button:
        "bg-gray-800 hover:bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors",
      card: "bg-white border border-gray-100 rounded-lg shadow-sm",
      border: "border-gray-100",
    },
  },

  gradient: {
    name: "gradient",
    description: "Vibrant gradient background (uses theme colors)",
    classes: {
      container: "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600",
      text: "text-white/90",
      heading: "text-white font-bold",
      button:
        "bg-white hover:bg-gray-100 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-all hover:scale-105",
      card: "bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg",
      border: "border-white/20",
    },
  },

  outline: {
    name: "outline",
    description: "Transparent background with outlined elements",
    classes: {
      container: "bg-transparent",
      text: "text-gray-700",
      heading: "text-gray-900 font-bold",
      button:
        "bg-transparent hover:bg-gray-100 text-gray-900 font-semibold px-6 py-3 rounded-lg border-2 border-gray-900 transition-colors",
      card: "bg-transparent border-2 border-gray-900 rounded-lg",
      border: "border-2 border-gray-900",
    },
  },
};

/**
 * Get variant configuration by name with fallback to default
 */
export function getVariant(variantName?: ComponentVariant): VariantStyle {
  if (!variantName) return variants.default;
  return variants[variantName] || variants.default;
}

/**
 * Get combined class string for a specific element type
 */
export function getVariantClasses(
  variantName?: ComponentVariant,
  element: keyof VariantStyle["classes"] = "container"
): string {
  const variant = getVariant(variantName);
  return variant.classes[element] || "";
}

/**
 * Merge variant classes with custom classes
 * Custom classes take precedence and can override variant classes
 */
export function mergeVariantClasses(
  variantName: ComponentVariant | undefined,
  element: keyof VariantStyle["classes"],
  customClasses?: string
): string {
  const variantClasses = getVariantClasses(variantName, element);
  if (!customClasses) return variantClasses;

  // Simple merge - custom classes are appended
  // In production, you might want more sophisticated merging (e.g., using tailwind-merge)
  return `${variantClasses} ${customClasses}`.trim();
}

/**
 * Get all available variants for documentation/selection
 */
export function getAllVariants(): VariantStyle[] {
  return Object.values(variants);
}

/**
 * Validate if a variant name exists
 */
export function isValidVariant(variantName: string): variantName is ComponentVariant {
  return variantName in variants;
}
