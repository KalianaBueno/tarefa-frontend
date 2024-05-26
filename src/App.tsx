import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import Header from './components/Header'

import AppRoutes from './routes';

const Routes: React.FC = () => {
    return(
        <BrowserRouter>
            <Header/>
            <AppRoutes/>
        </BrowserRouter>
    );
}

export default Routes; 