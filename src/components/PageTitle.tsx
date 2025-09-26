const titleStyle: React.CSSProperties = {
    fontSize: '1.75rem',
    fontWeight: 500,
    marginBottom: '16px'
};

type Props = {
    title: string;
}

const PageTitle = (props: Props) => {
    const title = props.title;
    return (
        <h1 style={titleStyle}>{title}</h1>
    )
}

export default PageTitle;