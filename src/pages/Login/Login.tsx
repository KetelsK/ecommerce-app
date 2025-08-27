import React, { useState } from 'react'
import Button from '../../components/Button'
import './Login.css'
import api from '../../services/product-api'
import { useNavigate } from 'react-router-dom'

type Props = {}

const Login = (props: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isRegisterForm, setIsRegisterForm] = useState(false);

    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Handle login 
        api.post('/auth/login',
            {
                email, password
            }
        ).then(() => {
            navigate('/');
        }).catch(error => {
            console.log(error)
        })
    }

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        // Handle registration
        api.post('/auth/register',
            {
                email, password
            }
        ).then(() => {
            navigate('/');
        }).catch(error => {
            console.log(error)
        })
    }

    const handleForgotPassword = () => {
        // Handle forgot password
    }
    return (
        <form action="post" className="form-container" onSubmit={isRegisterForm ? handleRegister : handleLogin}>
            <div>
                <label htmlFor="username">Email</label><br />
                <input type="text" className='form-control' id="username" name="username" required onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mt-2">
                <label htmlFor="password">Mot de passe</label><br />
                <input type="password" className='form-control' id="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-check mt-2 cursor-pointer">
                <input className="form-check-input cursor-pointer" type="checkbox" value="" id="flexCheckDefault" />
                <label className="form-check-label cursor-pointer" htmlFor="flexCheckDefault">
                    Se souvenir de moi
                </label>
            </div>

            <Button label={isRegisterForm ? 'Créer un nouveau compte' : 'Se connecter'} style={{ marginTop: '12px', width: '100%' }}></Button>


            {!isRegisterForm && (
                <>
                    <label className='forgot-password' onClick={() => handleForgotPassword()}>Mot de passe oublié ?</label>
                    <Button label="Créer un nouveau compte"
                        style={{ marginTop: '12px', width: '100%', backgroundColor: 'green', border: 'none' }}
                        onClick={() => setIsRegisterForm(true)}
                    />
                </>
            )}
        </form >
    )
}

export default Login