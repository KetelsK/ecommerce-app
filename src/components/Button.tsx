import React, { JSX } from 'react'

type ButtonProps = {
    content: string | JSX.Element;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    style?: React.CSSProperties;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ content: content, onClick, style, className }) => {
    return <button className={`btn btn-primary ${className}`} onClick={onClick} style={style}>{content}</button>
}

export default Button