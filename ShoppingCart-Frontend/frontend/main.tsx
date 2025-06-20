import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import './fonts/Satoshi/css/satoshi.css';
import Cart from './pages/Cart/Cart'
import Root from './pages/Root/Root'
import Index from './pages/Index/Index'
import Catalog from './pages/Catalog/Catalog'
import CatalogItem from './pages/CatalogItem/CatalogItem'
import { cartItemsActions, cartLoader, catalogItemAction, catalogItemLoader, catalogLoader } from './routerMethods'

const env = (import.meta.env.VITE_ENVIRONMENT).toLowerCase();
const apiUrl = env === "development" 
  ? "http://" + import.meta.env.VITE_BASE_SERVER_NAME + ":" + import.meta.env.VITE_BACKEND_PORT
  : "https://api." + import.meta.env.VITE_BASE_SERVER_NAME;
console.log(apiUrl);
const router = createBrowserRouter([
  {
    path: '',
    element: <Root />,
    children: [
      {index: true, element: <Index />},
      {
        path: '/product/all/:gender',
        element: <Catalog />,
        loader: ({params}) => catalogLoader(params, apiUrl + "/product/all/" + params.gender)
      },
      {
        path: '/product/all/:gender/:itemId',
        element: <CatalogItem />,
        loader: ({params}) => catalogItemLoader(apiUrl + "/product/" + params.itemId),
        action: ({params, request}) => catalogItemAction(params, request, apiUrl)
      },
      {
        path: '/cart',
        element: <Cart />,
        loader: () => cartLoader(apiUrl + "/cart"),
        action: ({request}) => cartItemsActions(request, apiUrl),
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)