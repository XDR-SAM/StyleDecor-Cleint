import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import footerLogo from '../assets/StyleDecorFooterlogo.png';

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebook, href: '#', label: 'Facebook' },
    { icon: FaInstagram, href: '#', label: 'Instagram' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img src={footerLogo} alt="StyleDecor" className="h-12 w-auto mb-4" />
            <p className="text-xl font-bold text-gradient-accent mb-2">StyleDecor</p>
            <p className="text-gray-600 dark:text-gray-400">
              Your trusted partner for beautiful decorations. Transform your space with style and elegance.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/services', label: 'Services' },
                { to: '/dashboard', label: 'Dashboard' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <FaEnvelope className="text-orange-500" />
                <span>info@styledecor.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <FaPhone className="text-orange-500" />
                <span>+880 1234 567890</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <FaMapMarkerAlt className="text-orange-500" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </motion.div>

          {/* Working Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Working Hours</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <FaClock className="text-orange-500" />
                <span>Monday - Friday: 9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex items-center gap-2">
                <FaClock className="text-orange-500" />
                <span>Saturday: 10:00 AM - 4:00 PM</span>
              </li>
              <li className="flex items-center gap-2">
                <FaClock className="text-orange-500" />
                <span>Sunday: Closed</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} StyleDecor. All rights reserved.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 hover:text-white transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

