import React from "react";
import {
 
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
 
import logo from "../img/logo.png";
import { NavLink } from "react-router-dom";
export function NavbarDefault() {
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 font-bold lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="flex items-center gap-x-2 p-1 font-medium"
    >
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-activeLink font-bold transform ease-in   transition-transform  duration-300"
            : "text-gray-600  font-bold hover:text-activeLink duration-300"
        }
      >
        Home
      </NavLink>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="flex items-center gap-x-2 p-1 font-medium"
    >
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive
            ? "text-activeLink font-bold transform ease-in   transition-transform  duration-300"
            : "text-gray-600  font-bold hover:text-activeLink duration-300"
        }
      >
        About
      </NavLink>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="flex items-center gap-x-2 p-1 font-medium"
    >
      <NavLink
        to="/faq"
        className={({ isActive }) =>
          isActive
            ? "text-activeLink font-bold transform ease-in   transition-transform  duration-300"
            : "text-gray-600  font-bold hover:text-activeLink duration-300"
        }
      >
        FAQ
      </NavLink>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="flex items-center gap-x-2 p-1 font-medium"
    >
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive
            ? "text-activeLink font-bold transform ease-in   transition-transform  duration-300"
            : "text-gray-600  font-bold hover:text-activeLink  duration-300"
        }
      >
        Contact
      </NavLink>
    </Typography>
  </ul>
  );
 
  return (
    <nav className="mx-auto  px-4 py-2 lg:px-4 lg:py-2 border-b-2 shadow-2xl">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          <img src={logo} alt="" className="w-32" />
        </Typography>
        <div className="hidden lg:block">{navList}</div>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex items-center gap-x-1">
            <Button fullWidth variant="text" size="sm" className="">
              <span>Log In</span>
            </Button>
            <Button fullWidth variant="gradient" size="sm" className="">
              <span>Sign in</span>
            </Button>
          </div>
        </div>
      </MobileNav>
    </nav>
  );
}