import { Link } from "react-router-dom";

function Button({ children, onClick, type, isLoading }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className=" rounded-md  w-full text-center btn bg-gradient-to-r from-[#A80F0F] to-[#2F7362] text-white font-bold py-3 px-9  my-1 inline-block"
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}

export default Button;
