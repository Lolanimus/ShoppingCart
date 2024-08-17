import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Cart, { cartLoader } from './pages/Cart/Cart'
import Root from './pages/Root/Root'
import Index from './pages/Index/Index'
import Catalog, { catalogLoader } from './pages/Catalog/Catalog'
import CatalogItem, { catalogItemLoader, catalogItemAction } from './pages/CatalogItem/CatalogItem'
import CartItems, { cartItemsActions, cartItemsLoader } from './pages/CartItems/CartItems'

const url = "https://fakestoreapi.com/products";

const router = createBrowserRouter([
  {
    path: '',
    element: <Root />,
    children: [
      {index: true, element: <Index />},
      {
        path: '/catalog/:sex',
        element: <Catalog />,
        loader: ({params}) => catalogLoader(params, url)
      },
      {
        path: 'catalog/:sex/:itemId',
        element: <CatalogItem />,
        loader: ({params}) => catalogItemLoader(params, url),
        action: ({params, request}) => catalogItemAction(params, request, url)
      },
      {
        path: '/cart',
        element: <Cart />,
        loader: cartLoader,
        children: [
          {
            path: '/cart',
            element: <CartItems />,
            loader: cartItemsLoader,
            action: ({request}) => cartItemsActions(request),
          }
        ]
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)