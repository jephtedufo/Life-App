# Project Structure Overview

## 📁 Organized Folder Structure

```
Life/
├── 📚 docs/                          # Documentation
│   ├── README.md                     # Component reference guide
│   ├── DATABASE-SETUP-CHECKLIST.md   # Database setup instructions
│   ├── SETUP-GUIDE.md               # New features and setup
│   └── TROUBLESHOOTING.md           # Common issues and solutions
│
├── 🗄️ database/                      # Database scripts
│   ├── complete-database-setup.sql   # Complete database setup
│   ├── database-test.sql            # Database verification tests
│   └── database-migration.sql       # Migration scripts
│
├── 🔧 scripts/                       # Utility scripts
│   └── setup-env.js                 # Environment setup helper
│
├── ⚙️ Configuration Files (Root)
│   ├── next.config.js               # Next.js configuration
│   ├── tailwind.config.js           # Tailwind CSS configuration
│   ├── postcss.config.js            # PostCSS configuration
│   └── tsconfig.json                # TypeScript configuration
│
├── 💻 src/                          # Source code
│   ├── app/                         # Next.js app router
│   │   ├── api/                     # API routes
│   │   ├── signup/                  # Signup page
│   │   ├── login/                   # Login page
│   │   └── app/                     # Main app page
│   └── frontend/                    # React components
│       ├── components/              # UI components
│       ├── pages/                   # Page components
│       ├── context/                 # React contexts
│       ├── hooks/                   # Custom hooks
│       ├── services/                # API services
│       ├── types/                   # TypeScript types
│       └── utils/                   # Utility functions
│
├── 📄 README.md                     # Main project overview
├── 📋 PROJECT-STRUCTURE.md          # This file
├── 📦 package.json                  # Dependencies and scripts
├── 🚫 .gitignore                    # Git ignore rules
└── 🔐 .env.local                    # Environment variables (not in git)
```

## 🎯 Organization Benefits

### 📚 **Documentation (`docs/`)**
- **Centralized**: All documentation in one place
- **Easy to find**: Clear naming conventions
- **Comprehensive**: Setup, troubleshooting, and reference guides

### 🗄️ **Database (`database/`)**
- **Organized scripts**: Setup, test, and migration scripts
- **Version control**: Track database changes
- **Easy deployment**: Run scripts in order

### 🔧 **Scripts (`scripts/`)**
- **Automation**: Environment setup helpers
- **Reusable**: Common development tasks
- **Documentation**: Self-documenting scripts

### ⚙️ **Configuration (`config/`)**
- **Centralized config**: All config files in one place
- **Easy maintenance**: Update configurations in one location
- **Clear separation**: Config vs source code

### 💻 **Source Code (`src/`)**
- **Next.js structure**: Follows Next.js 14 conventions
- **Component organization**: Logical grouping of components
- **Type safety**: TypeScript throughout

## 🚀 Quick Navigation

### For New Developers:
1. Start with `README.md` for project overview
2. Check `docs/DATABASE-SETUP-CHECKLIST.md` for setup
3. Use `scripts/setup-env.js` for environment setup

### For Database Management:
1. Use `database/complete-database-setup.sql` for initial setup
2. Run `database/database-test.sql` to verify setup
3. Use `database/database-migration.sql` for updates

### For Configuration:
1. All config files are in `config/` folder
2. Update `config/next.config.js` for Next.js settings
3. Modify `config/tailwind.config.js` for styling

### For Documentation:
1. `docs/README.md` - Component reference
2. `docs/TROUBLESHOOTING.md` - Common issues
3. `docs/SETUP-GUIDE.md` - Feature guides

## 🔄 Migration Notes

### Files Moved:
- `README.md` → `docs/README.md` (component reference)
- `DATABASE-SETUP-CHECKLIST.md` → `docs/DATABASE-SETUP-CHECKLIST.md`
- `TROUBLESHOOTING.md` → `docs/TROUBLESHOOTING.md`
- `SETUP-GUIDE.md` → `docs/SETUP-GUIDE.md`
- `complete-database-setup.sql` → `database/complete-database-setup.sql`
- `database-test.sql` → `database/database-test.sql`
- `database-migration.sql` → `database/database-migration.sql`
- Configuration files remain in root (Next.js convention)

### New Files Created:
- `README.md` - New main project overview
- `scripts/setup-env.js` - Environment setup helper
- `PROJECT-STRUCTURE.md` - This documentation file

## 📋 Maintenance

### Adding New Documentation:
- Place in appropriate `docs/` subfolder
- Update this file if adding new categories

### Adding New Scripts:
- Place in `scripts/` folder
- Add to `package.json` scripts if needed

### Adding New Config:
- Place in `config/` folder
- Update build process if needed

### Database Changes:
- Create new migration scripts in `database/`
- Update test scripts accordingly

This organization makes the project more maintainable, easier to navigate, and follows best practices for modern web development! 🎉 