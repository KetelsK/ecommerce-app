import { useState } from "react";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { createProductReview, ProductReview } from "../../services/productReview-api";
import StarRating from "../../components/StarRating";

type Props = {
    productId: number;
    onAdd: () => void;
}
const AddProductReviews = (props: Props) => {
    const [reviewText, setReviewText] = useState(""); // variable liée au textarea
    const [rating, setRating] = useState(0)
    const { user } = useAuth()
    const userId = user?.id;


    const handleAddReview = () => {
        const newProductReview: ProductReview = {
            review: reviewText,
            rating: rating,
            userId: userId!,
            productId: props.productId
        }
        createProductReview(newProductReview).then(() => {
            props.onAdd();
        }).catch((error: Error) => {
            alert(error);
        })
    }
    return (
        <div>
            <StarRating rating={rating} setRating={setRating}></StarRating>
            <textarea className="form-control mt-2 mb-2" id="add-product-review" rows={3} onChange={e => setReviewText(e.target.value)}></textarea>
            <Button label={'Ajouter un avis'} onClick={() => handleAddReview()} />
        </div>
    )
}

export default AddProductReviews;