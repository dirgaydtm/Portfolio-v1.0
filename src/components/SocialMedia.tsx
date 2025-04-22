import { Github, Instagram, Linkedin } from "lucide-react";
import React from "react";

const SocialMedia = () => {
  const socialMedia = [
    {
      icon: <Github />,
      link: "github.com/dirgaydtm",
      username: "dirgaydtm",
    },
    {
      icon: <Linkedin />,
      link: "linkedin.com/in/dirgaydtm",
      username: "Dirga Yuditama",
    },
    {
      icon: <Instagram />,
      link: "https://www.instagram.com/dirgaa.yd/",
      username: "dirgaa.yd",
    },
  ];

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="300"
      data-aos-once="true"
    >
      <p className="text-white text-center font-semibold text-sm m-3">
        Let's Connect!
      </p>
      <div className="flex flex-row gap-4 justify-center">
        {socialMedia.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            className="inline-flex px-5 gap-2 min-w-25 items-center justify-center border align-middle select-none
          text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none
          disabled:pointer-events-none rounded-lg p-2 shadow-sm
          hover:shadow-md border-[#24292e] bg-black-secondary text-white hover:border-[#24292e]
          hover:bg-[#24292e] hover:brightness-110"
          >
            {React.cloneElement(item.icon, { className: "size-4" })}
            <span className="hidden text-xs lg:block">
              {item.username}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;
