import { useQuery } from '@tanstack/react-query';
import { analyticsAPI } from '../../util/api';
import Loading from '../Loading';

const Analytics = () => {
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['analytics', 'stats'],
    queryFn: () => analyticsAPI.getStats(),
  });

  const { data: demandData, isLoading: demandLoading } = useQuery({
    queryKey: ['analytics', 'service-demand'],
    queryFn: () => analyticsAPI.getServiceDemand(),
  });

  const stats = statsData?.data || {};
  const serviceDemand = demandData?.data?.serviceDemand || [];

  if (statsLoading || demandLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-modern p-6">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Bookings</div>
          <div className="text-3xl font-bold text-gradient-accent mb-1">{stats.totalBookings || 0}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {stats.completedBookings || 0} completed
          </div>
        </div>
        <div className="card-modern p-6">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Pending Bookings</div>
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-500 mb-1">{stats.pendingBookings || 0}</div>
        </div>
        <div className="card-modern p-6">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Revenue</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-500 mb-1">৳{stats.totalRevenue || 0}</div>
        </div>
        <div className="card-modern p-6">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Services</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-500 mb-1">{stats.totalServices || 0}</div>
        </div>
      </div>

      {/* Service Demand Chart */}
      <div className="card-modern p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Top Service Demand</h2>
        {serviceDemand.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No data available</p>
        ) : (
          <div className="space-y-4">
            {serviceDemand.map((item, index) => {
              const maxCount = serviceDemand[0]?.count || 1;
              const percentage = (item.count / maxCount) * 100;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{item._id}</span>
                    <span className="badge bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">{item.count} bookings</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-4 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;

