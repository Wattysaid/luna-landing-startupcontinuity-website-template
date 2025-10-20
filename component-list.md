# Component Library Reference

**Last Updated**: 2025-10-20

This document lists all available components in the YAML-driven page system. Use this reference when building or editing pages in the `src/data/pages/` directory.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Available Components](#available-components)
   - [Header](#header)
   - [Hero](#hero)
   - [Services](#services)
   - [Adventajes](#adventajes)
   - [Brands](#brands)
   - [Pricing](#pricing)
   - [Footer](#footer)
3. [Layout Options](#layout-options)
4. [Icon Reference](#icon-reference)
5. [Common Patterns](#common-patterns)

---

## Quick Start

### How to Use Components in YAML

```yaml
components:
  - type: "ComponentName"    # Required: Component type (see list below)
    id: "unique-id"          # Optional: Custom ID for linking/styling
    enabled: true            # Optional: Set to false to hide (default: true)
    config:
      layout:                # Optional: Layout configuration
        spacing: "large"     # Spacing around component
        columns: 3           # Number of columns (if applicable)
      content:               # Required: Component-specific content
        # ... content fields vary by component
```

### Example: Adding a Hero Component

```yaml
components:
  - type: "Hero"
    id: "main-hero"
    enabled: true
    config:
      layout:
        spacing: "large"
      content:
        title: "Welcome to Our Site"
        subTitle: "We provide amazing services"
        highlightedTitle: "Amazing"
        primaryCta:
          text: "Get Started"
          href: "/contact"
          target: "_self"
        secondaryCta:
          text: "Learn More"
          href: "/about"
```

---

## Available Components

### Header

**Type**: `"Header"`
**Purpose**: Navigation header with logo and links
**Location**: Typically used in `header:` section of YAML
**Visual**: Horizontal navigation bar

#### Configuration

```yaml
header:
  type: "Header"
  enabled: true
  config:
    content:
      logo: "Your Brand Name"          # Required: Logo text
      links:                            # Required: Navigation links
        - label: "Home"                 # Link text
          href: "/"                     # Link URL
        - label: "About"
          href: "/about"
        - label: "Services"
          href: "/services"
        - label: "Contact"
          href: "/contact"
```

#### All Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `logo` | string | Yes | Brand name or logo text |
| `links` | array | Yes | Array of navigation links |
| `links[].label` | string | Yes | Display text for link |
| `links[].href` | string | Yes | URL or anchor |

#### Example Use Cases

- Main site navigation
- Mobile-responsive menu
- Sticky header

---

### Hero

**Type**: `"Hero"`
**Purpose**: Large hero section with title, subtitle, and call-to-action buttons
**Visual**: Full-width section with centered content, animated scroll button

#### Configuration

```yaml
- type: "Hero"
  id: "hero-section"
  enabled: true
  config:
    layout:
      spacing: "large"                  # Optional: none, small, medium, large, xl
    content:
      title: "Open Your Mind"           # Required: Main heading
      highlightedTitle: "to the Stars"  # Optional: Highlighted portion (colored)
      subTitle: "Explore the cosmos"    # Required: Subtitle/description
      primaryCta:                        # Required: Primary button
        text: "Get Started"
        href: "/signup"
        target: "_self"                  # Optional: _self, _blank
      secondaryCta:                      # Required: Secondary button
        text: "Learn More"
        href: "/about"
        target: "_self"
      showScrollButton: true             # Optional: Show animated down arrow (default: true)
      scrollTarget: "#services"          # Optional: Where scroll button scrolls to
```

#### All Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Main heading text |
| `highlightedTitle` | string | No | Part of title to highlight in primary color |
| `subTitle` | string | Yes | Subtitle/description text |
| `primaryCta` | object | Yes | Primary call-to-action button |
| `primaryCta.text` | string | Yes | Button text |
| `primaryCta.href` | string | Yes | Button link URL |
| `primaryCta.target` | string | No | Link target (_self, _blank) |
| `secondaryCta` | object | Yes | Secondary call-to-action button |
| `secondaryCta.text` | string | Yes | Button text |
| `secondaryCta.href` | string | Yes | Button link URL |
| `secondaryCta.target` | string | No | Link target (_self, _blank) |
| `showScrollButton` | boolean | No | Show animated scroll arrow (default: true) |
| `scrollTarget` | string | No | CSS selector for scroll target (default: "#services-section") |

#### Styling Notes

- Full viewport height
- Centered content
- Fade-in animation on load
- Primary button: black background, white text
- Secondary button: transparent with black border
- Scroll button: animated bounce effect

---

### Services

**Type**: `"Services"`
**Purpose**: Grid of service offerings with icons and descriptions
**Visual**: 2-column grid (desktop) with icon, title, and description

#### Configuration

```yaml
- type: "Services"
  id: "services-section"
  enabled: true
  config:
    layout:
      columns: 2                        # Optional: Number of columns (1-4)
      spacing: "large"
    content:
      title: "Our Services"             # Required: Section heading
      services:                          # Required: Array of services
        - title: "Web Development"      # Required: Service name
          icon: "DevIcon"               # Required: Icon name (see Icon Reference)
          description: "Custom sites"   # Required: Service description
        - title: "SEO Optimization"
          icon: "FileIcon"
          description: "Boost rankings"
        - title: "Cloud Hosting"
          icon: "PlanetIcon"
          description: "Fast & reliable"
```

#### All Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Section heading |
| `services` | array | Yes | Array of service items |
| `services[].title` | string | Yes | Service name |
| `services[].icon` | Icon | Yes | Icon identifier (see Icon Reference) |
| `services[].description` | string | Yes | Service description |

#### Layout Options

- Default: 2 columns on desktop, 1 on mobile
- Supports 1-4 columns via `layout.columns`
- Auto-adjusts for mobile

---

### Adventajes

**Type**: `"Adventajes"`
**Purpose**: Showcase key benefits/advantages with side-by-side image and content
**Visual**: Alternating image-text layout (zigzag pattern)

#### Configuration

```yaml
- type: "Adventajes"
  id: "benefits-section"
  enabled: true
  config:
    layout:
      spacing: "large"
    content:
      title: "Why Choose Us"            # Required: Section heading
      adventajes:                        # Required: Array of benefits
        - title: "Professional Design"  # Required: Benefit title
          description: "Clean layouts"  # Required: Benefit description
          img: "template.webp"          # Required: Image filename (in /public)
          imageAlt: "Template preview"  # Required: Image alt text
          checks:                        # Required: Array of bullet points
            - "Modern design"
            - "Mobile responsive"
            - "Fast loading"
        - title: "SEO Optimized"
          description: "Rank higher"
          img: "seo.webp"
          imageAlt: "SEO illustration"
          checks:
            - "Clean HTML"
            - "Fast performance"
            - "Schema markup"
```

#### All Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Section heading |
| `adventajes` | array | Yes | Array of benefit items |
| `adventajes[].title` | string | Yes | Benefit title |
| `adventajes[].description` | string | Yes | Benefit description (longer text) |
| `adventajes[].img` | string | Yes | Image filename (relative to /public) |
| `adventajes[].imageAlt` | string | Yes | Alt text for accessibility |
| `adventajes[].checks` | array | Yes | Array of bullet points/features |

#### Layout Notes

- Automatically alternates image position (left/right)
- First item: image on left
- Second item: image on right
- Continues alternating
- Mobile: stacks vertically

---

### Brands

**Type**: `"Brands"`
**Purpose**: Display technology partners, integrations, or brand logos
**Visual**: Grid of clickable logo icons with labels

#### Configuration

```yaml
- type: "Brands"
  id: "integrations"
  enabled: true
  config:
    layout:
      spacing: "medium"
    content:
      title: "Technology Partners"      # Required: Section heading
      description: "We integrate with"  # Required: Section description
      brands:                            # Required: Array of brands
        - label: "React"                # Required: Brand name
          icon: "ReactIcon"             # Required: Icon name
          href: "https://react.dev/"    # Required: Link URL
        - label: "Vue"
          icon: "VueIcon"
          href: "https://vuejs.org/"
        - label: "Svelte"
          icon: "SvelteIcon"
          href: "https://svelte.dev/"
```

#### All Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Section heading |
| `description` | string | Yes | Section description |
| `brands` | array | Yes | Array of brand/tech items |
| `brands[].label` | string | Yes | Brand/technology name |
| `brands[].icon` | Icon | Yes | Icon identifier (see Icon Reference) |
| `brands[].href` | string | Yes | Link to brand/tech website |

#### Styling Notes

- Responsive grid
- Hover effects on icons
- All links open in new tab
- Icons are clickable

---

### Pricing

**Type**: `"Pricing"`
**Purpose**: Display pricing tiers with features and call-to-action
**Visual**: Card-based layout, typically 3 columns

#### Configuration

```yaml
- type: "Pricing"
  id: "pricing-section"
  enabled: true
  config:
    layout:
      columns: 3                        # Optional: Number of pricing tiers
      spacing: "xl"
    content:
      title: "Choose Your Plan"         # Required: Section heading
      tiers:                             # Required: Array of pricing tiers
        - title: "Starter"              # Required: Plan name
          description: "For individuals" # Required: Plan description
          price:
            amount: "Free"              # Required: Price (can be text or number)
            period: ""                  # Optional: Billing period (/month, /year)
          features:                      # Required: Array of features
            - "5 projects"
            - "Basic support"
            - "1 GB storage"
          cta: "Get Started"            # Required: Button text
          ctaHref: "/signup"            # Optional: Button link (default: "#")
        - title: "Professional"
          description: "For small teams"
          price:
            amount: "$29"
            period: "/month"
          features:
            - "Unlimited projects"
            - "Priority support"
            - "10 GB storage"
            - "Advanced analytics"
          cta: "Start Trial"
          ctaHref: "/signup?plan=pro"
```

#### All Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Section heading |
| `tiers` | array | Yes | Array of pricing plans |
| `tiers[].title` | string | Yes | Plan name |
| `tiers[].description` | string | Yes | Plan description |
| `tiers[].price.amount` | string | Yes | Price amount (e.g., "Free", "$29") |
| `tiers[].price.period` | string | No | Billing period (e.g., "/month") |
| `tiers[].features` | array | Yes | Array of feature descriptions |
| `tiers[].cta` | string | Yes | Call-to-action button text |
| `tiers[].ctaHref` | string | No | Button link URL (default: "#") |

#### Layout Options

- Default: 3 columns on desktop
- Adjust via `layout.columns` (1-4)
- Mobile: Always 1 column (stacked)
- Each feature gets a checkmark icon

---

### Footer

**Type**: `"Footer"`
**Purpose**: Site footer with links and social media
**Location**: Typically used in `footer:` section of YAML
**Visual**: Full-width footer with columns

#### Configuration

```yaml
footer:
  type: "Footer"
  enabled: true
  config:
    content:
      logo: "Your Brand"                # Required: Brand name
      description: "Brief tagline"      # Required: Company description
      links:                             # Required: Footer links
        - label: "About"
          href: "/about"
        - label: "Services"
          href: "/services"
        - label: "Contact"
          href: "/contact"
        - label: "Privacy"
          href: "/privacy"
      socials:                           # Required: Social media links
        - icon: "GithubIcon"
          href: "https://github.com/yourcompany"
        - icon: "TwitterIcon"
          href: "https://twitter.com/yourcompany"
        - icon: "InstagramIcon"
          href: "https://instagram.com/yourcompany"
        - icon: "FacebookIcon"
          href: "https://facebook.com/yourcompany"
```

#### All Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `logo` | string | Yes | Brand name or company name |
| `description` | string | Yes | Company tagline or description |
| `links` | array | Yes | Array of footer navigation links |
| `links[].label` | string | Yes | Link text |
| `links[].href` | string | Yes | Link URL |
| `socials` | array | Yes | Array of social media links |
| `socials[].icon` | Icon | Yes | Social media icon (see Icon Reference) |
| `socials[].href` | string | Yes | Social media profile URL |

---

## Layout Options

All components support optional layout configuration:

### Spacing

Controls vertical space around the component:

```yaml
config:
  layout:
    spacing: "large"  # Options: none, small, medium, large, xl
```

**Values:**
- `none` - No extra spacing
- `small` - 2.5rem (40px) gap
- `medium` - 5rem (80px) gap - **Default**
- `large` - 7rem (112px) gap
- `xl` - 12rem (192px) gap

### Columns

For grid-based components (Services, Pricing, Brands):

```yaml
config:
  layout:
    columns: 3  # Number of columns (1-4)
```

**Notes:**
- Automatically responsive (fewer columns on mobile)
- Not all components support this option

### Container Width

Set at page level:

```yaml
layout:
  containerWidth: "3/4"  # Options: full, 3/4, 2/3, 1/2
```

**Values:**
- `full` - Full viewport width
- `3/4` - 75% width - **Default**
- `2/3` - 66.67% width
- `1/2` - 50% width

---

## Icon Reference

### Available Icons

Icons are referenced by name in component configurations. All icons are typed and validated.

#### Common Icons
- `DevIcon` - Development/code icon
- `FileIcon` - File/document icon
- `PlanetIcon` - Globe/world icon
- `ConfigIcon` - Settings/configuration icon
- `CheckIcon` - Checkmark (used automatically in features)

#### Social Media Icons
- `InstagramIcon` - Instagram logo
- `GithubIcon` - GitHub logo
- `TwitterIcon` - Twitter/X logo
- `FacebookIcon` - Facebook logo

#### Technology Icons
- `ReactIcon` - React logo
- `SvelteIcon` - Svelte logo
- `SolidIcon` - SolidJS logo
- `VueIcon` - Vue.js logo
- `VercelIcon` - Vercel logo
- `NetlifyIcon` - Netlify logo

### Using Icons

```yaml
# In Services component
services:
  - title: "Development"
    icon: "DevIcon"        # Just use the icon name
    description: "..."

# In Brands component
brands:
  - label: "React"
    icon: "ReactIcon"      # Technology icons
    href: "https://react.dev"

# In Footer component
socials:
  - icon: "GithubIcon"     # Social media icons
    href: "https://github.com/you"
```

### Adding New Icons

See `CLAUDE.md` for instructions on adding new icons to the system.

---

## Common Patterns

### Standard Landing Page Structure

```yaml
header:
  type: "Header"
  # ... header config

components:
  - type: "Hero"           # 1. Hero section
  - type: "Services"       # 2. What you offer
  - type: "Adventajes"     # 3. Why choose you
  - type: "Brands"         # 4. Partners/integrations
  - type: "Pricing"        # 5. Pricing plans

footer:
  type: "Footer"
  # ... footer config
```

### About Page Structure

```yaml
components:
  - type: "Hero"           # Company mission
  - type: "Adventajes"     # Company values/story
  - type: "Services"       # What we do
  - type: "Brands"         # Partners/technologies
```

### Pricing Page Structure

```yaml
components:
  - type: "Hero"           # Pricing headline
  - type: "Pricing"        # Pricing tiers
  - type: "Services"       # Features comparison
```

### Enabling/Disabling Components

Temporarily hide a component without deleting its configuration:

```yaml
components:
  - type: "Hero"
    enabled: true          # Shown

  - type: "Brands"
    enabled: false         # Hidden but config preserved
    config:
      # ... all configuration stays here

  - type: "Services"
    enabled: true          # Shown
```

### Reordering Components

Simply cut and paste component blocks in the YAML file:

```yaml
# Move Pricing before Services
components:
  - type: "Hero"
  - type: "Pricing"        # Moved up
  - type: "Services"       # Moved down
  - type: "Brands"
```

---

## Quick Reference Table

| Component | Type | Primary Use | Supports Columns | Icon Support |
|-----------|------|-------------|------------------|--------------|
| Header | `"Header"` | Navigation | No | No |
| Hero | `"Hero"` | Main landing section | No | No |
| Services | `"Services"` | Feature/service grid | Yes | Yes |
| Adventajes | `"Adventajes"` | Benefits showcase | No | No |
| Brands | `"Brands"` | Partner/tech logos | No | Yes |
| Pricing | `"Pricing"` | Pricing tiers | Yes | No |
| Footer | `"Footer"` | Site footer | No | Yes |

---

## Tips for Building Pages

1. **Start with a template**: Copy `home.yaml` structure
2. **Use consistent spacing**: Stick to `medium` or `large` for visual rhythm
3. **Keep it simple**: 3-5 components per page is often enough
4. **Test on mobile**: View on different screen sizes
5. **Use meaningful IDs**: Makes linking and debugging easier
6. **Enable/disable for testing**: Use `enabled: false` to test layouts
7. **Validate before deploy**: Run `pnpm build` to catch errors

---

## Need Help?

- **Adding new components**: See `CLAUDE.md` → "Adding New Component Types"
- **Migration guide**: See `yaml-summary.md`
- **TypeScript errors**: Check `src/config/page.interface.ts` for required fields
- **Build errors**: Component type not found? Check it's registered in `component-registry.ts`

---

**Last Updated**: 2025-10-20
**Components**: 7 total
**Icons**: 15 available
