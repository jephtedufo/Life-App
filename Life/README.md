# Jephte Habit Tracker

A beautiful, production-ready habit tracking application built with React, TypeScript, and Tailwind CSS. Track your daily habits with an intuitive calendar interface and comprehensive statistics.

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