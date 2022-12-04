import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp"
import config from "../config"

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.signin, component: SignIn },
    { path: config.routes.signup, component: SignUp },
];
export { publicRoutes};