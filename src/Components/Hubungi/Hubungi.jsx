import React from 'react'
import './Hubungi.css'
import gambar2 from '../Asets/Gambar2.png'
const Hubungi = () => {
  return (
    <div className='Hubungi' id='hubungi'>
        <div className="kiri">
            <h2>Hubungi Kami</h2>
            <img src= {gambar2} alt="" />
        </div>
        <div className="kanan">
            <div className="container4">
                 <form action="" >
                <input type="text" className='input' placeholder='Nama'   />
                <input type="text" className='input' placeholder='Email'  />
                <input type="text" className='input' placeholder='Pesan'  />
                {/* <textarea name="" id="" cols="10" rows="10" placeholder='Pesan'></textarea> */}
                </form>
                <div className="kirim">
                <button className='buttonHub'>Kirim</button>
                </div>
            </div>
        </div>  
    </div>
  )
}

export default Hubungi