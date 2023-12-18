import React, { useState, useEffect  } from 'react';
import '../css/BubbleSortVisualizer.css'; // Import CSS file for styling
import swapSound from "../switch-sound.mp3"
import NavBar from './NavBar';


export const MergeSort = () => {

  const swapAudio = new Audio(swapSound);
  const [array, setArray] = useState([]);

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const newArray = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
  };

  const mergeSort = async () => {
    const arrayCopy = [...array];
    const animations = [];
    await mergeSortHelper(arrayCopy, 0, arrayCopy.length - 1, animations);

    // Visualize the sorted array
    for (let i = 0; i < animations.length; i++) {
      const [index1, index2, merged] = animations[i];
      arrayCopy[index1] = merged;
      setArray([...arrayCopy]);
      await sleep(3000); // Add a delay to visualize the changes
    }
  };

  const mergeSortHelper = async (arr, start, end, animations) => {
    if (start < end) {
      const mid = Math.floor((start + end) / 2);

      // Sort the left and right halves
      await mergeSortHelper(arr, start, mid, animations);
      await mergeSortHelper(arr, mid + 1, end, animations);

      // Merge the sorted halves
      await merge(arr, start, mid, end, animations);
    }
  };

  const merge = async (arr, start, mid, end, animations) => {
    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);

    let i = 0;
    let j = 0;
    let k = start;

    while (i < left.length && j < right.length) {
      // Highlight the elements being compared
      await highlightElements(start + i, mid + 1 + j,'compare');
      await sleep(400);

      if (left[i] <= right[j]) {
        // Merge the elements
        animations.push([k, left[i]]);
        arr[k++] = left[i++];
      } else {
        // Merge the elements
        animations.push([k, right[j]]);
        arr[k++] = right[j++];
      }
    }
    swapAudio.play();

    // Merge the remaining elements
    while (i < left.length) {
      // Highlight the remaining elements
      await highlightElements(start + i, start + i, 'highlight');
      await sleep(1000);
      // Merge the elements
      animations.push([k, left[i]]);
      arr[k++] = left[i++];
      await sleep(1000);
    }
    swapAudio.play();


    while (j < right.length) {
      // Highlight the remaining elements
      await highlightElements(mid + 1 + j, mid + 1 + j);
      // Merge the elements
      animations.push([k, right[j]]);
      arr[k++] = right[j++];
    }
    swapAudio.play();

  };

  const highlightElements = (index1, index2) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const elements = document.querySelectorAll('.array-bar');
        elements[index1].classList = 'array-bar highlight';
        elements[index2].classList = 'array-bar compare';
        resolve();
      }, 1000);
    });
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  return (
    <div className='sort'>
    <h1>Merge Sort </h1>
    <p style={{color:'white'}}>Merge sort is defined as a sorting algorithm that works by dividing an array into smaller subarrays, sorting each subarray, 
    and then merging the sorted subarrays back together to form the final sorted array.</p>
    <h2 style={{color:'#A167A5',padding:'1%'}}>Algorithm of Merge Sort</h2>
    <p style={{color:'#B131FA',padding:'1%',fontSize:'1rem'}}>In Merge Sort algorithm, </p>
    <ul>
      <li>In simple terms, we can say that the process of merge sort is to divide the array into two halves, sort each half, and then merge the sorted halves back together. 
        This process is repeated until the entire array is sorted.</li>
      <li>Merge sort is a recursive algorithm that continuously splits the array in half until it cannot be further divided i.e., the array has only one element left (an array with one element is always sorted).
      Then the sorted subarrays are merged into one sorted array.
      </li>
   
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
    <button onClick={mergeSort} className='sort-btn'>Merge Sort</button>
  </div>
  )
}
