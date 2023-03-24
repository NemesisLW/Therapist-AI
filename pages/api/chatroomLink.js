import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
// import "../styles.css";

const Redir = () => {
	const [user, setUser] = useState({
		username: "",
		email: "",
		secret: "",
	});
	// const [userName, setUserName] = useState("");
	// const [email, setEmail] = useState("");
	// const [secret, setSecret] = useState("");
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
			.then(() => router.push("https://chat-room-uditde.vercel.app/"));
	}

	const handleChange = (e) => {
		//handles the changes of each input
		const name = e.target.name;
		const value = e.target.value;
		setUser((values) => ({ ...values, [name]: value }));
	};

	const handleSubmit = (e) => {
		//handles the submission of user details
		e.preventDefault();
		console.log(user);
		createUserOnChatroom((user) => {
			addUserToChatGroup((chat) => console.log("success!", chat));
		});
	};

	const [joiningForm, setJoining] = useState(false);

	return (
		<div className="join">
			{/* <div onClick={(e) => handleSubmit(e)} className="generate">
				<h3>Join Groups</h3>
			</div> */}

			{!joiningForm ? (
				<div className="prompt-container" id="prompt-container-id">
					<div
						onClick={(e) => setJoining(true)}
						className="prompt-buttons"
						id="prompt-buttons-id"
					>
						<div className="generate" id="generateid">
							<div className="generate-button" id="join-to-our-community">
								Join to our community Groups
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="prompt-container">
					<form className="prompt-container">
						<input
							value={user.username || ""}
							onChange={handleChange}
							placeholder="username"
							type="text"
							name="username"
							className="prompt-box"
							required
						/>
						<input
							value={user.email || ""}
							onChange={handleChange}
							placeholder="Email address"
							type="email"
							name="email"
							className="prompt-box"
							required
						/>
						<input
							value={user.secret || ""}
							onChange={handleChange}
							placeholder="Password"
							type="password"
							name="secret"
							className="prompt-box"
							required
						/>
						<div
							type="submit"
							className="prompt-buttons"
							id="submit"
							onClick={(e) => handleSubmit(e)}
						>
							<div className="generate">Submit</div>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default Redir;
