interface Avatar {
  src: string;
}

const Avatar: React.FC<Avatar> = ({ src }) => {
  return (
    <div
      data-aos="fade-down"
      data-aos-duration="500"
      data-aos-easing="ease-out"
      data-aos-once="true"
      className="avatar group w-50 rounded-full overflow-hidden object-cover md:w-70 lg:w-100 relative"
    >
      <img
        src={src}
        alt="Profile-Photo"
        className=" object-cover transition-all duration-700 group-hover:scale-120 group-hover:rotate-1"
      />

      {/* Efek Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
        <div className="absolute  w-30 h-300 inset-50 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-1 translate-y-1 group-hover:translate-x-full group-hover:-translate-y-full transition-transform duration-1300 rotate-135" />
        <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
      </div>
    </div>
  );
};

export default Avatar;
