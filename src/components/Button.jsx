import React from "react";

function Button(props) {
  const { variant, text, iconLeft, iconRight, className, ...otherProps } =
    props;

  // FFE6C7, FF6000, 454545, FFA559
  const variants = {
    primary:
      "bg-[#FF6000] text-white py-4 px-8 rounded font-bold uppercase w-full lg:w-auto items-center ",
    secondary:
      "px-8 py-4 bg-[#454545] text-white font-bold rounded bg-transparent uppercase flex gap-3 justify-between items-center ",
    white:
      "bg-white text-[#FF6000] border-2 border-[#FF6000] py-4 px-8 rounded font-bold uppercase w-full lg:w-auto ",
    blue: "bg-blue-500 text-white py-4 px-8 flex gap-2 rounded font-bold uppercase w-full lg:w-auto items-center ",
  };
  let primary = variants[variant];

  return (
    <button {...otherProps} className={primary + className}>
      {iconLeft}
      {text}
      {iconRight}
    </button>
  );
}

export default Button;
