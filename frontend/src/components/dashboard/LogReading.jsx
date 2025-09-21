import React, { useState } from 'react';
import { Plus, AlertTriangle, Droplets, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { readingsAPI } from '../../services/readingsAPI';

const LogReading = ({ onReadingAdded }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    meterReading: '',
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const reading = await readingsAPI.addReading({
        meterReading: parseFloat(formData.meterReading),
        notes: formData.notes
      });

      toast.success('Reading logged successfully!');
      if (reading.isAnomaly) {
        toast.error('⚠️ Unusual consumption detected! Check for leaks.', { duration: 5000 });
      }

      setFormData({ meterReading: '', notes: '' });
      setIsOpen(false);
      onReadingAdded();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to log reading');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary flex items-center space-x-2"
      >
        <Plus className="h-4 w-4" />
        <span>Log Reading</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center max-w-full p-6 z-50 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 w-full max-w-lg shadow-2xl border-2 border-gray-100 dark:border-gray-800 transform animate-in zoom-in-90 duration-300">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-2xl">
                  <Droplets className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Log Water Reading</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Meter Reading (Liters)
                </label>
                <div className="relative">
                  <input
                    name="meterReading"
                    type="number"
                    step="0.1"
                    required
                    value={formData.meterReading}
                    onChange={handleChange}
                    className="input-field pl-12 text-lg font-semibold"
                    placeholder="Enter current reading"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="input-field resize-none"
                  rows="3"
                  placeholder="Any observations, maintenance notes, or unusual readings..."
                />
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-800/30 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="text-sm">
                    <p className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">Smart Leak Detection</p>
                    <p className="text-yellow-700 dark:text-yellow-400 leading-relaxed">Our AI will automatically analyze your consumption patterns and alert you to potential leaks or unusual usage.</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 btn-secondary font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed font-semibold relative overflow-hidden"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      <span>Logging...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Log Reading</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LogReading;
