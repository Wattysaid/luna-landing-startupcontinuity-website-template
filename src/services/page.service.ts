/**
 * Page Service
 *
 * Loads and parses YAML page configuration files.
 * Each page has its own YAML file in src/data/pages/
 */

import { readFileSync } from "fs";
import { join } from "path";
import yaml from "js-yaml";
import type { PageData, ComponentVariant, ThemeName } from "@/config/page.interface";
import { isValidComponentType } from "@/config/component-registry";

/**
 * Theme configuration structure
 */
interface ThemeConfig {
  global?: {
    defaultTheme?: string;
    defaultVariant?: string;
  };
  componentThemes?: {
    [componentType: string]: {
      variant?: string;
      theme?: string;
    };
  };
}

/**
 * Load shared navigation configuration
 *
 * @returns Shared navigation data (header and footer)
 */
function getSharedNavigation(): Pick<PageData, "header" | "footer"> {
  try {
    const navPath = join(process.cwd(), "src", "data", "shared", "navigation.yaml");
    const navContents = readFileSync(navPath, "utf8");
    const navData = yaml.load(navContents) as Pick<PageData, "header" | "footer">;
    return navData;
  } catch (error) {
    console.warn("Warning: Could not load shared navigation. Pages will use their own navigation.");
    return { header: undefined, footer: undefined };
  }
}

/**
 * Load shared theme configuration
 *
 * @returns Theme configuration
 */
function getSharedTheme(): ThemeConfig {
  try {
    const themePath = join(process.cwd(), "src", "data", "shared", "theme.yaml");
    const themeContents = readFileSync(themePath, "utf8");
    const themeData = yaml.load(themeContents) as ThemeConfig;
    return themeData;
  } catch (error) {
    console.warn("Warning: Could not load shared theme. Using default styles.");
    return {};
  }
}

/**
 * Apply shared theme to components
 *
 * @param data - Page data with components
 * @param themeConfig - Shared theme configuration
 */
function applySharedTheme(data: PageData, themeConfig: ThemeConfig): void {
  if (!data.components || !themeConfig.componentThemes) {
    return;
  }

  data.components.forEach((component) => {
    // Skip if component already has style defined (page-level override)
    if (component.config.style) {
      return;
    }

    // Get theme for this component type
    const componentTheme = themeConfig.componentThemes?.[component.type];

    if (componentTheme && (componentTheme.variant || componentTheme.theme)) {
      // Apply shared theme to component (cast to proper types)
      component.config.style = {
        variant: componentTheme.variant as ComponentVariant | undefined,
        theme: componentTheme.theme as ThemeName | undefined,
      };
    }
  });
}

/**
 * Load page data from a YAML file
 *
 * @param pageName - Name of the page file (without .yaml extension)
 * @returns Parsed and validated page data
 * @throws Error if file doesn't exist or is invalid
 */
export async function getPageData(pageName: string): Promise<PageData> {
  try {
    // Construct the path to the YAML file
    const filePath = join(process.cwd(), "src", "data", "pages", `${pageName}.yaml`);

    // Read and parse the YAML file
    const fileContents = readFileSync(filePath, "utf8");
    const data = yaml.load(fileContents) as PageData;

    // Load shared navigation
    const sharedNav = getSharedNavigation();

    // Load shared theme
    const sharedTheme = getSharedTheme();

    // Merge shared navigation with page data (page data takes precedence if it exists)
    const mergedData: PageData = {
      ...data,
      header: data.header ?? sharedNav.header,
      footer: data.footer ?? sharedNav.footer,
    };

    // Apply shared theme to components (components can still override)
    applySharedTheme(mergedData, sharedTheme);

    // Validate the data structure
    validatePageData(mergedData, pageName);

    return mergedData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to load page data for "${pageName}": ${error.message}`
      );
    }
    throw error;
  }
}

/**
 * Validate page data structure
 */
function validatePageData(data: PageData, pageName: string): void {
  // Check required fields
  if (!data.meta) {
    throw new Error(`Page "${pageName}" is missing required "meta" field`);
  }

  if (!data.meta.title) {
    throw new Error(`Page "${pageName}" is missing required "meta.title" field`);
  }

  if (!data.meta.description) {
    throw new Error(
      `Page "${pageName}" is missing required "meta.description" field`
    );
  }

  if (!data.components || !Array.isArray(data.components)) {
    throw new Error(
      `Page "${pageName}" is missing required "components" array or it's not an array`
    );
  }

  // Validate each component
  data.components.forEach((component, index) => {
    if (!component.type) {
      throw new Error(
        `Page "${pageName}": Component at index ${index} is missing required "type" field`
      );
    }

    if (!isValidComponentType(component.type)) {
      throw new Error(
        `Page "${pageName}": Component at index ${index} has invalid type "${component.type}"`
      );
    }

    if (!component.config) {
      throw new Error(
        `Page "${pageName}": Component "${component.type}" at index ${index} is missing required "config" field`
      );
    }
  });

  // Validate header if present
  if (data.header) {
    if (!data.header.type) {
      throw new Error(`Page "${pageName}": Header is missing required "type" field`);
    }
    if (!isValidComponentType(data.header.type)) {
      throw new Error(
        `Page "${pageName}": Header has invalid type "${data.header.type}"`
      );
    }
  }

  // Validate footer if present
  if (data.footer) {
    if (!data.footer.type) {
      throw new Error(`Page "${pageName}": Footer is missing required "type" field`);
    }
    if (!isValidComponentType(data.footer.type)) {
      throw new Error(
        `Page "${pageName}": Footer has invalid type "${data.footer.type}"`
      );
    }
  }
}

/**
 * Get a list of all available page files
 */
export function getAvailablePages(): string[] {
  const fs = require("fs");
  const pagesDir = join(process.cwd(), "src", "data", "pages");

  try {
    const files = fs.readdirSync(pagesDir);
    return files
      .filter((file: string) => file.endsWith(".yaml"))
      .map((file: string) => file.replace(".yaml", ""));
  } catch {
    return [];
  }
}
