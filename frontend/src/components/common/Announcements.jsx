import React, { useState, useEffect } from 'react';
import { Megaphone, X, Calendar } from 'lucide-react';
import { societyAPI } from '../../services/societyAPI';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const data = await societyAPI.getAnnouncements();
      setAnnouncements(data);
    } catch (error) {
      console.error('Failed to fetch announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700';
      case 'low': return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-600';
    }
  };

  const displayedAnnouncements = showAll ? announcements : announcements.slice(0, 3);

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
            <Megaphone className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Announcements</h3>
        </div>
        {announcements.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 px-3 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
          >
            {showAll ? 'Show Less' : `View All (${announcements.length})`}
          </button>
        )}
      </div>

      {announcements.length === 0 ? (
        <div className="text-center py-12">
          <div className="animate-float">
            <Megaphone className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">No announcements yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {displayedAnnouncements.map((announcement, index) => (
            <div
              key={index}
              className={`p-5 rounded-xl border-l-4 ${getPriorityColor(announcement.priority)} hover:shadow-md dark:hover:shadow-gray-900/20 transition-all duration-200 transform hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{announcement.title}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(announcement.priority)} shadow-sm`}>
                      {announcement.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-200 mb-3 leading-relaxed">{announcement.message}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-300">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">{new Date(announcement.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcements;