import { Outlet, useLocation } from 'react-router-dom';
// import Header from '../header/Header';
import SideBar from '../sidebar/SideBar';

export default function Layout() {
  const location = useLocation();
  return (
    <main className=" min-h-screen container-background w-full p-2 grid grid-cols-6">
      {location?.pathname === '/profile' ? <></> : <SideBar />}
      <div
        className={`flex-col flex w-full ${location?.pathname === '/profile' ? 'col-span-5' : 'col-span-5'}`}
      >
        {/* <Header /> */}
        <div className={`w-full h-full  mx-auto px-10`}>
          <Outlet />
        </div>
      </div>
    </main>
  );
}
