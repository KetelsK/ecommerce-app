import React from 'react';
import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductForm from './pages/Product/ProductForm';
import Login from './pages/Login/Login';

const App: React.FC = () => {
  return (
    <div className="app-root">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<ProductForm />} />
          <Route path="/update/:id" element={<ProductForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
