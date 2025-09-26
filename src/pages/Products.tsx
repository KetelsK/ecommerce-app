import React, { useEffect, useState } from 'react'
import { deleteProduct, getProducts, Product } from '../services/product-api';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import noProductImg from '../assets/logo.svg';
import './Products.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect((() => {
        getProducts().then(products => {
            setProducts(products);
        }).catch((error: Error) => {
            console.error('Error fetching products:', error);
        });
    }), [])
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    const navigate = useNavigate();


    const navigateToUpdate = (id: number) => {
        navigate(`/update/${id}`);
    };

    const handleDelete = (id: number) => {
        deleteProduct(id).then(() => {
            setProducts(prev => prev.filter(product => product.id !== id));

        }).catch((error: Error) => {
            console.error('Error deleting product:', error);
        })
    }

    const addToCart = (product: Product) => {
        // Logic to add the product to the cart
        console.log(`Product ${product.name} added to cart.`);
    };

    return (
        <div className='product-list'>
            {products.map((product: Product) => (
                <div key={product.id} className='product-item' onClick={() => navigateToUpdate(product.id!)}>
                    <img src={noProductImg} alt={product.name} className='product-image' />
                    <div>
                        <span className='product-title'>{product.name}</span>
                        <Button style={{ float: 'right', cursor: 'pointer' }} label="+"
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                addToCart(product);
                            }} />
                    </div>

                    <div>*****</div>
                    <div className='product-price'>{product.price}€</div>
                    {isLoggedIn &&
                        <Button
                            style={{ marginTop: '8px', backgroundColor: 'red', color: 'white' }}
                            label="Delete"
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                handleDelete(product.id!);
                            }}
                        />
                    }

                </div>
            ))}
        </div>
    )
}

export default Products;