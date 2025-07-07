# Project Folder Structure Guide

## Overview
This document outlines the organized folder structure for the Jephte Habit Tracker application, designed for maintainability, scalability, and developer experience.

## Root Directory Structure

```
jephte-habit-tracker/
├── src/                    # Source code
├── docs/                   # Documentation
├── assets/                 # Static assets
├── config/                 # Configuration files
├── public/                 # Public assets
├── node_modules/           # Dependencies (auto-generated)
└── dist/                   # Build output (auto-generated)
```

## Source Code Organization (`/src`)

### `/src/components/`
**Purpose**: All React components organized by functionality

#### `/src/components/ui/`
**Purpose**: Reusable UI components that can be used across the application
- `ToggleSwitch.tsx` - Toggle switch component
- `ConfirmDialog.tsx` - Confirmation dialog component

**Best Practices**:
- Keep components generic and reusable
- Use TypeScript interfaces for props
- Include proper accessibility attributes

#### `/src/components/forms/`
**Purpose**: Form-related components and input handling
- `AddHabitForm.tsx` - Main habit creation form
- `HabitConfigModal.tsx` - Habit configuration modal

**Best Practices**:
- Validate inputs properly
- Handle form state efficiently
- Provide clear error messages

#### `/src/components/layout/`
**Purpose**: Layout and structural components
- `Header.tsx` - Application header
- `Clock.tsx` - Real-time clock component

**Best Practices**:
- Keep layout components focused on structure
- Make responsive by default
- Avoid business logic in layout components

#### `/src/components/modals/`
**Purpose**: Modal dialogs and overlays
- `SettingsModal.tsx` - Application settings
- `StyleModal.tsx` - Style configuration

**Best Practices**:
- Handle escape key and backdrop clicks
- Manage focus properly
- Use consistent modal patterns

#### `/src/components/` (Root Level)
**Purpose**: Main feature components
- `Calendar.tsx` - Monthly calendar view
- `DayCell.tsx` - Individual calendar day
- `Statistics.tsx` - Habits statistics and management

### `/src/context/`
**Purpose**: React Context providers for global state management
- `HabitContext.tsx` - Global habit state and actions

**Best Practices**:
- Keep context focused on specific domains
- Provide TypeScript types for context values
- Use custom hooks for context consumption

### `/src/hooks/`
**Purpose**: Custom React hooks for reusable logic
- `useLocalStorage.ts` - Local storage persistence hook

**Best Practices**:
- Start hook names with "use"
- Keep hooks focused on single responsibilities
- Include proper TypeScript types

### `/src/types/`
**Purpose**: TypeScript type definitions and interfaces
- `index.ts` - Main type definitions (Habit, HabitStatus, etc.)

**Best Practices**:
- Use descriptive type names
- Group related types together
- Export types from index files

### `/src/utils/`
**Purpose**: Utility functions and helpers
- `dateUtils.ts` - Date manipulation and formatting utilities

**Best Practices**:
- Keep functions pure when possible
- Include comprehensive JSDoc comments
- Write unit tests for complex utilities

### `/src/styles/` (Future)
**Purpose**: CSS modules, styled-components, or additional styling files
- Currently using Tailwind CSS classes inline

## Documentation (`/docs`)

### Current Files
- `FOLDER_STRUCTURE.md` - This file
- Future: API documentation, component documentation, deployment guides

### Best Practices
- Keep documentation up to date
- Include code examples
- Use clear, concise language

## Assets (`/assets`)

### Purpose
Static assets that don't change during build process
- Images, icons, fonts
- Currently using external URLs for images

### Best Practices
- Optimize images for web
- Use appropriate file formats
- Organize by type (images/, icons/, fonts/)

## Configuration (`/config`)

### Purpose
Configuration files for build tools and development
- Currently empty (configs moved back to root for tool compatibility)

### Best Practices
- Keep environment-specific configs separate
- Document configuration options
- Use TypeScript for config when possible

## File Naming Conventions

### Components
- **Format**: PascalCase
- **Examples**: `HabitCard.tsx`, `ToggleSwitch.tsx`
- **Reason**: Matches React component naming standards

### Hooks
- **Format**: camelCase with "use" prefix
- **Examples**: `useLocalStorage.ts`, `useHabits.ts`
- **Reason**: Follows React hooks naming convention

### Types
- **Format**: PascalCase for interfaces, camelCase for type aliases
- **Examples**: `Habit`, `HabitStatus`, `habitId`
- **Reason**: Follows TypeScript conventions

### Utilities
- **Format**: camelCase
- **Examples**: `dateUtils.ts`, `formatDate.ts`
- **Reason**: Follows JavaScript function naming

### Constants
- **Format**: SCREAMING_SNAKE_CASE
- **Examples**: `MAX_HABITS`, `DEFAULT_REPEAT_DAYS`
- **Reason**: Clearly identifies constants

## Import/Export Patterns

### Barrel Exports
Use index files to create clean import paths:
```typescript
// src/components/ui/index.ts
export { ToggleSwitch } from './ToggleSwitch';
export { ConfirmDialog } from './ConfirmDialog';

// Usage
import { ToggleSwitch, ConfirmDialog } from '../ui';
```

### Relative Imports
- Use relative imports for nearby files
- Use absolute imports for distant files
- Keep import paths consistent

## Dependencies and Relationships

### Core Dependencies
- **React**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Lucide React**: Icons
- **Vite**: Build tool

### Internal Dependencies
- Components depend on types and utils
- Context provides global state
- Hooks encapsulate reusable logic

## Maintenance Guidelines

### Adding New Components
1. Determine appropriate folder based on component purpose
2. Create TypeScript interface for props
3. Include proper JSDoc comments
4. Add to barrel export if applicable

### Refactoring
1. Keep file sizes under 200 lines
2. Extract reusable logic to hooks
3. Move shared types to types folder
4. Update documentation

### Code Review Checklist
- [ ] Component in correct folder
- [ ] Proper TypeScript types
- [ ] Follows naming conventions
- [ ] Includes necessary imports
- [ ] No unused dependencies