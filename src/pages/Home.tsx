import React, { useEffect, useState } from 'react'
import api, { deleteProduct, getProducts } from '../services/api'
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const liStyle: React.CSSProperties = {
    textDecoration: 'underline',
    cursor: 'pointer',
    fontWeight: 'bold',
};

type Props = {}

export interface Product {
    id: number;
    name: string;
    price: number;
}

const Home = (props: Props) => {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect((() => {
        getProducts().then(products => {
            setProducts(products);
        }).catch(error => {
            console.error('Error fetching products:', error);
        });
    }), [])

    const navigate = useNavigate();

    const navigateToCreate = () => {
        navigate('/create');
    };

    const navigateToUpdate = (id: number) => {
        navigate(`/update/${id}`);
    };

    const handleDelete = (id: number) => {
        deleteProduct(id.toString()).then(() => {
            setProducts(prev => prev.filter(product => product.id !== id));

        }).catch(error => {
            console.error('Error deleting product:', error);
        })
    }

    return (
        <div>
            <Button label="Créer nouveau product" onClick={navigateToCreate}></Button>
            <ul>
                {products.map((product: Product) => (
                    <li key={product.id}
                        style={liStyle}>
                        <span onClick={() => navigateToUpdate(product.id)}>{product.name}: {product.price}€</span>

                        <Button label='X' onClick={() => handleDelete(product.id)} />
                    </li>

                ))}
            </ul>
        </div>

    )
}

export default Home