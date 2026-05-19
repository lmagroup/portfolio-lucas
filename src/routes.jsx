import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import PageLoader from './components/layout/PageLoader'

const Home = lazy(() => import('./pages/Home'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Legal = lazy(() => import('./pages/Legal'))
const NotFound = lazy(() => import('./pages/NotFound'))

function wrap(Page) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Page />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: wrap(Home) },
      { path: 'projets/:slug', element: wrap(ProjectDetail) },
      { path: 'mentions-legales', element: wrap(Legal) },
      { path: '*', element: wrap(NotFound) },
    ],
  },
])
