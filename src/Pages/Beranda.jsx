import React, { useState, useEffect } from 'react'
import '../Components/csspage/Beranda.css'
import { Link } from 'react-router-dom';
import logo from '../Components/Asets/logo.png'
import menu1 from '../Components/Asets/beranda-menu.png'
import menu2 from '../Components/Asets/Kategori.png'
import menu3 from '../Components/Asets/Barang.png'
import menu4 from '../Components/Asets/Riwayat.png'
import profil from '../Components/Asets/profil.png'
import logout from '../Components/Asets/logout.png'
import { PieChart, Pie,  Cell,  } from 'recharts';
import segitigaKeluar from '../Components/Asets/segitiga-keluar.png'
import segitigaMasuk from '../Components/Asets/segitiga-masuk.png'
import kotakMerah from '../Components/Asets/kotak-merah.png'
import kotakHijau from '../Components/Asets/kotak-hijau.png'
const Beranda = () => {
    const [isLogoutPopupVisible, setLogoutPopupVisible] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    
    const formattedDate = currentDate.toLocaleDateString();
    const data = [  
      { name: 'Masuk', value: 700 },
      { name: 'Keluar', value: 300 },
      
      
    ];
    const COLORS = ['#0FA958', '#F24E1E'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const handleLogout = () => {
  setLogoutPopupVisible(true);
};

const handleLogoutConfirm = () => {
  // Tempatkan logika logout di sini
  setLogoutPopupVisible(false); // Tutup pop-up setelah logout
};

const handleLogoutCancel = () => {
  setLogoutPopupVisible(false); // Tutup pop-up tanpa logout
};  

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentDate(new Date());
  }, 1000);

  return () => clearInterval(interval);
}, []);

return (
  <div className="beranda">
      <div className="beranda-kiri">
        <div className="beranda-logo">
        <Link to='/'><img src= {logo} alt=''/></Link>
        </div>
          <div className="menu1-brnd">
            <img src={menu1} alt="" />
            <p>Beranda.</p>
          </div>
        <Link to='/tambahkategori'>
        <div className="menu2-brnd">
          <img src={menu2} alt="" />
          <p>Tambah Kategori.</p>
        </div>
        </Link>
        <Link to='/tambahbarang'>
        <div className="menu3-brnd">
          <img src={menu3} alt="" />
          <p>Tambah Barang.</p>
        </div>
        </Link>
        <Link to='/riwayat'>
        <div className="menu4-brnd">
          <img src={menu4} alt="" />
          <p>Riwayat Iventaris.</p>
        </div>
        </Link>
        <div className="profile">
        <img className='profil' src={profil} alt="" />
          <p>Labib Fauzi</p>
          <img className='logout'onClick={handleLogout}  src={logout} alt="" />
        </div>
      </div>
      <div className="beranda-kanan">
        <div className="beranda-title">
          <h2> Selamat Datang Labib Fauzi.</h2>
          <Link to='/tambahkategori'><button>Mulai Sortir</button></Link>
        </div>
        <div className="container-jumlah">
              <p className='title-jumlah'>Jumlah Barang Masuk-Keluar</p>
              <div className="statistic-jumlah">
                <PieChart width={600} height={600}> 
                  <Pie
                  data={data}
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
              </div>
              <div className="jumlah-statistic">
                <div className="kotakMasuk">
                <img src={kotakHijau} alt="" />
                <p className='barang-masuk'>Barang Masuk: 7</p> <br /></div>
                <div className="kotakKeluar">
                <img src={kotakMerah} alt="" />
                <p className='barang-keluar'>Barang Keluar: 3</p></div>
              </div>
            </div>
            <div className="container-barang">
            <p className='title-jumlah'>Riwayat Barang Masuk-Keluar</p>
              <h2 className='tgl'>{formattedDate}</h2>
              <div className="jumlah-terakhir">
              <div className="masukterakhir">
              <img src={segitigaMasuk} alt="" />
              <p >ES teh : 20 </p></div>  
              <div className="keluarterakhir">
              <img src={segitigaKeluar} alt="" />
              <p >Ayam : 30</p>
              </div>
             </div>
            </div>
            {isLogoutPopupVisible && (
        <div className="logout-popup" style={{ zIndex: 1000 }}>
          <div className="popup">
          <img className='popup-logo'src={logo} alt="" />
          <p className='popup-title'>Yakin Mau Keluar?</p>
          <Link to='/masuk'><button className='keluar-btn'onClick={handleLogoutConfirm} >Keluar</button></Link>
          <button className='tidak-btn'onClick={handleLogoutCancel}>Tidak</button>
          </div>
        </div>
      )}
        </div>
    </div>
  )
}

export default Beranda