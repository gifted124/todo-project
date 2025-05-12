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
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 line-through">todo</h1>
        </div>
      )}
      
      <div 
        ref={containerRef}
        className={`h-full w-full flex flex-col items-center justify-center p-4 md:p-8 text-center ${
          showFirst ? "opacity-100" : "animate-fadeIn"
        }`}
        style={{
          transform: showFirst ? `translateY(${(1 - scrollProgress) * 50}px)` : 'translateY(0)',
          transition: 'transform 2s ease-out'
        }}
      >
        {/* Colorful todo letters */}
        <div className="flex mb-4 md:mb-6">
          {['t', 'o', 'd', 'o'].map((letter, index) => (
            <h1 
              key={index}
              className="text-2xl md:text-4xl font-semibold"
              style={{
                color: ['#c9e1f2', '#f6d0d5', '#d4edd1', '#cec6f3'][index]
              }}
            >
              {letter}
            </h1>
          ))}
        </div>

        {/* Description text */}
        <p className="text-sm md:text-base text-gray-700 mb-2 px-2">
          Lorem ipsum dolor sit amet, consectetur sadipscing elit,
        </p>
        <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-8 px-2">
          sed diam nonumy eirmod tempor invidunt ut labore et
        </p>

        {/* Get Started button */}
        <button 
          onClick={onStart}
          className="bg-[#5d594e] hover:bg-[#6d695e] text-white px-4 py-2 md:px-6 md:py-3 rounded-md mb-4 transition-colors text-sm md:text-base"
        >
          Get Started
        </button>

        {/* Image row */}
        <div className="flex w-full md:w-[80%] lg:w-[60%] xl:w-[40%] justify-center gap-2 md:gap-4 mb-4">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWn6sHcYCVlRriHeVAYoXv5FQ3p9DwVtvoFA&s" 
            className="w-1/3 h-16 md:h-24 object-contain" 
            alt="" 
          />
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz4Jlfs09g1BKoqeGxuDLQARrHYA8cGjECUA&s" 
            className="w-1/3 h-16 md:h-24 object-contain" 
            alt="" 
          />
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvZJI7s-9LceUxieVXNZxhquudictce1md-A&s"  
            className="w-1/3 h-16 md:h-24 object-contain" 
            alt="" 
          />
        </div>

        {/* Todo card */}
        <div className="bg-[rgb(254,247,218)] w-full md:w-[80%] lg:w-[60%] xl:w-[40%] p-3 md:p-4 h-24 md:h-32">
          <div className="flex justify-between items-center">
            <a href="#" className="text-[#5d594e] line-through text-xs md:text-sm">
              Download todo app   
            </a>
            <p className="text-gray-500">...</p>
          </div>
          <div className="mt-1 md:mt-2">
            <a href="#" className="text-[#5d594e] line-through text-[10px] md:text-xs">
              the first step for better life
            </a>
          </div>

          <div className="flex items-center justify-between mt-2 md:mt-4">
            <div className="flex gap-1 md:gap-2">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#c9e1f2]"></div>
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#f6d0d5]"></div>
            </div>
            <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 md:h-4 md:w-4 text-green-600"
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