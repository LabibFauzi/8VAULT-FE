import React from 'react'
import kategori from '../Asets/Kategori.png'
import barang from '../Asets/Barang.png'
import riwayat from '../Asets/Riwayat.png'
import { Link } from 'react-router-dom'
import './Layanan.css'
const Layanan = () => {
  return (
    <div className='layanan' id='layanan'>
        <div className="title"> 
        <h2>Layanan</h2><br /><br />
        <p>Yang Kami <span className='tebal'>Tawarkan</span></p>
        </div>
        <div className='telu'>
        <Link to='/daftar' className='link'><div className="tambahkategori">
            <div className="container1">
                <img src={kategori} alt="" />
                <p>Tambah <br />Kategori</p>
            </div>
        </div></Link>
       
        <Link to='/daftar'className='link'><div className="tambahbarang">
            <div className="container2">
                <img src={barang} alt="" />
                <p>Tambah <br />Barang</p>
            </div>
        </div></Link>
        <Link to='/daftar'className='link'>
            <div className="container3">
                <img src={riwayat} alt="" />
                <p>Riwayat <br />Iventaris</p>
        </div></Link>
        </div>
    </div>
  )
}

export default Layanan