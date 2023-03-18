import { useState } from "react";
import Head from "next/head";
import { Snackbar } from "@mui/material";

import { Helmet } from "react-helmet";
import Script from "next/script";

// const logo = require("logo.png");

const Home = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  const [ask, setAsk] = useState("");

  //API Call
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gender, age }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied....", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  const onUserChangeText = (event) => {
    setAsk(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>
          DocCompanion - Your mental health superhero, always by your side
        </title>
      </Head>
      <div className="bgr">
        <div className="bgrin">
          <div></div>

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
        <div className="header">
          <div className="header-subtitle">
            <div class="wrapper">
              <ul class="dynamic-txts">
                <li>
                  <span>
                    Your mental health superhero, always by your side.
                  </span>
                </li>
                <li>
                  <span>Are You feeling too depressed and hopeless?</span>
                </li>
                <li>
                  <span>
                    There is Our THERAPIST.Ai to support and help You.
                  </span>
                </li>
              </ul>
            </div>
            <div className="prompt-container">
              <textarea
                placeholder="What's been troubling you? Let us help you feel better!"
                className="prompt-box"
                value={age}
                onChange={onUserChangeText}
              />

              <textarea
                placeholder="Anything you want the song to be about..."
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
                    {isGenerating ? (
                      <span className="loader"></span>
                    ) : (
                      <p>Ask</p>
                    )}
                  </div>
                </a>
              </div>
              {/* Output */}
              {apiOutput && (
                <div className="output">
                  <div className="output-header-container">
                    <div className="output-header">
                      <h3>Output</h3>
                    </div>
                  </div>
                  <div className="output-content">
                    <p>{apiOutput}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="badge-container grow">
            <a
              href="https://twitter.com/Arghyad18"
              target="_blank"
              rel="noreferrer"
            >
              <div className="badge">
                <p>Identity Crisis</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
