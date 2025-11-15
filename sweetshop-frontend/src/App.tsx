/**
 * App Home Page
 * -------------------------
 * This is the landing page of the Sweet Shop application.
 * 
 * Purpose:
 *  - Display a simple welcome screen
 *  - Guide user to the login page
 */

export default function App() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold">Welcome to Sweet Shop</h1>
      <p className="mt-2 text-gray-700">Please login to continue.</p>

      {/* Redirect to Login Page */}
      <a
        href="/login"
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Go to Login
      </a>
    </div>
  );
}
