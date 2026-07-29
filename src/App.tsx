
// App.tsx

import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Header from "./components/Card_Header";

/* Pages */

import LandingPage from "./pages/LandingPage";

import Products from "./pages/Products";

import Solutions from "./pages/Solutions";

import ProductPage from "./pages/ProductPage";

import IndustryPage from "./pages/IndustryPage";

import FactoryAutomation from "./pages/FactoryAutomation";

/*
 * Future Pages
 *
 * import DevelopersPage from "./pages/DevelopersPage";
 * import AboutPage from "./pages/AboutPage";
 */

function App() {
  return (
    <BrowserRouter>

      <Header />

      <Routes>

        {/* =========================
            HOME
        ========================= */}

        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* =========================
            PRODUCTS
        ========================= */}

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/factory-automation"
          element={<FactoryAutomation />}
        />

        <Route
          path="/factory-automation"
          element={<FactoryAutomation />}
        />

        <Route
          path="/products/:slug"
          element={<ProductPage />}
        />

        {/* =========================
            INDUSTRIES
        ========================= */}

        <Route
          path="/industries/:slug"
          element={<IndustryPage />}
        />

        {/* =========================
            SOLUTIONS
        ========================= */}

        <Route
          path="/solutions"
          element={<Solutions />}
        />

        {/* =========================
            FUTURE ROUTES
        ========================= */}

        {/*
        <Route
          path="/developers/:slug"
          element={<DevelopersPage />}
        />

        <Route
          path="/about"
          element={<AboutPage />}
        />
        */}

      </Routes>

    </BrowserRouter>
  );
}

export default App;

