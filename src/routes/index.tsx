import { ElementType, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import {LoadingScreen} from "../component/LoadingScreen";
import {ROUTES} from "./paths";
import {Login} from "../pages/Auth/Login";
import {Page404} from "../pages/Page404";
import {MainLayout} from "../layout/MainLayout";
import {Home} from "../pages/Main/Home/Home";
import {Profile} from "../pages/Main/Profile/Profile";
import {AddPost} from "../pages/Main/AddPost/AddPost";
import {SignUp} from "../pages/Auth/SignUp";
import {MapPage} from "../pages/Main/Map/MapPage";
import {PostDetails} from "../pages/Main/Home/details/PostDetails";
import {EditProfile} from "../pages/Main/Profile/editProfile/EditProfile";
import {RequestList} from "../pages/Main/Profile/requestsList/RequestList";


// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

export default function Router() {


  return useRoutes([
    {
      path: ROUTES.BASE,
      element: (
          <MainLayout/>
      ),
      children: [
        {element: <Home/>, index: true},
        {element: <Profile/>, path:ROUTES.PROFILE},
        {element: <AddPost/>, path:ROUTES.ADD_POST},
        {element: <MapPage/>, path:ROUTES.MAP},
        {element: <PostDetails/>, path:ROUTES.DETAILS_POST},
        {element: <EditProfile/>, path:ROUTES.EDIT_PROFILE},
        {element: <RequestList />, path:ROUTES.REQUESTS_POST},
      ],
    },
    { path: ROUTES.AUTH.LOGIN, element: <Login/> },
    { path: ROUTES.AUTH.SIGNUP, element: <SignUp/> },
    { path: ROUTES.PAGE404, element: <Page404/> },
    { path: "*", element: <Navigate to={ROUTES.PAGE404} replace /> },

  ]);
}