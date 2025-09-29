# Design Guidelines for Tutoring Platform

## Design Approach
**System-Based Approach**: Using Material Design principles adapted for educational applications, emphasizing clarity, accessibility, and intuitive navigation for both tutors and students.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Primary Blue: 210 100% 50% (educational trust and focus)
- Primary Blue Dark: 210 100% 40% (dark mode primary)
- Surface Gray: 220 10% 95% (light backgrounds)
- Surface Dark: 220 15% 10% (dark mode backgrounds)

**Semantic Colors:**
- Success Green: 120 60% 45% (correct answers, progress)
- Warning Orange: 35 85% 55% (attention, in-progress)
- Error Red: 0 70% 50% (incorrect answers, alerts)

### B. Typography
**Font Family:** Inter (via Google Fonts CDN) for excellent readability
- Headings: 600 weight, sizes 24px-32px
- Body text: 400 weight, 16px base size
- UI elements: 500 weight, 14px-16px
- Code/Math: JetBrains Mono for formulas and programming content

### C. Layout System
**Spacing Units:** Tailwind units of 2, 4, 6, and 8 (corresponding to 8px, 16px, 24px, 32px)
- Component padding: p-4 or p-6
- Section margins: m-6 or m-8  
- Element gaps: gap-4 consistently

**Three-Column Layout:**
- Left Sidebar: 240px width, navigation and subchapters
- Main Content: flex-1, lessons and exercises
- Right Sidebar: 320px width, notepad (tutors only)

### D. Component Library

**Navigation Components:**
- Clean sidebar with hierarchical navigation
- Breadcrumb trail showing Subject > Level > Chapter
- Tab-style chapter navigation with clear active states

**Content Components:**
- Card-based lesson layout with subtle shadows
- Multiple choice questions with radio button styling
- Drag-and-drop zones with clear visual feedback
- Progress indicators for lesson completion

**Interactive Elements:**
- Primary buttons: filled with primary blue
- Secondary buttons: outlined with subtle backgrounds
- Form inputs: clean borders with focus states
- Interactive notepad: canvas-based with tool palette

**Data Display:**
- List views for subjects, levels, chapters
- Clean typography hierarchy for lesson content
- Status badges for progress tracking

### E. Educational-Specific Design

**Learning Interface:**
- Clear visual separation between theory and exercises
- Consistent spacing for readability during long study sessions
- High contrast text for accessibility
- Distraction-free design focusing attention on content

**Notepad Interface:**
- Minimalist tool palette (pen, eraser, text, colors)
- Clean white/dark drawing surface
- Intuitive controls for real-time collaboration

**Responsive Behavior:**
- Mobile: Single column, collapsible sidebars
- Tablet: Two-column (navigation + content, notepad as overlay)
- Desktop: Full three-column layout

### F. Authentication & Onboarding
- Clean, centered login form with platform branding
- Clear role selection (Tutor/Student) with descriptive cards
- Progressive disclosure: Subject → Level → Chapter selection
- Welcoming but professional aesthetic suitable for educational context

This design prioritizes usability, accessibility, and long-term consistency appropriate for an educational platform where focus and learning efficiency are paramount.