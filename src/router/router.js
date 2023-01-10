import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import config from "../config";
import InboxPage from "../pages/InboxPage";
import SentPage from "../pages/SentPage";
import SnoozedPage from "../pages/SnoozedPage";
import StarredPage from "../pages/StarredPage";
import DraftsPage from "../pages/DraftsPage";
import NotFound from "../component/NotFoundPage/NotFound";

const publicRoutes = [
  { path: config.routes.signin, component: SignIn },
  { path: config.routes.signup, component: SignUp },
  { path: "*", component: NotFound },
];
export { publicRoutes };
const privateRouter = [
  { path: config.routes.home, component: Home },
  { path: config.routes.inbox, component: InboxPage },
  { path: config.routes.sent, component: SentPage },
  { path: config.routes.starred, component: StarredPage },
  { path: config.routes.drafts, component: DraftsPage },
  { path: config.routes.snoozed, component: SnoozedPage },
  { path: "*", component: NotFound },
];
export { privateRouter };
