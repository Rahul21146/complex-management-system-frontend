function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Hello React + Tailwind!
        </h1>

        <p className="text-gray-600 mb-6">
          Your React application is now using Tailwind CSS.
        </p>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition">
          Get Started
        </button>
      </div>
    </div>
  )
}

export default App
