import React from 'react';
import './StatusCircle.css';

const StatusCircle = ({ status }) => {
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

  return (
    <div className={`status-circle ${circleClass}`}></div>
  );
};

export default StatusCircle;
