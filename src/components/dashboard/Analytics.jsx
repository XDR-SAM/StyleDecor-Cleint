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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Total Bookings</div>
          <div className="stat-value text-accent">{stats.totalBookings || 0}</div>
          <div className="stat-desc">
            {stats.completedBookings || 0} completed
          </div>
        </div>
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Pending Bookings</div>
          <div className="stat-value text-warning">{stats.pendingBookings || 0}</div>
        </div>
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value text-success">৳{stats.totalRevenue || 0}</div>
        </div>
        <div className="stat bg-base-200 rounded-lg shadow">
          <div className="stat-title">Total Services</div>
          <div className="stat-value text-info">{stats.totalServices || 0}</div>
        </div>
      </div>

      {/* Service Demand Chart */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Top Service Demand</h2>
          {serviceDemand.length === 0 ? (
            <p className="text-gray-500">No data available</p>
          ) : (
            <div className="space-y-4">
              {serviceDemand.map((item, index) => {
                const maxCount = serviceDemand[0]?.count || 1;
                const percentage = (item.count / maxCount) * 100;
                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{item._id}</span>
                      <span className="badge badge-accent">{item.count} bookings</span>
                    </div>
                    <div className="w-full bg-base-200 rounded-full h-4">
                      <div
                        className="bg-accent h-4 rounded-full transition-all"
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
    </div>
  );
};

export default Analytics;

