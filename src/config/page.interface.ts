import type { Icon } from "./landing.interface";

// ==================== Base Types ====================

export interface LayoutConfig {
  columns?: number | "auto";
  spacing?: "none" | "small" | "medium" | "large" | "xl";
  alignment?: "left" | "center" | "right";
  containerWidth?: "full" | "3/4" | "2/3" | "1/2";
}

export interface MetaConfig {
  title: string;
  description: string;
  lang: string;
  charset: string;
  ldJson?: Record<string, unknown>;
}

// ==================== Component-Specific Configs ====================

export interface HeroConfig {
  layout?: LayoutConfig;
  content: {
    title: string;
    subTitle: string;
    primaryCta: {
      text: string;
      href: string;
      target?: string;
    };
    secondaryCta: {
      text: string;
      href: string;
      target?: string;
    };
    highlightedTitle?: string;
    showScrollButton?: boolean;
    scrollTarget?: string;
  };
}

export interface ServicesConfig {
  layout?: LayoutConfig;
  content: {
    title: string;
    services: Array<{
      title: string;
      icon: Icon;
      description: string;
    }>;
  };
}

export interface AdventajesConfig {
  layout?: LayoutConfig;
  content: {
    title: string;
    adventajes: Array<{
      title: string;
      description: string;
      img: string;
      imageAlt: string;
      checks: string[];
    }>;
  };
}

export interface BrandsConfig {
  layout?: LayoutConfig;
  content: {
    title: string;
    description: string;
    brands: Array<{
      label: string;
      icon: Icon;
      href: string;
    }>;
  };
}

export interface PricingConfig {
  layout?: LayoutConfig;
  content: {
    title: string;
    tiers: Array<{
      title: string;
      description: string;
      price: {
        amount: string;
        period?: string;
      };
      features: string[];
      cta: string;
      ctaHref?: string;
    }>;
  };
}

export interface HeaderConfig {
  layout?: LayoutConfig;
  content: {
    logo: string;
    links: Array<{
      label: string;
      href: string;
    }>;
  };
}

export interface FooterConfig {
  layout?: LayoutConfig;
  content: {
    logo: string;
    description: string;
    links: Array<{
      label: string;
      href: string;
    }>;
    socials: Array<{
      icon: Icon;
      href: string;
    }>;
  };
}

// ==================== Component Type Union ====================

export type ComponentType =
  | "Hero"
  | "Services"
  | "Adventajes"
  | "Brands"
  | "Pricing"
  | "Header"
  | "Footer";

export type ComponentConfig =
  | HeroConfig
  | ServicesConfig
  | AdventajesConfig
  | BrandsConfig
  | PricingConfig
  | HeaderConfig
  | FooterConfig;

// ==================== Page Component Structure ====================

export interface PageComponent {
  type: ComponentType;
  id?: string; // Optional unique identifier for the component instance
  enabled?: boolean; // Allow components to be disabled without removing them
  config:
    | HeroConfig
    | ServicesConfig
    | AdventajesConfig
    | BrandsConfig
    | PricingConfig
    | HeaderConfig
    | FooterConfig;
}

// ==================== Page Data Structure ====================

export interface PageData {
  meta: MetaConfig;
  layout?: {
    containerWidth?: "full" | "3/4" | "2/3" | "1/2";
    backgroundColor?: string;
  };
  header?: PageComponent; // Optional header component
  components: PageComponent[]; // Main content components
  footer?: PageComponent; // Optional footer component
}
