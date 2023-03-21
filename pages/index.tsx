import { useState } from "react";
import Head from "next/head";
import Typewriter from "typewriter-effect";
import Redir from "../pages/api/chatroomLink";
import Image from "next/image";
import send from "../assets/sendmes.svg";
import attach from "../assets/attach.svg";

const Home = () => {
	// Perosonalized Data for better results
	// const [age, setAge] = useState("");
	// const [gender, setGender] = useState("");
	// const [address, setAddress] = useState("");

	// Base user input for API call
	const [ask, setAsk] = useState("");

	// API Call

	const [apiOutput, setApiOutput] = useState([]);
	const [isGenerating, setIsGenerating] = useState(false);
	const [render, setRender] = useState(false);

	//userMessages gonna saved here
	const [message, setMessage] = useState("");

	// const [updated, setUpdated] = useState(message);

	// Storing Chat messages
	const [msgListOfuser, setmsgListOfuser] = useState([]);
	const [msgListOfBot, setmsgListOfBot] = useState([]);

	const handleChange = (event) => {
		setMessage(event.target.value);
	};

	const handleClick = (e) => {
		// 👇 "message" stores input field value
		e.preventDefault();
		// setUpdated(message);
		console.log(message);
		// setmsgListOfuser(...msgListOfuser, updated);
		setmsgListOfuser((msgListOfuser) => [...msgListOfuser, message]);
		setMessage("");
		//oldArray => [...oldArray, newElement]
	};

	// callGenerateEndpoint - provides the API with user input and generate output.
	const callGenerateEndpoint = async () => {
		setIsGenerating(true);

		console.log("Calling OpenAI...");
		const response = await fetch("/api/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ask }),
		});

		const data = await response.json();
		const { output } = data;
		console.log("OpenAI replied....");

		let solutions = JSON.parse(output);

		const fallbackresponse = await fetch("/api/fallbackgenerate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ask }),
		});

		setApiOutput(solutions);
		console.log(apiOutput);
		setRender(true);
		setIsGenerating(false);
	};

	const onUserChangeText = (event) => {
		setAsk(event.target.value);
	};

	return (
		<div className="root">
			<Head>
				<meta name="viewport" content="width=device-width initial-scale=1.0" />
				<title>
					Therapist.ai - Your mental health superhero, always by your side
				</title>
			</Head>
			<div className="bgr">
				<div className="bgrin">
					<div className="container">
						<div className="animation">
							<span className="first">Therapist</span>
							<span className="slide">
								<span className="second">AI</span>
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className="containerc">
				<div className="header-subtitle">
					<Typewriter
						options={{
							strings: [
								"Your mental health superhero, always by your side",
								"Are you feeling the blues?",
								"Therapist.ai got your back.",
							],
							autoStart: true,
							loop: true,
						}}
					/>

					<div className="prompt-container">
						<textarea
							placeholder="What's been troubling you? Let us help you feel better!"
							className="prompt-box"
							value={ask}
							onChange={onUserChangeText}
						/>
						<div className="prompt-buttons">
							<a
								className={
									isGenerating ? "generate-button loading" : "generate-button"
								}
								onClick={callGenerateEndpoint}
							>
								<div className="generate">
									{isGenerating ? <span className="loader"></span> : <p>Ask</p>}
								</div>
							</a>
						</div>
						{/* Output */}
						{render && (
							<div className="output">
								<div className="output-header-container">
									<div className="output-header">
										<h3>Probable Solutions</h3>
									</div>
								</div>
								<div className="output-content">
									{apiOutput.map((sol, index) => {
										return (
											<div key={index}>
												<h2>{sol.solution}</h2>
												<p>{sol.description}</p>
											</div>
										);
									})}
								</div>
							</div>
						)}
						{/* <Redir user={user} /> */}
					</div>
					<div className="badge-container grow">
						<a
							href="https://github.com/NemesisLW/Therapist-AI"
							target="_blank"
							rel="noreferrer"
						>
							<div className="badge">
								<p>Identity Crisis</p>
							</div>
						</a>
					</div>
				</div>

				<div className="chatui">
					<div className="chat">
						<div className="newchat">
							<p className="up">That friend</p>
							<p className="down">Active 1.58 PM,Sat, Mar 18,2023</p>
						</div>
						{/* <div className="mainchat">
							<div className="mainchatin">
								<div className="chatbox">
									<div className="message my_msg">
										<p>
											Hi <br />
											<span>12:18</span>
										</p>
									</div>
									<div className="message friend_msg">
										<p>
											Hey <br />
											<span>12:18</span>
										</p>
									</div>
									<div className="message my_msg">
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
											<br />
											<span>12:15</span>
										</p>
									</div>
									<div className="message friend_msg">
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
											<br />
											<span>12:15</span>
										</p>
									</div>
								</div>
							</div>
						</div> */}

						{/* user msgs goes here */}
						<div className="mainchat">
							<div className="mainchatin">
								<div className="chatbox">
									{msgListOfuser.map((eachMsg) => {
										return (
											<>
												<div className="message my_msg">
													<p>{eachMsg}</p>
												</div>
											</>
										);
									})}
								</div>
							</div>
						</div>

						{/* <form className="mainchatin"> */}
						{/* <div className="mainchat">
							<div className="mainchatin">
								<div className="chatbox">{}</div>
							</div>
						</div> */}
						<div className="sendout">
							<form className="sendin">
								<div className="mes">
									<input
										className="textmsg"
										type="text"
										id="message"
										name="message"
										onChange={handleChange}
										value={message}
									/>
								</div>
								<div className="file">
									<Image
										className="attach"
										src={attach}
										alt="Picture of the author"
										width="30px"
										height="30px"
									/>
								</div>
								<button
									className="send"
									type="submit"
									onClick={(e) => handleClick(e)}
								>
									<Image
										className="sendmsg"
										src={send}
										alt="Picture of the author"
										width="30px"
										height="30px"
									/>
								</button>
							</form>
						</div>
						{/* </form> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
