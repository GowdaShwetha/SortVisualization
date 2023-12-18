import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './Component/Home';
import BubbleSort from './Component/BubbleSort';
import InsertionSorts from './Component/InsertionSorts';
import SelectionSort from './Component/SelectionSort';
import { MergeSort } from './Component/MergeSort';
import QuickSort from './Component/QuickSort';
import NavBar from './Component/NavBar';


function App() {
  return (
      <>
      {/* <BubbleSortVisualizer/> */}
     <div class="background">
     <NavBar/>

     <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="bubble" element={<BubbleSort/>}></Route>
        <Route path="insertionsort" element={<InsertionSorts/>}></Route>
        <Route path="selectionsort" element={<SelectionSort/>}></Route>
        <Route path="mergesort" element={<MergeSort/>}></Route>
        <Route path="quicksort" element={<QuickSort/>}></Route>
      </Routes>
     </div>
     
    
      </>
  );
}

export default App;
