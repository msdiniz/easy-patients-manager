import React, { useState, useEffect } from 'react';

const LoadingMessage: React.FC = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + '.' : ''));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return <span>Fetching contacts{dots}</span>;
};

export default LoadingMessage;