![image](https://github.com/JimmyCamus/luna-landing/assets/86853554/7dc4c571-bb33-4e55-ae94-446b056539a0)




# Luna Landing

Luna Landing is an innovative and highly customizable landing page system that allows you to create and modify your website easily and quickly through YAML configuration files. Harnessing the power of Astro, a modern and efficient web development tool, Luna Landing provides you with an unparalleled development experience, enabling you to focus on your site's design and content without worrying about the complexity of code.

## Key Features

### 🎨 YAML-Driven Page Composition
- **Complete Control**: Build entire pages by editing YAML files in `src/data/pages/`
- **Component Ordering**: Add, remove, and reorder components without touching code
- **Enable/Disable**: Turn components on/off with a simple boolean flag
- **Type-Safe**: Full TypeScript validation ensures error-free configurations

### 🎭 Visual Styling System (NEW)
- **5 Variants**: Choose from default, dark, light, gradient, or outline styles
- **6 Themes**: Apply pre-configured color palettes (ocean, sunset, forest, midnight, lavender, default)
- **Custom Styles**: Override any CSS property directly from YAML
- **Mix & Match**: Combine variants and themes for unlimited visual possibilities

### 🚀 Performance & Modern Stack
- **Extreme Customization**: Customize every aspect of your website through YAML configuration
- **Efficiency and Speed**: Thanks to Astro, Luna Landing delivers fast load times and exceptional performance
- **Total Adaptability**: Fully responsive design works flawlessly on any device
- **Zero JavaScript**: Static site generation for maximum performance

### 🔧 Developer Experience
- **Component Registry**: Dynamic component loading with validation
- **Hot Module Reload**: See changes instantly during development
- **Build-Time Validation**: Catch errors before deployment
- **Comprehensive Docs**: Complete reference in `component-list.md` and `CLAUDE.md`

### 📦 7 Ready-to-Use Components
- **Header**: Navigation bar with logo and links
- **Hero**: Eye-catching hero sections with CTAs
- **Services**: Feature/service grids with icons
- **Adventajes**: Side-by-side benefit showcases
- **Brands**: Technology partner logos
- **Pricing**: Pricing tiers with features
- **Footer**: Site footer with links and socials

## Quick Start

### 1. Prerequisites

```sh
npm install -g pnpm
```

### 2. Install Dependencies

```sh
pnpm install
```

### 3. Run Development Server

```sh
pnpm dev
```

Visit `http://localhost:4321` to see your site.

### 4. Build for Production

```sh
pnpm build
```

## Usage

### Creating Your First Page

1. **Edit the YAML file** at `src/data/pages/home.yaml`
2. **Customize the content** - change text, images, links
3. **Reorder components** - cut and paste component blocks
4. **Apply styling** - add variants and themes
5. **Preview changes** - save and refresh your browser

### Example: Adding a Styled Hero Section

```yaml
components:
  - type: "Hero"
    id: "main-hero"
    enabled: true
    config:
      style:
        variant: "gradient"      # Vibrant gradient background
        theme: "ocean"           # Blue color palette
      content:
        title: "Transform Your Business"
        highlightedTitle: "Today"
        subTitle: "Modern solutions for modern problems"
        primaryCta:
          text: "Get Started"
          href: "/signup"
        secondaryCta:
          text: "Learn More"
          href: "/about"
```

### Example: Services with Forest Theme

```yaml
components:
  - type: "Services"
    id: "our-services"
    config:
      style:
        variant: "light"
        theme: "forest"          # Green color palette
      layout:
        spacing: "large"
        columns: 3
      content:
        title: "What We Offer"
        services:
          - title: "Web Development"
            icon: "DevIcon"
            description: "Custom websites built with modern tech"
          - title: "SEO Optimization"
            icon: "FileIcon"
            description: "Rank higher in search results"
```

### Styling Your Components

Apply visual styles directly in YAML:

```yaml
config:
  style:
    variant: "gradient"          # Options: default, dark, light, gradient, outline
    theme: "ocean"               # Options: default, ocean, sunset, forest, midnight, lavender
    customStyles:
      accentColor: "#FF5733"     # Override specific colors
```

**Available Variants:**
- `default` - Standard white background
- `dark` - Dark background with light text
- `light` - Subtle light gray background
- `gradient` - Vibrant gradient (uses theme colors)
- `outline` - Transparent with outlined elements

**Available Themes:**
- `default` - Professional blue
- `ocean` - Cool blues and cyans
- `sunset` - Warm oranges and reds
- `forest` - Natural greens
- `midnight` - Deep purples
- `lavender` - Soft pastel purple

## 🛠️ Tech Stack

- **[Astro](https://astro.build)** - Modern static site generator
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[js-yaml](https://github.com/nodeca/js-yaml)** - YAML parser for configuration

## 📁 Project Structure

```
startupcontinuity-website/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── PageRenderer.astro   # Dynamic component renderer
│   │   ├── Action.astro         # CTA button component
│   │   └── ...
│   ├── config/              # Configuration & type definitions
│   │   ├── page.interface.ts    # TypeScript interfaces
│   │   ├── component-registry.ts # Component registry
│   │   ├── themes.ts            # Theme definitions
│   │   └── variants.ts          # Variant definitions
│   ├── data/
│   │   └── pages/           # YAML page configurations
│   │       └── home.yaml        # Home page config
│   ├── icons/               # Icon components
│   ├── layouts/             # Page layouts
│   │   └── Layout.astro         # Main layout
│   ├── sections/            # Section components
│   │   ├── Hero.astro
│   │   ├── Services.astro
│   │   ├── Pricing.astro
│   │   └── ...
│   ├── services/            # Business logic
│   │   └── page.service.ts      # YAML loader & validator
│   └── pages/               # Astro pages
│       └── index.astro          # Home page
├── public/                  # Static assets
├── component-list.md        # Component reference guide
├── CLAUDE.md               # Developer documentation
└── yaml-summary.md         # YAML system guide
```

## 📚 Documentation

- **[component-list.md](./component-list.md)** - Complete component reference with all fields, options, and examples
- **[CLAUDE.md](./CLAUDE.md)** - Developer guide for the YAML architecture and component creation
- **[yaml-summary.md](./yaml-summary.md)** - Detailed implementation guide for the YAML system

## 🎯 Use Cases

Luna Landing is perfect for:

- **SaaS Landing Pages** - Showcase your software product with ocean theme
- **Creative Agencies** - Portfolio sites with sunset gradient hero sections
- **E-commerce** - Product landing pages with customizable pricing tiers
- **Startups** - MVP websites that can be updated without code changes
- **Personal Brands** - Professional presence with minimal maintenance
- **Client Projects** - Quickly customize and deploy branded sites

## 🚀 Deployment

Luna Landing generates static HTML, CSS, and JavaScript, making it deployable anywhere:

- **[Vercel](https://vercel.com)** - Zero-config deployment
- **[Netlify](https://netlify.com)** - Continuous deployment from Git
- **[GitHub Pages](https://pages.github.com)** - Free hosting for public repos
- **Any Static Host** - Upload the `dist/` folder

## 🤝 Contributing

Contributions are welcome! To add new components or features:

1. Create a new component in `src/sections/`
2. Add TypeScript interface to `src/config/page.interface.ts`
3. Register in `src/config/component-registry.ts`
4. Document in `component-list.md`
5. Test with `pnpm build`

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Credits

Built with [Astro](https://astro.build) and inspired by modern component-driven design systems.

---

**Version**: 2.0.0 (with Variants & Themes)
**Last Updated**: 2025-10-20
**Components**: 7 | **Variants**: 5 | **Themes**: 6
