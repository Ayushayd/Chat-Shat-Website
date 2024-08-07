import React from "react";
import useGetConversations from "../hooks/useGetConversations";
import Conversation from "./conversation";
import { getRandomEmoji } from "../utils/emojis";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.length > 0 ? (
        conversations.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === conversations.length - 1}
          />
        ))
      ) : (
        <div>No conversations available</div>
      )}

      {loading && <span className="loading loading-spinner" />}
    </div>
  );
};

export default Conversations;
