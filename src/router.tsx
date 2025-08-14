import { createBrowserRouter, RouteObject } from 'react-router-dom'
import App from './App'
import HomePage from './pages/index'
import NotFoundPage from './pages/not-found'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
