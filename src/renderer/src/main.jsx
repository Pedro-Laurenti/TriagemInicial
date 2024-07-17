import '@renderer/assets/main.scss'
import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <div id="pdfContent">
            <App />
        </div>
    </React.StrictMode>
)
