import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <div className="max-w-xl w-full bg-white rounded shadow p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2 text-center">Life App Dashboard</h1>
        <p className="text-gray-600 mb-8 text-center">
          Welcome to your all-in-one lifestyle management dashboard. Choose a section below to get started!
        </p>
        <div className="w-full flex flex-col gap-4">
          <Link href="/calendar" className="w-full">
            <button className="w-full py-3 px-4 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition">Calendar</button>
          </Link>
          <Link href="/points" className="w-full">
            <button className="w-full py-3 px-4 bg-green-600 text-white rounded font-semibold hover:bg-green-700 transition">Points</button>
          </Link>
          <Link href="/habits" className="w-full">
            <button className="w-full py-3 px-4 bg-purple-600 text-white rounded font-semibold hover:bg-purple-700 transition">Habits</button>
          </Link>
          <Link href="/statistics" className="w-full">
            <button className="w-full py-3 px-4 bg-yellow-600 text-white rounded font-semibold hover:bg-yellow-700 transition">Statistics</button>
          </Link>
          <Link href="/profile" className="w-full">
            <button className="w-full py-3 px-4 bg-gray-700 text-white rounded font-semibold hover:bg-gray-800 transition">Profile</button>
          </Link>
        </div>
      </div>
    </main>
  );
} 