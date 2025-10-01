# VidLab - AI-Powered Video Processing Platform

> Transform your videos with cutting-edge AI technology. Upload, process, and enhance your content with intelligent clip generation, automatic captions, and advanced analytics.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

##  Features

###  AI-Powered Processing
- **Intelligent Clip Generation**: Automatically extract the most engaging segments from your videos
- **Smart Caption Generation**: AI-generated captions with high accuracy and timing precision
- **Content Analysis**: Deep video analysis including scene detection and content categorization
- **Synopsis Generation**: Automated video summaries and descriptions

###  Core Functionality
- **Video Upload & Management**: Support for multiple video formats with drag-and-drop interface
- **Real-time Processing**: Live progress tracking with detailed processing logs
- **Clip Library**: Organize and manage your generated clips with advanced filtering
- **Export Options**: Download individual clips or batch export with various formats

###  User Experience
- **Authentication System**: Secure user registration and login powered by Supabase Auth
- **Subscription Management**: Flexible billing plans with usage tracking
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Complete theme customization with next-themes

###  Analytics & Insights
- **Processing Analytics**: Detailed insights into your video processing history
- **Usage Statistics**: Track your monthly processing usage and limits
- **Performance Metrics**: Monitor clip performance and engagement

##  Technology Stack

### Frontend Framework
- **[React 18](https://reactjs.org/)** - Modern React with hooks and concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript with advanced IntelliSense
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool with HMR

### UI & Styling
- **[ShadCN UI](https://ui.shadcn.com/)** - High-quality, accessible React components
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Tailwind Animate](https://github.com/jamiebuilds/tailwindcss-animate)** - Animation utilities
- **[Lucide React](https://lucide.dev/)** - Beautiful, customizable icons

### Backend & Database
- **[Supabase](https://supabase.com/)** - Complete backend solution
  - PostgreSQL database
  - Real-time subscriptions
  - Authentication & authorization
  - Row Level Security (RLS)
  - File storage & CDN

### State Management & Data Fetching
- **[TanStack React Query](https://tanstack.com/query)** - Powerful data synchronization
- **[React Hook Form](https://react-hook-form.com/)** - Performant form library
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting with React-specific rules
- **[TypeScript ESLint](https://typescript-eslint.io/)** - TypeScript-aware linting
- **[PostCSS](https://postcss.org/)** - CSS transformation and optimization
- **[Autoprefixer](https://autoprefixer.github.io/)** - Automatic vendor prefixing

### Additional Libraries
- **[React Router DOM](https://reactrouter.com/)** - Client-side routing
- **[Date-fns](https://date-fns.org/)** - Modern date utility library
- **[Recharts](https://recharts.org/)** - Composable charting library
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[Vaul](https://vaul.emilkowal.ski/)** - Drawer component for mobile
- **[Input OTP](https://input-otp.rodz.dev/)** - Accessible OTP input
- **[CMDK](https://cmdk.paco.me/)** - Command palette interface

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** (v9.0.0 or higher) or **bun** (v1.0.0 or higher)
- **Git** - For version control
- **Supabase Account** - For backend services

### System Requirements
- **OS**: macOS, Linux, or Windows
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space for dependencies

##  Quick Start

### 1. Clone the Repository
```bash
git clone <YOUR_GIT_URL>
cd vidlab
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Using bun (faster)
bun install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Analytics & Monitoring
VITE_ANALYTICS_ID=your_analytics_id
```

### 4. Start Development Server
```bash
# Using npm
npm run dev

# Using bun
bun run dev
```

The application will be available at `http://localhost:8080`

##  Development

### Project Structure
```
vidlab/
├── public/                 # Static assets
│   ├── vl-logo.svg        # Application logo
│   └── robots.txt         # SEO robots file
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # ShadCN UI components
│   │   └── Header.tsx    # Application header
│   ├── hooks/            # Custom React hooks
│   ├── integrations/     # External service integrations
│   │   └── supabase/     # Supabase client & types
│   ├── lib/              # Utility functions
│   ├── pages/            # Application pages/routes
│   │   ├── Auth.tsx      # Authentication page
│   │   ├── Billing.tsx   # Subscription management
│   │   ├── Index.tsx     # Landing page
│   │   ├── Settings.tsx  # User settings
│   │   ├── Upload.tsx    # Video upload interface
│   │   └── VideoDetail.tsx # Video processing details
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles & CSS variables
├── supabase/             # Supabase configuration
└── package.json          # Project dependencies & scripts
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run build:dev` - Build with development optimizations
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

### Code Quality & Standards

- **TypeScript**: Strict mode enabled for type safety
- **ESLint**: Configured with React and TypeScript rules
- **Prettier**: Code formatting (configure in your IDE)
- **Husky**: Pre-commit hooks for quality checks (optional)

### Component Development

This project uses **ShadCN UI** for consistent component development:

```bash
# Add new ShadCN components
npx shadcn@latest add [component-name]

# Example: Add a new button variant
npx shadcn@latest add button
```

### Styling Guidelines

- Use **Tailwind CSS** utility classes
- Leverage CSS variables for theme consistency
- Follow mobile-first responsive design
- Use ShadCN's design tokens for spacing and colors

## Database Schema

### Supabase Setup

1. **Create a new Supabase project**
2. **Enable Authentication** with email/password
3. **Set up Row Level Security** policies
4. **Configure Storage** for video file uploads

### Required Tables
```sql
-- Users profile extension
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Video processing records
CREATE TABLE videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  file_path TEXT,
  status TEXT DEFAULT 'uploading',
  processing_progress INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Generated clips
CREATE TABLE clips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id UUID REFERENCES videos(id),
  title TEXT,
  start_time FLOAT,
  end_time FLOAT,
  file_path TEXT,
  thumbnail_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

##  Deployment

### Production Build
```bash
npm run build
```


#### Vercel
```bash
npm install -g vercel
vercel --prod
```

#### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "preview"]
```

## Environment Variables

### Required Variables
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Optional Variables
```env
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=production
VITE_SENTRY_DSN=your_sentry_dsn
VITE_ANALYTICS_ID=your_analytics_id
```

## Monitoring & Analytics

### Performance Monitoring
- **Vite Bundle Analyzer**: Analyze bundle size
- **React DevTools**: Component debugging
- **Supabase Dashboard**: Backend monitoring

### Error Tracking
Consider integrating:
- **Sentry** for error monitoring
- **LogRocket** for session replay
- **Google Analytics** for usage analytics