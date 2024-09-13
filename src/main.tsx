import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
////  UI
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "../theme";
//// Pages
import App from "./App";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";
import Search from "./pages/Search";
import DetailsPage from "./pages/DetailsPage";
import Watchlist from "./pages/Watchlist";
import Protect from "./components/routes/ProtectRoute";
import { AuthProvider } from "./context/authProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <Movies />,
      },
      {
        path: "/shows",
        element: <Shows />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/watchlist",
        element: (
          <Protect>
            <Watchlist />
          </Protect>
        ),
      },
      {
        path: "/:type/:id",
        element: <DetailsPage />,
      },
    ],
  },
]);

const rootElement = document.querySelector("#root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
