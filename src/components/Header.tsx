import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, persistor, RootState } from '../store';
import { authLogout } from '../services/auth-api';
import { logout } from '../store/authSlice';
import { useAuth } from '../context/AuthContext';

const h1Style: React.CSSProperties = {
  cursor: 'pointer',
  fontSize: '2.5rem',
  fontWeight: 700,
  color: '#2c3e50',
  letterSpacing: '1px',
  margin: '20px 0'
};

const Header = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const { clearAuthContext } = useAuth()

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const navigateToHome = () => {
    navigate('/');
  };

  const handleLogout = () => {
    authLogout().then(() => {
      dispatch(logout(undefined));
      clearAuthContext();
      persistor.flush();
      navigate('/');
    }).catch((error: Error) => {
      console.log(error)
    })
  }

  return (
    <header className='d-flex justify-content-between align-items-center'>
      <h1 style={h1Style} onClick={navigateToHome}>E-commerce App</h1>
      <div>

        {isLoggedIn ?
          <>
            <Button content="Mon panier" onClick={() => { navigate('/cart') }} className="me-2"></Button>
            <Button content="Se déconnecter" onClick={() => { handleLogout() }}></Button>
          </>
          :
          <Button content="Se connecter" onClick={() => { navigate('/login'); }}></Button>
        }
      </div>
    </header >
  )
}

export default Header