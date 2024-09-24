import { Outlet } from "react-router-dom";
import { Nav } from "../Components/Navbar";

const Main = () => {


  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

export default Main;
