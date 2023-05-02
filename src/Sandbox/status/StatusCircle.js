import React, { useState, useEffect } from 'react';
import './StatusCircle.css';

const StatusCircle = () => {
  const [status, setStatus] = useState('unknown');
  const url = 'example.com/status';
//   const url = 'https://server-e4273.web.app/status';

  let circleClass = '';
  switch (status) {
    case 'online':
      circleClass = 'green';
      break;
    case 'warning':
      circleClass = 'yellow';
      break;
    case 'offline':
      circleClass = 'red';
      break;
    default:
      circleClass = 'gray';
  }

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
    <div className={`status-circle ${circleClass}`}></div>
  );
};

export default StatusCircle;
