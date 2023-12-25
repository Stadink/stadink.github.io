import React, { useState, useEffect } from 'react';
import StatusCircle from './status/StatusCircle';
import Spinner from './spinner/Spinner';

export default function GPT({ words, question, hidden='', showResponse=true }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const [displayResponse, setDisplayResponse] = useState(showResponse);

  useEffect(() => {
    setDisplayResponse(showResponse);
  }, [showResponse]);

  const fetchResponse = async (input) => {
    // const evtSource = new EventSource(`http://127.0.0.1:5000/chat?prompt=${input}&timestamp=1234`); //  + hidden probably not good
    const evtSource = new EventSource(`https://server-e4273.web.app/chat?prompt=${input}&timestamp=1234`);
    evtSource.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.content !== undefined) 
        setResponse((prev) => prev + data.content);
        setLoading(false);
    });
    evtSource.addEventListener('close', () => {
      setLoading(false);
      evtSource.close();
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisplayResponse(true)
    setResponse("")
    setLoading(true);
    fetchResponse(prompt);
  };

  const askAgain = () => {
    setResponse((prev) => prev + ' ')
    fetchResponse(response);
  }

  useEffect(() => {
    const emotions = words.length > 0 ? words.map(str => {
      const splitWords = str.split(":");
      return splitWords.length > 1 ? splitWords[1].trim() : "";
    }) : ["___ "];
    setPrompt(`${question} ${emotions.join(", ")}`); // here was a question mark before `, I need to rethink the whole thing...
  }, [words, question]);

  return (
    <div>
      <form class="form-group" onSubmit={handleSubmit}>
        <StatusCircle />
        <textarea
          id="GPT"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button id="GPTsubmit" class="GPTsubmit" type="submit">🪄</button>
      </form>
      {loading && <Spinner />}
      {displayResponse && (
        <p id='GPTresponse'>{!loading && <span className='clickable' onClick={askAgain}>{response}</span>}</p>
      )}
    </div>
  );
}
