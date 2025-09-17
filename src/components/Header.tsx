import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, persistor, RootState } from '../store';
import { authLogout } from '../services/auth-api';
import { logout } from '../store/authSlice';

const h1Style: React.CSSProperties = {
  cursor: 'pointer',
  textDecoration: 'underline',
  marginBottom: '20px'
};

const Header = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);


  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const navigateToHome = () => {
    navigate('/');
  };

  const handleLogout = () => {
    authLogout().then(() => {
      dispatch(logout(undefined));
      localStorage.removeItem("persist:auth");
      persistor.flush();
      navigate('/');
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <header className='d-flex justify-content-between align-items-center'>
      <h1 style={h1Style} onClick={navigateToHome}>E-commerce App</h1>
      {isLoggedIn ?
        <Button label="Se déconnecter" onClick={() => { handleLogout() }}></Button>
        :
        <Button label="Se connecter" onClick={() => { navigate('/login'); }}></Button>
      }

    </header>
  )
}

export default Header