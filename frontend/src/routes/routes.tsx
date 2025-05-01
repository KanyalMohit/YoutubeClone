import React from "react";
import PathConstants from "./pathConstants";


const Home = React.lazy(() => import("../pages/home/home"));
const Login = React.lazy(() => import("../pages/login"));
const Signup = React.lazy(() => import("../pages/signup"));
const VideoDetail = React.lazy(() => import("../pages/videoDetail"));
const Upload = React.lazy(() => import("../pages/upload"));
const Profile = React.lazy(() => import("../pages/profile"));



const routes = [
    {path: PathConstants.HOME, element: <Home />},
    {path: PathConstants.LOGIN, element: <Login />},
    {path: PathConstants.SIGNUP, element: <Signup />},
    {path: PathConstants.VIDEO_DETAIL, element: <VideoDetail />},
    {path: PathConstants.UPLOAD, element: <Upload />},
    {path: PathConstants.PROFILE, element: <Profile />},
]


export default routes;