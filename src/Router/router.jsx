import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import Home from "../pages/Home/Home";
import SweepstakesPage from "../pages/Details/SweepstakesPage";
import Register from "../pages/login-register/register";


const router = createBrowserRouter([
  {
    path: "/",
    element:<Root/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:'/sweep/:id',
        element:<SweepstakesPage/>
      },
  
    ]
       
  }, {
    path:'/register',
    element:<Register/>
  },
]);

export default router;
