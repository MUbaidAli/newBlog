import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SinglePost from "../components/SinglePost";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import CategoryCard from "../components/CategoryCard";
import Footer from "../components/Footer";
import HrLine from "../components/HrLine";
import Reviews from "./Reviews";

function SingleBlog() {
  const initData = {
    image: {
      imageUrl: "",
      imgName: "",
    },
    _id: "",
    title: "",
    content: "",
    category: "Mental Health",
    author: "admin",
    reviews: [],
    status: "Published",
    user: "",
    createdAt: "",
    updatedAt: "",
  };
  const [post, setPost] = useState(initData);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const parsedContent = post.content ? JSON.parse(post.content) : null;
  // console.log();
  useEffect(() => {
    setIsLoading(true);
    async function getData() {
      try {
        const res = await axios.get(`http://localhost:8484/api/blogs/${id}`);
        // console.log(res);
        console.log("API Response:", res.data);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      // weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",

      hour12: true,
    });
  }

  // console.log(id);

  // function renderEditorJsContent(content) {
  //   if (!content || !content.blocks) return <p>No content available</p>;

  //   return content.blocks.map((block, index) => {
  //     switch (block.type) {
  //       case "header":
  //         return React.createElement(
  //           `h${block.data.level}`,
  //           { key: index, className: "text-white text-2xl my-4 font-bold" },
  //           block.data.text
  //         );

  //       case "paragraph":
  //         return (
  //           <p key={index} className="text-white md:w-full md:text-3xl my-10">
  //             {block.data.text}
  //           </p>
  //         );

  //       case "image":
  //         return (
  //           <div key={index} className="my-6 flex justify-center">
  //             <img
  //               src={block.data.file?.url}
  //               alt={block.data.caption || "Blog Image"}
  //               className="w-full max-w-3xl rounded-md shadow-lg"
  //             />
  //             {block.data.caption && (
  //               <p className="text-gray-400 text-center text-sm mt-2">
  //                 {block.data.caption}
  //               </p>
  //             )}
  //           </div>
  //         );

  //       case "list":
  //         return block.data.style === "unordered" ? (
  //           <ul key={index} className="list-disc list-inside text-white my-4">
  //             {block.data.items.map((item, i) => (
  //               <li key={i} className="text-lg">
  //                 {item}
  //               </li>
  //             ))}
  //           </ul>
  //         ) : (
  //           <ol
  //             key={index}
  //             className="list-decimal list-inside text-white my-4"
  //           >
  //             {block.data.items.map((item, i) => (
  //               <li key={i} className="text-lg">
  //                 {item}
  //               </li>
  //             ))}
  //           </ol>
  //         );

  //       case "checklist":
  //         return (
  //           <ul key={index} className="text-white my-4">
  //             {block.data.items.map((item, i) => (
  //               <li key={i} className="flex items-center">
  //                 <input
  //                   type="checkbox"
  //                   checked={item.checked}
  //                   readOnly
  //                   className="mr-2"
  //                 />
  //                 {item.text}
  //               </li>
  //             ))}
  //           </ul>
  //         );

  //       case "code":
  //         return (
  //           <pre key={index} className="bg-gray-800 p-4 rounded-md my-4">
  //             <code className="text-green-400">{block.data.code}</code>
  //           </pre>
  //         );

  //       default:
  //         return (
  //           <p key={index} className="text-gray-400">
  //             Unsupported block
  //           </p>
  //         );
  //     }
  //   });
  // }
  function renderEditorJsContent(content) {
    if (!content || !content.blocks) return <p>No content available</p>;

    return content.blocks.map((block, index) => {
      switch (block.type) {
        case "header":
          return React.createElement(
            `h${block.data.level}`,
            {
              key: index,
              className: `"text-white mb-4 text-center text-gray-900 dark:text-white  text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF4242] to-[#99286C]"`,
            },
            block.data.text
          );

        case "paragraph":
          return (
            <p key={index} className="text-white md:w-full md:text-3xl my-10">
              {block.data.text}
            </p>
          );

        case "image":
          return (
            <div key={index} className="my-6 flex justify-center">
              <img
                src={block.data.file?.url}
                alt={block.data.caption || "Blog Image"}
                className="w-full max-w-3xl rounded-md shadow-lg"
              />
              {block.data.caption && (
                <p className="text-gray-400 text-center text-sm mt-2">
                  {block.data.caption}
                </p>
              )}
            </div>
          );

        case "list":
          return block.data.style === "unordered" ? (
            <ul key={index} className="list-disc list-inside text-white my-4">
              {block.data.items.map((item, i) => (
                <li key={i} className="text-lg">
                  {item.content}
                </li> // Fix: Use item.content
              ))}
            </ul>
          ) : (
            <ol
              key={index}
              className="list-decimal list-inside text-white my-4"
            >
              {block.data.items.map((item, i) => (
                <li key={i} className="text-lg">
                  {item.content}
                </li> // Fix: Use item.content
              ))}
            </ol>
          );

        case "checklist":
          return (
            <ul key={index} className="text-white my-4">
              {block.data.items.map((item, i) => (
                <li key={i} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    readOnly
                    className="mr-2"
                  />
                  {item.text}
                </li>
              ))}
            </ul>
          );

        case "code":
          return (
            <pre key={index} className="bg-gray-800 p-4 rounded-md my-4">
              <code className="text-green-400">{block.data.code}</code>
            </pre>
          );

        default:
          return (
            <p key={index} className="text-gray-400">
              Unsupported block
            </p>
          );
      }
    });
  }

  console.log(post.content);
  return (
    <>
      <div className="bg-[#111119]">
        <Navbar />
      </div>
      {isLoading && !post ? (
        <Loader />
      ) : (
        <>
          <div className="div w-full h-[100vh]">
            <img
              src={post.image.imageUrl}
              alt=""
              className="w-full object-cover h-[100vh] w-full"
            />
          </div>

          <div className=" mx-auto max-w-7xl py-20 px-10">
            <div className="blog-text">
              <div className="mx-auto max-w-7xl py-20 px-10"></div>

              <h1 className="mb-4 text-center text-gray-900 dark:text-white  text-5xl sm:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF4242] to-[#99286C]">
                {post.title}
              </h1>
              {/* content here */}
              {/* <div className="blog-text"> */}
              {renderEditorJsContent(parsedContent)}
              {/* {console.log(renderEditorJsContent(post.content))} */}
              {/* {console.log(typeof post.content)} */}
              {/* </div> */}
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
            {console.log(post)}
            <div className="creater-section flex my-10 justify-center md:justify-between items-center flex-wrap">
              <CategoryCard heading={"Author"} text={post.author} />
              <CategoryCard
                heading={"Published On"}
                text={formatDate(post.createdAt)}
              />
              <CategoryCard heading={"Category"} text={post.category} />
            </div>

            <p className="text-white">Login To Write Review</p>
            <Reviews />
          </div>

          <HrLine />
          <Footer />
        </>
      )}
    </>
  );
}

export default SingleBlog;
