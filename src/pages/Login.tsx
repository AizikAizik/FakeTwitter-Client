import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';
import TwitterLogo from '../styles/assets/twitter-logo.png';

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`;

interface SignInValues {
  email: string;
  password: string;
}

const initialValues: SignInValues = {
  email: '',
  password: '',
};

const validationSchema = yup.object({
  email: yup.string().email('Invalid Email').required('Email is Required'),

  password: yup.string().required('password is required'),
});

export default function Login() {
  const history = useHistory();
  const [login, { data }] = useMutation(LOGIN_MUTATION);
  return (
    <div className='container'>
      <img
        src={TwitterLogo}
        alt='logo'
        style={{ width: '50px' }}
        className='logo'
      />
      <h3>Login To Twitter</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const response = await login({
            variables: values,
          });

          localStorage.setItem('token', response.data.login.token);
          setSubmitting(false);
          console.log(response);
          history.push('/users');
        }}
      >
        <Form>
          <Field name='email' type='email' placeholder='email' />
          <ErrorMessage name='email' component={'p'} />

          <Field name='password' type='password' placeholder='password' />
          <ErrorMessage name='password' component={'p'} />

          <button type='submit' className='login-btn'>
            <span>Login</span>
          </button>
        </Form>
      </Formik>

      <div className='register'>
        <h4>Don't have an account?</h4>
        <Link to='/signup'>Sign up</Link>
      </div>
    </div>
  );
}
