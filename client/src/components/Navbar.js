import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <svg width="42" height="41" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="20" fill="#F1F1F1"/>
        <path d="M19.5 0V9M19.5 9L29.2794 15M19.5 9L10.75 15M29.2794 15V26M29.2794 15L37 10M29.2794 26L19.5 31M29.2794 26L35.9706 31.5M19.5 31V40M19.5 31L10.75 26M10.75 26V15M10.75 26L3.5 31M10.75 15L2.51471 10" stroke="black"/>
        <path d="M26.5 20L25 8H41L39.5 20L35.5 27V33.5L40 40H26.5L31 33.5V30.5V27L26.5 20Z" fill="#EBDB4F" stroke="black"/>
      </svg>
      <ul className="links">
        <li><Link to={'/'}>Inicio</Link></li>
        <li><Link to={'/saved'}>Ligas guardadas</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar