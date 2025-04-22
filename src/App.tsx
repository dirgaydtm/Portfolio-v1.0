import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Organization from "./pages/Organization";
import Skill from "./pages/Skill";
import Contact from "./pages/Contact";
import ClickSpark from "./components/ClickSpark";
import AOS from "aos";
import "aos/dist/aos.css";
import { fairyDustCursor } from "cursor-effects";
import { useState, useEffect } from "react";
import Background from "./components/Background";

AOS.init();

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMobile) {
    fairyDustCursor({ colors: ["#ffffff"] });
  }

  return (
    <BrowserRouter>
      <main className="relative mx-auto overflow-hidden max-w-[1800px]">
        <Background />
        <ClickSpark>
          <Navbar />
          <About />
          <Organization />
          <Skill />
          <Contact />
        </ClickSpark>
      </main>
    </BrowserRouter>
  );
};

export default App;
