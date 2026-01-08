import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './layout/Layout';
import Home from './pages/home/Home';
import Pools from './pages/pools/Pools';
import Leeks from './pages/leeks/Leeks';
import LeekCreation from './pages/leek-creation/LeekCreation';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pools" element={<Pools />} />
            <Route path="/pools/duel" element={<Pools />} />
            <Route path="/leeks" element={<Leeks />} />
            <Route path="/new-leek" element={<LeekCreation />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}
