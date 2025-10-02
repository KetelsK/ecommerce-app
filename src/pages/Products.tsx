import React, { useEffect, useState } from 'react'
import { deleteProduct, getProducts, Product } from '../services/product-api';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import noProductImg from '../assets/logo.svg';
import './Products.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Base64Image from '../components/Base64Image';
import { Plus } from 'lucide-react';
import OverlayTrigger from 'react-bootstrap/esm/OverlayTrigger';
import Tooltip from 'react-bootstrap/esm/Tooltip';
import { addToCart, Cart } from '../services/cart-api';
import LoaderError from '../components/LoaderError/LoaderError';

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect((() => {
        getProducts().then(products => {
            setProducts(products);
        }).catch((error: Error) => {
            console.error('Error fetching products:', error);
        });
    }), [])
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const userId = useSelector((state: RootState) => state.auth.userId);

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

    const handleAddToCart = (productId: number) => {
        const newCart: Cart = {
            productId: productId,
            userId: userId
        }
        setIsLoading(true);
        setIsError(false);
        addToCart(newCart).then(() => {
            setIsLoading(false);
        }).catch(() => {
            setIsError(false);
            setIsLoading(false);
        })
    };

    return (
        <>
            <LoaderError isError={isError} isLoading={isLoading}></LoaderError>
            <div className='product-list'>

                {products.map((product: Product) => (
                    <div key={product.id} className='product-item' onClick={() => navigateToUpdate(product.id!)}>
                        <div className='product-image-container'>
                            <Base64Image src={product.image ? product.image : noProductImg} className='product-image' alt={product.name}></Base64Image>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <span className='product-title'>{product.name}</span>
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="tooltip-top">Ajouter au panier</Tooltip>}>
                                <button className="btn btn-primary add-to-cart-btn"
                                    onClick={(e: React.MouseEvent) => {
                                        e.stopPropagation();
                                        handleAddToCart(product.id!)
                                    }}
                                >
                                    <Plus />
                                </button>
                            </OverlayTrigger>
                        </div>

                        <div>*****</div>
                        <div className='product-price'>{product.price}€</div>
                        {isLoggedIn &&
                            <Button
                                className='btn-danger mt-2'
                                content="Delete"
                                onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                    handleDelete(product.id!);
                                }}
                            />
                        }

                    </div>
                ))}
            </div>
        </>
    )
}

export default Products;