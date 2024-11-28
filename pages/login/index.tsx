import React, { useState } from 'react';
import { useRouter } from 'next/router';

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

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="userName"
          placeholder="UserName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      {/* Forgot Password Link */}
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        <p>
          Forgot your password?{' '}
          <a
            href="/forgot-password"
            style={{
              color: '#0070f3',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Reset it here.
          </a>
        </p>
      </div>
    </div>
  );
}
