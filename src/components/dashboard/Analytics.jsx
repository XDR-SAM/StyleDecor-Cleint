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

      {/* Service Demand Histogram */}
      <div className="card-modern p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">Top Service Demand</h2>
        {serviceDemand.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No data available</p>
        ) : (
          <div className="w-full overflow-x-auto">
            {/* Histogram Container */}
            <div className="min-w-[500px] w-full">
              <div className="flex items-end gap-2 h-48 sm:h-56 md:h-64 border-b-2 border-l-2 border-gray-300 dark:border-gray-600 p-2 sm:p-4 relative">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 pr-1">
                  {[...Array(6)].map((_, i) => {
                    const maxCount = Math.max(...serviceDemand.map(item => item.count));
                    const value = Math.round((maxCount * (5 - i)) / 5);
                    return (
                      <span key={i} className="text-right w-8 sm:w-10">
                        {value}
                      </span>
                    );
                  })}
                </div>

                {/* Histogram Bars */}
                <div className="flex items-end justify-around gap-2 sm:gap-3 md:gap-4 h-full w-full ml-10 sm:ml-12">
                  {serviceDemand.map((item, index) => {
                    const maxCount = Math.max(...serviceDemand.map(item => item.count));
                    const heightPercentage = (item.count / maxCount) * 100;

                    return (
                      <div key={index} className="flex flex-col items-center justify-end flex-1 min-w-[40px] max-w-[80px] h-full group">
                        {/* Bar */}
                        <div className="relative w-full flex flex-col items-center justify-end h-full">
                          {/* Count label on hover */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mb-1 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 px-1.5 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap absolute bottom-full z-10">
                            {item.count}
                          </div>

                          {/* Histogram bar */}
                          <div
                            className="w-full bg-gradient-to-t from-orange-500 to-red-500 rounded-t-md transition-all duration-300 hover:from-orange-600 hover:to-red-600 shadow-md hover:shadow-lg min-h-[10px]"
                            style={{ height: `${heightPercentage}%` }}
                          ></div>
                        </div>

                        {/* Service name label */}
                        <div className="mt-2 text-center w-full">
                          <p className="text-[10px] sm:text-xs font-semibold text-gray-800 dark:text-gray-200 truncate leading-tight" title={item._id}>
                            {item._id.length > 10 ? item._id.substring(0, 10) + '...' : item._id}
                          </p>
                          <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                            {item.count}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* X-axis label */}
              <div className="text-center mt-3">
                <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Services</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;

