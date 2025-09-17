import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const h1Style: React.CSSProperties = {
  cursor: 'pointer',
  textDecoration: 'underline',
  marginBottom: '20px'
};

const Header = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);


  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  const logout = () => {
    // logout
  }

  return (
    <header className='d-flex justify-content-between align-items-center'>
      <h1 style={h1Style} onClick={navigateToHome}>E-commerce App</h1>
      {isLoggedIn ?
        <Button label="Se déconnecter" onClick={() => { logout() }}></Button>
        :
        <Button label="Se connecter" onClick={() => { navigate('/login'); }}></Button>
      }

    </header>
  )
}

export default Header