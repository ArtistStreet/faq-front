import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import client from './apollo-client.ts';
import { ApolloProvider } from '@apollo/client/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/utils/i18n.ts';
import { AuthProvider } from './contexts/AuthContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
     <React.StrictMode>
          <AuthProvider>
               <ApolloProvider client={client}>
                    <App />
               </ApolloProvider>
          </AuthProvider>
     </React.StrictMode>,
);