// Importante: para que mi app sepa que tiene un store (fuente unica de la verdad)
// hay que importarla en el componente que derive a las demás jerarquias de componentes 
// en este caso (JournalApp), ya que tiene todo el sistema de rutas y por ende los componentes.

// Será la fuente de obtención de todos los datosde la app
import { combineReducers, createStore } from 'redux';
import { authReducer } from '../reducers/authReducer';

// para manejar varios reducers usaremos combineReducers
const reducers = combineReducers({
    auth: authReducer
});

// por defecto solo puedo enviar un solo reducer. en este caso mi authReducer
// con la instruccion anterior se podrán menejar tantos como sean necesarios.
export const store = createStore(
    reducers,
    // Instrucción necesaria para ver panel de redux en navegador chrome / opera
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);