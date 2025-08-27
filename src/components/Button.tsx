import React from 'react'

type ButtonProps = {
    label: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, style }) => {
    return <button className="btn btn-primary" onClick={onClick} style={style}>{label}</button>
}

export default Button