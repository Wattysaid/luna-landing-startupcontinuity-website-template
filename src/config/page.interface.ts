import type {
  Icon,
  FAQData,
  CallToActionData,
  TestimonialsData,
  StatsData,
  StepsData,
  TeamData,
  ContactFormData,
  NewsletterData,
  ContentGridData,
  Features2Data,
  ContentData,
  LogoCloudData,
  ComparisonData,
  GalleryData,
} from "./landing.interface";

// ==================== Base Types ====================

export interface LayoutConfig {
  columns?: number | "auto";
  spacing?: "none" | "small" | "medium" | "large" | "xl";
  alignment?: "left" | "center" | "right";
  containerWidth?: "full" | "3/4" | "2/3" | "1/2";
}

export type ComponentVariant = "default" | "dark" | "light" | "gradient" | "outline";

export type ThemeName = "default" | "ocean" | "sunset" | "forest" | "midnight" | "lavender";

export interface StyleConfig {
  variant?: ComponentVariant;
  theme?: ThemeName;
  customStyles?: {
    backgroundColor?: string;
    backgroundImage?: string;
    textColor?: string;
    borderColor?: string;
    accentColor?: string;
    [key: string]: string | undefined;
  };
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
  style?: StyleConfig;
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
  style?: StyleConfig;
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
  style?: StyleConfig;
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
  style?: StyleConfig;
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
  style?: StyleConfig;
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
  style?: StyleConfig;
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
  style?: StyleConfig;
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

export interface FAQConfig {
  layout?: LayoutConfig;
  style?: StyleConfig;
  content: FAQData;
}

export interface CallToActionConfig {
  layout?: LayoutConfig;
  style?: StyleConfig;
  content: CallToActionData;
}

export interface TestimonialsConfig {
  layout?: LayoutConfig;
  style?: StyleConfig;
  content: TestimonialsData;
}

export interface StatsConfig {
  layout?: LayoutConfig;
  style?: StyleConfig;
  content: StatsData;
}

export interface StepsConfig {
  layout?: LayoutConfig;
  style?: StyleConfig;
  content: StepsData;
}

export interface TeamConfig {
  layout?: LayoutConfig;
  style?: StyleConfig;
  content: TeamData;
}

export interface ContactFormConfig {
  layout?: LayoutConfig;
  style?: StyleConfig;
  content: ContactFormData;
}

export interface NewsletterConfig {
  layout?: LayoutConfig;
  style?: StyleConfig;
  content: NewsletterData;
}

export interface ContentGridConfig {
  layout?: LayoutConfig;
  style?: StyleConfig;
  content: ContentGridData;
}

export interface Features2Config {
  layout?: LayoutConfig;
  style?: StyleConfig;
  content: Features2Data;
}

export interface ContentConfig {
  layout?: LayoutConfig;
  style?: StyleConfig;
  content: ContentData;
}

export interface LogoCloudConfig {
  layout?: LayoutConfig;
  style?: StyleConfig;
  content: LogoCloudData;
}

export interface ComparisonConfig {
  layout?: LayoutConfig;
  style?: StyleConfig;
  content: ComparisonData;
}

export interface GalleryConfig {
  layout?: LayoutConfig;
  style?: StyleConfig;
  content: GalleryData;
}

// ==================== Component Type Union ====================

export type ComponentType =
  | "Hero"
  | "Services"
  | "Adventajes"
  | "Brands"
  | "Pricing"
  | "Header"
  | "Footer"
  | "FAQ"
  | "CallToAction"
  | "Testimonials"
  | "Stats"
  | "Steps"
  | "Team"
  | "ContactForm"
  | "Newsletter"
  | "ContentGrid"
  | "Features2"
  | "Content"
  | "LogoCloud"
  | "Comparison"
  | "Gallery";

export type ComponentConfig =
  | HeroConfig
  | ServicesConfig
  | AdventajesConfig
  | BrandsConfig
  | PricingConfig
  | HeaderConfig
  | FooterConfig
  | FAQConfig
  | CallToActionConfig
  | TestimonialsConfig
  | StatsConfig
  | StepsConfig
  | TeamConfig
  | ContactFormConfig
  | NewsletterConfig
  | ContentGridConfig
  | Features2Config
  | ContentConfig
  | LogoCloudConfig
  | ComparisonConfig
  | GalleryConfig;

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
    | FooterConfig
    | FAQConfig
    | CallToActionConfig
    | TestimonialsConfig
    | StatsConfig
    | StepsConfig
    | TeamConfig
    | ContactFormConfig
    | NewsletterConfig
    | ContentGridConfig
    | Features2Config
    | ContentConfig
    | LogoCloudConfig
    | ComparisonConfig
    | GalleryConfig;
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
