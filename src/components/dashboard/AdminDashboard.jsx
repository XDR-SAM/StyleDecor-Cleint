import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { servicesAPI, bookingsAPI, decoratorsAPI, analyticsAPI } from '../../util/api';
import Loading from '../Loading';
import toast from 'react-hot-toast';
import ManageServices from './ManageServices';
import ManageBookings from './ManageBookings';
import ManageDecorators from './ManageDecorators';
import Analytics from './Analytics';
import { FaChartBar, FaCog, FaBook, FaUsers } from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics');

  const { data: statsData } = useQuery({
    queryKey: ['analytics', 'stats'],
    queryFn: () => analyticsAPI.getStats(),
  });

  const stats = statsData?.data || {};

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: FaChartBar },
    { id: 'services', label: 'Manage Services', icon: FaCog },
    { id: 'bookings', label: 'Manage Bookings', icon: FaBook },
    { id: 'decorators', label: 'Manage Decorators', icon: FaUsers },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your platform and view analytics</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Users', value: stats.totalUsers || 0, icon: FaUsers, color: 'from-blue-500 to-blue-600' },
          { title: 'Total Decorators', value: stats.totalDecorators || 0, icon: FaUsers, color: 'from-green-500 to-green-600' },
          { title: 'Total Services', value: stats.totalServices || 0, icon: FaCog, color: 'from-purple-500 to-purple-600' },
          { title: 'Total Revenue', value: `৳${stats.totalRevenue || 0}`, icon: FaChartBar, color: 'from-orange-500 to-red-500' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="card-modern p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{stat.title}</p>
                  <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-4 rounded-xl bg-gradient-to-r ${stat.color} text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-1 min-w-[150px] py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon />
              <span className="hidden sm:inline">{tab.label}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'services' && <ManageServices />}
        {activeTab === 'bookings' && <ManageBookings />}
        {activeTab === 'decorators' && <ManageDecorators />}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;

