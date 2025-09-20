import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DropZoneProvider } from './context/dropZone.jsx'

createRoot(document.getElementById('root')).render(
  <DropZoneProvider>
    <App />
  </DropZoneProvider>
)
