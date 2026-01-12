import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './layout/Layout';
import Home from './pages/home/Home';
import Pools from './pages/pools/Pools';
import PoolDuel from './pages/pools/duel/PoolDuel';
import PoolDuelDetail from './pages/pools/duel/PoolDuelDetail';
import PoolRunsDuel from './pages/pools/duel/PoolRunsDuel';
import PoolRunDuelDetail from './pages/pools/duel/PoolRunDuelDetail';
import Leeks from './pages/leeks/Leeks';
import LeekCreation from './pages/leek-creation/LeekCreation';
import AIs from './pages/ais/AIs';

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
            <Route path="/pools/duels" element={<PoolDuel />} />
            <Route path="/pools/duels/:poolId" element={<PoolDuelDetail />} />
            <Route
              path="/pools/duels/:poolId/runs"
              element={<PoolRunsDuel />}
            />
            <Route
              path="/pools/duels/:poolId/runs/:runId"
              element={<PoolRunDuelDetail />}
            />
            <Route path="/leeks" element={<Leeks />} />
            <Route path="/new-leek" element={<LeekCreation />} />
            <Route path="/ais" element={<AIs />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}
