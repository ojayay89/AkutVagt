import { createBrowserRouter } from "react-router";
import { CategoryLanding } from './components/CategoryLanding';
import { CategoryView } from './components/CategoryView';
import { AdminLogin } from './components/AdminLogin';
import { AdminPanel } from './components/AdminPanel';

export const router = createBrowserRouter([
  {
    path: "/",
    Component: CategoryLanding,
  },
  {
    path: "/kategori/:category",
    Component: CategoryView,
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