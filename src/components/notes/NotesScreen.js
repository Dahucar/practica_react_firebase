import React from 'react'
import { NoteAppBar } from './NoteAppBar'

export const NotesScreen = () => {
    return (
        <div className="notes__main-content">
            <NoteAppBar />
            <div className="notes__content">
                <input 
                    type="text"
                    placeholder="Some awesome title"
                    autoComplete="off"
                    className="notes__title-input" 
                />
                <textarea 
                    placeholder="What happened today"
                    className="notes__textarea" 
                ></textarea>
                <div className="notes__image">
                    <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqDfxvLVXKHz-W7qO6Lb6rTLndq1eML9fZsQ&usqp=CAU"
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}
