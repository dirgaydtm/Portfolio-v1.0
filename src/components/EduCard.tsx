interface EduCard {
  institution: string;
  major: string;
  instagram: string;
  delay: number;
}

const EduCard: React.FC<EduCard> = ({
  institution,
  major,
  instagram,
  delay,
}) => {
  return (
    <a
      data-aos="fade-left"
      data-aos-duration="700"
      data-aos-delay={1000 + delay * 200}
      data-aos-once="true"
      href={instagram}
      target="_blank"
      className="border block p-2 text-white w-full max-w-md bg-transparent rounded-2xl shadow-lg lg:ml-auto hover:bg-white hover:text-black group"
    >
      <p className="text-gray-300 text-[11px] lg:text-end md:text-base group-hover:text-black">
        {institution}
      </p>
      <p className="font-semibold text-[12px] lg:text-end md:text-xl group-hover:text-black">
        {major}
      </p>
    </a>
  );
};

export default EduCard;
