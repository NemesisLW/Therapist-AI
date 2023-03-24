import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
// import "../styles.css";

const Redir = () => {
	
	const user = {
		username: "udit",
		secret: "pass123",
		email: "uditde.com@gmail.com",
	};
	// const newMember = user.username;
	const router = useRouter();
	// const [users, setUsers] = useState({});
	// setUsers(user);
	function createUserOnChatroom(callback) {
		axios
			.put(
				"https://api.chatengine.io/users/",
				{ ...user },
				{
					headers: {
						"Private-key": `${process.env.NEXT_PUBLIC_PRIVATE_KEY}`,
					},
				}
			)
			.then((r) => callback(r.data));
	}
	function addUserToChatGroup(callback) {
		axios
			.post(
				"https://api.chatengine.io/chats/151900/people/",
				{ username: `${user.username}` },
				{
					headers: {
						"Project-ID": `${process.env.NEXT_PUBLIC_PROJECT_ID}`,
						"User-Name": `${process.env.NEXT_PUBLIC_USER_NAME}`,
						"User-Secret": `${process.env.NEXT_PUBLIC_USER_SECRET}`,
					},
				}
			)
			.then((r) => callback(r.data))
			.then(() => router.push("https://therapist-ai-chat-room.netlify.app/chats"));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		// createUserOnChatroom(user);
		// addUserToChatGroup(user);
		// () => {
		// 	router.push("https://www.youtube.com/");
		// };

  // createUserOnChatroom((user) => {
  // 	addUserToChatGroup((chat) => console.log("success!", chat));
  // });
  // router.push("https://www.youtube.com/");
  //   };

	return (
		<div className="prompt-buttons">
			<div onClick={(e) => handleSubmit(e)} className="generate">
				<h3>Join Groups</h3>
			</div>
		</div>
	);
};

export default Redir;
