import React,{useEffect} from 'react'
import './Navbar.css'
import logo from '../Asets/logo.png'
import { Link } from "react-router-dom";

const Navbar = () => {
  useEffect(() => {
    // Fungsi untuk menangani scroll yang mulus
    function handleSmoothScroll(e) {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 50, // Sesuaikan offset sesuai kebutuhan
          behavior: 'smooth',
        });
      }
    }
    // Mendaftarkan event handler untuk tautan dengan class "scroll-link"
    const scrollLinks = document.querySelectorAll('.scroll-link');
    scrollLinks.forEach((link) => {
      link.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      // Hapus event handler saat komponen dibongkar
      scrollLinks.forEach((link) => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);
 
  return (
    <div className='navbar '>
        <div className="nav-logo">
           <img src= {logo} alt=''/>
            <p className='nav-title'>8VAULT</p>
        </div>
        <ul className="nav-menu">
          <li><a href="/">Beranda</a></li>
            <li><a className="scroll-link" href="#layanan" >Layanan</a></li>
            <li><a className="scroll-link" href="#hubungi" >Hubungi Kami</a></li>
        </ul>
        <div className='nav-login'>
        <Link to="/daftar" ><button className='tombolDaftar'>Daftar</button></Link>
        </div>
    </div>
  )
}

export default Navbar