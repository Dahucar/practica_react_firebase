# Configuracón necesaria para trabajar con Redux.
> Instalaciones necesarias.

> [Redux](https://es.redux.js.org).

> [React Redux](https://react-redux.js.org).

## Paso 1. crear un reducer.
- Este reducer es una funcion pura de JavaScript el cual evalua diferentes casos por medio de los paramtros de la funcion que creare. ejemplo.
    ```
    export const authReducer = ( state = { uid: 123 }, action ) => {
        switch ( action.type ) {
            case types.login:
                return {
                    uid: action.payload.uid,
                    name: action.payload.displayName
                }
            case types.logout:
                return { }
            default:
                return state;
        }
    }
    ```
    donde mi constante authReducer menejara un estado y las diferentes acciones que podra evaluar. 
    en este caso las acciones vienen dadas por otro archivo que simplemente es un objeto con dos propiedades "login" y "logout". de esta forma evito posible fallos de escritura al evaluar las acciones en la funcion anterior.
    ```
    export const types = {
        login: '[AUTH] Login',
        logout: '[AUTH] Logout'
    }
    ```
    
## Paso 2. crear un Store (fuente unica de la verdad) con todos mis reducers.  
- Este "Store" seŕa el encargado de masificar la información dada a el a todos los componentes que se encuentren bajo su gerarquia. Esta gerarquia estará dada por un Provider el cual resivirá como parametro mi Store. (Esto se vera más adelante)
- Para la configuración inicial se deben importar las siguientes funciones desde redux.

    ```
    import { combineReducers, createStore } from 'redux';
    ```
- con "createStore": podre crear un store el cual contendra mi reducer, el cual debere importar. por defecto solo puedo tener un reducer en mi store. pero en conjunto con combineReducers podre tener tantos como quiera.
- con "combineReducers": podre agrupar tantos reducers como necesite mediante la creacion un objeto en JavaScript el cual tendra dentro de si el listado de todos mis reducers. 
    ```
    const reducers = combineReducers({
        auth: authReducer
    });
    ```
- por ello en la creacion de mi store, le pasare por parametro el listado de reducers que usare. 
    ```
    export const store = createStore(
        reducers,
        // Instrucción necesaria para ver panel de redux en navegador chrome / opera
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    ```
- para efectos de prueba se añade la siguiente instruccion que permite visualizar el estado de mi redux en general en las herramientas de desarrollo en el navegador.
    ```
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ```

## Paso 3. crear un Provider para compartir mi store a mis componentes.
- Para ello dentro de alguno de los componentes padres de la app debere añadir la importacion del provider desde redux.
    ```
    import { Provider } from 'react-redux'

    ```
    el cual envolvera todos mis componentes junto con el store que he creado y que igualmente debere importar para usar correctamnte. 
    ```
    <Provider store={ store } >
            <AppRouter />
    </Provider>
    ```
    donde por parametros o props en React le pasare mi store.
    Añadir que la creacion de provider debe ser en la posicion mas alta dentro de la gerarquia de componentes (claro, en caso de ser esa la necesisdad de alcanze de la informacion, por que puede ser donde yo estime conveniente) pero en este caso mi store sera compartido con AppRouter que contien mi sistema rutas en la app, de esa forma todas las rutas podra acceder a los datos que poseea el store mediante el "disparo" de acciones.

## Paso 4. Crear y "Disparar" aciones hacia mi Store

- Primero que nada, mediante una accion voy a enviar los datos que reciva por parametros hacia mi store, esto será mediante el retorno de los datos enviados en esta funcion pero aplicando el formato que necesita resivir en mi reducer. que sera la accion definida en el. recordando que la accion tiene un tipo, y el contenido "payload"
    ```
    import { types } from "../types/types"

    export const login = ( uid, displayName ) => ({
        type: types.login,
        payload: {
            uid,
            displayName
        }        
    })
    ```
    Por ello los componentes podran dispara acciones, y en este caso será por medio del hook useDispatch, el cual se debera importar
    ```
    import { useDispatch } from 'react-redux'
    ```
    Una vez importado se pondrá en uso mediante la siguiente instrucción.
    ```
    const dispatch = useDispatch();
    ```
    de esta forma se realizará la prueba desde el LoginScreen por medio del evento submit del formulario, donde esta en uso el hook "dispatch", el cual esta reciviendo como parametro la accion creada anteriomente.
    ```
    const handleLogin = (e) => {
        e.preventDefault();
        console.log(email, password);
         dispatch( login(123456, 'Daniel') );
    }
    ```



