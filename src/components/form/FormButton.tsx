import { FaAngleRight } from "react-icons/fa";

export const FormButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      type="submit"
      className="btn-spl-primary w-full text-white hover:shadow-lg rounded-lg mt-8 py-3 md:mt-11 btn-ca bg-gradient-to-r from-black to-[#6F6F6F] flex items-center justify-center"
    >
      <span className="text-2xl font-semibold tracking-[0.25em]">{children}</span>
      <span className="forward-arr">
        {" "}
        <FaAngleRight className="ca-forward-arr text-2xl mt-[2px]" />
      </span>
    </button>
  );
};
