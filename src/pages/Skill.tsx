import SplitText from "../components/SplitText.tsx";
import TechStack from "../components/TechStack.tsx";
import SoftSkill from "../components/SoftSkill.tsx";

const Skill = () => {
  return (
    <section
      id="Skill"
      className="relative lg:h-screen lg:max-h-[1080px] flex items-center justify-center"
    >
      <SplitText
        text={`SKILL`}
        className="absolute top-17 text-4xl font-bold text-white"
      />
      <div className="w-250 h-[60%] flex flex-col gap-8 mt-40 mb-10 mx-10 lg:m-0">
        <TechStack />
        <SoftSkill />
      </div>
    </section>
  );
};

export default Skill;
