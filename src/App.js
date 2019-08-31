import React from 'react';
import './App.scss';
import {AppHeader} from './components/AppHeader'
import {MarginalSidebar} from './components/MarginalSidebar'
import {Content} from './components/Content/Content'

function App() {
    return (
        <div className="App">
            <div className="Wrapper">
                <AppHeader/>
                <MarginalSidebar/>
                <Content/>
            </div>
        </div>
    );
}

export default App;
