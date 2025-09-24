import React, { useEffect, useState } from 'react'
import { createProduct, getProductById, Product, updateProduct } from '../../services/product-api';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import AddProductReviews from './AddProductReview';
import ProductReviews from './ProductReviews';


const ProductForm = () => {
    const [form, setForm] = useState<Product>({ name: '', price: '' })
    const [errors, setErrors] = useState<{ name?: string, price?: string }>({});
    const [refreshReviews, setRefreshReviews] = useState(false);


    const { id: productId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditMode = !!productId;

    useEffect(() => {
        if (isEditMode && productId) {
            getProductById(Number(productId)).then(product => {
                setForm({
                    name: product.name,
                    price: product.price
                });
            }).catch((error: Error) => {
                alert('Error fetching product: ' + error.message);
            })


        }
    }, [productId, isEditMode]);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: type === 'number' ? (value === '' ? '' : parseFloat(value)) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: { name?: string, price?: string } = {};

        if (!form.name) {
            newErrors.name = 'Name is required';
        }
        if (form.price === '' || form.price <= 0) {
            newErrors.price = 'Price must be greater than 0';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (isEditMode) {
            updateProduct(Number(productId), form).then(() => {
                navigate('/');
            }).catch((error: Error) => {
                alert('Error updating product: ' + error.message);
            });
        } else {
            createProduct(form).then(() => {
                navigate('/');
            }).catch((error: Error) => {
                alert('Error creating product: ' + error.message);
            });
        }
    };

    const handleAddReview = () => {
        setRefreshReviews(!refreshReviews);
    }
    return (
        <div>
            <h2>{isEditMode ? 'Modifier un produit' : 'Créer un nouveau produit'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Nom:
                        <input type="text" name="name" value={form.name} onChange={handleChange} />
                    </label>
                    {errors.name && <span>{errors.name}</span>}
                </div>
                <div>
                    <label>
                        Prix:
                        <input type="number" name="price" min={0} step="any" value={form.price} onChange={handleChange} />
                    </label>
                    {errors.price && <span>{errors.price}</span>}
                </div>
                <Button label={isEditMode ? 'Modifier' : 'Créer'}></Button>
            </form>
                <h3 className='mt-4'>Avis</h3>

                <AddProductReviews productId={Number(productId)} onAdd={handleAddReview}></AddProductReviews>
                <hr />
                <ProductReviews productId={Number(productId)} refresh={refreshReviews}></ProductReviews>

        </div>
    )
}



export default ProductForm