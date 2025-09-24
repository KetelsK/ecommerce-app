import React, { useEffect, useState } from 'react'
import starPath from '../assets/star.svg'
import starFilledPath from '../assets/star-filled.svg'

type Props =
    | {
        rating: number;
        setRating?: (value: number) => void;
        isFixed: true;
    }
    |
    {
        rating: number;
        setRating: (value: number) => void;
        isFixed?: false | undefined;
    }

const StarRating = (props: Props) => {
    const [stars, setStars] = useState([starPath, starPath, starPath, starPath, starPath]);
    const [initialStars, setInitialStars] = useState([starPath, starPath, starPath, starPath, starPath]);
    const [minValue, setMinValue] = useState(0);
    const rating: number = props.rating;
    const isFixedRating: boolean | undefined = props.isFixed;

    useEffect(() => {
        if (rating) {
            setStars(mapStars(rating - 1));
        }
    }, [rating]);

    const handleMouseEnter = (index: number) => {
        if (minValue <= index) {
            const newStars = mapStars(index); setStars(newStars);
        }
    }

    const handleMouseLeave = () => {
        setStars(initialStars);
    }

    const handleClick = (index: number) => {
        if (props.setRating) props.setRating(index + 1);
        setMinValue(index);
        const newStars = mapStars(index);
        setStars(newStars);
        setInitialStars(newStars);
    }

    const mapStars = (index: number) => {
        const newStars = stars.map((star, i) => (i < index + 1 ? starFilledPath : starPath));
        return newStars;
    }
    return (
        <div className={isFixedRating ? '' : 'cursor-pointer'}>
            {stars.map((star, index) => (
                isFixedRating ?
                    <img
                        style={{ width: '22px' }}
                        key={`star${index}`}
                        src={star}
                        alt={`star${index}`} />
                    :
                    <img
                        key={`star${index}`}
                        src={star}
                        alt={`star${index}`}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave()}
                        onClick={() => handleClick(index)} />
            ))}
        </div>
    )
}

export default StarRating