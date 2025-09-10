import Hero from "../large/hero/hero";
import { Navbar } from "../large/navbar/navbar";
import BestSellingProducts from "../large/best-selling-products/best-selling-products";
import Footer from "../large/footer/footer";
import "./App.css";

function App() {
  return (
    <div id="app">
      <Navbar />
      <Hero />
      <BestSellingProducts />
      <Footer />
    </div>
  );
}

export default App;
