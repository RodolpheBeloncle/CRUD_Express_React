import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAdmin } from '../../contexts/AdminProvider';

import './Home.css';

const Home = () => {
  const { adminAuth } = useAdmin();
  const [articles, setArticles] = useState({});

  const fetchAllArticles = async () => {
    const getAllArticles = await axios.get('http://localhost:8000/articles');
    setArticles(getAllArticles.data);
  };

  useEffect(() => {
    fetchAllArticles();
    console.log('adminToken', adminAuth);
  }, []);
  console.log('data', articles);

  const renderedAllArticles = Object.values(articles).map((article) => {
    return (
      <li>
        <h2>{article.id}</h2>
        <img src={article.image} alt='image' />
        <h3>{article.name}</h3>
        <Link to={`/articles/${article.id}`}>En savoir plus</Link>
      </li>
    );
  });

  return <div className='Home'>{adminAuth && <ul>{renderedAllArticles}</ul>}</div>;
};
export default Home;
