import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Navbar() {

  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="logo">
          <svg width="42" height="41" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill="#F1F1F1" />
            <path d="M19.5 0V9M19.5 9L29.2794 15M19.5 9L10.75 15M29.2794 15V26M29.2794 15L37 10M29.2794 26L19.5 31M29.2794 26L35.9706 31.5M19.5 31V40M19.5 31L10.75 26M10.75 26V15M10.75 26L3.5 31M10.75 15L2.51471 10" stroke="black" />
            <path d="M26.5 20L25 8H41L39.5 20L35.5 27V33.5L40 40H26.5L31 33.5V30.5V27L26.5 20Z" fill="#EBDB4F" stroke="black" />
          </svg>
          <h1>Estadisticas Liga</h1>
        </div>
        <ul className={`links ${isNavbarVisible ? 'active' : ''}`}>
          <li><Link to={'/'} className="link">Inicio</Link></li>
          <li><Link to={'/saved'} className="link">Ligas guardadas</Link></li>
        </ul>
        <svg className="menu" onClick={() => setIsNavbarVisible(prev => !prev)} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="m11 16.745c0-.414.336-.75.75-.75h9.5c.414 0 .75.336.75.75s-.336.75-.75.75h-9.5c-.414 0-.75-.336-.75-.75zm-9-5c0-.414.336-.75.75-.75h18.5c.414 0 .75.336.75.75s-.336.75-.75.75h-18.5c-.414 0-.75-.336-.75-.75zm4-5c0-.414.336-.75.75-.75h14.5c.414 0 .75.336.75.75s-.336.75-.75.75h-14.5c-.414 0-.75-.336-.75-.75z" fillRule="nonzero"/>
        </svg>
      </div>
    </nav>
  )
}

export default Navbar