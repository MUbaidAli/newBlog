function DashboardCards() {
  return (
    <>
      <section className="text-gray-700 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 text-center text-white">
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="dash custom-border flex  items-center justify-between flex-wrap border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                <h2 className="title-font font-medium text-3xl text-white">
                  2.7K
                </h2>
                <p className="leading-relaxed">Downloads</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="dash custom-border flex  items-center justify-between flex-wrap border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                <h2 className="title-font font-medium text-3xl text-white">
                  1.3K
                </h2>
                <p className="leading-relaxed">Users</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="dash custom-border flex  items-center justify-between flex-wrap border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                <h2 className="title-font font-medium text-3xl text-white">
                  74
                </h2>
                <p className="leading-relaxed">Files</p>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="dash custom-border flex  items-center justify-between flex-wrap border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                <h2 className="title-font font-medium text-3xl text-white">
                  46
                </h2>
                <p className="leading-relaxed">Places</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default DashboardCards;
