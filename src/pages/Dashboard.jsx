import { useAuth } from '../authcontext/authcontext';
import UserDashboard from '../components/dashboard/UserDashboard';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import DecoratorDashboard from '../components/dashboard/DecoratorDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Please login to access dashboard</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {user.role === 'admin' && <AdminDashboard />}
      {user.role === 'decorator' && <DecoratorDashboard />}
      {(user.role === 'user' || !user.role) && <UserDashboard />}
    </div>
  );
};

export default Dashboard;

