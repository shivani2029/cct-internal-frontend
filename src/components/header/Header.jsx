import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/images/authpage/logo.svg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Cookies from 'js-cookie';
import { accessTokenCookieName } from '@/lib/constants';

function Header() {
  const handleLogout = () => {
    Cookies.remove(accessTokenCookieName);
    window.location.href = '/';
  };
  const user = JSON.parse(localStorage.getItem('user'));

  const location = useLocation();
  return (
    <header className="sticky top-0 z-50 w-full bg-white min-h-[10vh] py-4 flex items-center">
      <div
        className={`w-full  mx-auto px-10 flex justify-between ${location.pathname === '/profile' ? 'container' : 'max-w-7xl'}`}
      >
        {location.pathname === '/profile' ? (
          <Link to="/">
            <img
              src={Logo}
              alt="logo"
              className="max-w-[200px] w-full"
              width={0}
              height={40}
            />
          </Link>
        ) : (
          <div />
        )}
        <div className="flex items-center gap-5">
          <div></div>
          <div className="flex justify-center items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center outline-none">
                <div className="mr-3 p-1 border-primary border-[3px] rounded-full">
                  <Avatar className="">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                {user?.name}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="font-bold" onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
