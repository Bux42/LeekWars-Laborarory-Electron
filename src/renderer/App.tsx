import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/home/Home';
import Pools from './pages/pools/Pools';
import Leeks from './pages/leeks/Leeks';
import LeekCreation from './pages/leek-creation/LeekCreation';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pools" element={<Pools />} />
          <Route path="/leeks" element={<Leeks />} />
          <Route path="/new-leek" element={<LeekCreation />} />
        </Routes>
      </Layout>
    </Router>
  );
}
