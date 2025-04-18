import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth-context.tsx'
import {CssVarsProvider} from "@mui/joy";
import theme from "./theme.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <CssVarsProvider theme={theme}>
      <AuthProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
        </AuthProvider>
          </CssVarsProvider>
  </StrictMode>,
)
