import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../authcontext/authcontext';
import { servicesAPI, bookingsAPI } from '../util/api';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';
import { FaCalendar, FaMapMarkerAlt, FaTag, FaInfoCircle, FaBook } from 'react-icons/fa';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    bookingDate: '',
    location: '',
    userNotes: '',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['service', id],
    queryFn: () => servicesAPI.getById(id),
  });

  const createBookingMutation = useMutation({
    mutationFn: (data) => bookingsAPI.create(data),
    onSuccess: () => {
      toast.success('Booking created successfully!');
      queryClient.invalidateQueries(['bookings']);
      setShowBookingModal(false);
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create booking');
    },
  });

  const service = data?.data;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to book a service');
      navigate('/login');
      return;
    }

    createBookingMutation.mutate({
      serviceId: id,
      bookingDate: bookingData.bookingDate,
      location: bookingData.location,
      userNotes: bookingData.userNotes,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-xl text-gray-500">Service not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Service Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={service.imageUrl || 'https://via.placeholder.com/600x400'}
              alt={service.service_name}
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="badge badge-lg bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
                {service.service_category}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Service Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              {service.service_name}
            </h1>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-gradient-accent">
                ৳{service.cost}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-lg">/{service.unit}</span>
            </div>
          </div>

          <div className="card-modern p-6">
            <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
              <FaInfoCircle className="text-orange-500" />
              Description
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {service.description}
            </p>
          </div>

          <div className="card-modern p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
              <FaTag className="text-orange-500" />
              Service Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Category:</span>
                <span className="badge badge-accent">{service.service_category}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Unit:</span>
                <span className="text-gray-600 dark:text-gray-400">{service.unit}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Created:</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {new Date(service.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (!user) {
                toast.error('Please login to book a service');
                navigate('/login');
              } else {
                setShowBookingModal(true);
              }
            }}
            className="btn-gradient w-full py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2"
          >
            <FaBook />
            Book Now
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Booking Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        title="Book Service"
        showCloseButton={true}
      >
        <form onSubmit={handleBookingSubmit} className="space-y-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 dark:text-gray-300">Service</span>
            </label>
            <input
              type="text"
              className="input-modern input w-full rounded-xl"
              value={service.service_name}
              disabled
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 dark:text-gray-300">Your Email</span>
            </label>
            <input
              type="email"
              className="input-modern input w-full rounded-xl"
              value={user?.email || ''}
              disabled
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 dark:text-gray-300">Your Name</span>
            </label>
            <input
              type="text"
              className="input-modern input w-full rounded-xl"
              value={user?.displayName || ''}
              disabled
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FaCalendar className="text-orange-500" />
                Booking Date *
              </span>
            </label>
            <input
              type="datetime-local"
              className="input-modern input w-full rounded-xl"
              required
              value={bookingData.bookingDate}
              onChange={(e) =>
                setBookingData({ ...bookingData, bookingDate: e.target.value })
              }
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <FaMapMarkerAlt className="text-orange-500" />
                Location *
              </span>
            </label>
            <input
              type="text"
              className="input-modern input w-full rounded-xl"
              placeholder="Enter service location"
              required
              value={bookingData.location}
              onChange={(e) =>
                setBookingData({ ...bookingData, location: e.target.value })
              }
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 dark:text-gray-300">Additional Notes</span>
            </label>
            <textarea
              className="textarea textarea-bordered input-modern rounded-xl min-h-[100px]"
              placeholder="Any special requirements or notes..."
              value={bookingData.userNotes}
              onChange={(e) =>
                setBookingData({ ...bookingData, userNotes: e.target.value })
              }
            />
          </div>

          <div className="form-control mt-6">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-gradient w-full py-3 rounded-xl text-lg font-semibold"
              disabled={createBookingMutation.isPending}
            >
              {createBookingMutation.isPending ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                'Confirm Booking'
              )}
            </motion.button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ServiceDetails;

