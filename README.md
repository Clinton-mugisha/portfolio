# Portfolio Website - Clinton Mugisha

A beautiful, responsive portfolio website for a software developer with UI/UX skills. Built with HTML5, CSS3, and vanilla JavaScript.

## Features

- 🎨 Modern, clean design with gradient backgrounds
- 📱 Fully responsive design for all devices
- ✨ Smooth animations and hover effects
- 🎯 Interactive navigation with smooth scrolling
- 📊 Animated statistics counters
- 💌 Working contact form with validation
- 🚀 Fast loading with optimized animations
- 📧 Notification system for form submissions

## Sections

1. **Hero Section** - Introduction with animated typing effect
2. **About** - Personal information and statistics
3. **Skills** - Technical skills organized by category
4. **Projects** - Portfolio showcasing development and design work
5. **Contact** - Contact form and information

## Quick Start

1. Open `index.html` in your browser
2. Or serve it locally:
   ```bash
   python3 -m http.server 8000
   # Visit http://localhost:8000
   ```

## Customization Guide

### Personal Information

**Update your details in `index.html`:**

- Change name in `<title>` and hero section
- Update the hero description
- Modify contact information (email, phone, location)
- Update social media links in the footer

### Colors & Branding

**Main colors can be changed in `styles.css`:**

```css
/* Primary gradient colors */
#667eea /* Blue */
#764ba2 /* Purple */

/* To change, find and replace these hex codes throughout the CSS file */
```

### Skills & Technologies

**Update your skills in the skills section:**

```html
<!-- In index.html, find the skills section and update -->
<div class="skill-items">
    <span class="skill-item">Your Skill</span>
    <!-- Add more skills -->
</div>
```

### Projects

**Replace placeholder projects with your own:**

1. Update project titles and descriptions
2. Change project technologies
3. Add real project links (replace `#` with actual URLs)
4. You can add project screenshots by replacing the gradient backgrounds

### Contact Form

The contact form currently shows a success message simulation. To make it functional:

1. Set up a backend service (Node.js, PHP, etc.)
2. Update the form action in `script.js`
3. Or integrate with services like Formspree, Netlify Forms, or EmailJS

### Images

To add your own images:

1. Create an `images` folder
2. Add your photos/project screenshots
3. Update the CSS to use your images:

```css
/* Example: Add your profile photo */
.profile-bg {
    background-image: url('./images/profile-photo.jpg');
    background-size: cover;
    background-position: center;
}
```

### Fonts

The site uses Inter font from Google Fonts. To change:

1. Update the Google Fonts link in `index.html`
2. Update the font-family in `styles.css`

## File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js          # JavaScript functionality
└── README.md          # This file
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Performance Tips

- Images are optimized with CSS gradients for fast loading
- Animations are GPU-accelerated
- CSS and JS are minified for production use

## Deployment

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Your site will be available at `username.github.io/repository-name`

### Netlify
1. Drag and drop the folder to Netlify
2. Your site will be live instantly

### Vercel
1. Connect your GitHub repository
2. Deploy automatically on every push

## Customization Examples

### Change Color Scheme

```css
/* Replace the gradient colors */
:root {
    --primary-color: #your-color;
    --secondary-color: #your-second-color;
}
```

### Add More Animations

```css
/* Add to styles.css */
@keyframes your-animation {
    from { opacity: 0; }
    to { opacity: 1; }
}

.your-element {
    animation: your-animation 1s ease;
}
```

### Add New Sections

1. Add HTML structure in `index.html`
2. Add corresponding styles in `styles.css`
3. Update navigation links

## Support

If you encounter any issues or need help customizing:

1. Check browser console for errors
2. Ensure all files are in the same directory
3. Make sure you're serving the files through a web server (not just opening HTML files directly)

## Credits

- Font Awesome icons
- Google Fonts (Inter)
- CSS Grid and Flexbox for layouts

---

**Made with ❤️ for Clinton Mugisha's Portfolio**

Feel free to modify and use this template for your own portfolio!
