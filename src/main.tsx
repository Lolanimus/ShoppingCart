import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { addToCart, fetchData, getCatalog } from './shoppingCartApi'
import Cart from './pages/Cart/Cart'
import Root from './pages/Root/Root'
import Index from './pages/Index/Index'
import Catalog from './pages/Catalog/Catalog'

const catalog = await fetchData("https://fakestoreapi.com/products/1");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const catalogLoader = (params: {[key: string]: string | undefined}) => {
  const gender = params.sex!;
  const returnCatalog = getCatalog(
    gender, 
    catalog
  )

  return {
    returnCatalog,
    gender
  }
}

type ReturnCatalog = ReturnType<typeof catalogLoader>;

const router = createBrowserRouter([
  {
    path: '',
    element: <Root />,
    children: [
      {index: true, element: <Index />},
      {
        path: 'catalog/:sex',
        element: <Catalog />,
        loader: ({params}) => catalogLoader(params),
      },
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

export type { ReturnCatalog };