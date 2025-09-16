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

const App: React.FC = () => {
  return (
    <div className="app-root">
      <Provider store={store}>
        <PersistGate loading={<div>Chargement...</div>} persistor={persistor}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/create" element={<ProductForm />} />
              <Route path="/update/:id" element={<ProductForm />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
