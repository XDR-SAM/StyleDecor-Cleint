import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentCancelled = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const bookingId = searchParams.get('booking_id');

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card-modern p-8 max-w-lg mx-auto text-center"
      >
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Payment Cancelled</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Your payment was cancelled. {bookingId ? 'You can try again from your booking details.' : ''}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-gradient px-6 py-3 rounded-xl font-semibold"
          >
            Back to Dashboard
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

export default PaymentCancelled;

