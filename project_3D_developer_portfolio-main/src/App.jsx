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

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>

        <About />
        <Skills />
        <Experience />

        <Tech />
        <div className="relative z-0">
          <Works />
          {/* <Feedbacks /> */}

          <Contact />
          <StarsCanvas />
        </div>
        {/* <HeroNew /> */}
      </div>
    </BrowserRouter>
  );
};

export default App;
