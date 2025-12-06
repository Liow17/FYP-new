# Cybersecurity Awareness Platform

A modern, interactive web-based platform designed to help non-technical university students build foundational knowledge in cybersecurity through engaging educational modules and automated assessments.

## Overview

This platform provides accessible cybersecurity education through two comprehensive learning modules:
- **Password Security**: Understanding and creating strong passwords
- **Phishing Awareness**: Recognizing and preventing phishing attacks

## Features

### Educational Content
- **Modular Learning System**: Two focused modules covering essential cybersecurity topics
- **Clear, Accessible Language**: Content designed for users without technical background
- **Best Practices**: Practical guidance for real-world application

### Interactive Tools
- **Password Strength Meter**: Real-time password analysis powered by zxcvbn
  - Visual strength indicators
  - Instant feedback and suggestions
  - Time-to-crack estimates
  - Pattern recognition warnings

### Assessment & Learning
- **Automated Quizzes**: Multiple-choice questions for each module
- **Instant Grading**: Immediate score calculation and feedback
- **Visual Indicators**: Green for correct answers, red for incorrect
- **Detailed Explanations**: Learn from mistakes with comprehensive rationales

### User Experience
- **No Login Required**: Fully client-side, no authentication needed
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Built with Tailwind CSS for a clean, professional appearance
- **Dark Mode Support**: Automatic theme switching based on system preferences

## Technology Stack

### Framework & Libraries
- **Next.js 16**: React framework with App Router for file-based routing and server components
- **React 19**: Modern React with latest features
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework for rapid UI development

### Security Analysis
- **zxcvbn**: Dropbox's password strength estimation library
  - Analyzes password composition
  - Detects common patterns and weaknesses
  - Provides actionable improvement suggestions

### Development Tools
- **VS Code**: Recommended IDE for development
- **npm**: Package management
- **ESLint**: Code quality and consistency

## Project Structure

```
FYP/
├── app/
│   ├── password-security/
│   │   ├── quiz/
│   │   │   └── page.tsx          # Password security quiz
│   │   └── page.tsx               # Password security module
│   ├── phishing-awareness/
│   │   ├── quiz/
│   │   │   └── page.tsx          # Phishing awareness quiz
│   │   └── page.tsx               # Phishing awareness module
│   ├── globals.css                # Global styles and Tailwind imports
│   ├── layout.tsx                 # Root layout component
│   └── page.tsx                   # Home page with module navigation
├── public/                        # Static assets
├── .gitignore
├── next.config.js                 # Next.js configuration
├── package.json                   # Project dependencies
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd FYP
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production-ready application
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

## Educational Modules

### Password Security Module
Learn essential password security concepts:
- Characteristics of strong passwords (length, complexity, unpredictability)
- Common password mistakes to avoid
- Best practices for password management
- Interactive password strength testing with zxcvbn
- Real-time feedback and improvement suggestions

**Quiz Topics:**
- Password length requirements
- Password composition best practices
- Password manager usage
- Two-factor authentication
- Password reuse risks

### Phishing Awareness Module
Understand and recognize phishing attacks:
- What is phishing and how it works
- Types of phishing (email, spear phishing, smishing, vishing)
- Warning signs and red flags
- How to verify suspicious communications
- Protection strategies and best practices
- Real-world email examples with analysis

**Quiz Topics:**
- Identifying phishing indicators
- Recognizing spoofed domains
- Proper response to suspicious emails
- Understanding social engineering tactics
- Multi-factor authentication benefits

## Design Philosophy

### No Authentication
- **Client-Side Only**: All functionality runs in the browser
- **No Database**: No user data collection or storage
- **Privacy First**: No tracking or personal information required
- **Easy Deployment**: Simple static hosting without backend infrastructure

### Pedagogical Approach
- **Learn by Doing**: Interactive tools reinforce concepts
- **Immediate Feedback**: Instant results help identify knowledge gaps
- **Explanatory Learning**: Detailed rationales promote understanding
- **Accessible Content**: Written for non-technical audiences

### Modern Development Practices
- **File-Based Routing**: Next.js App Router for intuitive structure
- **Component-Based**: Modular, reusable React components
- **Type Safety**: TypeScript for reliability and maintainability
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

This is an educational project developed for university coursework. Contributions, suggestions, and feedback are welcome.

## License

This project is developed for educational purposes.

## Acknowledgments

- **zxcvbn** by Dropbox - Password strength estimation
- **Next.js** by Vercel - React framework
- **Tailwind CSS** - Utility-first CSS framework
- Cybersecurity education resources and best practices from industry standards

## Future Enhancements

Potential additions for expanded learning:
- Additional modules (e.g., Social Engineering, Secure Browsing)
- Progress tracking with local storage
- Certificate generation for completed modules
- More interactive simulations and scenarios
- Downloadable cheat sheets and reference guides

---

**Built with ❤️ for cybersecurity education**
