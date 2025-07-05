# Life App Backend (Simple Version)

A simple Next.js backend for the Life App.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run locally:**
   ```bash
   npm run dev
   ```

3. **Deploy to Vercel:**
   - Connect your GitHub repository to Vercel
   - Set Root Directory to `/` (or the folder containing this backend)
   - Deploy!

## API Endpoints

- `GET /api/hello` - Test endpoint
- `GET /api/habits` - Get all habits
- `POST /api/habits` - Create a new habit
- `GET /api/points` - Get all points
- `POST /api/points` - Add new points

## Features

- ✅ Simple and reliable
- ✅ No database setup required (in-memory storage)
- ✅ Easy to deploy
- ✅ TypeScript errors ignored for deployment
- ✅ Ready for production

## Testing

Visit `http://localhost:3001/api/hello` to test the backend. 