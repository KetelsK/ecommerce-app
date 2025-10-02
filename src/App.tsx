import React from 'react';
import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductForm from './pages/Product/ProductForm';
import Login from './pages/Login/Login';
import { Provider } from "react-redux";
import { persistor, store } from "./store/index";
import { PersistGate } from 'redux-persist/integration/react';
import { AuthProvider } from './context/AuthContext'; // Adjust the path as needed
import Cart from './pages/Cart/Cart';

const App: React.FC = () => {
  return (
    <div className="app-root">
      <AuthProvider>
        <Provider store={store}>
          <PersistGate loading={<div>Chargement...</div>} persistor={persistor}>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create" element={<ProductForm />} />
                <Route path="/update/:id" element={<ProductForm />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </AuthProvider>
    </div>
  );
}

export default App;
