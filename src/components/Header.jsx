import React from 'react'
import "./Header.css"
import {Link} from "react-router-dom"
import { FaEthereum } from "react-icons/fa";
import { PiRabbit } from "react-icons/pi";
import { GiRabbitHead } from "react-icons/gi";


const Header = () => {
  return (
    <div className='navbar'>
    <div className='logo'>
      <h1>CryptoBoss</h1>
      {/* <FaEthereum color='orange' size={30}/> */}
      {/* <PiRabbit color='yellow' size={30} /> */}
      <GiRabbitHead color='yellow' size={30} />
    </div>
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/coins'>Coins</Link></li>
    </ul>
    
    </div>
  )
}

export default Header