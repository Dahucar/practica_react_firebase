import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';   
import validator from 'validator';
import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import { startRegister } from '../../actions/auth';

export const RegisterScreen = () => {
    // Necesito traer informacion de mi state. para ello uso el hook useSelector
    const { msgError } = useSelector( state => state.ui );

    // hook para el disparo de acciones
    const dispatch = useDispatch();

    // Tarea: obtener datos del formulario.
    // Campos llenos por defecto para no tener que escribirlos de nuevo.
    const [ values, handleInputChangue ] = useForm({
        name: 'Daniel',
        email: 'danielhuenul80@gmail.com',
        password: '123456789',
        password2: '123456789'
    });
    const { name, email, password, password2 } = values;

    // usar customHook useForm.
    // crear funcion handleRegister.
    //imprimir de manera independiente los datos del forma independiente.

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch( startRegister( email, password, name ) );
        } 
    }

    // Tarea: 
    /*
        hacer dispatch a mi store con el mensaje de error ( que salga en el state )
        si todo pasa el eeror debe removerse.
    */
    const isFormValid = () => {
        if ( name.trim().length === 0 ) {
            dispatch( setError( 'Name is required' ) );    
            return false;
        }else if( !validator.isEmail( email ) ){
            dispatch( setError( 'Email is not valid' ) );    
            return false;
        }else if( password !== password2 || password2.length < 5){
            dispatch( setError( 'Password invalid' ) );    
            return false;
        }

        // disparando mi accion.
        dispatch( removeError() );

        return true;
    }

    return (
        <>
            <h3 className="auth__title">Registro</h3>
            <form onSubmit={ handleRegister }>
                {
                    msgError && 
                    (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
                }
                <input 
                    className="auth__input" 
                    type="text" 
                    placeholder="Name" 
                    name="name"
                    value={ name }
                    onChange={ handleInputChangue }
                    autoComplete="off" 
                />
                <input 
                    className="auth__input" 
                    type="text" 
                    placeholder="Email" 
                    name="email"
                    value={ email }
                    onChange={ handleInputChangue }
                    autoComplete="off" 
                />
                <input 
                    className="auth__input" 
                    type="password" 
                    placeholder="Password" 
                    name="password" 
                    value={ password }
                    onChange={ handleInputChangue }
                    autoComplete="off"
                />
                <input 
                    className="auth__input" 
                    type="password" 
                    placeholder="Confirm password" 
                    name="password2" 
                    value={ password2 }
                    onChange={ handleInputChangue }
                    autoComplete="off"
                />
                <button 
                    type="submit" 
                    className="btn btn-primary btn-block mb-5"
                >
                    Ingresar
                </button>
                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>
            </form>
        </>
    )
}
