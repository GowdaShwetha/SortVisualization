import React, { useState, useEffect  } from 'react';
import '../css/BubbleSortVisualizer.css'; // Import CSS file for styling
import swapSound from "../switch-sound.mp3"
import Home from './Home'


const BubbleSort = () => {
  
  const [array, setArray] = useState([]);
  const swapAudio = new Audio(swapSound);


  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const newArray = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
  };

  const bubbleSort = async () => {
    const arrayCopy = [...array];
    const n = arrayCopy.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Highlight the elements being compared
        await highlightElements(j, j + 1, 'highlight');

        if (arrayCopy[j] > arrayCopy[j + 1]) {
          // Swap elements
          const temp = arrayCopy[j];
          arrayCopy[j] = arrayCopy[j + 1];
          arrayCopy[j + 1] = temp;

          swapAudio.play();

          // Update the array state
          setArray([...arrayCopy]);
          await sleep(1000); // Add a delay to visualize the changes
        }

        // Remove the highlight after comparison
        await highlightElements(j, j + 1, '');
      }
    }
  };

  const highlightElements = (index1, index2, className) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const elements = document.querySelectorAll('.array-bar');
        elements[index1].classList = `array-bar ${className}`;
        elements[index2].classList = `array-bar ${className}`;
       
  
        resolve();
      }, 1000);
    });
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    
    <div className='sort'>
      
      <h1>Bubble Sort </h1>
      <p style={{color:'white'}}>Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in the wrong order. 
        This algorithm is not suitable for large data sets as its average and worst-case time complexity is quite high.</p>
      <h2 style={{color:'#A167A5',padding:'1%'}}>Bubble Sort Algorithm</h2>
      <p style={{color:'#B131FA',padding:'1%',fontSize:'1rem'}}>In Bubble Sort algorithm, </p>
      <ul>
        <li>Traverse from left and compare adjacent elements and the higher one is placed at right side.In this way, the largest element is moved to the rightmost end at first.</li>
        <li>This process is then continued to find the second largest and place it and so on until the data is sorted.</li>
      </ul>

      <div className="array-container">
        {array.map((value, index) => (
          <div
            key={index}
            className="array-bar"
            // style={{ height: `${value}px` }}
          >
            {value}
          </div>
        ))}
      </div>
      <button onClick={generateArray} className='reset'>Reset</button>
      <button onClick={bubbleSort} className='sort-btn'>Bubble Sort</button>
    </div>
  );
};

export default BubbleSort;

