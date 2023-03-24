// @ts-nocheck
import { useState } from "react";
import Head from "next/head";
import Typewriter from "typewriter-effect";
import Redir from "../pages/api/chatroomLink";
import Chat from "../components/Chat";

const Home = () => {
	// Perosonalized Data for better results
	// const [age, setAge] = useState("");
	// const [gender, setGender] = useState("");
	// const [address, setAddress] = useState("");

	// Base user input for API call
	const [ask, setAsk] = useState("");

	// API Call
	const [apiOutput, setApiOutput] = useState([]);
	const [fallbackOutput, setfallbackOutput] = useState("");
	const [isGenerating, setIsGenerating] = useState(false);
	const [render, setRender] = useState(false);

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

		try {
			// parsing the JSON formatted output of "solutions" and "description"
			let solutions = JSON.parse(output);
			setApiOutput(solutions);
		} catch (error) {
			// Fallback Text Output Generate Endpoint

			const fallbackresponse = await fetch("/api/fallbackgenerate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ask }),
			});

			const fallbackdata = await fallbackresponse.json();
			const { output } = fallbackdata;
			setfallbackOutput(output);
		}

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
									<p>{fallbackOutput}</p>
								</div>
							</div>
						)}
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
				{/* ChatBot Component */}
				{render && <Chat />}
				{render && <Redir />} 

				<Redir />
			</div>
		</div>
	);
};

export default Home;
