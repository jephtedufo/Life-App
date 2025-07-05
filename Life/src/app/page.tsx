import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to the frontend app
  redirect('/app');
} 