import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaUsers, FaAward, FaHeart, FaLightbulb, FaHandshake } from 'react-icons/fa';

const About = () => {
    const values = [
        {
            icon: FaHeart,
            title: 'Passion',
            description: 'We pour our hearts into every decoration project, ensuring your vision comes to life beautifully.',
        },
        {
            icon: FaLightbulb,
            title: 'Creativity',
            description: 'Innovative designs and unique concepts that make your events truly memorable and special.',
        },
        {
            icon: FaHandshake,
            title: 'Trust',
            description: 'Building lasting relationships through reliability, transparency, and exceptional service quality.',
        },
        {
            icon: FaAward,
            title: 'Excellence',
            description: 'Committed to delivering the highest quality decorations that exceed your expectations.',
        },
    ];

    const stats = [
        { number: '5+', label: 'Years Experience' },
        { number: '500+', label: 'Happy Clients' },
        { number: '1000+', label: 'Projects Completed' },
        { number: '50+', label: 'Expert Decorators' },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
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
                {[...Array(15)].map((_, i) => (
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
                                    About StyleDecor
                                </span>
                            </h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed"
                            >
                                Transforming spaces into beautiful memories since 2019. We are passionate about creating stunning decorations for your special moments.
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="card-modern p-8"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                                    <FaCheckCircle className="text-white text-3xl" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                To provide exceptional decoration services that bring joy and elegance to every celebration. We strive to make your special moments unforgettable through creative designs, quality craftsmanship, and personalized attention to detail.
                            </p>
                        </motion.div>

                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="card-modern p-8"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                                    <FaUsers className="text-white text-3xl" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                To become Bangladesh's most trusted and innovative decoration service provider, setting new standards in creativity and customer satisfaction. We envision a future where every celebration is enhanced by our artistic touch.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Core Values</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">The principles that guide everything we do</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="card-modern p-6 text-center"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center"
                                    >
                                        <Icon className="text-white text-2xl" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Achievements</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">Numbers that speak for themselves</p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="card-modern p-8 text-center"
                            >
                                <motion.h3
                                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 dark:from-orange-400 dark:to-pink-400 bg-clip-text text-transparent mb-2"
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
                                <p className="text-gray-700 dark:text-gray-300 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Transform Your Space?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Let's create something beautiful together. Book your consultation today and bring your vision to life.
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to="/services"
                                className="inline-block px-10 py-5 rounded-xl bg-white text-orange-600 font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
                            >
                                Explore Our Services
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
