import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingsAPI, decoratorsAPI } from '../../util/api';
import Loading from '../Loading';
import toast from 'react-hot-toast';
import { FaCheck, FaUser } from 'react-icons/fa';

const ManageBookings = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');

  const { data: bookingsData, isLoading: bookingsLoading } = useQuery({
    queryKey: ['bookings', 'admin', { page, status: statusFilter }],
    queryFn: () => bookingsAPI.getAll({ page, limit: 10, status: statusFilter }),
  });

  const { data: decoratorsData } = useQuery({
    queryKey: ['decorators', 'all'],
    queryFn: () => decoratorsAPI.getAll({}),
  });

  const assignDecoratorMutation = useMutation({
    mutationFn: ({ id, decoratorEmail }) =>
      bookingsAPI.assignDecorator(id, decoratorEmail),
    onSuccess: () => {
      toast.success('Decorator assigned successfully');
      queryClient.invalidateQueries(['bookings']);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to assign decorator');
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => bookingsAPI.updateStatus(id, status),
    onSuccess: () => {
      toast.success('Status updated successfully');
      queryClient.invalidateQueries(['bookings']);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update status');
    },
  });

  const bookings = bookingsData?.data?.bookings || [];
  const pagination = bookingsData?.data?.pagination || {};
  const decorators = decoratorsData?.data?.decorators || [];

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

  if (bookingsLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Bookings</h2>
        <select
          className="select select-bordered"
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="assigned">Assigned</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Service</th>
              <th>Client</th>
              <th>Date</th>
              <th>Location</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Decorator</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="font-semibold">{booking.serviceName}</td>
                <td>{booking.userName}</td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td className="text-sm">{booking.location}</td>
                <td className="font-bold text-accent">৳{booking.serviceCost}</td>
                <td>
                  <div className={`badge ${getStatusBadge(booking.status)}`}>
                    {booking.status}
                  </div>
                </td>
                <td>
                  {booking.isPaid ? (
                    <div className="badge badge-success">Paid</div>
                  ) : (
                    <div className="badge badge-warning">Unpaid</div>
                  )}
                </td>
                <td>
                  {booking.assignedDecorator ? (
                    <div className="badge badge-info">
                      {booking.assignedDecorator}
                    </div>
                  ) : (
                    <span className="text-gray-400">Not assigned</span>
                  )}
                </td>
                <td>
                  <div className="flex flex-col gap-2">
                    {booking.isPaid && !booking.assignedDecorator && (
                      <select
                        className="select select-sm select-bordered"
                        onChange={(e) => {
                          if (e.target.value) {
                            assignDecoratorMutation.mutate({
                              id: booking._id,
                              decoratorEmail: e.target.value,
                            });
                          }
                        }}
                      >
                        <option value="">Assign Decorator</option>
                        {decorators
                          .filter((d) => d.isActive)
                          .map((decorator) => (
                            <option key={decorator.email} value={decorator.email}>
                              {decorator.displayName}
                            </option>
                          ))}
                      </select>
                    )}
                    {booking.status !== 'completed' &&
                      booking.status !== 'cancelled' && (
                        <select
                          className="select select-sm select-bordered"
                          value={booking.status}
                          onChange={(e) => {
                            updateStatusMutation.mutate({
                              id: booking._id,
                              status: e.target.value,
                            });
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="assigned">Assigned</option>
                          <option value="planning">Planning</option>
                          <option value="materials-prepared">
                            Materials Prepared
                          </option>
                          <option value="on-the-way">On the Way</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {bookings.map((booking) => (
          <div key={booking._id} className="card-modern p-4">
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{booking.serviceName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Client: {booking.userName}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Date:</span>
                  <p className="text-gray-800 dark:text-gray-200">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Amount:</span>
                  <p className="font-bold text-gradient-accent text-lg">৳{booking.serviceCost}</p>
                </div>
              </div>

              <div>
                <span className="text-gray-500 dark:text-gray-400 text-sm">Location:</span>
                <p className="text-gray-800 dark:text-gray-200 text-sm">{booking.location}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <div className={`badge ${getStatusBadge(booking.status)}`}>
                  {booking.status}
                </div>
                {booking.isPaid ? (
                  <div className="badge badge-success">Paid</div>
                ) : (
                  <div className="badge badge-warning">Unpaid</div>
                )}
                {booking.assignedDecorator && (
                  <div className="badge badge-info">
                    {booking.assignedDecorator}
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                {booking.isPaid && !booking.assignedDecorator && (
                  <select
                    className="select select-sm select-bordered w-full"
                    onChange={(e) => {
                      if (e.target.value) {
                        assignDecoratorMutation.mutate({
                          id: booking._id,
                          decoratorEmail: e.target.value,
                        });
                      }
                    }}
                  >
                    <option value="">Assign Decorator</option>
                    {decorators
                      .filter((d) => d.isActive)
                      .map((decorator) => (
                        <option key={decorator.email} value={decorator.email}>
                          {decorator.displayName}
                        </option>
                      ))}
                  </select>
                )}
                {booking.status !== 'completed' &&
                  booking.status !== 'cancelled' && (
                    <select
                      className="select select-sm select-bordered w-full"
                      value={booking.status}
                      onChange={(e) => {
                        updateStatusMutation.mutate({
                          id: booking._id,
                          status: e.target.value,
                        });
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="assigned">Assigned</option>
                      <option value="planning">Planning</option>
                      <option value="materials-prepared">
                        Materials Prepared
                      </option>
                      <option value="on-the-way">On the Way</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            className="btn btn-outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span className="flex items-center px-4 text-gray-800 dark:text-gray-200">
            Page {page} of {pagination.totalPages}
          </span>
          <button
            className="btn btn-outline"
            disabled={page === pagination.totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;

