import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import ServiceCoverageMap from '../components/ServiceCoverageMap';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [formStatus, setFormStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            setFormStatus('error');
            setTimeout(() => setFormStatus(''), 3000);
            return;
        }

        // Simulate form submission
        setFormStatus('success');
        setTimeout(() => {
            setFormStatus('');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
        }, 3000);
    };

    const contactInfo = [
        {
            icon: FaEnvelope,
            title: 'Email',
            content: 'info@styledecor.com',
            link: 'mailto:info@styledecor.com',
        },
        {
            icon: FaPhone,
            title: 'Phone',
            content: '+880 1570 200990',
            link: 'tel:+8801570200990',
        },
        {
            icon: FaMapMarkerAlt,
            title: 'Address',
            content: 'Dhaka, Bangladesh',
            link: null,
        },
        {
            icon: FaClock,
            title: 'Working Hours',
            content: 'Sat-Thu: 9AM-10PM, Fri: 10AM-4PM',
            link: null,
        },
    ];

    const socialLinks = [
        { icon: FaFacebook, href: 'https://www.facebook.com/mrBrownCastel', label: 'Facebook', color: 'hover:text-blue-600' },
        { icon: FaInstagram, href: 'https://www.instagram.com/__al_sami', label: 'Instagram', color: 'hover:text-pink-600' },
        { icon: FaTwitter, href: 'https://x.com/MrBrownCastel', label: 'Twitter', color: 'hover:text-blue-400' },
        { icon: FaLinkedin, href: 'https://www.linkedin.com/in/sami-x', label: 'LinkedIn', color: 'hover:text-blue-700' },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
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
                                    Get In Touch
                                </span>
                            </h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed"
                            >
                                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {contactInfo.map((info, index) => {
                            const Icon = info.icon;
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
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{info.title}</h3>
                                    {info.link ? (
                                        <a
                                            href={info.link}
                                            className="text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                                        >
                                            {info.content}
                                        </a>
                                    ) : (
                                        <p className="text-gray-600 dark:text-gray-300">{info.content}</p>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Contact Form and Map */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="card-modern p-8"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name *</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                        className="input input-modern w-full"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email *</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your.email@example.com"
                                        className="input input-modern w-full"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Phone</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+880 1XXX XXXXXX"
                                        className="input input-modern w-full"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Subject</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="What is this regarding?"
                                        className="input input-modern w-full"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Message *</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us more about your requirements..."
                                        className="textarea input-modern w-full"
                                        rows="5"
                                        required
                                    ></textarea>
                                </div>

                                {formStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="alert bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-xl p-4"
                                    >
                                        <span>✓ Message sent successfully! We'll get back to you soon.</span>
                                    </motion.div>
                                )}

                                {formStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="alert bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-xl p-4"
                                    >
                                        <span>✗ Please fill in all required fields.</span>
                                    </motion.div>
                                )}

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn w-full bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 hover:from-orange-600 hover:to-red-600"
                                >
                                    Send Message
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Map and Social Links */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            {/* Map */}
                            <div className="card-modern overflow-hidden">
                                <ServiceCoverageMap />
                            </div>

                            {/* Social Links */}
                            <div className="card-modern p-8">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                                    Connect With Us
                                </h3>
                                <div className="flex justify-center gap-4">
                                    {socialLinks.map((social, index) => {
                                        const Icon = social.icon;
                                        return (
                                            <motion.a
                                                key={social.label}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={social.label}
                                                whileHover={{ scale: 1.2, y: -5 }}
                                                whileTap={{ scale: 0.9 }}
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                                className={`w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 ${social.color} transition-all duration-300`}
                                            >
                                                <Icon className="w-6 h-6" />
                                            </motion.a>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
