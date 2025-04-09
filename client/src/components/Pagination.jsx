import { Link } from "react-router-dom";

function Pagination({ pages, handlePageChange, page }) {
  return (
    <>
      <div className="flex justify-center">
        <nav className="bg-gray-200 rounded-full px-4 py-2">
          <ul className="flex text-gray-600 gap-4 font-medium py-2">
            {Array.from({ length: pages }, (_, i) => (
              <li
                key={i}
                // className={`px-3 py-1 border rounded ${
                //   page === i + 1 ? "bg-blue-500 text-white" : ""
                // }`}
                onClick={() => handlePageChange(i + 1)}
              >
                <Link
                  className={`rounded-full px-4 py-2 hover:bg-white hover:text-gray-600 transition duration-300 ease-in-out ${
                    page === i + 1
                      ? "rounded-full px-4 py-2 bg-white text-gray-600"
                      : ""
                  }`}
                >
                  {i + 1}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Pagination;
