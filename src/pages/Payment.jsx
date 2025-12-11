/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { bookingsAPI, paymentsAPI } from '../util/api';
import Loading from '../components/Loading';
import toast from 'react-hot-toast';
import { FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';

const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: bookingsData, isLoading: bookingLoading } = useQuery({
    queryKey: ['myBookings'],
    queryFn: () => bookingsAPI.getMyBookings({ limit: 1000 }),
    enabled: !!bookingId,
  });

  const booking = bookingsData?.data?.bookings?.find((b) => b._id === bookingId);
  const isBookingPaid = booking?.isPaid || booking?.paymentStatus === 'paid';

  const createSessionMutation = useMutation({
    mutationFn: () => paymentsAPI.createCheckoutSession(bookingId),
    onSuccess: async (response) => {
      const payload = response?.data || response;
      const sessionId = payload?.sessionId;
      const hostedUrl = payload?.url;
      // Prefer Stripe-hosted checkout URL so the user is taken off-site
      if (hostedUrl) {
        window.location.href = hostedUrl;
        return;
      }

      // Fallback: if only sessionId is returned and Stripe.js is configured
      if (sessionId) {
        try {
          const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
          if (!stripeKey) throw new Error('Stripe key missing');
          const stripeModule = await import('@stripe/stripe-js');
          const stripe = await stripeModule.loadStripe(stripeKey);
          if (!stripe) throw new Error('Stripe failed to initialize');
          const { error } = await stripe.redirectToCheckout({ sessionId });
          if (error) throw error;
          return;
        } catch (err) {
          toast.error(err?.message || 'Unable to redirect to checkout');
          return;
        }
      }

      toast.error('Unable to start checkout. Please try again.');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to start payment');
    },
    onSettled: () => {
      queryClient.invalidateQueries(['myBookings']);
    },
  });

  const handlePay = () => {
    createSessionMutation.mutate();
  };

  if (bookingLoading) {
    return <Loading />;
  }

  if (!booking) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-modern p-8 max-w-md mx-auto"
        >
          <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">Booking not found</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="btn-gradient px-6 py-3 rounded-xl"
          >
            Go to Dashboard
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (isBookingPaid) {
    return (
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-modern p-8 max-w-md mx-auto text-center"
        >
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Payment Already Completed</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This booking has already been paid for.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="btn-gradient px-6 py-3 rounded-xl"
          >
            Go to Dashboard
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">Complete Payment</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Secure payment processing with Stripe</p>
      </motion.div>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-modern p-6">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
            <FaMoneyBillWave className="text-orange-500" />
            Payment Details
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Service</p>
              <p className="font-semibold text-gray-900 dark:text-white">{booking.serviceName}</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 rounded-xl">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Amount</p>
              <p className="text-3xl font-bold text-gradient-accent">৳{booking.serviceCost}</p>
            </div>
          </div>
        </motion.div>

        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-gradient w-full py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2"
          disabled={createSessionMutation.isLoading}
          onClick={handlePay}
        >
          {createSessionMutation.isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <>
              <FaCheckCircle />
              Pay with Stripe
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default Payment;

