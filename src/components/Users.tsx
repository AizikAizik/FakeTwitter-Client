import React from "react";
import { gql, useQuery } from "@apollo/client";

const USERS_QUERY = gql`
  query USERS_QUERY {
    users {
      id
      name
    }
  }
`;

interface User {
  name: string;
}

function Users() {
  const { loading, error, data } = useQuery(USERS_QUERY);

  if (loading) {
    return <h3>Loading..........</h3>;
  }

  if (error) {
    return <h4>{error.message}</h4>;
  }

  return (
    <div>
      {data.users.map((user: User, index: any) => {
        return <h2 key={index}>{user.name}</h2>;
      })}
    </div>
  );
}

export default Users;
