import React, { useEffect, useState } from 'react'
import { deleteProduct, getProducts } from '../services/product-api';
import { Product } from './Home';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import noProductImg from '../assets/logo.svg';
import './Products.css';

type Props = {}

const Products = (props: Props) => {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect((() => {
        getProducts().then(products => {
            setProducts(products);
        }).catch(error => {
            console.error('Error fetching products:', error);
        });
    }), [])
    const navigate = useNavigate();


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

    const addToCart = (product: Product) => {
        // Logic to add the product to the cart
        console.log(`Product ${product.name} added to cart.`);
    };

    return (
        <div className='product-list'>
            {products.map((product: Product) => (
                <div key={product.id} className='product-item' onClick={() => navigateToUpdate(product.id)}>
                    <img src={noProductImg} alt={product.name} className='product-image' />
                    <div>
                        <span className='product-title'>{product.name}</span>
                        <Button style={{ float: 'right', cursor: 'pointer' }} label="+"
                            onClick={(e: any) => {
                                e.stopPropagation();
                                addToCart(product);
                            }} />
                    </div>

                    <div>*****</div>
                    <div className='product-price'>{product.price}€</div>
                </div>
            ))}
        </div>
    )
}

export default Products;