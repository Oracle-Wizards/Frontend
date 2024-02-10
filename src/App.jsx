import { useState } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Playground from './pages/playground/playground'
import './App.css'

function App() {
  const Layout = () => {
    return (
      //<div className="app">
          // <Navbar />
          <Outlet />
          // <Footer />
      //</div>
  ) ;
  };

  const router = createBrowserRouter([
    {

      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Playground />,
        },
        
      ],
    },
    
  ]);

  return <RouterProvider router={router} />;
}

export default App
