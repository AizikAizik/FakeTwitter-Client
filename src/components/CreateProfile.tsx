import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { ME_QUERY } from '../pages/Profile';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Modal from 'react-modal';
import { customStyles } from '../styles/customModalStyles';

const CREATE_PROFILE = gql`
  mutation createProfile(
    $bio: string
    $location: string
    $website: string
    $avatar: string
  ) {
    createProfile(
      bio: $bio
      location: $location
      website: $website
      avatar: $avatar
    ) {
      id
    }
  }
`;

interface ProfileValues {
  bio: string;
  website: string;
  location: string;
  avatar: string;
}

export default function CreateProfile() {
  const [createProfile] = useMutation(CREATE_PROFILE, {
    refetchQueries: [{ query: ME_QUERY }],
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const initialValues: ProfileValues = {
    bio: '',
    website: '',
    location: '',
    avatar: '',
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Create Profile</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel='Modal'
        style={customStyles}
      >
        <Formik
          initialValues={initialValues}
          //validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            await createProfile({
              variables: values,
            });

            setSubmitting(false);
            setModalOpen(false);
          }}
        >
          <Form>
            <Field name='bio' type='text' as='textarea' placeholder='Bio' />
            <ErrorMessage name='bio' component={'p'} />

            <Field name='website' type='url' placeholder='Website' />
            <ErrorMessage name='website' component={'p'} />

            <Field name='location' type='text' placeholder='Location' />
            <ErrorMessage name='location' component={'p'} />

            <button type='submit' className='login-btn'>
              <span>Create Profile</span>
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}
