import { Data } from "../list.tsx";
import OrganizationCard from "../components/OrganizationCard";
import SplitText from "../components/SplitText.tsx";

const Organization = () => {
  const { organizationData } = Data();

  return (
    <section
      id="Organization"
      className="relative  lg:h-screen lg:max-h-[1080px] flex justify-center "
    >
      <SplitText
        text={`ORGANIZATION`}
        className="absolute top-17 text-4xl font-bold text-white"
      />
      <figure className="flex flex-row flex-wrap gap-10 items-center justify-center mt-40 mb-10 lg:m-0 ">
        {organizationData.map((item) => (
          <OrganizationCard
            key={item.organizationName}
            animationIn={item.animation}
            organization={item.organizationName}
            position={item.organizationPosition}
            borderColor={item.borderColor}
            link={item.link}
            image={item.src}
          />
        ))}
      </figure>
    </section>
  );
};

export default Organization;
