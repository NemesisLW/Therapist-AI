import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
// import "../styles.css";

const Redir = ({ user }) => {
  const router = useRouter();
  // const [users, setUsers] = useState({});
  // setUsers(user);
  function createUserOnChatroom({ username, secret, email }) {
    axios.put(
      "https://api.chatengine.io/users/",
      { username, secret, email },
      {
        headers: {
          "Private-key": `${process.env.NEXT_PUBLIC_PRIVATE_KEY}`,
        },
      }
    );
  }
  function addUserToChatGroup({ username }) {
    axios.post(
      "https://api.chatengine.io/chats/{{chat_id}}/people/",
      { username },
      {
        headers: {
          "Project-ID": `${process.env.NEXT_PUBLIC_PROJECT_ID}`,
          "User-Name": `${process.env.NEXT_PUBLIC_USER_NAME}`,
          "User-Secret": `${process.env.NEXT_PUBLIC_USER_SECRET}`,
        },
      }
    );
  }

  const handleSubmit = (user) => {
    // createUserOnChatroom(user);
    // addUserToChatGroup(user);
    () => {
      router.push("https://www.youtube.com/");
    };
  };

  return (
    <div className="prompt-buttons">
      <div onClick={() => handleSubmit(user)} className="generate">
        <h3>Join Groups</h3>
      </div>
    </div>
  );
};

export default Redir;
