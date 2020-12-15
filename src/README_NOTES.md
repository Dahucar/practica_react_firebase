# Descripción de tareas realizadas respecto al crud de notas hacia Firebase.

## Crear un reducer para manejar acciones del crud.
- Dentro de mi directorio de reducers, se creo un archivo, el cual contedrá las diferentes acciones que se podran realizar. exactamente igual a como se construyeron el resto de reducers en esta app.

    Cabe destacar que en este caso, la estructura del state cambia para poder almacenar los datos de un nota. de la siguiente forma.
    ```
    {
        notes: [],
        active: null,
        activeNote: {
            id: 'asd',
            title: '',
            body: '',
            imageUrl: '',
            date: ''
        }
    }
    ```

    Y el estado inicial o por defecto seria el siguiente.
    ```
    const initialState = {
        notes:[],
        active: null
    }
    ```

    Luego este reducer se importo dentro de mi store, dentro de la funcion combineReducers. De esta forma ya esta disponible al igual que el ui y auth reducer. 
    ```
    const reducers = combineReducers({
        auth: authReducer,
        ui: uiReducer,
        notes: notesReducer
    });
    ```
    Por ende dentro del JournalScreen se obtiene la informacion que por defecto se ha guardado, para determinar si hay notas seleccionadas.

## Insertar un registro en FireStore.
- Para trabajar de manera eficiente se agregaron nuevos tipos a mi varible types. estas estan asociadas con el crud a realizar con las notas en la app.
- Por ello igualmet se creó un nuevo archivo para manajar las diferentes acciones en este caso actions/notes.js. en dicho archivo se importo la varible con la referencia a la base de datos de firebase configurada en firebase-config.js .

    ```
    import { db } from "../firebase/firebase-config";

    export const startNewNote = () => {
        return async ( dispatch, getState ) => {
            const { uid } = getState().auth;
            const newNote = {
                title: '',
                body: '',
                date: new Date().getTime()
            }
            const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );
        }
    }
    ```

    **Destacar:** dentro del callback, como bien se mencionaba anteriormente el parametro dispatch será proporcionado por Redux Thunk en tiempo de ejeción, de la misma forma con el segundo parametro "getState" en este caso. (Recordar: los nombres de parametro en el callback puende tener cualquier nombre, pero el orden en que se agregan NO se puede alterar. El primero hace refencia a la accion de "disparar" o "despachar" acciones hacia mi reducer. El segundo hace refencia a la obtencion del estado actual de mi store, esto incluye el conjunto de reducers que yo halla configurado, en funcionamiento es similar al useSelected, pero aquí esta porporcionado por Redux Thunk) 

    Y claro mediante la obtencion de los datos de mi store obtendre los datos asociados con al autenticacion mediante el "auth" en esta app.

    El resto correcponde con el proceso de guardado de datos que maneja firebase. 

- Una vez en el componente donde aplicar esta accion use el hook useDispatch para realizar el dispara de la accion hacia mi reducer y store respectivamente, como bien se ha mostrado en otras oportunidades. Pero claro habiendo importado esta nueva accion "startNewNote". 
    
    **Recordar:** en esta accion aún no se hace un dispatch, solo se guardo un dato para fines de practica.

## Haciendo dipatch de accion de guardado hacia FireStore.
- Para enviar los datos que en el paso anterior se configurarón se ha creado una nueva accion sincrona la cual simplemente aplica el formato correcto para que esta sea enviada a al recider. donde por parametro recivimos el id del la nota y el contenido de la misma. Por ende en retorno indicamos el tipo de accion que es (type: String) y el el contenido (payload: Object) por el objeto de la nota no esta dado directamente, si no que mediante el operador spread obtenemos el contendio y lo aplicamos. Haci rompemos la relacion por derefencia de los objetos, por tanto serán elementos individuales.
    ```
    export const activeNotes = ( id, note ) => ({
        type: types.notesActive,
        payload: {
            id,
            ...note
        }
    })
    ```

    debido a esto a la funcion del paso anterior se le añade el dispatch correspondiente, donde se usa la funcion activeNotes para aplicar el formato.
    ```
    dispatch( activeNotes( doc.id, newNote ) );
    ```

    Debido a todo lo anterior, es presizo contar con un nuevo caso en mi reducer. Donde voy a modificar mi estado inicial, por ello esta mediante el operador spread voy a extraer todas las propiedades que este tenga anteriormente y será la propiedad "active" que voy a modifcar, estableciendo el valor que en la accion se haya enviado.
    
    **usamos el operador spread para:** romper las relaciones por refencia y tener SIEMPRE un valor indpendiante, de forma que no se valla a modficar en algún otro pundo de mi app debido a que su posible relacion por el sector de memoria al que apuntan.
    ```
    export const notesReducer = ( state = initialState, action ) => {
        switch ( action.type ) {
            case types.notesActive:
                return {
                    ...state,
                    active: {
                        ...action.payload
                    }
                }
            default:
                return state;
        }
    }
    ```

## Obtener notas desde FireStore
- Primero que nada, Creare un nuevo caso dentro de mi reducer, este evaluara la accion de carga de registros, por ende. Cuando se ejecute esta accion se retornara mi state con las propiedades que este tenia originalmente. mediante un spred del estado anterior y a la propiedad notes se le establecera el contendio que venga en el payload de la accion (en este caso un array de notas obtenidas desde firestore).  

    ```
    case types.notesLoad:
        return {
            ...state,
            notes: [ ...action.payload ]
        }
    ```

    Luego de tener listo mi caso. debere crear la accion, que será donde enviare el tipo (que debe ser el mismo del caso creado) y el payload (array de notas). Esta accion sepa sincrona, ya que solo va a establecer modificar el estado de mi reducer. **ACLARACIṔN: esto debiado a que no hare la carga de los datos en la accion como tal, si no que habra una encargada de obtenener los datos y esta funcion solo recivira los datos listos para trabajarlos**

    ```
    export const setNotes = ( notes ) => ({
        type: types.notesLoad,
        payload: notes
    }) 
    ```
    En tonces. esta accion resive un array (notas), donde lo que hara será retornar un objeto con el formato que necesita mi reducer, en este caso el tipo: String y el payload: array

    Las notas que se revicen por paremetro se obtendran de la siguiente forma. donde importare in varible DB de mis configuraciones de Firebase. y mediante las colecciones de firebase voy a buscar los registros que correspondan con el usuario autenticado actualamente.

    ```
    import { db } from "../firebase/firebase-config"

    export const loadNotes = async ( uid ) => {
        const notes = [];
        const notesSnap = await db.collection(`${ uid }/journal/notes`).get()      ;
    
        notesSnap.forEach( snapHijo => {
            notes.push({
                id: snapHijo.id,
                ...snapHijo.data
            });
        });
    
        return notes;
    }
    ```

    por ello esta funcion es asincrona, ya que las colecciones se trabajaran mediante solicitudes al backend. asi que una vez esta finalize, recore los valores obtenidos mediante foreach para almacenar todos los registro en un array final y retornarlo.

    Luego. dentro de mi efecto que detecta si el usuario esta autenticado mediante onAuthStateChanged, modificare el callback para que pueda trabajar con multiples acciones asincronas (async / await). Por ende la funcion que me permitia obtener un listado de notas tendra un await para que la ejecucion espere a que esta finalize u pueda obntener mi array,  de lo contrario obtendre una promesa.

    Y finalmente mediante el dispatch, disparare mi accion setNotas. y asi mi store tendra el listado de notas del usuario autenticado.
    ```
    useEffect(() => {
        firebase.auth().onAuthStateChanged( async ( user ) => {
            if (user?.uid) {
                dispatch( login( user.uid, user.displayName ) );
                setIsAuthenticated( true );
                const notes =  await loadNotes( user.uid );
                dispatch( setNotes( notes ) );
            }else{
                setIsAuthenticated( false );
            }
            setChecking( false );
        });
    }, [ dispatch, setChecking, setIsAuthenticated ]);
    ```

## Listando notas obtenidas en la vista y actualizar la nota activa.
- Dentro de mi JournalEntries voy a obtener el contenido de mi state, para usando el hook useSelector 

    ```
    const { notes } = useSelector(state => state.notes);
    ```
    y un vez teniendo los datos voy recorrerlos en la vista mediante la funcion map, donde le paso los datos obtenidos a otro componente.
    ```
    {
        notes.map( note => ( 
            <JournalEntry  
                key={note.id}
                { ...note }
            />
        ))
    }
    ```

    Luego dentro del componente JournalEntry. voy a establecerle los datos, de forma que estos se vean listados con los datos correspondientes. 
    ```
    export const JournalEntry = ({ id, date, title, body, url }) => 
    ```

    Donde este igualmente tendra el hook useDispatch para dispara las acciones, que en este caso corresponden con establecer la nota selecionada a mi store.

    ```
    const handleActiveNote = () => {
        dispatch( activeNotes( id, { date, title, body, url } ) );
    }
    ```

    donde la funcion anterior se asocia a un contendor que al pulsar sobre el establecera los nuevos a mi reducer.

    **Obtener nota activa de mi store:** Para ello dentro de mi NoteScreen voy a obtener los datos de mi store, usando claro el hook useSelected mediante el cual solo quiere obtener la informacion correspondiente al reducer note.
    ```
    const { active:note } = useSelector(state => state.notes);
    ```

    Y usando un custom hook voy a guardar los cambios que se hagan en esos datos del formulario.
    ```
    const [ formValues, handleInputChangue, resetInputsValues ] = useForm( note );
    const { body, title } = formValues;
    ```
    y claro los datos se asociaran a los campos del formulario. 

## **IMPORTANTE: Como actualizar el estado usando useEffect en un customHook**
- directamente relacionado al punto anterior necesito poder actuaizar el contenido que evalua mi custom hook cada vez que se selecciona un elemento diferentes en el JournalEntries, para ello dentro del NotesScreen voy a guardar la refencia de la altima nota seleccionada, esto mediante el hook useRef. guardado el valor del id de la nota.

    ```
    const activeId = useRef( note.id );

    useEffect(() => {
        if ( note.id !== activeId.current ) {
            resetInputsValues( note );
            activeId.current = note.id;
        }
    }, [ note, resetInputsValues ]);
    ```

    Por ello mediante el hook useEffect voy usar la funcion que retorna mi custom hook cada vez que se detecte que el valor id a cambiado, por ello comparo dentro del if si el id nuevo es diferente al que se tenia guardado. de ser cierto cambío de mi custom hook y extablesco el nuevo id a guardar.
