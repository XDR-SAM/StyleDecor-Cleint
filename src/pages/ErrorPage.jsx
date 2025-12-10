import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-accent mb-4">404</h1>
        <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn btn-lg gradient-accent text-white">
          <FaHome className="mr-2" />
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

