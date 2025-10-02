import React, { useState } from 'react'
import Button from '../../components/Button'
import './Login.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { login } from '../../store/authSlice'
import { authLogin, authRegister, User } from '../../services/auth-api'
import { useAuth } from '../../context/AuthContext'
import LoaderError from '../../components/LoaderError/LoaderError'
import { AxiosError } from 'axios'


const Login = () => {
    const [form, setForm] = useState<User>({ email: '', password: '' })
    const [rememberMe, setRememberMe] = useState(false);
    const [isRegisterForm, setIsRegisterForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const { setNewAuthContext } = useAuth()

    const dispatch = useDispatch<AppDispatch>();

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: type === 'number' ? (value === '' ? '' : parseFloat(value)) : value,
        }));
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setIsError(false);
        setErrorMessage('');

        authLogin(form).then((result) => {
            dispatch(login(result.data.access_token));
            setNewAuthContext(result.data.access_token);
            setIsLoading(false);
            navigate('/');
        }).catch((error: AxiosError<{ message: string }>) => {
            setIsError(true);
            setIsLoading(false);
            setErrorMessage(error.response?.data?.message ?? 'Une erreur est survenue');
        });
    }

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setIsError(false);
        setErrorMessage('');

        authRegister(form).then((result) => {
            dispatch(login(result.data.access_token));
            setNewAuthContext(result.data.access_token);
            navigate('/');
        }).catch((error: AxiosError<{ message: string }>) => {
            setIsError(true);
            setIsLoading(false);
            setErrorMessage(error.response?.data?.message ?? 'Une erreur est survenue');
        });
    }

    const handleForgotPassword = () => {
        // Handle forgot password
    }
    return (
        <div className='login-page'>
            <LoaderError isError={isError} isLoading={isLoading} errorMessage={errorMessage} />
            <form action="post" className="form-container" onSubmit={isRegisterForm ? handleRegister : handleLogin}>
                <div>
                    <label htmlFor="email">Email</label><br />
                    <input type="text" className='form-control' id="email" name="email" required onChange={handleChange} />
                </div>
                <div className="mt-2">
                    <label htmlFor="password">Mot de passe</label><br />
                    <input type="password" className='form-control' id="password" name="password" required onChange={handleChange} />
                </div>
                <div className="form-check mt-2 cursor-pointer">
                    <input className="form-check-input cursor-pointer" type="checkbox" value="" id="flexCheckDefault" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                    <label className="form-check-label cursor-pointer" htmlFor="flexCheckDefault">
                        Se souvenir de moi
                    </label>
                </div>

                <Button content={isRegisterForm ? 'Créer un nouveau compte' : 'Se connecter'} style={{ marginTop: '12px', width: '100%' }}></Button>


                {!isRegisterForm && (
                    <>
                        <label className='forgot-password' onClick={() => handleForgotPassword()}>Mot de passe oublié ?</label>
                        <Button content="Créer un nouveau compte"
                            style={{ marginTop: '12px', width: '100%', backgroundColor: 'green', border: 'none' }}
                            onClick={() => setIsRegisterForm(true)}
                        />
                    </>
                )}
            </form >
        </div>
    )
}

export default Login