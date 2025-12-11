import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { bookingsAPI } from '../../util/api';
import Loading from '../Loading';
import toast from 'react-hot-toast';
import { FaCalendar, FaMapMarkerAlt, FaCheck, FaUser, FaClipboardList } from 'react-icons/fa';

const DecoratorDashboard = () => {
  const queryClient = useQueryClient();
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ['myAssignments'],
    queryFn: () => bookingsAPI.getMyAssignments(),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => bookingsAPI.updateStatus(id, status),
    onSuccess: () => {
      toast.success('Status updated successfully');
      queryClient.invalidateQueries(['myAssignments']);
      setSelectedBooking(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update status');
    },
  });

  const bookings = data?.data?.bookings || [];

  const statusFlow = [
    'assigned',
    'planning',
    'materials-prepared',
    'on-the-way',
    'in-progress',
    'completed',
  ];

  const getNextStatus = (currentStatus) => {
    const currentIndex = statusFlow.indexOf(currentStatus);
    if (currentIndex < statusFlow.length - 1) {
      return statusFlow[currentIndex + 1];
    }
    return null;
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      assigned: 'badge-primary',
      planning: 'badge-secondary',
      'materials-prepared': 'badge-accent',
      'on-the-way': 'badge-info',
      'in-progress': 'badge-warning',
      completed: 'badge-success',
    };
    return statusColors[status] || 'badge-ghost';
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">Decorator Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your assigned projects</p>
      </motion.div>

      {bookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 card-modern"
        >
          <p className="text-xl text-gray-500 dark:text-gray-400">No assigned projects</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="card-modern p-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {booking.serviceName}
                  </h3>
                  <div className="space-y-3">
                    <p className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <FaCalendar className="text-orange-500" />
                      {new Date(booking.bookingDate).toLocaleString()}
                    </p>
                    <p className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <FaMapMarkerAlt className="text-orange-500" />
                      {booking.location}
                    </p>
                    <p className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                      <FaUser className="text-orange-500" />
                      <span className="font-semibold">Client: {booking.userName}</span>
                    </p>
                    {booking.userNotes && (
                      <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <p className="text-gray-600 dark:text-gray-400">
                          <span className="font-semibold">Notes: </span>
                          {booking.userNotes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <span className={`badge ${getStatusBadge(booking.status)} badge-lg`}>
                    {booking.status}
                  </span>
                  {booking.isPaid ? (
                    <span className="badge badge-success badge-lg">Paid</span>
                  ) : (
                    <span className="badge badge-warning badge-lg">Unpaid</span>
                  )}
                </div>
              </div>

              {/* Status Progress */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                  <FaClipboardList className="text-orange-500" />
                  Status Progress
                </p>

                {/* Desktop: Horizontal Layout */}
                <div className="hidden sm:flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {statusFlow.map((status, index) => {
                    const isActive = statusFlow.indexOf(booking.status) >= index;
                    const isCurrent = booking.status === status;
                    return (
                      <div key={status} className="flex items-center flex-shrink-0">
                        <div
                          className={`badge whitespace-nowrap ${isActive
                              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-0'
                              : 'badge-ghost'
                            } ${isCurrent ? 'badge-lg shadow-lg' : ''}`}
                        >
                          {status.replace('-', ' ')}
                        </div>
                        {index < statusFlow.length - 1 && (
                          <div
                            className={`w-8 h-1 mx-2 rounded flex-shrink-0 ${isActive
                                ? 'bg-gradient-to-r from-orange-500 to-red-500'
                                : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Mobile: Vertical Layout */}
                <div className="sm:hidden space-y-2">
                  {statusFlow.map((status, index) => {
                    const isActive = statusFlow.indexOf(booking.status) >= index;
                    const isCurrent = booking.status === status;
                    return (
                      <div key={status} className="flex items-center gap-3">
                        <div
                          className={`badge whitespace-nowrap flex-shrink-0 ${isActive
                              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-0'
                              : 'badge-ghost'
                            } ${isCurrent ? 'badge-lg shadow-lg' : 'badge-sm'}`}
                        >
                          {status.replace('-', ' ')}
                        </div>
                        {isCurrent && (
                          <span className="text-xs text-orange-500 font-semibold">← Current</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Update Status Button */}
              {getNextStatus(booking.status) && (
                <div className="flex justify-end mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-sm bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
                    onClick={() => {
                      updateStatusMutation.mutate({
                        id: booking._id,
                        status: getNextStatus(booking.status),
                      });
                    }}
                    disabled={updateStatusMutation.isPending}
                  >
                    <FaCheck className="mr-1" />
                    Update to {getNextStatus(booking.status).replace('-', ' ')}
                  </motion.button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DecoratorDashboard;

