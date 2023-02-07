import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRouter } from "./router/router";
import DefaultPage from "./component/DefaultPage";
import ContentPage from "./component/ContentPage";
import { UserProvider } from "./UserContext";
import { useEffect } from "react";
import { useState } from "react";
import PrivatePage from "./component/PrivatePage";
import { API_URL } from "./constants";

function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setUser(data?.result?.data);
        setLoading(false);
      });
  }, []);
  return (
    <UserProvider value={{ loading: loading, user: user, setUser }}>
      <Router>
        <div>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Layout = DefaultPage;
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
            {privateRouter.map((route, index) => {
              const Layout = ContentPage;
              const Page = route.component;

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <PrivatePage>
                      <Layout>
                        <Page />
                      </Layout>
                    </PrivatePage>
                  }
                />
              );
            })}
          </Routes>
          <Routes></Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
