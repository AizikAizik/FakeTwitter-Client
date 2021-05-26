import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';

const IS_AUTH = gql`
    {
        me{
            id
        }
    }
`;

interface Props {
  children: React.ReactNode;
}

export default function IsAuthenticated({ children }: Props) {
  const { loading, error, data } = useQuery(IS_AUTH);

  if (loading) {
    return <h3>Loading..........</h3>;
  }

  if (error) {
    return <h4>{error.message}</h4>;
  }

  if (!data.me) {
    return <Redirect to={{ pathname: '/landing' }} />;
  }

  return <>{children}</>;
}
