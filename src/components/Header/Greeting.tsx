import React from 'react';

interface GreetingProps {
  userName: string;
}

const Greeting: React.FC<GreetingProps> = ({ userName }) => {
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good morning';
    } else if (currentHour < 18) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  return <p>{getGreeting()}, {userName}</p>;
};

export default Greeting;