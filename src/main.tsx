import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import BlogPost from "./Components/BlogPost";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "./layout/Main";
import Home from "./Home";
import { ThemeProvider } from "./context/themeContext";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:slug",
        element: <BlogPost />,
      },
    ],
  },
]);
const qc = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={qc}>
      <ThemeProvider>
        <div className="antialiased bg-background text-text">
          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
