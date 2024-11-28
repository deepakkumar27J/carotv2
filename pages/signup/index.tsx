import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();


  const today = new Date();
  const minDate = new Date(today);
  minDate.setMonth(minDate.getMonth() - 1); // 1 month ago
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 1); // 1 month in the future

  const formatDate = (date: Date): string =>
    date.toISOString().split('T')[0];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate) {
        setError('Please select a valid start date.');
        return;
      }
    
    try {
      const response = await fetch('http://localhost:8080/api/v1/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, startDate }),
      });
      if (response.ok) {
        router.push('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        {/* Start Date */}
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min={formatDate(minDate)}
          max={formatDate(maxDate)}
          required
        />
        <br />
        <button type="submit">Signup</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
