import React from 'react';
import {InMemoryCache, ApolloClient, ApolloProvider} from '@apollo/client';
import './App.css';
import Users from './components/Users';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Users />
      </div>
    </ApolloProvider>
    
  );
}

export default App;
