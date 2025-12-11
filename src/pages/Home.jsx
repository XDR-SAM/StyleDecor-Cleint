import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { servicesAPI, decoratorsAPI } from '../util/api';
import Loading from '../components/Loading';
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
        {/* Animated Background Gradient Orbs */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-orange-400/40 to-red-400/40 dark:from-orange-500/30 dark:to-red-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-400/40 to-pink-400/40 dark:from-purple-500/30 dark:to-pink-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [-100, 100, -100],
            y: [-100, 100, -100],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating Geometric Shapes */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-400 dark:to-red-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Larger Floating Shapes */}
        <motion.div
          className="absolute top-20 left-20 w-20 h-20 border-2 border-orange-500/50 dark:border-orange-400/40 rounded-lg"
          animate={{
            rotate: [0, 360],
            y: [0, -50, 0],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-32 right-32 w-16 h-16 border-2 border-purple-500/50 dark:border-purple-400/40 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            y: [0, 40, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-12 h-12 bg-gradient-to-r from-pink-500/30 to-purple-500/30 dark:from-pink-500/20 dark:to-purple-500/20 rotate-45"
          animate={{
            rotate: [45, 405],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Animated Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <motion.h1
                className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {['Transform', 'Your', 'Space'].map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-4 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 dark:from-orange-400 dark:via-red-400 dark:to-pink-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.2,
                      ease: "easeOut",
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  <motion.span
                    className="inline-block bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    with StyleDecor
                  </motion.span>
                </h2>
              </motion.div>
            </motion.div>

            {/* Animated Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Professional decoration services for homes, weddings, and special events.
              <motion.span
                className="block mt-2 text-orange-600 dark:text-orange-400 font-semibold"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Book your consultation or service online today!
              </motion.span>
            </motion.p>

            {/* Animated CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl blur opacity-75 group-hover:opacity-100"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <Link
                  to="/services"
                  className="relative inline-block px-10 py-5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg shadow-2xl"
                >
                  <motion.span
                    animate={{
                      textShadow: [
                        '0 0 10px rgba(255,255,255,0.5)',
                        '0 0 20px rgba(255,255,255,0.8)',
                        '0 0 10px rgba(255,255,255,0.5)',
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    Book Decoration Service
                  </motion.span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/services"
                  className="inline-block px-10 py-5 rounded-xl border-2 border-purple-600 dark:border-purple-400 text-purple-700 dark:text-purple-400 font-bold text-lg hover:bg-purple-600/10 dark:hover:bg-purple-400/10 transition-all duration-300 backdrop-blur-sm"
                >
                  Explore Services
                </Link>
              </motion.div>
            </motion.div>

            {/* Floating Stats/Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
            >
              {[
                { number: '500+', label: 'Happy Clients', delay: 0 },
                { number: '1000+', label: 'Projects Done', delay: 0.2 },
                { number: '50+', label: 'Expert Decorators', delay: 0.4 },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + stat.delay }}
                  whileHover={{ scale: 1.1, y: -10 }}
                  className="relative group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-purple-500/30 dark:from-orange-500/20 dark:to-purple-500/20 rounded-2xl blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="relative bg-white/60 dark:bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-orange-200/50 dark:border-white/10 shadow-lg">
                    <motion.h3
                      className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 dark:from-orange-400 dark:to-pink-400 bg-clip-text text-transparent"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                      }}
                    >
                      {stat.number}
                    </motion.h3>
                    <p className="text-gray-700 dark:text-gray-300 mt-2 font-medium">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-6 h-10 border-2 border-orange-500/60 dark:border-orange-400/50 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-1.5 bg-orange-600 dark:bg-orange-400 rounded-full mt-2"
              animate={{
                y: [0, 16, 0],
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
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
                      <div className="w-24 rounded-full ring-4 ring-orange-500 ring-offset-2 dark:ring-offset-gray-800">
                        {decorator.profileImage ? (
                          <img src={decorator.profileImage} alt={decorator.displayName} className="w-full h-full object-cover object-center" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center text-3xl font-bold">
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

