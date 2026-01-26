import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import RouterView from './routes';

const queryClient = new QueryClient({
     defaultOptions: {
          queries: {
               refetchOnWindowFocus: false,
               retry: 2, // Limit retry attempts to 2
          },
     },
});

function App() {

     return (
          <>
               <QueryClientProvider client={queryClient}>
                    <RouterView />
               </QueryClientProvider>
          </>
     )
}

export default App
