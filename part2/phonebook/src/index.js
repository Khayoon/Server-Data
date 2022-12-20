import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'
import './index.css'


//React 18 render syntax 
const rootElement  = document.getElementById('root');
const root = createRoot(rootElement );
root.render(<App/>);
