import { useState, useEffect } from "react";
import Image from "next/image";
import send from "../public/sendmes.svg";
import attach from "../public/attach.svg";
import { Player } from "@lottiefiles/react-lottie-player";

const Chat = () => {
  // Input Messages and storing user and bot Chat messages
  const [message, setMessage] = useState("");
  const [botMessage, setBotMessage] = useState("");
  const [msgListOfuser, setmsgListOfuser] = useState([]);
  const [msgListOfBot, setmsgListOfBot] = useState(["hello"]);

  // Bot API call
  const [isBotGenerating, setIsBotGenerating] = useState(false);

  // Calling Fine-tuned AI model API
  const callGenerateEndpoint = async () => {
    setIsBotGenerating(true);
    console.log("Calling OpenAI...");

    const response = await fetch("/api/chatbotgenerate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied....", output.text);

    setBotMessage(`${output.text}`);
    setIsBotGenerating(false);
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setmsgListOfuser((msgListOfuser) => [...msgListOfuser, message]);
    setMessage("");

    // Generating Bot Reply
    callGenerateEndpoint();
    setmsgListOfBot((msgListOfBot) => [...msgListOfBot, botMessage]);
    // setBotMessage("");
  };

  const loadingScreen = () => (
    <div>
      <Player
        autoplay
        loop
        src="https://assets2.lottiefiles.com/private_files/lf30_ykdoon9j.json"
        style={{ height: "15px", width: "30px", transform: "scale(6)" }}
      ></Player>
    </div>
  );

  return (
    <div className="chatui">
      <div className="chat">
        <div className="newchat">
          <p className="up">That friend</p>
          <p className="down">
            Here to listen, here to help - a friend who is always there for you
          </p>
        </div>

        {/* user msgs goes here */}

        <div className="mainchat">
          <div className="mainchatin">
            <div className="chatbox">
              {msgListOfuser.map((eachMsg, index) => {
                return (
                  <div key={index}>
                    <div className="message my_msg">
                      <p>{eachMsg}</p>
                    </div>
                    <div className="message friend_msg">
                      {isBotGenerating ? (
                        <p>{loadingScreen()}</p>
                      ) : (
                        <p>{msgListOfBot[index]}</p>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Bot msgs goes here */}

              {/* {msgListOfBot.map((eachMsg, index) => {
                return (
                  <div key={index} className="message friend_msg">
                    {isBotGenerating ? (
                      <p>{loadingScreen()}</p>
                    ) : (
                      <p>{eachMsg}</p>
                    )}
                  </div>
                );
              })} */}
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
  );
};

export default Chat;
