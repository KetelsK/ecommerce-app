import React from 'react'
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import Products from './Products';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const buttonStyle: React.CSSProperties = {
    marginBottom: '12px',
};

const Home = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    const navigate = useNavigate();

    const navigateToCreate = () => {
        navigate('/create');
    };





    return (
        <div>
            {isLoggedIn && <Button style={buttonStyle} content="Créer nouveau product" onClick={navigateToCreate}></Button>}
            <Products></Products>
        </div>

    )
}

export default Home