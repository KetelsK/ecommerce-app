import { useEffect, useState } from "react";
import { getProductReviews, ProductReview } from "../../services/productReview-api";
import StarRating from "../../components/StarRating";

type Props = {
    productId: number;
    refresh: boolean;
}

const ProductReviews = (props: Props) => {
    const productId = props.productId;
    const [productReviews, setProductReviews] = useState<ProductReview[]>([]);

    useEffect(() => {
        getProductReviews(Number(productId)).then((productReviews: ProductReview[]) => {
            setProductReviews(productReviews);
        }).catch((error: Error) => {
            alert('Error fetching product reviews: ' + error.message);
        })
    }, [productId, props.refresh])

    return (
        <div>
            {productReviews?.length > 0 ?
                productReviews.map((review) => (
                    <div>
                        <StarRating isFixed={true} rating={review.rating}></StarRating>
                        <b>{review.userId}</b>
                        <p>{review.review}</p>
                    </div>
                ))

                :
                <span>Pas encore d'avis pour ce produit</span>
            }
        </div>

    )
}

export default ProductReviews;