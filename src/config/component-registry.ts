/**
 * Component Registry
 *
 * This file maps component type strings to their corresponding Astro components.
 * It enables dynamic component rendering based on YAML configuration.
 *
 * To add a new component:
 * 1. Import the component
 * 2. Add it to the ComponentRegistry object
 * 3. Update the ComponentType union in page.interface.ts
 * 4. Create a corresponding config interface in page.interface.ts
 */

import Hero from "@/sections/Hero.astro";
import Services from "@/sections/Services.astro";
import Adventajes from "@/sections/Adventajes.astro";
import Brands from "@/sections/Brands.astro";
import Pricing from "@/sections/Pricing.astro";
import Header from "@/sections/Header.astro";
import Footer from "@/sections/Footer.astro";

import type { ComponentType } from "./page.interface";

export const ComponentRegistry = {
  Hero,
  Services,
  Adventajes,
  Brands,
  Pricing,
  Header,
  Footer,
} as const;

/**
 * Get a component from the registry by type
 */
export function getComponent(type: ComponentType) {
  const component = ComponentRegistry[type];

  if (!component) {
    throw new Error(`Component type "${type}" not found in registry. Available types: ${Object.keys(ComponentRegistry).join(", ")}`);
  }

  return component;
}

/**
 * Check if a component type exists in the registry
 */
export function isValidComponentType(type: string): type is ComponentType {
  return type in ComponentRegistry;
}

/**
 * Get all registered component types
 */
export function getRegisteredComponents(): ComponentType[] {
  return Object.keys(ComponentRegistry) as ComponentType[];
}
