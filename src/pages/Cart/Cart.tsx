import { useSelector } from "react-redux";
import PageTitle from "../../components/PageTitle";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { getCart, Cart as CartInterface, deleteCart } from "../../services/cart-api";
import LoaderError from "../../components/LoaderError/LoaderError";
import './Cart.scss';
import Button from "../../components/Button";

const Cart = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const [cart, setCart] = useState<CartInterface[]>([]);

    const userId = useSelector((state: RootState) => state.auth.userId);
    useEffect(() => {
        getCart(userId).then(result => {
            setCart(result);
        }).catch(() => {

        })
    }, [])

    const handleDeleteCart = (id: number) => {
        setIsLoading(true);
        setIsError(false);
        deleteCart(id).then(() => {
            setCart(cart => cart.filter(cart => cart.id !== id));
            setIsLoading(false);
        }).catch(() => {
            setIsError(true);
        })
    }
    return (
        <>
            <PageTitle title="Mon panier" />
            <LoaderError isError={isError} isLoading={isLoading}></LoaderError>
            {cart.length == 0 ?
                <h5 className='mt-4'>Votre panier est vide</h5>
                :

                <div className="cart-container">
                    {cart.map(cart => (
                        <>
                            <div className="d-flex flex-row align-items-center">
                                <div>
                                    <img src={cart.product?.image} width={200}></img>
                                </div>
                                <div className="flex-grow-1">
                                    <span className="product-name">{cart.product?.name} </span>
                                </div>
                                <div className="ms-2 me-2 flex-grow-1">
                                    Quantité: {cart.count}
                                </div>
                                <div className="d-flex flew-row align-items-center">
                                    <div className="me-3">
                                        <span className="product-price">{cart.product?.price}€</span>
                                    </div>
                                    <div>
                                        <button className="btn btn-danger" onClick={() => handleDeleteCart(cart.id!)}>X</button>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </>
                    ))
                    }
                    <Button style={{ float: "right", paddingRight: "20px", paddingLeft: "20px" }} content="Payer"></Button>
                </div>
            }

        </>
    )
}

export default Cart;