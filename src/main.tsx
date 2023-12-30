import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThirdwebProvider } from '@thirdweb-dev/react'
const clientId = '04647f0186f0602bb08fa659913a33d7'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThirdwebProvider activeChain="ethereum" clientId={clientId}>
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
)
