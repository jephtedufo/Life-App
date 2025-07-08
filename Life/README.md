# Jephte Habit Tracker

A beautiful, production-ready habit tracking application built with React, TypeScript, and Tailwind CSS. Track your daily habits with an intuitive calendar interface and comprehensive statistics.

---

## 🧭 App Overview

Jephte Habit Tracker is a productivity app that helps you build and maintain positive habits, track your daily routines, and reward yourself for progress. The app is organized into three main pages:

- **Calendar**: Visualize and mark your daily habit progress.
- **Habits**: Manage your habits, view detailed statistics, and analyze your performance.
- **Points**: Earn, spend, and manage points for completing tasks, with a built-in rewards system.

You can navigate between pages using the navigation icons at the top of each section.

---

## 📄 Pages & Features

### 1. **Calendar Page**
- **Purpose**: Visual habit tracking in a monthly calendar layout.
- **Features**:
  - **Calendar Grid**: See all days of the current month, with each day showing your habits.
  - **Mark Progress**: Click a habit on a day to mark as successful, right-click for failure.
  - **Month Navigation**: Move between months using arrow buttons.
  - **Add Habit**: Use the "Add new habit..." button to create a new habit.
  - **Settings Modal**: Access settings (24-hour time, compact mode, edit past days, reset data).
- **How to Use**: Use the calendar to quickly mark your daily progress. Use the settings to customize your experience.

### 2. **Habits Page**
- **Purpose**: Manage your habits and view analytics.
- **Features**:
  - **Add Habit**: Create new habits with custom schedules.
  - **Habit List**: View all habits, edit or delete them.
  - **Statistics Sidebar**: Click a habit to view detailed stats (success rate, streaks, history).
  - **Summary Cards**: See monthly success rate, highest streak, and alerts for missed days.
  - **Settings Modal**: Same as Calendar page.
- **How to Use**: Add, edit, or delete habits. Click on a habit for analytics. Use the sidebar for quick actions.

### 3. **Points Page**
- **Purpose**: Gamify your productivity with a points and rewards system.
- **Features**:
  - **Add Task Category**: Create categories for earning points.
  - **Points Overview**: See points earned, available balance, and points spent.
  - **Tabs**:
    - **Tasks**: Add/remove points for task completion.
    - **Shop**: Redeem points for rewards.
    - **Goals**: Set and track points-based goals.
    - **History**: View all points transactions (earned/spent), filter by type/category.
    - **Manage**: Edit or delete tasks and rewards.
    - **Connect**: Link habits to tasks so completing a habit automatically earns points.
  - **Settings Modal**: Reset points data, edit past days, compact mode, etc.
- **How to Use**: Add tasks, earn points, redeem rewards, and connect habits for automation.

---

## 📝 Prompting Guide

- **To refer to a page**: "Go to the Calendar page", "Open the Points page", "Switch to Habits"
- **To add a habit**: "Add a new habit for reading", "Create a habit for exercise on Mon/Wed/Fri"
- **To mark progress**: "Mark today's habits as successful", "Right-click to mark as failed"
- **To view stats**: "Show me the statistics for my 'Exercise' habit"
- **To manage points**: "Add a new task category", "Redeem points for a reward", "View my points history"
- **To use settings**: "Open settings and enable compact mode", "Reset all data from settings"

---

## 🚀 Features

- **Calendar View**: Visual habit tracking with monthly calendar layout
- **Habit Management**: Create, edit, and delete habits with custom schedules
- **Statistics Dashboard**: Comprehensive analytics with success rates and streaks
- **Compact Mode**: Space-efficient view with habit initials
- **Past Editing**: Optional ability to modify historical habit data
- **Real-time Clock**: Live clock display with inspirational Bible verses
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📁 Project Structure

```
app/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── forms/          # Form-related components
│   ├── layout/         # Layout components
│   └── modals/         # Modal components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # CSS and styling files

config/                 # Configuration files
docs/                   # Documentation
assets/                 # Static assets (images, icons)
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jephte-habit-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📋 Common Workflows

### Adding a New Habit
1. Click the "Add new habit..." button or the "+" icon
2. Enter habit name and select days of the week
3. Click "Add Habit" to save

### Tracking Daily Progress
- **Calendar View**: Click habits to mark as successful, right-click for failure
- **Habits Section**: Use Success/Failed buttons in the sidebar

### Viewing Statistics
1. Navigate to the Habits section
2. Click on any habit card to open detailed statistics
3. View success rate, streaks, and historical data

### Editing Habits
1. Open habit details in the Habits section
2. Click the edit icon (pencil)
3. Modify name or description
4. Click outside or press Enter to save

## 🗂️ Important File Locations

### Core Application Files
- `app/App.tsx` - Main application component
- `app/main.tsx` - Application entry point
- `app/index.css` - Global styles and Tailwind imports

### Components
- `app/components/Calendar.tsx` - Monthly calendar view
- `app/components/Statistics.tsx` - Habits management and statistics
- `app/components/Header.tsx` - Application header with clock and verse
- `app/components/DayCell.tsx` - Individual calendar day component

### State Management
- `app/context/HabitContext.tsx` - Global habit state management
- `app/hooks/useLocalStorage.ts` - Local storage persistence hook

### Configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript configuration

## 🎨 Design System

### Colors
- **Primary**: Gray-900 (dark)
- **Success**: Green-500
- **Failure**: Red-500
- **Background**: Gray-50

### Typography
- **Headers**: Bold, large sizes (text-6xl for main titles)
- **Body**: Regular weight, readable sizes
- **Monospace**: Used for clock display

### Spacing
- **Sections**: 12 units between major sections
- **Cards**: 6 units between habit cards
- **Internal**: 4 units for component padding

## 🔧 Development Guidelines

### File Naming Conventions
- **Components**: PascalCase (e.g., `HabitCard.tsx`)
- **Hooks**: camelCase with "use" prefix (e.g., `useLocalStorage.ts`)
- **Types**: PascalCase (e.g., `Habit`, `HabitStatus`)
- **Utilities**: camelCase (e.g., `dateUtils.ts`)

### Component Structure
- Keep components under 200 lines
- Use TypeScript interfaces for props
- Implement proper error boundaries
- Follow React best practices

### State Management
- Use React Context for global state
- Local storage for data persistence
- Custom hooks for reusable logic

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

- All configuration files (Vite, TypeScript, Tailwind, ESLint, etc.) are now in the config/ directory for better organization.