import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.tsx'
import './css/index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Detail, {Loader as DetailLoader } from './pages/Detail.tsx'
import Movies, {Loader as MoviesLoader } from './pages/Movies.tsx'
import Home from './pages/Home.tsx'
import ErrorPage from './pages/ErrorPage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/movies",
        element: <Movies />,
        loader: MoviesLoader
      },
      {
        path: "/movies/:movieId",
        element: <Detail />,
        loader: DetailLoader
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
