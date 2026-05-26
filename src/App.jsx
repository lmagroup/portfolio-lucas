import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LazyMotion, domAnimation } from 'framer-motion'
import { router } from './routes'

// LazyMotion avec domAnimation réduit le chunk framer-motion
// en excluant les features non utilisées (drag, layoutId, etc.)
export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </LazyMotion>
  )
}
