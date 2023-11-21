import React, { useState, useEffect } from 'react';
import '../Components/csspage/TambahBarang.css'
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
import plus from '../Components/Asets/plus.png'
import search from '../Components/Asets/search.png'
const TambahBarang = () => {
  const [tambahVisible, setTambahVisible] = useState(false);
  const [barangData, setbarangData] = useState([]);
  const [formData, setFormData] = useState({
    idBarang: '',
    namaKategori: '',
    namaBarang: '',
    kuantitas: '',
    status: 'Masuk', // Default to "Masuk"
  });
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('barangData');
    if (storedData) {
      setbarangData(JSON.parse(storedData));
    }
  }, []);

  const updatebarangData = (newData) => {
    setbarangData(newData);
    localStorage.setItem('barangData', JSON.stringify(newData));
  };

  const toggleTambah = () => {
    setTambahVisible(!tambahVisible);
    setError('');
  };

  const generateNextId = () => {
    const ids = barangData.map((barang) => parseInt(barang.idBarang, 10));
    const maxId = Math.max(...ids, 0);
    return (maxId + 1).toString();
  };

  const enterEdit = (index) => {
    setEditingIndex(index);
    const Barang = barangData[index];
    setFormData({ ...Barang });
  };

  const saveEdit = (index) => {
    const newData = [...barangData];
    newData[index] = { ...formData };
    updatebarangData(newData);
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

    if (
      !formData.namaKategori.trim() ||
      !formData.namaBarang.trim() ||
      !formData.kuantitas.trim()
    ) {
      setError('Silahkan isi Nama Kategori, Nama Barang, Kuantitas, dan Status.');
      return;
    }

    const nextId = generateNextId();
    const newData = [...barangData, { ...formData, idBarang: nextId }];
    updatebarangData(newData);

    setFormData({
      idBarang: '',
      namaKategori: '',
      namaBarang: '',
      kuantitas: '',
      status: 'Masuk', // Set the status to "Masuk" when adding a new row
    });
    setError('');
  };

  const filteredData = barangData.filter((barang) =>
    (barang.idKategori && barang.idKategori.toLowerCase().includes(searchText.toLowerCase())) ||
    (barang.namaKategori && barang.namaKategori.toLowerCase().includes(searchText.toLowerCase())) ||
    (barang.namaBarang && barang.namaBarang.toLowerCase().includes(searchText.toLowerCase())) ||
    (barang.kuantitas && barang.kuantitas.toLowerCase().includes(searchText.toLowerCase())) ||
    (barang.status && barang.status.toLowerCase().includes(searchText.toLowerCase())
  ));

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
    <div className="barang">
      <div className="barang-kiri">
        <div className="barang-logo">
        <Link to='/'><img src= {logo} alt=''/></Link>
        </div>
        <Link to='/beranda'>
        <div className="menu1-brg">
          <img src={menu1} alt="" />
          <p>Beranda.</p>
        </div>
        </Link>
        <Link to='/tambahkategori'>
        <div className="menu2-brg">
          <img src={menu2} alt="" />
          <p>Tambah Kategori.</p>
        </div>
        </Link>
        <div className="menu3-brg">
          <img src={menu3} alt="" />
          <p>Tambah Barang.</p>
        </div>
        <Link to='/riwayat'>
        <div className="menu4-brg">
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
      <div className="barang-kanan">
      <div className="title-brg">
        <h2>Tambah Barang.</h2>
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
        {tambahVisible && (<div className="tambah-container">
            <div className="tambah">
              <div className="title-tambah">
                <h2>Tambah Barang.</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="namaKategori">Nama Kategori</label>
                  <input
                    name="namaKategori"
                    value={formData.namaKategori}
                    onChange={(e) => setFormData({ ...formData, namaKategori: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="namaBarang">Nama Barang</label>
                  <input
                    name="namaBarang"
                    value={formData.namaBarang}
                    onChange={(e) => setFormData({ ...formData, namaBarang: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="kuantitas">Kuantitas</label>
                  <input
                    name="kuantitas"
                    value={formData.kuantitas}
                    onChange={(e) => setFormData({ ...formData, kuantitas: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Masuk">Masuk</option>
                    <option value="Keluar">Keluar</option>
                  </select>
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
        <div className="tablebarang-wrap">
          <table className="table-barang">
            <thead>
              <tr>
                <th className="expandid-brg" onClick={() => handleSort('idBarang')}>
                  ID Barang
                  {sortBy === 'idBarang' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th className="expandkategori-brg" onClick={() => handleSort('namaKategori')}>
                  Nama Kategori
                  {sortBy === 'namaKategori' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th className="expand-barang" onClick={() => handleSort('namaBarang')}>
                  Nama Barang
                  {sortBy === 'namaBarang' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                <th className="expandkuattitas-brg" onClick={() => handleSort('kuantitas')}>
                  Kuantitas
                  {sortBy === 'kuantitas' && (
                    <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </th>
                  <th className="expandket-brg" onClick={() => handleSort('status')}>
                    Status
                    {sortBy === 'status' && (
                      <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                <th className="expandaksi-brg">Aksi</th>
              </tr>
            </thead>
            <tbody className="tbody-barang">
              {filteredData.map((barang, index) => (
                <tr key={index}>
                  <td>
                    {editingIndex === index ? (
                      // Tidak ada input form, hanya menampilkan nilai barang.idBarang
                      barang.idBarang
                    ) : (
                      barang.idBarang
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={formData.namaKategori}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            namaKategori: e.target.value,
                          })
                        }
                      />
                    ) : (
                      barang.namaKategori
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={formData.namaBarang}
                        onChange={(e) =>
                          setFormData({ ...formData, namaBarang: e.target.value })
                        }
                      />
                    ) : (
                      barang.namaBarang
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={formData.kuantitas}
                        onChange={(e) =>
                          setFormData({ ...formData, kuantitas: e.target.value })
                        }
                      />
                    ) : (
                      barang.kuantitas
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <select
                        name="status"
                        value={formData.status} // Use formData.status when editing
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value })
                        }
                      >
                        <option value="Masuk">Masuk</option>
                        <option value="Keluar">Keluar</option>
                      </select>
                    ) : (
                      barang.status
                    )}
                  </td>
                  <td>
                    {editingIndex === index ? (
                      <span className="aksi-barang">
                        <img src= {cancel} onClick={() => setEditingIndex(null)}/>
                        <img src={check} onClick={() => saveEdit(index)} />
                      </span>
                    ) : (
                      <span className="action-barang">
                        <BsFillPencilFill  onClick={() => enterEdit(index)} />
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

export default TambahBarang