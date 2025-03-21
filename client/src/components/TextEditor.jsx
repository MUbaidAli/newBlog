import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Embed from "@editorjs/embed";
import CodeTool from "@editorjs/code";

const TextEditor = ({ onSave }) => {
  const editorRef = useRef(null);
  const [editorData, setEditorData] = useState(null);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          list: List,
          image: ImageTool,
          embed: Embed,
          code: CodeTool,
        },
        placeholder: "Start writing your blog post...",
        autofocus: true,
        onReady: () => console.log("Editor.js is ready!"),
      });
    }
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  // Save content function
  const handleSave = async () => {
    if (editorRef.current) {
      const outputData = await editorRef.current.save();
      setEditorData(outputData);
      onSave(outputData); // Pass data to parent component
    }
  };

  // Clear editor
  const handleClear = () => {
    if (editorRef.current) {
      editorRef.current.clear();
      setEditorData(null);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <h2 className="text-lg font-bold mb-2">Write Your Blog Post</h2>
      <div id="editorjs" className="min-h-[300px] border rounded p-2"></div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default TextEditor;

// export default TextEditor;
// import React, { useEffect, useRef } from "react";
// import EditorJS from "@editorjs/editorjs";
// import Header from "@editorjs/header";
// import List from "@editorjs/list";
// import ImageTool from "@editorjs/image";
// import Embed from "@editorjs/embed";
// import CodeTool from "@editorjs/code";

// const TextEditor = () => {
//   const editorRef = useRef(null);

//   useEffect(() => {
//     if (!editorRef.current) {
//       editorRef.current = new EditorJS({
//         holder: "editorjs",
//         tools: {
//           header: Header,
//           list: List,
//           image: ImageTool,
//           embed: Embed,
//           code: CodeTool,
//         },
//         placeholder: "Start writing your blog post...",
//         autofocus: true,
//         onReady: () => {
//           console.log("Editor.js is ready!");
//         },
//       });
//     }

//     return () => {
//       if (editorRef.current?.destroy) {
//         editorRef.current.destroy();
//       }
//       editorRef.current = null; // Ensure cleanup
//     };
//   }, []);

//   return (
//     <div className="p-4 border rounded-lg bg-white shadow">
//       <h2 className="text-lg font-bold mb-2">Write Your Blog Post</h2>
//       <div id="editorjs" className="min-h-[300px] border rounded p-2"></div>
//     </div>
//   );
// };

// export default TextEditor;
