import ContentPage from "../../component/ContentPage";
import { privateRouter } from "../../router/router";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function ContainerPage() {
  return (
    <Router>
      <Routes>
        {privateRouter.map((route, index) => {
          const Layout = ContentPage;
          const Page = route.component;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default ContainerPage;
