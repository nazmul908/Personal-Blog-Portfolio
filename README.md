<div align="center">

# 🚀 Nazmul Haque - Personal Blog & Portfolio

![Profile Banner](./assets/images/nazmul-avatar.png)

### **Full-Stack Developer | ML Engineer | EEE Student**

[![GitHub followers](https://img.shields.io/github/followers/nazmul-haque-nihal?style=social)](https://github.com/nazmul-haque-nihal&tab=followers)
[![GitHub stars](https://img.shields.io/github/stars/nazmul-haque-nihal?style=social)](https://github.com/nazmul-haque-nihal?tab=repositories)
[![Website](https://img.shields.io/badge/Website-Live-blue?style=flat-square&logo=google-chrome)](#)
[![License](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)

**Welcome to my personal blog and portfolio website!** 🎨

A modern, responsive, and feature-rich personal website showcasing my projects, articles, and skills in web development, machine learning, and computer vision.

[🌐 Live Demo](#) • [📝 View Blog](#) • [💬 Contact Me](mailto:nazmulhaque@example.com)

---

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]

## 📖 Table of Contents

- [✨ Features](#-features)
- [🎨 Tech Stack](#-tech-stack)
- [📦 Installation](#-installation)
- [🚀 Usage](#-usage)
- [📸 Screenshots](#-screenshots)
- [🔧 Configuration](#-configuration)
- [🔒 Security](#-security)
- [📄 License](#-license)
- [🤝 Contributing](#-contributing)
- [💬 Support](#-support)

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]

## ✨ Features

### 🎯 Core Features

- [x] **Responsive Design** - Mobile-first approach with breakpoints for tablet, desktop, and large screens
- [x] **Dark Theme** - Beautiful dark blue color scheme with gradient accents
- [x] **Smooth Animations** - Hover effects, transitions, and scroll animations
- [x] **Project Showcase** - Multiple sections: Featured, Popular, All Projects
- [x] **No Duplicates** - Each project appears only once across all sections

### 🔧 Advanced Features

- [x] **Dynamic GitHub Integration** 🆕
  - Automatically fetches latest 6 repositories
  - Displays repo details: language, stars, topics, last updated
  - Updates in real-time when you push to GitHub
  - No manual HTML updates needed!

- [x] **Newsletter System** 📧
  - Powered by Formspree
  - Email collection and management
  - Success/error feedback on page
  - Configure notifications easily

- [x] **Multi-Layer Security** 🔒
  - Content Security Policy (CSP)
  - Right-click disabled
  - Text selection protection
  - Image dragging prevention
  - Keyboard shortcut blocking
  - Clickjacking protection (X-Frame-Options)

### 🎨 Design Highlights

- **16:9 Aspect Ratio** - Professional widescreen images
- **Gradient Effects** - Modern gradient text and buttons
- **Smooth Hover Animations** - Scale, translate, and shadow effects
- **Card-Based Layout** - Clean, organized content display
- **Professional Typography** - Noto Sans font family

### ⚡ Performance Optimizations

- [x] Lazy-loaded images
- [x] Preloaded fonts and assets
- [x] Optimized CSS and JavaScript
- [x] Fast GitHub API with browser caching
- [x] Responsive image loading

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]

## 🎨 Tech Stack

### Frontend

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Design-2196F3?style=for-the-badge&logo=bootstrap&logoColor=white)

</div>

### Backend & APIs

<div align="center">

![GitHub API](https://img.shields.io/badge/GitHub_API-100000?style=for-the-badge&logo=github&logoColor=white)
![Formspree](https://img.shields.io/badge/Formspree-4D55CC?style=for-the-badge&logo=formspree&logoColor=white)

</div>

### Development Tools

<div align="center">

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Python](https://img.shields.io/badge/HTTP_Server-3776AB?style=for-the-badge&logo=python&logoColor=white)

</div>

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]

## 📦 Installation

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x (for local testing)
- Git (optional, for cloning)

### Clone the Repository

```bash
# Clone using HTTPS
git clone https://github.com/nazmul-haque-nihal/nazmul-portfolio-main.git

# Or clone using SSH
git clone git@github.com:nazmul-haque-nihal/nazmul-portfolio-main.git

# Navigate to the project directory
cd nazmul-portfolio-main/personal-blog
```

### Install Dependencies

No npm or package manager needed! This is a **pure HTML/CSS/JS** project.

```bash
# Just download the files - no installation required!
```

### Local Development

#### Option 1: Python HTTP Server (Recommended)

```bash
# Using Python 3
python3 -m http.server 8001

# Open your browser and visit
# http://localhost:8001
```

#### Option 2: VS Code Live Server

1. Install [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.liveserver) extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

#### Option 3: Netlify Drop

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the `personal-blog` folder
3. Instant deployment!

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]

## 🚀 Usage

### Viewing the Website

Simply open `index.html` in your browser or access the live demo URL.

### Dynamic Projects Section

The website automatically fetches your latest GitHub repositories:

```javascript
// Configuration in assets/js/script.js
const GITHUB_USERNAME = "nazmul-haque-nihal";
const REPO_COUNT = 6;
```

**To update projects:**
1. Push changes to your GitHub repositories
2. Refresh the webpage
3. Projects automatically update based on last modified date

### Newsletter Subscription

1. Users fill in name and email fields
2. Click "Subscribe" button
3. Form data sent to Formspree
4. View/manage subscribers at [formspree.io](https://formspree.io/f/xvzbplpv)

### Navigation

- **Hero Section**: Introduction and call-to-action
- **Featured Projects**: 3 top projects with detailed descriptions
- **Popular Projects**: 5 quick-access projects in sidebar
- **All Projects**: 11 detailed project cards
- **Latest from GitHub**: 6 dynamic repositories
- **About Me**: Skills, education, and contact info
- **Footer**: Social links and newsletter form

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]

## 📸 Screenshots

### Desktop View

![Desktop Screenshot](./assets/images/desktop-preview.png)

### Mobile View

![Mobile Screenshot](./assets/images/mobile-preview.png)

### Project Cards

![Project Cards](./assets/images/cards-preview.png)

### GitHub Integration

![GitHub Section](./assets/images/github-section-preview.png)

> **Note**: Add actual screenshots to `assets/images/` folder and update the image paths above.

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]

## 🔧 Configuration

### GitHub API Configuration

Edit `assets/js/script.js` (line 322-323):

```javascript
const GITHUB_USERNAME = "your-username";  // Your GitHub username
const REPO_COUNT = 6;                    // Number of repos to display
```

### Newsletter Form Configuration

Edit `index.html` (line 1516):

```html
<form action="https://formspree.io/f/YOUR-FORM-ID" method="POST" id="newsletter-form">
```

**To create a Formspree form:**
1. Go to [formspree.io](https://formspree.io)
2. Create an account
3. Create a new form
4. Copy the form ID and replace `xvzbplpv` above

### Color Customization

Edit CSS variables in `assets/css/style.css` (lines 17-48):

```css
:root {
  /* Background colors */
  --bg-carolina-blue: hsla(199, 89%, 49%, 1);
  --bg-prussian-blue: hsla(216, 33%, 20%, 1);
  --bg-oxford-blue: hsla(222, 44%, 13%, 1);

  /* Text colors */
  --text-white: hsla(0, 0%, 100%, 1);
  --text-columbia-blue: hsla(199, 69%, 84%, 1);
  --text-carolina-blue: hsla(199, 89%, 49%, 1);
}
```

### Security Settings

#### Enable/Disable Specific Features

**Enable right-click:**
Comment out lines 361-366 in `assets/js/script.js`

**Enable text selection:**
Remove lines 22-28 in `assets/css/style.css`

**Enable keyboard shortcuts:**
Comment out lines 380-397 in `assets/js/script.js`

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]

## 🔒 Security

### Implemented Security Measures

| Layer | Protection | Status |
|--------|-------------|---------|
| **HTML** | Content Security Policy (CSP) | ✅ Enabled |
| **HTML** | X-Frame-Options: DENY | ✅ Enabled |
| **HTML** | X-Content-Type-Options: nosniff | ✅ Enabled |
| **HTML** | X-XSS-Protection | ✅ Enabled |
| **CSS** | Text selection disabled | ✅ Enabled |
| **CSS** | Image dragging disabled | ✅ Enabled |
| **JS** | Right-click disabled | ✅ Enabled |
| **JS** | Keyboard shortcuts blocked | ✅ Enabled |
| **JS** | Copy/Cut/Paste blocked | ✅ Enabled |

### Important Disclaimer

⚠️ **These security measures provide basic protection but are not 100% foolproof.**

**What these measures DO:**
- Discourage casual copying
- Show content is protected
- Make it harder for non-technical users
- Provide legal copyright notices

**What these measures DON'T:**
- Stop determined users (can use dev tools)
- Prevent screenshots
- Block "View Page Source"
- Stop downloading with wget/curl

**For true zero vulnerability:**
- Use server-side authentication
- Implement DRM for premium content
- Add watermark overlays
- Legal protection (copyright, DMCA)

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]

## 📄 License

<div align="center">

![License: CC0 1.0](https://img.shields.io/badge/License-CC0_1.0-lightgrey.svg)

This project is licensed under the **Creative Commons Zero v1.0 Universal** License.

[![CC0](https://upload.wikimedia.org/wikipedia/commons/6/62/CC0_button.svg)](https://creativecommons.org/publicdomain/zero/1.0/)

### What this means:

✅ You are free to:
- Share - copy and redistribute the material in any medium or format
- Adapt - remix, transform, and build upon the material

✅ Under the following terms:
- No attribution required (but appreciated!)
- No restrictions on commercial use
- No restrictions on modifications

⚠️ However, please note:
- The **content** (text, images, projects) remains copyrighted by Nazmul Haque
- Unauthorized copying of content is prohibited
- Respect the author's intellectual property

---

**Copyright © 2024 Nazmul Haque. All rights reserved.**

</div>

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Issues

Found a bug? Have a suggestion? Please open an issue:

1. Go to [Issues](https://github.com/nazmul-haque-nihal/nazmul-portfolio-main/issues)
2. Click "New Issue"
3. Describe the problem or suggestion
4. Provide screenshots if applicable

### Pull Requests

Want to add a feature or fix a bug?

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Test on multiple browsers (Chrome, Firefox, Safari)
- Ensure responsive design works
- Add comments for complex logic
- Update documentation if needed

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]

## 💬 Support

### Get in Touch

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-nazmul--haque--nihal-blue?style=flat-square&logo=github)](https://github.com/nazmul-haque-nihal)
[![Email](https://img.shields.io/badge/Email-Contact_Me-red?style=flat-square&logo=gmail)](mailto:nazmulhaque@example.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin)](https://linkedin.com/in/nazmul-haque-nihal)
[![Twitter](https://img.shields.io/badge/Twitter-Follow_-1DA1F2?style=flat-square&logo=twitter)](https://twitter.com/nazmulhaque)

</div>

### Project Statistics

<div align="center">

![GitHub Stars](https://img.shields.io/github/stars/nazmul-haque-nihal/nazmul-portfolio-main?style=flat-square&logo=github&logoColor=white)
![GitHub Forks](https://img.shields.io/github/forks/nazmul-haque-nihal/nazmul-portfolio-main?style=flat-square&logo=github&logoColor=white)
![GitHub Issues](https://img.shields.io/github/issues/nazmul-haque-nihal/nazmul-portfolio-main?style=flat-square&logo=github&logoColor=white)
![GitHub License](https://img.shields.io/github/license/nazmul-haque-nihal/nazmul-portfolio-main?style=flat-square&logo=github&logoColor=white)

</div>

### Acknowledgments

- **Ion Icons** for the beautiful icon set
- **Google Fonts** for the Noto Sans typography
- **Formspree** for the newsletter functionality
- **GitHub API** for the dynamic projects integration

---

<div align="center">

**If you found this project helpful, please consider giving it a ⭐ star!**

Made with ❤️ by [Nazmul Haque](https://github.com/nazmul-haque-nihal)

[⬆ Back to Top](#-nazmul-haque---personal-blog--portfolio)

</div>

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]

---

### 📊 Repository Analytics

![Analytics](https://repobeats.axiom.co/api/powered/nazmul-haque-nihal/nazmul-portfolio-main/svg?theme=dark)

### 🔥 Streak Stats

![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=nazmul-haque-nihal&theme=dark&hide_border=true)

### 💼 Skills

<div align="center">

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![OpenCV](https://img.shields.io/badge/OpenCV-27338e?style=for-the-badge&logo=OpenCV&logoColor=white)

</div>

---

<div align="center">

**Created:** February 5, 2026
**Last Updated:** February 5, 2026
**Version:** 2.0.0

</div>
