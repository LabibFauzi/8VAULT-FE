import React, { useEffect, useState } from 'react';
import './Hero.css';
import gambar1 from '../Asets/Gambar1.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const h2Text = 'Optimalkan Manajemen Stok Anda!';

  useEffect(() => {
    if (!animationStarted) {
      animateText();
    }
  }, [animationStarted]);

  const animateText = () => {
    setAnimationStarted(true);

    // Dapatkan panjang teks
    const textLength = h2Text.length;

    // Mulai animasi ketik
    let currentIndex = 0;
    const textInterval = setInterval(() => {
      if (currentIndex <= textLength) {
        const animatedText = h2Text.slice(0, currentIndex);
        document.querySelector('.hero h2').textContent = animatedText;
        currentIndex++;
      } else {
        clearInterval(textInterval);
      }
    }, 30); // Sesuaikan dengan kecepatan yang Anda inginkan
  };

  return (
    <div className="hero">
      <div className="hero-kiri">
        <h2></h2>
        <p>
          Jadilah pintar dalam manajemen stok Anda dengan 8Vault! <br />
          Optimalkan dan tingkatkan efisiensi bisnis anda. <br />
          Bergabunglah dengan kami hari ini untuk kesuksesan yang lebih besar.
        </p>
        <div className="hero-tombol">
        <Link to="/masuk"><button >Masuk</button></Link>
        </div>
      </div>

      <div className="hero-kanan">
        <img src={gambar1} alt="" />
      </div>
    </div>
  );
};

export default Hero;
