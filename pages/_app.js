import Navbar from '../components/NavBar'
import '../styles/globals.css'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { UserContextProvider } from '../context/User'
import { CartContextProvider } from '../context/Cart';

const httpLink = createHttpLink({
  uri: 'http://localhost:1337/graphql',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  console.log("token" ,token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function MyApp({ Component, pageProps }) {
  return(
    <ApolloProvider client={client}>
      <UserContextProvider>
        <CartContextProvider>
          <Navbar/>
          <Component {...pageProps} />
        </CartContextProvider>
      </UserContextProvider>
    </ApolloProvider>
)}

export default MyApp
