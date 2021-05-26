import React from 'react';
import {
  InMemoryCache,
  ApolloClient,
  ApolloProvider,
  HttpLink
} from '@apollo/client';
import './App.css';
import Users from './components/Users';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Landing from './components/Landing';
import {setContext} from 'apollo-link-context';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

const httplink = new HttpLink({uri: 'http://localhost:4000'});
const authlink = setContext(async (req, {headers}) =>{
  const token = localStorage.getItem('token');

  return{
    ...headers,
    headers:{
      Authorization: token ? `Bearer ${token}` : null
    }
  }
})
const link = authlink.concat(httplink as any);

const client = new ApolloClient({
  link: (link as any),
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
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/landing'>
            <Landing />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
    
  );
}

export default App;
