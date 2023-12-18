import React, { useState, useEffect  } from 'react';
import '../css/BubbleSortVisualizer.css'; // Import CSS file for styling
import swapSound from "../switch-sound.mp3"
import NavBar from './NavBar';

const SelectionSort = () => {
  const [array, setArray] = useState([]);
  const swapAudio = new Audio(swapSound);


  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const newArray = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
  };

  const selectionSort = async () => {
    const arrayCopy = [...array];
    const n = arrayCopy.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      // Highlight the current minimum element
      await highlightElements(minIndex, 'highlight');

      for (let j = i + 1; j < n; j++) {
        // Highlight the elements being compared
        await highlightElements(j, 'compare');
        await sleep(1000);


        if (arrayCopy[j] < arrayCopy[minIndex]) {
          minIndex = j;
        }

        // Remove the highlight after comparison
        await highlightElements(j, '');
      }

      // Swap the found minimum element with the first element
      const temp = arrayCopy[i];
      arrayCopy[i] = arrayCopy[minIndex];
      arrayCopy[minIndex] = temp;
      
      swapAudio.play();
      // Update the array state
      setArray([...arrayCopy]);
      await sleep(300); // Add a delay to visualize the changes
    }
  };

  const highlightElements = (index, className) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const elements = document.querySelectorAll('.array-bar');
        elements[index].classList = `array-bar ${className}`;
        resolve();
      }, 100);
    });
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  return (
    <div className='sort'>
    <h1>Selection Sort </h1>
    <p style={{color:'white'}}>Selection sort is a simple and efficient sorting algorithm that works by repeatedly selecting the smallest (or largest) element from the unsorted portion of the list and moving it to the sorted portion of the list. </p>
    <h2 style={{color:'#A167A5',padding:'1%'}}>Algorithm of Selection Sort</h2>
    <p style={{color:'#B131FA',padding:'1%',fontSize:'1rem'}}>In Selection Sort algorithm, </p>
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
    <button onClick={selectionSort} className='sort-btn'>Selection Sort</button>
  </div>
  )
}
export default SelectionSort
