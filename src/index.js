import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Daftar from './Pages/Daftar';
import Masuk from './Pages/Masuk';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Beranda from './Pages/Beranda';
import TambahKategori from './Pages/TambahKategori';
import TambahBarang from './Pages/TambahBarang';
import Hero from './Components/Hero/Hero';
import Riwayat from './Pages/Riwayat';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
    },
  {
    path: "hero",
    element: <Hero/>
  },      
  {
    path: "daftar",
    element: <Daftar/>
  },     
  {
    path: "masuk",
    element: <Masuk/>
  },
  {
    path: "beranda",
    element: <Beranda/>
  },
  {
    path: "tambahkategori",
    element: <TambahKategori/>
  },
  {
    path: "tambahbarang",
    element: <TambahBarang/>
  },
  {
    path: "riwayat",
    element: <Riwayat/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
