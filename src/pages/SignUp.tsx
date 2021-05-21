import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

const SIGNUP_MUTATION = gql`
  mutation signup($name: String, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

interface SignupValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: SignupValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = yup.object({
  email: yup.string().email("Invalid Email").required("Email is Required"),
  name: yup.string().max(15, "max limit is 15"),
  password: yup
    .string()
    .max(20, "Must be 20 characters or less")
    .required("password is required"),
});

// const submitHandler = async (value, {setSubmitting}) =>{}

export default function SignUp() {
  const history = useHistory();
  const [signup, { data }] = useMutation(SIGNUP_MUTATION);
  return (
    <div>
      <h2>Signup</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          const response = await signup({
            variables: values,
          });

          localStorage.setItem("token", response.data.signup.token);
          setSubmitting(false);
          history.push("/users");
        }}
      >
        <Form>
          <Field name="name" type="text" placeholder="full name" />
          <ErrorMessage name="name" component={"div"} />

          <Field name="email" type="email" placeholder="email" />
          <ErrorMessage name="email" component={"div"} />

          <Field name="passowrd" type="password" placeholder="password" />
          <ErrorMessage name="password" component={"div"} />

          <Field
            name="confirmPassword"
            type="password"
            placeholder="confirm password"
          />
          <ErrorMessage name="confirmPassword" component={"div"} />

          <button type="submit">Sign up</button>
        </Form>
      </Formik>
    </div>
  );
}
