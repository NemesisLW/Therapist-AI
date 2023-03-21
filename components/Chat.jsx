import { useState } from "react";
import Image from "next/image";
import send from "../public/sendmes.svg";
import attach from "../public/attach.svg";

const Chat = () => {
  // Input Messages and storing user and bot messages
  const [message, setMessage] = useState("");
  const [msgListOfuser, setmsgListOfuser] = useState([]);
  const [msgListOfBot, setmsgListOfBot] = useState([]);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    // setUpdated(message);
    // setmsgListOfuser(...msgListOfuser, updated);
    setmsgListOfuser((msgListOfuser) => [...msgListOfuser, message]);
    setMessage("");
    //oldArray => [...oldArray, newElement]
  };

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
  );
};

export default Chat;
