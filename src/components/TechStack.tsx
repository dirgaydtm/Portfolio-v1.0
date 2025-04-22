import { Data } from "../list.tsx";

const TechStack = () => {
  const { techStack } = Data();

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="500"
      data-aos-delay="100"
      data-aos-once="true"
      className="border border-white rounded-4xl flex flex-col justify-center items-center flex-3"
    >
      <h2 className="text-2xl font-semibold text-white mt-3">TECH STACK</h2>
      <div className="flex items-center justify-center flex-row flex-wrap gap-4 md:gap-12 m-7">
        {techStack.map((item, index) => (
          <div
            key={index}
            data-aos="zoom-in"
            data-aos-delay={200 + index * 50}
            data-aos-once="true"
            className="size-13 md:size-16 "
            dangerouslySetInnerHTML={{
              __html: item.tech_stack_icon,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TechStack;
