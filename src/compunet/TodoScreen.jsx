import React, { useState, useEffect, useRef } from "react";

const TodoScreen = ({ onStart }) => {
  const [showFirst, setShowFirst] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!showFirst) return;

    const duration = 100;
    const startTime = performance.now();
    const startY = 0;
    const distance = window.innerHeight;

    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      setScrollProgress(progress);
      
      if (progress < 2) {
        requestAnimationFrame(animateScroll);
      } else {
        setShowFirst(false);
      }
    };

    requestAnimationFrame(animateScroll);
  }, [showFirst]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      {showFirst && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-[rgb(254,247,218)] z-50"
          style={{
            transform: `translateY(-${scrollProgress * 100}vh)`,
            transition: 'transform 2s ease-out'
          }}
        >
          <h1 className="text-4xl font-semibold text-gray-800 line-through">todo</h1>
        </div>
      )}
      <div 
        ref={containerRef}
        className={`h-full w-full flex flex-col items-center justify-center p-8 text-center ${
          showFirst ? "opacity-100" : "animate-fadeIn"
        }`}
        style={{
          transform: showFirst ? `translateY(${(1 - scrollProgress) * 50}px)` : 'translateY(0)',
          transition: 'transform 2s ease-out'
        }}
      >
        {/* Rest of your content */}
        <div className="flex mb-6">
          {['t', 'o', 'd', 'o'].map((letter, index) => (
            <h1 
              key={index}
              className="text-4xl font-semibold"
              style={{
                color: ['#c9e1f2', '#f6d0d5', '#d4edd1', '#cec6f3'][index]
              }}
            >
              {letter}
            </h1>
          ))}
        </div>

        <p className="text-gray-700 mb-2">
          Lorem ipsum dolor sit amet, consectetur sadipscing elit,
        </p>
        <p className="text-gray-700 mb-8">
          sed diam nonumy eirmod tempor invidunt ut labore et
        </p>

        <button 
          onClick={onStart}
          className="bg-[#5d594e] hover:bg-[#6d695e] text-white px-6 py-3 rounded-md mb-4 transition-colors"
        >
          Get Started
        </button>

        <div className="flex w-[20%] mr-[5%]">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWn6sHcYCVlRriHeVAYoXv5FQ3p9DwVtvoFA&s" 
            className="w-[40%] h-[100px]" 
            alt="" 
          />
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz4Jlfs09g1BKoqeGxuDLQARrHYA8cGjECUA&s" 
            className="w-[40%] h-[100px]" 
            alt="" 
          />
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvZJI7s-9LceUxieVXNZxhquudictce1md-A&s"  
            className="w-[40%] h-[100px]" 
            alt="" 
          />
        </div>

        <div className="bg-[rgb(254,247,218)] w-[30%] h-[100px]">
          <div className="flex justify-around mt-1">
            <a href="#" className="text-[#5d594e] line-through pr-[90px]">
              Download todo app   
            </a>
            <p className="pl-[40px] mr-[4%]">...</p>
          </div>
          <div className="mt-[10px]">
            <a href="#" className="text-[#5d594e] line-through mr-[55%] text-[11px]">
              the first step for better life
            </a>
          </div>

          <div className="flex items-center justify-center space-x-19">
            <div className="flex space-x-2 mr-[225px] mt-[10px]">
              <div className="w-5 h-5 rounded-full bg-[#c9e1f2]"></div>
              <div className="w-5 h-5 rounded-full bg-[#f6d0d5]"></div>
            </div>
            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-[7px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-5 text-green-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoScreen;