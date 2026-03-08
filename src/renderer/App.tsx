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
import PoolFarmer from './pages/pools/farmer/PoolFarmer';
import FarmerPoolCreation from './pages/pools/farmer/create/FarmerPoolCreation';
import PoolFarmerDetail from './pages/pools/farmer/details/PoolFarmerDetail';
import PoolRunsFarmer from './pages/pools/farmer/PoolRunsFarmer';
import PoolRunFarmerDetail from './pages/pools/farmer/details/PoolRunFarmerDetail';
import BulkImportLeeks from './pages/bulk-import-leeks/BulkImportLeeks';
import Turrets from './pages/turrets/Turrets';
import TurretCreation from './pages/turret-creation/TurretCreation';
import PoolTeam from './pages/pools/team/PoolTeam';
import TeamPoolCreation from './pages/pools/team/create/TeamPoolCreation';
import Teams from './pages/teams/Teams';
import TeamCreation from './pages/team-creation/TeamCreation';
import PoolTeamDetail from './pages/pools/team/details/PoolTeamDetail';
import PoolRunsTeam from './pages/pools/team/PoolRunsTeam';
import PoolRunTeamDetail from './pages/pools/team/details/PoolRunTeamDetail';

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
                <Route path="duel">
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
                <Route path="farmer">
                  <Route index element={<PoolFarmer />} />
                  <Route path="create" element={<FarmerPoolCreation />} />
                  <Route path=":poolId">
                    <Route index element={<PoolFarmerDetail />} />
                    <Route path="runs">
                      <Route index element={<PoolRunsFarmer />} />
                      <Route path=":runId" element={<PoolRunFarmerDetail />} />
                    </Route>
                  </Route>
                </Route>
                <Route path="team">
                  <Route index element={<PoolTeam />} />
                  <Route path="create" element={<TeamPoolCreation />} />
                  <Route path=":poolId">
                    <Route index element={<PoolTeamDetail />} />
                    <Route path="runs">
                      <Route index element={<PoolRunsTeam />} />
                      <Route path=":runId" element={<PoolRunTeamDetail />} />
                    </Route>
                  </Route>
                </Route>
              </Route>

              <Route path="leeks" element={<Leeks />} />
              <Route path="new-leek" element={<LeekCreation />} />
              <Route path="bulk-import-leeks" element={<BulkImportLeeks />} />

              <Route path="farmers" element={<Farmers />} />
              <Route path="new-farmer" element={<FarmerCreation />} />

              <Route path="turrets" element={<Turrets />} />
              <Route path="new-turret" element={<TurretCreation />} />

              <Route path="teams" element={<Teams />} />
              <Route path="new-team" element={<TeamCreation />} />

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
