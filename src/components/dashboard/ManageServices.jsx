import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { decoratorsAPI } from '../../util/api';
import Loading from '../Loading';
import Modal from '../Modal';
import toast from 'react-hot-toast';
import { FaUserPlus, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const ManageDecorators = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    specialty: '',
    rating: '',
    experience: '',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['decorators', 'all'],
    queryFn: () => decoratorsAPI.getAll({}),
  });

  const makeDecoratorMutation = useMutation({
    mutationFn: ({ email, data }) => decoratorsAPI.makeDecorator(email, data),
    onSuccess: () => {
      toast.success('User role updated to decorator');
      queryClient.invalidateQueries(['decorators']);
      setShowModal(false);
      setFormData({ email: '', specialty: '', rating: '', experience: '' });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update role');
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: (email) => decoratorsAPI.toggleStatus(email),
    onSuccess: () => {
      toast.success('Decorator status updated');
      queryClient.invalidateQueries(['decorators']);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update status');
    },
  });

  const decorators = data?.data?.decorators || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    makeDecoratorMutation.mutate({
      email: formData.email,
      data: {
        specialty: formData.specialty,
        rating: parseFloat(formData.rating) || 0,
        experience: formData.experience,
      },
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Decorators</h2>
        <button
          className="btn gradient-accent text-white"
          onClick={() => setShowModal(true)}
        >
          <FaUserPlus className="mr-2" />
          Make User Decorator
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Specialty</th>
              <th>Rating</th>
              <th>Experience</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {decorators.map((decorator) => (
              <tr key={decorator._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        {decorator.profileImage ? (
                          <img
                            src={decorator.profileImage}
                            alt={decorator.displayName}
                          />
                        ) : (
                          <div className="bg-accent text-white flex items-center justify-center">
                            {decorator.displayName?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="font-semibold">{decorator.displayName}</span>
                  </div>
                </td>
                <td>{decorator.email}</td>
                <td>{decorator.specialty || '-'}</td>
                <td>{decorator.rating || 0}</td>
                <td>{decorator.experience || '-'}</td>
                <td>
                  {decorator.isActive ? (
                    <div className="badge badge-success">Active</div>
                  ) : (
                    <div className="badge badge-error">Inactive</div>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-sm"
                    onClick={() => toggleStatusMutation.mutate(decorator.email)}
                    disabled={toggleStatusMutation.isPending}
                  >
                    {decorator.isActive ? (
                      <>
                        <FaToggleOn className="text-success" />
                        Disable
                      </>
                    ) : (
                      <>
                        <FaToggleOff className="text-error" />
                        Enable
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setFormData({ email: '', specialty: '', rating: '', experience: '' });
        }}
        title="Make User Decorator"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">User Email *</span>
            </label>
            <input
              type="email"
              className="input input-bordered"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Specialty</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={formData.specialty}
              onChange={(e) =>
                setFormData({ ...formData, specialty: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Rating</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Experience</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="e.g., 5 years"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn gradient-accent text-white"
              disabled={makeDecoratorMutation.isPending}
            >
              {makeDecoratorMutation.isPending ? (
                <span className="loading loading-spinner"></span>
              ) : (
                'Make Decorator'
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageDecorators;

