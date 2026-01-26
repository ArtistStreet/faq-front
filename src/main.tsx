import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import client from './apollo-client.ts';
import { ApolloProvider } from '@apollo/client/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/utils/i18n.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
     <React.StrictMode>
          <ApolloProvider client={client}>
               <App />
          </ApolloProvider>
     </React.StrictMode>,
);