import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Works,
  StarsCanvas,
  ErrorBoundary,
} from "./components";
import Skills from "./components/Skills";

import Footer from "./components/Footer";
import SkillShow from "./components/SkillShow";
import ProjectDetails from "./components/ProjectDetails";
import AdminPanel from "./components/admin/AdminPanel";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <div className="relative bg-primary">
                <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                  <Navbar />
                  <Hero />
                </div>

                <About />
                <Skills />
                <Experience />

                {/* <Tech /> */}

                <SkillShow />
                <div className="relative z-0">
                  <Works />
                  <Contact />
                  <StarsCanvas />
                </div>

                <Footer />
              </div>
            }
          />
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
