function HrLine({ width }) {
  return (
    <hr
      className={`h-[${
        width + "px" || "3px"
      }] bg-gradient-to-r from-[#FF4242] to-[#99286C] border-0`}
    />
  );
}

export default HrLine;
