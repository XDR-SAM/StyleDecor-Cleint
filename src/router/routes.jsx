import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './protectedrout';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Services from '../pages/Services';
import ServiceDetails from '../pages/ServiceDetails';
import About from '../pages/About';
import Contact from '../pages/Contact';
import ServiceCoverage from '../pages/ServiceCoverage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Payment from '../pages/Payment';
import PaymentSuccess from '../pages/PaymentSuccess';
import PaymentCancelled from '../pages/PaymentCancelled';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'services',
        element: <Services />,
      },
      {
        path: 'services/:id',
        element: <ServiceDetails />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'service-coverage',
        element: <ServiceCoverage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'payment/:bookingId',
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: 'successful',
        element: <PaymentSuccess />,
      },
      {
        path: 'cancelled',
        element: <PaymentCancelled />,
      },
    ],
  },
]);

export default router;

