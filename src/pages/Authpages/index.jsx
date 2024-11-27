import { Outlet } from 'react-router-dom';
import SideText from './sideLayout';
function AuthPages() {
  return (
    <div className="grid grid-cols-2 items-center justify-center min-h-screen">
      <SideText />
      <div className="flex justify-center w-full rounded-md bg-white max-w-xl backdrop-blur-sm p-10 justify-self-start">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthPages;
