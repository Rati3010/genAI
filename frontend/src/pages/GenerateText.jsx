import axios from "axios";
import React, { useEffect, useState } from "react";

const GenerateText = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [message, setMessage] = useState([
    { title: "how are you", response: "I am fine" },
  ]);
  useEffect(() => {
    if (message) {
      setMessage((prevState) => [
        ...prevState,
        { title: input, response: response },
      ]);
    }
  }, [response]);
  const generateResult = () => {
    axios
      .post("http://localhost:8080/generate-text", {
        userInput: input,
      })
      .then((result) => {
        console.log(result);
        setResponse(result.data.chatbotReply);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="main">
      <div className="container">
        <div className="response">
          {message &&
            message.map((ele) => (
              <>
                <li>{ele.title}</li>
                <p>{ele.response}</p>
              </>
            ))}
        </div>
        <div className="input-button">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={generateResult}>GO</button>
        </div>
      </div>
    </div>
  );
};

export default GenerateText;
