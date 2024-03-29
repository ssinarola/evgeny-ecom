import React from 'react'
import { Route, Routes } from 'react-router-dom';

const Layout = React.lazy(() => import("../layout"));
const Products = React.lazy(() => import("../page/products/index"));
const AddUpdateProduct = React.lazy(() => import("../page/products/AddUpdateProduct"));
const ProductDetail = React.lazy(() => import("../page/products/ProductDetail"));
const PageNotFound = React.lazy(() => import("../page/PageNotFound"));

function Router() {
  return (
    <Routes>
    <Route element={<Layout />}>
      <Route exact path="/" element={<Products />} />
      <Route exact path="/add-product" element={<AddUpdateProduct />} />
      <Route exact path="/edit-product/:productId" element={<AddUpdateProduct />} />
      <Route exact path="/product-detail/:productId" element={<ProductDetail />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  </Routes>
  )
}

export default Router;



