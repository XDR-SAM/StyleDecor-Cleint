import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { servicesAPI } from '../util/api';
import Loading from '../components/Loading';
import { FaSearch, FaFilter } from 'react-icons/fa';

const Services = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['services', { search, category, minPrice, maxPrice, page }],
    queryFn: () =>
      servicesAPI.getAll({
        search,
        category,
        minPrice,
        maxPrice,
        page,
        limit: 12,
      }),
  });

  const services = data?.data?.services || [];
  const pagination = data?.data?.pagination || {};

  const categories = [
    'home',
    'wedding',
    'office',
    'seminar',
    'meeting',
    'ceremony',
    'event',
  ];

  const handleReset = () => {
    setSearch('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">Our Services</h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">Browse and book decoration services</p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card-modern p-6 mb-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <FaFilter className="text-orange-500" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Filters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 dark:text-gray-300">Search Services</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name..."
                className="input-modern input w-full pl-10 rounded-xl"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 dark:text-gray-300">Category</span>
            </label>
            <select
              className="select select-bordered w-full input-modern rounded-xl"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Min Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 dark:text-gray-300">Min Price (BDT)</span>
            </label>
            <input
              type="number"
              placeholder="Min"
              className="input-modern input w-full rounded-xl"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {/* Max Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 dark:text-gray-300">Max Price (BDT)</span>
            </label>
            <input
              type="number"
              placeholder="Max"
              className="input-modern input w-full rounded-xl"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        <div className="mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="btn btn-outline btn-sm border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white dark:border-orange-400 dark:text-orange-400"
          >
            Reset Filters
          </motion.button>
        </div>
      </motion.div>

      {/* Services Grid */}
      {isLoading ? (
        <Loading />
      ) : services.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500 dark:text-gray-400">No services found</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="card-modern overflow-hidden"
              >
                <figure className="relative overflow-hidden">
                  <img
                    src={service.imageUrl || 'https://via.placeholder.com/400x250'}
                    alt={service.service_name}
                    className="h-48 w-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="badge badge-lg bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                      {service.service_category}
                    </span>
                  </div>
                </figure>
                <div className="card-body bg-white dark:bg-gray-800">
                  <h2 className="card-title text-gray-900 dark:text-white text-lg">{service.service_name}</h2>
                  <p className="text-gray-600 dark:text-gray-300 line-clamp-2 text-sm">{service.description}</p>
                  <div className="card-actions justify-between items-center mt-4">
                    <div>
                      <span className="text-xl font-bold text-gradient-accent">
                        ৳{service.cost}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 text-sm">/{service.unit}</span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={`/services/${service._id}`}
                        className="btn btn-sm bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 hover:from-orange-600 hover:to-red-600"
                      >
                        View Details
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center gap-2"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white dark:border-orange-400 dark:text-orange-400"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </motion.button>
              <span className="flex items-center px-4 text-gray-700 dark:text-gray-300">
                Page {page} of {pagination.totalPages}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white dark:border-orange-400 dark:text-orange-400"
                disabled={page === pagination.totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </motion.button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default Services;

