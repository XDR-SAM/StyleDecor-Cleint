import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { servicesAPI, decoratorsAPI } from '../util/api';
import Loading from '../components/Loading';
import heroSticker from '../assets/herosticker.png';
import heroSticker1 from '../assets/herosticker1.png';
import heroSticker2 from '../assets/herosticker2.png';
import heroSticker3 from '../assets/herosticker3.png';
import heroSticker4 from '../assets/herosticker4.png';
import { FaStar } from 'react-icons/fa';
import ServiceCoverageMap from '../components/ServiceCoverageMap';

const Home = () => {
  const { data: servicesData, isLoading: servicesLoading } = useQuery({
    queryKey: ['services', { limit: 6 }],
    queryFn: () => servicesAPI.getAll({ limit: 6 }),
  });

  const { data: decoratorsData, isLoading: decoratorsLoading } = useQuery({
    queryKey: ['decorators'],
    queryFn: () => decoratorsAPI.getAll({}),
  });

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
                Transform Your Space with
                <span className="text-gradient-accent block">StyleDecor</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Professional decoration services for homes, weddings, and special events.
                Book your consultation or service online today!
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/services"
                  className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Book Decoration Service
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img src={heroSticker} alt="Decoration" className="w-full max-w-md mx-auto" />
              </div>

              {/* Floating Stickers */}
              <motion.img
                src={heroSticker1}
                alt=""
                className="absolute top-10 left-10 w-20 h-20"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.img
                src={heroSticker2}
                alt=""
                className="absolute top-20 right-20 w-16 h-16"
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -10, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.img
                src={heroSticker3}
                alt=""
                className="absolute bottom-20 left-20 w-14 h-14"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 15, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.img
                src={heroSticker4}
                alt=""
                className="absolute bottom-10 right-10 w-18 h-18"
                animate={{
                  y: [0, 20, 0],
                  rotate: [0, -15, 0],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Services</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Explore our decoration packages</p>
          </motion.div>

          {servicesLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {servicesData?.data?.services?.slice(0, 6).map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="card-modern overflow-hidden"
                >
                  <figure className="relative overflow-hidden">
                    <img
                      src={service.imageUrl || 'https://via.placeholder.com/400x250'}
                      alt={service.service_name}
                      className="h-40 sm:h-48 w-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4">
                      <span className="badge badge-sm sm:badge-lg bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                        {service.service_category}
                      </span>
                    </div>
                  </figure>
                  <div className="card-body bg-white dark:bg-gray-800 p-3 sm:p-4">
                    <h2 className="card-title text-gray-900 dark:text-white text-base sm:text-lg line-clamp-1">{service.service_name}</h2>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2 text-xs sm:text-sm">{service.description}</p>
                    <div className="card-actions flex-col sm:flex-row justify-between items-start sm:items-center mt-3 sm:mt-4 gap-2">
                      <div>
                        <span className="text-lg sm:text-2xl font-bold text-gradient-accent">
                          ৳{service.cost}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">/{service.unit}</span>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto"
                      >
                        <Link
                          to={`/services/${service._id}`}
                          className="btn btn-sm w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 hover:from-orange-600 hover:to-red-600"
                        >
                          View Details
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/services"
                className="inline-block px-8 py-4 rounded-xl border-2 border-orange-500 text-orange-500 dark:text-orange-400 dark:border-orange-400 font-semibold text-lg hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-all duration-300"
              >
                View All Services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Top Decorators Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Top Decorators</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Meet our expert team</p>
          </motion.div>

          {decoratorsLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {decoratorsData?.data?.decorators?.slice(0, 6).map((decorator, index) => (
                <motion.div
                  key={decorator._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="card-modern"
                >
                  <div className="card-body items-center text-center bg-white dark:bg-gray-800">
                    <div className="avatar mb-4">
                      <div className="w-24 rounded-full ring-4 ring-gradient-to-r ring-orange-500 ring-offset-2 dark:ring-offset-gray-800">
                        {decorator.profileImage ? (
                          <img src={decorator.profileImage} alt={decorator.displayName} />
                        ) : (
                          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center text-3xl font-bold">
                            {decorator.displayName?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>
                    <h3 className="card-title text-gray-900 dark:text-white">{decorator.displayName}</h3>
                    {decorator.specialty && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">{decorator.specialty}</p>
                    )}
                    {decorator.rating && (
                      <div className="flex items-center gap-1 mt-2">
                        <FaStar className="text-yellow-400" />
                        <span className="font-semibold text-gray-700 dark:text-gray-300">{decorator.rating}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Service Coverage Map Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Side - Text and CTA */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                Service Coverage
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                We serve across Bangladesh with our professional decoration services.
                From major cities to remote locations, we bring style and elegance to your events.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500"></div>
                  <span className="text-gray-700 dark:text-gray-300">Dhaka, Chittagong, Sylhet</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500"></div>
                  <span className="text-gray-700 dark:text-gray-300">Rajshahi, Khulna, Barisal</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500"></div>
                  <span className="text-gray-700 dark:text-gray-300">And many more locations</span>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/services"
                  className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Explore Our Services
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Side - Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                <ServiceCoverageMap />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

