import React, { useState, useEffect } from 'react';
import { Droplets, TrendingUp, TrendingDown, AlertTriangle, Calendar } from 'lucide-react';
import WaterChart from '../components/dashboard/WaterChart';
import LogReading from '../components/dashboard/LogReading';

const Dashboard = ({ user }) => {
  const [readings, setReadings] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');

  const fetchData = async () => {
    try {
      const [readingsData, analyticsData] = await Promise.all([
        readingsAPI.getReadings(period),
        readingsAPI.getAnalytics()
      ]);
      setReadings(readingsData);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [period]);

  const handleReadingAdded = () => {
    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-water-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Water Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Monitor and manage your water consumption</p>
        </div>
        <LogReading onReadingAdded={handleReadingAdded} />
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Consumption</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {analytics?.totalConsumption ? analytics.totalConsumption.toLocaleString() : 0}L
              </p>
            </div>
            <Droplets className="h-8 w-8 text-water-500" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Daily Average</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {analytics?.avgDaily || 0}L
              </p>
            </div>
            <Calendar className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Trend</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                {analytics?.trend === 'up' ? (
                  <TrendingUp className="h-6 w-6 text-red-500 mr-1" />
                ) : analytics?.trend === 'down' ? (
                  <TrendingDown className="h-6 w-6 text-green-500 mr-1" />
                ) : (
                  <span className="text-gray-500">Stable</span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Anomalies</p>
              <p className="text-2xl font-bold text-red-600">
                {analytics?.anomalies || 0}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Chart and Period Selector */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Consumption Trend</h2>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="input-field w-auto"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 3 months</option>
          </select>
        </div>

        {readings.length > 0 ? (
          <WaterChart readings={readings.slice().reverse()} />
        ) : (
          <div className="card text-center py-12">
            <Droplets className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No readings yet</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Start logging your water meter readings to see trends</p>
            <LogReading onReadingAdded={handleReadingAdded} />
          </div>
        )}
      </div>

      {/* Recent Readings */}
      {readings.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Readings</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Reading
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Consumption
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {readings.slice(0, 5).map((reading) => (
                  <tr key={reading._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {new Date(reading.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {reading.meterReading.toLocaleString()}L
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {reading.consumption.toLocaleString()}L
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {reading.isAnomaly ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Anomaly
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Normal
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
