import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CartProvider } from "./cart/CartContext.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import About from "./pages/About.jsx";
import Cart from "./pages/Cart.jsx";
import Contact from "./pages/Contact.jsx";
import FAQ from "./pages/FAQ.jsx";
import Home from "./pages/Home.jsx";
import Privacy from "./pages/Privacy.jsx";
import Product from "./pages/Product.jsx";
import Returns from "./pages/Returns.jsx";
import Shipping from "./pages/Shipping.jsx";
import Terms from "./pages/Terms.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="site-shell">
          <Navbar />
          <main id="main-content" className="site-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/returns" element={<Returns />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
