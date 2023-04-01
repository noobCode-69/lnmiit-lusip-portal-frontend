import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient , QueryClientProvider } from 'react-query'
import client from './queryClient'

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={client}>
        <App />
    </QueryClientProvider>
)
