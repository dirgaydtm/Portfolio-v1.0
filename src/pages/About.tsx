import ProfilePhoto from "../assets/ProfilePhoto.jpg";
import Avatar from "../components/Avatar";
import EduCard from "../components/EduCard";
import BlurText from "../components/DescText.tsx";
import SplitText from "../components/SplitText.tsx";
import { Data } from "../list.tsx";
import { FileUser, PhoneForwarded } from "lucide-react";

const About = () => {
  const { educationData } = Data();
  const cvUrl: string = "/path/to/file.pdf";

  return (
    <section
      id="About"
      className="relative  px-5 h-screen max-h-[1080px] flex flex-col lg:flex-row lg:px-20 items-center justify-center"
    >
      <SplitText
        text={`ABOUT ME`}
        className="lg:absolute top-17 text-4xl font-bold text-white"
      />
      <div className="order-2 lg:order-1 flex-col flex lg:flex-3 gap-5 lg:gap-1">
        <SplitText
          text={`Hello World\nI'm Dirga Yuditama`}
          className="text-xl md:text-3xl lg:text-justify lg:text-4xl"
        />
        <BlurText text="A student at Universitas Brawijaya with a deep passion for technology. I aspire to become a developer or data scientist in the future. For me, technology is always evolving, which makes the journey of learning and growth even more exciting." />
        <span className="flex gap-3 justify-center lg:justify-start">
          <button
            data-aos="fade-right"
            data-aos-duration="800"
            data-aos-delay="1300"
            data-aos-once="true"
            onClick={() => {
              const link = document.createElement("a");
              link.href = cvUrl;
              link.download = "CV_Dirga_Yuditama.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="text-white flex flex-row gap-2 cursor-pointer border px-4 py-2 my-3 text-sm md:text-base rounded-3xl hover:bg-white hover:text-black"
          >
            Download CV
            <FileUser className="inline-block w-4 lg:w-5" />
          </button>
          <button
            data-aos="fade-right"
            data-aos-duration="800"
            data-aos-delay="1100"
            data-aos-once="true"
            onClick={() => {
              const contactSection = document.getElementById("Contact");
              if (contactSection) {
                contactSection.scrollIntoView();
              }
            }}
            className="text-white flex flex-row gap-2 cursor-pointer border px-4 py-2 my-3 text-sm md:text-base rounded-3xl hover:bg-white hover:text-black"
          >
            Get in touch
            <PhoneForwarded className="inline-block w-4 lg:w-5" />
          </button>
        </span>
      </div>
      <div className="order-1 lg:order-2 m-10 lg:m-0 flex flex-col lg:flex-1">
        <Avatar src={ProfilePhoto} />
      </div>
      <div className="order-3 flex flex-col w-full mx-6 lg:w-auto lg:m-0 lg:flex-3 text-center">
        <SplitText
          text="Education"
          className="m-5 lg:mx-0 text-2xl md:text-3xl  lg:text-right lg:text-4xl"
        />
        <div className="flex flex-col items-center gap-4 mx-6 lg:mx-0">
          {educationData.map((edu) => (
            <EduCard
              key={edu.institution}
              institution={edu.institution}
              major={edu.major}
              instagram={edu.instagram}
              delay={edu.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
