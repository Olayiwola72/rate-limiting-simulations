import { Link } from "react-router-dom";
import routes from "../../config/routesConfig";
import "./landing-page.scss";

function LandingPage() {
  const simulationRoutes = routes.filter((route) => route.path !== "/");

  return (
    <div className="landing-page">
      <div className="landing-page__card">
        <p className="landing-page__eyebrow">Simulation Studio</p>
        <h1 className="landing-page__title">
          Master Rate Limiting Algorithms
        </h1>
        <p className="landing-page__subtitle">
          Dive into interactive simulations to visualize how modern
          traffic-shaping strategies and request controls work under load.
          Learn by doing!
        </p>

        <div className="landing-page__actions">
          {simulationRoutes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className="landing-page__link"
            >
              <button
                className={`landing-page__button landing-page__button--${route.color}`}
              >
                {route.title}
              </button>
            </Link>
          ))}
        </div>
      </div>

      <div className="landing-page__decor">
        <span className="landing-page__circle landing-page__circle--blue"></span>
        <span className="landing-page__circle landing-page__circle--green"></span>
      </div>
    </div>
  );
}

export default LandingPage;
