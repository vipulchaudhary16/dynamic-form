import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { DynamicInputProvider } from './context/dynamicInput.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DynamicInputProvider>
      <App />
    </DynamicInputProvider>
  </React.StrictMode>
);

