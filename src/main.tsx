import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Cart from './pages/Cart/Cart'
import Root from './pages/Root/Root'
import Index from './pages/Index/Index'
import Catalog, { catalogLoader } from './pages/Catalog/Catalog'
import CatalogItem, { catalogItemLoader, catalogItemAction } from './pages/CatalogItem/CatalogItem'

const router = createBrowserRouter([
  {
    path: '',
    element: <Root />,
    children: [
      {index: true, element: <Index />},
      {
        path: '/catalog/:sex',
        element: <Catalog />,
        loader: ({params}) => catalogLoader(params),
      },
      {
        path: 'catalog/:sex/:itemId',
        element: <CatalogItem />,
        loader: ({params}) => catalogItemLoader(params),
        action: ({params, request}) => catalogItemAction(params, request)
      },
      {
        path: '/cart',
        element: <Cart />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)