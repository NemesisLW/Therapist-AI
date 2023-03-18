import { useState } from "react";
import Head from "next/head";
import { Snackbar } from "@mui/material";
import Typewriter from "typewriter-effect";

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
      body: JSON.stringify({ ask }),
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
            {!apiOutput && (
              <div className="output">
                <div className="output-header-container">
                  <div className="output-header">
                    <h3>Output</h3>
                  </div>
                </div>
                <div className="output-content">
                  <p>{apiOutput}</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    pellentesque, ipsum sit amet blandit consequat, dolor urna
                    consequat neque, sed rhoncus lacus erat in ligula.
                    Pellentesque habitant morbi tristique senectus et netus et
                    malesuada fames ac turpis egestas. Nulla et posuere purus.
                    Ut nec elit ornare, imperdiet metus eu, fermentum orci.
                    Etiam nibh ligula, imperdiet non erat nec, suscipit aliquam
                    neque. Nulla ut luctus purus. Curabitur laoreet sed metus
                    sit amet pulvinar. Nunc venenatis neque et velit laoreet, id
                    lobortis nisl mollis. Curabitur eleifend ipsum gravida elit
                    dictum varius. Morbi vitae felis ultrices, interdum nisl
                    vel, auctor dui. Sed malesuada vel diam semper aliquam.
                    Aenean bibendum massa eu felis sollicitudin posuere. Ut
                    varius pretium quam sed vestibulum. Vestibulum ultricies ex
                    in eros scelerisque, ut dapibus nibh ornare. Morbi nisi
                    neque, feugiat vel imperdiet in, lobortis et orci. Maecenas
                    mattis pharetra auctor. Morbi nulla erat, consequat cursus
                    risus et, venenatis tempor felis. In lobortis, velit id
                    faucibus convallis, turpis magna rutrum nunc, interdum
                    volutpat erat sapien quis tortor. Integer molestie augue a
                    varius luctus. Proin lobortis neque nec odio maximus
                    bibendum. Nulla facilisi. Suspendisse vitae varius nisl.
                    Donec pellentesque, erat quis feugiat consectetur, metus
                    odio euismod dui, eget eleifend sem enim molestie lacus.
                    Phasellus sit amet neque eget odio pretium volutpat. Nulla
                    massa tortor, suscipit non consectetur vel, porta id turpis.
                    Cras sed mollis magna, a lacinia leo. Morbi vitae ante
                    ornare, placerat nisi a, porttitor nisl.
                  </p>
                </div>
              </div>
            )}
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
