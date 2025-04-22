import ContactForm from "../components/ContactForm";
import SplitText from "../components/SplitText";
import SocialMedia from "../components/SocialMedia";

const Contact = () => (
  <section
    id="Contact"
    className="relative  lg:h-screen lg:max-h-[1080px] flex h-180 items-center justify-center"
  >
    <SplitText
      text={`CONTACT`}
      className="absolute top-17 text-4xl font-bold text-white"
    />
    <div className="flex flex-col w-90 lg:w-180 gap-5">
      <SocialMedia />
      <div className="flex items-center gap-4">
        <div
          data-aos="fade-right"
          data-aos-duration="400"
          data-aos-delay="100"
          data-aos-once="true"
          className="flex-1 h-[1px] bg-white/50"
        ></div>
        <span
          data-aos="fade"
          data-aos-duration="700"
          data-aos-delay="200"
          data-aos-once="true"
          className="text-white/70 text-sm"
        >
          OR
        </span>
        <div
          data-aos="fade-left"
          data-aos-duration="400"
          data-aos-delay="100"
          data-aos-once="true"
          className="flex-1 h-[1px] bg-white/50"
        ></div>
      </div>
      <ContactForm />
    </div>
  </section>
);

export default Contact;
