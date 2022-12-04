import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes } from "./router/router";
import DefaultPage from './component/DefaultPage';
function App() {
  return (
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
                    <Page/>
                  </Layout>
                }
              />
            )
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
