import React, { useEffect, useState } from 'react'
import { createProduct, getProductById, Product, updateProduct } from '../../services/product-api';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import AddProductReviews from './AddProductReview';
import ProductReviews from './ProductReviews';
import PageTitle from '../../components/PageTitle';
import LoaderError from '../../components/LoaderError/LoaderError';
import Base64Image from '../../components/Base64Image';

const ProductForm = () => {
    const [form, setForm] = useState<Product>({ name: '', price: '', image: '' })
    const [errors, setErrors] = useState<{ name?: string, price?: string }>({});
    const [refreshReviews, setRefreshReviews] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    const { id: productId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditMode = !!productId;

    useEffect(() => {
        if (isEditMode && productId) {
            getProductById(Number(productId)).then(product => {
                setForm(product);
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
        setIsError(false);
        setIsLoading(true);
        if (isEditMode) {
            updateProduct(Number(productId), form).then(() => {
                setIsLoading(true);
                navigate('/');
            }).catch(() => {
                setIsError(true);
            });
        } else {
            const newProduct: Product = {
                name: form.name,
                price: form.price,
                image: form.image && form.image != '' ? form.image : undefined
            }
            createProduct(newProduct).then(() => {
                setIsLoading(true);
                navigate('/');
            }).catch(() => {
                setIsError(true);
            });
        }
    };

    const handleAddReview = () => {
        setRefreshReviews(!refreshReviews);
    }
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && (file.type === "image/png" || file.type === "image/jpg" || file.type === "image/jpeg")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm(prevForm => ({
                    ...prevForm,
                    image: reader.result as string
                }));
            };
            reader.readAsDataURL(file);
        }
    }
    return (
        <div className='product-form-page'>
            <PageTitle title={isEditMode ? 'Modifier un produit' : 'Créer un nouveau produit'} />
            <LoaderError isError={isError} isLoading={isLoading} errorMessage={errorMessage} />
            <form onSubmit={handleSubmit} className='form-container'>
                <div>
                    <label htmlFor="name">Nom</label><br />
                    <input type="text" className='form-control' id="name" name="name" required value={form.name} onChange={handleChange} />
                    {errors.name && <span>{errors.name}</span>}
                </div>

                <div>
                    <label htmlFor="price">Prix</label><br />
                    <input type="number" className='form-control' min={0} step="any" value={form.price} id="price" name="price" required onChange={handleChange} />
                    {errors.price && <span>{errors.price}</span>}
                </div>

                {form.image && form.image.length > 0 && (
                    <div>
                        <Base64Image src={form.image!} alt="Aperçu"
                            style={{ maxWidth: "200px" }}></Base64Image>
                    </div>
                )}

                <div>
                    <label htmlFor="image">Image</label><br />
                    <input type="file" className='form-control' accept='image/png, image/jpeg, image/jpg' id="image" name="image" onChange={handleFileChange} />
                </div>

                <Button label={isEditMode ? 'Modifier' : 'Créer'} style={{ marginTop: '12px' }}></Button>
            </form>
            {isEditMode && (
                <>
                    <h3 className='mt-5'>Avis</h3>

                    <AddProductReviews productId={Number(productId)} onAdd={handleAddReview}></AddProductReviews>
                    <hr />
                    <ProductReviews productId={Number(productId)} refresh={refreshReviews}></ProductReviews>
                </>
            )}
        </div>
    )
}



export default ProductForm