import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersAPI, decoratorsAPI } from '../../util/api';
import Loading from '../Loading';
import ConfirmationModal from '../ConfirmationModal';
import toast from 'react-hot-toast';
import { FaSearch, FaUserShield, FaUser, FaToggleOn, FaToggleOff, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ManageDecorators = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [expandedUser, setExpandedUser] = useState(null);
  const [decoratorForm, setDecoratorForm] = useState({
    specialty: '',
    rating: '',
    experience: '',
  });
  const [demoteModal, setDemoteModal] = useState({ isOpen: false, user: null });

  // Debounce search query to prevent re-rendering on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading } = useQuery({
    queryKey: ['users', 'all', { search: debouncedSearchQuery, role: roleFilter, page }],
    queryFn: () => usersAPI.getAll({ search: debouncedSearchQuery, role: roleFilter, page, limit: 10 }),
    placeholderData: (previousData) => previousData,
  });

  const toggleRoleMutation = useMutation({
    mutationFn: ({ email, data }) => usersAPI.toggleRole(email, data),
    onSuccess: (response) => {
      toast.success(response.data.message);
      queryClient.invalidateQueries(['users']);
      queryClient.invalidateQueries(['decorators']);
      setExpandedUser(null);
      setDemoteModal({ isOpen: false, user: null });
      setDecoratorForm({ specialty: '', rating: '', experience: '' });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to toggle role');
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: (email) => decoratorsAPI.toggleStatus(email),
    onSuccess: () => {
      toast.success('Decorator status updated');
      queryClient.invalidateQueries(['users']);
      queryClient.invalidateQueries(['decorators']);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update status');
    },
  });

  const users = data?.data?.users || [];
  const pagination = data?.data?.pagination || {};

  const handleToggleRole = (user) => {
    if (user.role === 'decorator') {
      // Demote to user - show confirmation modal
      setDemoteModal({ isOpen: true, user });
    } else {
      // Show form to promote to decorator
      setExpandedUser(user.email);
    }
  };

  const handlePromoteToDecorator = (email) => {
    toggleRoleMutation.mutate({
      email,
      data: decoratorForm,
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handleRoleFilterChange = (newRole) => {
    setRoleFilter(newRole);
    setPage(1); // Reset to first page on filter change
  };

  // Only show loading on initial load, not on subsequent searches
  if (isLoading && !data) {
    return <Loading />;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Manage Users & Decorators</h2>
        <p className="text-gray-600 dark:text-gray-400">Search users and toggle their roles between user and decorator</p>
      </div>

      {/* Search and Filters */}
      <div className="card-modern p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                className="input input-bordered w-full pl-10"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
          </div>

          {/* Role Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              className={`btn btn-sm ${roleFilter === 'all' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handleRoleFilterChange('all')}
            >
              All ({pagination.total || 0})
            </button>
            <button
              className={`btn btn-sm ${roleFilter === 'user' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handleRoleFilterChange('user')}
            >
              <FaUser className="mr-1" /> Users
            </button>
            <button
              className={`btn btn-sm ${roleFilter === 'decorator' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => handleRoleFilterChange('decorator')}
            >
              <FaUserShield className="mr-1" /> Decorators
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Specialty</th>
              <th>Rating</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <>
                <tr key={user._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          {user.profileImage ? (
                            <img src={user.profileImage} alt={user.displayName} className="w-full h-full object-cover object-center" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center">
                              {user.displayName?.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{user.displayName}</span>
                    </div>
                  </td>
                  <td className="text-gray-700 dark:text-gray-300">{user.email}</td>
                  <td>
                    <div className={`badge ${user.role === 'admin' ? 'badge-error' :
                      user.role === 'decorator' ? 'badge-info' :
                        'badge-ghost'
                      }`}>
                      {user.role}
                    </div>
                  </td>
                  <td className="text-gray-700 dark:text-gray-300">{user.specialty || '-'}</td>
                  <td className="text-gray-700 dark:text-gray-300">{user.rating || '-'}</td>
                  <td className="text-gray-700 dark:text-gray-300">{user.experience || '-'}</td>
                  <td>
                    {user.role === 'decorator' && (
                      user.isActive ? (
                        <div className="badge badge-success">Active</div>
                      ) : (
                        <div className="badge badge-error">Inactive</div>
                      )
                    )}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      {user.role !== 'admin' && (
                        <button
                          className={`btn btn-sm ${user.role === 'decorator' ? 'btn-warning' : 'btn-info'}`}
                          onClick={() => handleToggleRole(user)}
                          disabled={toggleRoleMutation.isPending}
                        >
                          {user.role === 'decorator' ? (
                            <>
                              <FaUser className="mr-1" /> Make User
                            </>
                          ) : (
                            <>
                              <FaUserShield className="mr-1" /> Make Decorator
                            </>
                          )}
                        </button>
                      )}
                      {user.role === 'decorator' && (
                        <button
                          className="btn btn-sm"
                          onClick={() => toggleStatusMutation.mutate(user.email)}
                          disabled={toggleStatusMutation.isPending}
                        >
                          {user.isActive ? (
                            <>
                              <FaToggleOn className="text-success" /> Disable
                            </>
                          ) : (
                            <>
                              <FaToggleOff className="text-error" /> Enable
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {/* Expanded Form Row */}
                {expandedUser === user.email && (
                  <tr>
                    <td colSpan="8">
                      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Decorator Details</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Specialty</span>
                            </label>
                            <input
                              type="text"
                              className="input input-bordered input-sm w-full"
                              value={decoratorForm.specialty}
                              onChange={(e) => setDecoratorForm({ ...decoratorForm, specialty: e.target.value })}
                              placeholder="e.g., Wedding Decoration"
                            />
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Rating</span>
                            </label>
                            <input
                              type="number"
                              className="input input-bordered input-sm w-full"
                              min="0"
                              max="5"
                              step="0.1"
                              value={decoratorForm.rating}
                              onChange={(e) => setDecoratorForm({ ...decoratorForm, rating: e.target.value })}
                              placeholder="0-5"
                            />
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Experience</span>
                            </label>
                            <input
                              type="text"
                              className="input input-bordered input-sm w-full"
                              value={decoratorForm.experience}
                              onChange={(e) => setDecoratorForm({ ...decoratorForm, experience: e.target.value })}
                              placeholder="e.g., 5 years"
                            />
                          </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handlePromoteToDecorator(user.email)}
                            disabled={toggleRoleMutation.isPending}
                          >
                            Confirm
                          </button>
                          <button
                            className="btn btn-sm btn-ghost"
                            onClick={() => {
                              setExpandedUser(null);
                              setDecoratorForm({ specialty: '', rating: '', experience: '' });
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div key={user._id} className="card-modern p-4">
            <div className="flex gap-4 mb-3">
              <div className="avatar">
                <div className="w-16 rounded-full ring-2 ring-orange-500">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={user.displayName} className="w-full h-full object-cover object-center" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center text-xl font-bold">
                      {user.displayName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white">{user.displayName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{user.email}</p>
                <div className="flex gap-2 mt-1">
                  <div className={`badge badge-sm ${user.role === 'admin' ? 'badge-error' :
                    user.role === 'decorator' ? 'badge-info' :
                      'badge-ghost'
                    }`}>
                    {user.role}
                  </div>
                  {user.role === 'decorator' && (
                    user.isActive ? (
                      <div className="badge badge-success badge-sm">Active</div>
                    ) : (
                      <div className="badge badge-error badge-sm">Inactive</div>
                    )
                  )}
                </div>
              </div>
            </div>

            {user.role === 'decorator' && (
              <div className="grid grid-cols-2 gap-2 text-sm mb-3 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Specialty:</span>
                  <p className="text-gray-800 dark:text-gray-200">{user.specialty || '-'}</p>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Rating:</span>
                  <p className="text-gray-800 dark:text-gray-200">{user.rating || '-'}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-500 dark:text-gray-400">Experience:</span>
                  <p className="text-gray-800 dark:text-gray-200">{user.experience || '-'}</p>
                </div>
              </div>
            )}

            {expandedUser === user.email && (
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Decorator Details</h4>
                <div className="space-y-2">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-xs">Specialty</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered input-sm w-full"
                      value={decoratorForm.specialty}
                      onChange={(e) => setDecoratorForm({ ...decoratorForm, specialty: e.target.value })}
                      placeholder="e.g., Wedding Decoration"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-xs">Rating</span>
                      </label>
                      <input
                        type="number"
                        className="input input-bordered input-sm w-full"
                        min="0"
                        max="5"
                        step="0.1"
                        value={decoratorForm.rating}
                        onChange={(e) => setDecoratorForm({ ...decoratorForm, rating: e.target.value })}
                        placeholder="0-5"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-xs">Experience</span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered input-sm w-full"
                        value={decoratorForm.experience}
                        onChange={(e) => setDecoratorForm({ ...decoratorForm, experience: e.target.value })}
                        placeholder="e.g., 5 years"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    className="btn btn-sm btn-primary flex-1"
                    onClick={() => handlePromoteToDecorator(user.email)}
                    disabled={toggleRoleMutation.isPending}
                  >
                    Confirm
                  </button>
                  <button
                    className="btn btn-sm btn-ghost flex-1"
                    onClick={() => {
                      setExpandedUser(null);
                      setDecoratorForm({ specialty: '', rating: '', experience: '' });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              {user.role !== 'admin' && (
                <button
                  className={`btn btn-sm flex-1 ${user.role === 'decorator' ? 'btn-warning' : 'btn-info'}`}
                  onClick={() => handleToggleRole(user)}
                  disabled={toggleRoleMutation.isPending}
                >
                  {user.role === 'decorator' ? (
                    <>
                      <FaUser className="mr-1" /> Make User
                    </>
                  ) : (
                    <>
                      <FaUserShield className="mr-1" /> Make Decorator
                    </>
                  )}
                </button>
              )}
              {user.role === 'decorator' && (
                <button
                  className="btn btn-sm flex-1"
                  onClick={() => toggleStatusMutation.mutate(user.email)}
                  disabled={toggleStatusMutation.isPending}
                >
                  {user.isActive ? (
                    <>
                      <FaToggleOn className="text-success mr-1" /> Disable
                    </>
                  ) : (
                    <>
                      <FaToggleOff className="text-error mr-1" /> Enable
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            className="btn btn-sm btn-outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <FaChevronLeft />
          </button>
          <span className="text-gray-800 dark:text-gray-200 px-4">
            Page {page} of {pagination.totalPages}
          </span>
          <button
            className="btn btn-sm btn-outline"
            disabled={page === pagination.totalPages}
            onClick={() => setPage(page + 1)}
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {users.length === 0 && (
        <div className="text-center py-12 card-modern">
          <p className="text-xl text-gray-500 dark:text-gray-400">No users found</p>
        </div>
      )}

      {/* Demote Decorator Confirmation Modal */}
      <ConfirmationModal
        isOpen={demoteModal.isOpen}
        onClose={() => setDemoteModal({ isOpen: false, user: null })}
        onConfirm={() => {
          if (demoteModal.user) {
            toggleRoleMutation.mutate({ email: demoteModal.user.email, data: {} });
          }
        }}
        title="Demote Decorator"
        message={`Are you sure you want to demote ${demoteModal.user?.displayName || 'this user'} from decorator to regular user? They will lose their decorator privileges and access to the decorator dashboard.`}
        confirmText="Yes, Demote to User"
        cancelText="No, Keep as Decorator"
        confirmButtonClass="btn-warning"
        isLoading={toggleRoleMutation.isPending}
      />
    </div>
  );
};

export default ManageDecorators;
