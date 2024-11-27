import BCADetail from '@/pages/BCAs/BcaDetail';
import BCAS from '@/pages/BCAs/Bcas';
import Checks from '@/pages/Check/Check';
import ChecksRequest from '@/pages/CheckRequest/CheckRequest';
import Company from '@/pages/Company/Company';
import Dashboard from '@/pages/dashboard/Dashboard';
import Forms from '@/pages/Forms/Forms';
import Profile from '@/pages/profile/Profile';
import Roles from '@/pages/Roles/Roles';
import Vendor from '@/pages/Vendor/Vendor';

export const AdminRoutes = [
  { index: true, path: '/', element: <Dashboard /> },
  { path: '/bcas', element: <BCAS /> },
  { path: '/bcaId/:id', element: <BCADetail /> },
  { path: '/company', element: <Company /> },
  { path: '/vendor', element: <Vendor /> },
  { path: '/check', element: <Checks /> },
  { path: '/check-request', element: <ChecksRequest /> },
  { path: '/forms', element: <Forms /> },
  { path: '/roles', element: <Roles /> },
  { path: '/profile', element: <Profile /> },
];
