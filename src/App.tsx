import { Routes, Route } from 'react-router-dom';
import Login from '@/pages/Login';
import Layout from '@/pages/Layout';
import Register from '@/pages/Register';
import LinkPage from '@/pages/LinkPage';
import Unauthorized from '@/pages/Unauthorized';
import RequireAuth from '@/pages/RequireAuth';
import Home from '@/pages/Home';
import Admin from '@/pages/Admin';
import Missing from '@/pages/Missing';
import { Role } from '@/constants';

function App() {

  return (
        <Routes>
          {/* without layout */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="linkpage" element={<LinkPage />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            {/* we want to protect these routes */}
            <Route element={<RequireAuth allowedRoles={[Role.PROVIDER]} />}>
              <Route path="/" element={<Home />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[Role.PROVIDER]} />}>
              <Route path="admin" element={<Admin />} />
            </Route>

            {/* catch all */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
  );
}

export default App;