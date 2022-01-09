import { Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminProvider';

const AdminRoutes = () => {
  const { adminAuth } = useAdmin();

  return adminAuth ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoutes;
