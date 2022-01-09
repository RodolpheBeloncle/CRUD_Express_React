import './articles.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAdmin } from '../../contexts/AdminProvider';

const Articles = () => {
  const { id } = useParams();
  const { adminAuth } = useAdmin();
  const [article, setArticle] = useState({});

  const fetchSelectedArticle = async () => {
    const getSelectedArticle = await axios.get(
      `http://localhost:8000/articles/${id}`
    );
    setArticle(getSelectedArticle.data);
  };

  useEffect(() => {
    fetchSelectedArticle();
    console.log('adminToken', adminAuth);
  }, []);
 

  return (
    <>
      <div className='Home'>
        {adminAuth && (
          <ul>
            {' '}
            <li>
              <img src={article.image} alt='image' />
            </li>
            <li>
              <h3>{article.text}</h3>
            </li>
          </ul>
        )}
      </div>
      <Link to={`/articles`}>Back to Blog (all articles)</Link>
    </>
  );
};

export default Articles;
