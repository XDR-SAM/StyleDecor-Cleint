import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../authcontext/authcontext';
import { uploadAPI } from '../util/api';
import toast from 'react-hot-toast';
import { FaGoogle, FaUpload, FaUser, FaEnvelope, FaLock, FaImage } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    profileImage: '',
  });
  const [uploading, setUploading] = useState(false);
  const { register, socialLogin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64Image = reader.result;
        const response = await uploadAPI.uploadImage(base64Image);
        setFormData({ ...formData, profileImage: response.data.url });
        toast.success('Image uploaded successfully!');
      } catch {
        toast.error('Failed to upload image');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await register(
      formData.email,
      formData.password,
      formData.displayName,
      formData.profileImage
    );

    if (result.success) {
      toast.success('Registration successful!');
      navigate('/dashboard');
    } else {
      toast.error(result.message);
    }

    setLoading(false);
  };

  const handleSocialLogin = async () => {
    setLoading(true);
    const result = await socialLogin();
    if (result.success) {
      toast.success('Registration successful!');
      navigate('/dashboard');
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="card-modern p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold text-gradient-accent mb-2">Create Account</h2>
            <p className="text-gray-600 dark:text-gray-400">Join us and start decorating</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="form-control"
            >
              <label className="label">
                <span className="label-text font-semibold text-gray-700 dark:text-gray-300">
                  Display Name
                </span>
              </label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input-modern input w-full pl-12 py-3 rounded-xl"
                  required
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="form-control"
            >
              <label className="label">
                <span className="label-text font-semibold text-gray-700 dark:text-gray-300">
                  Email Address
                </span>
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input-modern input w-full pl-12 py-3 rounded-xl"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="form-control"
            >
              <label className="label">
                <span className="label-text font-semibold text-gray-700 dark:text-gray-300">
                  Password
                </span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Enter your password (min 6 characters)"
                  className="input-modern input w-full pl-12 py-3 rounded-xl"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="form-control"
            >
              <label className="label">
                <span className="label-text font-semibold text-gray-700 dark:text-gray-300">
                  Profile Image (Optional)
                </span>
              </label>
              <div className="relative">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      className="file-input file-input-bordered w-full input-modern rounded-xl"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </div>
                  {uploading && (
                    <span className="loading loading-spinner loading-md"></span>
                  )}
                </label>
              </div>
              {formData.profileImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 flex justify-center"
                >
                  <img
                    src={formData.profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-orange-500 ring-offset-2 dark:ring-offset-gray-800"
                  />
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="form-control mt-8"
            >
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-gradient w-full py-3 rounded-xl text-lg font-semibold"
                disabled={loading || uploading}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  'Create Account'
                )}
              </motion.button>
            </motion.div>
          </form>

          <div className="divider my-6">
            <span className="text-gray-500 dark:text-gray-400">OR</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSocialLogin}
            className="btn w-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 py-3 rounded-xl"
            disabled={loading}
          >
            <FaGoogle className="mr-2 text-orange-500" />
            Continue with Google
          </motion.button>

          <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-orange-500 dark:text-orange-400 font-semibold hover:text-orange-600 dark:hover:text-orange-500 transition-colors duration-200"
            >
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

