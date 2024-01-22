import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Menu_bar from "./Menu_bar.tsx"
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Menu_bar />
    <App />
  </React.StrictMode>,
)
