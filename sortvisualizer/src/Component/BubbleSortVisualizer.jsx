import React, { useState, useEffect  } from 'react';
import '../css/BubbleSortVisualizer.css'; // Import CSS file for styling



const BubbleSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [compareIndices, setCompareIndices] = useState([]);
  // const swapAudio = new Audio(swapSound);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
  };

  const bubbleSort = async () => {
    const arrayCopy = [...array];
    const n = arrayCopy.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Highlight the elements being compared
        setCompareIndices([j, j + 1]);
        await sleep(100);

        if (arrayCopy[j] > arrayCopy[j + 1]) {
          // Swap elements
          const temp = arrayCopy[j];
          arrayCopy[j] = arrayCopy[j + 1];
          arrayCopy[j + 1] = temp;

          // Play the swap sound
          // swapAudio.play();

          // Update the array state
          setArray([...arrayCopy]);
          await sleep(300); // Add a delay to visualize the changes
        }
      }
    }
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <div>
      <h2>Bubble Sort Visualization</h2>
      <div className="array-container">
        {array.map((value, index) => (
          <div
            key={index}
            className={`array-number ${compareIndices.includes(index) ? 'highlight' : ''}`}
          >
            {value}
          </div>
        ))}
      </div>
      <button onClick={generateArray}>Generate New Array</button>
      <button onClick={bubbleSort}>Sort (Bubble Sort)</button>
    </div>
  );
};

export default BubbleSortVisualizer;
