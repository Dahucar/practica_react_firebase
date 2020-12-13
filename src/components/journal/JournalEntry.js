import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div 
                className="journal__entry-picture"
                style={{ 
                    background: 'cover',
                    backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo2wQhvlDKIHuh9S1xb8cxWOWGkd4_kEqa2g&usqp=CAU)'
                }}
            >
            </div>
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                  Un nuevo Día  
                </p>
                <p className="journal__entry-content">
                    Esse fugiat dolor laborum tempor incididunt.Esse fugiat dolor laborum tempor incididunt.
                </p>
            </div>
            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>
    )
}
