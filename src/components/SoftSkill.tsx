import { Data } from "../list.tsx";

const SoftSkill = () => {
  const { softSkill } = Data();

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="500"
      data-aos-delay="200"
      data-aos-once="true"
      className="border border-white rounded-4xl flex flex-col justify-center items-center flex-2"
    >
      <h2 className="text-2xl font-semibold text-white mt-3">SOFT SKILL</h2>
      <div className="flex flex-wrap justify-center gap-3 m-4">
        {softSkill.map((item, index) => (
          <span
            key={index}
            data-aos="zoom-in"
            data-aos-delay={300 + index * 100}
            data-aos-once="true"
            className="inline-flex font-medium p-1 md:py-2  bg-white text-black rounded-full text-xs lg:text-sm"
            dangerouslySetInnerHTML={{ __html: item.soft_skill }}
          />
        ))}
      </div>
    </div>
  );
};

export default SoftSkill;
