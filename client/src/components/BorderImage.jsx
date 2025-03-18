function BorderImage({ src }) {
  return (
    <div className=" md:w-full  rounded-md img custom-border relative">
      <div className="flex justify-left w-full">
        <img src={`${src}`} className="w-full " />
      </div>
    </div>
  );
}

export default BorderImage;
