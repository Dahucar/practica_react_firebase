import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNotes } from '../../actions/notes';

export const JournalEntry = ({ id, date, title, body, url }) => {
    const dispatch = useDispatch();
    const noteDate = moment(date);

    const handleActiveNote = () => {
        dispatch( activeNotes( id, { date, title, body, url } ) );
    }

    return (
        <div 
            className="journal__entry pointer"
            onClick={ handleActiveNote }
        >
            {
                url && 
                <div 
                    className="journal__entry-picture"
                    style={{ 
                        background: 'cover',
                        backgroundImage: `url(${ url })`
                    }}
                >
                </div>
            }
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { title }
                </p>
                <p className="journal__entry-content">
                    { body }
                </p>
            </div>
            <div className="journal__entry-date-box">
                <span>{ noteDate.format('l') }</span>
            </div>
        </div>
    )
}
