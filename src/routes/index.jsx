import FrontendLayout from "../layout/FrontendLayout";

import Home from "../pages/front/Home";
import Cart from "../pages/front/Cart";
import Checkout from "../pages/front/Checkout";
import Product from "../pages/front/Product";
import SingleProduct from "../pages/front/SingleProduct";
import Login from "../pages/Login";
import ProductedRoute from "../components/ProductedRoute";
import AdminLayout from "../layout/AdminLayout";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminArticle from "../pages/admin/AdminArticle";
import NotFound from "../pages/NotFound";

const routes = [
  {
    path: "/",
    element: <FrontendLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "product/:id",
        element: <SingleProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "admin",
    element: (
      <ProductedRoute>
        <AdminLayout />
      </ProductedRoute>
    ),
    children: [
      {
        index: true,
        path: "products",
        element: <AdminProducts />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
      {
        path: "articles",
        element: <AdminArticle />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
