import React from 'react';
import { useSelector } from 'react-redux';
import { NotesScreen } from '../notes/NotesScreen';
import { NothingsSelected } from './NothingsSelected';
import { Sidebar } from './Sidebar';

export const JournalScreen = () => {

    const { active } = useSelector(state => state.notes);

    return (
        <div className="journal__main-content">
            <Sidebar />
            <main>
            {
                ( active )
                    ? ( <NotesScreen /> )
                    : ( <NothingsSelected /> )
            }
            </main>
        </div>
    )
}
