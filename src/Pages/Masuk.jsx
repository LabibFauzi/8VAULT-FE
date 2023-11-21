import React from 'react'
import '../Components/csspage/Masuk.css'
import logo from '../Components/Asets/logo.png'
import masuk from '../Components/Asets/masuk.png'
import { Link } from 'react-router-dom'
const Masuk = () => {
  return (
    <div className='mlebu'>
      <div className="left">
        <div className="logo">
          <img src={logo} alt="" />
          <a href="/">8VAULT</a>
        </div>
        <div className="gambar">
          <img src={masuk} alt="" />
          <h2>Selamat Datang <br />Kembali.</h2>
        </div>
      </div>
      <div className="right">
        <h2>Selamat Datang</h2>
        <p>Silakan lengkapi kotak di bawah ini untuk <br />masuk kembali ke akun Anda.</p>
        <div className="input">
        <input type="text" className='input' placeholder='Nama'   />
        <input type="text" className='input' placeholder='Email'  />
        </div>
        <Link to='/beranda'><button className='masukin'>Masuk</button></Link>
        <div className="yakin">

        <p>Belum memiliki akun? <a href="/daftar">  Daftar</a></p>
        </div>
      </div>
    </div>
  )
}

export default Masuk