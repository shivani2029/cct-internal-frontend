import { useEffect, useState } from 'react';
import Logo from '../../assets/images/authpage/logo.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BriefcaseBusiness,
  Building2,
  LayoutDashboard,
  NotebookPen,
  // UserRoundCog,
  // GitCompareArrows,
} from 'lucide-react';
import { LogOut } from 'lucide-react';
import { handleLogout } from '@/services/auth';
function SideBar() {
  const [select, setSelect] = useState('portfolio');
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname.startsWith('/test')) {
      setSelect('test');
    } else if (location.pathname === '/bcas') {
      setSelect('bcas');
    } else if (location.pathname.startsWith('/bcaId')) {
      setSelect('bcas');
    } else if (location.pathname === '/company') {
      setSelect('company');
    } else if (location.pathname === '/vendor') {
      setSelect('vendor');
    } else if (location.pathname === '/check') {
      setSelect('check');
    } else if (location.pathname === '/check-request') {
      setSelect('check-request');
    } else if (location.pathname === '/roles') {
      setSelect('roles');
      // } else if (location.pathname === '/forms') {
      //   setSelect('forms');
    } else {
      setSelect('portfolio');
    }
  }, [location]);
  return (
    <div className=" w-full bg-gradient-to-b from-sky-800 to-teal-400 rounded-2xl">
      <div className="sticky top-0 w-full">
        <div className=" min-h-[10vh] py-5 px-8 flex justify-center border-b-2 border-[#f2f2f2] items-center">
          <Link to="/">
            <img
              src={Logo}
              alt="logo"
              className="max-w-[200px] w-full"
              width={0}
              height={40}
            />
          </Link>
        </div>
        <div className="flex flex-col gap-y-3 px-4 py-8 w-full">
          <button
            onClick={() => navigate('/')}
            className={`p-4 rounded-xl cursor-pointer w-full ${select === 'portfolio' ? 'bg-white text-[#1B64BB]' : ' text-white'} flex items-center`}
          >
            <LayoutDashboard />
            <span className="ml-2 text-base font-medium">Dashboard</span>
          </button>
          <button
            onClick={() => navigate('/bcas')}
            className={`p-4 rounded-xl cursor-pointer w-full ${select === 'bcas' ? 'bg-white text-[#1B64BB]' : ' text-white'} flex items-center`}
          >
            <BriefcaseBusiness />
            <span className="ml-3 text-base font-medium">BCAs</span>
          </button>
          {/* <button
            onClick={() => navigate('/vendor')}
            className={`p-4 rounded-xl cursor-pointer w-full ${select === 'vendor' ? 'bg-white text-[#1B64BB]' : ' text-white'} flex items-center`}
          >
            <UserRoundCog />
            <span className="ml-3 text-base font-medium">Vendor</span>
          </button> */}
          <button
            onClick={() => navigate('/company')}
            className={`p-4 rounded-xl cursor-pointer w-full ${select === 'company' ? 'bg-white text-[#1B64BB]' : ' text-white'} flex items-center`}
          >
            <Building2 />
            <span className="ml-3 text-base font-medium">Companies</span>
          </button>
          <button
            onClick={() => navigate('/check')}
            className={`p-4 rounded-xl cursor-pointer w-full ${select === 'check' ? 'bg-white text-[#1B64BB]' : ' text-white'} flex items-center`}
          >
            <Building2 />
            <span className="ml-3 text-base font-medium">Check</span>
          </button>
          {/* <button
            onClick={() => navigate('/check-request')}
            className={`p-4 rounded-xl cursor-pointer w-full ${select === 'check-request' ? 'bg-white text-[#1B64BB]' : ' text-white'} flex items-center`}
          >
            <GitCompareArrows />
            <span className="ml-3 text-base font-medium">Check Req.</span>
          </button> */}
          <button
            onClick={() => navigate('/roles')}
            className={`p-4 rounded-xl cursor-pointer w-full ${select === 'roles' ? 'bg-white text-[#1B64BB]' : ' text-white'} flex items-center`}
          >
            <NotebookPen />
            <span className="ml-3 text-base font-medium">Roles</span>
          </button>
          {/* <button
            onClick={() => navigate('/forms')}
            className={`p-4 rounded-xl cursor-pointer w-full ${select === 'forms' ? 'bg-white text-[#1B64BB]' : ' text-white'} flex items-center`}
          >
            <Building2 />
            <span className="ml-3 text-base font-medium">Forms</span>
          </button> */}
          <button
            onClick={() => {
              handleLogout();
            }}
            className={`p-4 mt-10 rounded-xl cursor-pointer w-full ${select === '' ? 'bg-white text-[#1B64BB]' : ' text-white'} flex items-center`}
          >
            <LogOut />
            <span className="ml-3 text-base font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
