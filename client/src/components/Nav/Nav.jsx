import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAdmin } from '../../contexts/AdminProvider';

import './Nav.css';

const Nav = () => {
  const { adminAuth } = useAdmin();
  const [articles, setArticles] = useState([]);
  const [isOnArticle, setOnArticle] = useState(false);

  const fetchArticleTitle = async () => {
    const { data: articlesData } = await axios.get(
      `http://localhost:8000/articles/`
    );

    setArticles(articlesData);
  };

  useEffect(() => {
    fetchArticleTitle();
    console.log('response from query server', articles);
  }, []);

  return (
    <nav>
      <div className='links nav-links'>
        <div
          onMouseEnter={() => setOnArticle(true)}
          onMouseLeave={() => setOnArticle(false)}
        >
          <p
            className='custom-link'
            role='presentation'
            onClick={() => setOnArticle(!isOnArticle)}
          >
            Articles
          </p>
          <div className='articles-list'>
            {isOnArticle && adminAuth &&
              articles.map((genre) => <p key={genre.id}>{genre.name}</p>)}
          </div>
        </div>
        <Link className='link custom-link' to='/articles'>
         BLOG
        </Link>
      </div>
      <div className='links adminAuth-links'>
        {!adminAuth && (
          <>
            <Link className='link custom-link' to='/login'>
              Login
            </Link>
          </>
        )}
        {adminAuth && (
          <>
            <Link className='link custom-link' to='/admin'>
              Admin
            </Link>
            <Link className='link custom-link' to='/disconnect'>
              Disconnect
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
