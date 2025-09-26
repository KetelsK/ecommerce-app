import './LoaderError.scss'

type Props = {
    isError: boolean;
    errorMessage?: string;
    isLoading: boolean;
}

const LoaderError = (props: Props) => {
    const error: boolean = props.isError;
    const loading: boolean = props.isLoading;
    const errorMessage: string = props.errorMessage && props.errorMessage != '' ? props.errorMessage : 'Une erreur est survenue'
    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                {errorMessage}
            </div>
        )
    }

    if (loading) {
        return <div className="loader"></div>;
    }

    return <></>
}

export default LoaderError;