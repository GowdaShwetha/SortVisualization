import React, { useEffect} from 'react'
import BubbleSort from './BubbleSort'
import NavBar from './NavBar'
import "../css/home.css"
import Typed from 'typed.js'
import BubbleSortVisualizer from './BubbleSortVisualizer'

function Home(){
  // useEffect(() => {
  //   const typed = new Typed('.auto-input', {
  //     strings: ["Are you ready for an algorithmic adventure?"],
  //     typeSpeed: 100,
  //     backSpeed: 100,
  //     loop: true
  //   });

    // Clean up the Typed instance when the component unmounts
  //   return () => {
  //     typed.destroy();
  //   };
  // }, []);
    return (
      <>
      <div style={{display:'flex'}}>
      <div class='home'>
      <h1 style={{marginTop:'20%'}}> Algorithm Sort </h1>
      <h1 style={{marginLeft:'5%'}}> Visualization</h1>
      <h1>Bringing algorithms to life in a single glance.</h1>
      {/* <h2> we'll sort through the complexities , just like a well-optimized sorting algorithm organizes data.</h2> */}
      </div>
      <div class='image'>
      <img src="https://i.pinimg.com/originals/df/39/2f/df392fb90619818047bf4f09e0adbc36.gif" style={{width:'70%',height:'100%',borderRadius:'100%',marginTop:'5%'}}/>
      </div>
      </div>
      </>
    ) 
  }
  

export default Home
