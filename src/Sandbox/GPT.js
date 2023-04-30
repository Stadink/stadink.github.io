import React, { useState, useEffect } from 'react';
import axios from "axios";
import StatusCircle from './status/StatusCircle';

export default function GPT() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState('unknown');

  const url = 'http://localhost:8080/status';

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a request to the server with the prompt
    axios
      .post("http://localhost:8080/chat", { prompt })
      .then((res) => {
        // Update the response state with the server's response
        setResponse(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // this is beautiful code... And I am peaceful.
  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onopen = () => {
      setStatus('online');
    };

    eventSource.onerror = () => {
      setStatus('offline');
    };

    eventSource.addEventListener('status', event => {
        const data = JSON.parse(event.data);
        setStatus(data.status);
    });

    return () => {
      eventSource.close();
    };
  }, [url]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <StatusCircle status={status}/>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{response}</p>
    </div>
  );
}