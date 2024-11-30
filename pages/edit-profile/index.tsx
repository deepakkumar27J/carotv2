import React, { useState } from 'react';
import axios from 'axios';
import RotaLayout from '../layout';

const EditProfilePage = () => {
  const [password, setPassword] = useState('');
  const [startDate, setStartDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const userId = '6735739339650ea6a20f7a23'; // Replace with dynamic user ID if needed

  // Handle form submission
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.put(`http://localhost:8080/api/v1/users/${userId}`, {
        password,
        startDate,
      });

      if (response.status === 200) {
        setSuccessMessage('Profile updated successfully!');
        setPassword(''); // Clear the password field after a successful update
        setStartDate(''); // Reset start date if needed
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage('Failed to update profile. Please try again.');
    }
  };

  return (
    <RotaLayout>
      <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow-lg bg-white">
        <h2 className="text-xl font-bold text-center mb-4">Edit Profile</h2>

        {/* Success and Error Messages */}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        {/* Profile Update Form */}
        <form onSubmit={handleUpdateProfile}>
          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter new password"
            />
          </div>

          {/* Start Date Field */}
          <div className="mb-4">
            <label htmlFor="startDate" className="block font-bold mb-2">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </RotaLayout>
  );
};

export default EditProfilePage;
