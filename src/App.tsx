import { Routes, Route } from 'react-router-dom';
import { Role } from '@/constants';
import React from 'react';
import LayoutAuth from '@/pages/LayoutAuth';
import RequireAuth from '@/pages/RequireAuth';
import Layout from '@/pages/Layout';
import Authentificated from '@/pages/Authentificated';
import MpFeedback from '@/pages/MercadoPago/MpFeedback';
import PasswordRecover from '@/pages/PasswordRecover';

const Home = React.lazy(() => import("@/pages/Home"));
const Login = React.lazy(() => import("@/pages/Login"));
const Register = React.lazy(() => import("@/pages/Register"));
const Otp = React.lazy(() => import("@/pages/Otp"));
const Page404 = React.lazy(() => import("@/pages/Page404"));
const Unauthorized = React.lazy(() => import("@/pages/Unauthorized"));

function App() {

  return (
    <Routes>

      <Route element={<Authentificated />}>
        <Route element={<LayoutAuth />}>
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<PasswordRecover />} />
          <Route path="register" element={<Register />} />
          <Route path="otp" element={<Otp />} />
        </Route>
      </Route>


      <Route element={<RequireAuth allowedRoles={[Role.USER]} />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='mercado-pago'>
            <Route path="success" element={<MpFeedback status="success" />} />
            <Route path="failure" element={<MpFeedback status='failure' />} />
            <Route path="pending" element={<MpFeedback status='pending' />} />
          </Route>
        </Route>
        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>
      {/* catch all */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default App;