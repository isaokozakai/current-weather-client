import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Main from './component/Main';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
};

export default App;
