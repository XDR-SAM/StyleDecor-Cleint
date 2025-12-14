import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../authcontext/authcontext';
import { bookingsAPI, paymentsAPI } from '../../util/api';
import Loading from '../Loading';
import ConfirmationModal from '../ConfirmationModal';
import toast from 'react-hot-toast';
import { FaCalendar, FaMapMarkerAlt, FaMoneyBillWave, FaTimes, FaUser, FaBook, FaCreditCard } from 'react-icons/fa';

const UserDashboard = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('bookings');
  const [cancelModal, setCancelModal] = useState({ isOpen: false, bookingId: null, serviceName: '' });

  const { data: bookingsData, isLoading: bookingsLoading } = useQuery({
    queryKey: ['myBookings'],
    queryFn: () => bookingsAPI.getMyBookings({ limit: 100 }),
  });

  const { data: paymentsData, isLoading: paymentsLoading } = useQuery({
    queryKey: ['myPayments'],
    queryFn: () => paymentsAPI.getMyPayments(),
  });

  const cancelBookingMutation = useMutation({
    mutationFn: (id) => bookingsAPI.cancel(id),
    onSuccess: () => {
      toast.success('Booking cancelled successfully');
      queryClient.invalidateQueries(['myBookings']);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    },
  });

  const bookings = bookingsData?.data?.bookings || [];
  const payments = paymentsData?.data?.payments || [];

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: 'badge-warning',
      confirmed: 'badge-info',
      assigned: 'badge-primary',
      planning: 'badge-secondary',
      'materials-prepared': 'badge-accent',
      'on-the-way': 'badge-info',
      'in-progress': 'badge-primary',
      completed: 'badge-success',
      cancelled: 'badge-error',
    };
    return statusColors[status] || 'badge-ghost';
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">My Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your bookings and payments</p>
      </motion.div>

      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card-modern p-6"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="avatar">
            <div className="w-24 rounded-full ring-4 ring-orange-500 ring-offset-2 dark:ring-offset-gray-900">
              {user.profileImage ? (
                <img src={user.profileImage} alt={user.displayName} className="w-full h-full object-cover object-center" />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center text-3xl font-bold">
                  {user.displayName?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{user.displayName}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-3">{user.email}</p>
            <span className="badge badge-lg bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
              {user.role || 'user'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-2 gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-xl"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'bookings'
            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          onClick={() => setActiveTab('bookings')}
        >
          <FaBook />
          <span className="hidden sm:inline">My Bookings</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${activeTab === 'payments'
            ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          onClick={() => setActiveTab('payments')}
        >
          <FaCreditCard />
          <span className="hidden sm:inline">Payment History</span>
        </motion.button>
      </motion.div>

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {bookingsLoading ? (
            <Loading />
          ) : bookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 card-modern"
            >
              <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">No bookings found</p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/services"
                  className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Book a Service
                </Link>
              </motion.div>
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
                          <FaMoneyBillWave className="text-orange-500" />
                          <span className="text-xl font-bold text-gradient-accent">৳{booking.serviceCost}</span>
                        </p>
                        {booking.userNotes && (
                          <p className="text-gray-600 dark:text-gray-400 mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            {booking.userNotes}
                          </p>
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

                  <div className="flex flex-wrap gap-3 justify-end mt-6">
                    {!booking.isPaid && booking.status !== 'cancelled' && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to={`/payment/${booking._id}`}
                          className="btn btn-sm bg-gradient-to-r from-orange-500 to-red-500 text-white border-0"
                        >
                          Pay Now
                        </Link>
                      </motion.div>
                    )}
                    {booking.status !== 'completed' &&
                      booking.status !== 'cancelled' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn btn-sm btn-error"
                          onClick={() => {
                            setCancelModal({
                              isOpen: true,
                              bookingId: booking._id,
                              serviceName: booking.serviceName
                            });
                          }}
                          disabled={cancelBookingMutation.isPending}
                        >
                          <FaTimes className="mr-1" />
                          Cancel
                        </motion.button>
                      )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {paymentsLoading ? (
            <Loading />
          ) : payments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 card-modern"
            >
              <p className="text-xl text-gray-500 dark:text-gray-400">No payment history</p>
            </motion.div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <div className="card-modern p-6">
                  <table className="table w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-gray-700 dark:text-gray-300 font-semibold">Date</th>
                        <th className="text-gray-700 dark:text-gray-300 font-semibold">Amount</th>
                        <th className="text-gray-700 dark:text-gray-300 font-semibold">Status</th>
                        <th className="text-gray-700 dark:text-gray-300 font-semibold">Payment ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment, index) => (
                        <motion.tr
                          key={payment._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <td className="text-gray-700 dark:text-gray-300">
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </td>
                          <td className="font-bold text-gradient-accent text-lg">৳{payment.amount}</td>
                          <td>
                            <span className="badge badge-success badge-lg">
                              {payment.status}
                            </span>
                          </td>
                          <td className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                            {payment.paymentIntentId?.substring(0, 20)}...
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {payments.map((payment, index) => (
                  <motion.div
                    key={payment._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="card-modern p-4"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                          <p className="text-gray-800 dark:text-gray-200 font-medium">
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="badge badge-success">
                          {payment.status}
                        </span>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                        <p className="font-bold text-gradient-accent text-2xl">৳{payment.amount}</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Payment ID</p>
                        <p className="text-xs text-gray-600 dark:text-gray-300 font-mono break-all">
                          {payment.paymentIntentId}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      )}

      {/* Cancel Booking Confirmation Modal */}
      <ConfirmationModal
        isOpen={cancelModal.isOpen}
        onClose={() => setCancelModal({ isOpen: false, bookingId: null, serviceName: '' })}
        onConfirm={() => {
          if (cancelModal.bookingId) {
            cancelBookingMutation.mutate(cancelModal.bookingId);
            setCancelModal({ isOpen: false, bookingId: null, serviceName: '' });
          }
        }}
        title="Cancel Booking"
        message={`Are you sure you want to cancel your booking for "${cancelModal.serviceName}"? This action cannot be undone.`}
        confirmText="Yes, Cancel Booking"
        cancelText="No, Keep Booking"
        confirmButtonClass="btn-error"
        isLoading={cancelBookingMutation.isPending}
      />
    </div>
  );
};

export default UserDashboard;

