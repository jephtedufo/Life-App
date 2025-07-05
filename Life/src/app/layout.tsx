import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Life App',
  description: 'Calendar and Habits Tracker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 