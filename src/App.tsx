import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import routes, { type AppRoute } from "./config/routesConfig";

interface RouteTitleProps {
  title?: string;
}

function RouteTitle({ title }: RouteTitleProps) {
  useEffect(() => {
    if (!title) return;

    document.title = title;
  }, [title]);

  return null;
}

const App: React.FC = () => {
  return (
    <div className="app-shell">
      <main className="app-main">
        <Suspense fallback={<div className="app-loading">Loading simulation...</div>}>
          <Routes>
            {routes.map((route: AppRoute) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <>
                    <RouteTitle title={route.title} />
                    {route.element}
                  </>
                }
              />
            ))}
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;
