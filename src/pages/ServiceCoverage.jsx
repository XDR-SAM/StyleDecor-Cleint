import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import ServiceCoverageMap from '../components/ServiceCoverageMap';

const ServiceCoverage = () => {
    const coverageAreas = [
        {
            division: 'Dhaka Division',
            cities: ['Dhaka', 'Gazipur', 'Narayanganj', 'Tangail', 'Manikganj'],
            description: 'Full coverage across the capital and surrounding areas with same-day service availability.',
        },
        {
            division: 'Chittagong Division',
            cities: ['Chittagong', 'Cox\'s Bazar', 'Comilla', 'Feni', 'Noakhali'],
            description: 'Comprehensive decoration services for the port city and coastal regions.',
        },
        {
            division: 'Sylhet Division',
            cities: ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
            description: 'Bringing elegance to the tea capital and surrounding districts.',
        },
        {
            division: 'Rajshahi Division',
            cities: ['Rajshahi', 'Bogra', 'Pabna', 'Natore', 'Sirajganj'],
            description: 'Quality decoration services across the northern region.',
        },
        {
            division: 'Khulna Division',
            cities: ['Khulna', 'Jessore', 'Satkhira', 'Bagerhat', 'Kushtia'],
            description: 'Professional services for the southwestern region and beyond.',
        },
        {
            division: 'Barisal Division',
            cities: ['Barisal', 'Patuakhali', 'Bhola', 'Pirojpur', 'Jhalokathi'],
            description: 'Extending our services to the southern riverine districts.',
        },
    ];

    const stats = [
        { number: '64', label: 'Districts Covered' },
        { number: '100+', label: 'Cities & Towns' },
        { number: '24/7', label: 'Support Available' },
        { number: '2-3', label: 'Days Delivery' },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
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

                {/* Floating Geometric Shapes */}
                {[...Array(12)].map((_, i) => (
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

                {/* Main Content */}
                <div className="container mx-auto px-4 py-20 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                                <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 dark:from-orange-400 dark:via-red-400 dark:to-pink-400 bg-clip-text text-transparent">
                                    Service Coverage
                                </span>
                            </h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed"
                            >
                                We bring beautiful decorations to every corner of Bangladesh. Discover our extensive service network.
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Coverage Stats */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="card-modern p-6 text-center"
                            >
                                <motion.h3
                                    className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 dark:from-orange-400 dark:to-pink-400 bg-clip-text text-transparent mb-2"
                                    animate={{
                                        scale: [1, 1.05, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: index * 0.3,
                                        ease: "easeInOut",
                                    }}
                                >
                                    {stat.number}
                                </motion.h3>
                                <p className="text-gray-700 dark:text-gray-300 font-medium text-sm md:text-base">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Map Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Service Map</h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg">
                                Interactive map showing our major service locations across Bangladesh
                            </p>
                        </div>
                        <div className="card-modern overflow-hidden max-w-5xl mx-auto">
                            <ServiceCoverageMap />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Coverage Areas */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Coverage by Division</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                            Detailed breakdown of our service areas across Bangladesh
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {coverageAreas.map((area, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="card-modern p-6"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                                        <FaMapMarkerAlt className="text-white text-xl" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{area.division}</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">{area.description}</p>
                                <div className="space-y-2">
                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Major Cities:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {area.cities.map((city, cityIndex) => (
                                            <span
                                                key={cityIndex}
                                                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm"
                                            >
                                                <FaCheckCircle className="text-xs" />
                                                {city}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Additional Coverage Info */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="card-modern p-8 md:p-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                                Don't See Your Area?
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg text-center mb-8">
                                We're constantly expanding our service network. If your location isn't listed, contact us to check availability.
                                We often accommodate special requests and are always looking to serve new areas.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        to="/contact"
                                        className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                                    >
                                        Contact Us
                                    </Link>
                                </motion.div>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        to="/services"
                                        className="inline-block px-8 py-4 rounded-xl border-2 border-orange-500 text-orange-500 dark:text-orange-400 dark:border-orange-400 font-semibold text-lg hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white transition-all duration-300 text-center"
                                    >
                                        View Services
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceCoverage;
