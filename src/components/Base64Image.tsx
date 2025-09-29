type Props = {
    src: string;
    alt: string;
    style?: React.CSSProperties;
    className?: string;
}

const Base64Image = (props: Props) => {
    const src: string = props.src;
    const style: React.CSSProperties = props.style!;
    const className: string = props.className!;
    const alt: string = props.alt;

    return (
        <img src={src} style={style} className={className} alt={alt}></img>
    );
}

export default Base64Image;