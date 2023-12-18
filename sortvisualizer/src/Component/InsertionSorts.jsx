import React, { useState, useEffect  } from 'react';
import '../css/BubbleSortVisualizer.css'; // Import CSS file for styling
import swapSound from "../switch-sound.mp3"
import Home from "./Home"

const InsertionSorts = () => {
    const [array, setArray] = useState([]);
    const swapAudio = new Audio(swapSound);

    useEffect(() => {
      generateArray();
    }, []);
  
    const generateArray = () => {
      const newArray = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 1);
      setArray(newArray);
    };
  
    const insertionSort = async () => {
      const arrayCopy = [...array];
      const n = arrayCopy.length;
  
      for (let i = 1; i < n; i++) {
        const key = arrayCopy[i];
        let j = i - 1;
  
        // Highlight the key element
        await highlightElements(i, 'highlight');
  
        while (j >= 0 && arrayCopy[j] > key) {
          // Move elements to the right
          await highlightElements(j, 'compare');
          arrayCopy[j + 1] = arrayCopy[j];
  
          swapAudio.play();
          // Update the array state
          setArray([...arrayCopy]);
          await sleep(1000); // Add a delay to visualize the changes
  
          j = j - 1;
        }
  
        arrayCopy[j + 1] = key;
  
        // Update the array state
        setArray([...arrayCopy]);
        await highlightElements(i, '');
        await sleep(1000); // Add a delay to visualize the changes
      }
    };
  
    const highlightElements = (index, className) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const elements = document.querySelectorAll('.array-bar');
          elements[index].classList = `array-bar ${className}`;
          resolve();
        }, 1000);
      });
    };
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    
    <div className='sort'>
      <h1>Insertion Sort </h1>
      <p style={{color:'white'}}>Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part.
       Values from the unsorted part are picked and placed at the correct position in the sorted part.</p>
      <h2 style={{color:'#A167A5',padding:'1%'}}>Algorithm of Insertion Sort</h2>
      <p style={{color:'#B131FA',padding:'1%',fontSize:'1rem'}}>In Insertion Sort algorithm, </p>
      <ul>
        <li>To sort an array of size N in ascending order iterate over the array and compare the current element (key) to its predecessor</li>
        <li>If the key element is smaller than its predecessor, compare it to the elements before. Move the greater elements one position up to make space for the swapped element.</li>

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
      <button onClick={insertionSort} className='sort-btn'>Insertion Sort</button>
    </div>
  );
};

export default InsertionSorts;

