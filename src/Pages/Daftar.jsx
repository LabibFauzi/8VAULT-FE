import React from 'react'
import '../Components/csspage/Daftar.css'
import logo from '../Components/Asets/logo.png'
import daftar from '../Components/Asets/daftar.png'
import { Link } from 'react-router-dom'
const Daftar = () => {
  return (
    <div className='daftar'>
      <div className="left">
        <div className="logo-daftar">
          <img src={logo} alt="" />
          <a href="/">8VAULT</a>
        </div>
        <div className="gambar-daftar">
          <img src={daftar} alt="" />
          <h2>Silahkan Mendaftar.</h2>
        </div>
      </div>
      <div className="right">
        <div className="title-masuk">
        <h2>Silahkan Mendaftar. </h2>
        <p>Silakan lengkapi kotak di bawah ini untuk <br />mendaftar. </p></div>
        <div className="daftar-input">
        <input type="text" className='input' placeholder='Nama'   />
        <input type="text" className='input' placeholder='Email'  />
        <input type="password" className='input' placeholder='Password'  />
        <input type="password" className='input' placeholder='Konfirmasi Password'  />
        </div>
        <div className="buttonSignup">
        <Link to='/beranda'><button className='signup'>Daftar</button></Link>
        <div className="yakin">
        </div>
        <div className="yakinDaftar">
        <p>sudah memuliki akun? <a href="/masuk">Masuk</a></p>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Daftar