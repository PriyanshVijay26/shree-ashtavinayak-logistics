import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, MapPin, DollarSign, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cityAPI } from '../services/api';
import { City } from '../types/auth';
import { toast } from 'react-toastify';

const AdminCities: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    pricePerKg: '',
    description: '',
    isActive: true
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await cityAPI.getAllCitiesAdmin();
      if (response.success) {
        setCities(response.data.cities);
      }
    } catch (error) {
      toast.error('Error fetching cities');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) errors.name = 'City name is required';
    if (!formData.state.trim()) errors.state = 'State is required';
    if (!formData.pricePerKg || parseFloat(formData.pricePerKg) <= 0) {
      errors.pricePerKg = 'Valid price per kg is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const cityData = {
        ...formData,
        pricePerKg: parseFloat(formData.pricePerKg)
      };

      if (editingCity) {
        const response = await cityAPI.updateCity(editingCity.id, cityData);
        if (response.success) {
          toast.success('City updated successfully');
          fetchCities();
          resetForm();
        }
      } else {
        const response = await cityAPI.createCity(cityData);
        if (response.success) {
          toast.success('City created successfully');
          fetchCities();
          resetForm();
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error saving city');
    }
  };

  const handleEdit = (city: City) => {
    setEditingCity(city);
    setFormData({
      name: city.name,
      state: city.state,
      pricePerKg: city.pricePerKg.toString(),
      description: city.description || '',
      isActive: city.isActive || true
    });
    setShowForm(true);
  };

  const handleDelete = async (city: City) => {
    if (!window.confirm(`Are you sure you want to delete ${city.name}?`)) return;

    try {
      const response = await cityAPI.deleteCity(city.id);
      if (response.success) {
        toast.success(response.message);
        fetchCities();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error deleting city');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      state: '',
      pricePerKg: '',
      description: '',
      isActive: true
    });
    setFormErrors({});
    setEditingCity(null);
    setShowForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Manage Cities</h1>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add City
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* City Form Modal */}
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    {editingCity ? 'Edit City' : 'Add New City'}
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border ${
                        formErrors.name ? 'border-red-300' : 'border-gray-300'
                      } px-3 py-2 focus:border-orange-500 focus:ring-orange-500`}
                      placeholder="Enter city name"
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border ${
                        formErrors.state ? 'border-red-300' : 'border-gray-300'
                      } px-3 py-2 focus:border-orange-500 focus:ring-orange-500`}
                      placeholder="Enter state name"
                    />
                    {formErrors.state && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.state}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price per KG (₹)</label>
                    <input
                      type="number"
                      name="pricePerKg"
                      value={formData.pricePerKg}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      className={`mt-1 block w-full rounded-md border ${
                        formErrors.pricePerKg ? 'border-red-300' : 'border-gray-300'
                      } px-3 py-2 focus:border-orange-500 focus:ring-orange-500`}
                      placeholder="Enter price per kg"
                    />
                    {formErrors.pricePerKg && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.pricePerKg}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Enter city description (optional)"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleChange}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Active (visible to users)
                    </label>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    >
                      {editingCity ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}

          {/* Cities Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city, index) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white overflow-hidden shadow rounded-lg border-l-4 ${
                  city.isActive ? 'border-green-400' : 'border-red-400'
                }`}
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                        city.isActive ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900">{city.name}</h3>
                        <p className="text-sm text-gray-500">{city.state}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {city.isActive ? (
                        <Eye className="h-4 w-4 text-green-500" aria-label="Active" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-red-500" aria-label="Inactive" />
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 text-green-500 mr-1" />
                      <span className="text-2xl font-bold text-green-600">
                        ₹{city.pricePerKg}/kg
                      </span>
                    </div>
                    {city.description && (
                      <p className="mt-2 text-sm text-gray-600">{city.description}</p>
                    )}
                  </div>

                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(city)}
                      className="inline-flex items-center p-2 border border-transparent rounded-full text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(city)}
                      className="inline-flex items-center p-2 border border-transparent rounded-full text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {cities.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No cities</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new city.</p>
              <div className="mt-6">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add City
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCities;