import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/layout/Layout';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/> } >
          <Route index element={<Home/>} />
          <Route path="products" element={<Products /> } />
          <Route path="contact" element={<Contact/> } />
          <Route path="about" element={<About/> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
