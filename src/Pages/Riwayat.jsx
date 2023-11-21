import React, { useState, useEffect } from 'react';
import '../Components/csspage/Riwayat.css'
import { Link } from 'react-router-dom';
import logo from '../Components/Asets/logo.png'
import menu1 from '../Components/Asets/beranda-menu.png'
import menu2 from '../Components/Asets/Kategori.png'
import menu3 from '../Components/Asets/Barang.png'
import menu4 from '../Components/Asets/Riwayat.png'
import profil from '../Components/Asets/profil.png'
import logout from '../Components/Asets/logout.png'
const Riwayat = () => {
  const [tambahVisible, setTambahVisible] = useState(false);
  const [riwayatData, setriwayatData] = useState([]);
  const [formData, setFormData] = useState({ idRiwayat: '', namaBarang: '',kuantitas:'' , tanggal: '', status: '' });
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');
  const [sortCriteria, setSortCriteria] = useState('idRiwayat');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const storedData = localStorage.getItem('riwayatData');
    if (storedData) {
      setriwayatData(JSON.parse(storedData));
    }
  }, []);

  const updateriwayatData = (newData) => {
    setriwayatData(newData);
    localStorage.setItem('riwayatData', JSON.stringify(newData));
  };

  const generateNextId = () => {
    const ids = riwayatData.map((riwayat) => parseInt(riwayat.idRiwayat, 10));
    const maxId = Math.max(...ids, 0);
    return (maxId + 1).toString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextId = generateNextId();
    const newData = [...riwayatData, { ...formData, idRiwayat: nextId }];
    updateriwayatData(newData);

    setFormData({ idRiwayat: '', namaBarang: '',kuantitas:'' , tanggal: '', status: '' });
    setError('');
  };

  const sortData = (data, criteria, order) => {
    return data.slice().sort((a, b) => {
      const valueA = a[criteria] || ''; // Handle null or undefined values
      const valueB = b[criteria] || '';
  
      if (order === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  };
  const handleSort = (newSortCriteria) => {
    if (newSortCriteria === sortCriteria) {
      // If the same column header is clicked, reverse the sorting order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If a different column header is clicked, update the sorting criteria
      setSortCriteria(newSortCriteria);
      setSortOrder('asc'); // Start with ascending order by default
    }
  };

  const filteredData = riwayatData.filter((riwayat) =>
    (riwayat.idRiwayat && riwayat.idRiwayat.toLowerCase().includes(searchText.toLowerCase())) ||
    (riwayat.tanggal && riwayat.tanggal.toLowerCase().includes(searchText.toLowerCase())) ||
    (riwayat.namaBarang && riwayat.namaBarang.toLowerCase().includes(searchText.toLowerCase())) ||
    (riwayat.kuantitas && riwayat.kuantitas.toLowerCase().includes(searchText.toLowerCase())) ||
    (riwayat.status && riwayat.status.toLowerCase().includes(searchText.toLowerCase()))
  );


  const [isLogoutPopupVisible, setLogoutPopupVisible] = useState(false);
  
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

  return (
    <div className="riwayat">
      <div className="riwayat-kiri">
        <div className="riwayat-logo">
        <Link to='/'><img src= {logo} alt=''/></Link>
        </div>
        <Link to='/beranda'>
        <div className="menu1-rwyt">
          <img src={menu1} alt="" />
          <p>Beranda.</p>
        </div>
        </Link>
        <Link to='/tambahkategori'>
        <div className="menu2-rwyt">
          <img src={menu2} alt="" />
          <p>Tambah Kategori.</p>
        </div>
        </Link>
        <Link to='/tambahbarang'>
        <div className="menu3-rwyt">
          <img src={menu3} alt="" />
          <p>Tambah Barang.</p>
        </div>
        </Link>
        <div className="menu4-rwyt">
          <img src={menu4} alt="" />
          <p>Riwayat Iventaris.</p>
        </div>
        <div className="profile">
        <img className='profil'src={profil} alt="" />
          <p>Labib Fauzi</p>
          <img className='logout' src={logout} alt="" onClick={handleLogout} />
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
      <div className="riwayat-kanan">
        <div className="riwyat-title">
          <h2>Riwayat Iventaris.</h2>
        </div>
        <div className="searchfilter-rwyt ">
          <input
            className="pilter"
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="tableriwayat-wrap">
          <table className="table-riwayat">
          <thead>
              <tr>
                <th className="expandid-rwyt" onClick={() => handleSort('idRiwayat')}>
                  ID Barang {sortCriteria === 'idRiwayat' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="expandBarang-rwyt" onClick={() => handleSort('namaBarang')}>
                  Nama Barang {sortCriteria === 'namaBarang' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="expandBarang-kuantitas" onClick={() => handleSort('kuantitas')}>
                  Kuantitas {sortCriteria === 'kuantitas' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="expandtanggal-rwyt" onClick={() => handleSort('tanggal')}>
                  Tanggal {sortCriteria === 'tanggal' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="expandket-rwyt" onClick={() => handleSort('status')}>
                  Status {sortCriteria === 'status' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
              </tr>
            </thead>
            <tbody className='tbody-riwayat'>
              {sortData(filteredData, sortCriteria, sortOrder).map((riwayat, index) => (
                <tr key={index}>
                  {/* Render your table rows here */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Riwayat