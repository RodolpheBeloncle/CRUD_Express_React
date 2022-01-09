import { Routes, Route } from 'react-router-dom';
import AdminPanel from './components/AdminPanel/AdminPanel';
import Disconnect from './components/Disconnect/Disconnect';

import AdminRoutes from './components/AdminRoutes/AdminRoutes';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Nav from './components/Nav/Nav';
import NotFound from './components/NotFound/NotFound';
import AdminProvider from './contexts/AdminProvider';
import Article from './components/article/Article';

import './App.css';

const App = () => (
  <div className="App">
    <AdminProvider>
      <Nav />
      <Routes>
        <Route path="/articles" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/disconnect" element={<Disconnect />} />
        <Route path="/articles/:id" element={<Article />}></Route>
        <Route path="/admin" element={<AdminRoutes />}>
          <Route index element={<AdminPanel />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AdminProvider>
  </div>
);

export default App;
