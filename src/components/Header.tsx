import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from './Button';

const h1Style: React.CSSProperties = {
  cursor: 'pointer',
  textDecoration: 'underline',
  marginBottom: '20px'
};

type Props = {}

const Header = (props: Props) => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <header className='d-flex justify-content-between align-items-center'>
      <h1 style={h1Style} onClick={navigateToHome}>E-commerce App</h1>
      <Button label="Se connecter" onClick={() => { navigate('/login'); }}></Button>
    </header>
  )
}

export default Header