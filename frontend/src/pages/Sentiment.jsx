import React, { useEffect, useState } from "react";
import axios from "axios";

const Sentiment = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(0);
  useEffect(() => {
    axios
      .post(`http://localhost:8080/analyze-sentiment`, { text: text })
      .then((result) => {
        console.log(result);
        setResult(result.data.score);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [text]);
  return (
    <div className="sentiment">
      <h1>Text Sentiment Analysis</h1>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <p>Sentiment score is: {result}</p>
    </div>
  );
};

export default Sentiment;
