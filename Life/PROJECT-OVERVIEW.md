# Life App 🎯

A comprehensive habit tracking and lifestyle management application built with Next.js, React, and Supabase.

## ✨ Features

- **🗓️ Habit Tracking** - Track daily habits with success/failure status
- **🏆 Points System** - Earn points for completing tasks and habits
- **🎁 Rewards Store** - Redeem points for rewards
- **📊 Statistics** - Detailed analytics and progress tracking
- **👤 User Profiles** - Complete profile management with photo uploads
- **🔐 Authentication** - Secure user registration and login
- **📱 Responsive Design** - Works on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Life
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   node scripts/setup-env.js
   ```
   Then update `.env.local` with your Supabase credentials.

4. **Set up the database**
   - Follow the guide in `docs/DATABASE-SETUP-CHECKLIST.md`
   - Run the SQL scripts in the `database/` folder

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Documentation

All documentation is organized in the `docs/` folder:

- **[📋 Component Reference](docs/README.md)** - Complete guide to all components
- **[🗄️ Database Setup](docs/DATABASE-SETUP-CHECKLIST.md)** - Step-by-step database configuration
- **[🔧 Setup Guide](docs/SETUP-GUIDE.md)** - New features and setup instructions
- **[🚨 Troubleshooting](docs/TROUBLESHOOTING.md)** - Common issues and solutions

## 🗂️ Project Structure

```
Life/
├── docs/                    # 📚 Documentation
│   ├── README.md           # Component reference guide
│   ├── DATABASE-SETUP-CHECKLIST.md
│   ├── SETUP-GUIDE.md
│   └── TROUBLESHOOTING.md
├── database/               # 🗄️ Database scripts
│   ├── complete-database-setup.sql
│   ├── database-test.sql
│   └── database-migration.sql
├── scripts/                # 🔧 Utility scripts
│   └── setup-env.js
├── src/                    # 💻 Source code
│   ├── app/               # Next.js app router
│   └── frontend/          # React components
└── README.md              # This file
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Vercel

## 🎯 Key Components

- **Calendar Page** - Main habit tracking interface
- **Habits Page** - Statistics and habit management
- **Points Page** - Points system and rewards
- **Profile Modal** - User profile management
- **Authentication** - Sign up, login, and route protection

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Environment Variables

Create a `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🚀 Deployment

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Set environment variables in Vercel dashboard**
4. **Deploy!**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:

1. Check the [Troubleshooting Guide](docs/TROUBLESHOOTING.md)
2. Review the [Database Setup Checklist](docs/DATABASE-SETUP-CHECKLIST.md)
3. Open an issue on GitHub

---

**Built with ❤️ using Next.js and Supabase**
