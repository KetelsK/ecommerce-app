import React from 'react'
import { useNavigate } from 'react-router-dom';

const h1Style: React.CSSProperties = {
  cursor: 'pointer',
  textDecoration: 'underline',
};

type Props = {}

const Header = (props: Props) => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <header>
      <h1 style={h1Style} onClick={navigateToHome}>E-commerce App</h1>
    </header>
  )
}

export default Header