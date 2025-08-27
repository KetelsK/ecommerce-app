import React, { useEffect, useState } from 'react'
import productApi, { deleteProduct, getProducts } from '../services/product-api'
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import Products from './Products';

const buttonStyle: React.CSSProperties = {
    marginBottom: '12px',
};

type Props = {}

export interface Product {
    id: number;
    name: string;
    price: number;
}

const Home = (props: Props) => {
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