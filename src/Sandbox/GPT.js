import React, { useState, useEffect } from 'react';
import axios from "axios";
import StatusCircle from './status/StatusCircle';
import Spinner from './spinner/Spinner';

export default function GPT({ words, question }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchResponse = async (input) => {
    setLoading(true);

    try {
      const res = await axios.post("https://server-e4273.web.app/chat", { prompt: input });
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchResponse(prompt);
  };

  const askAgain = () => {
    fetchResponse(response);
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
      <p>{!loading && <span className='clickable' onClick={askAgain}>{response}</span>}</p>
    </div>
  );
}
