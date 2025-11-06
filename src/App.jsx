import { BrowserRouter } from 'react-router-dom';

import {
  About,
  Experience,
  Hero,
  Navbar,
  Works,
  Snapshot,
  SectionNav,
  StarsCanvas,
} from './components';

function App() {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <SectionNav />
        <Works />
        <About />
        <Experience />
        <Snapshot />
        <StarsCanvas />
      </div>
    </BrowserRouter>
  );
}

export default App;
