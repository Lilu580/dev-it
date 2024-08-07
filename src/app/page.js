"use client";

import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [inputValue, setInputValue] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    if (e.target.value > 100) {
      return setInputValue(100)
    }

    setInputValue(e.target.value);
  };

  const handleStart = async () => {
    setIsRunning(true);
    let activeRequests = 0;
    let completedRequests = 0;

    const sendRequest = async (index) => {
      try {
        const response = await axios.post('/api', { index });
        setResults((prevResults) => [...prevResults, response.data.index]);
      } catch (error) {
        console.error(error);
      } finally {
        activeRequests--;
        completedRequests++;
        if (completedRequests >= 1000) {
          setIsRunning(false);
        }
      }
    };

    const initiateRequest = () => {
      if (completedRequests + activeRequests < 1000) {
        activeRequests++;
        sendRequest(completedRequests + activeRequests);
        setTimeout(initiateRequest, 1000 / inputValue);
      }
    };

    initiateRequest();
  };

  return (
    <div>
      <input
        type="number"
        value={inputValue}
        onChange={handleChange}
        min="0"
        max="100"
        required
      />
      <button onClick={handleStart} disabled={isRunning}>Start</button>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;