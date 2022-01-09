import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Login.css';
import { useState } from 'react';
import { useAdmin } from '../../contexts/AdminProvider';

const Login = () => {
  const [error, setError] = useState(null);
  const navigator = useNavigate();
  const {setAdminAuth } = useAdmin();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: false,
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.password) {
        errors.password = 'Required';
      }

      return errors;
    },
    onSubmit: (values) => {
      axios
        .post(`http://localhost:8000/admin/login`, values)
        .then(({ data: { credential } }) => {
          setAdminAuth({
            token: credential,
          });
          navigator('/articles');
        })
        .catch(({ response: { data: { message } } }) => {
          setError(message);
        });
    },
  });

  return (
    <div className="Login">
      <h1>Login Form</h1>
      <p className="error">{error}</p>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">
          email
          {formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </label>
        <label htmlFor="password">
          password
          {formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
