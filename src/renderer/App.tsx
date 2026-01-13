import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './layout/Layout';
import Home from './pages/home/Home';
import Pools from './pages/pools/Pools';
import PoolDuel from './pages/pools/duel/PoolDuel';
import PoolDuelDetail from './pages/pools/duel/details/PoolDuelDetail';
import PoolRunsDuel from './pages/pools/duel/PoolRunsDuel';
import PoolRunDuelDetail from './pages/pools/duel/details/PoolRunDuelDetail';
import Leeks from './pages/leeks/Leeks';
import LeekCreation from './pages/leek-creation/LeekCreation';
import AIs from './pages/ais/AIs';
import AIDetail from './pages/ais/details/AIDetail';
import CreateAI from './pages/ais/create/CreateAI';
import DuelPoolCreation from './pages/pools/duel/create/DuelPoolCreation';

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
            <Route path="/pools/duels/create" element={<DuelPoolCreation />} />
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
            <Route path="/ais/create" element={<CreateAI />} />
            <Route path="/ais/:hash" element={<AIDetail />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}
