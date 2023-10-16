import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import AuthPage from './Authpage';
import { setContext } from '@apollo/client/link/context'

const httpLink=createHttpLink({
    uri :  'http://127.0.0.1:8000/',

});

const authLink=setContext((_,{headers})=>{

  const token = window.localStorage.getItem("token");
  return {
    headers:{
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };

})

const  client = new  ApolloClient({
  link:authLink.concat(httpLink),
  cache:  new  InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      {
        !window.localStorage.getItem('token') ? <AuthPage/> : <App/>
      }
    </ApolloProvider>
  </React.StrictMode>
);


