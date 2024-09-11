import { Outlet } from "react-router-dom";
import { NavbarDefault } from "../component/Navber";



const Root = () => {
  return (
    <>
    <NavbarDefault/>
      <div className="min-h-[calc(100vh-212px)] mx-auto ">
        <Outlet />
      </div>
     
    </>
  );
};

export default Root;
