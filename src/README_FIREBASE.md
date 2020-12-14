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
