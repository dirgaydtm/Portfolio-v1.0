import React, { useRef, useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { ArrowRight } from "lucide-react";
import { CircleX, CircleCheckBig } from "lucide-react";

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        "portfolio_dirga",
        "template_eqku4ab",
        form.current,
        "A3f_fYTFi_EfY71Us"
      )
      .then(() => {
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      });
  };

  return (
    <>
      {status === "error" && (
        <div
          role="alert"
          className="absolute flex items-center gap-2 mt-4 p-4 bg-red-500 text-white rounded"
        >
          <CircleX />
          <span>Error! Gagal mengirim pesan. Coba lagi ya.</span>
        </div>
      )}

      {status === "success" && (
        <div
          role="alert"
          className="absolute flex items-center gap-2 mt-4 p-4 border-l-4 border-green-600 bg-green-100 text-green-800 rounded"
        >
          <CircleCheckBig />
          <span>Pesan berhasil dikirim!</span>
        </div>
      )}

      <form
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-anchor-placement="center-bottom"
        data-aos-once="true"
        ref={form}
        onSubmit={sendEmail}
        className="flex flex-col gap-3"
      >
        <p className="text-white text-center text-xs">
          Have something to discuss? Send me a email and let's talk.
        </p>
        <input
          type="text"
          maxLength={50}
          name="user_name"
          title=""
          required
          placeholder="Your Name"
          className="border text-white rounded-lg text-sm p-2 w-full"
        />
        <input
          name="user_email"
          type="email"
          required
          title=""
          placeholder="Your Email"
          className="border text-white rounded-lg text-sm p-2 w-full"
        />
        <div className="relative size-full">
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={1500}
            title=""
            required
            placeholder="How can I help you?"
            className="border size-full text-white rounded-lg p-2 h-40 resize-none text-sm w-full"
          ></textarea>
          <p className="absolute text-xs top-2 right-2 text-white">
            {message.length}/1500
          </p>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-0 font-semibold text-white cursor-pointer border px-4 py-1 md:py-2 text-xs md:text-sm rounded-lg hover:bg-white hover:text-black hover:gap-2 transition-all duration-300 ease-in-out w-full md:w-auto"
        >
          SEND
          <ArrowRight />
        </button>
      </form>
    </>
  );
};

export default ContactForm;
