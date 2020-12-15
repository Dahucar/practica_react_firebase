import React from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote } from '../../actions/notes';

export const NoteAppBar = () => {
    const today = moment(new Date().getTime());
    const dispatch = useDispatch();
    const { active:note } = useSelector(state => state.notes);

    const handleSaveNote = () => {
        dispatch( startSaveNote(note) );
    }

    return (
        <div className="notes__appbar">
            <span>{ today.format('LL') }</span>
            <div>
                <button className="btn">
                    Picture
                </button>
                <button 
                    className="btn"
                    onClick={ handleSaveNote }    
                >
                    Save
                </button>
            </div>
        </div>
    )
}
