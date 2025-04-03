import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";

function SingleCategory() {
  const { id } = useParams();

  const [searchParams] = useSearchParams();
  console.log(searchParams);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchCategoryBlogs() {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:8484/api/blogs/category/${id}`
        );
        setData(res.data.message || res.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategoryBlogs();
  }, []);

  return (
    <>
      <Navbar />

      <h1>Category Page</h1>
      <p>{JSON.stringify(data)}</p>
    </>
  );
}

export default SingleCategory;
