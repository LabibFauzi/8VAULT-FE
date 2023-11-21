import React from 'react'
import './Copyright.css'
import logo from '../Asets/logo.png'
import { Link } from 'react-router-dom'
const Copyright = () => {
  return (
    <div className='nganu' id='footer'>
        <div className="atas">
            <div className="footer-logo">
            <img src= {logo} alt=''/>
            <p>8VAULT</p>
            </div>
            <div className="login-foot">
            <a href="./masuk">Masuk</a>
            <Link to='./daftar'><button className='buttonFoot'>Daftar</button></Link>
            </div>
        </div>
        <div className="tengah">
            <p>Semarang, Jawa Tengah, Indonesia.</p>
            <p>Kontak : 62+ 896 0369 2648</p>
            <p>Email : xvault.@gmail.com</p>
        </div>
        <div className="bawah">
            <p>© 2023 8VAULT</p>
        </div>
    </div>
  )
}

export default Copyright