"use client";

import ProtectedRoute from '@/components/auth/ProtectedRoutes';

const page = () => {
  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Course Management</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Manage your courses, modules, and materials</p>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Manage Courses
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Manage students and other administrators</p>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Manage Users
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Analytics</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">View platform usage and student progress</p>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default page;