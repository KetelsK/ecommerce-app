import React from 'react'
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import Products from './Products';

const buttonStyle: React.CSSProperties = {
    marginBottom: '12px',
};

const Home = () => {
    const navigate = useNavigate();

    const navigateToCreate = () => {
        navigate('/create');
    };





    return (
        <div>
            <Button style={buttonStyle} label="Créer nouveau product" onClick={navigateToCreate}></Button>
            <Products></Products>
        </div>

    )
}

export default Home