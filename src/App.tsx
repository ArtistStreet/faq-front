import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import GroupList from './features/group/pages/GroupList'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoleList from './features/role/pages/RoleList';

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
                    <BrowserRouter>
                         <Routes>
                              <Route path="/groups" element={<GroupList />} />
                              <Route path="/groups/*" element={<GroupList />} /> /* để bắt nested
                              <Route path="/roles" element={<RoleList />} />
                         </Routes>
                    </BrowserRouter>
               </QueryClientProvider>
          </>
     )
}

export default App
