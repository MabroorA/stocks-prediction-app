import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Menu from "./Components/Menu.tsx"
import './index.css'
import ApiCall from './Components/ApiCall.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Menu/>
    <ApiCall/> */}
    <App />
  </React.StrictMode>,
)
