import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
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
import Providers from './providers/Providers';
import Farmers from './pages/farmers/Farmers';
import FarmerCreation from './pages/farmer-creation/FarmerCreation';
import PageOutlet from './layout/page-outlet/PageOutlet';

export default function App() {
  return (
    <Providers>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<PageOutlet />}>
              <Route index element={<Home />} />

              <Route path="pools">
                <Route index element={<Pools />} />
                <Route path="duels">
                  <Route index element={<PoolDuel />} />
                  <Route path="create" element={<DuelPoolCreation />} />
                  <Route path=":poolId">
                    <Route index element={<PoolDuelDetail />} />
                    <Route path="runs">
                      <Route index element={<PoolRunsDuel />} />
                      <Route path=":runId" element={<PoolRunDuelDetail />} />
                    </Route>
                  </Route>
                </Route>
              </Route>

              <Route path="leeks" element={<Leeks />} />
              <Route path="new-leek" element={<LeekCreation />} />
              <Route path="farmers" element={<Farmers />} />
              <Route path="new-farmer" element={<FarmerCreation />} />

              <Route path="ais">
                <Route index element={<AIs />} />
                <Route path="create" element={<CreateAI />} />
                <Route path=":id" element={<AIDetail />} />
              </Route>

              <Route path="ai/:id" element={<AIDetail />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </Providers>
  );
}
