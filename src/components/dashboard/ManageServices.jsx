import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { servicesAPI, uploadAPI } from '../../util/api';
import Loading from '../Loading';
import Modal from '../Modal';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const ManageServices = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    service_name: '',
    cost: '',
    unit: '',
    service_category: '',
    description: '',
    imageUrl: '',
  });
  const [uploading, setUploading] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['services', 'all'],
    queryFn: () => servicesAPI.getAll({ limit: 100 }),
  });

  const createMutation = useMutation({
    mutationFn: (data) => servicesAPI.create(data),
    onSuccess: () => {
      toast.success('Service created successfully');
      queryClient.invalidateQueries(['services']);
      setShowModal(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create service');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => servicesAPI.update(id, data),
    onSuccess: () => {
      toast.success('Service updated successfully');
      queryClient.invalidateQueries(['services']);
      setShowModal(false);
      resetForm();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update service');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => servicesAPI.delete(id),
    onSuccess: () => {
      toast.success('Service deleted successfully');
      queryClient.invalidateQueries(['services']);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete service');
    },
  });

  const services = data?.data?.services || [];

  const categories = [
    'home',
    'wedding',
    'office',
    'seminar',
    'meeting',
    'ceremony',
    'event',
  ];

  const resetForm = () => {
    setFormData({
      service_name: '',
      cost: '',
      unit: '',
      service_category: '',
      description: '',
      imageUrl: '',
    });
    setEditingService(null);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      service_name: service.service_name,
      cost: service.cost,
      unit: service.unit,
      service_category: service.service_category,
      description: service.description,
      imageUrl: service.imageUrl || '',
    });
    setShowModal(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64Image = reader.result;
        const response = await uploadAPI.uploadImage(base64Image);
        setFormData({ ...formData, imageUrl: response.data.url });
        toast.success('Image uploaded successfully!');
      } catch (error) {
        toast.error('Failed to upload image');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingService) {
      updateMutation.mutate({ id: editingService._id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Services</h2>
        <button
          className="btn btn-primary-modern w-full sm:w-auto"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          <FaPlus className="mr-2" />
          Add Service
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Cost</th>
              <th>Unit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <td>
                  <img
                    src={service.imageUrl || 'https://via.placeholder.com/50'}
                    alt={service.service_name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="font-semibold">{service.service_name}</td>
                <td>
                  <div className="badge badge-accent">
                    {service.service_category}
                  </div>
                </td>
                <td className="font-bold text-accent">৳{service.cost}</td>
                <td>{service.unit}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => handleEdit(service)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this service?')) {
                          deleteMutation.mutate(service._id);
                        }
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {services.map((service) => (
          <div key={service._id} className="card-modern p-4">
            <div className="flex gap-4">
              <img
                src={service.imageUrl || 'https://via.placeholder.com/50'}
                alt={service.service_name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{service.service_name}</h3>
                <div className="badge badge-accent badge-sm mb-2">
                  {service.service_category}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-bold text-gradient-accent text-lg">৳{service.cost}</span>
                  <span className="text-gray-500 dark:text-gray-400">/{service.unit}</span>
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                className="btn btn-sm btn-info flex-1"
                onClick={() => handleEdit(service)}
              >
                <FaEdit className="mr-1" /> Edit
              </button>
              <button
                className="btn btn-sm btn-error flex-1"
                onClick={() => {
                  if (confirm('Are you sure you want to delete this service?')) {
                    deleteMutation.mutate(service._id);
                  }
                }}
              >
                <FaTrash className="mr-1" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={editingService ? 'Edit Service' : 'Add Service'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Service Name *</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              required
              value={formData.service_name}
              onChange={(e) =>
                setFormData({ ...formData, service_name: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Cost (BDT) *</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                required
                value={formData.cost}
                onChange={(e) =>
                  setFormData({ ...formData, cost: e.target.value })
                }
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Unit *</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="e.g., per sqft, per floor"
                required
                value={formData.unit}
                onChange={(e) =>
                  setFormData({ ...formData, unit: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Category *</span>
            </label>
            <select
              className="select select-bordered"
              required
              value={formData.service_category}
              onChange={(e) =>
                setFormData({ ...formData, service_category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description *</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Service Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered"
              onChange={handleImageUpload}
              disabled={uploading}
            />
            {uploading && (
              <span className="loading loading-spinner loading-sm mt-2"></span>
            )}
            {formData.imageUrl && (
              <img
                src={formData.imageUrl}
                alt="Preview"
                className="w-32 h-32 object-cover rounded mt-2"
              />
            )}
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary-modern"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {createMutation.isPending || updateMutation.isPending ? (
                <span className="loading loading-spinner"></span>
              ) : editingService ? (
                'Update Service'
              ) : (
                'Create Service'
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageServices;

