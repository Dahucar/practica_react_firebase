import React from 'react'
import { NotesScreen } from '../notes/NotesScreen'
// import { NothingsSelected } from './NothingsSelected'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {
    return (
        <div className="journal__main-content">
            <Sidebar />
            <main>
                {/* <NothingsSelected /> */}
                <NotesScreen />
            </main>
        </div>
    )
}
