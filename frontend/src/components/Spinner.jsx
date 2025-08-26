import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Spinner = ({ path = 'login' }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => prevValue - 1);
    }, 1000);
    if (count === 0) navigate(`/${path}`);
    return () => clearInterval(interval);
  }, [count, navigate, path]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-100 via-white to-purple-50">
      <div className="text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-600 animate-pulse">
          Please Login or Register First
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          Redirecting you in{" "}
          <span className="text-purple-600 font-bold text-2xl animate-bounce">
            {count}
          </span>{" "}
          seconds...
        </p>
      </div>

      <div className="relative mt-10">
        <div className="w-20 h-20 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute top-2 left-2 w-16 h-16 rounded-full bg-purple-200 opacity-70 animate-ping"></div>
      </div>
    </div>
  );
};

export default Spinner;
