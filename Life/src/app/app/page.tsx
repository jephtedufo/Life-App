export default function AppPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Life App - Calendar & Habits
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-center text-gray-600 mb-4">
            Your React frontend will be integrated here.
          </p>
          <div className="text-center">
            <a 
              href="/api/hello" 
              className="text-blue-500 hover:text-blue-700 underline"
              target="_blank"
            >
              Test Backend API
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 