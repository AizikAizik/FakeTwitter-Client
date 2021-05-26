import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

const LOGIN_MUTATION = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password){
            token,
            user{
                id,
                name
            }
        }
    }
`

interface SignInValues {
    email: string,
    password: string
}

const initialValues: SignInValues = {
    email: '',
    password: ''
}

const validationSchema = yup.object({
  email: yup.string().email('Invalid Email').required('Email is Required'),

  password: yup
    .string()
    .required('password is required'),
});

export default function Login() {
  const history = useHistory();
  const [login, { data }] = useMutation(LOGIN_MUTATION);
  return (
    <div>
      <h2>Login To Twitter</h2>
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
          <ErrorMessage name='email' component={'div'} />

          <Field name='password' type='password' placeholder='password' />
          <ErrorMessage name='password' component={'div'} />

          <button type='submit'>Login</button>
        </Form>
      </Formik>
    </div>
  );
}
