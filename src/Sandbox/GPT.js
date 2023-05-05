import React, { useState, useEffect } from 'react';
import axios from "axios";
import StatusCircle from './status/StatusCircle';
import Spinner from './spinner/Spinner';
import db from './firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';


export default function GPT({ words }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Send a request to the server with the prompt
    axios
      .post("https://server-e4273.web.app/chat", { prompt })
      .then((res) => {
        // Update the response state with the server's response
        let reply = res.data
        setResponse(reply);
        console.log(reply);
        setLoading(false);
        saveReply(reply)
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const saveReply = async (reply) => {
    const docRef = doc(db, 'GPT', 'log');
    const timestamp = new Date().toLocaleString();
    const unixTime = Math.floor(new Date().getTime() / 1000);

    const payload = {
      [`${prompt} (${unixTime})`]: {
        info: reply,
        time: timestamp
      }
    };
    await updateDoc(docRef, payload);
  }
  

  useEffect(() => {
    const emotions = words.length > 0 ? words.map(str => {
      const splitWords = str.split(":");
      return splitWords.length > 1 ? splitWords[1].trim() : "";
    }) : ["___ "];
    setPrompt(`what is ${emotions.join(", ")}?`);
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
