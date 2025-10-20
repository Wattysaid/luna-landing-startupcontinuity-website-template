/**
 * Legacy Component Data Interfaces
 *
 * These interfaces are still used by individual section components.
 * They define the data structure that each component expects.
 *
 * Note: The new YAML system uses these interfaces within the component
 * configurations defined in page.interface.ts
 */

export interface HeaderData {
  logo: string;
  links: Link[];
}

export interface ServicesData {
  title: string;
  services: Service[];
}

export interface Service {
  title: string;
  icon: string;
  description: string;
}

export interface AdventajesData {
  title: string;
  adventajes: Adventaje[];
}

export interface Adventaje {
  title: string;
  description: string;
  img: string;
  imageAlt: string;
  checks: string[];
}

export interface FooterData {
  logo: string;
  description: string;
  links: Link[];
  socials: Social[];
}

export interface Link {
  label: string;
  href: string;
}

export interface Social {
  icon: string;
  href: string;
}

export interface BrandsData {
  title: string;
  description: string;
  brands: Brand[];
}

export interface Brand {
  label: string;
  icon: string;
  href: string;
}

export interface PricingData {
  title: string;
  tiers: Tier[];
}

export interface Tier {
  title: string;
  description: string;
  price: Price;
  features: string[];
  cta: string;
  ctaHref?: string;
}

export interface Price {
  amount: string;
  period?: string;
}

export interface Meta {
  title: string;
  description: string;
  lang: string;
  charset: string;
  ldJson: LdJson;
}

export interface LdJson {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  logo: string;
  contactPoint: {
    "@type": string;
    email: string;
    contactType: string;
  };
  sameAs: string[];
}

// ==================== New Component Data Interfaces ====================

export interface FAQData {
  title: string;
  description?: string;
  faqs: FAQ[];
}

export interface FAQ {
  question: string;
  answer: string;
  icon?: Icon;
}

export interface CallToActionData {
  title: string;
  subtitle?: string;
  tagline?: string;
  primaryCta?: {
    text: string;
    href: string;
    target?: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
    target?: string;
  };
  note?: string;
}

export interface TestimonialsData {
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

export interface Testimonial {
  quote: string;
  name: string;
  title?: string;
  company?: string;
  image?: string;
  rating?: number;
}

export interface StatsData {
  title: string;
  subtitle?: string;
  stats: Stat[];
}

export interface Stat {
  amount: string;
  label: string;
  description?: string;
  icon?: Icon;
}

export interface StepsData {
  title: string;
  subtitle?: string;
  steps: Step[];
}

export interface Step {
  title: string;
  description: string;
  icon?: Icon;
  details?: string[];
}

export interface TeamData {
  title: string;
  subtitle?: string;
  members: TeamMember[];
}

export interface TeamMember {
  name: string;
  title?: string;
  bio?: string;
  image?: string;
  socials?: Social[];
}

// ==================== Additional Component Data Interfaces ====================

export interface ContactFormData {
  title: string;
  subtitle?: string;
  contactInfo?: {
    title?: string;
    description?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  fields: FormField[];
  formAction?: string;
  formMethod?: string;
  submitText?: string;
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  rows?: number;
  options?: { value: string; label: string }[];
}

export interface NewsletterData {
  title: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  formAction?: string;
  formMethod?: string;
  disclaimer?: string;
  benefits?: string[];
  icon?: boolean;
}

export interface ContentGridData {
  title: string;
  subtitle?: string;
  items: ContentItem[];
  viewAllLink?: string;
  viewAllText?: string;
}

export interface ContentItem {
  title: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  category?: string;
  author?: string;
  date?: string;
  link?: string;
  linkText?: string;
}

export interface Features2Data {
  title: string;
  subtitle?: string;
  features: Feature2Item[];
}

export interface Feature2Item {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  icon?: Icon;
  benefits?: string[];
  link?: string;
  linkText?: string;
  badge?: string;
}

export interface ContentData {
  title?: string;
  subtitle?: string;
  blocks: ContentBlock[];
}

export interface ContentBlock {
  tagline?: string;
  title?: string;
  description?: string;
  features?: ContentFeature[];
  quote?: string;
  quoteAuthor?: string;
  cta?: {
    text: string;
    href: string;
    showArrow?: boolean;
  };
  image?: string;
  imageAlt?: string;
  imageBadge?: string;
  layout?: "single-column" | "two-column";
  reversed?: boolean;
}

export interface ContentFeature {
  title: string;
  description?: string;
  icon?: Icon;
}

export interface LogoCloudData {
  title?: string;
  description?: string;
  logos: Logo[];
  layout?: "default" | "compact";
  cta?: {
    text: string;
    href: string;
  };
}

export interface Logo {
  name: string;
  image?: string;
  alt?: string;
  link?: string;
  newTab?: boolean;
}

export interface ComparisonData {
  title: string;
  description?: string;
  featureColumnLabel?: string;
  options: ComparisonOption[];
  features: ComparisonFeature[];
  showCtas?: boolean;
  note?: string;
}

export interface ComparisonOption {
  name: string;
  price?: string;
  description?: string;
  badge?: string;
  cta?: {
    text: string;
    href: string;
    primary?: boolean;
  };
}

export interface ComparisonFeature {
  name: string;
  description?: string;
  values: (boolean | string)[];
}

export interface GalleryData {
  title: string;
  description?: string;
  images: GalleryImage[];
  layout?: "grid" | "masonry" | "carousel" | "full-width";
  columns?: 2 | 3 | 4;
  loadMoreText?: string;
}

export interface GalleryImage {
  src: string;
  alt?: string;
  title?: string;
  description?: string;
}

export type Icon =
  | "DevIcon"
  | "FileIcon"
  | "PlanetIcon"
  | "ConfigIcon"
  | "CheckIcon"
  | "InstagramIcon"
  | "GithubIcon"
  | "TwitterIcon"
  | "FacebookIcon"
  | "ReactIcon"
  | "SvelteIcon"
  | "SolidIcon"
  | "VueIcon"
  | "VercelIcon"
  | "NetlifyIcon";
