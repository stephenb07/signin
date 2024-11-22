'use client'

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/');
        alert('Account created successfully! Please login.');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred during registration');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-white p-4">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
          <h1 className="text-2xl font-bold">AuthFlow</h1>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Create Account</h2>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-600 mb-2">Your email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 mb-2">Create password</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 