import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { addToCart } from './shoppingCartApi'

const router = createBrowserRouter([
  {
    path: '',
    element: <Root />,
    children: [
      {index: true, element: <Index />},
      {
        path: 'catalog/:sex',
        element: <Catalog />,
        loader: getCatalog
      },
      {
        path: 'catalog/:sex/:itemId',
        element: <Item />,
        loader: getItem,
        action: addToCart
      },
      {
        path: 'cart',
        element: loadTotal,
        action: buy,
        children: [
          {
            path: 'items',
            element: <CartItem />,
            loader: getCartItems,
            action: cartAction,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
