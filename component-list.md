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
   - [FAQ](#faq)
   - [CallToAction](#calltoaction)
   - [Testimonials](#testimonials)
   - [Stats](#stats)
   - [Steps](#steps)
   - [Team](#team)
   - [ContactForm](#contactform)
   - [Newsletter](#newsletter)
   - [ContentGrid](#contentgrid)
   - [Features2](#features2)
   - [Content](#content)
   - [LogoCloud](#logocloud)
   - [Comparison](#comparison)
   - [Gallery](#gallery)
3. [Layout Options](#layout-options)
4. [Style Options (Variants & Themes)](#style-options-variants--themes)
5. [Icon Reference](#icon-reference)
6. [Common Patterns](#common-patterns)

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

### FAQ

**Type**: `"FAQ"`
**Purpose**: Frequently Asked Questions with collapsible answers
**Visual**: Two-column grid of expandable question cards

#### Configuration

```yaml
- type: "FAQ"
  id: "faq-section"
  enabled: true
  config:
    content:
      title: "Frequently Asked Questions"
      description: "Find answers to common questions"
      faqs:
        - question: "How does it work?"
          answer: "Our platform provides..."
          icon: "CheckIcon"
        - question: "Is it secure?"
          answer: "Yes, we use industry-standard encryption..."
```

#### All Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Section heading |
| `description` | string | No | Section description |
| `faqs` | array | Yes | Array of FAQ items |
| `faqs[].question` | string | Yes | The question |
| `faqs[].answer` | string | Yes | The answer |
| `faqs[].icon` | Icon | No | Optional icon (default: CheckIcon) |

---

### CallToAction

**Type**: `"CallToAction"`
**Purpose**: Prominent call-to-action banner with gradient background
**Visual**: Full-width colored gradient card with CTAs

#### Configuration

```yaml
- type: "CallToAction"
  id: "cta-section"
  enabled: true
  config:
    content:
      title: "Ready to Get Started?"
      subtitle: "Join thousands of satisfied customers"
      tagline: "Limited Time Offer"
      primaryCta:
        text: "Start Free Trial"
        href: "/signup"
        target: "_self"
      secondaryCta:
        text: "Learn More"
        href: "/about"
      note: "No credit card required"
```

#### All Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Main CTA heading |
| `subtitle` | string | No | Supporting text |
| `tagline` | string | No | Small tag above title |
| `primaryCta` | object | No | Primary button |
| `primaryCta.text` | string | Yes | Button text |
| `primaryCta.href` | string | Yes | Button link |
| `primaryCta.target` | string | No | Link target |
| `secondaryCta` | object | No | Secondary button |
| `note` | string | No | Small disclaimer text |

---

### Testimonials

**Type**: `"Testimonials"`
**Purpose**: Customer testimonials and reviews
**Visual**: Grid of testimonial cards with photos and ratings

#### Configuration

```yaml
- type: "Testimonials"
  id: "testimonials"
  enabled: true
  config:
    content:
      title: "What Our Clients Say"
      subtitle: "Trusted by industry leaders"
      testimonials:
        - quote: "Exceptional service and support!"
          name: "John Doe"
          title: "CEO"
          company: "Tech Corp"
          image: "/testimonial1.jpg"
          rating: 5
        - quote: "Transformed our business"
          name: "Jane Smith"
          company: "Startup Inc"
          rating: 5
```

#### All Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Section heading |
| `subtitle` | string | No | Section subtitle |
| `testimonials` | array | Yes | Array of testimonials |
| `testimonials[].quote` | string | Yes | The testimonial text |
| `testimonials[].name` | string | Yes | Person's name |
| `testimonials[].title` | string | No | Job title |
| `testimonials[].company` | string | No | Company name |
| `testimonials[].image` | string | No | Photo URL |
| `testimonials[].rating` | number | No | Star rating (1-5) |

---

### Stats

**Type**: `"Stats"`
**Purpose**: Display impressive statistics and metrics
**Visual**: Horizontal row of large numbers with labels

#### Configuration

```yaml
- type: "Stats"
  id: "stats-section"
  enabled: true
  config:
    content:
      title: "Our Impact"
      subtitle: "Numbers that speak for themselves"
      stats:
        - amount: "10K+"
          label: "Happy Customers"
          description: "Across 50 countries"
          icon: "CheckIcon"
        - amount: "99.9%"
          label: "Uptime"
          description: "Enterprise reliability"
```

#### All Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Section heading |
| `subtitle` | string | No | Section subtitle |
| `stats` | array | Yes | Array of stats |
| `stats[].amount` | string | Yes | The number/statistic |
| `stats[].label` | string | Yes | Stat description |
| `stats[].description` | string | No | Additional context |
| `stats[].icon` | Icon | No | Optional icon |

---

### Steps

**Type**: `"Steps"`
**Purpose**: Show a process or workflow in sequential steps
**Visual**: Vertical timeline with numbered steps

#### Configuration

```yaml
- type: "Steps"
  id: "how-it-works"
  enabled: true
  config:
    content:
      title: "How It Works"
      subtitle: "Get started in 3 easy steps"
      steps:
        - title: "Sign Up"
          description: "Create your free account"
          icon: "CheckIcon"
          details:
            - "No credit card required"
            - "Free 14-day trial"
        - title: "Configure"
          description: "Set up your preferences"
        - title: "Launch"
          description: "Go live in minutes"
```

#### All Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Section heading |
| `subtitle` | string | No | Section subtitle |
| `steps` | array | Yes | Array of steps |
| `steps[].title` | string | Yes | Step title |
| `steps[].description` | string | Yes | Step description |
| `steps[].icon` | Icon | No | Optional icon |
| `steps[].details` | array | No | Additional bullet points |

---

### Team

**Type**: `"Team"`
**Purpose**: Display team members with photos and bios
**Visual**: Grid of team member cards

#### Configuration

```yaml
- type: "Team"
  id: "team-section"
  enabled: true
  config:
    content:
      title: "Meet Our Team"
      subtitle: "The people behind our success"
      members:
        - name: "John Doe"
          title: "Founder & CEO"
          bio: "20 years of industry experience"
          image: "/team/john.jpg"
          socials:
            - icon: "TwitterIcon"
              href: "https://twitter.com/johndoe"
            - icon: "GithubIcon"
              href: "https://github.com/johndoe"
        - name: "Jane Smith"
          title: "CTO"
          image: "/team/jane.jpg"
```

#### All Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Section heading |
| `subtitle` | string | No | Section subtitle |
| `members` | array | Yes | Array of team members |
| `members[].name` | string | Yes | Person's name |
| `members[].title` | string | No | Job title |
| `members[].bio` | string | No | Short biography |
| `members[].image` | string | No | Photo URL |
| `members[].socials` | array | No | Social media links |

---

### ContactForm

**Type**: `"ContactForm"`
**Purpose**: Contact form with contact information sidebar
**Visual**: Two-column layout with form and contact details

#### Configuration

```yaml
- type: "ContactForm"
  id: "contact-section"
  enabled: true
  config:
    content:
      title: "Get In Touch"
      subtitle: "We'd love to hear from you"
      contactInfo:
        title: "Contact Information"
        description: "Reach out to us anytime"
        email: "hello@company.com"
        phone: "+1 (555) 123-4567"
        address: "123 Main St, City, ST 12345"
      fields:
        - name: "name"
          label: "Full Name"
          type: "text"
          required: true
          placeholder: "John Doe"
        - name: "email"
          label: "Email Address"
          type: "email"
          required: true
        - name: "message"
          label: "Message"
          type: "textarea"
          required: true
          rows: 4
      formAction: "/api/contact"
      formMethod: "POST"
      submitText: "Send Message"
```

#### All Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Section heading |
| `subtitle` | string | No | Section subtitle |
| `contactInfo` | object | No | Contact information panel |
| `contactInfo.email` | string | No | Email address |
| `contactInfo.phone` | string | No | Phone number |
| `contactInfo.address` | string | No | Physical address |
| `fields` | array | Yes | Form fields |
| `fields[].name` | string | Yes | Field name attribute |
| `fields[].label` | string | Yes | Field label |
| `fields[].type` | string | Yes | Field type (text, email, tel, textarea, select) |
| `fields[].required` | boolean | No | Is required? |
| `fields[].placeholder` | string | No | Placeholder text |
| `fields[].rows` | number | No | Rows for textarea |
| `fields[].options` | array | No | Options for select field |
| `formAction` | string | No | Form submission URL |
| `formMethod` | string | No | HTTP method (default: POST) |
| `submitText` | string | No | Submit button text |

---

### Newsletter

**Type**: `"Newsletter"`
**Purpose**: Email newsletter signup with prominent design
**Visual**: Gradient card with email input and benefits

#### Configuration

```yaml
- type: "Newsletter"
  id: "newsletter"
  enabled: true
  config:
    content:
      title: "Stay Updated"
      description: "Subscribe to our newsletter for the latest updates"
      placeholder: "Enter your email address"
      buttonText: "Subscribe"
      formAction: "/api/newsletter"
      formMethod: "POST"
      disclaimer: "We respect your privacy. Unsubscribe anytime."
      benefits:
        - "Weekly insights"
        - "Exclusive offers"
        - "No spam"
      icon: true
```

#### All Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Main heading |
| `description` | string | No | Supporting text |
| `placeholder` | string | No | Email input placeholder |
| `buttonText` | string | No | Submit button text |
| `formAction` | string | No | Form submission URL |
| `formMethod` | string | No | HTTP method |
| `disclaimer` | string | No | Privacy disclaimer text |
| `benefits` | array | No | List of benefits |
| `icon` | boolean | No | Show envelope icon |

---

### ContentGrid

**Type**: `"ContentGrid"`
**Purpose**: Blog posts, articles, or content cards in a grid
**Visual**: Responsive grid of content cards with images

#### Configuration

```yaml
- type: "ContentGrid"
  id: "blog-section"
  enabled: true
  config:
    content:
      title: "Latest Articles"
      subtitle: "Insights from our team"
      items:
        - title: "Getting Started Guide"
          description: "Learn the basics in 10 minutes"
          image: "/blog/article1.jpg"
          imageAlt: "Tutorial screenshot"
          category: "Tutorial"
          author: "John Doe"
          date: "2025-10-15"
          link: "/blog/getting-started"
          linkText: "Read More"
        - title: "Best Practices"
          description: "Tips from the experts"
          category: "Guide"
          link: "/blog/best-practices"
      viewAllLink: "/blog"
      viewAllText: "View All Articles"
```

#### All Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Section heading |
| `subtitle` | string | No | Section subtitle |
| `items` | array | Yes | Array of content items |
| `items[].title` | string | Yes | Item title |
| `items[].description` | string | No | Item description |
| `items[].image` | string | No | Featured image URL |
| `items[].imageAlt` | string | No | Image alt text |
| `items[].category` | string | No | Category tag |
| `items[].author` | string | No | Author name |
| `items[].date` | string | No | Publish date |
| `items[].link` | string | No | Link URL |
| `items[].linkText` | string | No | Link text |
| `viewAllLink` | string | No | "View All" button URL |
| `viewAllText` | string | No | "View All" button text |

---

### Features2

**Type**: `"Features2"`
**Purpose**: Alternate feature presentation with side-by-side layout
**Visual**: Alternating image and content blocks

#### Configuration

```yaml
- type: "Features2"
  id: "features-alt"
  enabled: true
  config:
    content:
      title: "Powerful Features"
      subtitle: "Everything you need to succeed"
      features:
        - title: "Advanced Analytics"
          description: "Track every metric that matters"
          image: "/features/analytics.jpg"
          imageAlt: "Analytics dashboard"
          icon: "DevIcon"
          badge: "New"
          benefits:
            - "Real-time reporting"
            - "Custom dashboards"
            - "Export to CSV"
          link: "/features/analytics"
          linkText: "Learn More"
        - title: "Team Collaboration"
          description: "Work together seamlessly"
          image: "/features/collaboration.jpg"
```

#### All Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Section heading |
| `subtitle` | string | No | Section subtitle |
| `features` | array | Yes | Array of features |
| `features[].title` | string | Yes | Feature title |
| `features[].description` | string | Yes | Feature description |
| `features[].image` | string | No | Feature image |
| `features[].imageAlt` | string | No | Image alt text |
| `features[].icon` | Icon | No | Optional icon |
| `features[].benefits` | array | No | List of benefits |
| `features[].link` | string | No | Link URL |
| `features[].linkText` | string | No | Link text |
| `features[].badge` | string | No | Badge text (e.g., "New") |

---

### Content

**Type**: `"Content"`
**Purpose**: Rich content blocks for about pages and long-form content
**Visual**: Flexible layout with text, images, quotes, and features

#### Configuration

```yaml
- type: "Content"
  id: "about-content"
  enabled: true
  config:
    content:
      title: "About Our Company"
      subtitle: "Building the future, one project at a time"
      blocks:
        - tagline: "Our Mission"
          title: "We Build Digital Experiences"
          description: "Since 2020, we've been helping businesses transform their digital presence.\n\nOur team of experts is dedicated to delivering exceptional results."
          features:
            - title: "Innovation First"
              description: "We stay ahead of the curve"
              icon: "DevIcon"
            - title: "Client Focused"
              description: "Your success is our success"
          image: "/about/office.jpg"
          imageAlt: "Our office"
          imageBadge: "10+ Years"
          layout: "two-column"
          cta:
            text: "Learn More"
            href: "/story"
        - quote: "The best team we've ever worked with!"
          quoteAuthor: "John Doe, CEO"
          layout: "single-column"
```

#### All Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | No | Main section title |
| `subtitle` | string | No | Section subtitle |
| `blocks` | array | Yes | Array of content blocks |
| `blocks[].tagline` | string | No | Small tag above title |
| `blocks[].title` | string | No | Block title |
| `blocks[].description` | string | No | Block text (use \n\n for paragraphs) |
| `blocks[].features` | array | No | Feature list |
| `blocks[].features[].title` | string | Yes | Feature title |
| `blocks[].features[].description` | string | No | Feature description |
| `blocks[].features[].icon` | Icon | No | Feature icon |
| `blocks[].quote` | string | No | Pull quote text |
| `blocks[].quoteAuthor` | string | No | Quote attribution |
| `blocks[].cta` | object | No | Call-to-action button |
| `blocks[].image` | string | No | Block image |
| `blocks[].imageAlt` | string | No | Image alt text |
| `blocks[].imageBadge` | string | No | Badge on image |
| `blocks[].layout` | string | No | "single-column" or "two-column" |
| `blocks[].reversed` | boolean | No | Reverse image position |

---

### LogoCloud

**Type**: `"LogoCloud"`
**Purpose**: Display partner, client, or technology logos
**Visual**: Grid of logos with grayscale hover effect

#### Configuration

```yaml
- type: "LogoCloud"
  id: "partners"
  enabled: true
  config:
    content:
      title: "Trusted By Industry Leaders"
      description: "Join thousands of companies using our platform"
      layout: "default"
      logos:
        - name: "Company A"
          image: "/logos/companya.png"
          alt: "Company A logo"
          link: "https://companya.com"
          newTab: true
        - name: "Company B"
          image: "/logos/companyb.png"
        - name: "Company C"
      cta:
        text: "See All Partners"
        href: "/partners"
```

#### All Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | No | Section heading |
| `description` | string | No | Section description |
| `layout` | string | No | "default" (3-4 cols) or "compact" (4-6 cols) |
| `logos` | array | Yes | Array of logos |
| `logos[].name` | string | Yes | Company name |
| `logos[].image` | string | No | Logo image URL |
| `logos[].alt` | string | No | Image alt text |
| `logos[].link` | string | No | Company website |
| `logos[].newTab` | boolean | No | Open in new tab |
| `cta` | object | No | Optional CTA link |

---

### Comparison

**Type**: `"Comparison"`
**Purpose**: Feature or pricing comparison table
**Visual**: Responsive table with checkmarks and values

#### Configuration

```yaml
- type: "Comparison"
  id: "plan-comparison"
  enabled: true
  config:
    content:
      title: "Compare Plans"
      description: "Find the perfect plan for your needs"
      featureColumnLabel: "Features"
      options:
        - name: "Free"
          price: "$0"
          description: "For individuals"
          badge: "Popular"
          cta:
            text: "Get Started"
            href: "/signup?plan=free"
            primary: false
        - name: "Pro"
          price: "$29/mo"
          cta:
            text: "Start Trial"
            href: "/signup?plan=pro"
            primary: true
      features:
        - name: "Projects"
          description: "Number of active projects"
          values: ["5", "Unlimited"]
        - name: "Storage"
          values: ["1 GB", "100 GB"]
        - name: "Support"
          values: [true, true]
        - name: "Advanced Analytics"
          values: [false, true]
      showCtas: true
      note: "All plans include 14-day free trial"
```

#### All Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Section heading |
| `description` | string | No | Section description |
| `featureColumnLabel` | string | No | Label for features column |
| `options` | array | Yes | Plans/options to compare |
| `options[].name` | string | Yes | Option name |
| `options[].price` | string | No | Price text |
| `options[].description` | string | No | Option description |
| `options[].badge` | string | No | Badge (e.g., "Popular") |
| `options[].cta` | object | No | Call-to-action button |
| `features` | array | Yes | Features to compare |
| `features[].name` | string | Yes | Feature name |
| `features[].description` | string | No | Feature description |
| `features[].values` | array | Yes | Values for each option (boolean or string) |
| `showCtas` | boolean | No | Show CTA buttons at bottom |
| `note` | string | No | Small note below table |

---

### Gallery

**Type**: `"Gallery"`
**Purpose**: Image gallery with multiple layout options
**Visual**: Grid, masonry, carousel, or full-width image display

#### Configuration

```yaml
- type: "Gallery"
  id: "portfolio"
  enabled: true
  config:
    content:
      title: "Our Work"
      description: "Projects we're proud of"
      layout: "grid"
      columns: 3
      images:
        - src: "/gallery/project1.jpg"
          alt: "Project 1"
          title: "E-commerce Platform"
          description: "Full-stack web application"
        - src: "/gallery/project2.jpg"
          title: "Mobile App"
        - src: "/gallery/project3.jpg"
      loadMoreText: "Load More"
```

#### All Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Section heading |
| `description` | string | No | Section description |
| `layout` | string | No | "grid", "masonry", "carousel", or "full-width" |
| `columns` | number | No | Columns for grid (2, 3, or 4) |
| `images` | array | Yes | Array of images |
| `images[].src` | string | Yes | Image URL |
| `images[].alt` | string | No | Image alt text |
| `images[].title` | string | No | Image title (shown on hover) |
| `images[].description` | string | No | Image description (shown on hover) |
| `loadMoreText` | string | No | "Load More" button text |

#### Layout Options

- **grid**: Standard responsive grid
- **masonry**: Pinterest-style layout
- **carousel**: Horizontal scrolling
- **full-width**: Large full-width images

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

## Style Options (Variants & Themes)

**NEW in v2.0**: Components now support visual variants and color themes for flexible styling directly from YAML.

### Overview

The style system provides two layers of customization:

1. **Variants**: Control the visual style (solid, gradient, outline, etc.)
2. **Themes**: Control the color palette (ocean, sunset, forest, etc.)
3. **Custom Styles**: Override specific CSS properties

### Basic Usage

```yaml
components:
  - type: "Hero"
    config:
      style:                    # Optional: Style configuration
        variant: "gradient"     # Optional: Visual style variant
        theme: "ocean"          # Optional: Color theme
        customStyles:           # Optional: Custom CSS overrides
          backgroundColor: "#FF5733"
      content:
        # ... component content
```

### Available Variants

Variants control the overall visual presentation of a component:

#### `default`
Standard solid background with default styling
- Solid white background
- Dark text on light background
- Standard buttons and cards
- **Best for**: General content sections

```yaml
style:
  variant: "default"
```

#### `dark`
Dark background with light text for contrast
- Dark gray/black background
- Light text for readability
- Inverted button styles
- **Best for**: Contrast sections, footer areas

```yaml
style:
  variant: "dark"
```

#### `light`
Light, airy background with subtle styling
- Very light gray background
- Subtle borders and shadows
- Minimal visual weight
- **Best for**: Secondary sections, testimonials

```yaml
style:
  variant: "light"
```

#### `gradient`
Vibrant gradient background (uses theme colors)
- Colorful gradient background
- White text for contrast
- Glass-morphism card effects
- **Best for**: Hero sections, call-to-action areas

```yaml
style:
  variant: "gradient"
  theme: "ocean"  # Gradient uses theme colors
```

#### `outline`
Transparent background with outlined elements
- Transparent/minimal background
- Outlined buttons and cards
- Border-focused design
- **Best for**: Overlay sections, minimalist designs

```yaml
style:
  variant: "outline"
```

### Available Themes

Themes provide pre-configured color palettes that work across all components:

#### `default`
Clean, professional palette
- Background: White (#FFFFFF)
- Text: Dark gray (#161925)
- Accent: Blue (#1D4ED8)
- **Best for**: Professional sites, B2B

```yaml
style:
  theme: "default"
```

#### `ocean`
Cool blue oceanic colors
- Background: Deep blue (#0C4A6E)
- Gradient: Blue to lighter blue
- Accent: Bright cyan (#38BDF8)
- **Best for**: Tech products, SaaS

```yaml
style:
  theme: "ocean"
  variant: "gradient"  # Shows beautiful blue gradient
```

#### `sunset`
Warm orange and red tones
- Background: Deep orange (#7C2D12)
- Gradient: Orange to red to amber
- Accent: Orange (#FB923C)
- **Best for**: Creative agencies, lifestyle brands

```yaml
style:
  theme: "sunset"
  variant: "gradient"  # Shows sunset gradient effect
```

#### `forest`
Natural green tones
- Background: Deep green (#14532D)
- Gradient: Dark to lighter green
- Accent: Bright green (#4ADE80)
- **Best for**: Environmental, health, organic brands

```yaml
style:
  theme: "forest"
```

#### `midnight`
Deep purple night sky
- Background: Deep purple (#1E1B4B)
- Gradient: Dark purple to lighter purple
- Accent: Lavender (#A78BFA)
- **Best for**: Luxury brands, creative portfolios

```yaml
style:
  theme: "midnight"
  variant: "gradient"
```

#### `lavender`
Soft purple light theme
- Background: Very light purple (#F5F3FF)
- Light, pastel aesthetic
- Accent: Purple (#9333EA)
- **Best for**: Wellness, beauty, feminine brands

```yaml
style:
  theme: "lavender"
```

### Custom Styles

Override specific CSS properties for fine-tuned control:

```yaml
style:
  variant: "default"
  customStyles:
    backgroundColor: "#FF5733"        # Custom background color
    backgroundImage: "url(/bg.jpg)"   # Background image
    textColor: "#FFFFFF"              # Text color
    borderColor: "#FF5733"            # Border color
    accentColor: "#FFA500"            # Accent/highlight color
```

**Available Custom Properties:**
- `backgroundColor` - Background color
- `backgroundImage` - Background image URL or gradient
- `textColor` - Main text color
- `borderColor` - Border color for cards/elements
- `accentColor` - Accent color for highlights/buttons

### Combining Variants and Themes

Variants and themes work together to create unique looks:

```yaml
# Professional hero with ocean gradient
- type: "Hero"
  config:
    style:
      variant: "gradient"
      theme: "ocean"
    content:
      title: "Welcome"

# Dark services section with forest theme
- type: "Services"
  config:
    style:
      variant: "dark"
      theme: "forest"
    content:
      title: "Our Services"

# Light pricing with custom accent
- type: "Pricing"
  config:
    style:
      variant: "light"
      theme: "default"
      customStyles:
        accentColor: "#FF6B6B"
    content:
      title: "Pricing"
```

### Real-World Examples

#### Example 1: Modern SaaS Landing Page

```yaml
components:
  - type: "Hero"
    config:
      style:
        variant: "gradient"
        theme: "ocean"
      content:
        title: "Transform Your Workflow"

  - type: "Services"
    config:
      style:
        variant: "light"
      content:
        title: "Features"

  - type: "Pricing"
    config:
      style:
        variant: "default"
        theme: "ocean"
      content:
        title: "Simple Pricing"
```

#### Example 2: Creative Agency Site

```yaml
components:
  - type: "Hero"
    config:
      style:
        variant: "gradient"
        theme: "sunset"
      content:
        title: "Creative Excellence"

  - type: "Services"
    config:
      style:
        variant: "outline"
      content:
        title: "What We Do"

  - type: "Adventajes"
    config:
      style:
        variant: "dark"
        theme: "midnight"
      content:
        title: "Why Choose Us"
```

#### Example 3: Organic Products Brand

```yaml
components:
  - type: "Hero"
    config:
      style:
        variant: "gradient"
        theme: "forest"
      content:
        title: "Pure & Natural"

  - type: "Services"
    config:
      style:
        variant: "light"
        theme: "forest"
      content:
        title: "Our Products"
```

### Styling Best Practices

1. **Consistency**: Use 2-3 themes max per page for visual coherence
2. **Contrast**: Alternate between light and dark variants for visual rhythm
3. **Hero Impact**: Use gradient variant with themes for hero sections
4. **Accessibility**: Ensure sufficient color contrast for readability
5. **Brand Colors**: Use customStyles to match your brand palette
6. **Mobile Testing**: Always test styles on mobile devices

### Component-Specific Notes

#### Hero Component
- Supports all variants and themes
- Gradient variant is particularly effective
- CTA buttons automatically adapt to theme colors

#### Services Component
- Light and default variants work best
- Icons automatically use theme accent colors
- Cards adapt to variant styling

#### Pricing Component
- All variants supported
- Card backgrounds use theme colors
- CTA buttons use accent colors from theme

### Troubleshooting

**Issue**: Theme colors not applying
- **Solution**: Ensure `style` is under `config`, not `content`

**Issue**: Variant classes not visible
- **Solution**: Run `pnpm build` to verify no TypeScript errors

**Issue**: Custom styles not working
- **Solution**: Use camelCase for property names (backgroundColor, not background-color)

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
| FAQ | `"FAQ"` | Collapsible Q&A | No | Yes |
| CallToAction | `"CallToAction"` | Prominent CTA banner | No | No |
| Testimonials | `"Testimonials"` | Customer reviews | Yes | No |
| Stats | `"Stats"` | Metrics display | No | Yes |
| Steps | `"Steps"` | Process/workflow | No | Yes |
| Team | `"Team"` | Team member profiles | Yes | Yes (socials) |
| ContactForm | `"ContactForm"` | Contact page | No | No |
| Newsletter | `"Newsletter"` | Email signup | No | Yes |
| ContentGrid | `"ContentGrid"` | Blog/article grid | Yes | No |
| Features2 | `"Features2"` | Alternating features | No | Yes |
| Content | `"Content"` | Rich content blocks | No | Yes |
| LogoCloud | `"LogoCloud"` | Client/partner logos | No | No |
| Comparison | `"Comparison"` | Feature comparison table | No | No |
| Gallery | `"Gallery"` | Image gallery | Yes | No |

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
**Components**: 21 total (Header, Hero, Services, Adventajes, Brands, Pricing, Footer, FAQ, CallToAction, Testimonials, Stats, Steps, Team, ContactForm, Newsletter, ContentGrid, Features2, Content, LogoCloud, Comparison, Gallery)
**Icons**: 15 available
**Variants**: 5 available (default, dark, light, gradient, outline)
**Themes**: 6 available (default, ocean, sunset, forest, midnight, lavender)
