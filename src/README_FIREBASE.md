# Crear un inicar sesion con Google y Firebase.

## Paso 1. Tener acceso a consola de firebase y crear un proyecto.
- una vez alli se debe accder a la "Descripción general del proyecto" e iniciar un proyecto web. Esto nos dara acceso a las keys para iniciar la configuracion. la cual quedaría de la siguiente forma.

- Importaciones. una vez instalada la depencia de firebase. en un archivo destinado exclusivamente para la conexion a la base de datos y backend en general se deberán añadir las siguientes lineas.

    ```
    import firebase from 'firebase/app';
    import 'firebase/firestore';
    import 'firebase/auth';
    ```
    donde usaremos la autenticacion, conexion con la base de datos.
- Congiuracion del CDN de firebase. este se obtiene desde el apartado del proyecto web, en la consola.
    ```
    const firebaseConfig = {
        apiKey: "****",
        authDomain: "****",
        projectId: "****",
        storageBucket: "****",
        messagingSenderId: "****",
        appId: "****",
    };
    ```
- Y finalmente creamos una varible para almacenar la referencia a la base de datos, e igualmente estableceremos la autentificacion con googl (que sería lo mismo para cualqueier otra red social.), y claro se exportan toda las varibles para usarlas fuera del archivo. 
    ```
    const db = firebase.firestore();
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

    export {
        db,
        googleAuthProvider,
        firebase
    }
    ```

## Paso 2. "Disparar" una accion asincrona para realizar el login con google usando firebase.

- Primero que nada. mediante una funcion que retorna un callback que recordando el parametro de dicho callback (el dispatch) será proporcionado por Redux Thunk (que permite disparar las acciones asincronas). y aqui se usan las varibles que se exportaron en el paso anterior. donde mediante firebase accederemos al los metodos de autenticacion que en este caso sera por medio de signInWithPopup, que mostrar una ventana emergente para seleccionar una cuenta de google.

    Comentar que resultado de esta accion obtendremos un objeto con varidos datos pero el que importa para esta ocacion es el user que tendra informacion como el nombre y UID que usaremos en esta app.
    Lugo mediante el dispatch obtenid del parametro de la instruccion return enviaremos esta accion a mi store con los datos obtenidos durante el inicio de sesion. 
    Donde al dispatch le pasamos el resultado de la funcion login la cual aplica el formato a los datos pasados a ella. (Recordar: recive un type: String y un payload: Objeto con todos los datos a enviar.)
    ```
    import { firebase, googleAuthProvider } from '../firebase/  firebase-config';   

    export const startGoogleLogin = () => {
        return ( dispatch ) => {
            firebase.auth().signInWithPopup( googleAuthProvider )
                .then( ({ user }) => {
                    console.log( user );
                    dispatch( login( user.uid, user.displayName ) );
                });
        }
    }
    ```

    Ahora bien dentro del LoginScreen usare esta funcion para que sera activada por medio del boton dispuesto para iniciar con google.
    
    Donde el dispatch es el hook usado para disparar mis acciones y el startGoogleLogin es la funcion creada antes que igualmente debere importar.
    ```
    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }
    ```

## Crear cuenta de usuario con email y password usando Firebase.
- Primero que nada dentro de mis acciones creare una nueva accion asincrona, donde mediante los datos obtenidos de mi formulariod de registro guardare al usuario en firebase.

    ```
    export const startRegister = ( email, password, name ) => {
        return ( dispatch ) => {
            firebase.auth().createUserWithEmailAndPassword( email, password )
                .then( async ({ user }) => {
                    await user.updateProfile({ displayName: name });
                    console.log( user );
                    dispatch( login( user.uid, user.displayName ) );
                })
                .catch( err => {
                    console.log( err );
                });
        }
    }
    ```
    donde esta funcion recive los datos del formulario y luego como es una accion asincrona rebera tener el retorno de un callback donde será Redux Thunk en elcargado de proporcionarme el "dispatch" de mi callback

    Luego usando el sistema autentificación de firebase creare mi usuario mediante la funcion "createUserWithEmailAndPassword" donde esta devolvera una promesa por ende, mediante el THEN enviare otra accion asincrona que actualize los datos del usuario, esto para establecer el "displayName" y al tener varias peticiones usaremos las propiedades async y await para realizar estas en cadena. 

    Finalmente se hará el dispatch con las propiedades ya mencionadas donde es login el encargado de aplicar el formato de los datos con el type: String y el payload: Object. para que dispatch lo envia a mi store.

- Claro por ultimo esto debe de importar en el componente desea, donde ya debe estar en uso el hook "useDispatch", para que simplemente tengamos que llamar a la confion construida en el paso asnteior.

    ```
    dispatch( startRegister( email, password, name ) );
    ```

## Iniciar sesion con email y password en firebase.
- primero que nada dentro de mis acciones debere crear una muy similar a la anteior mostrada. Donde esta accion sera asincrona por ende debera tener el retorno del callback donde Redux Thunk sera en encargado de porporcionarm el "dispatch", de esta forma la funcion se veria de la siguiente forma.

    ```
    export const startLoginEmailPassword = (email, password) => {
        return ( dispatch ) => {
            firebase.auth().signInWithEmailAndPassword( email, password )
                .then( ({user}) => {
                    dispatch( login( user.uid, user.displayName ) );
                })
                .catch(err => {
                    console.log(err);
                });  
        }
    }
    ```
    donde por parametro el pasaré el emaul y password del formulario y el callback tendra el sistema de autenticacion de firebase donde este responde con una promesa por ende una vez esta se resuelva enviara el dispatch con la funcion login que aplica el formato ya mencionado.

    Ahora dentro del componente desea se debera importar esta funcion y pasar los datos necesarios, donde el dispatch de esta ocasion es el correspondiente a el hook para disparar las acciones.
    ```
    dispatch( startLoginEmailPassword(email, password) );
    ```

## Cerrar sesion con Firebase.
- una vez que ya se ha inicado sesion y que los datos han sido persistidos dentro de la app, de forma que no se pierdan los datos al recargar el navegador, prosigue la construccion de la accion que purgue los datos mencionados.
    ```
    export const startLogout = () => {
        return  async ( dispatch ) => {
            await firebase.auth().signOut();
            dispatch( logout() );
        }
    }
    ```
    donde voy a tener una funcion que retorna un callback ya que esta accion es asincrona debido a que debe verificar mediante mi varible firebase (que se configuro en /firebase-config.js) llamare a la funcion signOut.

    De esta forma podre llamar al dispatch una vez finalizada la consulta o peticion anterior donde voy a enviar un objeto con el type logout (que le indicara a mi reducer que debe establecer a vacios los datos del state de este) 

    Dicha funcion opera de la forma que login, de forma que aplica formato a un objeto para que se envia a mi reducer.
    ```
    export const logout = () => ({
        type: types.logout
    })
    ```
- De esta forma, debere importar la funcion con el deslogeo de firebase que se contruyo en alguno de mis componentes, en este caso en mi Sidebar, donde tengo un boton para el logout

    por ello debere de usar el hook useDispatch que me permite realizar el disparo de acciones hacia mi reducer y  claro crear una funcion handle para el evento del logout donde simplemente se dispara la accion con la funcion que contiene el logout de firebase.
    De la siguiente forma.
    ```
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch( startLogout() );
    }
    ```

## Guardar datos de user logeado mediante funcionalidad de Firebase y Hooks useEffect.
- Dentro de mi conponente destinado a la gestion de rutas, en este caso el AppRouter voy a tener que agregar tanto la importacion del hook "useDispatch" de react-redux, como tambien mi accion de "login" para poder enviar los datos obtenidos con el formato correcto. Además de mi configuracion de Firebase para conectar con los datos de mi proyecto (Backend) por ende las importaciones son. 
    ```
    import { firebase } from '../firebase/firebase-config';
    import { useDispatch } from 'react-redux';
    import { login } from '../actions/auth'
    ```

- Luego mediante el hook useEffect que tambien debere importan creare un efecto el cual se activara cada vez que se inicie el componente. Pero para ello antes deberé haber creado mi varible para tener acceso al dispatch correcpodiente a mi hook, en este caso
    ```
    const dispatch = useDispatch();
    useEffect(() => {
        firebase.auth().onAuthStateChanged(( user ) => {
            if (user?.uid) {
                dispatch( login( user.uid, user.displayName ) );
            }
        });
    }, [ dispatch ]);
    ```

    donde tendre un efecto que se activara al iniciar el componente como tambien cuando cambie el valor o estao de "dispatch".

    Por ende dentro del efecto estara la funcion que permite obtener el usuario con su sesion iniciada. por ello debere tener la importacion de mi configuracion de Firebase ya que la varible corresponde a la exportada en dicha configuracion. 

    La funcion "onAuthStateChanged" me regresara un Observable que es un objeto que estara al pendiente de los cambios en la varible user en la funcion anonima, de esta forma hay tendre todos los datos del usuario, que en caso de no haberlo regresara null, por ello verificamos si la propiedad uid existe y en caso de serlo disparamos la accion que en este caso envia los datos obtenidos medainte el login, que aplica el formato a los datos correspondiendo con mi state(type: String, payload: Object)
