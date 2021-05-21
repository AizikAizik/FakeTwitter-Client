import React from 'react';
import {InMemoryCache, ApolloClient, ApolloProvider} from '@apollo/client';
import './App.css';
import Users from './components/Users';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Landing from './components/Landing';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path='/' exact>
            <Users />
          </Route>
          <Route path='/landing'>
            <Landing />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
    
  );
}

export default App;
