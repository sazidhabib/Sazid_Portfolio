import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";
import HeroNew from "./components/HeroNew";
import Skills from "./components/Skills";

import Footer from "./components/Footer";
import SkillShow from "./components/SkillShow";

const App = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;
