# Ridgeline Audio - Utah Wedding DJ Website

A professional wedding DJ website for Ridgeline Audio, built with modern glassmorphism design using Vite + Vanilla JavaScript. Deploy-ready for Vercel with GitHub integration.

## 🎵 Features

### Design & UX
- **Glassmorphism Design**: Modern semi-transparent cards with backdrop-filter blur effects
- **Utah Mountain Theme**: Utah-inspired color palette and imagery
- **Mobile-First Responsive**: Optimized for all devices
- **Smooth Animations**: Subtle hover effects and scroll animations
- **Professional Typography**: Clean, modern fonts with excellent readability

### Technical Features
- **Vite Build System**: Fast development and optimized production builds
- **Vanilla JavaScript**: No framework dependencies, lightweight and fast
- **SEO Optimized**: Utah-focused SEO with local business schema markup
- **Performance Optimized**: Lazy loading, image optimization, fast loading times
- **Accessibility Compliant**: ARIA labels, semantic HTML, keyboard navigation
- **Contact Forms**: Netlify Forms integration ready

### Content & Pages
- **Homepage**: Hero section, services overview, testimonials, CTA
- **Services**: Wedding packages, ceremony audio, reception DJ, lighting
- **About**: Jordan's story, equipment, credentials, personal touch
- **Portfolio**: Filterable gallery, Utah venue showcase, testimonials
- **Contact**: Contact form, service areas, FAQ section

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/ridgeline-audio-website.git
cd ridgeline-audio-website

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
ridgeline-audio-website/
├── index.html              # Homepage
├── services.html           # Services page
├── about.html             # About page
├── portfolio.html         # Portfolio page
├── contact.html           # Contact page
├── src/
│   ├── css/
│   │   ├── main.css       # Base styles and glassmorphism framework
│   │   ├── navigation.css # Navigation and mobile menu
│   │   ├── hero.css       # Hero sections and components
│   │   ├── animations.css # Scroll animations and effects
│   │   ├── contact.css    # Contact page specific styles
│   │   ├── services.css   # Services page specific styles
│   │   └── portfolio.css  # Portfolio page specific styles
│   └── js/
│       ├── main.js        # Main JavaScript functionality
│       └── portfolio.js   # Portfolio filtering and lightbox
├── assets/
│   └── images/           # Website images and placeholders
├── package.json          # Project dependencies and scripts
├── vite.config.js        # Vite configuration
├── vercel.json           # Vercel deployment configuration
└── README.md             # Project documentation
```

## 🎨 Glassmorphism Design System

### CSS Custom Properties
The design system uses CSS custom properties for consistent styling:

```css
:root {
  /* Glass Effects */
  --glass-white: rgba(255, 255, 255, 0.15);
  --glass-white-light: rgba(255, 255, 255, 0.1);
  --glass-white-strong: rgba(255, 255, 255, 0.25);
  
  /* Shadows */
  --shadow-glass: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  --shadow-glass-hover: 0 12px 40px 0 rgba(31, 38, 135, 0.45);
  
  /* Utah Mountain Colors */
  --mountain-blue: #1e40af;
  --mountain-gray: #6b7280;
  --accent-blue: #3b82f6;
  --accent-orange: #f59e0b;
}
```

### Glass Components
- `.glass` - Standard glassmorphism card
- `.glass-light` - Lighter transparency
- `.glass-strong` - Stronger transparency for important elements

## 🔧 Configuration

### Netlify Forms Setup
Add the following attributes to your contact form:
```html
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
```

### Google Analytics
Add your Google Analytics tracking code to the `<head>` section of each HTML file.

### Contact Information
Update contact details in:
- All HTML files (phone numbers, email addresses)
- Schema markup in `index.html`

## 📱 SEO & Local Business Optimization

### Utah-Focused Keywords
- "Wedding DJ Utah"
- "Salt Lake City wedding DJ"
- "Park City wedding entertainment"
- "Utah wedding ceremony audio"
- "Wasatch Front DJ services"

### Schema Markup
Local business schema is included for:
- Business name and description
- Contact information
- Service areas (Salt Lake City, Park City, Provo, Ogden)
- Geographic coordinates

### Meta Tags
Each page includes optimized:
- Title tags with Utah locations
- Meta descriptions with local keywords
- Open Graph tags for social sharing

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Import the project
3. Deploy automatically on push to main branch

### Netlify
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

### Manual Deployment
```bash
npm run build
# Upload the dist/ folder to your web server
```

## 🖼️ Images & Assets

Replace placeholder images in `assets/images/` with:
- Professional wedding DJ photos
- Utah mountain/venue backgrounds
- Equipment setup shots
- Portfolio wedding images

See `assets/images/placeholder-info.md` for detailed image requirements.

## 🎯 Performance Optimization

### Implemented Optimizations
- Lazy loading for images
- CSS and JavaScript minification
- Efficient glassmorphism effects
- Optimized animations with reduced motion support
- Preconnect to external fonts

### Recommended Additions
- WebP image format conversion
- CDN for image delivery
- Service worker for caching
- Further image compression

## 🧪 Testing

### Cross-Browser Testing
Test on:
- Chrome, Firefox, Safari, Edge
- iOS Safari, Android Chrome
- Various screen sizes and resolutions

### Performance Testing
- Lighthouse audit (aim for 90+ scores)
- PageSpeed Insights
- GTmetrix analysis

### Accessibility Testing
- Screen reader compatibility
- Keyboard navigation
- Color contrast ratios
- ARIA label accuracy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or support regarding the Ridgeline Audio website:
- Email: info@ridgelineaudio.com
- Phone: (801) 555-0123

---

**Built with modern web technologies for Utah's premier wedding DJ service** 🏔️🎵 