import AuthPages from '@/pages/Authpages';
import { Suspense, useEffect, useState } from 'react';
import { Routes, Route, useRouteError } from 'react-router-dom';
import { AuthRoutes } from './AuthRoutes';
import Layout from '@/components/layouts';
import Cookies from 'js-cookie';
import { AdminRoutes } from './AdminRoutes';
import NotFound from '@/components/notfound/NotFound';
import { accessTokenCookieName } from '@/lib/constants';
import PreLoader from '@/components/loader/PreLoader';

export default function Routers() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const token = Cookies.get(accessTokenCookieName);
    setIsAuth(!!token);
  }, []);

  return (
    <Suspense fallback={<PreLoader />}>
      <Routes>
        {isAuth ? (
          <Route element={<Layout />} errorElement={<ErrorBoundary />}>
            <Route index path="/*" element={<NotFound />} />
            {AdminRoutes.map(route => (
              <Route key={route.path} {...route} />
            ))}
          </Route>
        ) : (
          <Route element={<AuthPages />} errorElement={<ErrorBoundary />}>
            {AuthRoutes.map(route => (
              <Route key={route.path} {...route} />
            ))}
          </Route>
        )}
      </Routes>
    </Suspense>
  );
}

function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return <div>Oops! Something went wrong. Please try again later.</div>;
}
