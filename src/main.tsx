import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import stores, { StoreContext } from './stores'

ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider value={stores}>
      <App />
    </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
