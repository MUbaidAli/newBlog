function DashboardCards({ summary }) {
  return (
    <>
      <section className="text-gray-700 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-between items-center -m-4 text-center text-white">
            {/* Card 1 */}
            <div className="p-4 xl:w-1/3  lg:w-1/2 w-1/1">
              <div className=" dash custom-border flex items-center justify-between flex-wrap border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                <p className="leading-relaxed">Published Posts</p>
                <h2 className=" title-font font-medium text-3xl text-white">
                  {summary.publishedCount}
                </h2>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-4 xl:w-1/3 lg:w-1/2 w-1/1">
              <div className="dash custom-border flex items-center justify-between flex-wrap border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                <p className="leading-relaxed">Draft Posts</p>
                <h2 className="title-font font-medium text-3xl text-white">
                  {summary.draftCount}
                </h2>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-4 xl:w-1/3  lg:w-1/1 w-1/1">
              <div className="dash custom-border flex items-center justify-between border-2 flex-wrap border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                <p className="leading-relaxed">Today Views</p>
                <h2 className="title-font font-medium text-3xl text-white">
                  {summary.todayViews}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DashboardCards;
