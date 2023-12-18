import React from 'react'
import {Link} from  'react-router-dom'
import "../css/nav.css"
import 'animate.css';
import logo from "../image/Logo.png"

const NavBar = () => {
  const link={
    color:'white',
    textDecoration:'none',
  }

  return (
    <>
    <header style={{display:'flex'}}>
      <img src={logo}/>
        <nav class="nav">
          <ul style={{display:'flex'}}>
            <li><Link to="/" style={link}>Home</Link></li>
            <li><Link to="bubble" style={link}>Bubble</Link></li>
            <li><Link to="insertionsort" style={link}>Insertion</Link></li>
            <li><Link to="selectionsort" style={link}>Selection</Link></li>
            <li><Link to="mergesort" style={link}>Merge</Link></li>
            <li><Link to="quicksort" style={link}>Quick</Link></li>
          </ul>
           
        </nav>
    </header>
    </>
  )
}

export default NavBar