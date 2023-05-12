import React, { useState, useEffect } from 'react';
import axios from "axios";
import StatusCircle from './status/StatusCircle';
import Spinner from './spinner/Spinner';


export default function GPT({ words, question }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Send a request to the server with the prompt
    axios
      .post("https://server-e4273.web.app/chat", { prompt })
      // .post("http://127.0.0.1:5000/chat", { prompt })
      .then((res) => {
        // Update the response state with the server's response
        let reply = res.data
        setResponse(reply);
        console.log(reply);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const askAgain = () => {
    setLoading(true);

    // Send a request to the server with the response
    axios
      .post("https://server-e4273.web.app/chat", { prompt: response })
      // .post("http://127.0.0.1:5000/chat", { prompt })
      .then((res) => {
        // Update the response state with the server's response
        let reply = res.data
        setResponse(reply);
        console.log(reply);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }
  
  useEffect(() => {
    const emotions = words.length > 0 ? words.map(str => {
      const splitWords = str.split(":");
      return splitWords.length > 1 ? splitWords[1].trim() : "";
    }) : ["___ "];
    setPrompt(`${question} ${emotions.join(", ")}?`);
  }, [words, question]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <StatusCircle />
        <input
          id="GPT"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {loading && <Spinner />}
      <p>{!loading && <span class='clickable' onClick={()=>{askAgain()}}>{response}</span>}</p>
    </div>
  );
}
