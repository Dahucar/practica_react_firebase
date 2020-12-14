// Importante: para que mi app sepa que tiene un store (fuente unica de la verdad)
// hay que importarla en el componente que derive a las demás jerarquias de componentes 
// en este caso (JournalApp), ya que tiene todo el sistema de rutas y por ende los componentes.

// Será la fuente de obtención de todos los datosde la app
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';

// me permitira manejar o controlar el "disparo" de acciones asincronas hacia mi store
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';

// Habilita que tengamos las extenciones para DevTools
// Instrucción necesaria para ver panel de redux en navegador chrome / opera
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// para manejar varios reducers usaremos combineReducers
const reducers = combineReducers({
    auth: authReducer
});

// por defecto solo puedo enviar un solo reducer. en este caso mi authReducer
// con la instruccion anterior se podrán menejar tantos como sean necesarios.
export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);