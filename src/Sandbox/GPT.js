import React, { useState, useEffect } from 'react';
import axios from "axios";
import StatusCircle from './status/StatusCircle';
import Spinner from './spinner/Spinner';

export default function GPT( {words} ) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Send a request to the server with the prompt
    axios
      .post("http://localhost:8080/chat", { prompt })
      .then((res) => {
        // Update the response state with the server's response
        setResponse(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    let clean = JSON.stringify(words)
    
    setPrompt(`what is ${clean}?`);
  }, [words]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <StatusCircle />
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {loading && <Spinner />}
      <p>{!loading && response}</p>
    </div>
  );
}