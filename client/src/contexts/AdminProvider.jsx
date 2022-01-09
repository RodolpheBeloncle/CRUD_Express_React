import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';

const AdminContext = createContext(null);

const AdminProvider = ({ children }) => {
  const [adminAuth, setAdminAuth] = useState(
    localStorage.getItem('adminAuth') ? JSON.parse(localStorage.getItem('adminAuth')) : null,
  );

  useEffect(() => {
    if (adminAuth) {
      localStorage.setItem('adminAuth', JSON.stringify(adminAuth));
    } else {
      localStorage.removeItem('adminAuth');
    }
  }, [adminAuth]);

  return (
    <AdminContext.Provider value={{ adminAuth, setAdminAuth }}>
      { children }
    </AdminContext.Provider>
  );
};

AdminProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAdmin = () => useContext(AdminContext);

export default AdminProvider;
