import React, { useState } from 'react';
import { useRouter } from 'next/router';
// import { GoogleLogin } from 'react-google-login';

export default function LoginPage() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password }),
      });
      if (response.ok) {
        router.push('/dashboard');
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleGoogleSuccess = (response: any) => {
    console.log('Google Sign-In Success:', response);
    // Handle Google Login Success Logic
  };

  const handleGoogleFailure = (error: any) => {
    console.error('Google Sign-In Failure:', error);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Login Form Container */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        {/* Google Sign-In */}
        {/* <div className="mb-4">
          <h3 className="text-gray-600 text-center mb-2">Sign in using:</h3>
          <GoogleLogin
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}
            buttonText="Sign in with Google"
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy={'single_host_origin'}
            className="w-full"
          />
        </div> */}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* UserName Input */}
          <div>
            <input
              type="text"
              placeholder="UserName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition"
          >
            Login
          </button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>

        {/* Forgot Password */}
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Forgot your password?{' '}
            <a
              href="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Reset it here.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
