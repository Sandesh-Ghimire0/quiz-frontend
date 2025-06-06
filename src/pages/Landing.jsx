import React from 'react';
import { NavLink } from 'react-router-dom';

// Main App component for the Quiz App Landing Page
function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-inter flex flex-col justify-center items-center p-4">
      {/* Hero Section */}
      <header className="text-center py-16 px-4 md:px-8 max-w-4xl w-full">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-cyan-700 to-teal-800">
            Test Your Knowledge
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800">
            With Our Quiz App!
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Challenge yourself with fun quizzes across various topics and learn something new every day.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
            <NavLink to='/login'>
                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300">
                    Start a Quiz
                </button>
            </NavLink>
            <button className="bg-transparent border-2 border-indigo-700 hover:bg-indigo-700 hover:text-white text-indigo-700 font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300">
                Browse Categories
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="w-full max-w-5xl py-16 px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Why You'll Love Our <span className="text-green-600">Quizzes</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200 transform transition duration-300 hover:scale-105">
            <div className="text-4xl mb-4 text-yellow-600">🧠</div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Diverse Categories</h3>
            <p className="text-gray-700">
              From history to science, pop culture to geography – there's a quiz for everyone!
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200 transform transition duration-300 hover:scale-105">
            <div className="text-4xl mb-4 text-purple-600">🚀</div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Fast & Engaging</h3>
            <p className="text-gray-700">
              Enjoy quick, interactive quizzes designed to keep you hooked and entertained.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200 transform transition duration-300 hover:scale-105">
            <div className="text-4xl mb-4 text-blue-600">📊</div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Track Your Progress</h3>
            <p className="text-gray-700">
              See how you improve over time and master your favorite subjects.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full max-w-4xl py-16 px-4 md:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
          Ready for a Challenge?
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Click below to start your first quiz and discover how much you know!
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg">
          Take the First Quiz!
        </button>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} QuizMaster. All rights reserved.</p>
        <p className="mt-2">
          Powered by <span className="text-green-600">Curiosity</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
