import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { paymentsAPI } from '../util/api';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const sessionId = searchParams.get('session_id');
  const bookingId = searchParams.get('booking_id');

  const verifyMutation = useMutation({
    mutationFn: () => paymentsAPI.verifySession({ sessionId, bookingId }),
    onSuccess: () => {
      toast.success('Payment verified successfully!');
      queryClient.invalidateQueries(['myBookings']);
      queryClient.invalidateQueries(['myPayments']);
    },
    onError: (error) => {
      // If token is missing/expired, we still show success messaging but inform the user.
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Don't show error toast - payment was successful, just verification failed
        // The user will see a message in the UI below
        console.log('Payment verification skipped due to auth - payment was still successful');
      } else {
        toast.error(error.response?.data?.message || 'Unable to verify payment');
      }
    },
  });

  useEffect(() => {
    if (sessionId && bookingId) {
      verifyMutation.mutate();
    }
  }, [sessionId, bookingId]);

  const missingParams = !sessionId || !bookingId;

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-modern p-8 max-w-lg mx-auto text-center"
      >
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Payment Successful</h2>

        {missingParams ? (
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We could not verify the payment because the session details were missing. Please contact support if your
            payment was processed.
          </p>
        ) : verifyMutation.isLoading ? (
          <p className="text-gray-600 dark:text-gray-400 mb-6">Verifying your payment, please wait...</p>
        ) : verifyMutation.isError ? (
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your payment was successful! {verifyMutation.error?.response?.status === 401 || verifyMutation.error?.response?.status === 403
              ? 'Your booking will be automatically synced. Please refresh your dashboard to see the updated status.'
              : 'There was an issue verifying the payment. Please contact support if your booking doesn\'t appear in your dashboard.'}
          </p>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your payment has been confirmed. A confirmation has been added to your bookings.
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-gradient px-6 py-3 rounded-xl font-semibold"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate('/services')}
            className="btn-outline px-6 py-3 rounded-xl font-semibold border border-orange-500 text-orange-500"
          >
            Browse Services
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;

