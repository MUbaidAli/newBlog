import CategoryCard from "./CategoryCard";

function SinglePost() {
  return (
    <>
      <div className="div">
        <img src="./src/assets/image13.png" alt="" className="w-full" />
      </div>

      <div className=" mx-auto max-w-7xl py-20 px-10">
        <div className="blog-text">
          <h1 className="mb-4 text-center text-gray-900 dark:text-white  text-5xl sm:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF4242] to-[#99286C]">
            How to Improve Sleep Naturally
          </h1>
          <p className="text-white md:w-full md:text-3xl my-10">
            Do you struggle with falling asleep or staying asleep? You’re not
            alone! Many people face sleep issues that affect their energy
            levels, mood, and overall health. The good news is that you don’t
            need to rely on sleeping pills. There are natural ways to improve
            your sleep and wake up feeling refreshed. Let’s explore the best
            tips for getting deep, restful sleep—naturally!
          </p>
          <p className="text-white md:w-full md:text-3xl my-10">
            Do you struggle with falling asleep or staying asleep? You’re not
            alone! Many people face sleep issues that affect their energy
            levels, mood, and overall health. The good news is that you don’t
            need to rely on sleeping pills. There are natural ways to improve
            your sleep and wake up feeling refreshed. Let’s explore the best
            tips for getting deep, restful sleep—naturally!
          </p>

          <h1 className="my-10 text-center text-gray-900 dark:text-white  text-5xl sm:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF4242] to-[#99286C]">
            Tips
          </h1>

          <img src="./src/assets/tips.png" alt="" />
          {/* <ul>
            <li>
              Even on weekends, try to maintain your regular sleep schedule!
            </li>
            <li>
              Even on weekends, try to maintain your regular sleep schedule!
            </li>
            <li>
              Even on weekends, try to maintain your regular sleep schedule!
            </li>
            <li>
              Even on weekends, try to maintain your regular sleep schedule!
            </li>
          </ul> */}
        </div>
        <div className="creater-section flex my-10 justify-center md:justify-between items-center flex-wrap">
          <CategoryCard heading={"Author"} text={"Jhon Doe"} />
          <CategoryCard heading={"Author"} text={"Jhon Doe"} />
          <CategoryCard heading={"Author"} text={"Jhon Doe"} />
        </div>
      </div>
    </>
  );
}

export default SinglePost;
