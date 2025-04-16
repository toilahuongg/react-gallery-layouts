import React from 'react';
import { createRoot } from 'react-dom/client';
import ExampleGallery from './ExampleGallery';
import './dev.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <ExampleGallery />
  </React.StrictMode>
); 