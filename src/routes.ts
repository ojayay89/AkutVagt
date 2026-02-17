import { createBrowserRouter } from "react-router";
import { PublicSite } from './components/PublicSite';
import { AdminLogin } from './components/AdminLogin';
import { AdminPanel } from './components/AdminPanel';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PublicSite,
  },
  {
    path: "/admin-login",
    Component: AdminLogin,
  },
  {
    path: "/admin-dashboard",
    Component: AdminPanel,
  },
]);