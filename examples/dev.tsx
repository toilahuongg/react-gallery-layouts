import React from 'react';
import { createRoot } from 'react-dom/client';
import ExampleHoverDir from './components/ExampleHoverDir';
import './dev.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <ExampleHoverDir />
  </React.StrictMode>
); 