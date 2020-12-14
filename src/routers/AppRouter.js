import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    // Route,
    Switch
} from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth'
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const [checking, setChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    console.log(isAuthenticated);
    // Firebase podra determinar cuando un usuario se encuentra logeado, por medio de 
    useEffect(() => {
        // devuelve un observable que estara pendiente a los cambios de la varible user.
        firebase.auth().onAuthStateChanged(( user ) => {
            // user puede ser null o un object
            if (user?.uid) {
                dispatch( login( user.uid, user.displayName ) );
                setIsAuthenticated( true );
            }else{
                setIsAuthenticated( false );
            }
            setChecking( false );
        });
    }, [ dispatch, setChecking, setIsAuthenticated ]);

    //aun no se obtiene el usuario logeado.
    if ( checking ) {
        return (
            <h2>Cargando...</h2>
        )
    }

    return (
        <Router>
            <div>
                <Switch>

                    {/* Las rutas del auth son para usuarios no logeados */}
                    <PublicRoute 
                        isAuthenticated={ isAuthenticated }
                        path="/auth"
                        component={ AuthRouter }
                    />

                    {/* las rutas del hournal son exclusivas para usuarios logeados */}
                    <PrivateRoute 
                        isAuthenticated={ isAuthenticated }
                        exact path="/"
                        component={ JournalScreen } 
                    />

                    {/* <Route path="/auth" component={ AuthRouter } /> */}
                    {/* <Route exact path="/" component={ JournalScreen } /> */}
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}
