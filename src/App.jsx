import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import Main from './component/Main';

const getAuthorization = () => {
  const token = localStorage.getItem('token');

  return token ? `Bearer ${token}` : '';
};

const link = new HttpLink({
  uri: 'http://localhost:4000/',
  headers: {
    authorization: getAuthorization(),
  },
});

const client = new ApolloClient({ link, cache: new InMemoryCache() });

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
};

export default App;
