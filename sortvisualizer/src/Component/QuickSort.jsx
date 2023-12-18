import React, { useState, useEffect } from 'react';
import '../css/BubbleSortVisualizer.css'; // Import CSS file for styling
import swapSound from "../switch-sound.mp3"
import NavBar from './NavBar';

const QuickSort = () => {
  const swapAudio = new Audio(swapSound);
  const [array, setArray] = useState([]);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const newArray = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
  };

  const quickSort = async () => {
    const arrayCopy = [...array];
    await quickSortHelper(arrayCopy, 0, arrayCopy.length - 1);
  };

  const quickSortHelper = async (arr, low, high) => {
    if (low < high) {
      const pivotIndex = await partition(arr, low, high);
      await quickSortHelper(arr, low, pivotIndex - 1);
      await quickSortHelper(arr, pivotIndex + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      // Highlight the elements being compared
      await highlightElements(j, high, 'compare');

      if (arr[j] < pivot) {
        i++;
        // Swap elements
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        swapAudio.play();
        // Update the array state
        setArray([...arr]);
        await sleep(1000); // Add a delay to visualize the changes
      }

      // Remove the highlight after comparison
      await highlightElements(j, high, '');
    }

    // Swap the pivot element to its correct position
    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    swapAudio.play();

    // Update the array state
    setArray([...arr]);
    await sleep(1000); // Add a delay to visualize the changes

    return i + 1;
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
    <h1>Quick Sort </h1>
    <p style={{color:'white'}}>QuickSort is a sorting algorithm based on the Divide and Conquer algorithm that picks an element as a pivot and partitions the given array around the picked pivot by placing the pivot in its correct position in the sorted array.</p>
    <h2 style={{color:'#A167A5',padding:'1%'}}>Algorithm of Quick Sort</h2>
    <p style={{color:'#B131FA',padding:'1%',fontSize:'1rem'}}>In Quick Sort algorithm, </p>
    <ul>
      <li>The key process in quickSort is a partition(). The target of partitions is to place the pivot (any element can be chosen to be a pivot) at its correct position in the sorted array and put all smaller elements to the left of the pivot, and all greater elements to the right of the pivot.</li>
      <li>Partition is done recursively on each side of the pivot after the pivot is placed in its correct position and this finally sorts the array.</li>
   
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
    <button onClick={quickSort} className='sort-btn'>Quick Sort</button>
  </div>
  );
};

export default QuickSort;
