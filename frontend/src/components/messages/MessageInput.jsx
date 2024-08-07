// import React, { useState } from "react";
// import { BsSend } from "react-icons/bs";
// import useSendMessage from "../../hooks/useSendMessage";

// const MessageInput = () => {
//   const [message, setMessage] = useState("");
//   const { loading, sendMessage } = useSendMessage();
//   const handleMessage = async (e) => {
//     e.preventDefault();
//     if (!message) return;

//     try {
//       await sendMessage(message);
//       setMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <form className="px-4 my-3" onSubmit={handleMessage}>
//       <div className="w-full relative">
//         <input
//           type="text"
//           className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white"
//           placeholder="Send a message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button
//           type="submit"
//           className="absolute inset-y-0 end-0 flex items-center pe-3"
//           disabled={loading}
//           aria-label="Send message"
//         >
//           {loading ? <div className="loading loading-spinner" /> : <BsSend />}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default MessageInput;

import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
import useGetMessages from "../../hooks/useGetMessages"; // Import useGetMessages hook

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();
  const { refetchMessages } = useGetMessages(); // Get the refetch function

  const handleMessage = async (e) => {
    e.preventDefault();
    if (!message) return;

    await sendMessage(message, refetchMessages); // Pass the refetch function
    setMessage("");
  };

  return (
    <form className="px-4 my-3" onSubmit={handleMessage}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? <div className="loading loading-spinner" /> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
