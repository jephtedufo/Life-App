# Life App - Component Reference Guide

A comprehensive habit tracking and points system built with Next.js, React, and Supabase.

## 📋 Component Reference Guide

This guide provides the exact names of all components and sections in each page for easier prompting and referencing.

---

## 🗓️ **Calendar Page** (`/app`)

### **Main Components:**
- `CalendarPage` - Main page wrapper
- `Header` - Top section with welcome message and clock
- `AddHabitForm` - Form section for adding habits and navigation
- `Calendar` - Main calendar grid component

### **Header Section:**
- `Header` - Welcome message with daily Bible verse
- `Clock` - Real-time clock component (top-right)

### **AddHabitForm Section:**
- `AddHabitButton` - "Add new habit..." button
- `NavigationButtons` - Calendar, Habits, Points, Settings icons
- `PastEditingNotice` - Yellow warning banner when past editing is enabled
- `HabitConfigModal` - Modal for habit configuration
- `PointsModal` - Points system modal
- `SettingsModal` - Settings configuration modal
- `ConfirmDialog` - Reset data confirmation dialog

### **Calendar Section:**
- `Calendar` - Main calendar container
- `MonthNavigation` - Previous/Next month buttons
- `MonthTitle` - Current month display
- `WeekdayHeaders` - Sun, Mon, Tue, Wed, Thu, Fri, Sat
- `DayCell` - Individual day cells (multiple instances)
- `EmptyCells` - Placeholder cells for month start

### **DayCell Components:**
- `DayCell` - Individual day container
- `DayNumber` - Date number display
- `HabitButtons` - Individual habit status buttons
- `HabitInitials` - Abbreviated habit names
- `StatusIndicators` - Success/Failure visual indicators

---

## 📊 **Habits Page** (`/habits`)

### **Main Components:**
- `HabitsPage` - Main page wrapper
- `AddHabitForm` - Same as calendar page
- `Statistics` - Habit statistics display

### **Header Section:**
- `PageHeader` - "Habits Manager" title and description

### **Summary Cards Section:**
- `MonthlySuccessRateCard` - Amber gradient card with success rate
- `HighestStreakCard` - Green gradient card with streak info
- `MostChallengingCard` - Red gradient card with failure count

### **Statistics Section:**
- `Statistics` - Main statistics component
- `HabitCards` - Individual habit cards (grid layout)
- `HabitCard` - Individual habit display card
- `SuccessCount` - Green success counter
- `FailureCount` - Red failure counter
- `SuccessRate` - Blue success rate percentage
- `StreakDisplay` - Streak count indicator

### **Sidebar Components (Compact Mode):**
- `FullScreenSidebar` - Sliding sidebar for habit details
- `HabitDetails` - Detailed habit information
- `EditHabitForm` - Inline editing form
- `HabitStats` - Detailed statistics grid

---

## 🏆 **Points Page** (`/points`)

### **Main Components:**
- `PointsPage` - Main page wrapper
- `AddCategoryForm` - Category management form
- `PointsSystem` - Main points system component

### **Header Section:**
- `PageHeader` - "Lifestyle Credits & Rewards" title and description

### **AddCategoryForm Section:**
- `AddCategoryButton` - "Add new category..." button
- `NavigationButtons` - Same as other pages

### **PointsSystem Section:**
- `PointsSystem` - Main points container
- `PointsSummaryCards` - Top summary cards
- `PointsEarnedCard` - Green card showing total earned
- `AvailableBalanceCard` - Blue card showing current balance
- `PointsSpentCard` - Purple card showing spent points
- `NavigationTabs` - Tab navigation system

### **Points Tabs:**
- `TasksTab` - Task categories and completion
- `TaskCategoriesTab` - Category management
- `GoalsTab` - Points goals tracking
- `HistoryTab` - Transaction history
- `RewardsStoreTab` - Available rewards
- `ShopTab` - Reward purchasing
- `ManageTab` - System management
- `ConnectTab` - Habit-task connections

### **Modal Components:**
- `AddCategoryModal` - Category creation modal
- `AddGoalModal` - Goal creation modal
- `AddPointLogModal` - Point logging modal
- `AddRewardModal` - Reward creation modal
- `AddTaskModal` - Task creation modal
- `RedeemRewardModal` - Reward redemption modal

---

## 🔧 **Settings & Modals**

### **SettingsModal:**
- `SettingsModal` - Main settings container
- `PastEditingToggle` - Enable/disable past editing
- `CompactModeToggle` - Enable/disable compact mode
- `TimeFormatToggle` - 12/24 hour format
- `ResetDataButton` - Data reset option

### **ImportExportModal:**
- `ImportExportModal` - Main modal container
- `ExportSection` - Data export functionality
- `ImportSection` - Data import functionality
- `FileUpload` - CSV file upload
- `ExportButton` - Download CSV button

### **HabitConfigModal:**
- `HabitConfigModal` - Habit configuration container
- `HabitNameInput` - Habit name field
- `HabitDescriptionInput` - Description field
- `RepeatDaysSelector` - Day selection checkboxes
- `SubmitButton` - Create habit button

---

## 🎨 **UI Components**

### **Layout Components:**
- `Header` - Page header with title and clock
- `Clock` - Real-time clock display
- `ConfirmDialog` - Confirmation dialog
- `ToggleSwitch` - Toggle switch component

### **Form Components:**
- `AddHabitForm` - Habit creation form
- `AddCategoryForm` - Category creation form
- `EditHabitModal` - Habit editing modal

### **Navigation:**
- `NavigationButtons` - Page navigation icons
- `TabNavigation` - Tab-based navigation
- `BreadcrumbNavigation` - Breadcrumb navigation

---

## 📱 **Authentication Pages**

### **Signup Page** (`/signup`):
- `SignupPage` - Main signup container
- `SignupForm` - Registration form
- `FirstNameInput` - First name field
- `LastNameInput` - Last name field
- `EmailInput` - Email address field
- `PasswordInput` - Password field
- `CreateAccountButton` - Submit button
- `LoginLink` - Link to login page
- `ErrorMessage` - Error display

### **Login Page** (`/login`):
- `LoginPage` - Main login container
- `LoginForm` - Authentication form
- `EmailInput` - Email field
- `PasswordInput` - Password field
- `SignInButton` - Submit button
- `SignupLink` - Link to signup page
- `ErrorMessage` - Error display

---

## 🎯 **Prompting Examples**

### **Calendar Page Modifications:**
```
"Update the Calendar component to show week numbers"
"Modify the DayCell component to display habit descriptions on hover"
"Add a new feature to the AddHabitForm for habit categories"
"Change the Header component to show user's name instead of 'Friend'"
```

### **Habits Page Modifications:**
```
"Add a new summary card to the HabitsPage showing average completion time"
"Modify the Statistics component to include monthly trends"
"Update the HabitCard component to show last completion date"
"Add filtering options to the Statistics grid layout"
```

### **Points Page Modifications:**
```
"Add a new tab to the PointsSystem for achievements"
"Modify the PointsSummaryCards to show weekly progress"
"Update the RewardsStoreTab to include reward categories"
"Add export functionality to the HistoryTab"
```

### **General UI Updates:**
```
"Update the Clock component to support multiple timezones"
"Modify the Header component to include user profile picture"
"Add dark mode toggle to the SettingsModal"
"Update the ConfirmDialog component to support custom actions"
```

---

## 🔗 **File Structure**

```
src/
├── app/
│   ├── signup/page.tsx
│   ├── login/page.tsx
│   └── app/page.tsx
├── frontend/
│   ├── pages/
│   │   ├── CalendarPage.tsx
│   │   ├── HabitsPage.tsx
│   │   └── PointsPage.tsx
│   ├── components/
│   │   ├── Calendar.tsx
│   │   ├── DayCell.tsx
│   │   ├── Statistics.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Clock.tsx
│   │   ├── forms/
│   │   │   ├── AddHabitForm.tsx
│   │   │   ├── AddCategoryForm.tsx
│   │   │   └── HabitConfigModal.tsx
│   │   ├── modals/
│   │   │   ├── SettingsModal.tsx
│   │   │   └── ImportExportModal.tsx
│   │   ├── points/
│   │   │   ├── PointsSystem.tsx
│   │   │   ├── TasksTab.tsx
│   │   │   ├── GoalsTab.tsx
│   │   │   └── [other tabs...]
│   │   └── ui/
│   │       ├── ConfirmDialog.tsx
│   │       └── ToggleSwitch.tsx
│   └── context/
│       ├── HabitContext.tsx
│       └── PointsContext.tsx
```

---

## 🚀 **Quick Reference**

### **Most Used Components:**
- `Calendar` - Main calendar display
- `DayCell` - Individual day cells
- `AddHabitForm` - Habit creation
- `Statistics` - Habit analytics
- `PointsSystem` - Points management
- `Header` - Page headers
- `SettingsModal` - App configuration

### **Key Features:**
- ✅ Habit tracking with success/failure status
- ✅ Points system with rewards
- ✅ Goal setting and tracking
- ✅ Data import/export
- ✅ Responsive design
- ✅ Real-time clock
- ✅ Bible verse display
- ✅ Authentication system

This reference guide makes it easy to identify and modify specific components in your Life App!
