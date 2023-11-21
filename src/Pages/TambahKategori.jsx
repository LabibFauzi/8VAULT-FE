import React, { useState, useEffect } from 'react';
import '../Components/csspage/TambahKategori.css'
import { Link } from 'react-router-dom';
import logo from '../Components/Asets/logo.png'
import menu1 from '../Components/Asets/beranda-menu.png'
import menu2 from '../Components/Asets/Kategori.png'
import menu3 from '../Components/Asets/Barang.png'
import menu4 from '../Components/Asets/Riwayat.png'
import profil from '../Components/Asets/profil.png'
import logout from '../Components/Asets/logout.png'
import { BsFillPencilFill } from 'react-icons/bs';
import cancel from '../Components/Asets/x.png'
import check from '../Components/Asets/check.png'
import search from '../Components/Asets/search.png'
import plus from '../Components/Asets/plus.png'
const TambahKategori = () => {
  const [isLogoutPopupVisible, setLogoutPopupVisible] = useState(false);
  const [tambahVisible, setTambahVisible] = useState(false);
  const [kategoriData, setKategoriData] = useState([]);
  const [formData, setFormData] = useState({ idKategori: '', namaKategori: '', keterangan: '' });
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [editingIndex, setEditingIndex] = useState(null);
  useEffect(() => {
    const storedData = localStorage.getItem('kategoriData');
    if (storedData) { 
      setKategoriData(JSON.parse(storedData));
    }
  }, []);

  const updateKategoriData = (newData) => {
    setKategoriData(newData);
    localStorage.setItem('kategoriData', JSON.stringify(newData));
  };

  const toggleTambah = () => {
    setTambahVisible(!tambahVisible);
    setError('');   
  };

  const enterEdit = (index) => {
    setEditingIndex(index);
    const kategori = kategoriData[index];
    setFormData({ ...kategori });
  };

  const saveEdit = (index) => {
    const newData = [...kategoriData];
    newData[index] = { ...formData };
    updateKategoriData(newData);
    setEditingIndex(null);
  };

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.namaKategori.trim() === '') {
      setError('Silahkan isi Nama Kategori.');
      return;
    }

    const nextId = `KAT-${kategoriData.length + 1}`;
    const newData = [...kategoriData, { ...formData, idKategori: nextId }];
    updateKategoriData(newData);

    setFormData({ idKategori: '', namaKategori: '', keterangan: '' });
    setError('');
  };

  const filteredData = kategoriData.filter((kategori) =>
    kategori.idKategori.toLowerCase().includes(searchText.toLowerCase()) ||
    kategori.namaKategori.toLowerCase().includes(searchText.toLowerCase()) ||
    kategori.keterangan.toLowerCase().includes(searchText.toLowerCase())
  );

  if (sortBy) {
    filteredData.sort((a, b) => {
      const fieldA = a[sortBy].toLowerCase();
      const fieldB = b[sortBy].toLowerCase();
      if (fieldA < fieldB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
  

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
    <div className="kategori">
      <div className="kategori-kiri">
        <div className="kategori-logo">
        <Link to='/'><img src= {logo} alt=''/></Link>
        </div>
        <Link to='/beranda'>
        <div className="menu1-Kat">
          <img src={menu1} alt="" />
          <p>Beranda.</p>
        </div>
        </Link>
        <div className="menu2-Kat">
          <img src={menu2} alt="" />
          <p>Tambah Kategori.</p>
        </div>
        <Link to='/tambahbarang'>
        <div className="menu3-Kat">
          <img src={menu3} alt="" />  
          <p>Tambah Barang.</p>
        </div>
        </Link>
        <Link to='/riwayat'>
        <div className="menu4-Kat">
          <img src={menu4} alt="" />
          <p>Riwayat Iventaris.</p>
        </div>
        </Link>
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
      <div className="kategori-kanan">
        <div className="kategori-title">
          <h2>Tambah Kategori.</h2>
        </div>
        <div className="dua">
            <div className="containersearch">
              <form action="" className='search-bar'>
                <img src={search} alt="" className="search-icon" />
                <input
                  className="pilter"
                  type="text"
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </form>
            </div>
            <button onClick={toggleTambah} className='btn-tambah'>
            <div className="button-content">
              <img src={plus} alt="Plus" />
              <span>Tambah</span>
            </div>
          </button>
        </div>
        {tambahVisible && (
          <div className="tambah-container">
            <div className="tambah">
              <div className="title-tambah">
                <h2>Tambah Kategori.</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                </div>
                <div className="form-group">
                  <label htmlFor="namaKategori">Nama Kategori</label>
                  <input
                    name="namaKategori"
                    value={formData.namaKategori}
                    onChange={(e) => setFormData({ ...formData, namaKategori: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="keterangan">Keterangan</label>
                  <input
                    name="keterangan"
                    value={formData.keterangan}
                    onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                  />
                </div>
                <div className="error">{error}</div>
                <div className="tombol-kematian">
                  <button onClick={toggleTambah} className="btn-batal">
                    Batal
                  </button>
                  <button type="submit" className="btntambah-dlm">
                    Tambah
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="tablekategori-wrap">
          <table className="table-kategori">
            <thead>
              <tr>
                <th className="expand-id" onClick={() => handleSort('idKategori')}>
                  ID Kategori
                  {sortBy === 'idKategori' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th className="expand-nama" onClick={() => handleSort('namaKategori')}>
                  Nama Kategori
                  {sortBy === 'namaKategori' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th className="expand-ket" onClick={() => handleSort('keterangan')}>
                  Keterangan
                  {sortBy === 'keterangan' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th className="expand-aksi">Aksi</th>
              </tr>
            </thead>
            <tbody className='tbody-kategori'>
              {filteredData.map((kategori, index) => (
                <tr key={index}>
                  <td>
                    {editingIndex === index ? (
                      <input
                        name="idKategori"
                        value={formData.idKategori}
                        disabled={true}
                      />
                    ) : (
                      kategori.idKategori
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={formData.namaKategori}
                        onChange={(e) => setFormData({ ...formData, namaKategori: e.target.value })}
                      />
                    ) : (
                      kategori.namaKategori
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={formData.keterangan}
                        onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })}
                      />
                    ) : (
                      kategori.keterangan
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <span className="aksi-kategori">
                        <img src= {cancel} onClick={() => setEditingIndex(null)}/>
                        <img src={check} onClick={() => saveEdit(index)} />
                      </span>
                    ) : (
                      <span className="action-kategori">
                        <BsFillPencilFill onClick={() => enterEdit(index)} />
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TambahKategori