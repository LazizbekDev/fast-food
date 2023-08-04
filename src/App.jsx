import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Cart from "./features/cart/Card"
import Menu, { loader as menuLoader} from "./features/menu/Menu"
import CreateOrder from "./features/order/CreateOrder"
import Order, { loader as orderLoader } from "./features/order/Order"
import Layout from "./ui/AppLayout"
import Home from "./ui/Home"
import Error from "./ui/Error.jsx";

function App() {

  const router = createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: "/menu",
          element: <Menu />,
          loader: menuLoader,
          errorElement: <Error />,
        },
        {
          path: "/cart",
          element: <Cart />
        },
        {
          path: "/order/new",
          element: <CreateOrder />
        },
        {
          path: "/order/:orderId",
          element: <Order />,
          loader: orderLoader,
          errorElement: <Error />
        }
      ]
    }
  ])
  return <RouterProvider router={router} />
}

export default App
