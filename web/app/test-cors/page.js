'use client';

import { useState, useEffect } from 'react';

export default function TestCorsPage() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function testCors() {
      try {
        setLoading(true);
        setError('');
        
        // Test the CORS test endpoint
        const response = await fetch('http://161.97.172.97:8000/api/test-cors', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setMessage(data.message);
      } catch (err) {
        console.error('CORS Test Error:', err);
        setError(err.message || 'Failed to test CORS');
      } finally {
        setLoading(false);
      }
    }
    
    testCors();
  }, []);

  // Test login function
  const testLogin = async () => {
    try {
      setLoading(true);
      setError('');
      
      const formData = new URLSearchParams();
      formData.append('username', 'admin@example.com');
      formData.append('password', 'admin123');
      
      const response = await fetch('http://161.97.172.97:8000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new Error(errorData.detail || `Login failed with status: ${response.status}`);
      }
      
      const data = await response.json();
      setMessage(`Login successful! Token: ${data.access_token.substring(0, 10)}...`);
    } catch (err) {
      console.error('Login Test Error:', err);
      setError(err.message || 'Failed to test login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">CORS Test Page</h1>
        
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {message && (
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-green-700">{message}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
          >
            Test CORS Endpoint
          </button>
          
          <button
            onClick={testLogin}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded"
          >
            Test Login
          </button>
          
          <a
            href="/"
            className="text-center text-blue-500 hover:text-blue-600 underline"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
