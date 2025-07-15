# Life App

A modern productivity and self-improvement app built with React, TypeScript, and Tailwind CSS. Track your habits, manage tasks, earn and spend points, and customize your experience—all in one place.

---

## 🧭 App Overview

Life App is designed to help you build positive habits, stay organized, and reward yourself for progress. The app is organized into four main pages:

- **Calendar**: Visualize and mark your daily habit progress in a monthly calendar view.
- **Tasks**: Manage your daily and recurring tasks, grouped by category.
- **Shop**: Earn points for completing habits and tasks, then redeem them for custom rewards.
- **Manage**: Access advanced management tools, settings, and activity logs for your habits, tasks, and rewards.

Navigate between pages using the navigation icons at the top of each section.

---

## 📄 Pages & Features

### 1. **Calendar Page**
- **Purpose**: Visual habit tracking in a monthly calendar layout.
- **Features**:
  - **Calendar Grid**: See all days of the current month, with each day showing your active habits.
  - **Mark Progress**: Click a habit on a day to mark as successful, right-click for failure.
  - **Month Navigation**: Move between months using arrow buttons.
  - **Add Habit**: Use the "Add new habit..." button to create a new habit with custom schedule.
  - **Daily Verse & Clock**: Inspirational Bible verse and live clock at the top.
- **How to Use**: Use the calendar to quickly mark your daily progress. Add new habits as needed.

### 2. **Tasks Page**
- **Purpose**: Organize and manage your tasks, grouped by category.
- **Features**:
  - **Add Task Category**: Create categories for different types of tasks (e.g., Work, School, Fitness).
  - **Task List**: View, edit, or delete tasks within each category.
  - **Points System**: Earn points for completing tasks, with customizable point values per category.
  - **Quick Add**: Use the "Add new task..." button for fast entry.
- **How to Use**: Add categories and tasks, then mark them as completed to earn points.

### 3. **Shop Page**
- **Purpose**: Gamify your productivity with a points and rewards system.
- **Features**:
  - **Points Overview**: See points earned, available balance, and points spent.
  - **Rewards Store**: Redeem points for custom rewards. Add, edit, or delete rewards.
  - **Add Reward**: Use the "Add New Reward" button to create new rewards.
  - **Purchase Flow**: Buy rewards if you have enough points; see unavailable items grayed out.
- **How to Use**: Earn points by completing habits and tasks, then redeem them for rewards in the shop.

### 4. **Manage Page**
- **Purpose**: Advanced management, settings, and activity tracking.
- **Features**:
  - **Tabs**:
    - **Habits Manager**: Edit, delete, or reorder habits.
    - **Task Manager**: Edit, delete, or reorder task categories.
    - **Shop Manager**: Edit, delete, or reorder shop rewards.
    - **Connecting Habits**: Link habits to tasks for automation.
    - **Activity**: View all points transactions (earned/spent), filter by type/category.
    - **General Settings**: Theme, notification sounds, 24-hour format, compact mode, edit past days, data import/export, reset data.
- **How to Use**: Use the tabs to manage all aspects of your data and customize your app experience.

---

## 📝 Usage Guide

- **To switch pages**: Click the navigation icons (Calendar, Tasks, Shop, Manage) at the top of any page.
- **To add a habit**: Go to Calendar or Manage > Habits Manager, click "Add new habit...", fill in details, and save.
- **To add a task**: Go to Tasks or Manage > Task Manager, click "Add new task...", fill in details, and save.
- **To mark progress**: On Calendar, click a habit to mark as successful, right-click for failure.
- **To earn points**: Complete tasks or habits; points are awarded automatically.
- **To redeem rewards**: Go to Shop, click "Buy" on a reward if you have enough points.
- **To manage data**: Use the Manage page for advanced options, including import/export and reset.

---

## 🚀 Features

- **Calendar View**: Visual habit tracking with monthly calendar layout
- **Task Management**: Create, edit, and delete tasks with custom categories
- **Rewards Shop**: Redeem points for custom rewards
- **Points System**: Earn, spend, and track points for productivity
- **Statistics & Activity**: View points history and activity logs
- **Advanced Settings**: Theme, compact mode, 24-hour time, data backup, and more
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📁 Project Structure

```
app/
├── components/          # Shared React components (dialogs, toggles, context)
├── pageCalendar/        # Calendar page and related components
├── pageTasks/           # Tasks page and related components
├── pageShop/            # Shop page and related components
├── pageManage/          # Manage page and management tabs
├── styles/              # CSS and Tailwind styling
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
├── main.tsx             # App entry point
├── App.tsx              # Main app component

config/                  # Configuration files (Vite, Tailwind, TypeScript, etc.)
public/                  # Static assets (if any)
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Life
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
1. Go to the Calendar or Manage page (Habits tab)
2. Click the "Add new habit..." button
3. Enter habit name, description, and select repeat days
4. Click "Add Habit" to save

### Adding a New Task
1. Go to the Tasks or Manage page (Tasks tab)
2. Click the "Add new task..." button
3. Enter task name, description, and point value
4. Click "Add Task" to save

### Redeeming a Reward
1. Go to the Shop page
2. Click "Buy" on a reward you can afford
3. Confirm the purchase

### Managing Data & Settings
1. Go to the Manage page
2. Use the tabs for Habits, Tasks, Shop, Connect, Activity, or Settings
3. Import/export data, reset, or customize preferences

## 🗂️ Important File Locations

### Core Application Files
- `app/App.tsx` - Main application component
- `app/main.tsx` - Application entry point
- `app/styles/index.css` - Global styles and Tailwind imports

### Components & Pages
- `app/pageCalendar/` - Calendar page and components (AddHabitForm, Calendar, DayCell, Header, Clock)
- `app/pageTasks/` - Tasks page and components (AddTaskForm, TaskPage, AddTaskModal)
- `app/pageShop/` - Shop page and components (ShopPage, AddRewardModal, RedeemRewardModal, ShopMTab)
- `app/pageManage/` - Manage page and management tabs (ManagePage, tabHabits, tabTasks, tabShop, tabConnect, tabActivity)
- `app/components/` - Shared components (ConfirmDialog, defaultToggleSwitch, context providers)
- `app/utils/` - Utility functions (dateUtils, useLocalStorage, csvUtils)
- `app/types/` - TypeScript type definitions

### Configuration
- `config/tailwind.config.js` - Tailwind CSS configuration
- `config/vite.config.ts` - Vite build configuration
- `config/tsconfig.json` - TypeScript configuration

## 🎨 Design System

- **Modern, clean UI** with Tailwind CSS
- **Primary**: Gray-900 (dark), **Success**: Green-500, **Failure**: Red-500, **Background**: Gray-50
- **Typography**: Large, bold headers; readable body text; monospace for clock
- **Spacing**: Generous padding and margin for clarity

## 🔧 Development Guidelines

- **Components**: PascalCase (e.g., `AddHabitForm.tsx`)
- **Hooks**: camelCase with "use" prefix (e.g., `useLocalStorage.ts`)
- **Types**: PascalCase (e.g., `Habit`, `TaskCategory`)
- **Utilities**: camelCase (e.g., `dateUtils.ts`)
- Use TypeScript interfaces for props
- Keep components focused and under 200 lines when possible
- Use React Context for global state
- Persist data with local storage
- Follow React and TypeScript best practices

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