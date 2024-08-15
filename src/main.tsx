import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Params, RouterProvider } from 'react-router-dom'
import './index.css'
import { addToCart, fetchData, getCatalog } from './shoppingCartApi'
import Cart from './pages/Cart/Cart'
import Root from './pages/Root/Root'
import Index from './pages/Index/Index'
import Catalog from './pages/Catalog/Catalog'
import CatalogItem from './pages/CatalogItem/CatalogItem'

const catalog = await fetchData("https://fakestoreapi.com/products/1");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const catalogLoader = (params: Params<string>) => {
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

const catalogItemLoader = (params: Params<string>) => {
  const itemId = params.itemId!;
  const gender = params.sex!;
  const returnCatalog = getCatalog(gender, catalog);
  returnCatalog.filter(obj => obj.id === parseInt(itemId));
  const item = returnCatalog[0];
  return item;
}

const catalogItemAction = async (params: Params<string>, request: Request) => {
  const item = catalogItemLoader(params);
  const form = await request.formData();
  const size = form.get("size");
  addToCart(item, size?.toString());
  return null;
}

type ReturnCatalog = ReturnType<typeof catalogLoader>;

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

export type { ReturnCatalog };