import { Contact, Briefcase, Code, Mail } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import RotatingText from "./RotatingText";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("Home");

  interface NavItem {
    href: string;
    label: string;
    icon: React.ReactNode;
  }

  const navItems: NavItem[] = [
    { href: "#About", label: "About", icon: <Contact className="w-5 h-5" /> },
    {
      href: "#Organization",
      label: "Organization",
      icon: <Briefcase className="w-5 h-5" />,
    },
    { href: "#Skill", label: "Skill", icon: <Code className="w-5 h-5" /> },
    { href: "#Contact", label: "Contact", icon: <Mail className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navItems
        .map((item) => {
          const section = document.querySelector<HTMLElement>(item.href);
          if (section) {
            return {
              id: item.href.replace("#", ""),
              offset: section.offsetTop - 550,
              height: section.offsetHeight,
            };
          }
          return null;
        })
        .filter(Boolean) as { id: string; offset: number; height: number }[];

      const currentPosition = window.scrollY;
      const active = sections.find(
        (section) =>
          currentPosition >= section.offset &&
          currentPosition < section.offset + section.height
      );

      if (active) {
        setActiveSection(active.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const section = document.querySelector<HTMLElement>(href);
    if (section) {
      const top = section.offsetTop;
      window.scrollTo({
        top: top,
      });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full max-w-[1900px] z-10  transition-all duration-500 ${
        isOpen
          ? "bg-black-secondary"
          : scrolled
          ? "bg-[#ffffff00] backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-3 sm:px-6 lg:px-[5%]">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <RotatingText
              texts={["Dirga", "Yuditama", "Junior", "Developer"]}
            />
          </div>

          {/* Desktop Navbar */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="group relative px-1 py-2 text-sm font-medium"
                >
                  <span
                    className={`flex gap-2 items-center relative z-10 transition-colors duration-100 px-2 py-1 rounded-xl ${
                      activeSection === item.href.substring(1)
                        ? "bg-white text-black "
                        : "text-white group-hover:text-text-primary"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </span>
                  <span
                    className={`absolute bottom-3 left-1/2 w-[90%] h-0.5 bg-white transform -translate-x-1/2 translate-y-2 transition-transform duration-300 ${
                      activeSection === item.href.substring(1)
                        ? "hidden"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`relative p-2 transition-transform duration-300 ease-in-out text-white transform ${
                isOpen ? "rotate-90 scale-125" : "rotate-0 scale-100"
              }`}
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed h-80 inset-0 bg-black-secondary transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-[-100%] pointer-events-none"
        }`}
        style={{ top: "64px" }}
      >
        <div className="flex flex-col">
          <div className="px-4 py-6 space-y-4 flex-1">
            {navItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className={`block px-4 py-3 text-lg font-medium rounded-4xl transition-all duration-300 ease ${
                  activeSection === item.href.substring(1)
                    ? "bg-white text-black-secondary font-semibold"
                    : "text-white hover:text-white"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transform: isOpen ? "translateX(0)" : "translateX(50px)",
                  opacity: isOpen ? 1 : 0,
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
