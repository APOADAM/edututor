# EduTutor - Interactive Learning Platform

## Overview

EduTutor is a comprehensive fullstack tutoring platform designed to deliver interactive educational content through a modern web application. The platform supports both tutors and students with features including role-based authentication, multi-subject lesson delivery, interactive exercises, real-time notepad functionality, and multilingual support. Built as a Single Page Application (SPA), it provides seamless navigation without page reloads and includes responsive design for desktop and tablet usage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and modern component development
- **Styling**: Tailwind CSS with shadcn/ui component library following Material Design principles
- **Layout System**: Three-column responsive layout with resizable panels using react-resizable-panels
  - Left sidebar (240px): Navigation and subchapter listing
  - Main content area (flex-1): Lesson content and exercises
  - Right sidebar (320px): Tutor notepad functionality
- **State Management**: Local React state with planned integration for TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Internationalization**: react-i18next supporting English, Greek, and German languages

### Backend Architecture
- **Server**: Express.js with TypeScript for API endpoints
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Session-based authentication system (planned)
- **Development**: Vite for fast development builds and hot module replacement

### Component Design
- **UI Components**: Radix UI primitives with custom styling for accessibility
- **Interactive Elements**: 
  - Multiple choice questions with radio button interfaces
  - Drag-and-drop exercise components
  - Canvas-based drawing notepad for tutors
  - Pop-up hint system for exercise assistance
- **Theme System**: Light/dark mode support with CSS custom properties

### Data Architecture
- **User Management**: Role-based system distinguishing tutors and students
- **Content Structure**: Hierarchical organization (Subject → Level → Chapter → Subchapter)
- **Exercise Types**: Support for theory content, multiple choice, and drag-and-drop interactions
- **Progress Tracking**: Lesson completion and progress indicators

### Design System
- **Typography**: Inter font family for readability with JetBrains Mono for code/math content
- **Color Palette**: Educational-focused blues with semantic colors for success, warning, and error states
- **Spacing**: Consistent 8px grid system using Tailwind spacing utilities
- **Interactive States**: Hover and focus states with elevation effects

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: Neon PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect
- **@tanstack/react-query**: Server state management and caching

### UI and Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives (accordion, dialog, dropdown, etc.)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **react-resizable-panels**: Resizable layout panels

### Internationalization
- **react-i18next**: React internationalization framework
- **i18next-browser-languagedetector**: Automatic language detection

### Development Tools
- **vite**: Fast build tool and dev server
- **typescript**: Type safety and enhanced developer experience
- **wouter**: Minimalist router for React

### Fonts and Assets
- **Google Fonts**: Inter and JetBrains Mono font families via CDN