import React from 'react';

// Provider: este provee la información dada en la propiedad "store" del mismo a todos los componentes 
// bajo su gerarquia. en este caso mi store.js
import { Provider } from 'react-redux'

import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';


export const JournalApp = () => {
    return (
        <Provider store={ store } >
            <AppRouter />
        </Provider>
    )
}
