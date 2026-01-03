// src/apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3000/graphql', // ← URL backend NestJS của bạn
  }),
  cache: new InMemoryCache(),
});

export default client;