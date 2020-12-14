import React from 'react';

// hook que permite disparar la accion hacia mi reducer
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector( state => state.ui )
    const [ values, handleInputChangue ] = useForm({
        email: 'danielhuenul80@gmail.com',
        password: '123456789'
    });
    const { email, password } = values;
    const handleLogin = (e) => {
        e.preventDefault();
        console.log(email, password);
        dispatch( startLoginEmailPassword(email, password) );
    }

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>
            <form onSubmit={ handleLogin }>
                <input 
                    className="auth__input" 
                    type="text" 
                    placeholder="email" 
                    name="email"
                    value={ email }
                    onChange={ handleInputChangue }
                    autoComplete="off" 
                />
                <input 
                    className="auth__input" 
                    type="password" 
                    placeholder="****" 
                    name="password"
                    value={ password } 
                    onChange={ handleInputChangue }
                    autoComplete="off"
                />
                <button 
                    type="submit" 
                    className="btn btn-primary btn-block"
                    disabled={ loading }
                >
                    Ingresar
                </button>
        
                <div className="auth__social-networks">
                    <p>Inciar con redes sociales.</p>
                    <div className="google-btn" onClick={ handleGoogleLogin }>
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to="/auth/register" className="link">
                    Crear nueva cuenta.
                </Link>
            </form>
        </>
    )
}
