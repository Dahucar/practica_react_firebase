import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { activeNotes, startDeleteNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NoteAppBar } from './NoteAppBar'

export const NotesScreen = () => {
    const dispatch = useDispatch();
    const { active:note } = useSelector(state => state.notes);

    const [ formValues, handleInputChangue, resetInputsValues ] = useForm( note );
    const { body, title } = formValues;
    const activeId = useRef( note.id );

    useEffect(() => {
        if ( note.id !== activeId.current ) {
            resetInputsValues( note );
            activeId.current = note.id;
        }
    }, [ note, resetInputsValues ]);

    useEffect(() => {
        dispatch( activeNotes( formValues.id, { ...formValues } ) );
    }, [ formValues, dispatch ]);

    const handleDeleteNote = () => {
        dispatch( startDeleteNote( formValues.id ) );
    }

    return (
        <div className="notes__main-content">
            <NoteAppBar />
            <div className="notes__content">
                <input 
                    type="text"
                    placeholder="Some awesome title"
                    autoComplete="off"
                    name="title"
                    value={ title }
                    onChange={ handleInputChangue }
                    className="notes__title-input" 
                />
                <textarea 
                    placeholder="What happened today"
                    className="notes__textarea"
                    name="body" 
                    value={ body }
                    onChange={ handleInputChangue }
                ></textarea>
                <div className="notes__image">
                {
                    ( note.url ) && (
                        <img 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqDfxvLVXKHz-W7qO6Lb6rTLndq1eML9fZsQ&usqp=CAU"
                            alt=""
                        />
                    )
                }
                </div>
            </div>
            <button 
                className="btn btn-block  btn-danger "
                onClick={ handleDeleteNote }
            >
                Eliminar
            </button>
        </div>
    )
}
