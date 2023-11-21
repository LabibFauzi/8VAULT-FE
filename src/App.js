import Copyright from "./Components/Copyright/Copyright";
import Hero from "./Components/Hero/Hero";
import Hubungi from "./Components/Hubungi/Hubungi";
import Layanan from "./Components/Layanan/Layanan";
import Navbar from "./Components/Navbar/Navbar";
function App() {

  return (
    <div>
        <Navbar/>
        <Hero/>
        <Layanan/>
        <Hubungi/>  
        <Copyright/>
    </div>
      
  );
}

export default App;
