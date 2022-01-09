import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminProvider';

const Disconnect = () => {
  const { setAdminAuth } = useAdmin();

  useEffect(() => {
    setAdminAuth(null);
  }, []);

  return <Navigate to="/" />;
};

export default Disconnect;
