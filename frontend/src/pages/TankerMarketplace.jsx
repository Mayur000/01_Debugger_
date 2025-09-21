import React, { useState, useEffect } from 'react';
import { Truck, Star, MapPin, Phone, Calendar, Filter, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { tankerAPI } from '../services/tankerAPI';

const TankerMarketplace = () => {
  const [tankers, setTankers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('marketplace');
  const [filters, setFilters] = useState({
    location: '',
    capacity: '',
    priceRange: ''
  });
  const [bookingModal, setBookingModal] = useState(null);

  useEffect(() => {
    fetchTankers();
    fetchOrders();
  }, []);

  const fetchTankers = async () => {
    try {
      const data = await tankerAPI.getTankers(filters);
      setTankers(data);
    } catch (error) {
      toast.error('Failed to fetch tankers');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const data = await tankerAPI.getOrders();
      setOrders(data || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('Failed to fetch orders');
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleBooking = async (bookingData) => {
    try {
      await tankerAPI.bookTanker(bookingData);
      toast.success('Tanker booked successfully!');
      setBookingModal(null);
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    setLoading(true);
    fetchTankers();
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this completed order?')) {
      try {
        await tankerAPI.deleteOrder(orderId);
        toast.success('Order deleted successfully!');
        fetchOrders();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete order');
      }
    }
  };

  const BookingModal = ({ tanker, onClose, onBook }) => {
    const [formData, setFormData] = useState({
      quantity: '',
      deliveryAddress: '',
      deliveryDate: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onBook({
        tankerId: tanker._id,
        quantity: parseInt(formData.quantity),
        deliveryAddress: formData.deliveryAddress,
        deliveryDate: formData.deliveryDate
      });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Book Water Tanker</h3>

          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="font-medium text-gray-900 dark:text-gray-100">Supplier: {tanker.supplierName}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">₹{tanker.pricePerLiter}/L • {tanker.capacity}L capacity</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Contact: {tanker.phone}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Quantity (Liters)
              </label>
              <input
                type="number"
                required
                max={tanker.capacity}
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="input-field"
                placeholder="Enter quantity needed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Delivery Address
              </label>
              <textarea
                required
                value={formData.deliveryAddress}
                onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                className="input-field"
                rows="2"
                placeholder="Enter delivery address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Preferred Delivery Date
              </label>
              <input
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={formData.deliveryDate}
                onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Total Cost:</strong> ₹{(formData.quantity * tanker.pricePerLiter).toLocaleString() || 0}
              </p>
            </div>

            <div className="flex space-x-3 pt-4">
              <button type="button" onClick={onClose} className="flex-1 btn-secondary">
                Cancel
              </button>
              <button type="submit" className="flex-1 btn-primary">
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Water Tanker Marketplace</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Find and book verified water suppliers</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'marketplace'
                ? 'border-water-500 text-water-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'orders'
                ? 'border-water-500 text-water-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            My Orders ({orders.length})
          </button>
        </nav>
      </div>

      {activeTab === 'marketplace' && (
        <>
          {/* Marketplace Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="card text-center py-4">
              <p className="text-2xl font-bold text-water-600">{tankers.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Suppliers</p>
            </div>
            <div className="card text-center py-4">
              <p className="text-2xl font-bold text-green-600">{tankers.filter(t => t.isAvailable).length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Available Now</p>
            </div>
            <div className="card text-center py-4">
              <p className="text-2xl font-bold text-blue-600">{tankers.filter(t => t.waterQuality === 'potable').length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Drinking Water</p>
            </div>
            <div className="card text-center py-4">
              <p className="text-2xl font-bold text-yellow-600">₹{tankers.length > 0 ? Math.min(...tankers.map(t => t.pricePerLiter)).toFixed(1) : '0.0'}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Lowest Price/L</p>
            </div>
          </div>

          {/* Filters */}
          <div className="card mb-6">
            <div className="flex items-center space-x-4">
              <Filter className="h-5 w-5 text-gray-400" />
              <input
                name="location"
                type="text"
                placeholder="Location"
                value={filters.location}
                onChange={handleFilterChange}
                className="input-field flex-1"
              />
              <select
                name="capacity"
                value={filters.capacity}
                onChange={handleFilterChange}
                className="input-field"
              >
                <option value="">Any Capacity</option>
                <option value="1000">1000L+</option>
                <option value="5000">5000L+</option>
                <option value="10000">10000L+</option>
              </select>
              <select
                name="priceRange"
                value={filters.priceRange}
                onChange={handleFilterChange}
                className="input-field"
              >
                <option value="">Any Price</option>
                <option value="0-2">₹0-2/L</option>
                <option value="2-4">₹2-4/L</option>
                <option value="4-6">₹4-6/L</option>
              </select>
              <button onClick={applyFilters} className="btn-primary">
                Apply
              </button>
            </div>
          </div>

          {/* Tankers Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-water-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tankers.map((tanker) => (
                <div key={tanker._id} className="card hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Supplier: {tanker.supplierName}</h3>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {tanker.rating.toFixed(1)} ({tanker.totalRatings} reviews)
                        </span>
                      </div>
                    </div>
                    <Truck className="h-8 w-8 text-water-500" />
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4" />
                      <span>{tanker.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Phone className="h-4 w-4" />
                      <span>{tanker.phone}</span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      Supplier ID: {tanker.supplierId?.toString().slice(-6) || 'N/A'}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Capacity</p>
                      <p className="font-semibold">{tanker.capacity.toLocaleString()}L</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Price</p>
                      <p className="font-semibold text-water-600">₹{tanker.pricePerLiter}/L</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Vehicle</p>
                      <p className="font-semibold text-xs">{tanker.vehicleNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Cost (Full)</p>
                      <p className="font-semibold text-green-600">₹{(tanker.capacity * tanker.pricePerLiter).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tanker.waterQuality === 'potable'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {tanker.waterQuality === 'potable' ? 'Drinking Water' : 'Non-Potable'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tanker.isAvailable
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {tanker.isAvailable ? 'Available' : 'Busy'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setBookingModal(tanker)}
                    className="w-full btn-primary text-sm"
                    disabled={!tanker.isAvailable}
                  >
                    {tanker.isAvailable ? 'Book Now' : 'Currently Unavailable'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'orders' && (
        <div className="space-y-4">
          {ordersLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-water-500"></div>
            </div>
          ) : orders.length === 0 ? (
            <div className="card text-center py-12">
              <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No orders yet</h3>
              <p className="text-gray-600 dark:text-gray-300">Book your first water tanker to get started</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="card">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h3 className="text-lg font-semibold">Supplier: {order.tankerId?.supplierName || 'Unknown Supplier'}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        order.status === 'in-transit' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                        order.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}>
                        {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Unknown'}
                      </span>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Customer: <span className="font-medium text-gray-900 dark:text-gray-100">{order.userId?.name || 'You'}</span></p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Delivery: <span className="font-medium">{order.deliveryAddress || 'N/A'}</span></p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Quantity</p>
                        <p className="font-medium">{order.quantity?.toLocaleString() || 0}L</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Total Cost</p>
                        <p className="font-medium">₹{order.totalPrice?.toLocaleString() || 0}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Delivery Date</p>
                        <p className="font-medium">{order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Order Date</p>
                        <p className="font-medium">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                  {order.status === 'delivered' && (
                    <button
                      onClick={() => handleDeleteOrder(order._id)}
                      className="ml-4 p-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete completed order"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {bookingModal && (
        <BookingModal
          tanker={bookingModal}
          onClose={() => setBookingModal(null)}
          onBook={handleBooking}
        />
      )}
    </div>
  );
};

export default TankerMarketplace;
