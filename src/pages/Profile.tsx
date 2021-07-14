import React from 'react';
import { gql, useQuery } from '@apollo/client';

export const ME_QUERY = gql`
  query me {
    me {
      id
      profile {
        id
        bio
        website
        location
        avatar
      }
    }
  }
`;

export default function Profile() {
  const { loading, error, data } = useQuery(ME_QUERY);

  if (loading) {
    return <h2>loading.........</h2>;
  }

  if (error) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div className='container'>
      <h2>Profile</h2>
      <p>{data.me.profile.bio}</p>
      <p>{data.me.profile.website}</p>
      <p>{data.me.profile.location}</p>
    </div>
  );
}
