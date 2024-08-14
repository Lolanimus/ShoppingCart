import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { addToCart } from './shoppingCartApi'
import Cart from './pages/Cart/Cart'
import Root from './pages/Root/Root'

const router = createBrowserRouter([
  {
    path: '',
    element: <Root />,
    children: [
      {index: true, element: <Index />},
      // {
      //   path: 'catalog/:sex',
      //   element: <Catalog />,
      //   loader: getCatalog
      // },
      // {
      //   path: 'catalog/:sex/:itemId',
      //   element: <Item />,
      //   loader: getItem,
      //   action: addToCart
      // },
      {
        path: 'cart',
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
