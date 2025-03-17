import SectionHeading from "./SectionHeading";

function Footer() {
  return (
    <>
      {/* <div className="overlay"></div> */}
      <footer className="footer">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <div className="flex justify-between items-center">
            <div className="footer-text w-100">
              <SectionHeading
                heading="Shiny Blogs"
                text="Your ultimate guide to a healthier, happier life! Explore expert tips on nutrition, fitness, mental well-being, and lifestyle habits that empower you to feel your best. Whether you're looking for healthy recipes, workout inspiration, stress management techniques, or simple wellness hacks, we've got you covered. Start your journey to a better you—one blog at a time!"
              />
            </div>
            <div className="link-section flex flex-col items-center">
              <div className="social-links">
                <i className="fa-brands fa-facebook-f m-2 text-white"></i>
                <i className="fa-brands fa-facebook-f m-2 text-white"></i>
                <i className="fa-brands fa-facebook-f m-2 text-white"></i>
                <i className="fa-brands fa-facebook-f m-2 text-white"></i>
                <i className="fa-brands fa-facebook-f m-2 text-white"></i>
              </div>
              <div className="subscription  flex flex-col">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your email"
                    className="relative w-80 p-3 text-white bg-transparent rounded-xl outline-none border-none 
                     focus:ring-2 focus:ring-transparent"
                  />
                  <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                    <div className="w-full h-full bg-transparent rounded-xl"></div>
                  </div>
                </div>

                <button>Subscribe</button>
              </div>
            </div>
            <div className="nav-link">
              <ul>
                <li>
                  <a href="">About Us</a>
                </li>
                <li>
                  <a href="">Contact Us</a>
                </li>
                <li>
                  <a href="">Blogs</a>
                </li>
                <li>
                  <a href="">Categories</a>
                </li>
                <li>
                  <a href="">Latest Posts</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <p>Blogs.com all rights reserved 2025</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
